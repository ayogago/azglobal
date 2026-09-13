import { NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { checkRateLimit } from '@/lib/rate-limit';
import { ALLOWED_CONTENT_TYPES, MAX_FILE_BYTES, UPLOAD_PATH_PATTERN } from '@/lib/uploads';

class UploadRejected extends Error {}

// Issues short-lived client tokens so the browser can upload documents
// straight to the private Blob store (bypassing the 4.5 MB function body limit).
export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const limit = await checkRateLimit(`upload:${ip}`, { interval: 10 * 60 * 1000, uniqueTokenPerInterval: 40 });
        if (!limit.success) throw new UploadRejected('Too many uploads. Please try again in a few minutes.');
        if (!UPLOAD_PATH_PATTERN.test(pathname)) throw new UploadRejected('Invalid file name.');

        return {
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: MAX_FILE_BYTES,
          addRandomSuffix: true,
          validUntil: Date.now() + 15 * 60 * 1000,
        };
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Upload token error:', error);
    const message = error instanceof UploadRejected ? error.message : 'Upload is temporarily unavailable.';
    return NextResponse.json({ error: message }, { status: error instanceof UploadRejected ? 400 : 500 });
  }
}
