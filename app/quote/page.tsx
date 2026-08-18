'use client';

import { useState, useCallback, useEffect } from 'react';
import { Upload, X, CheckCircle, Calculator, Clock, Zap, FileText, DollarSign, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StripeCheckout from '@/components/StripeCheckout';

export default function QuotePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [emailExists, setEmailExists] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    fromLanguage: '',
    toLanguage: 'English',
    pricingModel: 'per-word', // 'per-word' or 'per-page'
    speed: 'standard', // 'same-day' or 'standard'
    pages: '',
    words: '',
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });
  const [accountData, setAccountData] = useState({
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [wordCount, setWordCount] = useState<number | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [canCalculatePrice, setCanCalculatePrice] = useState(true);

  const languages = [
    { name: 'Armenian', code: 'am', flagUrl: 'https://flagcdn.com/w40/am.png' },
    { name: 'English', code: 'us', flagUrl: 'https://flagcdn.com/w40/us.png' },
    { name: 'French', code: 'fr', flagUrl: 'https://flagcdn.com/w40/fr.png' },
    { name: 'Russian', code: 'ru', flagUrl: 'https://flagcdn.com/w40/ru.png' },
    { name: 'Spanish', code: 'es', flagUrl: 'https://flagcdn.com/w40/es.png' },
    { name: 'Ukrainian', code: 'ua', flagUrl: 'https://flagcdn.com/w40/ua.png' },
  ];

  // Standard pricing
  const standardPricePerWord = 0.10;
  const standardPricePerPage = 29.99;

  // Same-day pricing
  const sameDayPricePerWord = 0.20;
  const sameDayPricePerPage = 59.99;

  const calculatePrice = useCallback(() => {
    let price = 0;

    if (formData.pricingModel === 'per-word' && formData.words) {
      const pricePerWord = formData.speed === 'same-day' ? sameDayPricePerWord : standardPricePerWord;
      price = parseFloat(formData.words) * pricePerWord;
    } else if (formData.pricingModel === 'per-page' && formData.pages) {
      const pricePerPage = formData.speed === 'same-day' ? sameDayPricePerPage : standardPricePerPage;
      price = parseFloat(formData.pages) * pricePerPage;
    }

    setEstimatedPrice(price);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Auto-calculate when relevant fields change
      setTimeout(() => {
        if (updated.pricingModel === 'per-word' && updated.words) {
          const pricePerWord = updated.speed === 'same-day' ? sameDayPricePerWord : standardPricePerWord;
          const price = parseFloat(updated.words) * pricePerWord;
          setEstimatedPrice(price);
        } else if (updated.pricingModel === 'per-page' && updated.pages) {
          const pricePerPage = updated.speed === 'same-day' ? sameDayPricePerPage : standardPricePerPage;
          const price = parseFloat(updated.pages) * pricePerPage;
          setEstimatedPrice(price);
        }
      }, 0);

      return updated;
    });
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const countWords = (text: string): number => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const extractTextFromFile = async (file: File) => {
    setIsProcessing(true);
    setWordCount(null);
    setPageCount(null);
    setCanCalculatePrice(true);

    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      // Only count words accurately for DOC and DOCX files
      if (fileExtension !== 'doc' && fileExtension !== 'docx') {
        // For other file types, don't calculate price
        setCanCalculatePrice(false);
        setEstimatedPrice(0);
        setFormData(prev => ({ ...prev, words: '', pages: '' }));
        setIsProcessing(false);
        return;
      }

      if (fileExtension === 'docx') {
        // Handle DOCX files - Extract actual text using mammoth
        try {
          const mammoth = await import('mammoth');
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.extractRawText({ arrayBuffer });
          const text = result.value;

          const words = countWords(text);
          const pages = Math.max(1, Math.ceil(words / 250));

          setWordCount(words);
          setPageCount(pages);

          // Auto-populate the form
          if (formData.pricingModel === 'per-word') {
            setFormData(prev => ({ ...prev, words: words.toString() }));
            const pricePerWord = formData.speed === 'same-day' ? sameDayPricePerWord : standardPricePerWord;
            const price = words * pricePerWord;
            setEstimatedPrice(price);
          } else if (formData.pricingModel === 'per-page') {
            setFormData(prev => ({ ...prev, pages: pages.toString() }));
            const pricePerPage = formData.speed === 'same-day' ? sameDayPricePerPage : standardPricePerPage;
            const price = pages * pricePerPage;
            setEstimatedPrice(price);
          }
        } catch (docxError) {
          console.error('DOCX parsing error:', docxError);
          // Fallback to conservative estimation
          const estimatedWords = Math.floor(file.size / 20);
          const estimatedPages = Math.max(1, Math.ceil(estimatedWords / 250));

          setWordCount(estimatedWords);
          setPageCount(estimatedPages);

          if (formData.pricingModel === 'per-word') {
            setFormData(prev => ({ ...prev, words: estimatedWords.toString() }));
            const pricePerWord = formData.speed === 'same-day' ? sameDayPricePerWord : standardPricePerWord;
            const price = estimatedWords * pricePerWord;
            setEstimatedPrice(price);
          } else if (formData.pricingModel === 'per-page') {
            setFormData(prev => ({ ...prev, pages: estimatedPages.toString() }));
            const pricePerPage = formData.speed === 'same-day' ? sameDayPricePerPage : standardPricePerPage;
            const price = estimatedPages * pricePerPage;
            setEstimatedPrice(price);
          }
        }
      } else if (fileExtension === 'doc') {
        // Handle old DOC files - File size estimation only
        const estimatedWords = Math.floor(file.size / 20);
        const estimatedPages = Math.max(1, Math.ceil(estimatedWords / 250));

        setWordCount(estimatedWords);
        setPageCount(estimatedPages);

        // Auto-populate the form
        if (formData.pricingModel === 'per-word') {
          setFormData(prev => ({ ...prev, words: estimatedWords.toString() }));
          const pricePerWord = formData.speed === 'same-day' ? sameDayPricePerWord : standardPricePerWord;
          const price = estimatedWords * pricePerWord;
          setEstimatedPrice(price);
        } else if (formData.pricingModel === 'per-page') {
          setFormData(prev => ({ ...prev, pages: estimatedPages.toString() }));
          const pricePerPage = formData.speed === 'same-day' ? sameDayPricePerPage : standardPricePerPage;
          const price = estimatedPages * pricePerPage;
          setEstimatedPrice(price);
        }
      }
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      extractTextFromFile(file);
    }
  }, [formData.pricingModel, formData.speed]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      extractTextFromFile(file);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setWordCount(null);
    setPageCount(null);
  };

  useEffect(() => {
    // Fetch user data from API
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setUser(data.user);
            setFormData(prev => ({ ...prev, email: data.user.email }));
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required language fields
    if (!formData.fromLanguage) {
      alert('Please select a "Translate From" language');
      return;
    }

    if (!formData.toLanguage) {
      alert('Please select a "Translate To" language');
      return;
    }

    // Convert uploaded file to base64 for storage
    let fileData = null;
    if (uploadedFile) {
      // Check file size (10MB limit)
      const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
      if (uploadedFile.size > MAX_FILE_SIZE) {
        alert(`File "${uploadedFile.name}" is too large (${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB).\n\nMaximum file size is 10MB. Please upload a smaller file or contact support for large file transfers.`);
        return;
      }

      const reader = new FileReader();
      fileData = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(uploadedFile);
      });
    }

    // Prepare order data
    const order = {
      id: Date.now().toString(),
      email: formData.email,
      fromLanguage: formData.fromLanguage,
      toLanguage: formData.toLanguage,
      pricingModel: formData.pricingModel,
      speed: formData.speed,
      pages: formData.pages,
      words: formData.words,
      totalPrice: canCalculatePrice ? estimatedPrice : null,
      fileName: uploadedFile?.name || 'No file uploaded',
      fileData: fileData,
      fileType: uploadedFile?.type || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      needsPricing: !canCalculatePrice,
    };

    setOrderData(order);

    // Check if user is logged in
    if (!user) {
      // User not logged in - create guest order first, then show account modal
      try {
        const guestOrderResponse = await fetch('/api/orders/guest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            fromLanguage: formData.fromLanguage,
            toLanguage: formData.toLanguage,
            documentType: 'document',
            serviceType: formData.speed === 'same-day' ? 'Same Day' : 'Standard',
            wordCount: parseInt(formData.words || '0'),
            totalPrice: canCalculatePrice ? estimatedPrice : 0,
            isPaid: false,
            needsPricing: !canCalculatePrice,
            files: fileData ? [{
              name: uploadedFile?.name,
              data: fileData,
              type: uploadedFile?.type,
            }] : [],
          }),
        });

        if (!guestOrderResponse.ok) {
          throw new Error('Failed to create order');
        }

        const guestOrderData = await guestOrderResponse.json();
        setCreatedOrderId(guestOrderData.order.id);

        // Now show account creation modal
        checkEmailExists(order.email, '');
        setShowAuthModal(true);
      } catch (error) {
        console.error('Error creating guest order:', error);
        alert('Failed to create order. Please try again.');
      }
    } else {
      // User is already logged in, create order via API
      createOrderViaAPI(order);
    }
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    setPaymentProcessing(false);
    setShowPaymentModal(false);

    // Add payment info to order
    const orderWithPayment = {
      ...orderData,
      paymentStatus: 'paid',
      paymentMethod: 'card',
      paymentDate: new Date().toISOString(),
      paymentIntentId,
    };

    setOrderData(orderWithPayment);

    // Check if user is logged in
    if (!user) {
      // Check if email exists in database using API
      checkEmailExists(orderWithPayment.email, '');
      setShowAuthModal(true);
    } else {
      // User is already logged in, create order via API
      createOrderViaAPI(orderWithPayment);
    }
  };

  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
    setPaymentProcessing(false);
  };

  const checkEmailExists = async (email: string, cardName: string) => {
    try {
      // Check if user exists by attempting to fetch user data
      // We'll use a simple approach - try to see if signup would fail
      const response = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setEmailExists(data.exists);

        // Pre-fill first name and last name from card name if new user
        if (!data.exists && cardName) {
          const nameParts = cardName.trim().split(' ');
          const firstName = nameParts[0] || '';
          const lastName = nameParts.slice(1).join(' ') || '';
          setAccountData(prev => ({
            ...prev,
            firstName,
            lastName,
          }));
        }
      }
    } catch (error) {
      console.error('Error checking email:', error);
      // Default to signup flow if check fails
      setEmailExists(false);
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const name = e.target.name;

    // Format card number
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (value.length > 19) value = value.slice(0, 19);
    }

    // Format expiry date
    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
      if (value.length > 5) value = value.slice(0, 5);
    }

    // Format CVV
    if (name === 'cvv') {
      value = value.replace(/\D/g, '');
      if (value.length > 4) value = value.slice(0, 4);
    }

    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits

    // Format as (XXX) XXX-XXXX
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

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      if (emailExists) {
        // Login flow - use real API
        const loginResponse = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: orderData.email,
            password: accountData.password,
          }),
          credentials: 'include',
        });

        if (!loginResponse.ok) {
          const data = await loginResponse.json();
          setAuthError(data.error || 'Invalid password. Please try again.');
          setAuthLoading(false);
          return;
        }

        // Link the guest order to the newly logged in user
        if (createdOrderId) {
          await linkOrderToUser(createdOrderId);
        }
      } else {
        // Signup flow - use real API
        const signupResponse = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: orderData.email,
            password: accountData.password,
            firstName: accountData.firstName,
            lastName: accountData.lastName,
            phone: accountData.phone,
          }),
          credentials: 'include',
        });

        if (!signupResponse.ok) {
          const data = await signupResponse.json();
          setAuthError(data.error || 'Failed to create account. Please try again.');
          setAuthLoading(false);
          return;
        }

        // User is now automatically logged in via cookie
        // Link the guest order to the newly created user
        if (createdOrderId) {
          await linkOrderToUser(createdOrderId);
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setAuthError('An unexpected error occurred. Please try again.');
      setAuthLoading(false);
    }
  };

  const linkOrderToUser = async (orderId: string) => {
    try {
      const linkResponse = await fetch('/api/orders/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
        credentials: 'include',
      });

      if (!linkResponse.ok) {
        throw new Error('Failed to link order');
      }

      // Redirect to dashboard
      router.push('/portal/dashboard?order_created=true');
    } catch (error) {
      console.error('Order linking error:', error);
      setAuthError('Account created but order linking failed. Please contact support.');
      setAuthLoading(false);
    }
  };

  const createOrderViaAPI = async (order: any) => {
    try {
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromLanguage: order.fromLanguage,
          toLanguage: order.toLanguage,
          documentType: 'document',
          serviceType: order.speed === 'same-day' ? 'Same Day' : 'Standard',
          wordCount: parseInt(order.words || '0'),
          totalPrice: order.totalPrice || 0, // Allow 0 for orders needing pricing
          isPaid: order.paymentIntentId ? true : false, // Only mark as paid if payment was completed
          paymentIntentId: order.paymentIntentId,
          needsPricing: order.needsPricing || false,
          files: order.fileData ? [{
            name: order.fileName,
            data: order.fileData,
            type: order.fileType,
          }] : [],
        }),
        credentials: 'include',
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      // Redirect to dashboard
      router.push('/portal/dashboard?order_created=true');
    } catch (error) {
      console.error('Order creation error:', error);
      setAuthError('Account created but order failed. Please try creating the order again from your dashboard.');
      setTimeout(() => {
        router.push('/portal/dashboard');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-blue-50">
      {/* Header */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container-custom py-12 md:py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-4 border border-white/30">
              <span className="text-white font-semibold text-sm flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Instant Quote • Fast Turnaround • Certified Translators
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
              Order Translation <br />
              <span className="text-white/90">in Minutes</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Upload your document, get instant pricing, and receive professional translations
              from <span className="font-semibold text-white">$0.10 per word</span>
            </p>
          </div>
        </div>
      </section>

      {/* Main Form */}
      <section className="py-16 -mt-10 relative z-20">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Languages */}
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-heading font-bold text-dark mb-6 flex items-center">
                      <div className="bg-primary/10 p-3 rounded-xl mr-3">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      Translation Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* From Language Dropdown */}
                      <div className="relative">
                        <label className="block text-sm font-semibold text-dark mb-2">
                          Translate From *
                        </label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowFromDropdown(!showFromDropdown)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-gray-50 flex items-center justify-between text-left"
                          >
                            {formData.fromLanguage ? (
                              <div className="flex items-center space-x-3">
                                <img
                                  src={languages.find(l => l.name === formData.fromLanguage)?.flagUrl}
                                  alt=""
                                  className="w-6 h-4 object-cover rounded"
                                />
                                <span className="text-dark">{formData.fromLanguage}</span>
                              </div>
                            ) : (
                              <span className="text-gray-400">Select language</span>
                            )}
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {showFromDropdown && (
                            <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-60 overflow-auto">
                              {languages.map((lang) => (
                                <button
                                  key={`from-${lang.name}`}
                                  type="button"
                                  onClick={() => {
                                    setFormData(prev => ({ ...prev, fromLanguage: lang.name }));
                                    setShowFromDropdown(false);
                                  }}
                                  className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-primary/5 transition-colors text-left"
                                >
                                  <img
                                    src={lang.flagUrl}
                                    alt={lang.name}
                                    className="w-6 h-4 object-cover rounded"
                                  />
                                  <span className="text-dark">{lang.name}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* To Language Dropdown */}
                      <div className="relative">
                        <label className="block text-sm font-semibold text-dark mb-2">
                          Translate To *
                        </label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowToDropdown(!showToDropdown)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-gray-50 flex items-center justify-between text-left"
                          >
                            {formData.toLanguage ? (
                              <div className="flex items-center space-x-3">
                                <img
                                  src={languages.find(l => l.name === formData.toLanguage)?.flagUrl}
                                  alt=""
                                  className="w-6 h-4 object-cover rounded"
                                />
                                <span className="text-dark">{formData.toLanguage}</span>
                              </div>
                            ) : (
                              <span className="text-gray-400">Select language</span>
                            )}
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {showToDropdown && (
                            <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-60 overflow-auto">
                              {languages.map((lang) => (
                                <button
                                  key={`to-${lang.name}`}
                                  type="button"
                                  onClick={() => {
                                    setFormData(prev => ({ ...prev, toLanguage: lang.name }));
                                    setShowToDropdown(false);
                                  }}
                                  className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-primary/5 transition-colors text-left"
                                >
                                  <img
                                    src={lang.flagUrl}
                                    alt={lang.name}
                                    className="w-6 h-4 object-cover rounded"
                                  />
                                  <span className="text-dark">{lang.name}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Type */}
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-heading font-bold text-dark mb-6 flex items-center">
                      <div className="bg-primary/10 p-3 rounded-xl mr-3">
                        <Calculator className="h-6 w-6 text-primary" />
                      </div>
                      Select Service
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label
                        className={`relative flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          formData.pricingModel === 'per-word'
                            ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-md'
                            : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
                        }`}
                      >
                        <input
                          type="radio"
                          name="pricingModel"
                          value="per-word"
                          checked={formData.pricingModel === 'per-word'}
                          onChange={handleChange}
                          className="w-5 h-5 text-primary"
                        />
                        <div className="ml-3">
                          <div className="font-semibold text-dark">Per Word</div>
                          <div className="text-sm text-dark-light">
                            ${(formData.speed === 'same-day' ? sameDayPricePerWord : standardPricePerWord).toFixed(2)} per word
                          </div>
                        </div>
                      </label>

                      <label
                        className={`relative flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          formData.pricingModel === 'per-page'
                            ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-md'
                            : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
                        }`}
                      >
                        <input
                          type="radio"
                          name="pricingModel"
                          value="per-page"
                          checked={formData.pricingModel === 'per-page'}
                          onChange={handleChange}
                          className="w-5 h-5 text-primary"
                        />
                        <div className="ml-3">
                          <div className="font-semibold text-dark">Per Page</div>
                          <div className="text-sm text-dark-light">
                            ${(formData.speed === 'same-day' ? sameDayPricePerPage : standardPricePerPage).toFixed(2)} per page
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Speed */}
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-heading font-bold text-dark mb-6 flex items-center">
                      <div className="bg-primary/10 p-3 rounded-xl mr-3">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      Turnaround Speed
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label
                        className={`relative flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          formData.speed === 'standard'
                            ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-md'
                            : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
                        }`}
                      >
                        <input
                          type="radio"
                          name="speed"
                          value="standard"
                          checked={formData.speed === 'standard'}
                          onChange={handleChange}
                          className="w-5 h-5 text-primary"
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-semibold text-dark flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              Regular
                            </div>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">2 Business Days</span>
                          </div>
                          <div className="text-sm text-dark-light mt-1">Standard pricing</div>
                        </div>
                      </label>

                      <label
                        className={`relative flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          formData.speed === 'same-day'
                            ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-md'
                            : 'border-gray-200 hover:border-yellow-400 hover:shadow-md'
                        }`}
                      >
                        <input
                          type="radio"
                          name="speed"
                          value="same-day"
                          checked={formData.speed === 'same-day'}
                          onChange={handleChange}
                          className="w-5 h-5 text-primary"
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-semibold text-dark flex items-center">
                              <Zap className="h-4 w-4 mr-1 text-yellow-500" />
                              Rush Delivery
                            </div>
                            <span className="text-xs bg-yellow-100 px-2 py-1 rounded">1 Business Day</span>
                          </div>
                          <div className="text-sm text-dark-light mt-1">Expedited service</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Email & Upload */}
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-heading font-bold text-dark mb-6 flex items-center">
                      <div className="bg-primary/10 p-3 rounded-xl mr-3">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      Document & Contact
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-dark mb-2">
                          Your Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={!!user}
                          className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition ${
                            user
                              ? 'border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed'
                              : 'border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50'
                          }`}
                          placeholder="your@email.com"
                        />
                        {user && (
                          <p className="text-xs text-dark-light mt-1">
                            Logged in as {user.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-dark mb-2">
                          Upload Document
                        </label>
                        {!uploadedFile ? (
                          <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                              isDragging
                                ? 'border-primary bg-primary/5 scale-105'
                                : 'border-gray-300 hover:border-primary'
                            }`}
                          >
                            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-dark mb-2">
                              Drag and drop your file here, or{' '}
                              <label className="text-primary hover:underline cursor-pointer font-semibold">
                                browse
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={handleFileSelect}
                                />
                              </label>
                            </p>
                            <p className="text-sm text-dark-light">
                              All file types accepted (Max 10MB)
                            </p>
                            <p className="text-xs text-primary mt-1 font-semibold">
                              Note: Automatic pricing only for DOC/DOCX files
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="border-2 border-primary rounded-lg p-4 bg-primary/5">
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

                            {/* Word Count Display */}
                            {isProcessing ? (
                              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center space-x-2">
                                  <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
                                  <p className="text-sm text-dark-light">Analyzing document...</p>
                                </div>
                              </div>
                            ) : !canCalculatePrice ? (
                              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
                                <div className="flex items-start space-x-3">
                                  <AlertCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <h4 className="text-sm font-semibold text-orange-900 mb-2">Price to be determined</h4>
                                    <p className="text-xs text-orange-800 leading-relaxed">
                                      This file type requires manual review. Our Team will analyze your document and set a fair price. You'll be notified once pricing is available.
                                    </p>
                                    <p className="text-xs text-orange-900 font-semibold mt-2">
                                      ✓ You can submit your order now - payment will be processed after pricing is confirmed
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              wordCount !== null && pageCount !== null && (
                                <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4">
                                  <h4 className="text-sm font-semibold text-dark mb-3">Document Analysis:</h4>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-xs text-dark-light mb-1">Word Count</p>
                                      <p className="text-2xl font-bold text-primary">{wordCount.toLocaleString()}</p>
                                      <p className="text-xs text-dark-light mt-1">
                                        ≈ ${(wordCount * (formData.speed === 'same-day' ? sameDayPricePerWord : standardPricePerWord)).toFixed(2)}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-dark-light mb-1">Page Count</p>
                                      <p className="text-2xl font-bold text-primary">{pageCount}</p>
                                      <p className="text-xs text-dark-light mt-1">
                                        ≈ ${(pageCount * (formData.speed === 'same-day' ? sameDayPricePerPage : standardPricePerPage)).toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                  <p className="text-xs text-dark-light mt-3 italic">
                                    ✓ Counts automatically applied to pricing
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Word/Page Count */}
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-heading font-bold text-dark mb-6 flex items-center">
                      <div className="bg-primary/10 p-3 rounded-xl mr-3">
                        <Calculator className="h-6 w-6 text-primary" />
                      </div>
                      Document Count
                    </h2>

                    {formData.pricingModel === 'per-word' && (
                      <div>
                        <label htmlFor="words" className="block text-sm font-semibold text-dark mb-2">
                          Number of Words {canCalculatePrice && '*'}
                        </label>
                        <input
                          type="number"
                          id="words"
                          name="words"
                          value={formData.words}
                          onChange={handleChange}
                          min="1"
                          required={canCalculatePrice}
                          disabled={!canCalculatePrice}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder={canCalculatePrice ? "Enter word count" : "Not available for this file type"}
                        />
                        <p className="text-xs text-dark-light mt-2">
                          {canCalculatePrice
                            ? 'The word count is automatically calculated from your uploaded document'
                            : 'Word count not available - Our Team will review and price your document'}
                        </p>
                      </div>
                    )}

                    {formData.pricingModel === 'per-page' && (
                      <div>
                        <label htmlFor="pages" className="block text-sm font-semibold text-dark mb-2">
                          Number of Pages {canCalculatePrice && '*'}
                        </label>
                        <input
                          type="number"
                          id="pages"
                          name="pages"
                          value={formData.pages}
                          onChange={handleChange}
                          min="1"
                          required={canCalculatePrice}
                          disabled={!canCalculatePrice}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder={canCalculatePrice ? "Enter page count" : "Not available for this file type"}
                        />
                        <p className="text-xs text-dark-light mt-2">
                          {canCalculatePrice
                            ? 'The page count is automatically calculated from your uploaded document'
                            : 'Page count not available - Our Team will review and price your document'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-8 py-5 rounded-2xl transition-all font-bold text-xl shadow-2xl hover:shadow-primary/50 transform hover:scale-105 duration-300 flex items-center justify-center group"
                  >
                    <span>Translate Now</span>
                    <CheckCircle className="ml-2 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  </button>
                </form>
              </div>

              {/* Price Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <div className="bg-gradient-to-br from-primary via-primary to-primary-dark rounded-2xl shadow-2xl p-8 text-white border-4 border-white/20 hover:scale-105 transition-transform duration-300">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/5 to-transparent rounded-2xl"></div>
                    <h3 className="text-2xl font-heading font-bold mb-8 flex items-center relative z-10">
                      <div className="bg-white/20 p-3 rounded-xl mr-3">
                        <DollarSign className="h-7 w-7" />
                      </div>
                      Price Estimate
                    </h3>

                    <div className="space-y-5 mb-8 relative z-10">
                      {formData.pricingModel && (
                        <div className="flex justify-between items-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                          <span className="opacity-90 text-base">Service Type:</span>
                          <span className="font-bold text-lg">
                            {formData.pricingModel === 'per-word' ? 'Per Word' : 'Per Page'}
                          </span>
                        </div>
                      )}

                      {formData.pricingModel === 'per-word' && formData.words && (
                        <div className="flex justify-between items-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                          <span className="opacity-90 text-base">Words:</span>
                          <span className="font-bold text-lg">{formData.words}</span>
                        </div>
                      )}

                      {formData.pricingModel === 'per-page' && formData.pages && (
                        <div className="flex justify-between items-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                          <span className="opacity-90 text-base">Pages:</span>
                          <span className="font-bold text-lg">{formData.pages}</span>
                        </div>
                      )}

                      {formData.speed && (
                        <div className="flex justify-between items-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                          <span className="opacity-90 text-base">Turnaround:</span>
                          <span className="font-bold text-lg flex items-center">
                            {formData.speed === 'same-day' && <Zap className="h-4 w-4 mr-1" />}
                            {formData.speed === 'same-day' ? 'Rush - 1 Day' : 'Regular - 2 Days'}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-white/30 pt-6 relative z-10">
                      <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                        {canCalculatePrice ? (
                          <div className="flex justify-between items-center">
                            <span className="text-xl font-semibold">Total:</span>
                            <span className="text-5xl font-bold">
                              ${estimatedPrice > 0 ? estimatedPrice.toFixed(2) : '0.00'}
                            </span>
                          </div>
                        ) : (
                          <div className="text-center">
                            <p className="text-lg font-semibold mb-2">Price:</p>
                            <p className="text-2xl font-bold text-yellow-300">To Be Determined</p>
                            <p className="text-sm opacity-90 mt-2">Our Team will review and set pricing</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {(estimatedPrice > 0 || !canCalculatePrice) && (
                      <div className="mt-6 p-5 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 relative z-10">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                          <p className="text-base leading-relaxed">
                            Professional translation by certified translators with {canCalculatePrice ? '100% satisfaction guarantee' : 'fair pricing'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Info */}
                  <div className="mt-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 border border-gray-100">
                    <h4 className="font-bold text-xl text-dark mb-6">What's Included:</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start group">
                        <div className="bg-primary/10 p-2 rounded-lg mr-3 group-hover:bg-primary/20 transition-colors">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-dark-light group-hover:text-dark transition-colors">Certified professional translation</span>
                      </li>
                      <li className="flex items-start group">
                        <div className="bg-primary/10 p-2 rounded-lg mr-3 group-hover:bg-primary/20 transition-colors">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-dark-light group-hover:text-dark transition-colors">Quality assurance review</span>
                      </li>
                      <li className="flex items-start group">
                        <div className="bg-primary/10 p-2 rounded-lg mr-3 group-hover:bg-primary/20 transition-colors">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-dark-light group-hover:text-dark transition-colors">Formatted delivery</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stripe Payment Modal */}
      {showPaymentModal && (
        <StripeCheckout
          amount={estimatedPrice}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
          metadata={{
            fromLanguage: orderData?.fromLanguage,
            toLanguage: orderData?.toLanguage,
            serviceType: orderData?.speed,
          }}
        />
      )}

      {/* Auth Required Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <div className="text-center mb-6">
              {orderData?.paymentStatus === 'paid' ? (
                <>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-dark mb-2">
                    Payment Successful!
                  </h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                    <p className="text-sm text-green-800">
                      Translation: <span className="font-bold">{orderData?.fromLanguage} → {orderData?.toLanguage}</span>
                    </p>
                    <p className="text-sm text-green-800">
                      Amount Paid: <span className="font-bold">${orderData?.totalPrice?.toFixed(2)}</span>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-dark mb-2">
                    Complete Your Order
                  </h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                    <p className="text-sm text-blue-800">
                      Translation: <span className="font-bold">{orderData?.fromLanguage} → {orderData?.toLanguage}</span>
                    </p>
                    {orderData?.needsPricing ? (
                      <p className="text-sm text-blue-800 mt-1">
                        Status: <span className="font-bold">Pricing will be determined by our team</span>
                      </p>
                    ) : (
                      <p className="text-sm text-blue-800 mt-1">
                        Estimated Cost: <span className="font-bold">${orderData?.totalPrice?.toFixed(2)}</span>
                      </p>
                    )}
                  </div>
                </>
              )}
              <p className="text-dark-light text-sm">
                {emailExists
                  ? 'Welcome back! Please sign in to submit your translation request.'
                  : 'Create your account to submit your translation request. You can track progress and manage payment in your dashboard.'}
              </p>
            </div>

            <form onSubmit={handleAccountSubmit} className="space-y-4">
              {authError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{authError}</p>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={orderData?.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              {!emailExists && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-dark mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={accountData.firstName}
                        onChange={(e) => setAccountData({ ...accountData, firstName: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-dark mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={accountData.lastName}
                        onChange={(e) => setAccountData({ ...accountData, lastName: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-dark mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={accountData.phone}
                      onChange={handlePhoneChange}
                      required
                      maxLength={14}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-dark mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  value={accountData.password}
                  onChange={(e) => setAccountData({ ...accountData, password: e.target.value })}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                />
                {!emailExists && (
                  <p className="text-xs text-dark-light mt-1">Minimum 8 characters</p>
                )}
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {authLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    {emailExists ? 'Signing in...' : 'Creating account...'}
                  </span>
                ) : (
                  emailExists ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
