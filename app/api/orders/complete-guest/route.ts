import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { createToken, setAuthCookie } from '@/lib/auth';
import { sendOrderConfirmationEmail, sendWelcomeEmail } from '@/lib/email';

const completeGuestOrderSchema = z.object({
  orderId: z.string(),
  token: z.string(),
  paymentIntentId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  password: z.string().min(8),
});

// POST complete guest order (create account and link order)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = completeGuestOrderSchema.parse(body);

    // Verify order with token
    const order = await prisma.order.findFirst({
      where: {
        id: data.orderId,
        completionToken: data.token,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Invalid or expired order link' }, { status: 404 });
    }

    if (!order.guestEmail) {
      return NextResponse.json({ error: 'Order already completed' }, { status: 400 });
    }

    if (order.userId) {
      return NextResponse.json({ error: 'Order already linked to an account' }, { status: 400 });
    }

    // Check if user already exists with this email
    const existingUser = await prisma.user.findUnique({
      where: { email: order.guestEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists. Please log in to your account.' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Create user account
    const user = await prisma.user.create({
      data: {
        email: order.guestEmail,
        passwordHash: passwordHash,
        name: `${data.firstName} ${data.lastName}`,
        phone: data.phone,
        role: 'CLIENT',
      },
    });

    // Update order: link to user, mark as paid, clear guest fields
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        userId: user.id,
        isPaid: true,
        paymentIntentId: data.paymentIntentId,
        guestEmail: null,
        completionToken: null,
      },
    });

    // Create JWT token and set session cookie to log the user in
    const token = await createToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    await setAuthCookie(token);

    const response = NextResponse.json({ success: true, order: updatedOrder });

    // Send welcome and order confirmation emails
    const orderDetails = {
      id: updatedOrder.id,
      orderNumber: updatedOrder.orderNumber || `AZ-${updatedOrder.id.slice(-6).toUpperCase()}`,
      fromLanguage: updatedOrder.fromLanguage,
      toLanguage: updatedOrder.toLanguage,
      documentType: updatedOrder.documentType,
      serviceType: updatedOrder.serviceType,
      wordCount: updatedOrder.wordCount,
      totalPrice: updatedOrder.totalPrice,
    };

    // Send emails asynchronously
    sendWelcomeEmail(user.email, user.name).catch((error) => {
      console.error('Failed to send welcome email:', error);
    });

    sendOrderConfirmationEmail(user.email, user.name, orderDetails).catch((error) => {
      console.error('Failed to send order confirmation email:', error);
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    console.error('Complete guest order error:', error);
    return NextResponse.json(
      { error: 'An error occurred while completing your order' },
      { status: 500 }
    );
  }
}
