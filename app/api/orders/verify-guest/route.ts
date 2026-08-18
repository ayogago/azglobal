import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET verify guest order with token
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('id');
    const token = searchParams.get('token');

    if (!orderId || !token) {
      return NextResponse.json({ error: 'Missing order ID or token' }, { status: 400 });
    }

    // Find order with matching ID and completion token
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        completionToken: token,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Invalid or expired order link' }, { status: 404 });
    }

    // Return order details (excluding sensitive data)
    const orderDetails = {
      id: order.id,
      orderNumber: order.orderNumber,
      guestEmail: order.guestEmail,
      fromLanguage: order.fromLanguage,
      toLanguage: order.toLanguage,
      serviceType: order.serviceType,
      totalPrice: order.totalPrice,
      isPaid: order.isPaid,
      userId: order.userId,
    };

    return NextResponse.json({ order: orderDetails });
  } catch (error) {
    console.error('Verify guest order error:', error);
    return NextResponse.json(
      { error: 'An error occurred while verifying the order' },
      { status: 500 }
    );
  }
}
