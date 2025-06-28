/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roods Privacy Policy',
  description: 'Roods Privacy Policy'
};

export default function PrivacyPolicy() {
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* <header className="bg-[#134C37] py-4">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-white text-xl font-semibold font-poppins">
                Roods
              </Link>
              <Link href="/" className="text-white hover:text-gray-200 text-sm font-poppins">
                Back to Home
              </Link>
            </div>
          </div>
        </header> */}

        <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 font-poppins text-3xl font-bold text-[#134C37]">
              Privacy Policy
            </h1>
            <p className="mb-8 text-gray-500">Effective Date: April 15, 2025</p>

            <div className="prose prose-green max-w-none">
              <p className="text-gray-700">
                Welcome to <strong>Roods</strong>! Your privacy is important to
                us. This Privacy Policy explains how we collect, use, and
                protect your information when you use our website to explore
                location stories and create custom routes.
              </p>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-[#134C37]">
                  1. Information We Collect
                </h2>

                <h3 className="mb-3 mt-6 text-lg font-medium text-[#134C37]">
                  a. Location Data
                </h3>
                <ul className="list-disc space-y-2 pl-6 text-gray-700">
                  <li>
                    We collect <strong>real-time location data</strong> while
                    you use the website.
                  </li>
                  <li>
                    This allows us to:
                    <ul className="mt-2 list-disc space-y-1 pl-6">
                      <li>Show location-based stories and content.</li>
                      <li>
                        Help you create and share custom routes with others.
                      </li>
                    </ul>
                  </li>
                </ul>
                <p className="mt-3 text-gray-700">
                  <strong>Note</strong>: We do <strong>not</strong> collect your
                  location in the background or when the website is not in use.
                </p>

                <h3 className="mb-3 mt-6 text-lg font-medium text-[#134C37]">
                  b. User-Provided Content
                </h3>
                <ul className="list-disc space-y-2 pl-6 text-gray-700">
                  <li>
                    If you create stories or routes, we may collect:
                    <ul className="mt-2 list-disc space-y-1 pl-6">
                      <li>
                        Titles, descriptions, and other input you provide.
                      </li>
                      <li>Shared location pins or points of interest.</li>
                    </ul>
                  </li>
                </ul>

                <h3 className="mb-3 mt-6 text-lg font-medium text-[#134C37]">
                  c. Device & Usage Data
                </h3>
                <p className="text-gray-700">We may collect:</p>
                <ul className="list-disc space-y-2 pl-6 text-gray-700">
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Time spent on the site</li>
                  <li>Pages visited</li>
                  <li>Cookies (see Section 5)</li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-[#134C37]">
                  2. How We Use Your Information
                </h2>
                <p className="text-gray-700">We use your information to:</p>
                <ul className="list-disc space-y-2 pl-6 text-gray-700">
                  <li>Display stories relevant to your location.</li>
                  <li>Help you create and save or share custom routes.</li>
                  <li>
                    Improve our website's functionality and user experience.
                  </li>
                  <li>
                    Prevent abuse and ensure the security of our platform.
                  </li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-[#134C37]">
                  3. Sharing of Information
                </h2>
                <p className="font-bold text-gray-700">
                  We <span className="underline">do not sell</span> your
                  personal data.
                </p>
                <p className="mt-3 text-gray-700">We may share your data:</p>
                <ul className="list-disc space-y-2 pl-6 text-gray-700">
                  <li>
                    With others if you choose to{' '}
                    <strong>share a custom route</strong> publicly or directly.
                  </li>
                  <li>
                    With trusted third-party services (e.g., for analytics,
                    hosting), under strict confidentiality agreements.
                  </li>
                  <li>
                    If required by law or to enforce our terms of service.
                  </li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-[#134C37]">
                  4. Data Retention
                </h2>
                <ul className="list-disc space-y-2 pl-6 text-gray-700">
                  <li>
                    We only retain your location data{' '}
                    <strong>as long as necessary</strong> for the features
                    you're using.
                  </li>
                  <li>
                    You may request deletion of your stories or routes at any
                    time.
                  </li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-[#134C37]">
                  5. Cookies and Tracking
                </h2>
                <ul className="list-disc space-y-2 pl-6 text-gray-700">
                  <li>
                    We use cookies to remember your preferences and gather usage
                    analytics.
                  </li>
                  <li>
                    You can manage or block cookies through your browser
                    settings.
                  </li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-[#134C37]">
                  6. Your Rights and Choices
                </h2>
                <p className="text-gray-700">
                  Depending on your location, you may have the right to:
                </p>
                <ul className="list-disc space-y-2 pl-6 text-gray-700">
                  <li>Access the personal data we have about you</li>
                  <li>Request corrections or deletions</li>
                  <li>
                    Withdraw consent for location sharing at any time (note:
                    this may disable some features)
                  </li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-[#134C37]">
                  7. Security
                </h2>
                <p className="text-gray-700">
                  We implement reasonable security measures to protect your data
                  from unauthorized access, disclosure, or loss.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-[#134C37]">
                  8. Changes to This Policy
                </h2>
                <p className="text-gray-700">
                  We may update this Privacy Policy from time to time. Changes
                  will be posted on this page with a new effective date.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-[#134C37]">
                  9. Contact Us
                </h2>
                <p className="text-gray-700">
                  If you have any questions or concerns about this Privacy
                  Policy or your data, please contact us at:
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

        {/* <footer className="bg-gray-50 py-8 mt-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm font-poppins">&copy; 2025 Roods. All rights reserved.</p>
              <div className="mt-4 md:mt-0 flex space-x-6">
                <Link href="/terms" className="text-gray-600 hover:text-[#134C37] text-sm font-poppins">
                  Terms of Service
                </Link>
                <Link href="/privacy-policy" className="text-gray-600 hover:text-[#134C37] text-sm font-poppins">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </footer> */}
      </div>
    </>
  );
}
