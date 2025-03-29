import IndustryLeadersTable from "./IndustryLeadersTable"
import { getIndustryLeaders } from "@/lib/data"
import RevenueCalculator from "./RevenueCalculator"

export default async function Home() {
  const initialData = await getIndustryLeaders();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <RevenueCalculator />
      
      <h1 className="text-3xl font-bold mb-2">Industry Leaders</h1>
      <p className="text-gray-600 mb-6">Discover top performing websites in games and tools categories</p>
      
      <IndustryLeadersTable initialData={initialData} />
    </div>
  )
}