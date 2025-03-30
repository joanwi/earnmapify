import TopPidTable from "./TopPidTable"
import { getTopPaidSites } from "@/lib/data"
import RevenueCalculator from "./RevenueCalculator"
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Top Paid Sites - High-Traffic Websites on PayPal & Stripe',
  description: 'Explore top paid sites with the highest traffic on platforms like PayPal and Stripe. Discover high-revenue websites with the best payment data now!',
};

export default async function TopPaidSites() {
  const initialData = await getTopPaidSites();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold mb-2">Top Paid Sites</h1>
      <p className="text-gray-600 mb-2">Discover high-traffic websites in payment platforms like PayPal and Stripe</p>

      <RevenueCalculator />

      <TopPidTable initialData={initialData} />
    </div>
  )
}