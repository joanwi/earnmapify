import PlatformSubsTable from "./PlatformSubsTable"
import { getPlatformData } from "@/lib/data"
import { Metadata } from 'next';
import { getTranslations } from "next-intl/server";

// 页面级缓存配置
export const revalidate = 43200; // 12小时
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Top Platform Subs - High-Traffic Subdomains on GitHub & Vercel',
  description: 'Discover top platform subs on GitHub and Vercel driving high traffic. Unlock the best subdomains for growth and engagement in your next project!',
};  

export default async function TopPlatformSubs() {
  const t = await getTranslations('platformSubs');
  const initialData = await getPlatformData();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold my-2 text-center">{t('heroTitle')}</h1>
      <p className="text-gray-600 mb-2 text-center">{t('heroDescription')}</p>
      <PlatformSubsTable initialData={initialData} />
    </div>
  )
}