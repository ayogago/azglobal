'use client';
export const dynamic = 'force-dynamic';


import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Upload,
  FileText,
  Clock,
  CheckCircle,
  Download,
  LogOut,
  User,
  Settings,
  PlusCircle,
  FolderOpen,
  Users,
  Eye,
  Edit,
  Trash2,
  Shield,
  Folder,
  DollarSign,
  HardDrive,
  CreditCard
} from 'lucide-react';
import StripeCheckout from '@/components/StripeCheckout';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [folders, setFolders] = useState<any[]>([]);
  const [totalSales, setTotalSales] = useState(0);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [translatedFile, setTranslatedFile] = useState<File | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<any>(null);
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [showDeleteClientModal, setShowDeleteClientModal] = useState(false);
  const [showDeleteOrderModal, setShowDeleteOrderModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [priceAmount, setPriceAmount] = useState('');
  const [showOrderPaymentModal, setShowOrderPaymentModal] = useState(false);
  const [selectedOrderForPayment, setSelectedOrderForPayment] = useState<any>(null);
  const [editClientData, setEditClientData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });
  // Storage management not needed with database storage
  // const [showStorageManagement, setShowStorageManagement] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('[Dashboard] Checking authentication...');
        // Check authentication
        const userResponse = await fetch('/api/auth/me', {
          credentials: 'include',
        });
        console.log('[Dashboard] Auth response status:', userResponse.status);

        if (!userResponse.ok) {
          console.log('[Dashboard] Auth failed, redirecting to login');
          router.push('/portal/login');
          return;
        }

        const { user: userData } = await userResponse.json();
        console.log('[Dashboard] User loaded:', userData.email);
        setUser(userData);

        // Load orders
        const ordersResponse = await fetch('/api/orders', {
          credentials: 'include',
        });
        if (ordersResponse.ok) {
          const { orders: ordersData } = await ordersResponse.json();
          setOrders(ordersData);

          // Calculate total sales if admin
          if (userData.role === 'ADMIN') {
            const sales = ordersData.reduce((sum: number, order: any) => sum + (order.totalPrice || 0), 0);
            setTotalSales(sales);
          }
        }

        // Load folders
        const foldersResponse = await fetch('/api/folders', {
          credentials: 'include',
        });
        if (foldersResponse.ok) {
          const { folders: foldersData } = await foldersResponse.json();
          setFolders(foldersData);
        }

        // Load clients for admin
        if (userData.role === 'ADMIN') {
          const clientsResponse = await fetch('/api/admin/clients', {
            credentials: 'include',
          });
          if (clientsResponse.ok) {
            const clientsData = await clientsResponse.json();
            setClients(clientsData.clients);
          }
        }
      } catch (error) {
        console.error('Failed to load data:', error);
        router.push('/portal/login');
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    router.push('/portal/login');
  };

  const handleDownloadOriginal = (order: any) => {
    // Get file data from the files array
    const files = Array.isArray(order.files) ? order.files : [];
    const file = files[0]; // Get first file

    if (file) {
      // Support both 'data' and 'fileData' field names
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

  const handleUploadTranslated = (order: any) => {
    setSelectedOrder(order);
    setShowUploadModal(true);
  };

  const handleTranslatedFileSubmit = async () => {
    if (!translatedFile || !selectedOrder) return;

    // Check file size (10MB limit)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (translatedFile.size > MAX_FILE_SIZE) {
      alert(`File "${translatedFile.name}" is too large (${(translatedFile.size / 1024 / 1024).toFixed(2)} MB).\n\nMaximum file size is 10MB. Please upload a smaller file.`);
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const fileData = reader.result;

        // Update order with translated file
        const response = await fetch(`/api/orders/${selectedOrder.id}`, {
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
          setOrders(orders.map((o: any) => (o.id === selectedOrder.id ? updatedOrder : o)));
          setShowUploadModal(false);
          setTranslatedFile(null);
          setSelectedOrder(null);
        }
      };

      reader.readAsDataURL(translatedFile);
    } catch (error) {
      console.error('Failed to upload translated file:', error);
    }
  };

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

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
        credentials: 'include',
      });

      if (response.ok) {
        // Update local state
        setOrders(orders.map((o: any) => (o.id === orderId ? { ...o, status: newStatus } : o)));
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const handleUpdatePaymentStatus = async (orderId: string, isPaid: boolean) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPaid }),
        credentials: 'include',
      });

      if (response.ok) {
        // Update local state
        setOrders(orders.map((o: any) => (o.id === orderId ? { ...o, isPaid } : o)));
      }
    } catch (error) {
      console.error('Failed to update payment status:', error);
    }
  };

  const handleSetPrice = (order: any) => {
    setSelectedOrder(order);
    setPriceAmount('');
    setShowPriceModal(true);
  };

  const handleSubmitPrice = async () => {
    if (!selectedOrder || !priceAmount) return;

    const price = parseFloat(priceAmount);
    if (isNaN(price) || price < 0) {
      alert('Please enter a valid price');
      return;
    }

    try {
      const response = await fetch(`/api/orders/${selectedOrder.id}`, {
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
        // Update local state
        setOrders(orders.map((o: any) => (o.id === selectedOrder.id ? updatedOrder : o)));
        setShowPriceModal(false);
        setSelectedOrder(null);
        setPriceAmount('');
      } else {
        alert('Failed to update price');
      }
    } catch (error) {
      console.error('Failed to update price:', error);
      alert('An error occurred while updating the price');
    }
  };

  const handleOrderPaymentSuccess = async (paymentIntentId: string) => {
    if (!selectedOrderForPayment) return;

    try {
      // Update order to mark as paid
      const response = await fetch(`/api/orders/${selectedOrderForPayment.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isPaid: true,
          paymentIntentId,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        const { order: updatedOrder } = await response.json();
        // Update local state
        setOrders(orders.map((o: any) => (o.id === selectedOrderForPayment.id ? updatedOrder : o)));
        setShowOrderPaymentModal(false);
        setSelectedOrderForPayment(null);
        alert('Payment successful! Your order is now being processed.');
      } else {
        alert('Failed to update order payment status');
      }
    } catch (error) {
      console.error('Failed to update order payment:', error);
      alert('An error occurred while processing payment');
    }
  };

  const handleOrderPaymentCancel = () => {
    setShowOrderPaymentModal(false);
    setSelectedOrderForPayment(null);
  };

  const handleDeleteOrder = async () => {
    if (!selectedOrder) return;

    try {
      const response = await fetch(`/api/orders/${selectedOrder.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        // Remove from local state
        setOrders(orders.filter((o: any) => o.id !== selectedOrder.id));
        setShowDeleteOrderModal(false);
        setSelectedOrder(null);
      } else {
        alert('Failed to delete order');
      }
    } catch (error) {
      console.error('Failed to delete order:', error);
      alert('An error occurred while deleting the order');
    }
  };

  const handleEditClient = (client: any) => {
    setSelectedClient(client);
    setEditClientData({
      name: client.name || '',
      email: client.email || '',
      phone: client.phone || '',
      password: '',
    });
    setShowEditClientModal(true);
  };

  const handleUpdateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;

    try {
      const updateData: any = {
        name: editClientData.name,
        email: editClientData.email,
        phone: editClientData.phone,
      };

      // Only include password if it's been entered
      if (editClientData.password) {
        updateData.password = editClientData.password;
      }

      const response = await fetch(`/api/users/${selectedClient.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
        credentials: 'include',
      });

      if (response.ok) {
        const { user: updatedUser } = await response.json();
        // Update local state
        setClients(clients.map((c: any) => (c.id === selectedClient.id ? {
          ...c,
          ...updatedUser,
          joinDate: c.joinDate, // Keep original join date
        } : c)));
        setShowEditClientModal(false);
        setSelectedClient(null);
        setEditClientData({ name: '', email: '', phone: '', password: '' });
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to update client');
      }
    } catch (error) {
      console.error('Failed to update client:', error);
      alert('An error occurred while updating the client');
    }
  };

  const handleDeleteClient = async () => {
    if (!selectedClient) return;

    try {
      const response = await fetch(`/api/users/${selectedClient.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        // Remove from local state
        setClients(clients.filter((c: any) => c.id !== selectedClient.id));
        setShowDeleteClientModal(false);
        setSelectedClient(null);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete client');
      }
    } catch (error) {
      console.error('Failed to delete client:', error);
      alert('An error occurred while deleting the client');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-gray-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const normalizedStatus = status?.toLowerCase();
    const styles = {
      completed: 'bg-green-100 text-green-800',
      processing: 'bg-yellow-100 text-yellow-800',
      pending: 'bg-gray-100 text-gray-800',
      new: 'bg-blue-100 text-blue-800',
    };
    return styles[normalizedStatus as keyof typeof styles] || styles.pending;
  };

  const getFolderStatusBadge = (status: string) => {
    const normalizedStatus = status?.toLowerCase();
    const styles = {
      new: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
    };
    return styles[normalizedStatus as keyof typeof styles] || styles.new;
  };

  const handlePayForFolder = (folder: any) => {
    setSelectedFolder(folder);
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFolder) return;

    try {
      const response = await fetch(`/api/folders/${selectedFolder.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPaid: true }),
        credentials: 'include',
      });

      if (response.ok) {
        const { folder: updatedFolder } = await response.json();
        setFolders(folders.map((f: any) => (f.id === selectedFolder.id ? updatedFolder : f)));

        // Reset payment modal
        setShowPaymentModal(false);
        setSelectedFolder(null);
        setPaymentData({
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          cardholderName: '',
        });
      }
    } catch (error) {
      console.error('Failed to process payment:', error);
    }
  };

  // Storage management functions removed - not needed with database storage
  /*
  const getStorageInfo = () => { ... };
  const handleClearArchivedFolders = () => { ... };
  const handleClearOldOrders = () => { ... };
  */

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-xl font-heading font-bold text-dark">
                AZ Global Translations
              </Link>
              <span className="text-dark-light">/ Client Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-dark">{user.name}</p>
                <p className="text-xs text-dark-light">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-dark-light hover:text-primary transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        {/* Stats Overview */}
        {user.role === 'ADMIN' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-light mb-1">Total Orders</p>
                    <p className="text-2xl font-bold text-dark">{orders.length}</p>
                  </div>
                  <FileText className="h-10 w-10 text-primary/20" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-light mb-1">Total Sales</p>
                    <p className="text-2xl font-bold text-green-600">${totalSales.toFixed(2)}</p>
                  </div>
                  <CheckCircle className="h-10 w-10 text-green-500/20" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-light mb-1">Total Clients</p>
                    <p className="text-2xl font-bold text-primary">{clients.length}</p>
                  </div>
                  <Users className="h-10 w-10 text-primary/20" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-light mb-1">Needs Pricing</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {orders.filter((o) => o.needsPricing).length}
                    </p>
                  </div>
                  <DollarSign className="h-10 w-10 text-orange-500/20" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-light mb-1">Pending Orders</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {orders.filter((o) => o.status === 'pending').length}
                    </p>
                  </div>
                  <Clock className="h-10 w-10 text-yellow-500/20" />
                </div>
              </div>
            </div>

            {/* Folder Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-light mb-1">Total Folders</p>
                    <p className="text-2xl font-bold text-dark">{folders.length}</p>
                  </div>
                  <Folder className="h-10 w-10 text-primary/20" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-light mb-1">New Folders</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {folders.filter((f) => f.status === 'new' && !f.isArchived).length}
                    </p>
                  </div>
                  <Folder className="h-10 w-10 text-blue-500/20" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-light mb-1">In Progress</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {folders.filter((f) => f.status === 'pending' && !f.isArchived).length}
                    </p>
                  </div>
                  <Clock className="h-10 w-10 text-yellow-500/20" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-light mb-1">Completed Folders</p>
                    <p className="text-2xl font-bold text-green-600">
                      {folders.filter((f) => f.status === 'completed' && !f.isArchived).length}
                    </p>
                  </div>
                  <CheckCircle className="h-10 w-10 text-green-500/20" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Order Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-light mb-1">Total Orders</p>
                    <p className="text-2xl font-bold text-dark">{orders.length}</p>
                  </div>
                  <FileText className="h-10 w-10 text-primary/20" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-light mb-1">Completed</p>
                    <p className="text-2xl font-bold text-green-600">
                      {orders.filter((o) => o.status === 'completed').length}
                    </p>
                  </div>
                  <CheckCircle className="h-10 w-10 text-green-500/20" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-light mb-1">In Progress</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {orders.filter((o) => o.status === 'processing').length}
                    </p>
                  </div>
                  <Clock className="h-10 w-10 text-yellow-500/20" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-light mb-1">Pending</p>
                    <p className="text-2xl font-bold text-gray-600">
                      {orders.filter((o) => o.status === 'pending').length}
                    </p>
                  </div>
                  <Clock className="h-10 w-10 text-gray-400/20" />
                </div>
              </div>
            </div>

            {/* Folder Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-light mb-1">My Folders</p>
                    <p className="text-2xl font-bold text-dark">{folders.length}</p>
                  </div>
                  <Folder className="h-10 w-10 text-primary/20" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-light mb-1">New Folders</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {folders.filter((f) => f.status === 'new').length}
                    </p>
                  </div>
                  <Folder className="h-10 w-10 text-blue-500/20" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-light mb-1">In Progress</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {folders.filter((f) => f.status === 'pending').length}
                    </p>
                  </div>
                  <Clock className="h-10 w-10 text-yellow-500/20" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-light mb-1">Completed</p>
                    <p className="text-2xl font-bold text-green-600">
                      {folders.filter((f) => f.status === 'completed').length}
                    </p>
                  </div>
                  <CheckCircle className="h-10 w-10 text-green-500/20" />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Quick Actions */}
        {user.role === 'ADMIN' ? (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-heading font-bold text-dark mb-4">Admin Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link
                href="/portal/admin/folders"
                className="flex items-center space-x-3 p-4 border-2 border-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                <FolderOpen className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold text-dark">Client Folders</p>
                  <p className="text-sm text-dark-light">Manage translations</p>
                </div>
              </Link>

              <Link
                href="/portal/admin/create-user"
                className="flex items-center space-x-3 p-4 border-2 border-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                <PlusCircle className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold text-dark">Create User</p>
                  <p className="text-sm text-dark-light">Add new client</p>
                </div>
              </Link>

              <Link
                href="/portal/clients"
                className="flex items-center space-x-3 p-4 border-2 border-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold text-dark">Manage Clients</p>
                  <p className="text-sm text-dark-light">View all clients</p>
                </div>
              </Link>

              <Link
                href="/portal/profile"
                className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <User className="h-6 w-6 text-dark-light" />
                <div>
                  <p className="font-semibold text-dark">My Profile</p>
                  <p className="text-sm text-dark-light">View and edit profile</p>
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-heading font-bold text-dark mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link
                href="/portal/folders"
                className="flex items-center space-x-3 p-4 border-2 border-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                <FolderOpen className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold text-dark">My Folders</p>
                  <p className="text-sm text-dark-light">Organize translations</p>
                </div>
              </Link>

              <Link
                href="/quote"
                className="flex items-center space-x-3 p-4 border-2 border-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                <PlusCircle className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold text-dark">New Order</p>
                  <p className="text-sm text-dark-light">Place a new order</p>
                </div>
              </Link>

              <Link
                href="/portal/orders"
                className="flex items-center space-x-3 p-4 border-2 border-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                <FileText className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold text-dark">My Orders</p>
                  <p className="text-sm text-dark-light">View all orders</p>
                </div>
              </Link>

              <Link
                href="/portal/profile"
                className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <User className="h-6 w-6 text-dark-light" />
                <div>
                  <p className="font-semibold text-dark">My Profile</p>
                  <p className="text-sm text-dark-light">View and edit profile</p>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Content based on user type */}
        {user.role === 'ADMIN' ? (
          <>
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark flex items-center">
                    <div className="bg-gradient-to-br from-primary to-primary-dark p-3 rounded-xl mr-3">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    All Orders
                  </h2>
                  <p className="text-sm text-dark-light mt-2 ml-14">{orders.length} {orders.length === 1 ? 'order' : 'orders'} total</p>
                </div>
              </div>

              {orders.length > 0 ? (
                <>
                  {/* Desktop Table View */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-4 px-4 text-xs font-bold text-dark-light uppercase tracking-wider">Order #</th>
                          <th className="text-left py-4 px-4 text-xs font-bold text-dark-light uppercase tracking-wider">Client</th>
                          <th className="text-left py-4 px-4 text-xs font-bold text-dark-light uppercase tracking-wider">Languages</th>
                          <th className="text-left py-4 px-4 text-xs font-bold text-dark-light uppercase tracking-wider">Price</th>
                          <th className="text-left py-4 px-4 text-xs font-bold text-dark-light uppercase tracking-wider">Payment</th>
                          <th className="text-left py-4 px-4 text-xs font-bold text-dark-light uppercase tracking-wider">Status</th>
                          <th className="text-left py-4 px-4 text-xs font-bold text-dark-light uppercase tracking-wider">Date</th>
                          <th className="text-left py-4 px-4 text-xs font-bold text-dark-light uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id} className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-all cursor-pointer ${order.needsPricing ? 'bg-orange-50/30' : ''}`} onClick={() => router.push(`/portal/orders/${order.id}`)}>
                            <td className="py-5 px-4">
                              <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg">
                                {order.orderNumber || `#${order.id.slice(-6)}`}
                              </span>
                            </td>
                            <td className="py-5 px-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark text-white rounded-full flex items-center justify-center font-semibold text-xs">
                                  {(order.userName || order.name || order.email)?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <span className="text-sm font-medium text-dark">{order.userName || order.name || order.email}</span>
                              </div>
                            </td>
                            <td className="py-5 px-4">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-dark">{order.fromLanguage}</span>
                                <span className="text-primary">→</span>
                                <span className="text-sm font-medium text-dark">{order.toLanguage}</span>
                              </div>
                            </td>
                            <td className="py-5 px-4" onClick={(e) => e.stopPropagation()}>
                              {order.needsPricing ? (
                                <button
                                  onClick={() => handleSetPrice(order)}
                                  className="inline-flex items-center space-x-1 bg-orange-100 text-orange-800 hover:bg-orange-200 px-3 py-1.5 rounded-lg font-bold text-sm shadow-sm transition-all transform hover:scale-105"
                                >
                                  <DollarSign className="h-4 w-4" />
                                  <span>Set Price</span>
                                </button>
                              ) : order.totalPrice > 0 ? (
                                <div className="inline-flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1.5 rounded-lg font-bold text-sm">
                                  <DollarSign className="h-4 w-4" />
                                  <span>${order.totalPrice?.toFixed(2)}</span>
                                </div>
                              ) : (
                                <div className="inline-flex items-center space-x-1 bg-orange-100 text-orange-800 px-3 py-1.5 rounded-lg font-bold text-sm">
                                  <DollarSign className="h-4 w-4" />
                                  <span>TBD</span>
                                </div>
                              )}
                            </td>
                            <td className="py-5 px-4" onClick={(e) => e.stopPropagation()}>
                              <select
                                value={order.isPaid ? 'true' : 'false'}
                                onChange={(e) => handleUpdatePaymentStatus(order.id, e.target.value === 'true')}
                                className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold shadow-md border-0 outline-none cursor-pointer ${
                                  order.isPaid ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                                }`}
                              >
                                <option value="false">⏳ Unpaid</option>
                                <option value="true">✓ Paid</option>
                              </select>
                            </td>
                            <td className="py-5 px-4" onClick={(e) => e.stopPropagation()}>
                              <select
                                value={order.status}
                                onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm border-0 outline-none cursor-pointer ${getStatusBadge(order.status)}`}
                              >
                                <option value="PENDING">Pending</option>
                                <option value="PROCESSING">Processing</option>
                                <option value="COMPLETED">Completed</option>
                              </select>
                            </td>
                            <td className="py-5 px-4">
                              <span className="text-sm text-dark-light font-medium">
                                {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </td>
                            <td className="py-5 px-4" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleDownloadOriginal(order)}
                                  className="text-primary hover:text-primary-dark p-2 rounded-lg hover:bg-primary/10 transition-all transform hover:scale-110"
                                  title="Download original file"
                                >
                                  <Download className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => handleUploadTranslated(order)}
                                  className="text-green-600 hover:text-green-700 p-2 rounded-lg hover:bg-green-50 transition-all transform hover:scale-110"
                                  title="Upload translated file"
                                >
                                  <Upload className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedOrder(order);
                                    setShowDeleteOrderModal(true);
                                  }}
                                  className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all transform hover:scale-110"
                                  title="Delete order"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="lg:hidden space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className={`bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-gray-100 hover:border-primary/30 p-5 ${order.needsPricing ? 'border-orange-200' : ''}`} onClick={() => router.push(`/portal/orders/${order.id}`)}>
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg inline-block mb-2">
                              {order.orderNumber || `#${order.id.slice(-6)}`}
                            </span>
                            <div className="flex items-center space-x-2 mt-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark text-white rounded-full flex items-center justify-center font-semibold text-xs">
                                {(order.userName || order.name || order.email)?.charAt(0).toUpperCase() || 'U'}
                              </div>
                              <span className="text-sm font-semibold text-dark">{order.userName || order.name || order.email}</span>
                            </div>
                          </div>
                          <select
                            value={order.status}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleUpdateStatus(order.id, e.target.value);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm border-0 outline-none cursor-pointer ${getStatusBadge(order.status)}`}
                          >
                            <option value="PENDING">Pending</option>
                            <option value="PROCESSING">Processing</option>
                            <option value="COMPLETED">Completed</option>
                          </select>
                        </div>

                        {/* Details Grid */}
                        <div className="space-y-3 mb-4">
                          {/* Languages */}
                          <div className="flex items-center justify-between py-2 border-b border-gray-200">
                            <span className="text-xs font-bold text-dark-light uppercase">Languages</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-dark">{order.fromLanguage}</span>
                              <span className="text-primary font-bold">→</span>
                              <span className="text-sm font-medium text-dark">{order.toLanguage}</span>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="flex items-center justify-between py-2 border-b border-gray-200" onClick={(e) => e.stopPropagation()}>
                            <span className="text-xs font-bold text-dark-light uppercase">Price</span>
                            {order.needsPricing ? (
                              <button
                                onClick={() => handleSetPrice(order)}
                                className="inline-flex items-center space-x-1 bg-orange-100 text-orange-800 hover:bg-orange-200 px-3 py-1.5 rounded-lg font-bold text-sm shadow-sm"
                              >
                                <DollarSign className="h-4 w-4" />
                                <span>Set Price</span>
                              </button>
                            ) : order.totalPrice > 0 ? (
                              <div className="inline-flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1.5 rounded-lg font-bold text-sm">
                                <DollarSign className="h-4 w-4" />
                                <span>${order.totalPrice?.toFixed(2)}</span>
                              </div>
                            ) : (
                              <div className="inline-flex items-center space-x-1 bg-orange-100 text-orange-800 px-3 py-1.5 rounded-lg font-bold text-sm">
                                <DollarSign className="h-4 w-4" />
                                <span>TBD</span>
                              </div>
                            )}
                          </div>

                          {/* Payment Status */}
                          <div className="flex items-center justify-between py-2 border-b border-gray-200" onClick={(e) => e.stopPropagation()}>
                            <span className="text-xs font-bold text-dark-light uppercase">Payment</span>
                            <select
                              value={order.isPaid ? 'true' : 'false'}
                              onChange={(e) => handleUpdatePaymentStatus(order.id, e.target.value === 'true')}
                              className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold shadow-md border-0 outline-none cursor-pointer ${
                                order.isPaid ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                              }`}
                            >
                              <option value="false">⏳ Unpaid</option>
                              <option value="true">✓ Paid</option>
                            </select>
                          </div>

                          {/* Date */}
                          <div className="flex items-center justify-between py-2">
                            <span className="text-xs font-bold text-dark-light uppercase">Date</span>
                            <span className="text-sm text-dark font-medium">
                              {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-3 border-t border-gray-200" onClick={(e) => e.stopPropagation()}>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleDownloadOriginal(order)}
                              className="flex-1 inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                              title="Download original file"
                            >
                              <Download className="h-5 w-5" />
                              <span>Download</span>
                            </button>
                            <button
                              onClick={() => handleUploadTranslated(order)}
                              className="flex-1 inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                              title="Upload translated file"
                            >
                              <Upload className="h-5 w-5" />
                              <span>Upload</span>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowDeleteOrderModal(true);
                              }}
                              className="inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                              title="Delete order"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-2">No orders yet</h3>
                  <p className="text-dark-light mb-6 max-w-md mx-auto">No client orders have been placed yet.</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-bold text-dark flex items-center">
                  <Shield className="h-6 w-6 text-primary mr-2" />
                  All Clients
                </h2>
                <span className="text-sm text-dark-light">{clients.length} total clients</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Client Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Phone</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Join Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-dark">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold">
                              {client.name?.charAt(0) || 'U'}
                            </div>
                            <span className="text-sm font-medium text-dark">{client.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-dark-light">{client.email}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-dark-light">{client.phone}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-dark-light">{client.joinDate}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setSelectedClient(client)}
                              className="text-primary hover:text-primary-dark p-1 rounded hover:bg-primary/5 transition-colors"
                              title="View client details"
                            >
                              <Eye className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleEditClient(client)}
                              className="text-gray-600 hover:text-primary p-1 rounded hover:bg-primary/5 transition-colors"
                              title="Edit client"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedClient(client);
                                setShowDeleteClientModal(true);
                              }}
                              className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                              title="Delete client"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {clients.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-dark-light mb-4">No clients yet</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Orders Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark flex items-center">
                    <div className="bg-gradient-to-br from-primary to-primary-dark p-3 rounded-xl mr-3">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    My Orders
                  </h2>
                  <p className="text-sm text-dark-light mt-2 ml-14">{orders.length} {orders.length === 1 ? 'order' : 'orders'} total</p>
                </div>
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  New Order
                </Link>
              </div>

            {orders.length > 0 ? (
              <>
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-4 px-4 text-xs font-bold text-dark-light uppercase tracking-wider">Order #</th>
                        <th className="text-left py-4 px-4 text-xs font-bold text-dark-light uppercase tracking-wider">File</th>
                        <th className="text-left py-4 px-4 text-xs font-bold text-dark-light uppercase tracking-wider">Languages</th>
                        <th className="text-left py-4 px-4 text-xs font-bold text-dark-light uppercase tracking-wider">Price</th>
                        <th className="text-left py-4 px-4 text-xs font-bold text-dark-light uppercase tracking-wider">Payment</th>
                        <th className="text-left py-4 px-4 text-xs font-bold text-dark-light uppercase tracking-wider">Status</th>
                        <th className="text-left py-4 px-4 text-xs font-bold text-dark-light uppercase tracking-wider">Date</th>
                        <th className="text-left py-4 px-4 text-xs font-bold text-dark-light uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-all cursor-pointer" onClick={() => router.push(`/portal/orders/${order.id}`)}>
                          <td className="py-5 px-4">
                            <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg">
                              {order.orderNumber || `#${order.id.slice(-6)}`}
                            </span>
                          </td>
                          <td className="py-5 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="bg-primary/10 p-2 rounded-lg">
                                <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <span className="text-sm font-medium text-dark max-w-[150px] truncate">
                                {Array.isArray(order.files) && (order.files[0]?.fileName || order.files[0]?.name) || 'No file'}
                              </span>
                            </div>
                          </td>
                          <td className="py-5 px-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-dark">{order.fromLanguage}</span>
                              <span className="text-primary">→</span>
                              <span className="text-sm font-medium text-dark">{order.toLanguage}</span>
                            </div>
                          </td>
                          <td className="py-5 px-4">
                            {order.needsPricing || order.totalPrice === 0 ? (
                              <div className="inline-flex items-center space-x-1 bg-orange-100 text-orange-800 px-3 py-1.5 rounded-lg font-bold text-sm">
                                <DollarSign className="h-4 w-4" />
                                <span>TBD</span>
                              </div>
                            ) : (
                              <div className="inline-flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1.5 rounded-lg font-bold text-sm">
                                <DollarSign className="h-4 w-4" />
                                <span>${order.totalPrice?.toFixed(2)}</span>
                              </div>
                            )}
                          </td>
                          <td className="py-5 px-4">
                            {order.isPaid ? (
                              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Paid
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md">
                                <Clock className="h-4 w-4 mr-1" />
                                Unpaid
                              </span>
                            )}
                          </td>
                          <td className="py-5 px-4">
                            <span className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm ${getStatusBadge(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span className="capitalize ml-1">{order.status}</span>
                            </span>
                          </td>
                          <td className="py-5 px-4">
                            <span className="text-sm text-dark-light font-medium">
                              {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </td>
                          <td className="py-5 px-4">
                            {order.isPaid && order.translatedFileData ? (
                              <button
                                onClick={() => handleDownloadTranslated(order)}
                                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                              >
                                <Download className="h-4 w-4" />
                                <span>Download</span>
                              </button>
                            ) : !order.isPaid && !order.needsPricing && order.totalPrice > 0 ? (
                              <button
                                onClick={() => {
                                  setSelectedOrderForPayment(order);
                                  setShowOrderPaymentModal(true);
                                }}
                                className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                              >
                                <CreditCard className="h-4 w-4" />
                                <span>Pay Now</span>
                              </button>
                            ) : !order.isPaid && (order.needsPricing || order.totalPrice === 0) ? (
                              <span className="inline-flex items-center text-sm text-orange-600 font-semibold bg-orange-50 px-3 py-2 rounded-lg border border-orange-200">
                                <Clock className="h-4 w-4 mr-1" />
                                Awaiting Pricing
                              </span>
                            ) : !order.translatedFileData ? (
                              <span className="inline-flex items-center text-sm text-gray-600 font-medium">
                                <Clock className="h-4 w-4 mr-1" />
                                {order.status === 'PROCESSING' ? 'In Progress' : 'Pending'}
                              </span>
                            ) : (
                              <span className="text-sm text-dark-light">Pending</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-gray-100 hover:border-primary/30 p-5">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg inline-block mb-2">
                            {order.orderNumber || `#${order.id.slice(-6)}`}
                          </span>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="bg-primary/10 p-2 rounded-lg">
                              <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-sm font-semibold text-dark">
                              {Array.isArray(order.files) && (order.files[0]?.fileName || order.files[0]?.name) || 'No file'}
                            </span>
                          </div>
                        </div>
                        <span className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm ${getStatusBadge(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="capitalize ml-1">{order.status}</span>
                        </span>
                      </div>

                      {/* Details Grid */}
                      <div className="space-y-3 mb-4">
                        {/* Languages */}
                        <div className="flex items-center justify-between py-2 border-b border-gray-200">
                          <span className="text-xs font-bold text-dark-light uppercase">Languages</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-dark">{order.fromLanguage}</span>
                            <span className="text-primary font-bold">→</span>
                            <span className="text-sm font-medium text-dark">{order.toLanguage}</span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between py-2 border-b border-gray-200">
                          <span className="text-xs font-bold text-dark-light uppercase">Price</span>
                          {order.needsPricing || order.totalPrice === 0 ? (
                            <div className="inline-flex items-center space-x-1 bg-orange-100 text-orange-800 px-3 py-1.5 rounded-lg font-bold text-sm">
                              <DollarSign className="h-4 w-4" />
                              <span>TBD</span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1.5 rounded-lg font-bold text-sm">
                              <DollarSign className="h-4 w-4" />
                              <span>${order.totalPrice?.toFixed(2)}</span>
                            </div>
                          )}
                        </div>

                        {/* Payment Status */}
                        <div className="flex items-center justify-between py-2 border-b border-gray-200">
                          <span className="text-xs font-bold text-dark-light uppercase">Payment</span>
                          {order.isPaid ? (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Paid
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md">
                              <Clock className="h-4 w-4 mr-1" />
                              Unpaid
                            </span>
                          )}
                        </div>

                        {/* Date */}
                        <div className="flex items-center justify-between py-2">
                          <span className="text-xs font-bold text-dark-light uppercase">Date</span>
                          <span className="text-sm text-dark font-medium">
                            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-3 border-t border-gray-200">
                        {order.isPaid && order.translatedFileData ? (
                          <button
                            onClick={() => handleDownloadTranslated(order)}
                            className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
                          >
                            <Download className="h-5 w-5" />
                            <span>Download Translation</span>
                          </button>
                        ) : !order.isPaid && !order.needsPricing && order.totalPrice > 0 ? (
                          <button
                            onClick={() => {
                              setSelectedOrderForPayment(order);
                              setShowOrderPaymentModal(true);
                            }}
                            className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
                          >
                            <CreditCard className="h-5 w-5" />
                            <span>Pay ${order.totalPrice?.toFixed(2)} Now</span>
                          </button>
                        ) : !order.isPaid && (order.needsPricing || order.totalPrice === 0) ? (
                          <div className="w-full inline-flex items-center justify-center text-sm text-orange-600 font-semibold bg-orange-50 px-4 py-3 rounded-xl border-2 border-orange-200">
                            <Clock className="h-5 w-5 mr-2" />
                            Awaiting Price from Admin
                          </div>
                        ) : !order.translatedFileData ? (
                          <div className="w-full inline-flex items-center justify-center text-sm text-gray-600 font-medium bg-gray-100 px-4 py-3 rounded-xl">
                            <Clock className="h-5 w-5 mr-2" />
                            {order.status === 'PROCESSING' ? 'Translation In Progress' : 'Translation Pending'}
                          </div>
                        ) : (
                          <div className="text-center text-sm text-dark-light py-2">Processing...</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-2">No orders yet</h3>
                <p className="text-dark-light mb-6 max-w-md mx-auto">Start your translation journey by placing your first order with us!</p>
                <Link
                  href="/quote"
                  className="inline-flex items-center bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-8 py-4 rounded-xl transition-all font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Place Your First Order
                </Link>
              </div>
            )}
          </div>
          </>
        )}
      </div>

      {/* Upload Translated File Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Upload className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-dark mb-2">
                Upload Translated File
              </h3>
              <p className="text-dark-light">
                Order: <span className="font-bold text-primary">{selectedOrder?.orderNumber}</span>
              </p>
              <p className="text-sm text-dark-light mt-2">
                Original: {selectedOrder?.fileName}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Translated File *
                </label>
                <input
                  type="file"
                  onChange={(e) => setTranslatedFile(e.target.files?.[0] || null)}
                  accept=".pdf,.doc,.docx,.txt"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              {translatedFile && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-800">{translatedFile.name}</p>
                      <p className="text-xs text-green-600">
                        {(translatedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setTranslatedFile(null);
                    setSelectedOrder(null);
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-dark-light hover:bg-gray-50 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTranslatedFileSubmit}
                  disabled={!translatedFile}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload & Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-dark mb-2">
                Payment for Folder
              </h3>
              <p className="text-dark-light">
                Folder: <span className="font-bold text-primary">{selectedFolder?.name}</span>
              </p>
              <p className="text-sm text-dark-light mt-1">
                {selectedFolder?.files?.length || 0} files
              </p>

              {/* Price Display */}
              {selectedFolder?.price ? (
                <div className="mt-4 p-4 bg-primary/5 border-2 border-primary rounded-lg">
                  <p className="text-sm text-dark-light mb-1">Total Amount</p>
                  <p className="text-3xl font-bold text-primary">${selectedFolder.price.toFixed(2)}</p>
                </div>
              ) : (
                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-800">Price not set by admin yet</p>
                </div>
              )}
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  value={paymentData.cardholderName}
                  onChange={(e) => setPaymentData({ ...paymentData, cardholderName: e.target.value })}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Card Number *
                </label>
                <input
                  type="text"
                  value={paymentData.cardNumber}
                  onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                  placeholder="1234 5678 9012 3456"
                  required
                  maxLength={19}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    value={paymentData.expiryDate}
                    onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                    placeholder="MM/YY"
                    required
                    maxLength={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    CVV *
                  </label>
                  <input
                    type="text"
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                    placeholder="123"
                    required
                    maxLength={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPaymentModal(false);
                    setSelectedFolder(null);
                    setPaymentData({
                      cardNumber: '',
                      expiryDate: '',
                      cvv: '',
                      cardholderName: '',
                    });
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-dark-light hover:bg-gray-50 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedFolder?.price}
                  className="flex-1 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedFolder?.price ? `Pay $${selectedFolder.price.toFixed(2)}` : 'No Price Set'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {showEditClientModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Edit className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-dark mb-2">
                Edit Client
              </h3>
              <p className="text-dark-light">
                Update client information
              </p>
            </div>

            <form onSubmit={handleUpdateClient} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={editClientData.name}
                  onChange={(e) => setEditClientData({ ...editClientData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={editClientData.email}
                  onChange={(e) => setEditClientData({ ...editClientData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={editClientData.phone}
                  onChange={(e) => setEditClientData({ ...editClientData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  New Password (leave blank to keep current)
                </label>
                <input
                  type="password"
                  value={editClientData.password}
                  onChange={(e) => setEditClientData({ ...editClientData, password: e.target.value })}
                  minLength={8}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
                <p className="text-xs text-dark-light mt-1">Minimum 8 characters if changing</p>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditClientModal(false);
                    setSelectedClient(null);
                    setEditClientData({ name: '', email: '', phone: '', password: '' });
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-dark-light hover:bg-gray-50 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Update Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Client Confirmation Modal */}
      {showDeleteClientModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Trash2 className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-dark mb-2">
                Delete Client
              </h3>
              <p className="text-dark-light mb-4">
                Are you sure you want to delete this client?
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm font-medium text-dark mb-1">{selectedClient?.name}</p>
                <p className="text-sm text-dark-light">{selectedClient?.email}</p>
              </div>
              <p className="text-sm text-red-600 mt-4 font-medium">
                This will also delete all their orders and folders. This action cannot be undone.
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setShowDeleteClientModal(false);
                  setSelectedClient(null);
                }}
                className="flex-1 px-6 py-3 border border-gray-300 text-dark-light hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteClient}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Delete Client
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Order Confirmation Modal */}
      {showDeleteOrderModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Trash2 className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-dark mb-2">
                Delete Order
              </h3>
              <p className="text-dark-light mb-4">
                Are you sure you want to delete this order?
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm font-medium text-dark mb-1">
                  Order: {selectedOrder?.orderNumber || `#${selectedOrder?.id.slice(-6)}`}
                </p>
                <p className="text-sm text-dark-light">
                  {selectedOrder?.fromLanguage} → {selectedOrder?.toLanguage}
                </p>
                <p className="text-sm text-dark-light mt-1">
                  ${selectedOrder?.totalPrice?.toFixed(2)}
                </p>
              </div>
              <p className="text-sm text-red-600 mt-4 font-medium">
                This action cannot be undone.
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setShowDeleteOrderModal(false);
                  setSelectedOrder(null);
                }}
                className="flex-1 px-6 py-3 border border-gray-300 text-dark-light hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteOrder}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Delete Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Set Price Modal */}
      {showPriceModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <DollarSign className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-dark mb-2">
                Set Order Price
              </h3>
              <p className="text-dark-light mb-2">
                Order: <span className="font-bold text-primary">{selectedOrder?.orderNumber}</span>
              </p>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4">
                <p className="text-sm font-medium text-dark mb-1">
                  {Array.isArray(selectedOrder?.files) && (selectedOrder?.files[0]?.fileName || selectedOrder?.files[0]?.name) || 'No file'}
                </p>
                <p className="text-xs text-dark-light">
                  {selectedOrder?.fromLanguage} → {selectedOrder?.toLanguage}
                </p>
                <p className="text-xs text-dark-light mt-1">
                  Customer: {selectedOrder?.email}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Price (USD) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-light font-semibold">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={priceAmount}
                    onChange={(e) => setPriceAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    autoFocus
                  />
                </div>
                <p className="text-xs text-dark-light mt-2">
                  This price will be displayed to the customer and they will be notified.
                </p>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPriceModal(false);
                    setSelectedOrder(null);
                    setPriceAmount('');
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-dark-light hover:bg-gray-50 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitPrice}
                  disabled={!priceAmount || parseFloat(priceAmount) < 0}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Set Price
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Storage Management Modal - Removed (not needed with database) */}

      {/* Order Payment Modal */}
      {showOrderPaymentModal && selectedOrderForPayment && (
        <StripeCheckout
          amount={selectedOrderForPayment.totalPrice}
          onSuccess={handleOrderPaymentSuccess}
          onCancel={handleOrderPaymentCancel}
          metadata={{
            orderId: selectedOrderForPayment.id,
            orderNumber: selectedOrderForPayment.orderNumber,
            fromLanguage: selectedOrderForPayment.fromLanguage,
            toLanguage: selectedOrderForPayment.toLanguage,
          }}
        />
      )}
    </div>
  );
}
