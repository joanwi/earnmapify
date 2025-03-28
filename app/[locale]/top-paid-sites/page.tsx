import MoneySitesTable from "./MoneySitesTable"
import { getTopPaidSites } from "@/lib/data"

export default async function Home() {
  const initialData = await getTopPaidSites();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Money Making Sites</h1>
      <p className="text-gray-600 mb-6">Discover high-traffic websites in payment platforms like PayPal and Stripe</p>
    
      <MoneySitesTable initialData={initialData} />
    </div>
  )
}