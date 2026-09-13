import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Terms and Conditions',
  description: 'Terms and Conditions for AZ Global Translations. Read our terms of service and usage policies.',
  path: '/terms-and-conditions',
});

export default function TermsAndConditionsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-white py-16 md:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-4">
              Terms and Conditions
            </h1>
            <p className="text-lg text-dark-light">
              Last Updated: September 11, 2026
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
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">1. Acceptance of Terms</h2>
                <p className="text-dark-light leading-relaxed">
                  By accessing and using the services provided by AZ Global Translations (“Company,” “we,” “our,” or “us”), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">2. Services Description</h2>
                <p className="text-dark-light leading-relaxed">
                  AZ Global Translations provides professional translation services, including but not limited to certified translations, document translations, legal translations, and business translations. We translate documents between English and Armenian, Russian and Ukrainian with professional accuracy and certification where applicable.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">3. Pricing and Payment</h2>
                <ul className="list-disc pl-6 space-y-2 text-dark-light">
                  <li>Pricing is quoted individually for each request, based on the documents submitted and the services requested.</li>
                  <li>Quotes are provided upon document submission and remain valid for 30 days.</li>
                  <li>Payment is due in full before the translated document is delivered.</li>
                  <li>Accepted payment methods will be confirmed with your quote.</li>
                  <li>All prices are in USD unless otherwise stated.</li>
                  <li>Prices do not include applicable taxes, which will be added to your invoice.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">4. Delivery Times</h2>
                <p className="text-dark-light leading-relaxed mb-3">
                  Standard delivery is 12–48 hours from the time your quote is approved and payment is confirmed. Delivery times may vary based on:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-dark-light">
                  <li>Document length and complexity</li>
                  <li>Language pair</li>
                  <li>Certification requirements</li>
                  <li>Rush service requests (additional fees apply)</li>
                </ul>
                <p className="text-dark-light leading-relaxed mt-3">
                  We will notify you if we cannot meet the estimated delivery time.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">5. Client Responsibilities</h2>
                <ul className="list-disc pl-6 space-y-2 text-dark-light">
                  <li>Provide clear, legible documents for translation</li>
                  <li>Specify the target language and any special requirements</li>
                  <li>Provide accurate contact and billing information</li>
                  <li>Review translated documents promptly upon delivery</li>
                  <li>Ensure you have the right to share and translate the submitted documents</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">6. Quality Guarantee</h2>
                <p className="text-dark-light leading-relaxed">
                  We guarantee high-quality professional translations. If you find any errors or inaccuracies, we will revise the translation free of charge within 7 days of delivery. Revisions must be requested in writing with specific details about the errors.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">7. Refund Policy</h2>
                <ul className="list-disc pl-6 space-y-2 text-dark-light">
                  <li>Full refunds are available if we cannot complete your project</li>
                  <li>If you cancel before work begins, a full refund will be issued</li>
                  <li>If you cancel after work has started, a partial refund may be issued based on work completed</li>
                  <li>No refunds are provided once the final translated document has been delivered and accepted</li>
                  <li>Refund requests must be submitted in writing within 7 days of payment</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">8. Confidentiality</h2>
                <p className="text-dark-light leading-relaxed">
                  We treat all client documents and information with strict confidentiality. Our translators and staff are bound by confidentiality agreements. We do not share, sell, or distribute your documents or personal information to third parties except as necessary to complete your translation project or as required by law.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">9. Intellectual Property</h2>
                <p className="text-dark-light leading-relaxed">
                  You retain all rights to the original documents you submit. Upon full payment, you own all rights to the translated documents. We retain the right to use anonymized samples of our work for marketing purposes unless you specifically request otherwise in writing.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">10. Limitation of Liability</h2>
                <p className="text-dark-light leading-relaxed">
                  Our liability is limited to the amount paid for the translation service. We are not liable for any indirect, incidental, special, or consequential damages. We do not guarantee that translations will be accepted by any government agency, court, or other institution, although our certified translations meet USCIS requirements.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">11. Certified Translations</h2>
                <p className="text-dark-light leading-relaxed">
                  Certified translations include an official certificate of accuracy signed by a certified translator. These translations are suitable for submission to USCIS, courts, universities, and other official institutions. Additional notarization services are available upon request for an additional fee.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">12. Prohibited Uses</h2>
                <p className="text-dark-light leading-relaxed mb-3">
                  You agree not to use our services for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-dark-light">
                  <li>Any illegal or fraudulent purpose</li>
                  <li>Translating copyrighted material without proper authorization</li>
                  <li>Creating false or misleading documents</li>
                  <li>Any activity that violates applicable laws or regulations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">13. Modifications to Terms</h2>
                <p className="text-dark-light leading-relaxed">
                  We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes are posted constitutes acceptance of the modified terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">14. Governing Law</h2>
                <p className="text-dark-light leading-relaxed">
                  These Terms and Conditions are governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">15. Dispute Resolution</h2>
                <p className="text-dark-light leading-relaxed">
                  Any disputes arising from these terms or our services shall be resolved through binding arbitration in Los Angeles, California. Both parties agree to waive the right to a jury trial.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-dark mb-4">16. Contact Information</h2>
                <p className="text-dark-light leading-relaxed">
                  If you have any questions about these Terms and Conditions, please contact us:
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
