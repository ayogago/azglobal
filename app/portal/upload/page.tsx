'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Upload, FileText, X, CheckCircle, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

function UploadForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const folderId = searchParams.get('folder');

  const [user, setUser] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fromLanguage: '',
    toLanguage: '',
    documentType: '',
    certified: 'no',
    notes: '',
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
        });

        if (!response.ok) {
          router.push('/portal/login');
          return;
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/portal/login');
      }
    };

    fetchUser();
  }, [router]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setUploadedFile(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setUploadedFile(files[0]);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadedFile) {
      alert('Please upload a file');
      return;
    }

    if (!formData.fromLanguage || !formData.toLanguage) {
      alert('Please select both languages');
      return;
    }

    setIsUploading(true);

    // Simulate upload - Save to folder
    setTimeout(() => {
      if (user && folderId) {
        // Get existing folders
        const savedFolders = localStorage.getItem(`folders_${user.email}`);
        if (savedFolders) {
          const folders = JSON.parse(savedFolders);

          // Find the target folder
          const folderIndex = folders.findIndex((f: any) => f.id === folderId);
          if (folderIndex !== -1) {
            // Create new file object
            const newFile = {
              id: Date.now().toString(),
              name: uploadedFile.name,
              size: `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB`,
              uploadDate: new Date().toISOString().split('T')[0],
              fromLanguage: formData.fromLanguage,
              toLanguage: formData.toLanguage,
              activityLog: [
                {
                  id: Date.now().toString(),
                  action: 'Uploaded',
                  timestamp: new Date().toLocaleString(),
                  details: `File uploaded - ${formData.fromLanguage} to ${formData.toLanguage}`,
                },
              ],
            };

            // Add file to folder
            folders[folderIndex].files.push(newFile);

            // Save back to localStorage
            localStorage.setItem(`folders_${user.email}`, JSON.stringify(folders));
          }
        }
      }

      setIsUploading(false);
      setUploadSuccess(true);

      // Redirect to folders page after 2 seconds
      setTimeout(() => {
        router.push('/portal/folders');
      }, 2000);
    }, 1000);
  };

  const languages = [
    'Armenian',
    'English',
    'French',
    'Russian',
    'Spanish',
    'Ukrainian',
  ];

  const documentTypes = [
    'Birth Certificate',
    'Marriage Certificate',
    'Divorce Decree',
    'Academic Transcript',
    'Diploma/Degree',
    'Legal Document',
    'Business Document',
    'Medical Record',
    'Immigration Document',
    'Other',
  ];

  if (!user) {
    return null;
  }

  if (uploadSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-dark mb-2">Upload Successful!</h2>
          <p className="text-dark-light mb-6">
            Your document has been uploaded successfully. We'll notify you when the translation is ready.
          </p>
          <Link
            href="/portal/dashboard"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors font-medium"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/portal/dashboard" className="text-dark-light hover:text-primary">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-xl font-heading font-bold text-dark">Upload Document</h1>
            </div>
            <Link
              href="/portal/dashboard"
              className="text-dark-light hover:text-primary text-sm font-medium"
            >
              Cancel
            </Link>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-heading font-semibold text-dark mb-4">Upload File</h2>

              {!uploadedFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    isDragging
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-dark mb-2">
                    Drag and drop your file here, or{' '}
                    <label className="text-primary hover:underline cursor-pointer">
                      browse
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-dark-light">
                    Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                  </p>
                </div>
              ) : (
                <div className="border-2 border-primary rounded-lg p-6 bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium text-dark">{uploadedFile.name}</p>
                        <p className="text-sm text-dark-light">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Translation Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-heading font-semibold text-dark mb-4">Translation Details</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fromLanguage" className="block text-sm font-medium text-dark mb-2">
                      Translate From *
                    </label>
                    <select
                      id="fromLanguage"
                      name="fromLanguage"
                      value={formData.fromLanguage}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    >
                      <option value="">Select language</option>
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="toLanguage" className="block text-sm font-medium text-dark mb-2">
                      Translate To *
                    </label>
                    <select
                      id="toLanguage"
                      name="toLanguage"
                      value={formData.toLanguage}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    >
                      <option value="">Select language</option>
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="documentType" className="block text-sm font-medium text-dark mb-2">
                    Document Type *
                  </label>
                  <select
                    id="documentType"
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  >
                    <option value="">Select document type</option>
                    {documentTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Certification Required? *
                  </label>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="certified"
                        value="yes"
                        checked={formData.certified === 'yes'}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-dark-light">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="certified"
                        value="no"
                        checked={formData.certified === 'no'}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-dark-light">No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-dark mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                    placeholder="Any special instructions or requirements..."
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between">
              <Link
                href="/portal/dashboard"
                className="text-dark-light hover:text-primary font-medium"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isUploading || !uploadedFile}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : 'Submit Translation Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function UploadPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    }>
      <UploadForm />
    </Suspense>
  );
}
