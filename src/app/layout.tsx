import { Metadata } from 'next';
import { Poppins, Nunito } from 'next/font/google';
import { Providers } from '@/components/providers';

import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

import './globals.css';

export const metadata: Metadata = {
  title: 'Roods',
  description: 'Roods'
};
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap'
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nunito',
  display: 'swap'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className={`${poppins.variable} ${nunito.variable}`}
      suppressHydrationWarning
    >
      <body className="">
        <Providers>
          <div className="min-h-screen overflow-hidden bg-gray-100">
            <div className="mx-auto overflow-hidden bg-white font-poppins shadow-lg md:max-w-[414px]">
              <NextIntlClientProvider>{children}</NextIntlClientProvider>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
