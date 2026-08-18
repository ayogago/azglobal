import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { sendOrderCompletionEmail, sendPricingReadyEmail, sendGuestOrderPricingReadyEmail } from '@/lib/email';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const updateOrderSchema = z.object({
  status: z.enum(['NEW', 'PENDING', 'PROCESSING', 'COMPLETED']).optional(),
  translatedFileData: z.string().optional(),
  translatedFileName: z.string().optional(),
  translatedFileType: z.string().optional(),
  isPaid: z.boolean().optional(),
  totalPrice: z.number().optional(),
  needsPricing: z.boolean().optional(),
});

// GET single order
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: session.role === 'ADMIN' ? {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      } : undefined,
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Check ownership (unless admin)
    if (session.role !== 'ADMIN' && order.userId !== session.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Transform order to include email at top level for consistency
    const transformedOrder = {
      ...order,
      email: (order as any).user?.email || undefined,
      userName: (order as any).user?.name || undefined,
    };

    return NextResponse.json({ order: transformedOrder });
  } catch (error) {
    console.error('Get order error:', error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}

// PATCH update order
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const order = await prisma.order.findUnique({
      where: { id: params.id },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Check ownership (unless admin)
    if (session.role !== 'ADMIN' && order.userId !== session.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const data = updateOrderSchema.parse(body);

    // Validate translated file size if uploading (10MB max)
    if (data.translatedFileData) {
      const base64Data = data.translatedFileData.split(',')[1] || data.translatedFileData;
      const sizeInBytes = Math.ceil((base64Data.length * 3) / 4);

      if (sizeInBytes > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            error: `File "${data.translatedFileName || 'uploaded file'}" exceeds the maximum size limit of 10MB. File size: ${(sizeInBytes / 1024 / 1024).toFixed(2)}MB`
          },
          { status: 400 }
        );
      }
    }

    const updatedOrder = await prisma.order.update({
      where: { id: params.id },
      data,
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    // Send completion email if status changed to COMPLETED
    console.log('Order update - Status:', data.status, 'Previous status:', order.status);

    if (data.status === 'COMPLETED' && order.status !== 'COMPLETED') {
      console.log('Triggering completion email for order:', updatedOrder.id);

      // Get email and name from user or guestEmail
      const customerEmail = updatedOrder.user?.email || updatedOrder.guestEmail;
      const customerName = updatedOrder.user?.name || 'Customer';

      console.log('Customer email:', customerEmail, 'Name:', customerName);

      if (customerEmail) {
        // Prepare order details for email
        const orderDetails = {
          id: updatedOrder.id,
          orderNumber: updatedOrder.orderNumber || `AZ-${updatedOrder.id.slice(-6).toUpperCase()}`,
          fromLanguage: updatedOrder.fromLanguage,
          toLanguage: updatedOrder.toLanguage,
        };

        // Send email asynchronously (don't await to avoid slowing down response)
        sendOrderCompletionEmail(customerEmail, customerName, orderDetails)
          .then(() => {
            console.log('✓ Completion email sent successfully to:', customerEmail);
          })
          .catch((error) => {
            console.error('✗ Failed to send order completion email:', error);
          });
      }
    } else if (data.status === 'COMPLETED' && order.status === 'COMPLETED') {
      console.log('Order already marked as COMPLETED, skipping email');
    }

    // Send pricing ready email if pricing was just set for an order that needed pricing
    const pricingJustSet =
      order.needsPricing && // Order previously needed pricing
      data.totalPrice !== undefined && // Price is being set
      data.totalPrice > 0 && // Price is greater than 0
      (data.needsPricing === false || updatedOrder.needsPricing === false); // needsPricing is being set to false or already false

    console.log('Pricing check - Was needsPricing:', order.needsPricing, 'New totalPrice:', data.totalPrice, 'needsPricing now:', updatedOrder.needsPricing);

    if (pricingJustSet) {
      console.log('Triggering pricing ready email for order:', updatedOrder.id);

      // Get email and name from user or guestEmail
      const customerEmail = updatedOrder.user?.email || updatedOrder.guestEmail;
      const customerName = updatedOrder.user?.name || 'Customer';
      const isGuestOrder = !updatedOrder.userId && updatedOrder.guestEmail;

      console.log('Customer email:', customerEmail, 'Name:', customerName, 'Is guest:', isGuestOrder);

      if (customerEmail) {
        // Prepare order details for email
        const orderDetails = {
          id: updatedOrder.id,
          orderNumber: updatedOrder.orderNumber || `AZ-${updatedOrder.id.slice(-6).toUpperCase()}`,
          fromLanguage: updatedOrder.fromLanguage,
          toLanguage: updatedOrder.toLanguage,
          totalPrice: updatedOrder.totalPrice,
        };

        // Send email asynchronously (don't await to avoid slowing down response)
        if (isGuestOrder && updatedOrder.completionToken) {
          // Send guest order pricing email with completion link
          sendGuestOrderPricingReadyEmail(customerEmail, orderDetails, updatedOrder.completionToken)
            .then(() => {
              console.log('✓ Guest order pricing ready email sent successfully to:', customerEmail);
            })
            .catch((error) => {
              console.error('✗ Failed to send guest order pricing ready email:', error);
            });
        } else {
          // Send normal pricing ready email for existing users
          sendPricingReadyEmail(customerEmail, customerName, orderDetails)
            .then(() => {
              console.log('✓ Pricing ready email sent successfully to:', customerEmail);
            })
            .catch((error) => {
              console.error('✗ Failed to send pricing ready email:', error);
            });
        }
      }
    }

    // Transform order to include email at top level for consistency
    const transformedOrder = {
      ...updatedOrder,
      email: (updatedOrder as any).user?.email || undefined,
      userName: (updatedOrder as any).user?.name || undefined,
    };

    return NextResponse.json({ order: transformedOrder });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    console.error('Update order error:', error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}

// DELETE order
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    console.log('[DELETE ORDER] Starting delete for order ID:', params.id);

    const session = await getSession();
    console.log('[DELETE ORDER] Session:', session ? 'Valid' : 'Invalid', session?.role);

    if (!session) {
      console.log('[DELETE ORDER] Unauthorized - no session');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const order = await prisma.order.findUnique({
      where: { id: params.id },
    });

    console.log('[DELETE ORDER] Order found:', order ? 'Yes' : 'No');

    if (!order) {
      console.log('[DELETE ORDER] Order not found');
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Check ownership (unless admin)
    if (session.role !== 'ADMIN' && order.userId !== session.userId) {
      console.log('[DELETE ORDER] Forbidden - not owner or admin');
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    console.log('[DELETE ORDER] Attempting to delete order from database');
    await prisma.order.delete({
      where: { id: params.id },
    });

    console.log('[DELETE ORDER] Successfully deleted order:', params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE ORDER] Error details:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    );
  }
}
