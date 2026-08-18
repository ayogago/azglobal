import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const params = await context.params;
    const userId = params.id;

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get all orders for this user
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        fromLanguage: true,
        toLanguage: true,
        documentType: true,
        serviceType: true,
        wordCount: true,
        totalPrice: true,
        status: true,
        isPaid: true,
        files: true,
        translatedFileData: true,
        translatedFileName: true,
        translatedFileType: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Transform files JSON to include metadata
    const ordersWithFiles = orders.map((order) => {
      const files = Array.isArray(order.files) ? order.files : [];

      return {
        ...order,
        files: files.map((file: any, index: number) => ({
          id: index.toString(),
          name: file.fileName || 'Unknown',
          size: file.fileSize || 'Unknown',
          type: file.fileType || 'application/pdf',
          uploadDate: order.createdAt,
          hasTranslation: !!order.translatedFileData,
        })),
        translatedFile: order.translatedFileData
          ? {
              name: order.translatedFileName,
              type: order.translatedFileType,
              uploadDate: order.updatedAt,
            }
          : null,
      };
    });

    return NextResponse.json({
      user,
      orders: ordersWithFiles,
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user orders' },
      { status: 500 }
    );
  }
}
