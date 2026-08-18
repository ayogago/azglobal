# AZ Global Translations

Production Next.js 15 (App Router) website and client portal for AZ Global
Translations — professional certified translation services. Includes a public
marketing site, a customer/admin portal with authentication, order management,
document uploads, and Stripe payments.

## Tech stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS 3**
- **Prisma** ORM (PostgreSQL)
- **jose** JWT auth, **bcryptjs** password hashing
- **Stripe** (Payment Intents) for checkout
- **Nodemailer** for transactional email

## Getting Started

### Prerequisites

- Node.js 18+ (20+ recommended)
- A PostgreSQL database
- npm

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` (see [Environment Variables](#environment-variables) below).

3. Generate the Prisma client and apply migrations:

   ```bash
   npx prisma generate
   npx prisma migrate deploy   # or `npx prisma migrate dev` in development
   ```

4. (Optional) Create the initial admin user:

   ```bash
   node scripts/create-admin.js
   ```

   Change the default credentials in that script — and rotate the password
   immediately after first login.

5. Run the development server (port **3005**):

   ```bash
   npm run dev
   ```

   Open [http://localhost:3005](http://localhost:3005).

## Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start the dev server on port 3005        |
| `npm run build` | Production build                         |
| `npm start`     | Start the production server on port 3005 |
| `npm run lint`  | Run ESLint (`next lint`)                 |

## Environment Variables

All of the following are read at runtime. `JWT_SECRET` and the Stripe keys are
required — the app fails closed (throws) if the secret is missing rather than
falling back to an insecure default.

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Auth — REQUIRED. Use a long, random value (e.g. `openssl rand -base64 48`).
JWT_SECRET=your-long-random-secret

# Stripe — REQUIRED for checkout
STRIPE_SECRET_KEY=sk_live_or_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_or_test_...

# SMTP (transactional email)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-smtp-password
SMTP_FROM=info@azglobaltranslations.com
SMTP_FROM_NAME=AZ Global Translations

# App URL (used in emails and absolute links)
NEXT_PUBLIC_APP_URL=https://azglobaltranslations.com
```

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout, global metadata
│   ├── page.tsx                # Homepage
│   ├── services|about|contact|quote/   # Marketing pages
│   ├── privacy-policy|terms-and-conditions/
│   ├── complete-order/         # Guest order completion + payment
│   ├── portal/                 # Authenticated customer + admin portal
│   ├── admin/                  # Admin views
│   └── api/                    # Route handlers (auth, orders, stripe, users, …)
├── components/                 # Header, Footer, Logo, StripeCheckout
├── lib/                        # auth, prisma, stripe, email, pdf, rate-limit
├── prisma/                     # schema.prisma + migrations
├── scripts/create-admin.js     # Seed an admin user
└── public/                     # Static assets (logo, icons, manifest)
```

## Payments

Checkout uses Stripe Payment Intents. The `/api/stripe/webhook` endpoint
verifies the Stripe signature and is the source of truth for marking orders
paid; configure it in the Stripe dashboard and set `STRIPE_WEBHOOK_SECRET`.

## Deployment

Designed for Vercel (or any Node host). Set all environment variables in the
hosting provider, then build:

```bash
npm run build
npm start
```

Behind a TLS-terminating proxy (e.g. nginx), the session cookie is still marked
`Secure` in production because the browser connection is HTTPS.

## License

Copyright © AZ Global Translations. All rights reserved.

## Support

For questions or support, contact: info@azglobaltranslations.com
