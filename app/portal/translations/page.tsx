'use client';
export const dynamic = 'force-dynamic';


import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FileText, ArrowLeft } from 'lucide-react';

export default function TranslationsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

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
          <div className="flex items-center mb-6">
            <FileText className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-2xl font-heading font-bold text-dark">My Translations</h1>
          </div>

          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-dark-light text-lg mb-4">No translations yet</p>
            <Link
              href="/quote"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Order Your First Translation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
