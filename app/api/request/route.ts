import { NextResponse } from 'next/server';
import { get, head } from '@vercel/blob';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/rate-limit';
import { emailLayout, escapeHtml, isEmailConfigured, sendEmail, type EmailAttachment } from '@/lib/email';
import { fileLink } from '@/lib/file-links';
import { DOCUMENT_TYPES, LANGUAGE_PAIRS, SERVICE_LEVELS, SITE, TURNAROUND } from '@/lib/site';
import { formatBytes, MAX_FILES, UPLOAD_PREFIX } from '@/lib/uploads';

export const maxDuration = 60;

// Attach files directly to the staff email when they are small enough;
// larger submissions get download links only.
const MAX_ATTACHMENT_TOTAL = 15 * 1024 * 1024;

const optionalChoice = <T extends readonly [string, ...string[]]>(values: T) =>
  z.union([z.enum(values), z.literal('')]).optional();

const schema = z.object({
  kind: z.enum(['quote', 'contact']),
  submissionId: z.uuid(),
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  email: z.email('Please enter a valid email address.').max(200),
  phone: z.string().trim().max(40).optional().default(''),
  languagePair: optionalChoice(LANGUAGE_PAIRS),
  documentType: optionalChoice(DOCUMENT_TYPES),
  serviceLevel: optionalChoice(SERVICE_LEVELS),
  turnaround: optionalChoice(TURNAROUND),
  subject: z.string().trim().max(150).optional().default(''),
  message: z.string().trim().max(5000).optional().default(''),
  website: z.string().optional().default(''), // honeypot
  files: z
    .array(
      z.object({
        url: z.url(),
        pathname: z.string().startsWith(UPLOAD_PREFIX).max(300),
        name: z.string().max(255),
      })
    )
    .max(MAX_FILES)
    .default([]),
});

type Submission = z.infer<typeof schema>;

function baseUrl(request: Request): string {
  if (process.env.VERCEL_ENV === 'production') {
    return process.env.NEXT_PUBLIC_APP_URL || SITE.url;
  }
  return new URL(request.url).origin;
}

function row(label: string, value: string) {
  if (!value) return '';
  return `<tr><td style="padding:6px 12px 6px 0;color:#4A5A68;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:6px 0;font-weight:bold;">${escapeHtml(value).replace(/\n/g, '<br>')}</td></tr>`;
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const limit = await checkRateLimit(`request:${ip}`, { interval: 10 * 60 * 1000, uniqueTokenPerInterval: 5 });
  if (!limit.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a few minutes, or call us directly.' },
      { status: 429 }
    );
  }

  let data: Submission;
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) {
      // Surface our own friendly messages (name/email); otherwise a generic one.
      const friendly = parsed.error.issues.find((i) => i.message.startsWith('Please'));
      return NextResponse.json({ error: friendly?.message || 'Please check the form and try again.' }, { status: 400 });
    }
    data = parsed.data;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Bots fill the hidden field; pretend everything worked.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  if (!isEmailConfigured()) {
    console.error('Request form: SMTP is not configured, cannot deliver submission.');
    return NextResponse.json(
      { error: `We couldn't send your request right now. Please email ${SITE.email} or call ${SITE.phone}.` },
      { status: 503 }
    );
  }

  // Verify each file really exists in our store and belongs to this submission.
  const files: { name: string; pathname: string; size: number; contentType: string }[] = [];
  for (const file of data.files) {
    if (!file.pathname.includes(`/${data.submissionId}/`)) {
      return NextResponse.json({ error: 'One of the uploaded files is invalid.' }, { status: 400 });
    }
    try {
      const meta = await head(file.pathname);
      files.push({ name: file.name, pathname: meta.pathname, size: meta.size, contentType: meta.contentType });
    } catch {
      return NextResponse.json({ error: `We couldn't find "${file.name}". Please upload it again.` }, { status: 400 });
    }
  }

  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);
  const attachments: EmailAttachment[] = [];
  if (files.length && totalBytes <= MAX_ATTACHMENT_TOTAL) {
    for (const file of files) {
      try {
        const blob = await get(file.pathname, { access: 'private' });
        if (blob?.statusCode === 200) {
          const content = Buffer.from(await new Response(blob.stream).arrayBuffer());
          attachments.push({ filename: file.name, content, contentType: file.contentType });
        }
      } catch (error) {
        // Links below still give access; don't fail the submission.
        console.error('Could not attach file', file.pathname, error);
      }
    }
  }

  const origin = baseUrl(request);
  const isQuote = data.kind === 'quote';
  const heading = isQuote ? 'New quote request' : 'New contact message';
  const subjectLine = isQuote
    ? `Quote request: ${data.languagePair || 'translation'} – ${data.name}`
    : `Website message: ${data.subject || data.name}`;

  const fileListHtml = files.length
    ? `<h3 style="margin:24px 0 8px;font-size:16px;">Documents (${files.length})</h3>
       <ul style="padding-left:18px;margin:0;">${files
         .map(
           (f) =>
             `<li style="margin:4px 0;"><a href="${fileLink(origin, f.pathname)}" style="color:#077AA3;">${escapeHtml(f.name)}</a> <span style="color:#4A5A68;">(${formatBytes(f.size)})</span></li>`
         )
         .join('')}</ul>
       <p style="color:#4A5A68;font-size:13px;margin-top:8px;">${
         attachments.length === files.length
           ? 'Files are also attached to this email.'
           : 'Files were too large to attach — use the links above.'
       }</p>`
    : '<p style="color:#4A5A68;">No documents attached.</p>';

  const staffHtml = emailLayout(
    heading,
    `<h2 style="margin:0 0 16px;font-size:20px;">${heading}</h2>
     <table role="presentation" cellpadding="0" cellspacing="0">
       ${row('Name', data.name)}
       ${row('Email', data.email)}
       ${row('Phone', data.phone)}
       ${row('Languages', data.languagePair || '')}
       ${row('Document', data.documentType || '')}
       ${row('Service', data.serviceLevel || '')}
       ${row('Turnaround', data.turnaround || '')}
       ${row('Subject', data.subject)}
       ${row('Message', data.message)}
     </table>
     ${fileListHtml}
     <p style="margin-top:24px;">Reply to this email to respond to ${escapeHtml(data.name)} directly.</p>`
  );

  const staffText = [
    heading,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone && `Phone: ${data.phone}`,
    data.languagePair && `Languages: ${data.languagePair}`,
    data.documentType && `Document: ${data.documentType}`,
    data.serviceLevel && `Service: ${data.serviceLevel}`,
    data.turnaround && `Turnaround: ${data.turnaround}`,
    data.subject && `Subject: ${data.subject}`,
    data.message && `Message:\n${data.message}`,
    files.length ? `Documents:\n${files.map((f) => `- ${f.name}: ${fileLink(origin, f.pathname)}`).join('\n')}` : 'No documents attached.',
  ]
    .filter(Boolean)
    .join('\n');

  try {
    await sendEmail({
      to: process.env.REQUEST_NOTIFY_EMAIL || SITE.email,
      replyTo: data.email,
      subject: subjectLine,
      html: staffHtml,
      text: staffText,
      attachments,
    });
  } catch (error) {
    console.error('Request form: failed to send staff email', error);
    return NextResponse.json(
      { error: `We couldn't send your request right now. Please email ${SITE.email} or call ${SITE.phone}.` },
      { status: 502 }
    );
  }

  // Confirmation to the customer (best effort).
  try {
    const firstName = data.name.split(/\s+/)[0].slice(0, 40);
    await sendEmail({
      to: data.email,
      replyTo: process.env.REQUEST_NOTIFY_EMAIL || SITE.email,
      subject: isQuote ? 'We received your translation request' : 'We received your message',
      html: emailLayout(
        'We received your request',
        `<p>Hi ${escapeHtml(firstName)},</p>
         <p>Thank you for contacting AZ Global Translations. ${
           isQuote
             ? `We received your quote request${files.length ? ` and ${files.length} document${files.length > 1 ? 's' : ''}` : ''}. A member of our team will review it and reply with your quote shortly.`
             : 'A member of our team will get back to you shortly.'
         }</p>
         <p>If you need anything in the meantime, just reply to this email or call us at <a href="${SITE.phoneHref}" style="color:#077AA3;">${SITE.phone}</a>.</p>
         <p>— AZ Global Translations</p>`
      ),
      text: `Hi ${firstName},\n\nThank you for contacting AZ Global Translations. We received your ${
        isQuote ? 'quote request' : 'message'
      } and will get back to you shortly.\n\nQuestions? Reply to this email or call ${SITE.phone}.\n\n— AZ Global Translations`,
    });
  } catch (error) {
    console.error('Request form: failed to send confirmation email', error);
  }

  return NextResponse.json({ ok: true });
}
