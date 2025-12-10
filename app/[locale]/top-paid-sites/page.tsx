import TopPidTable from "./TopPidTable"
import { getTopPaidSites } from "@/lib/data"
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Top Paid Sites - High-Traffic Websites on PayPal & Stripe',
  description: 'Explore top paid sites with the highest traffic on platforms like PayPal and Stripe. Discover high-revenue websites with the best payment data now!',
};

export default async function TopPaidSites({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('paidSites');
  const initialData = await getTopPaidSites();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold my-2 text-center">{t('heroTitle')}</h1> 
      <p className="text-gray-600 mb-2 text-center">{t('heroDescription')}</p>

      <TopPidTable initialData={initialData} />
    </div>
  )
}