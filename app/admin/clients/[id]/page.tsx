'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  FolderOpen,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  Calendar,
  Download,
  Trash2,
  Upload,
  Eye,
} from 'lucide-react';

interface Folder {
  id: string;
  name: string;
  createdDate: string;
  status: 'new' | 'pending' | 'completed';
  isPaid: boolean;
  files: File[];
}

interface File {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  fromLanguage?: string;
  toLanguage?: string;
  translatedFile?: {
    name: string;
    size: string;
    uploadDate: string;
  };
}

export default function ClientManagementPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = decodeURIComponent(params.id as string);
  const [admin, setAdmin] = useState<any>(null);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [draggedFolder, setDraggedFolder] = useState<string | null>(null);
  const [uploadingFileId, setUploadingFileId] = useState<string | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [client, setClient] = useState<any>({
    id: clientId,
    name: '',
    email: '',
    phone: '',
    joinDate: '',
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
        });

        if (!response.ok || response.status === 401) {
          router.push('/portal/login');
          return;
        }

        const data = await response.json();

        if (data.user.role !== 'ADMIN') {
          router.push('/portal/dashboard');
          return;
        }

        setAdmin(data.user);

        // Fetch user orders from API
        const ordersResponse = await fetch(`/api/admin/users/${clientId}/orders`, {
          credentials: 'include',
        });

        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          setClient({
            id: ordersData.user.id,
            name: ordersData.user.name,
            email: ordersData.user.email,
            phone: ordersData.user.phone || 'N/A',
            joinDate: new Date(ordersData.user.createdAt).toLocaleDateString(),
          });
          setOrders(ordersData.orders || []);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error:', error);
        router.push('/portal/login');
      }
    };

    checkAuth();
  }, [router, clientId]);

  // Save folders to client's localStorage whenever they change
  useEffect(() => {
    if (admin && clientId) {
      localStorage.setItem(`folders_${clientId}`, JSON.stringify(folders));
    }
  }, [folders, admin, clientId]);

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;

    const newFolder: Folder = {
      id: Date.now().toString(),
      name: newFolderName,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'new',
      isPaid: false,
      files: [],
    };

    setFolders([newFolder, ...folders]);
    setNewFolderName('');
    setShowCreateFolder(false);
  };

  const handleDragStart = (folderId: string) => {
    setDraggedFolder(folderId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: 'new' | 'pending' | 'completed') => {
    if (!draggedFolder) return;

    setFolders(
      folders.map((folder) =>
        folder.id === draggedFolder ? { ...folder, status } : folder
      )
    );
    setDraggedFolder(null);
  };

  const togglePayment = (folderId: string) => {
    setFolders(
      folders.map((folder) =>
        folder.id === folderId ? { ...folder, isPaid: !folder.isPaid } : folder
      )
    );
  };

  const deleteFolder = (folderId: string) => {
    if (confirm('Are you sure you want to delete this folder?')) {
      setFolders(folders.filter((folder) => folder.id !== folderId));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <Clock className="h-5 w-5 text-gray-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      new: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
    };
    return styles[status as keyof typeof styles] || styles.new;
  };

  const handleUploadTranslation = (folderId: string, fileId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFolders(
      folders.map((folder) => {
        if (folder.id === folderId) {
          return {
            ...folder,
            files: folder.files.map((f) =>
              f.id === fileId
                ? {
                    ...f,
                    translatedFile: {
                      name: file.name,
                      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                      uploadDate: new Date().toISOString().split('T')[0],
                    },
                  }
                : f
            ),
          };
        }
        return folder;
      })
    );

    setUploadingFileId(null);
    alert('Translated file uploaded successfully!');
  };

  const handleDownloadFile = async (orderId: string, fileIndex: string, fileType: 'original' | 'translated' = 'original') => {
    try {
      const url = `/api/admin/orders/${orderId}/download?fileIndex=${fileIndex}&type=${fileType}`;

      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  const newFolders = folders.filter((f) => f.status === 'new');
  const pendingFolders = folders.filter((f) => f.status === 'pending');
  const completedFolders = folders.filter((f) => f.status === 'completed');

  if (!admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center space-x-4">
            <Link href="/portal/dashboard" className="text-dark-light hover:text-primary">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-xl font-heading font-bold text-dark">
                {client.name}'s Account
              </h1>
              <p className="text-sm text-dark-light">{client.email}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        {/* Client Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-heading font-semibold text-dark mb-4">Client Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-dark-light mb-1">Email</p>
              <p className="text-sm font-medium text-dark">{client.email}</p>
            </div>
            <div>
              <p className="text-sm text-dark-light mb-1">Phone</p>
              <p className="text-sm font-medium text-dark">{client.phone}</p>
            </div>
            <div>
              <p className="text-sm text-dark-light mb-1">Member Since</p>
              <p className="text-sm font-medium text-dark">{client.joinDate}</p>
            </div>
          </div>
        </div>

        {/* Create Folder Button */}
        <div className="mb-6">
          {!showCreateFolder ? (
            <button
              onClick={() => setShowCreateFolder(true)}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors font-medium"
            >
              + Create New Folder
            </button>
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4">
              <input
                type="text"
                placeholder="Folder name (e.g., October 2024 - Translations)"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                autoFocus
              />
              <button
                onClick={handleCreateFolder}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md transition-colors font-medium"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowCreateFolder(false);
                  setNewFolderName('');
                }}
                className="text-dark-light hover:text-dark px-4 py-2"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* All Files Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-heading font-semibold text-dark mb-4">All Orders & Files</h2>

          {orders.length === 0 ? (
            <p className="text-sm text-dark-light text-center py-8">No orders found</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-dark">
                        {order.fromLanguage} → {order.toLanguage}
                      </h3>
                      <p className="text-xs text-dark-light">
                        {order.documentType} • {order.wordCount} words • ${order.totalPrice}
                      </p>
                      <p className="text-xs text-dark-light mt-1">
                        Created: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                        order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                      {order.isPaid ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>

                  {/* Files */}
                  {order.files.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs font-semibold text-dark">Original Files:</p>
                      {order.files.map((file: any, index: number) => (
                        <div key={file.id} className="bg-gray-50 p-2 rounded border border-gray-200 flex items-center justify-between">
                          <div className="flex items-center space-x-2 flex-1">
                            <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-dark truncate">{file.name}</p>
                              <p className="text-xs text-dark-light">{file.size}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownloadFile(order.id, index.toString(), 'original')}
                            className="text-primary hover:text-primary-dark p-1"
                            title="Download original file"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Translated File */}
                  {order.translatedFile && (
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-dark mb-2">Translated File:</p>
                      <div className="bg-green-50 p-2 rounded border border-green-200 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <div>
                            <p className="text-xs font-medium text-green-800">{order.translatedFile.name}</p>
                            <p className="text-xs text-green-700">
                              Uploaded: {new Date(order.translatedFile.uploadDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownloadFile(order.id, '0', 'translated')}
                          className="text-green-600 hover:text-green-700 p-1"
                          title="Download translated file"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* New Column */}
          <div
            onDragOver={handleDragOver}
            onDrop={() => handleDrop('new')}
            className="bg-white rounded-lg shadow-sm p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-dark flex items-center">
                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                New ({newFolders.length})
              </h3>
            </div>
            <div className="space-y-3">
              {newFolders.map((folder) => (
                <FolderCard
                  key={folder.id}
                  folder={folder}
                  onDragStart={handleDragStart}
                  onTogglePayment={togglePayment}
                  onDelete={deleteFolder}
                  getStatusIcon={getStatusIcon}
                  getStatusBadge={getStatusBadge}
                  onUploadTranslation={handleUploadTranslation}
                  uploadingFileId={uploadingFileId}
                  setUploadingFileId={setUploadingFileId}
                />
              ))}
              {newFolders.length === 0 && (
                <p className="text-sm text-dark-light text-center py-8">No new folders</p>
              )}
            </div>
          </div>

          {/* Pending Column */}
          <div
            onDragOver={handleDragOver}
            onDrop={() => handleDrop('pending')}
            className="bg-white rounded-lg shadow-sm p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-dark flex items-center">
                <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                Pending ({pendingFolders.length})
              </h3>
            </div>
            <div className="space-y-3">
              {pendingFolders.map((folder) => (
                <FolderCard
                  key={folder.id}
                  folder={folder}
                  onDragStart={handleDragStart}
                  onTogglePayment={togglePayment}
                  onDelete={deleteFolder}
                  getStatusIcon={getStatusIcon}
                  getStatusBadge={getStatusBadge}
                  onUploadTranslation={handleUploadTranslation}
                  uploadingFileId={uploadingFileId}
                  setUploadingFileId={setUploadingFileId}
                />
              ))}
              {pendingFolders.length === 0 && (
                <p className="text-sm text-dark-light text-center py-8">No pending folders</p>
              )}
            </div>
          </div>

          {/* Completed Column */}
          <div
            onDragOver={handleDragOver}
            onDrop={() => handleDrop('completed')}
            className="bg-white rounded-lg shadow-sm p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-dark flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Completed ({completedFolders.length})
              </h3>
            </div>
            <div className="space-y-3">
              {completedFolders.map((folder) => (
                <FolderCard
                  key={folder.id}
                  folder={folder}
                  onDragStart={handleDragStart}
                  onTogglePayment={togglePayment}
                  onDelete={deleteFolder}
                  getStatusIcon={getStatusIcon}
                  getStatusBadge={getStatusBadge}
                  onUploadTranslation={handleUploadTranslation}
                  uploadingFileId={uploadingFileId}
                  setUploadingFileId={setUploadingFileId}
                />
              ))}
              {completedFolders.length === 0 && (
                <p className="text-sm text-dark-light text-center py-8">No completed folders</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FolderCard({
  folder,
  onDragStart,
  onTogglePayment,
  onDelete,
  getStatusIcon,
  getStatusBadge,
  onUploadTranslation,
  uploadingFileId,
  setUploadingFileId,
}: {
  folder: any;
  onDragStart: (id: string) => void;
  onTogglePayment: (id: string) => void;
  onDelete: (id: string) => void;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusBadge: (status: string) => string;
  onUploadTranslation: (folderId: string, fileId: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  uploadingFileId: string | null;
  setUploadingFileId: (id: string | null) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div
        draggable
        onDragStart={() => onDragStart(folder.id)}
        className="cursor-move"
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2 flex-1">
            <FolderOpen className="h-5 w-5 text-primary flex-shrink-0" />
            <h4 className="font-medium text-dark text-sm">{folder.name}</h4>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(folder.id);
            }}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2 text-xs text-dark-light mb-3">
          <Calendar className="h-3 w-3" />
          <span>{folder.createdDate}</span>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <FileText className="h-4 w-4 text-dark-light" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="text-xs text-primary hover:underline"
          >
            {folder.files.length} files {expanded ? '▲' : '▼'}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(folder.status)}`}>
            {folder.status}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTogglePayment(folder.id);
            }}
            className="flex items-center space-x-1"
          >
            {folder.isPaid ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <span className={`text-xs ${folder.isPaid ? 'text-green-600' : 'text-red-600'}`}>
              {folder.isPaid ? 'Paid' : 'Unpaid'}
            </span>
          </button>
        </div>
      </div>

      {/* File List */}
      {expanded && folder.files.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-300">
          <h5 className="text-xs font-semibold text-dark mb-2">Files:</h5>
          <div className="space-y-3">
            {folder.files.map((file: any) => (
              <div key={file.id} className="bg-white p-3 rounded border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 flex-1">
                    <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-dark truncate">{file.name}</p>
                      <p className="text-xs text-dark-light">{file.size}</p>
                    </div>
                  </div>
                </div>

                {file.fromLanguage && file.toLanguage && (
                  <div className="text-xs text-dark-light mb-2">
                    Translation: {file.fromLanguage} → {file.toLanguage}
                  </div>
                )}

                {/* Translation Upload Section */}
                {file.translatedFile ? (
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <div>
                        <p className="text-xs font-medium text-green-800">Translated:</p>
                        <p className="text-xs text-green-700">{file.translatedFile.name}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2">
                    <label className="flex items-center space-x-2 text-xs text-primary hover:text-primary-dark cursor-pointer">
                      <Upload className="h-3 w-3" />
                      <span>Upload Translated File</span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          e.stopPropagation();
                          onUploadTranslation(folder.id, file.id, e);
                        }}
                      />
                    </label>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
