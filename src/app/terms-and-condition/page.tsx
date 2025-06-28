/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roods Terms and Condition',
  description: 'Roods Terms and Condition'
};

export default function TermsAndConditions() {
  return (
    <>
      {/* <Head>
        <title>Terms and Conditions | Roods</title>
        <meta name="description" content="Terms and Conditions for Roods - Learn about our terms of service" />
      </Head> */}

      <div className="min-h-screen bg-white py-8">
        <main className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 font-poppins text-3xl font-bold text-[#134C37]">
              Terms and Conditions
            </h1>
            <p className="mb-8 text-gray-500">Effective Date: April 15, 2025</p>

            <div className="prose prose-green max-w-none">
              <p className="text-gray-700">
                Welcome to <strong>Roods</strong>! These Terms and Conditions
                govern your use of the Roods website and services. By accessing
                or using our platform, you agree to be bound by these terms.
              </p>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-[#134C37]">
                  1. Acceptance of Terms
                </h2>
                <p className="text-gray-700">
                  By accessing or using Roods, you agree to be bound by these
                  Terms and Conditions, our Privacy Policy, and any additional
                  terms and conditions that may apply to specific sections of
                  our website or services. If you do not agree with these terms,
                  please do not use our platform.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-[#134C37]">
                  2. User Accounts
                </h2>
                <ul className="list-disc space-y-2 pl-6 text-gray-700">
                  <li>
                    You may need to create an account to access certain features
                    of Roods.
                  </li>
                  <li>
                    You are responsible for maintaining the confidentiality of
                    your account credentials.
                  </li>
                  <li>
                    You are responsible for all activities that occur under your
                    account.
                  </li>
                  <li>
                    You must provide accurate and complete information when
                    creating an account.
                  </li>
                  <li>
                    We reserve the right to terminate accounts that violate our
                    terms or policies.
                  </li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-[#134C37]">
                  3. User Content
                </h2>
                <p className="text-gray-700">
                  When you create or share content on Roods, such as stories or
                  custom routes:
                </p>
                <ul className="list-disc space-y-2 pl-6 text-gray-700">
                  <li>You retain ownership of your original content.</li>
                  <li>
                    You grant Roods a non-exclusive, worldwide, royalty-free
                    license to use, reproduce, modify, adapt, publish, and
                    display such content in connection with our services.
                  </li>
                  <li>
                    You represent that you own or have the necessary rights to
                    the content you share.
                  </li>
                  <li>
                    You agree not to post content that is illegal, harmful,
                    threatening, abusive, harassing, defamatory, or otherwise
                    objectionable.
                  </li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-[#134C37]">
                  4. Prohibited Activities
                </h2>
                <p className="text-gray-700">You agree not to:</p>
                <ul className="list-disc space-y-2 pl-6 text-gray-700">
                  <li>
                    Use Roods for any illegal purpose or in violation of any
                    laws.
                  </li>
                  <li>
                    Interfere with or disrupt the integrity or performance of
                    Roods.
                  </li>
                  <li>
                    Attempt to gain unauthorized access to any part of our
                    platform.
                  </li>
                  <li>
                    Use automated means or scripts to access or scrape data from
                    Roods.
                  </li>
                  <li>Impersonate another person or entity.</li>
                  <li>
                    Collect or harvest any personally identifiable information
                    from other users.
                  </li>
                  <li>
                    Use Roods to transmit any malware, viruses, or harmful code.
                  </li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-[#134C37]">
                  5. Intellectual Property
                </h2>
                <p className="text-gray-700">
                  Roods and its original content, features, and functionality
                  are owned by Roods and are protected by international
                  copyright, trademark, patent, trade secret, and other
                  intellectual property laws.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-[#134C37]">
                  6. Location-Based Services
                </h2>
                <p className="text-gray-700">
                  Roods offers location-based services that:
                </p>
                <ul className="list-disc space-y-2 pl-6 text-gray-700">
                  <li>
                    Require access to your real-time location while using the
                    website.
                  </li>
                  <li>
                    May provide information about nearby places that may not be
                    completely accurate or up-to-date.
                  </li>
                  <li>
                    Should be used responsibly and not relied upon exclusively
                    for navigation or safety.
                  </li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-[#134C37]">
                  7. Disclaimer of Warranties
                </h2>
                <p className="text-gray-700">
                  Roods is provided "as is" and "as available" without any
                  warranties of any kind, either express or implied. We do not
                  guarantee that our platform will be uninterrupted, secure, or
                  error-free.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-[#134C37]">
                  8. Limitation of Liability
                </h2>
                <p className="text-gray-700">
                  To the maximum extent permitted by law, Roods shall not be
                  liable for any indirect, incidental, special, consequential,
                  or punitive damages resulting from your use of or inability to
                  use our platform.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-[#134C37]">
                  9. Indemnification
                </h2>
                <p className="text-gray-700">
                  You agree to indemnify and hold Roods harmless from any
                  claims, damages, liabilities, costs, or expenses (including
                  attorney fees) arising from your use of our platform or
                  violation of these terms.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-[#134C37]">
                  10. Governing Law
                </h2>
                <p className="text-gray-700">
                  These Terms and Conditions are governed by and construed in
                  accordance with the laws of [Your Jurisdiction], without
                  regard to its conflict of law principles.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-[#134C37]">
                  11. Changes to Terms
                </h2>
                <p className="text-gray-700">
                  We reserve the right to modify or replace these Terms at any
                  time. It is your responsibility to review these Terms
                  periodically for changes. Your continued use of Roods
                  following the posting of any changes constitutes acceptance of
                  those changes.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-[#134C37]">
                  12. Contact Us
                </h2>
                <p className="text-gray-700">
                  If you have any questions about these Terms and Conditions,
                  please contact us at:
                </p>
                <p className="mt-2 text-gray-700">
                  <a
                    href="mailto:support@roods.com"
                    className="text-[#134C37] hover:underline"
                  >
                    support@roods.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
