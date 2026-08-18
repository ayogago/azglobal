'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, FileText, AlertCircle, Lock } from 'lucide-react';
import StripeCheckout from '@/components/StripeCheckout';

function CompleteOrderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  const token = searchParams.get('token');

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'verify' | 'account' | 'payment' | 'complete'>('verify');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [accountData, setAccountData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
  });
  const [accountError, setAccountError] = useState('');
  const [accountLoading, setAccountLoading] = useState(false);

  useEffect(() => {
    if (orderId && token) {
      verifyOrder();
    } else {
      setError('Invalid or missing order link');
      setLoading(false);
    }
  }, [orderId, token]);

  const verifyOrder = async () => {
    try {
      const response = await fetch(`/api/orders/verify-guest?id=${orderId}&token=${token}`);

      if (!response.ok) {
        throw new Error('Invalid or expired order link');
      }

      const data = await response.json();
      setOrder(data.order);

      // Check if order is already completed
      if (data.order.userId && data.order.isPaid) {
        setStep('complete');
      } else {
        setStep('account');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify order');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 0) {
      if (value.length <= 3) {
        value = `(${value}`;
      } else if (value.length <= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      } else {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
      }
    }

    setAccountData({ ...accountData, phone: value });
  };

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAccountError('');

    if (!accountData.firstName || !accountData.lastName || !accountData.phone || !accountData.password) {
      setAccountError('Please fill in all fields');
      return;
    }

    if (accountData.password.length < 8) {
      setAccountError('Password must be at least 8 characters');
      return;
    }

    // Move to payment step
    setStep('payment');
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    setShowPaymentModal(false);
    setAccountLoading(true);

    try {
      // Create account and complete order
      const response = await fetch('/api/orders/complete-guest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          token: token,
          paymentIntentId: paymentIntentId,
          firstName: accountData.firstName,
          lastName: accountData.lastName,
          phone: accountData.phone,
          password: accountData.password,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to complete order');
      }

      setStep('complete');
    } catch (err) {
      setAccountError(err instanceof Error ? err.message : 'Failed to complete order');
      setAccountLoading(false);
    }
  };

  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
    setStep('account');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-dark-light">Verifying your order...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-dark mb-2">Error</h2>
          <p className="text-dark-light mb-6">{error}</p>
          <button
            onClick={() => router.push('/quote')}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            Request New Quote
          </button>
        </div>
      </div>
    );
  }

  if (step === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-dark mb-2">Order Complete!</h2>
          <p className="text-dark-light mb-6">
            Your payment has been processed and your account has been created. Our team will start working on your translation immediately.
          </p>
          <button
            onClick={() => router.push('/portal/dashboard')}
            className="w-full bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-blue-50">
      {/* Header */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container-custom py-12 md:py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Complete Your Order
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Finalize payment and create your account to track your translation
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 -mt-10 relative z-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="bg-primary/10 p-3 rounded-xl mr-3">
                      <Lock className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-dark">
                      Create Your Account
                    </h2>
                  </div>

                  <p className="text-dark-light mb-6">
                    Set up your account to track your translation and download your completed files.
                  </p>

                  <form onSubmit={handleAccountSubmit} className="space-y-4">
                    {accountError && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
                        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-800">{accountError}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold text-dark mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={accountData.firstName}
                          onChange={(e) => setAccountData({ ...accountData, firstName: e.target.value })}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-gray-50"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-semibold text-dark mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={accountData.lastName}
                          onChange={(e) => setAccountData({ ...accountData, lastName: e.target.value })}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-gray-50"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-dark mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={accountData.phone}
                        onChange={handlePhoneChange}
                        required
                        maxLength={14}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-gray-50"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-semibold text-dark mb-2">
                        Password *
                      </label>
                      <input
                        type="password"
                        id="password"
                        value={accountData.password}
                        onChange={(e) => setAccountData({ ...accountData, password: e.target.value })}
                        required
                        minLength={8}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-gray-50"
                        placeholder="••••••••"
                      />
                      <p className="text-xs text-dark-light mt-1">Minimum 8 characters</p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                      <p className="text-sm text-blue-800 flex items-start">
                        <Lock className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span>Your information is secure and encrypted. After creating your account, you'll proceed to payment.</span>
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={accountLoading}
                      className="w-full bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                    >
                      {accountLoading ? 'Processing...' : 'Continue to Payment'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <div className="bg-gradient-to-br from-primary via-primary to-primary-dark rounded-2xl shadow-2xl p-6 text-white border-4 border-white/20">
                    <h3 className="text-xl font-heading font-bold mb-4 flex items-center">
                      <FileText className="h-6 w-6 mr-2" />
                      Order Summary
                    </h3>

                    {order && (
                      <div className="space-y-3 mb-6">
                        {order.orderNumber && (
                          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                            <p className="text-xs opacity-90">Order Number</p>
                            <p className="font-bold text-sm">{order.orderNumber}</p>
                          </div>
                        )}
                        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                          <p className="text-xs opacity-90">Translation</p>
                          <p className="font-bold text-sm">{order.fromLanguage} → {order.toLanguage}</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                          <p className="text-xs opacity-90">Service</p>
                          <p className="font-bold text-sm">{order.serviceType}</p>
                        </div>
                      </div>
                    )}

                    <div className="border-t border-white/30 pt-4">
                      <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                        <p className="text-sm opacity-90 mb-1">Total Amount</p>
                        <p className="text-4xl font-bold">
                          ${order?.totalPrice?.toFixed(2) || '0.00'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <p className="text-xs leading-relaxed flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Professional translation by certified translators</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stripe Payment Modal */}
      {showPaymentModal && order && (
        <StripeCheckout
          amount={order.totalPrice}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
          guestOrderId={order.id}
          guestOrderToken={token || ''}
          metadata={{
            orderId: order.id,
            fromLanguage: order.fromLanguage,
            toLanguage: order.toLanguage,
          }}
        />
      )}
    </div>
  );
}

export default function CompletePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-dark-light">Loading...</p>
        </div>
      </div>
    }>
      <CompleteOrderContent />
    </Suspense>
  );
}
