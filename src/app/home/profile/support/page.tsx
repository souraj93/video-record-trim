'use client';
import PageContainer from '@/components/layout/page-container';
import Link from 'next/link';
import MobileHeader from '../../_components/mobile-header';
import { Mail, Phone, HelpCircle } from 'lucide-react';
import { useConfig } from '@/hooks/config/use-config';
import { useTranslations } from 'next-intl';

export default function AccountSupportPage() {
  const { data: configData, isPending } = useConfig();
  console.log('configData', configData?.data);

  const t = useTranslations();

  const countryCode = configData?.data.supportContactNo.countryCode;
  const phoneNumber = configData?.data.supportContactNo.number;
  const email = configData?.data.supportEmail;

  return (
    <PageContainer>
      <div className="flex flex-col bg-white p-4">
        <MobileHeader
          title={t('helpAndSupport')}
          backHref="/home/profile"
          variant="simple"
        />

        <div className=" space-y-6 py-6">
          <div className="mb-4 text-center">
            <h2 className="mb-2 text-xl font-semibold text-main">
              Need assistance?
            </h2>
            <p className="text-sm text-gray-600">
              Our support team is ready to help you
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start rounded-lg border p-4">
              <Mail className="mr-3 mt-0.5 flex-shrink-0 text-main" size={20} />
              <div>
                <h3 className="text-sm font-medium">Email Support</h3>
                <p className="mb-1 text-xs text-gray-600">
                  Response within 24 hours
                </p>
                <a
                  href={`mailto:${email}`}
                  className="text-sm font-medium text-main"
                >
                  {email}
                </a>
              </div>
            </div>

            <div className="flex items-start rounded-lg border p-4">
              <Phone
                className="mr-3 mt-0.5 flex-shrink-0 text-main"
                size={20}
              />
              <div>
                <h3 className="text-sm font-medium">Call Support</h3>
                <p className="mb-1 text-xs text-gray-600">Mon-Fri, 9am-5pm</p>
                <a
                  href="tel:+18005551234"
                  className="text-sm font-medium text-main"
                >
                  {countryCode} {phoneNumber}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Service hours: Monday-Friday, 9:00 AM - 5:00 PM EST
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
