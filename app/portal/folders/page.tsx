'use client';
export const dynamic = 'force-dynamic';


import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  FolderOpen,
  FileText,
  Clock,
  CheckCircle,
  Calendar,
  PlusCircle,
  Upload,
  Download,
  Trash2,
  Edit,
  History,
  X,
  RefreshCw,
  Archive,
} from 'lucide-react';

interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
  details: string;
}

interface File {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  fromLanguage?: string;
  toLanguage?: string;
  activityLog: ActivityLog[];
  translatedFileData?: string;
  translatedFileName?: string;
  fileData?: string;
}

interface Folder {
  id: string;
  name: string;
  createdDate: string;
  status: 'new' | 'pending' | 'completed';
  isPaid: boolean;
  files: File[];
  isArchived?: boolean;
}

export default function FoldersPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [showFileLog, setShowFileLog] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [replacingFileId, setReplacingFileId] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFolderId, setUploadFolderId] = useState<string | null>(null);
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [folders, setFolders] = useState<Folder[]>([]);

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

        const { user: userData } = await userResponse.json();
        setUser(userData);

        // Load folders
        const foldersResponse = await fetch('/api/folders', {
          credentials: 'include',
        });
        if (foldersResponse.ok) {
          const { folders: foldersData } = await foldersResponse.json();
          setFolders(foldersData);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
        router.push('/portal/login');
      }
    };

    fetchData();
  }, [router]);

  const handleCreateFolder = async () => {
    if (!newFolderName.trim() || !user) return;

    try {
      const response = await fetch('/api/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newFolderName, files: [] }),
        credentials: 'include',
      });

      if (response.ok) {
        const { folder: newFolder } = await response.json();
        setFolders([newFolder, ...folders]);
        setNewFolderName('');
        setShowCreateFolder(false);
      }
    } catch (error) {
      console.error('Failed to create folder:', error);
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    const folder = folders.find((f) => f.id === folderId);
    if (folder && folder.status !== 'new') {
      alert('You can only delete folders in "New" status');
      return;
    }

    if (confirm('Are you sure you want to delete this folder?')) {
      try {
        const response = await fetch(`/api/folders/${folderId}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (response.ok) {
          setFolders(folders.filter((f) => f.id !== folderId));
        }
      } catch (error) {
        console.error('Failed to delete folder:', error);
      }
    }
  };

  const handleDeleteFile = async (folderId: string, fileId: string) => {
    const folder = folders.find((f) => f.id === folderId);
    if (folder && folder.status !== 'new') {
      alert('You can only delete files when the folder is in "New" status');
      return;
    }

    if (confirm('Are you sure you want to delete this file?')) {
      try {
        const updatedFiles = folder?.files.filter((file) => file.id !== fileId) || [];
        const response = await fetch(`/api/folders/${folderId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ files: updatedFiles }),
          credentials: 'include',
        });

        if (response.ok) {
          setFolders(
            folders.map((f) =>
              f.id === folderId
                ? { ...f, files: f.files.filter((file) => file.id !== fileId) }
                : f
            )
          );
        }
      } catch (error) {
        console.error('Failed to delete file:', error);
      }
    }
  };

  const handleReplaceFile = (folderId: string, fileId: string) => {
    const folder = folders.find((f) => f.id === folderId);
    if (folder && folder.status !== 'new') {
      alert('You can only replace files when the folder is in "New" status');
      return;
    }

    setReplacingFileId(fileId);
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !replacingFileId) return;

    // Find the folder containing the file
    const folderWithFile = folders.find((f) =>
      f.files.some((file) => file.id === replacingFileId)
    );

    if (folderWithFile) {
      const oldFile = folderWithFile.files.find((f) => f.id === replacingFileId);
      const newLog: ActivityLog = {
        id: Date.now().toString(),
        action: 'File Replaced',
        timestamp: new Date().toLocaleString(),
        details: `File replaced from "${oldFile?.name}" to "${file.name}"`,
      };

      const updatedFolders = folders.map((folder) =>
        folder.id === folderWithFile.id
          ? {
              ...folder,
              files: folder.files.map((f) =>
                f.id === replacingFileId
                  ? {
                      ...f,
                      name: file.name,
                      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                      uploadDate: new Date().toISOString().split('T')[0],
                      activityLog: [...f.activityLog, newLog],
                    }
                  : f
              ),
            }
          : folder
      );

      const allFolders = JSON.parse(localStorage.getItem('translation_folders') || '[]');
      const finalFolders = allFolders.map((f: any) => {
        const updated = updatedFolders.find((uf: any) => uf.id === f.id);
        return updated || f;
      });
      localStorage.setItem('translation_folders', JSON.stringify(finalFolders));

      setFolders(updatedFolders);
    }

    setReplacingFileId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleOpenUploadModal = (folderId: string) => {
    setUploadFolderId(folderId);
    setShowUploadModal(true);
  };

  const handleDownloadFile = (file: File) => {
    if (file.translatedFileData) {
      const link = document.createElement('a');
      link.href = file.translatedFileData;
      link.download = file.translatedFileName || file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if ((file as any).fileData) {
      const link = document.createElement('a');
      link.href = (file as any).fileData;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownloadAllTranslated = (folder: any) => {
    const translatedFiles = folder.files.filter((f: any) => f.translatedFileData);

    if (translatedFiles.length === 0) {
      alert('No translated files available in this folder');
      return;
    }

    // Download each translated file with a small delay to prevent browser blocking
    translatedFiles.forEach((file: any, index: number) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = file.translatedFileData;
        link.download = file.translatedFileName || file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 200); // 200ms delay between each download
    });
  };

  const handleMultipleFilesUpload = async () => {
    if (!uploadFiles || !uploadFolderId) return;

    const filesArray = Array.from(uploadFiles);

    // Check file sizes (5MB limit per file to be safe with localStorage)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = filesArray.filter(file => file.size > MAX_FILE_SIZE);

    if (oversizedFiles.length > 0) {
      alert(`The following files exceed the 5MB limit:\n${oversizedFiles.map(f => `- ${f.name} (${(f.size / 1024 / 1024).toFixed(2)} MB)`).join('\n')}\n\nPlease upload smaller files or contact support for large file transfers.`);
      return;
    }

    try {
      const newFiles = await Promise.all(
        filesArray.map(async (file) => {
          const reader = new FileReader();
          const fileData = await new Promise<string>((resolve) => {
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });

          return {
            id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: file.name,
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
            uploadDate: new Date().toISOString().split('T')[0],
            fileData: fileData,
            fileType: file.type,
            activityLog: [
              {
                id: Date.now().toString(),
                action: 'File Uploaded',
                timestamp: new Date().toLocaleString(),
                details: `File "${file.name}" uploaded`,
              },
            ],
          };
        })
      );

      const allFolders = JSON.parse(localStorage.getItem('translation_folders') || '[]');
      const updatedFolders = allFolders.map((f: any) =>
        f.id === uploadFolderId
          ? { ...f, files: [...(f.files || []), ...newFiles] }
          : f
      );

      try {
        localStorage.setItem('translation_folders', JSON.stringify(updatedFolders));
      } catch (storageError: any) {
        if (storageError.name === 'QuotaExceededError') {
          alert('Storage limit exceeded! Your files are too large or you have too many files stored. Please:\n\n1. Delete some old folders or files\n2. Upload smaller files (under 5MB each)\n3. Contact support for assistance with large file transfers');
          return;
        }
        throw storageError;
      }

      const userFolders = updatedFolders.filter((f: any) => f.userId === user?.email);
      setFolders(userFolders);

      setShowUploadModal(false);
      setUploadFiles(null);
      setUploadFolderId(null);
      if (uploadInputRef.current) {
        uploadInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('An error occurred while uploading files. Please try again or contact support.');
    }
  };

  const handleArchiveFolder = (folderId: string, isArchived: boolean) => {
    const allFolders = JSON.parse(localStorage.getItem('translation_folders') || '[]');
    const updatedFolders = allFolders.map((f: any) =>
      f.id === folderId ? { ...f, isArchived, archivedDate: isArchived ? new Date().toISOString() : null } : f
    );
    localStorage.setItem('translation_folders', JSON.stringify(updatedFolders));

    const userFolders = updatedFolders.filter((f: any) => f.userId === user?.email);
    setFolders(userFolders);
  };

  const filteredFolders = folders.filter(f => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'archived') return f.isArchived === true;
    return f.status === statusFilter && !f.isArchived;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'new':
        return <Clock className="h-5 w-5 text-gray-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      new: 'bg-gray-100 text-gray-800',
    };
    return styles[status as keyof typeof styles] || styles.new;
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hidden file input for replacement */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      />

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center space-x-4">
            <Link href="/portal/dashboard" className="text-dark-light hover:text-primary">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-heading font-bold text-dark">My Folders</h1>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        {/* Create Folder Section */}
        <div className="mb-8">
          {!showCreateFolder ? (
            <button
              onClick={() => setShowCreateFolder(true)}
              className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors font-medium"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Create New Folder</span>
            </button>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-heading font-semibold text-dark mb-4">
                Create New Folder
              </h3>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Folder name (e.g., October 2024 - Birth Certificates)"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  autoFocus
                />
                <button
                  onClick={handleCreateFolder}
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors font-medium"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setShowCreateFolder(false);
                    setNewFolderName('');
                  }}
                  className="text-dark-light hover:text-dark px-6 py-3 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-dark">Filter by Status:</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-dark-light hover:bg-gray-200'
                }`}
              >
                All ({folders.length})
              </button>
              <button
                onClick={() => setStatusFilter('new')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === 'new'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-dark-light hover:bg-gray-200'
                }`}
              >
                New ({folders.filter(f => f.status === 'new' && !f.isArchived).length})
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === 'pending'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-dark-light hover:bg-gray-200'
                }`}
              >
                Pending ({folders.filter(f => f.status === 'pending' && !f.isArchived).length})
              </button>
              <button
                onClick={() => setStatusFilter('completed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === 'completed'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-dark-light hover:bg-gray-200'
                }`}
              >
                Completed ({folders.filter(f => f.status === 'completed' && !f.isArchived).length})
              </button>
              <button
                onClick={() => setStatusFilter('archived')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === 'archived'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-dark-light hover:bg-gray-200'
                }`}
              >
                Archived ({folders.filter(f => f.isArchived).length})
              </button>
            </div>
          </div>
        </div>

        {/* Folders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFolders.map((folder) => (
            <div
              key={folder.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3 flex-1">
                    <FolderOpen className="h-8 w-8 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <button
                        onClick={() =>
                          setSelectedFolder(folder.id === selectedFolder ? null : folder.id)
                        }
                        className="text-left w-full hover:text-primary transition-colors"
                      >
                        <h3 className="font-semibold text-dark hover:text-primary">{folder.name}</h3>
                      </button>
                      <div className="flex items-center space-x-2 text-xs text-dark-light mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>{folder.createdDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {folder.isArchived && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 flex items-center space-x-1">
                        <Archive className="h-3 w-3" />
                        <span>Archived</span>
                      </span>
                    )}
                    {folder.status === 'completed' && (
                      <button
                        onClick={() => handleArchiveFolder(folder.id, !folder.isArchived)}
                        className={`p-1 rounded transition-colors ${
                          folder.isArchived
                            ? 'text-primary hover:text-primary-dark hover:bg-primary/10'
                            : 'text-gray-600 hover:text-primary hover:bg-primary/10'
                        }`}
                        title={folder.isArchived ? 'Unarchive folder' : 'Archive folder'}
                      >
                        <Archive className="h-5 w-5" />
                      </button>
                    )}
                    {folder.status === 'new' && !folder.isArchived && (
                      <button
                        onClick={() => handleDeleteFolder(folder.id)}
                        className="text-red-500 hover:text-red-600 p-1"
                        title="Delete folder"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(folder.status)}
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusBadge(
                        folder.status
                      )}`}
                    >
                      {folder.status.charAt(0).toUpperCase() + folder.status.slice(1)}
                    </span>
                  </div>
                  {folder.isPaid ? (
                    <span className="text-xs text-green-600 font-medium">✓ Paid</span>
                  ) : (
                    <span className="text-xs text-red-600 font-medium">Unpaid</span>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <button
                    onClick={() =>
                      setSelectedFolder(folder.id === selectedFolder ? null : folder.id)
                    }
                    className="flex items-center justify-between text-sm w-full hover:text-primary transition-colors"
                  >
                    <div className="flex items-center space-x-2 text-dark-light">
                      <FileText className="h-4 w-4" />
                      <span>{folder.files.length} files</span>
                    </div>
                    <span className="text-primary text-xs">
                      {selectedFolder === folder.id ? 'Hide' : 'View'} Files
                    </span>
                  </button>

                  {/* Expanded Files List */}
                  {selectedFolder === folder.id && (
                    <div className="mt-4 space-y-3">
                      {/* Download All Button */}
                      {folder.files.some((f: any) => f.translatedFileData) && (
                        <button
                          onClick={() => handleDownloadAllTranslated(folder)}
                          className="w-full flex items-center justify-center space-x-2 p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                        >
                          <Download className="h-4 w-4" />
                          <span>Download All Translated Files ({folder.files.filter((f: any) => f.translatedFileData).length})</span>
                        </button>
                      )}

                      {folder.files.map((file) => (
                        <div
                          key={file.id}
                          className="p-3 bg-gray-50 rounded border border-gray-200"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2 flex-1">
                              <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <p className="text-xs font-medium text-dark truncate">
                                    {file.name}
                                  </p>
                                  {(file as any).translatedFileData && (
                                    <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded">
                                      Translated
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-dark-light">{file.size}</p>
                                {file.fromLanguage && file.toLanguage && (
                                  <p className="text-xs text-dark-light mt-1">
                                    {file.fromLanguage} → {file.toLanguage}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 ml-2">
                              <button
                                onClick={() => setShowFileLog(file.id)}
                                className="p-1 text-dark-light hover:text-primary"
                                title="View history"
                              >
                                <History className="h-4 w-4" />
                              </button>
                              {folder.status === 'new' && (
                                <>
                                  <button
                                    onClick={() => handleReplaceFile(folder.id, file.id)}
                                    className="p-1 text-blue-500 hover:text-blue-600"
                                    title="Replace file"
                                  >
                                    <RefreshCw className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteFile(folder.id, file.id)}
                                    className="p-1 text-red-500 hover:text-red-600"
                                    title="Delete file"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </>
                              )}
                              {/* Download button for translated files */}
                              {(file as any).translatedFileData && (
                                <button
                                  onClick={() => handleDownloadFile(file)}
                                  className="p-1 text-green-600 hover:text-green-700"
                                  title="Download translated file"
                                >
                                  <Download className="h-4 w-4" />
                                </button>
                              )}
                              {/* Download original file */}
                              {(file as any).fileData && !((file as any).translatedFileData) && (
                                <button
                                  onClick={() => handleDownloadFile(file)}
                                  className="p-1 text-primary hover:text-primary-dark"
                                  title="Download original file"
                                >
                                  <Download className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Activity Log Modal */}
                          {showFileLog === file.id && (
                            <div className="mt-3 pt-3 border-t border-gray-300">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-xs font-semibold text-dark flex items-center">
                                  <History className="h-3 w-3 mr-1" />
                                  Activity Log
                                </h4>
                                <button
                                  onClick={() => setShowFileLog(null)}
                                  className="text-dark-light hover:text-dark"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                              <div className="space-y-2 max-h-40 overflow-y-auto">
                                {file.activityLog.map((log) => (
                                  <div
                                    key={log.id}
                                    className="text-xs bg-white p-2 rounded border border-gray-200"
                                  >
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium text-primary">
                                        {log.action}
                                      </span>
                                      <span className="text-dark-light">{log.timestamp}</span>
                                    </div>
                                    <p className="text-dark-light">{log.details}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {folder.status === 'new' && (
                        <button
                          onClick={() => handleOpenUploadModal(folder.id)}
                          className="flex items-center justify-center space-x-2 w-full mt-2 p-3 border-2 border-dashed border-primary rounded text-primary hover:bg-primary/5 transition-colors"
                        >
                          <Upload className="h-4 w-4" />
                          <span className="text-sm font-medium">Add Files</span>
                        </button>
                      )}

                      {folder.status !== 'new' && (
                        <div className="text-xs text-center text-dark-light italic p-2 bg-yellow-50 rounded">
                          Files are locked in {folder.status} status
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {folders.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-dark mb-2">No folders yet</h3>
            <p className="text-dark-light mb-6">
              Create your first folder to organize your translations
            </p>
            <button
              onClick={() => setShowCreateFolder(true)}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors font-medium"
            >
              Create First Folder
            </button>
          </div>
        )}
      </div>

      {/* Upload Multiple Files Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-dark mb-2">
                Upload Files
              </h3>
              <p className="text-dark-light text-sm">
                Upload one or multiple files to this folder
              </p>
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>Note:</strong> Maximum file size is 5MB per file. For larger files, please contact support.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Select Files *
                </label>
                <input
                  ref={uploadInputRef}
                  type="file"
                  multiple
                  onChange={(e) => setUploadFiles(e.target.files)}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
                <p className="text-xs text-dark-light mt-2">
                  Supported: PDF, DOC, DOCX, TXT, JPG, PNG
                </p>
              </div>

              {uploadFiles && uploadFiles.length > 0 && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 max-h-60 overflow-y-auto">
                  <h4 className="text-sm font-semibold text-dark mb-3">
                    Selected Files ({uploadFiles.length})
                  </h4>
                  <div className="space-y-2">
                    {Array.from(uploadFiles).map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-white rounded border border-gray-200">
                        <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-dark truncate">{file.name}</p>
                          <p className="text-xs text-dark-light">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadFiles(null);
                    setUploadFolderId(null);
                    if (uploadInputRef.current) {
                      uploadInputRef.current.value = '';
                    }
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-dark-light hover:bg-gray-50 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleMultipleFilesUpload}
                  disabled={!uploadFiles || uploadFiles.length === 0}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload {uploadFiles && uploadFiles.length > 0 ? `(${uploadFiles.length})` : ''}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
