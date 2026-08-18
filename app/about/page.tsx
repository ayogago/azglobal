import { Metadata } from 'next';
import { CheckCircle, Users, Globe, Award, Target, Heart } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | AZ Global Translations',
  description: 'Learn about AZ Global Translations, our mission, values, and commitment to providing professional certified translation services.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | AZ Global Translations',
    description: 'Learn about AZ Global Translations, our mission, values, and commitment to providing professional certified translation services.',
    url: 'https://azglobaltranslations.com/about',
    type: 'website',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | AZ Global Translations',
    description: 'Learn about AZ Global Translations, our mission, values, and commitment to providing professional certified translation services.',
    images: ['/logo.png'],
  },
};

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Accuracy',
      description: 'We ensure every translation is precise and faithful to the original document.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving clients worldwide with translation services in Armenian, English, French, Russian, Spanish, and Ukrainian.',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Certified translators with specialized knowledge in various industries.',
    },
    {
      icon: Heart,
      title: 'Customer Focus',
      description: 'Dedicated to exceeding our clients\' expectations with every project.',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Documents Translated' },
    { number: '6', label: 'Languages' },
    { number: '50+', label: 'Countries Served' },
    { number: '99%', label: 'Customer Satisfaction' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-white py-16 md:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-4">
              About AZ Global Translations
            </h1>
            <p className="text-xl text-dark-light">
              Your trusted partner for professional certified translation services
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-dark-light">
                To bridge language barriers and connect people, businesses, and cultures through
                accurate, certified translation services delivered with speed and precision.
              </p>
            </div>
            <div className="prose prose-lg max-w-none text-dark-light">
              <p>
                At AZ Global Translations, we understand that accurate translation is more than just
                converting words from one language to another. It's about preserving meaning, context,
                and cultural nuances while ensuring that every document meets the highest standards
                of accuracy and professionalism.
              </p>
              <p>
                Founded with a commitment to excellence, we have grown to become a trusted name in
                certified translation services. Our team of professional translators brings together
                linguistic expertise, cultural knowledge, and industry-specific experience to deliver
                translations that you can rely on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
              Our Values
            </h2>
            <p className="text-lg text-dark-light">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-2">{value.title}</h3>
                  <p className="text-dark-light">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-8 text-center">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-dark mb-1">Certified Translators</h3>
                  <p className="text-dark-light">All our translators are certified professionals with proven expertise</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-dark mb-1">Fast Turnaround</h3>
                  <p className="text-dark-light">Quick delivery without compromising on quality</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-dark mb-1">Competitive Pricing</h3>
                  <p className="text-dark-light">Professional services at affordable rates</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-dark mb-1">Quality Guarantee</h3>
                  <p className="text-dark-light">100% satisfaction guarantee on all translations</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-dark mb-1">Confidentiality</h3>
                  <p className="text-dark-light">Your documents are handled with strict confidentiality</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-dark mb-1">24/7 Support</h3>
                  <p className="text-dark-light">Round-the-clock customer support for your convenience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-dark-light mb-8">
            Get your free quote today and experience the AZ Global difference
          </p>
          <Link
            href="/quote"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-md transition-colors font-medium text-lg"
          >
            Request Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
