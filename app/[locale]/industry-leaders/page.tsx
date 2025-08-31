import IndustryLeadersTable from "./IndustryLeadersTable"
import { getIndustryLeaders } from "@/lib/data"
import { Metadata } from 'next';
import { getTranslations } from "next-intl/server";

// 页面级缓存配置
export const revalidate = 43200; // 12小时
export const dynamic = 'force-cache';

export const metadata: Metadata = {
  title: 'Top 1000 Industry Leaders - Best Websites in Gaming & Tools',
  description: 'Find the top 1000 industry leaders in gaming, tools, and more. Discover the best-performing websites driving trends and innovation in your favorite industries!',
};


export default async function IndustryLeaders() {
  const t = await getTranslations('industryLeaders');
  const initialData = await getIndustryLeaders();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold my-2 text-center">{t('heroTitle')}</h1>
      <p className="text-gray-600 mb-2 text-center">{t('heroDescription')}</p>

      <IndustryLeadersTable initialData={initialData} />
    </div>
  )
}