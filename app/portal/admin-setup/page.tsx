'use client';
export const dynamic = 'force-dynamic';


import { useState, useEffect } from 'react';
import { Shield, CheckCircle } from 'lucide-react';

export default function AdminSetupPage() {
  const [setupComplete, setSetupComplete] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);

  useEffect(() => {
    // Check if admin already exists
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const existingAdmin = users.find((u: any) => u.email === 'info@azglobaltranslations.com');

    if (existingAdmin) {
      setAlreadyExists(true);
    }
  }, []);

  const createAdminUser = () => {
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');

    // Check if admin already exists
    const existingAdmin = users.find((u: any) => u.email === 'info@azglobaltranslations.com');

    if (existingAdmin) {
      setAlreadyExists(true);
      return;
    }

    // Create admin user
    const adminUser = {
      email: 'info@azglobaltranslations.com',
      password: 'AZ2025global$',
      name: 'AZ Global Admin',
      firstName: 'Admin',
      lastName: 'AZ Global',
      phone: '+1 (747) 895-4845',
      isAdmin: true,
      createdAt: new Date().toISOString(),
    };

    users.push(adminUser);
    localStorage.setItem('registered_users', JSON.stringify(users));

    // Add to client registry
    const clientRegistry = JSON.parse(localStorage.getItem('client_registry') || '[]');
    clientRegistry.push({
      email: adminUser.email,
      name: adminUser.name,
      phone: adminUser.phone,
      joinDate: new Date().toISOString().split('T')[0],
      isAdmin: true,
    });
    localStorage.setItem('client_registry', JSON.stringify(clientRegistry));

    setSetupComplete(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-dark mb-2">
              Admin Setup
            </h1>
            <p className="text-dark-light">
              Initialize the admin account for AZ Global Translations
            </p>
          </div>

          {!setupComplete && !alreadyExists && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-dark mb-2">Admin Credentials</h3>
                <div className="text-sm text-dark-light space-y-1">
                  <p><strong>Email:</strong> info@azglobaltranslations.com</p>
                  <p><strong>Password:</strong> AZ2025global$</p>
                </div>
              </div>

              <button
                onClick={createAdminUser}
                className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors font-medium"
              >
                Create Admin Account
              </button>
            </div>
          )}

          {setupComplete && (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-dark">Admin Account Created!</h2>
              <p className="text-dark-light">
                You can now log in with the admin credentials.
              </p>
              <a
                href="/portal/login"
                className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors font-medium"
              >
                Go to Login
              </a>
            </div>
          )}

          {alreadyExists && (
            <div className="text-center space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  Admin account already exists. Please use the login page.
                </p>
              </div>
              <a
                href="/portal/login"
                className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors font-medium"
              >
                Go to Login
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
