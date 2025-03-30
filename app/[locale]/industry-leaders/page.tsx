import IndustryLeadersTable from "./IndustryLeadersTable"
import { getIndustryLeaders } from "@/lib/data"
import ADCalculator from "./ADCalculator";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Top 1000 Industry Leaders - Best Websites in Gaming & Tools',
  description: 'Find the top 1000 industry leaders in gaming, tools, and more. Discover the best-performing websites driving trends and innovation in your favorite industries!',
};


export default async function IndustryLeaders() {
  const initialData = await getIndustryLeaders();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold my-2 text-center">Industry Leaders</h1>
      <p className="text-gray-600 mb-2 text-center">Discover top performing websites in games and tools categories</p>

      <ADCalculator />

      <IndustryLeadersTable initialData={initialData} />
    </div>
  )
}