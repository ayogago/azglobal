import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendAdminOrderNotification } from '@/lib/email';
import crypto from 'crypto';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const createGuestOrderSchema = z.object({
  email: z.string().email(),
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

// POST create new guest order (before account creation)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createGuestOrderSchema.parse(body);

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

    // Generate secure completion token for guest order
    const completionToken = crypto.randomBytes(32).toString('hex');

    // Create order without userId (guest order)
    const order = await prisma.order.create({
      data: {
        guestEmail: data.email,
        completionToken: completionToken,
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

    // Prepare order details for admin notification
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

    // Send admin notification (don't await to avoid slowing down response)
    sendAdminOrderNotification(orderDetails, data.email).catch((error) => {
      console.error('Failed to send admin order notification:', error);
    });

    return NextResponse.json({ order: { id: order.id, orderNumber: order.orderNumber } });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    console.error('Create guest order error:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating your order' },
      { status: 500 }
    );
  }
}
