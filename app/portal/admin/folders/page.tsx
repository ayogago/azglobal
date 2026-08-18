'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Folder, ArrowLeft, FileText, Download, Upload, DollarSign, Users, Clock, CheckCircle, X, Archive } from 'lucide-react';

export default function AdminFoldersPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [folders, setFolders] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [clients, setClients] = useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<any>(null);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [translatedFile, setTranslatedFile] = useState<File | null>(null);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [priceInput, setPriceInput] = useState<string>('');

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

        // Check if user is admin
        if (userData.user.role !== 'ADMIN') {
          router.push('/portal/dashboard');
          return;
        }

        setUser(userData.user);

        // Fetch all folders (admin can see all)
        const foldersResponse = await fetch('/api/folders', {
          credentials: 'include',
        });

        if (foldersResponse.ok) {
          const foldersData = await foldersResponse.json();
          setFolders(foldersData.folders || []);

          // Get unique clients
          const uniqueClients = Array.from(new Set((foldersData.folders || []).map((f: any) => f.userId)));
          setClients(uniqueClients as string[]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        router.push('/portal/login');
      }
    };

    fetchData();
  }, [router]);

  const filteredFolders = folders
    .filter(f => selectedClient === 'all' || f.userId === selectedClient)
    .filter(f => {
      if (statusFilter === 'all') return true;
      if (statusFilter === 'archived') return f.isArchived === true;
      return f.status === statusFilter && !f.isArchived;
    });

  const handleStageChange = (folderId: string, newStage: string) => {
    const allFolders = JSON.parse(localStorage.getItem('translation_folders') || '[]');
    const updatedFolders = allFolders.map((f: any) =>
      f.id === folderId ? { ...f, status: newStage } : f
    );
    localStorage.setItem('translation_folders', JSON.stringify(updatedFolders));
    setFolders(updatedFolders);
  };

  const handlePaymentStatusChange = (folderId: string, isPaid: boolean) => {
    const allFolders = JSON.parse(localStorage.getItem('translation_folders') || '[]');
    const updatedFolders = allFolders.map((f: any) =>
      f.id === folderId ? { ...f, isPaid } : f
    );
    localStorage.setItem('translation_folders', JSON.stringify(updatedFolders));
    setFolders(updatedFolders);
  };

  const handlePriceEdit = (folder: any) => {
    setEditingPriceId(folder.id);
    setPriceInput(folder.price?.toString() || '');
  };

  const handlePriceSave = (folderId: string) => {
    const price = parseFloat(priceInput);
    if (isNaN(price) || price < 0) {
      alert('Please enter a valid price');
      return;
    }

    const allFolders = JSON.parse(localStorage.getItem('translation_folders') || '[]');
    const updatedFolders = allFolders.map((f: any) =>
      f.id === folderId ? { ...f, price } : f
    );
    localStorage.setItem('translation_folders', JSON.stringify(updatedFolders));
    setFolders(updatedFolders);
    setEditingPriceId(null);
    setPriceInput('');
  };

  const handlePriceCancel = () => {
    setEditingPriceId(null);
    setPriceInput('');
  };

  const handleArchiveFolder = (folderId: string, isArchived: boolean) => {
    const allFolders = JSON.parse(localStorage.getItem('translation_folders') || '[]');
    const updatedFolders = allFolders.map((f: any) =>
      f.id === folderId ? { ...f, isArchived, archivedDate: isArchived ? new Date().toISOString() : null } : f
    );
    localStorage.setItem('translation_folders', JSON.stringify(updatedFolders));
    setFolders(updatedFolders);
  };

  const handleDownloadFile = (folder: any, fileId: string) => {
    const file = folder.files.find((f: any) => f.id === fileId);
    if (file && file.fileData) {
      const link = document.createElement('a');
      link.href = file.fileData;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleUploadTranslated = (folder: any, fileId: string) => {
    setSelectedFolder(folder);
    setSelectedFileId(fileId);
    setShowUploadModal(true);
  };

  const handleTranslatedFileSubmit = async () => {
    if (!translatedFile || !selectedFolder || !selectedFileId) return;

    // Check file size (5MB limit)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (translatedFile.size > MAX_FILE_SIZE) {
      alert(`File "${translatedFile.name}" is too large (${(translatedFile.size / 1024 / 1024).toFixed(2)} MB).\n\nMaximum file size is 5MB. Please compress the file or contact support for large file transfers.`);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const fileData = reader.result;

      const allFolders = JSON.parse(localStorage.getItem('translation_folders') || '[]');
      const updatedFolders = allFolders.map((folder: any) => {
        if (folder.id === selectedFolder.id) {
          return {
            ...folder,
            files: folder.files.map((file: any) => {
              if (file.id === selectedFileId) {
                return {
                  ...file,
                  translatedFileData: fileData,
                  translatedFileName: translatedFile.name,
                  translatedFileType: translatedFile.type,
                };
              }
              return file;
            }),
          };
        }
        return folder;
      });

      try {
        localStorage.setItem('translation_folders', JSON.stringify(updatedFolders));
        setFolders(updatedFolders);
        setShowUploadModal(false);
        setTranslatedFile(null);
        setSelectedFolder(null);
        setSelectedFileId(null);
      } catch (error: any) {
        if (error.name === 'QuotaExceededError') {
          alert('Storage limit exceeded! Too many files stored. Please:\n\n1. Archive or delete old folders\n2. Upload smaller files\n3. Contact support for assistance');
        } else {
          alert('Error uploading file. Please try again.');
        }
      }
    };

    reader.readAsDataURL(translatedFile);
  };

  const handleDownloadTranslated = (folder: any, fileId: string) => {
    const file = folder.files.find((f: any) => f.id === fileId);
    if (file && file.translatedFileData) {
      const link = document.createElement('a');
      link.href = file.translatedFileData;
      link.download = file.translatedFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) return null;

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
            <div>
              <h1 className="text-2xl font-heading font-bold text-dark flex items-center">
                <Folder className="h-7 w-7 text-primary mr-3" />
                Client Folders Management
              </h1>
              <p className="text-dark-light text-sm mt-1">Manage translation folders for all clients</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Client Filter */}
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-dark-light" />
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  <option value="all">All Clients ({folders.length})</option>
                  {clients.map(client => (
                    <option key={client} value={client}>
                      {client} ({folders.filter(f => f.userId === client).length})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {filteredFolders.length > 0 ? (
            <div className="space-y-4">
              {filteredFolders.map((folder) => (
                <div key={folder.id} className="border border-gray-200 rounded-lg p-6 hover:border-primary transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Folder className="h-6 w-6 text-primary" />
                        <h3 className="text-lg font-semibold text-dark">{folder.name}</h3>
                      </div>
                      <p className="text-sm text-dark-light">Client: {folder.userId}</p>
                      <p className="text-sm text-dark-light">Created: {folder.createdDate}</p>
                      <p className="text-sm text-dark-light">Files: {folder.files?.length || 0}</p>

                      {/* Price Section */}
                      <div className="mt-3">
                        {editingPriceId === folder.id ? (
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-primary" />
                            <input
                              type="number"
                              value={priceInput}
                              onChange={(e) => setPriceInput(e.target.value)}
                              placeholder="0.00"
                              step="0.01"
                              min="0"
                              className="w-32 px-3 py-1 border border-primary rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            />
                            <button
                              onClick={() => handlePriceSave(folder.id)}
                              className="px-3 py-1 bg-primary text-white text-xs rounded-lg hover:bg-primary-dark transition-colors"
                            >
                              Save
                            </button>
                            <button
                              onClick={handlePriceCancel}
                              className="px-3 py-1 bg-gray-200 text-dark text-xs rounded-lg hover:bg-gray-300 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-primary" />
                            <span className="text-sm font-semibold text-primary">
                              {folder.price ? `$${folder.price.toFixed(2)}` : 'No price set'}
                            </span>
                            <button
                              onClick={() => handlePriceEdit(folder)}
                              className="px-2 py-1 text-xs text-primary hover:text-primary-dark hover:bg-primary/10 rounded transition-colors"
                            >
                              {folder.price ? 'Edit' : 'Set Price'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Archive Badge */}
                      {folder.isArchived ? (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 flex items-center space-x-1">
                          <Archive className="h-3 w-3" />
                          <span>ARCHIVED</span>
                        </span>
                      ) : (
                        <>
                          {/* Stage Selector */}
                          <select
                            value={folder.status}
                            onChange={(e) => handleStageChange(folder.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border-0 outline-none cursor-pointer ${getStageColor(folder.status)}`}
                          >
                            <option value="new">NEW</option>
                            <option value="pending">PENDING</option>
                            <option value="completed">COMPLETED</option>
                          </select>

                          {/* Payment Status Selector */}
                          <select
                            value={folder.isPaid ? 'paid' : 'pending'}
                            onChange={(e) => handlePaymentStatusChange(folder.id, e.target.value === 'paid')}
                            className={`px-3 py-1 rounded-full text-xs font-medium border-0 outline-none cursor-pointer ${
                              folder.isPaid ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                            }`}
                          >
                            <option value="pending">PENDING</option>
                            <option value="paid">PAID</option>
                          </select>
                        </>
                      )}

                      {/* Archive Button */}
                      {folder.status === 'completed' && (
                        <button
                          onClick={() => handleArchiveFolder(folder.id, !folder.isArchived)}
                          className={`p-2 rounded transition-colors ${
                            folder.isArchived
                              ? 'text-primary hover:text-primary-dark hover:bg-primary/10'
                              : 'text-gray-600 hover:text-primary hover:bg-primary/10'
                          }`}
                          title={folder.isArchived ? 'Unarchive folder' : 'Archive folder'}
                        >
                          <Archive className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Files List */}
                  {folder.files && folder.files.length > 0 && (
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-semibold text-dark mb-3 flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Files in Folder
                      </h4>
                      <div className="space-y-2">
                        {folder.files.map((file: any) => (
                          <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                            <div className="flex items-center space-x-3 flex-1">
                              <FileText className="h-5 w-5 text-primary" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-dark truncate">{file.name}</p>
                                <p className="text-xs text-dark-light">{file.size} • Uploaded: {file.uploadDate}</p>
                                {file.fromLanguage && file.toLanguage && (
                                  <p className="text-xs text-dark-light mt-1">
                                    {file.fromLanguage} → {file.toLanguage}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              {file.fileData && (
                                <button
                                  onClick={() => handleDownloadFile(folder, file.id)}
                                  className="p-2 text-primary hover:text-primary-dark hover:bg-primary/10 rounded transition-colors"
                                  title="Download original"
                                >
                                  <Download className="h-4 w-4" />
                                </button>
                              )}
                              {file.translatedFileData ? (
                                <button
                                  onClick={() => handleDownloadTranslated(folder, file.id)}
                                  className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                                  title="Download translated"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleUploadTranslated(folder, file.id)}
                                  className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                                  title="Upload translated"
                                >
                                  <Upload className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Folder className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-dark-light text-lg">
                {selectedClient === 'all' ? 'No folders yet' : 'No folders for this client'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Translated File Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Upload className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-dark mb-2">
                Upload Translated File
              </h3>
              <p className="text-dark-light text-sm">
                Folder: <span className="font-bold">{selectedFolder?.name}</span>
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
                  onClick={() => {
                    setShowUploadModal(false);
                    setTranslatedFile(null);
                    setSelectedFolder(null);
                    setSelectedFileId(null);
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-dark-light hover:bg-gray-50 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTranslatedFileSubmit}
                  disabled={!translatedFile}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
