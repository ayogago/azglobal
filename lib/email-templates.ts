import { escapeHtml } from '@/lib/html';
import { SITE } from '@/lib/site';

// Branded, email-client-safe templates (tables + inline styles only).
// Tested against Gmail, Outlook and Apple Mail conventions: 600px wide,
// no external CSS, images with explicit width/height and alt text.

const BRAND = {
  primary: '#077AA3',
  primaryDark: '#065F80',
  leaf: '#6E9A22',
  leafSoft: '#F1F6E6',
  ink: '#0E2433',
  muted: '#4A5A68',
  line: '#E3E9ED',
  page: '#EEF3F6',
  soft: '#F5F9FB',
};

const LOGO_URL = `${SITE.url}/logo-mark.png`;
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

function shell({ preheader, content }: { preheader: string; content: string }): string {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<title>${escapeHtml(SITE.name)}</title>
</head>
<body style="margin:0;padding:0;width:100%;background-color:${BRAND.page};font-family:${FONT};color:${BRAND.ink};-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;font-size:1px;line-height:1px;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BRAND.page};">
  <tr>
    <td align="center" style="padding:28px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 2px 10px rgba(14,36,51,0.07);">
        <tr>
          <td align="center" style="padding:26px 24px 18px 24px;border-bottom:1px solid ${BRAND.line};">
            <a href="${SITE.url}" style="text-decoration:none;">
              <img src="${LOGO_URL}" width="200" height="47" alt="${escapeHtml(SITE.name)}" style="display:block;border:0;outline:none;width:200px;height:auto;max-width:200px;" />
            </a>
          </td>
        </tr>
        ${content}
        <tr>
          <td style="padding:22px 28px 26px 28px;background-color:${BRAND.soft};border-top:1px solid ${BRAND.line};">
            <p style="margin:0 0 6px 0;font-size:14px;font-weight:bold;color:${BRAND.ink};">${escapeHtml(SITE.name)}</p>
            <p style="margin:0 0 12px 0;font-size:13px;line-height:20px;color:${BRAND.muted};">
              Certified Armenian, Russian &amp; Ukrainian translation<br />
              ${escapeHtml(SITE.location)} · <a href="${SITE.phoneHref}" style="color:${BRAND.primary};text-decoration:none;">${escapeHtml(SITE.phone)}</a> ·
              <a href="mailto:${SITE.email}" style="color:${BRAND.primary};text-decoration:none;">${escapeHtml(SITE.email)}</a>
            </p>
            <p style="margin:0;font-size:12px;color:#8A97A1;">
              <a href="${SITE.url}" style="color:#8A97A1;text-decoration:underline;">azglobaltranslations.com</a>
            </p>
          </td>
        </tr>
      </table>
      <p style="margin:16px 0 0 0;font-size:11px;color:#8A97A1;font-family:${FONT};">© ${new Date().getFullYear()} ${escapeHtml(SITE.name)}</p>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function banner(title: string, subtitle: string, color: string): string {
  return `<tr>
    <td style="padding:22px 28px;background-color:${color};">
      <p style="margin:0;font-size:20px;line-height:26px;font-weight:bold;color:#ffffff;">${escapeHtml(title)}</p>
      <p style="margin:6px 0 0 0;font-size:13px;line-height:18px;color:rgba(255,255,255,0.85);">${escapeHtml(subtitle)}</p>
    </td>
  </tr>`;
}

function detailRows(rows: [string, string][]): string {
  const visible = rows.filter(([, value]) => Boolean(value));
  if (!visible.length) return '';
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BRAND.line};border-radius:10px;border-collapse:separate;overflow:hidden;">
    ${visible
      .map(
        ([label, value], i) => `<tr>
          <td style="padding:11px 16px;background-color:${i % 2 ? '#ffffff' : BRAND.soft};border-bottom:${
            i === visible.length - 1 ? 'none' : `1px solid ${BRAND.line}`
          };font-size:13px;color:${BRAND.muted};width:34%;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:11px 16px;background-color:${i % 2 ? '#ffffff' : BRAND.soft};border-bottom:${
            i === visible.length - 1 ? 'none' : `1px solid ${BRAND.line}`
          };font-size:14px;color:${BRAND.ink};font-weight:bold;vertical-align:top;">${escapeHtml(value)}</td>
        </tr>`
      )
      .join('')}
  </table>`;
}

function button(label: string, href: string, color = BRAND.primary): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0;">
    <tr><td align="center" bgcolor="${color}" style="border-radius:8px;">
      <a href="${href}" style="display:inline-block;padding:12px 22px;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:8px;">${escapeHtml(label)}</a>
    </td></tr>
  </table>`;
}

export interface RequestEmailData {
  kind: 'quote' | 'contact' | 'law-firm';
  name: string;
  email: string;
  phone: string;
  languagePair: string;
  documentType: string;
  serviceLevel: string;
  turnaround: string;
  subject: string;
  message: string;
  /** Law-firm intake only */
  firm?: string;
  role?: string;
  matter?: string;
  deadline?: string;
  files: { name: string; size: string; url: string }[];
  allFilesAttached: boolean;
}

function receivedAt(): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Los_Angeles',
  }).format(new Date());
}

/** Notification sent to the AZ Global team. */
export function staffEmail(data: RequestEmailData): { html: string; text: string } {
  const isQuote = data.kind === 'quote';
  const isFirm = data.kind === 'law-firm';
  const title = isFirm ? 'Law firm — free first document' : isQuote ? 'New quote request' : 'New message from the website';
  const firstName = data.name.split(/\s+/)[0].slice(0, 40) || 'them';

  const documentsBlock = data.files.length
    ? `<p style="margin:26px 0 10px 0;font-size:13px;font-weight:bold;text-transform:uppercase;letter-spacing:0.06em;color:${BRAND.primary};">Documents (${data.files.length})</p>
       <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BRAND.line};border-radius:10px;border-collapse:separate;overflow:hidden;">
       ${data.files
         .map(
           (file, i) => `<tr>
             <td style="padding:12px 16px;border-bottom:${i === data.files.length - 1 ? 'none' : `1px solid ${BRAND.line}`};font-size:14px;color:${BRAND.ink};">
               ${escapeHtml(file.name)}<br />
               <span style="font-size:12px;color:${BRAND.muted};">${escapeHtml(file.size)}</span>
             </td>
             <td align="right" style="padding:12px 16px;border-bottom:${i === data.files.length - 1 ? 'none' : `1px solid ${BRAND.line}`};">
               <a href="${file.url}" style="display:inline-block;padding:8px 16px;background-color:${BRAND.soft};border:1px solid ${BRAND.primary};border-radius:6px;font-size:13px;font-weight:bold;color:${BRAND.primary};text-decoration:none;">Download</a>
             </td>
           </tr>`
         )
         .join('')}
       </table>
       <p style="margin:10px 0 0 0;font-size:12px;color:${BRAND.muted};">${
         data.allFilesAttached
           ? 'The files are also attached to this email.'
           : 'Too large to attach — use the download links above.'
       }</p>`
    : `<p style="margin:26px 0 0 0;padding:14px 16px;background-color:${BRAND.soft};border-radius:10px;font-size:14px;color:${BRAND.muted};">No documents were attached to this request.</p>`;

  const messageBlock = data.message
    ? `<p style="margin:26px 0 10px 0;font-size:13px;font-weight:bold;text-transform:uppercase;letter-spacing:0.06em;color:${BRAND.primary};">Message</p>
       <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
         <tr><td style="padding:14px 18px;background-color:${BRAND.soft};border-left:4px solid ${BRAND.primary};border-radius:0 10px 10px 0;font-size:14px;line-height:22px;color:${BRAND.ink};">${escapeHtml(
           data.message
         ).replace(/\n/g, '<br />')}</td></tr>
       </table>`
    : '';

  const content = `${banner(title, `Received ${receivedAt()} · via azglobaltranslations.com`, BRAND.primary)}
    <tr>
      <td style="padding:28px;">
        ${
          isFirm && data.firm
            ? `<p style="margin:0 0 2px 0;font-size:13px;font-weight:bold;text-transform:uppercase;letter-spacing:0.06em;color:${BRAND.leaf};">${escapeHtml(data.firm)}</p>`
            : ''
        }
        <p style="margin:0 0 4px 0;font-size:22px;font-weight:bold;color:${BRAND.ink};">${escapeHtml(data.name)}${
          isFirm && data.role ? `<span style="font-size:14px;font-weight:normal;color:${BRAND.muted};"> &nbsp;·&nbsp; ${escapeHtml(data.role)}</span>` : ''
        }</p>
        <p style="margin:0 0 22px 0;font-size:14px;line-height:22px;color:${BRAND.muted};">
          <a href="mailto:${escapeHtml(data.email)}" style="color:${BRAND.primary};text-decoration:none;">${escapeHtml(data.email)}</a>
          ${data.phone ? ` &nbsp;·&nbsp; <a href="tel:${escapeHtml(data.phone.replace(/[^\d+]/g, ''))}" style="color:${BRAND.primary};text-decoration:none;">${escapeHtml(data.phone)}</a>` : ''}
        </p>

        ${detailRows([
          ['Languages', data.languagePair],
          ['Document type', data.documentType],
          ['Service needed', data.serviceLevel],
          ['Turnaround', data.turnaround],
          ['Filing deadline', data.deadline ?? ''],
          ['Client / matter', data.matter ?? ''],
          ['Subject', data.subject],
        ])}

        ${messageBlock}
        ${documentsBlock}

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:30px 0 0 0;">
          <tr>
            <td>${button(`Reply to ${firstName}`, `mailto:${data.email}?subject=${encodeURIComponent(
              isFirm
                ? `Your first document — AZ Global Translations`
                : isQuote
                  ? 'Your translation quote — AZ Global Translations'
                  : 'Re: your message — AZ Global Translations'
            )}`)}</td>
          </tr>
        </table>
        <p style="margin:14px 0 0 0;font-size:12px;color:${BRAND.muted};">Replying to this email also goes straight to ${escapeHtml(data.name)}.</p>
      </td>
    </tr>`;

  const text = [
    title.toUpperCase(),
    `Received ${receivedAt()}`,
    '',
    data.firm && `Firm:  ${data.firm}`,
    `Name:  ${data.name}${data.role ? ` (${data.role})` : ''}`,
    `Email: ${data.email}`,
    data.phone && `Phone: ${data.phone}`,
    data.deadline && `Filing deadline: ${data.deadline}`,
    data.matter && `Client / matter: ${data.matter}`,
    data.languagePair && `Languages: ${data.languagePair}`,
    data.documentType && `Document type: ${data.documentType}`,
    data.serviceLevel && `Service needed: ${data.serviceLevel}`,
    data.turnaround && `Turnaround: ${data.turnaround}`,
    data.subject && `Subject: ${data.subject}`,
    data.message && `\nMessage:\n${data.message}`,
    '',
    data.files.length
      ? `Documents (${data.files.length}):\n${data.files.map((f) => `- ${f.name} (${f.size})\n  ${f.url}`).join('\n')}`
      : 'No documents were attached.',
    '',
    `Reply to this email to answer ${data.name} directly.`,
  ]
    .filter(Boolean)
    .join('\n');

  return { html: shell({ preheader: `${data.firm ? `${data.firm} · ` : ''}${data.name} · ${data.languagePair || 'website message'}`, content }), text };
}

/** Confirmation sent to the person who filled in the form. */
export function customerEmail(data: RequestEmailData): { html: string; text: string } {
  const isQuote = data.kind === 'quote';
  const isFirm = data.kind === 'law-firm';
  const firstName = data.name.split(/\s+/)[0].slice(0, 40) || 'there';

  const steps: [string, string][] = isFirm
    ? [
        ['We review the document', 'A translator checks it and confirms the page count and delivery time by email.'],
        ['We translate it — no charge', 'Certified, with the signed statement USCIS requires. Delivered as PDF and DOCX.'],
        ['If it goes through cleanly, we set up your firm account', 'A shared secure folder for your documents and one itemised statement a month.'],
      ]
    : isQuote
    ? [
        ['We review your documents', 'A professional translator looks at what you sent and checks the details.'],
        ['You get a quote by email', 'Clear pricing and a delivery time, with no obligation.'],
        ['We translate and deliver', 'Most certified translations are ready within 12–48 hours of approval.'],
      ]
    : [
        ['We read your message', 'It goes straight to our team in Los Angeles.'],
        ['We reply by email', 'Usually within a few hours.'],
      ];

  const summary = detailRows([
    ['Languages', data.languagePair],
    ['Document type', data.documentType],
    ['Service needed', data.serviceLevel],
    ['Turnaround', data.turnaround],
    ['Documents received', data.files.length ? `${data.files.length} file${data.files.length > 1 ? 's' : ''}` : ''],
  ]);

  const content = `${banner(
    isFirm ? 'We received your first document' : isQuote ? 'We received your request' : 'We received your message',
    'Thank you for choosing AZ Global Translations',
    BRAND.primary
  )}
    <tr>
      <td style="padding:28px;">
        <p style="margin:0 0 14px 0;font-size:17px;color:${BRAND.ink};">Hi ${escapeHtml(firstName)},</p>
        <p style="margin:0 0 24px 0;font-size:15px;line-height:24px;color:${BRAND.muted};">
          ${
            isFirm
              ? `Thanks for trying us${data.firm ? ` at ${escapeHtml(data.firm)}` : ''}. Your document arrived safely, this first one is on us, and we&rsquo;re on it.`
              : isQuote
              ? `Thanks for your quote request${
                  data.files.length
                    ? ` and the ${data.files.length} document${data.files.length > 1 ? 's' : ''} you sent`
                    : ''
                }. Everything arrived safely and we&rsquo;re on it.`
              : 'Thanks for getting in touch. Your message has arrived and we&rsquo;re on it.'
          }
        </p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BRAND.leafSoft};border-radius:12px;">
          <tr><td style="padding:20px 22px;">
            <p style="margin:0 0 14px 0;font-size:13px;font-weight:bold;text-transform:uppercase;letter-spacing:0.06em;color:${BRAND.leaf};">What happens next</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              ${steps
                .map(
                  ([heading, text], i) => `<tr>
                    <td width="30" valign="top" style="padding:0 10px 14px 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
                        <td width="26" height="26" align="center" valign="middle" bgcolor="${BRAND.leaf}" style="width:26px;height:26px;border-radius:13px;color:#ffffff;font-size:13px;font-weight:bold;">${i + 1}</td>
                      </tr></table>
                    </td>
                    <td valign="top" style="padding:0 0 14px 0;">
                      <p style="margin:2px 0 2px 0;font-size:15px;font-weight:bold;color:${BRAND.ink};">${escapeHtml(heading)}</p>
                      <p style="margin:0;font-size:14px;line-height:21px;color:${BRAND.muted};">${escapeHtml(text)}</p>
                    </td>
                  </tr>`
                )
                .join('')}
            </table>
          </td></tr>
        </table>

        ${
          summary
            ? `<p style="margin:28px 0 10px 0;font-size:13px;font-weight:bold;text-transform:uppercase;letter-spacing:0.06em;color:${BRAND.primary};">Your request</p>${summary}`
            : ''
        }

        <p style="margin:28px 0 16px 0;font-size:15px;line-height:24px;color:${BRAND.muted};">
          Need it sooner, or want to add another document? Just reply to this email or give us a call.
        </p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding-right:10px;">${button(`Call ${SITE.phone}`, SITE.phoneHref)}</td>
            <td>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
                <td align="center" bgcolor="#ffffff" style="border:1px solid ${BRAND.primary};border-radius:8px;">
                  <a href="mailto:${SITE.email}" style="display:inline-block;padding:11px 22px;font-size:15px;font-weight:bold;color:${BRAND.primary};text-decoration:none;">Email us</a>
                </td>
              </tr></table>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  const text = [
    `Hi ${firstName},`,
    '',
    isFirm
      ? `Thanks for trying us${data.firm ? ` at ${data.firm}` : ''}. Your document arrived safely, and this first one is on us.`
      : isQuote
        ? `Thanks for your quote request${data.files.length ? ` and the ${data.files.length} document(s) you sent` : ''}. Everything arrived safely.`
        : 'Thanks for getting in touch. Your message has arrived.',
    '',
    'What happens next:',
    ...steps.map(([heading, body], i) => `${i + 1}. ${heading} — ${body}`),
    '',
    data.languagePair && `Languages: ${data.languagePair}`,
    data.documentType && `Document type: ${data.documentType}`,
    data.serviceLevel && `Service needed: ${data.serviceLevel}`,
    data.turnaround && `Turnaround: ${data.turnaround}`,
    data.files.length ? `Documents received: ${data.files.length}` : '',
    '',
    `Questions? Reply to this email or call ${SITE.phone}.`,
    '',
    `— ${SITE.name}, ${SITE.location}`,
    SITE.url,
  ]
    .filter(Boolean)
    .join('\n');

  return {
    html: shell({
      preheader: isFirm
        ? 'Your first document is on us — page count and delivery time coming shortly.'
        : isQuote
          ? 'We have your documents — your quote is on the way.'
          : 'We have your message — we will reply shortly.',
      content,
    }),
    text,
  };
}
