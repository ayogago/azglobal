import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="AZ Global Translations"
                width={220}
                height={90}
                className="h-auto w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 text-sm">
              Precision in Every Word. Speed in Every Project.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Certified Translation
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Document Translation
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Legal Translation
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Business Translation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">info@azglobaltranslations.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">+1 (747) 895-4845</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Los Angeles, CA USA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="text-center mb-4">
            <p className="text-gray-400 text-sm mb-3">We Accept</p>
            <div className="flex justify-center items-center space-x-6">
              <svg className="h-8 w-auto text-white" viewBox="0 0 48 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Visa">
                <rect width="48" height="32" rx="4" fill="#1434CB"/>
                <text x="24" y="20" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Arial">VISA</text>
              </svg>
              <svg className="h-8 w-auto" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mastercard">
                <rect width="48" height="32" rx="4" fill="#EB001B"/>
                <circle cx="18" cy="16" r="10" fill="#EB001B"/>
                <circle cx="30" cy="16" r="10" fill="#FF5F00"/>
                <circle cx="24" cy="16" r="10" fill="#F79E1B" opacity="0.8"/>
              </svg>
              <svg className="h-8 w-auto text-white" viewBox="0 0 48 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="American Express">
                <rect width="48" height="32" rx="4" fill="#016FD0"/>
                <text x="24" y="20" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Arial">AMEX</text>
              </svg>
              <svg className="h-8 w-auto text-white" viewBox="0 0 48 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Discover">
                <rect width="48" height="32" rx="4" fill="#FF6000"/>
                <circle cx="12" cy="16" r="3" fill="white"/>
                <circle cx="20" cy="16" r="3" fill="white"/>
                <circle cx="28" cy="16" r="3" fill="white"/>
                <circle cx="36" cy="16" r="3" fill="white"/>
                <text x="24" y="28" fontSize="6" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Arial">DISCOVER</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            © {currentYear} AZ Global Translations. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
