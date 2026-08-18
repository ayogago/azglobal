'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, User, LogOut, FileText, ShoppingCart, LayoutDashboard, ChevronDown } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Check if user is logged in via API
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setUser(null);
      }
    };

    checkAuth();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      setUser(null);
      setUserMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
      // Still clear the user state on error
      setUser(null);
      setUserMenuOpen(false);
      router.push('/');
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white shadow-sm'
        }`}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between lg:justify-between justify-center relative h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center transform hover:scale-105 transition-transform duration-200">
              <Image
                src="/logo.png"
                alt="AZ Global Translations"
                width={300}
                height={123}
                priority
                className="h-auto w-auto max-h-16 md:max-h-20 lg:max-h-16"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg group ${
                      isActive
                        ? 'text-primary'
                        : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-200 ${
                      isActive ? 'w-8' : 'w-0 group-hover:w-8'
                    }`}></span>
                  </Link>
                );
              })}
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                href="/quote"
                className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Order Translation
              </Link>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                  >
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">{user.name?.charAt(0) || 'U'}</span>
                    </div>
                    <span>{user.name}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-30"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-40">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-semibold text-dark">{user.name}</p>
                          <p className="text-xs text-dark-light">{user.email}</p>
                        </div>
                        <Link
                          href="/portal/dashboard"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          href="/portal/translations"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <FileText className="h-4 w-4" />
                          <span>My Translations</span>
                        </Link>
                        <Link
                          href="/portal/orders"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span>My Orders</span>
                        </Link>
                        <Link
                          href="/portal/profile"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/portal/login"
                    className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    href="/portal/signup"
                    className="px-5 py-2.5 text-sm font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden absolute right-0 text-gray-700 hover:text-primary p-2 rounded-lg hover:bg-primary/5 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Navigation Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="relative flex items-center justify-center p-6 border-b border-gray-100">
            <Image
              src="/logo.png"
              alt="AZ Global Translations"
              width={260}
              height={106}
              className="h-auto w-auto max-h-14"
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="absolute right-6 p-2 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg font-semibold transition-all ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile Menu Footer Auth */}
          <div className="p-6 border-t border-gray-100 space-y-3">
            <Link
              href="/quote"
              className="block bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-lg font-semibold text-center shadow-lg hover:shadow-xl transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Order Translation
            </Link>

            {user ? (
              <>
                <div className="bg-primary/5 rounded-lg p-4 mb-3">
                  <p className="text-sm font-semibold text-dark">{user.name}</p>
                  <p className="text-xs text-dark-light">{user.email}</p>
                </div>
                <Link
                  href="/portal/dashboard"
                  className="flex items-center space-x-2 px-6 py-3 text-gray-700 font-semibold hover:bg-primary/5 hover:text-primary rounded-lg transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/portal/translations"
                  className="flex items-center space-x-2 px-6 py-3 text-gray-700 font-semibold hover:bg-primary/5 hover:text-primary rounded-lg transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FileText className="h-5 w-5" />
                  <span>My Translations</span>
                </Link>
                <Link
                  href="/portal/orders"
                  className="flex items-center space-x-2 px-6 py-3 text-gray-700 font-semibold hover:bg-primary/5 hover:text-primary rounded-lg transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>My Orders</span>
                </Link>
                <Link
                  href="/portal/profile"
                  className="flex items-center space-x-2 px-6 py-3 text-gray-700 font-semibold hover:bg-primary/5 hover:text-primary rounded-lg transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-6 py-3 text-red-600 font-semibold hover:bg-red-50 rounded-lg transition-all"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/portal/login"
                  className="block text-center px-6 py-3 text-gray-700 font-semibold hover:bg-primary/5 hover:text-primary rounded-lg transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/portal/signup"
                  className="block text-center px-6 py-3 border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white rounded-lg transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
