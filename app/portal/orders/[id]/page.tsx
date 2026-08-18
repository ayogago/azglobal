'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  FileText,
  Clock,
  CheckCircle,
  Download,
  Upload,
  DollarSign,
  CreditCard,
  User,
  Calendar,
  Shield,
  AlertCircle,
  Package,
} from 'lucide-react';
import StripeCheckout from '@/components/StripeCheckout';

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [translatedFile, setTranslatedFile] = useState<File | null>(null);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [priceAmount, setPriceAmount] = useState('');

  useEffect(() => {
    params.then((resolvedParams) => {
      setOrderId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (!orderId) return;

    const fetchData = async () => {
      try {
        // Check authentication
        const userResponse = await fetch('/api/auth/me', {
          credentials: 'include',
        });

        if (!userResponse.ok) {
          router.push('/portal/login');
          return;
        }

        const { user: userData } = await userResponse.json();
        setUser(userData);

        // Fetch order details
        const orderResponse = await fetch(`/api/orders/${orderId}`, {
          credentials: 'include',
        });

        if (orderResponse.ok) {
          const { order: orderData } = await orderResponse.json();
          setOrder(orderData);
        } else {
          router.push('/portal/dashboard');
        }
      } catch (error) {
        console.error('Failed to load order:', error);
        router.push('/portal/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId, router]);

  const handleDownloadOriginal = () => {
    const files = Array.isArray(order?.files) ? order.files : [];
    const file = files[0];

    if (file) {
      const fileData = file.data || file.fileData;
      const fileName = file.name || file.fileName || 'document.pdf';

      if (fileData) {
        const link = document.createElement('a');
        link.href = fileData;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const handleDownloadTranslated = () => {
    if (order?.translatedFileData) {
      const link = document.createElement('a');
      link.href = order.translatedFileData;
      link.download = order.translatedFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleUploadTranslation = async () => {
    if (!translatedFile) return;

    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (translatedFile.size > MAX_FILE_SIZE) {
      alert(`File is too large. Maximum size is 10MB.`);
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const fileData = reader.result;

        const response = await fetch(`/api/orders/${orderId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            translatedFileData: fileData,
            translatedFileName: translatedFile.name,
            translatedFileType: translatedFile.type,
            status: 'COMPLETED',
          }),
          credentials: 'include',
        });

        if (response.ok) {
          const { order: updatedOrder } = await response.json();
          setOrder(updatedOrder);
          setShowUploadModal(false);
          setTranslatedFile(null);
        }
      };

      reader.readAsDataURL(translatedFile);
    } catch (error) {
      console.error('Failed to upload:', error);
    }
  };

  const handleUpdateStatus = async (newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
        credentials: 'include',
      });

      if (response.ok) {
        const { order: updatedOrder } = await response.json();
        setOrder(updatedOrder);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleUpdatePaymentStatus = async (isPaid: boolean) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPaid }),
        credentials: 'include',
      });

      if (response.ok) {
        const { order: updatedOrder } = await response.json();
        setOrder(updatedOrder);
      }
    } catch (error) {
      console.error('Failed to update payment:', error);
    }
  };

  const handleSetPrice = async () => {
    if (!priceAmount) return;

    const price = parseFloat(priceAmount);
    if (isNaN(price) || price < 0) {
      alert('Please enter a valid price');
      return;
    }

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalPrice: price,
          needsPricing: false,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        const { order: updatedOrder } = await response.json();
        setOrder(updatedOrder);
        setShowPriceModal(false);
        setPriceAmount('');
      }
    } catch (error) {
      console.error('Failed to update price:', error);
    }
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPaid: true, paymentIntentId }),
        credentials: 'include',
      });

      if (response.ok) {
        const { order: updatedOrder } = await response.json();
        setOrder(updatedOrder);
        setShowPaymentModal(false);
        alert('Payment successful!');
      }
    } catch (error) {
      console.error('Failed to update payment:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const normalized = status?.toLowerCase();
    const styles = {
      completed: 'bg-green-100 text-green-800 border-green-200',
      processing: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      pending: 'bg-gray-100 text-gray-800 border-gray-200',
      new: 'bg-blue-100 text-blue-800 border-blue-200',
    };
    return styles[normalized as keyof typeof styles] || styles.pending;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Clock className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-dark-light">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order || !user) {
    return null;
  }

  const isAdmin = user.role === 'ADMIN';
  const files = Array.isArray(order.files) ? order.files : [];
  const file = files[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/portal/dashboard"
              className="flex items-center space-x-2 text-dark-light hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
            <div className="text-right">
              <p className="text-sm font-medium text-dark">{user.name}</p>
              <p className="text-xs text-dark-light">{user.email}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        {/* Order Header */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-white/20 p-3 rounded-xl">
                  <FileText className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold">
                    {order.orderNumber || `Order #${order.id.slice(-6)}`}
                  </h1>
                  <p className="text-white/80 mt-1">
                    Created {new Date(order.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-white/20 border-2 border-white/40`}>
                {order.isPaid ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Paid
                  </>
                ) : (
                  <>
                    <Clock className="h-4 w-4 mr-2" />
                    Unpaid
                  </>
                )}
              </span>
              <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold capitalize ${getStatusBadge(order.status)} border-2`}>
                {order.status}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              <h2 className="text-2xl font-heading font-bold text-dark mb-6 flex items-center">
                <Package className="h-6 w-6 mr-3 text-primary" />
                Order Information
              </h2>

              <div className="space-y-6">
                {/* File Information */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border-2 border-primary/20">
                  <h3 className="text-sm font-bold text-dark-light uppercase mb-3">Document</h3>
                  <div className="flex items-start space-x-4">
                    <div className="bg-white p-4 rounded-xl shadow-md">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-bold text-dark mb-1">
                        {file?.fileName || file?.name || 'No file'}
                      </p>
                      <p className="text-sm text-dark-light">
                        {file?.fileType || 'Unknown type'}
                      </p>
                      {file && (
                        <button
                          onClick={handleDownloadOriginal}
                          className="mt-3 inline-flex items-center space-x-2 text-primary hover:text-primary-dark font-semibold text-sm"
                        >
                          <Download className="h-4 w-4" />
                          <span>Download Original</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <p className="text-xs font-bold text-dark-light uppercase mb-2">From Language</p>
                    <p className="text-xl font-bold text-dark">{order.fromLanguage}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <p className="text-xs font-bold text-dark-light uppercase mb-2">To Language</p>
                    <p className="text-xl font-bold text-dark">{order.toLanguage}</p>
                  </div>
                </div>

                {/* Service Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <p className="text-xs font-bold text-dark-light uppercase mb-2">Service Type</p>
                    <p className="text-lg font-semibold text-dark capitalize">{order.serviceType || 'Standard'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <p className="text-xs font-bold text-dark-light uppercase mb-2">Document Type</p>
                    <p className="text-lg font-semibold text-dark capitalize">{order.documentType || 'General'}</p>
                  </div>
                </div>

                {order.wordCount > 0 && (
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <p className="text-xs font-bold text-dark-light uppercase mb-2">Word Count</p>
                    <p className="text-xl font-bold text-dark">{order.wordCount.toLocaleString()} words</p>
                  </div>
                )}

                {order.specialInstructions && (
                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                    <p className="text-xs font-bold text-blue-800 uppercase mb-2">Special Instructions</p>
                    <p className="text-sm text-dark">{order.specialInstructions}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Translated File Section */}
            {(order.translatedFileData || isAdmin) && (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                <h2 className="text-2xl font-heading font-bold text-dark mb-6 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-3 text-green-600" />
                  Translated Document
                </h2>

                {order.translatedFileData ? (
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                    <div className="flex items-start space-x-4">
                      <div className="bg-white p-4 rounded-xl shadow-md">
                        <FileText className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-bold text-dark mb-1">{order.translatedFileName}</p>
                        <p className="text-sm text-dark-light mb-4">Translation completed</p>
                        <button
                          onClick={handleDownloadTranslated}
                          className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                        >
                          <Download className="h-5 w-5" />
                          <span>Download Translation</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : isAdmin && (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-dark-light mb-4">No translated file uploaded yet</p>
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                      <Upload className="h-5 w-5" />
                      <span>Upload Translation</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Pricing & Actions */}
          <div className="space-y-6">
            {/* Customer Info (Admin Only) */}
            {isAdmin && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-heading font-bold text-dark mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-primary" />
                  Customer
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-bold text-dark-light uppercase">Name</p>
                    <p className="text-sm font-semibold text-dark">{order.userName || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-dark-light uppercase">Email</p>
                    <p className="text-sm text-dark">{order.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Pricing */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-heading font-bold text-dark mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-primary" />
                Pricing
              </h3>

              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border-2 border-primary/20 mb-4">
                <p className="text-sm text-dark-light mb-2">Total Amount</p>
                {order.needsPricing || order.totalPrice === 0 ? (
                  <div>
                    <p className="text-4xl font-bold text-orange-600 mb-2">TBD</p>
                    {isAdmin && (
                      <button
                        onClick={() => setShowPriceModal(true)}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold shadow-md transition-all"
                      >
                        Set Price
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-4xl font-bold text-green-600">${order.totalPrice.toFixed(2)}</p>
                )}
              </div>

              {/* Payment Actions */}
              {!order.isPaid && !order.needsPricing && order.totalPrice > 0 && !isAdmin && (
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Pay ${order.totalPrice.toFixed(2)} Now</span>
                </button>
              )}

              {/* Admin Payment Toggle */}
              {isAdmin && (
                <div className="mt-4">
                  <label className="block text-sm font-bold text-dark-light uppercase mb-2">Payment Status</label>
                  <select
                    value={order.isPaid ? 'true' : 'false'}
                    onChange={(e) => handleUpdatePaymentStatus(e.target.value === 'true')}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold focus:outline-none focus:border-primary"
                  >
                    <option value="false">💳 Unpaid</option>
                    <option value="true">✓ Paid</option>
                  </select>
                </div>
              )}
            </div>

            {/* Admin Controls */}
            {isAdmin && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-heading font-bold text-dark mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Admin Controls
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-dark-light uppercase mb-2">Order Status</label>
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold focus:outline-none focus:border-primary"
                    >
                      <option value="NEW">New</option>
                      <option value="PENDING">Pending</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="w-full inline-flex items-center justify-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Upload className="h-5 w-5" />
                    <span>Upload Translation</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && isAdmin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-heading font-bold text-dark mb-4">Upload Translation</h3>
            <input
              type="file"
              onChange={(e) => setTranslatedFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
            />
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setTranslatedFile(null);
                }}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadTranslation}
                disabled={!translatedFile}
                className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Price Modal */}
      {showPriceModal && isAdmin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-heading font-bold text-dark mb-4">Set Order Price</h3>
            <input
              type="number"
              step="0.01"
              value={priceAmount}
              onChange={(e) => setPriceAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
            />
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setShowPriceModal(false);
                  setPriceAmount('');
                }}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSetPrice}
                disabled={!priceAmount}
                className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50"
              >
                Set Price
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <StripeCheckout
          amount={order.totalPrice}
          onSuccess={handlePaymentSuccess}
          onCancel={() => setShowPaymentModal(false)}
          metadata={{
            orderId: order.id,
            orderNumber: order.orderNumber,
            fromLanguage: order.fromLanguage,
            toLanguage: order.toLanguage,
          }}
        />
      )}
    </div>
  );
}
