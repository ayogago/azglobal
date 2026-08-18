import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const { amount, currency = 'usd', metadata = {}, guestOrderId, guestOrderToken } = await request.json();

    // Check if this is a guest order payment
    if (!session) {
      // For guest orders, verify the order and token
      if (!guestOrderId || !guestOrderToken) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }

      // Verify the guest order
      const order = await prisma.order.findFirst({
        where: {
          id: guestOrderId,
          completionToken: guestOrderToken,
        },
      });

      if (!order) {
        return NextResponse.json(
          { error: 'Invalid order or token' },
          { status: 401 }
        );
      }

      if (!amount || amount <= 0) {
        return NextResponse.json(
          { error: 'Invalid amount' },
          { status: 400 }
        );
      }

      // Create PaymentIntent for guest order
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          guestOrderId: order.id,
          guestEmail: order.guestEmail || '',
          ...metadata,
        },
      });

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });
    }

    // Regular authenticated user payment
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId: session.userId,
        ...metadata,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error('Create payment intent error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
