'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function DebugPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [localStorageData, setLocalStorageData] = useState<any>({});

  useEffect(() => {
    const adminData = localStorage.getItem('admin');
    if (!adminData) {
      router.push('/portal/login');
    } else {
      setAdmin(JSON.parse(adminData));

      // Read all localStorage data
      const data: any = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          try {
            data[key] = JSON.parse(localStorage.getItem(key) || '');
          } catch (e) {
            data[key] = localStorage.getItem(key);
          }
        }
      }
      setLocalStorageData(data);
    }
  }, [router]);

  if (!admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center space-x-4">
            <Link href="/portal/dashboard" className="text-dark-light hover:text-primary">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-heading font-bold text-dark">
              Debug - LocalStorage Contents
            </h1>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-heading font-semibold text-dark mb-4">
            All LocalStorage Keys
          </h2>
          <div className="space-y-4">
            {Object.keys(localStorageData).map((key) => (
              <div key={key} className="border-b pb-4">
                <h3 className="font-semibold text-primary mb-2">{key}</h3>
                <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto max-h-96">
                  {JSON.stringify(localStorageData[key], null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
