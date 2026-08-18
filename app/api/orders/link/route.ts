import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { sendOrderConfirmationEmail } from '@/lib/email';

const linkOrderSchema = z.object({
  orderId: z.string(),
});

// POST link guest order to authenticated user
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = linkOrderSchema.parse(body);

    // Get the order
    const order = await prisma.order.findUnique({
      where: { id: data.orderId },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Check if order is already linked to a user
    if (order.userId) {
      return NextResponse.json({ error: 'Order already linked to an account' }, { status: 400 });
    }

    // Get user information
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { email: true, name: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify the guest email matches the user's email (for security)
    if (order.guestEmail && order.guestEmail !== user.email) {
      return NextResponse.json(
        { error: 'Order email does not match your account email' },
        { status: 403 }
      );
    }

    // Link the order to the user
    const updatedOrder = await prisma.order.update({
      where: { id: data.orderId },
      data: {
        userId: session.userId,
        guestEmail: null, // Clear guest email since it's now linked
      },
    });

    // Send order confirmation email to user
    const orderDetails = {
      id: updatedOrder.id,
      orderNumber: updatedOrder.orderNumber || 'N/A',
      fromLanguage: updatedOrder.fromLanguage,
      toLanguage: updatedOrder.toLanguage,
      documentType: updatedOrder.documentType,
      serviceType: updatedOrder.serviceType,
      wordCount: updatedOrder.wordCount,
      totalPrice: updatedOrder.totalPrice,
    };

    sendOrderConfirmationEmail(user.email, user.name, orderDetails).catch((error) => {
      console.error('Failed to send order confirmation email:', error);
    });

    return NextResponse.json({ order: updatedOrder });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    console.error('Link order error:', error);
    return NextResponse.json(
      { error: 'An error occurred while linking your order' },
      { status: 500 }
    );
  }
}
