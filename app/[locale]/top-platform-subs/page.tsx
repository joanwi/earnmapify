import PlatformSubsTable from "./PlatformSubsTable"
import { getPlatformData } from "@/lib/data"
import ADCalculator from "../industry-leaders/ADCalculator"
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Top Platform Subdomains',
  description: 'Discover high-traffic subdomains across popular hosting platforms',
};  

export default async function TopPlatformSubs() {

  const initialData = await getPlatformData();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ADCalculator />
      <h1 className="text-3xl font-bold mb-2">Top Platform Subdomains</h1>
      <p className="text-gray-600 mb-6">Discover high-traffic subdomains across popular hosting platforms</p>
      <PlatformSubsTable initialData={initialData} />
    </div>
  )
}