import { Metadata } from 'next';
import { FileText, Shield, Globe, Languages, GraduationCap, Briefcase, Heart, Building } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Translation Services | AZ Global Translations',
  description: 'Professional translation services including certified, legal, business, and document translation in Armenian, English, French, Russian, Spanish, and Ukrainian.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Translation Services | AZ Global Translations',
    description: 'Professional translation services including certified, legal, business, and document translation in Armenian, English, French, Russian, Spanish, and Ukrainian.',
    url: 'https://azglobaltranslations.com/services',
    type: 'website',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Translation Services | AZ Global Translations',
    description: 'Professional translation services including certified, legal, business, and document translation.',
    images: ['/logo.png'],
  },
};

export default function ServicesPage() {
  const services = [
    {
      icon: FileText,
      title: 'Certified Translation',
      description: 'Official certified translations accepted by USCIS, courts, universities, and government agencies worldwide. Our certified translations include a signed statement of accuracy and translator credentials.',
      features: [
        'USCIS accepted translations',
        'Court-ready documents',
        'Notarization available',
        'Official certification stamp',
      ],
    },
    {
      icon: Shield,
      title: 'Legal Translation',
      description: 'Specialized legal translation services for contracts, agreements, court documents, and legal correspondence. Our legal translators have expertise in legal terminology and procedures.',
      features: [
        'Contracts & agreements',
        'Court documents',
        'Legal correspondence',
        'Patent translation',
      ],
    },
    {
      icon: Briefcase,
      title: 'Business Translation',
      description: 'Professional business translation for corporate documents, marketing materials, websites, and presentations. Help your business communicate effectively across borders.',
      features: [
        'Marketing materials',
        'Corporate documents',
        'Website localization',
        'Business presentations',
      ],
    },
    {
      icon: GraduationCap,
      title: 'Academic Translation',
      description: 'Expert translation of academic documents including diplomas, transcripts, certificates, and research papers. Perfect for university applications and credential evaluation.',
      features: [
        'Diplomas & degrees',
        'Academic transcripts',
        'Research papers',
        'Certificates',
      ],
    },
    {
      icon: Heart,
      title: 'Medical Translation',
      description: 'Accurate medical translation services for medical records, prescriptions, and healthcare documents. Our translators understand medical terminology and healthcare standards.',
      features: [
        'Medical records',
        'Prescriptions',
        'Healthcare documents',
        'Clinical trial materials',
      ],
    },
    {
      icon: Building,
      title: 'Immigration Translation',
      description: 'Comprehensive immigration document translation services. We translate birth certificates, marriage certificates, police records, and all documents required for immigration applications.',
      features: [
        'Birth certificates',
        'Marriage certificates',
        'Police records',
        'Immigration forms',
      ],
    },
    {
      icon: Languages,
      title: 'Technical Translation',
      description: 'Technical translation services for manuals, specifications, and engineering documents. Our technical translators have industry-specific knowledge and expertise.',
      features: [
        'User manuals',
        'Technical specifications',
        'Engineering documents',
        'Software localization',
      ],
    },
    {
      icon: Globe,
      title: 'Website Translation',
      description: 'Complete website translation and localization services. Reach global audiences by translating your website content while maintaining cultural relevance and SEO optimization.',
      features: [
        'Content translation',
        'SEO optimization',
        'Cultural adaptation',
        'Multilingual support',
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-white py-16 md:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-4">
              Our Translation Services
            </h1>
            <p className="text-xl text-dark-light">
              Professional translation services in Armenian, Russian, Spanish, French, Ukrainian, and English. Fast, accurate, and certified.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 p-8 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-heading font-semibold mb-3">{service.title}</h3>
                      <p className="text-dark-light mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-dark-light">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
              How It Works
            </h2>
            <p className="text-lg text-dark-light">
              Simple, fast, and efficient translation process
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Submit Document</h3>
              <p className="text-dark-light">Send us your document via email or upload form</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Get Quote</h3>
              <p className="text-dark-light">Receive a free quote within minutes</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Translation</h3>
              <p className="text-dark-light">Our certified translators work on your document</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Delivery</h3>
              <p className="text-dark-light">Receive your certified translation quickly</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Get your free quote today and experience professional translation services
          </p>
          <Link
            href="/quote"
            className="inline-block bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-md transition-colors font-medium text-lg"
          >
            Request Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
