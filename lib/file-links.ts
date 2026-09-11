import { createHmac, timingSafeEqual } from 'crypto';

// Uploaded documents live in a *private* Blob store. Staff get download links
// in the notification email; each link carries an HMAC signature so only
// someone holding the email can open the file.

function secret(): string {
  const value = process.env.FILE_LINK_SECRET || process.env.BLOB_READ_WRITE_TOKEN;
  if (!value) throw new Error('FILE_LINK_SECRET (or BLOB_READ_WRITE_TOKEN) is not set.');
  return value;
}

export function signPath(pathname: string): string {
  return createHmac('sha256', secret()).update(pathname).digest('base64url');
}

export function verifyPath(pathname: string, signature: string): boolean {
  const expected = Buffer.from(signPath(pathname));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export function fileLink(baseUrl: string, pathname: string): string {
  const encoded = pathname.split('/').map(encodeURIComponent).join('/');
  return `${baseUrl}/api/files/${encoded}?sig=${signPath(pathname)}`;
}
