'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { DollarSign, CheckCircle } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutFormProps {
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  onCancel: () => void;
  metadata?: Record<string, string>;
}

function CheckoutForm({ amount, onSuccess, onCancel, metadata }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage('Payment system not ready. Please wait a moment and try again.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // Submit the payment element to ensure all data is collected
      const { error: submitError } = await elements.submit();

      if (submitError) {
        setErrorMessage(submitError.message || 'Payment failed');
        setIsProcessing(false);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: {
          return_url: `${window.location.origin}/portal/dashboard?payment=success`,
        },
      });

      if (error) {
        setErrorMessage(error.message || 'Payment failed');
        setIsProcessing(false);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <PaymentElement
          onReady={() => setIsReady(true)}
          options={{
            layout: 'tabs'
          }}
        />
      </div>

      {!isReady && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <p className="text-sm text-gray-600 flex items-center">
            <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full mr-2"></div>
            Loading payment form...
          </p>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-800">{errorMessage}</p>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <CheckCircle className="h-4 w-4 inline mr-2" />
          Secure payment processed by Stripe
        </p>
      </div>

      <div className="flex space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 border border-gray-300 text-dark-light hover:bg-gray-50 rounded-lg transition-colors font-medium"
          disabled={isProcessing}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isProcessing || !stripe || !isReady}
          className="flex-1 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              Processing...
            </span>
          ) : !isReady ? (
            'Loading...'
          ) : (
            `Pay $${amount.toFixed(2)}`
          )}
        </button>
      </div>
    </form>
  );
}

interface StripeCheckoutProps {
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  onCancel: () => void;
  metadata?: Record<string, string>;
  guestOrderId?: string;
  guestOrderToken?: string;
}

export default function StripeCheckout({ amount, onSuccess, onCancel, metadata, guestOrderId, guestOrderToken }: StripeCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create PaymentIntent as soon as the component mounts
    fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        amount,
        currency: 'usd',
        metadata,
        guestOrderId,
        guestOrderToken,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError(data.error || 'Failed to initialize payment');
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setError('Failed to initialize payment');
        setIsLoading(false);
      });
  }, [amount, metadata, guestOrderId, guestOrderToken]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
            <p className="text-dark-light">Initializing payment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800">{error}</p>
          </div>
          <button
            onClick={onCancel}
            className="w-full px-6 py-3 bg-gray-200 text-dark hover:bg-gray-300 rounded-lg transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return null;
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#0066cc',
        colorBackground: '#ffffff',
        colorText: '#1a1a1a',
        colorDanger: '#df1b41',
        fontFamily: 'system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative my-8 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-dark mb-2">
            Complete Payment
          </h3>
          <p className="text-dark-light mb-4">
            Total Amount: <span className="text-2xl font-bold text-primary">${amount.toFixed(2)}</span>
          </p>
        </div>

        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            amount={amount}
            onSuccess={onSuccess}
            onCancel={onCancel}
            metadata={metadata}
          />
        </Elements>
      </div>
    </div>
  );
}
