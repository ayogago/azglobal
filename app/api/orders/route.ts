import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { sendOrderConfirmationEmail, sendAdminOrderNotification } from '@/lib/email';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const createOrderSchema = z.object({
  fromLanguage: z.string(),
  toLanguage: z.string(),
  documentType: z.string(),
  serviceType: z.string(),
  wordCount: z.number(),
  totalPrice: z.number(),
  needsPricing: z.boolean().optional(),
  isPaid: z.boolean().optional(),
  paymentIntentId: z.string().optional(),
  files: z.array(z.any()).optional(),
});

// GET all orders for current user
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Users can only see their own orders (or admins see all)
    const where = session.role === 'ADMIN'
      ? {}
      : { userId: session.userId };

    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: session.role === 'ADMIN' ? {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      } : undefined,
    });

    // Transform orders to include email at top level for admin
    const transformedOrders = orders.map((order: any) => ({
      ...order,
      email: order.user?.email || order.guestEmail || undefined,
      userName: order.user?.name || undefined,
    }));

    return NextResponse.json({ orders: transformedOrders });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}

// POST create new order
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = createOrderSchema.parse(body);

    // Validate file sizes (10MB max per file)
    if (data.files && Array.isArray(data.files)) {
      for (const file of data.files) {
        if (file.data) {
          // Calculate actual file size from base64 data
          const base64Data = file.data.split(',')[1] || file.data;
          const sizeInBytes = Math.ceil((base64Data.length * 3) / 4);

          if (sizeInBytes > MAX_FILE_SIZE) {
            return NextResponse.json(
              {
                error: `File "${file.name}" exceeds the maximum size limit of 10MB. File size: ${(sizeInBytes / 1024 / 1024).toFixed(2)}MB`
              },
              { status: 400 }
            );
          }
        }
      }
    }

    // Generate order number based on total order count
    const totalOrders = await prisma.order.count();
    const orderNumber = `AZ-${totalOrders + 25000}`;

    const order = await prisma.order.create({
      data: {
        userId: session.userId,
        orderNumber: orderNumber,
        fromLanguage: data.fromLanguage,
        toLanguage: data.toLanguage,
        documentType: data.documentType,
        serviceType: data.serviceType,
        wordCount: data.wordCount,
        totalPrice: data.totalPrice,
        needsPricing: data.needsPricing || false,
        isPaid: data.isPaid || false,
        paymentIntentId: data.paymentIntentId,
        files: data.files || [],
        status: 'NEW',
      },
    });

    // Get user information for emails
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { email: true, name: true },
    });

    if (user) {
      // Prepare order details for email
      const orderDetails = {
        id: order.id,
        orderNumber: orderNumber,
        fromLanguage: order.fromLanguage,
        toLanguage: order.toLanguage,
        documentType: order.documentType,
        serviceType: order.serviceType,
        wordCount: order.wordCount,
        totalPrice: order.totalPrice,
      };

      // Send emails (don't await to avoid slowing down response)
      sendOrderConfirmationEmail(user.email, user.name, orderDetails).catch((error) => {
        console.error('Failed to send order confirmation email:', error);
      });

      sendAdminOrderNotification(orderDetails, user.email).catch((error) => {
        console.error('Failed to send admin order notification:', error);
      });
    }

    return NextResponse.json({ order });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}
