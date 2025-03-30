import TopPidTable from "./TopPidTable"
import { getTopPaidSites } from "@/lib/data"
import RevenueCalculator from "./RevenueCalculator"
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Top Paid Sites',
  description: 'Discover high-traffic websites in payment platforms like PayPal and Stripe',
};

export default async function TopPaidSites() {
  const initialData = await getTopPaidSites();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <RevenueCalculator />
      
      <h1 className="text-3xl font-bold mb-2">Top Paid Sites</h1>
      <p className="text-gray-600 mb-6">Discover high-traffic websites in payment platforms like PayPal and Stripe</p>
    
      <TopPidTable initialData={initialData} />
    </div>
  )
}