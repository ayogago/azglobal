import { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Contact Us | AZ Global Translations',
  description: 'Get in touch with AZ Global Translations for professional translation services. We\'re here to help 24/7.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | AZ Global Translations',
    description: 'Get in touch with AZ Global Translations for professional translation services. We\'re here to help 24/7.',
    url: 'https://azglobaltranslations.com/contact',
    type: 'website',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | AZ Global Translations',
    description: 'Get in touch with AZ Global Translations for professional translation services.',
    images: ['/logo.png'],
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-white py-16 md:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-dark-light">
              We're here to help with all your translation needs. Get in touch today!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">
                Get In Touch
              </h2>
              <p className="text-lg text-dark-light mb-8">
                Have questions about our services? Need a quote? Our team is ready to assist you.
                Reach out to us using any of the methods below.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-1">Email</h3>
                    <a
                      href="mailto:info@azglobaltranslations.com"
                      className="text-primary hover:underline"
                    >
                      info@azglobaltranslations.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-1">Phone</h3>
                    <a
                      href="tel:+17478954845"
                      className="text-primary hover:underline"
                    >
                      +1 (747) 895-4845
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-1">Location</h3>
                    <p className="text-dark-light">Los Angeles, CA USA</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-heading font-bold text-dark mb-6">
                Send Us a Message
              </h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-dark mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    placeholder="+1 (747) 895-4845"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-dark mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    placeholder="Translation inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                    placeholder="Tell us about your translation needs..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section with World Map Background */}
      <section className="relative py-24 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1920&h=800&fit=crop"
            alt="World map"
            fill
            className="object-cover"
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <MapPin className="h-16 w-16 text-primary mx-auto mb-6" />
            <h3 className="text-4xl font-heading font-bold text-dark mb-4">
              Serving Clients Worldwide
            </h3>
            <p className="text-xl text-dark-light mb-8">
              Based in Los Angeles, providing professional translation services globally
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-dark-light">Countries Served</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-primary mb-1">6</div>
                <div className="text-sm text-dark-light">Languages</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-dark-light">Support</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-primary mb-1">12-48h</div>
                <div className="text-sm text-dark-light">Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
