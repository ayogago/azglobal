// Upload rules shared by the browser form and the server routes.

export const MAX_FILES = 10;
export const MAX_FILE_BYTES = 25 * 1024 * 1024; // 25 MB per file
export const UPLOAD_PREFIX = 'requests/';

// Extension -> MIME type. We set the content type explicitly on upload because
// some browsers report an empty type for HEIC photos or Word documents.
export const ALLOWED_EXTENSIONS: Record<string, string> = {
  pdf: 'application/pdf',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  heic: 'image/heic',
  heif: 'image/heif',
  tif: 'image/tiff',
  tiff: 'image/tiff',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  txt: 'text/plain',
  rtf: 'application/rtf',
};

export const ALLOWED_CONTENT_TYPES = Array.from(new Set(Object.values(ALLOWED_EXTENSIONS)));

export const ACCEPT_ATTRIBUTE = Object.keys(ALLOWED_EXTENSIONS)
  .map((ext) => `.${ext}`)
  .join(',');

export function extensionOf(filename: string): string {
  const match = /\.([a-z0-9]+)$/i.exec(filename);
  return match ? match[1].toLowerCase() : '';
}

export function contentTypeFor(filename: string): string | null {
  return ALLOWED_EXTENSIONS[extensionOf(filename)] ?? null;
}

// Keep names readable but safe for a URL path segment.
export function safeFilename(filename: string): string {
  const ext = extensionOf(filename);
  const base = filename
    .replace(/\.[^.]+$/, '')
    .normalize('NFKD')
    .replace(/[^\w\- ]+/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
  return `${base || 'document'}${ext ? `.${ext}` : ''}`;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  const mb = bytes / (1024 * 1024);
  return `${Number.isInteger(mb) ? mb : mb.toFixed(1)} MB`;
}

// requests/<YYYY-MM-DD>/<submission id>/<file name>
export const UPLOAD_PATH_PATTERN = /^requests\/\d{4}-\d{2}-\d{2}\/[a-f0-9-]{36}\/[\w\-.]{1,80}$/;
