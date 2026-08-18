import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Clock, Globe, Shield, Award, FileText, Languages, Zap, ArrowRight, DollarSign, Users, TrendingUp, MessageCircle, Star } from 'lucide-react';

export default function Home() {
  const languages = [
    { name: 'Armenian', flagUrl: 'https://flagcdn.com/w160/am.png', code: 'hy' },
    { name: 'Russian', flagUrl: 'https://flagcdn.com/w160/ru.png', code: 'ru' },
    { name: 'English', flagUrl: 'https://flagcdn.com/w160/us.png', code: 'en' },
    { name: 'Ukrainian', flagUrl: 'https://flagcdn.com/w160/ua.png', code: 'uk' },
    { name: 'French', flagUrl: 'https://flagcdn.com/w160/fr.png', code: 'fr' },
    { name: 'Spanish', flagUrl: 'https://flagcdn.com/w160/es.png', code: 'es' },
  ];

  const services = [
    {
      icon: FileText,
      title: 'Certified Translation',
      description: 'USCIS-accepted certified translations with official stamp and signature.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
    },
    {
      icon: Shield,
      title: 'Legal Documents',
      description: 'Court-ready legal translations for contracts, agreements, and more.',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop',
    },
    {
      icon: Globe,
      title: 'Business Translation',
      description: 'Professional business document translation for global operations.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    },
    {
      icon: Award,
      title: 'Academic Documents',
      description: 'Certified translation of diplomas, transcripts, and certificates.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Documents Translated', icon: FileText },
    { number: '1000+', label: 'Happy Clients', icon: Users },
    { number: '12-48h', label: 'Average Turnaround', icon: Clock },
  ];

  return (
    <>
      {/* Hero Section with Background Image */}
      <section className="relative bg-dark text-white py-16 md:py-20 lg:py-24 overflow-hidden">
        {/* Background with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-dark/90 to-dark/95"></div>
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Content */}
              <div className="lg:col-span-7 text-center lg:text-left">
                {/* Trust Badge */}
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                    <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                    <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                    <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                    <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                  </div>
                  <span className="text-sm font-semibold">Trusted by 1000+ Clients</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold mb-6 leading-tight">
                  Professional Translation
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                    In 12-48 Hours
                  </span>
                </h1>

                <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
                  USCIS-accepted certified translations starting at just <span className="font-bold text-white text-2xl">$0.10/word</span>.
                  Fast, accurate, and guaranteed to meet your deadlines.
                </p>

                {/* Key Benefits */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span>USCIS Accepted</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span>Certified Experts</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                  <Link
                    href="/quote"
                    className="group relative bg-white text-primary hover:bg-gray-50 px-8 py-4 rounded-xl transition-all font-bold text-lg inline-flex items-center justify-center shadow-2xl hover:shadow-white/20 transform hover:-translate-y-1 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Order Translation Now
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-white/10 backdrop-blur-md border-2 border-white/50 text-white hover:bg-white hover:text-primary px-8 py-4 rounded-xl transition-all font-bold text-lg inline-flex items-center justify-center hover:shadow-lg"
                  >
                    Contact Us
                  </Link>
                </div>

                {/* Social Proof */}
                <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-white/80">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span className="font-semibold">1000+ Clients</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span className="font-semibold">10,000+ Documents</span>
                  </div>
                </div>
              </div>

              {/* Right Content - Pricing Card */}
              <div className="lg:col-span-5 relative">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    LIMITED TIME
                  </div>

                  <h3 className="text-2xl font-heading font-bold mb-6 text-white">Get Instant Quote</h3>

                  <div className="space-y-4 mb-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80">Starting Price</span>
                        <span className="text-3xl font-bold text-white">$0.10</span>
                      </div>
                      <p className="text-sm text-white/70">per word</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-white/90">
                        <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                        <span className="text-sm">Certified translation included</span>
                      </div>
                      <div className="flex items-center space-x-3 text-white/90">
                        <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                        <span className="text-sm">Official stamp & signature</span>
                      </div>
                      <div className="flex items-center space-x-3 text-white/90">
                        <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                        <span className="text-sm">12-48 hour delivery</span>
                      </div>
                      <div className="flex items-center space-x-3 text-white/90">
                        <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                        <span className="text-sm">Quality guarantee</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/quote"
                    className="block w-full bg-gradient-to-r from-white to-blue-50 text-primary hover:from-blue-50 hover:to-white px-6 py-4 rounded-xl transition-all font-bold text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Calculate Your Price →
                  </Link>

                  <p className="text-center text-xs text-white/60 mt-4">
                    No credit card required • Instant quote
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 md:h-16" viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 48H1440V0C1440 0 1140 48 720 48C300 48 0 0 0 0V48Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Section with Background Image */}
      <section className="relative py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-dark mb-2">{stat.number}</div>
                  <div className="text-dark-light font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section with Image */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
                alt="Team collaboration"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-6">
                Your Trusted Translation Partner
              </h2>
              <p className="text-lg text-dark-light mb-6">
                At AZ Global Translations, we combine cutting-edge technology with expert human translators to deliver accurate, certified translations that meet the highest standards.
              </p>
              <p className="text-lg text-dark-light mb-8">
                Our team of certified professionals specializes in legal, business, and academic translations across 6 major languages, ensuring your documents are handled with precision and care.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-dark">Fast 12-48h turnaround</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-dark">USCIS accepted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-dark">Quality guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-dark">24/7 customer support</span>
                </div>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center text-primary hover:text-primary-dark font-semibold text-lg"
              >
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Images */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
              Our Translation Services
            </h2>
            <p className="text-lg text-dark-light max-w-2xl mx-auto">
              Professional certified translations for all your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-primary hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-semibold mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-dark-light">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
              Languages We Translate
            </h2>
            <p className="text-lg text-dark-light max-w-2xl mx-auto">
              Expert translation services between 6 major languages
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {languages.map((language, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center group hover:-translate-y-1"
              >
                <div className="mb-3 flex justify-center">
                  <Image
                    src={language.flagUrl}
                    alt={`${language.name} flag`}
                    width={80}
                    height={60}
                    loading="lazy"
                    className="rounded shadow-sm"
                  />
                </div>
                <h3 className="font-semibold text-dark group-hover:text-primary transition-colors">
                  {language.name}
                </h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center text-primary hover:text-primary-dark font-semibold"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works with Images */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
              How It Works
            </h2>
            <p className="text-lg text-dark-light max-w-2xl mx-auto">
              Get your documents translated in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="relative h-64 mb-6 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop"
                  alt="Upload document"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold text-dark mb-3">Upload Your Document</h3>
              <p className="text-dark-light">Send us your file through our secure portal in any format</p>
            </div>

            <div className="text-center">
              <div className="relative h-64 mb-6 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop"
                  alt="Get instant quote"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold text-dark mb-3">Get Instant Quote</h3>
              <p className="text-dark-light">Receive transparent pricing within minutes - only $0.10/word</p>
            </div>

            <div className="text-center">
              <div className="relative h-64 mb-6 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop"
                  alt="Receive translation"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold text-dark mb-3">Receive Translation</h3>
              <p className="text-dark-light">Get your certified translation delivered in 12-48 hours</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/quote"
              className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Order Translation Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA with Background Image */}
      <section className="relative py-24 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&h=600&fit=crop"
            alt="Professional team"
            fill
            sizes="100vw"
            loading="lazy"
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark"></div>
        </div>

        <div className="container-custom text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Ready to Get Your Documents Translated?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Starting at just $0.10 per word • 12-48 Hour Delivery • USCIS Accepted
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg transition-all font-bold text-lg inline-flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              Order Translation Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg transition-all font-bold text-lg inline-flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
