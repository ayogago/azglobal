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
    const orderId = params.id;
    const { searchParams } = new URL(request.url);
    const fileIndex = searchParams.get('fileIndex');
    const fileType = searchParams.get('type'); // 'original' or 'translated'

    if (fileIndex === null) {
      return NextResponse.json({ error: 'File index required' }, { status: 400 });
    }

    // Get the order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Get file from JSON array
    const files = Array.isArray(order.files) ? order.files : [];
    const fileIdx = parseInt(fileIndex);
    const file: any = files[fileIdx];

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    let fileData: string;
    let fileName: string;
    let mimeType: string;

    if (fileType === 'translated' && order.translatedFileData) {
      // Download translated file
      fileData = order.translatedFileData as string;
      fileName = (order.translatedFileName as string) || 'translated-file.pdf';
      mimeType = (order.translatedFileType as string) || 'application/pdf';
    } else {
      // Download original file
      if (!file.fileData) {
        return NextResponse.json({ error: 'File data not found' }, { status: 404 });
      }
      fileData = file.fileData as string;
      fileName = file.fileName || 'document.pdf';
      mimeType = file.fileType || 'application/pdf';
    }

    // Decode base64 file data
    const buffer = Buffer.from(fileData, 'base64');

    // Return file as download
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    );
  }
}
