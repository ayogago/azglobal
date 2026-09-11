# AZ Global Translations — website

Informational marketing site for [azglobaltranslations.com](https://azglobaltranslations.com):
certified Armenian, Russian and Ukrainian ⇄ English translation.

No accounts, checkout or database. Visitors request a quote (with document uploads) or send a message;
submissions are emailed to the team.

## Stack

- Next.js 15 (App Router) + Tailwind CSS, deployed on Vercel
- Vercel Blob (**private** store) for uploaded documents — browser uploads directly, so large scans work
- Nodemailer over SMTP for notification + confirmation emails
- Self-hosted fonts (Montserrat, Open Sans) via Fontsource

## How the request form works

1. The browser uploads each file to the private Blob store using a short-lived token from `POST /api/upload`
   (PDF, JPG/PNG/HEIC, Word, etc.; up to 10 files, 25 MB each).
2. The form posts details + file references to `POST /api/request`, which validates everything,
   emails the team (files attached when ≤ 15 MB total, plus signed download links), and sends the customer a confirmation.
3. Download links go through `GET /api/files/...?sig=…` (HMAC-signed; only people with the email can open them).
4. A daily cron (`/api/cron/cleanup`, see `vercel.json`) deletes uploads older than `UPLOAD_RETENTION_DAYS` (default 90).

Spam protection: honeypot field + per-IP rate limits.

## Pages

| Path | Purpose |
| --- | --- |
| `/` | Home |
| `/quote` | Quote request form |
| `/armenian-translation`, `/russian-translation`, `/ukrainian-translation` | Language landing pages (SEO) with embedded form |
| `/services`, `/about`, `/contact` | Info pages (contact has a message form) |
| `/privacy-policy`, `/terms-and-conditions` | Legal |

Old `/portal/*`, `/admin/*` and `/complete-order` URLs permanently redirect to `/quote` or `/`.

Business details (phone, email, languages, form options) live in `lib/site.ts`; page copy for services,
FAQs and language pages lives in `lib/content.ts`.

## Development

```bash
npm install
cp .env.example .env.local   # fill in SMTP + BLOB_READ_WRITE_TOKEN
npm run dev
npm run lint && npm run build
```
