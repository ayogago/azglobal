import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | AZ Global Translations',
  description: 'Privacy Policy for AZ Global Translations. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-white py-16 md:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-dark-light">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">1. Introduction</h2>
                <p className="text-dark-light leading-relaxed">
                  AZ Global Translations ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our translation services and visit our website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">2. Information We Collect</h2>
                <p className="text-dark-light leading-relaxed mb-3">
                  We may collect the following types of information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-dark-light">
                  <li><strong>Personal Information:</strong> Name, email address, phone number, billing address, and payment information.</li>
                  <li><strong>Documents:</strong> Files and documents you submit for translation services.</li>
                  <li><strong>Usage Data:</strong> Information about how you access and use our website, including IP address, browser type, pages visited, and time spent on pages.</li>
                  <li><strong>Communication Data:</strong> Records of your communications with us, including emails, chat messages, and phone calls.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">3. How We Use Your Information</h2>
                <p className="text-dark-light leading-relaxed mb-3">
                  We use the collected information for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-dark-light">
                  <li>To provide, maintain, and improve our translation services</li>
                  <li>To process your transactions and send you related information</li>
                  <li>To respond to your inquiries and provide customer support</li>
                  <li>To send you technical notices, updates, and administrative messages</li>
                  <li>To communicate with you about services, offers, and promotions</li>
                  <li>To monitor and analyze usage patterns and trends</li>
                  <li>To detect, prevent, and address technical issues and fraudulent activity</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-dark-light leading-relaxed mb-3">
                  We do not sell your personal information. We may share your information in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-dark-light">
                  <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf, such as payment processing and data analysis.</li>
                  <li><strong>Professional Translators:</strong> With certified translators who work with us to complete your translation projects, under strict confidentiality agreements.</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, property, or safety.</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition of all or part of our business.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">5. Data Security</h2>
                <p className="text-dark-light leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">6. Data Retention</h2>
                <p className="text-dark-light leading-relaxed">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Your translated documents are typically retained for a period of 90 days after project completion, unless you request earlier deletion.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">7. Your Rights</h2>
                <p className="text-dark-light leading-relaxed mb-3">
                  Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-dark-light">
                  <li>Access, correct, or delete your personal information</li>
                  <li>Object to or restrict the processing of your information</li>
                  <li>Request data portability</li>
                  <li>Withdraw consent at any time (where processing is based on consent)</li>
                  <li>Lodge a complaint with a supervisory authority</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">8. Cookies and Tracking Technologies</h2>
                <p className="text-dark-light leading-relaxed">
                  We use cookies and similar tracking technologies to collect and track information about your activities on our website. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">9. Children's Privacy</h2>
                <p className="text-dark-light leading-relaxed">
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you become aware that a child has provided us with personal information, please contact us, and we will take steps to delete such information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">10. Changes to This Privacy Policy</h2>
                <p className="text-dark-light leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">11. Contact Us</h2>
                <p className="text-dark-light leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                  <p className="text-dark-light"><strong>Email:</strong> info@azglobaltranslations.com</p>
                  <p className="text-dark-light"><strong>Phone:</strong> +1 (747) 895-4845</p>
                  <p className="text-dark-light"><strong>Address:</strong> Los Angeles, CA USA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
