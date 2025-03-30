import PlatformSubsTable from "./PlatformSubsTable"
import { getPlatformData } from "@/lib/data"
import ADCalculator from "../industry-leaders/ADCalculator"
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Top Platform Subs - High-Traffic Subdomains on GitHub & Vercel',
  description: 'Discover top platform subs on GitHub and Vercel driving high traffic. Unlock the best subdomains for growth and engagement in your next project!',
};  

export default async function TopPlatformSubs() {

  const initialData = await getPlatformData();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold my-2 text-center">Top Platform Subdomains</h1>
      <p className="text-gray-600 mb-2 text-center">Discover high-traffic subdomains across popular hosting platforms</p>
      <ADCalculator />
      <PlatformSubsTable initialData={initialData} />
    </div>
  )
}