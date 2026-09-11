import { del, list } from '@vercel/blob';
import { UPLOAD_PREFIX } from '@/lib/uploads';

// Daily Vercel Cron: deletes uploaded documents older than the retention
// period stated in the privacy policy (default 90 days).
export const maxDuration = 60;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const days = parseInt(process.env.UPLOAD_RETENTION_DAYS || '90', 10);
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  let deleted = 0;
  let cursor: string | undefined;

  do {
    const page = await list({ prefix: UPLOAD_PREFIX, cursor, limit: 1000 });
    const expired = page.blobs.filter((b) => new Date(b.uploadedAt).getTime() < cutoff).map((b) => b.url);
    if (expired.length) {
      await del(expired);
      deleted += expired.length;
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  return Response.json({ ok: true, deleted, retentionDays: days });
}
