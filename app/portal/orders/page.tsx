'use client';
export const dynamic = 'force-dynamic';


import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, ArrowLeft, FileText, Clock, CheckCircle, DollarSign, Download } from 'lucide-react';

export default function OrdersPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  const handleDownloadTranslated = (order: any) => {
    if (order.translatedFileData) {
      const link = document.createElement('a');
      link.href = order.translatedFileData;
      link.download = order.translatedFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
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

        const userData = await userResponse.json();
        setUser(userData.user);

        // Fetch user's orders
        const ordersResponse = await fetch('/api/orders', {
          credentials: 'include',
        });

        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          setOrders(ordersData.orders || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        router.push('/portal/login');
      }
    };

    fetchData();
  }, [router]);

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-green-100 text-green-800',
      processing: 'bg-yellow-100 text-yellow-800',
      pending: 'bg-gray-100 text-gray-800',
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="mb-6">
          <Link
            href="/portal/dashboard"
            className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-2xl font-heading font-bold text-dark">My Orders</h1>
            </div>
            <Link
              href="/quote"
              className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg transition-colors font-medium text-sm"
            >
              + New Order
            </Link>
          </div>

          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Order Number</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-dark">File</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Languages</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Price</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <span className="text-sm font-medium text-dark">{order.orderNumber || `#${order.id.slice(-6)}`}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="text-sm text-dark-light">{order.fileName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-dark-light">
                          {order.fromLanguage} → {order.toLanguage}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-dark-light capitalize">
                          {order.pricingModel?.replace('-', ' ')} • {order.speed}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm font-semibold text-green-600">
                          ${order.totalPrice?.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                            order.status
                          )}`}
                        >
                          {order.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {order.status === 'processing' && <Clock className="h-3 w-3 mr-1" />}
                          {order.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                          <span className="capitalize">{order.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-dark-light">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {order.status === 'completed' && order.translatedFileData ? (
                          <button
                            onClick={() => handleDownloadTranslated(order)}
                            className="flex items-center space-x-1 text-primary hover:text-primary-dark text-sm font-medium"
                          >
                            <Download className="h-4 w-4" />
                            <span>Download</span>
                          </button>
                        ) : (
                          <span className="text-sm text-dark-light">
                            {order.status === 'processing' ? 'In Progress' : 'Pending'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-dark-light text-lg mb-4">No orders yet</p>
              <Link
                href="/quote"
                className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                Place Your First Order
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
