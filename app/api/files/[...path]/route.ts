import { get } from '@vercel/blob';
import { verifyPath } from '@/lib/file-links';
import { UPLOAD_PREFIX } from '@/lib/uploads';

// Streams a private uploaded document to whoever holds a signed link
// (the links are only ever sent in the staff notification email).
export async function GET(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  // Upload paths only contain [A-Za-z0-9_-.] segments, so no decoding is needed.
  const pathname = path.join('/');
  const signature = new URL(request.url).searchParams.get('sig') || '';

  let valid = false;
  try {
    valid = pathname.startsWith(UPLOAD_PREFIX) && Boolean(signature) && verifyPath(pathname, signature);
  } catch (error) {
    console.error('File link verification unavailable:', error);
  }
  if (!valid) {
    return new Response('Not found', { status: 404 });
  }

  try {
    const result = await get(pathname, { access: 'private' });
    if (!result || result.statusCode !== 200) {
      return new Response('Not found', { status: 404 });
    }

    const filename = pathname.split('/').pop() || 'document';
    return new Response(result.stream, {
      headers: {
        'Content-Type': result.blob.contentType || 'application/octet-stream',
        'Content-Length': String(result.blob.size),
        'Content-Disposition': `attachment; filename="${filename.replace(/"/g, '')}"`,
        'Cache-Control': 'private, no-store',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  } catch (error) {
    console.error('File download error:', error);
    return new Response('Unable to load file', { status: 500 });
  }
}
