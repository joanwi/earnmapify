import type { PlatformSubs } from "@/lib/types"
import PlatformSubsTable from "./components/PlatformSubsTable"
import { getPlatformData } from "@/lib/data"

export default async function Home() {

  const initialData = await getPlatformData();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Platform Subdomains</h1>
      <p className="text-gray-600 mb-6">Discover high-traffic subdomains across popular hosting platforms</p>
      <PlatformSubsTable initialData={initialData} />
    </div>
  )
}