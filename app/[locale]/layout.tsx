import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { locales } from '@/i18n'; 
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../globals.css';

export const metadata: Metadata = {
  title: "Website Traffic & Trends: Top Sites & Insights 2025 - EarnMapify",
  description: "Discover 2025's top website traffic data, trends, and rankings. Analyze PayPal, Stripe, Vercel, GitHub, games, tools, and more with Similarweb insights.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const {locale}=await params;
  
  return (
    <html lang={locale}>
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <NextIntlClientProvider locale={locale}>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 