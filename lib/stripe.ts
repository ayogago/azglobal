import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

/**
 * Lazily instantiate the Stripe client so that importing this module (which
 * happens during `next build` page-data collection) does not require the
 * secret to be present. The key is only required when Stripe is actually used
 * at request time.
 */
export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
  }

  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-10-29.clover',
      typescript: true,
    });
  }

  return stripeClient;
}
