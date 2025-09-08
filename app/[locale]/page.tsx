import { Link } from '@/i18n/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import TopPidTable from "./top-paid-sites/TopPidTable";
import PlatformSubsTable from "./top-platform-subs/PlatformSubsTable";
import IndustryLeadersTable from "./industry-leaders/IndustryLeadersTable";   
import { getTopPaidSites, getPlatformData, getIndustryLeaders } from "@/lib/data";

// 页面级缓存配置 - Next.js 会自动设置相应的缓存头
export const revalidate = 43200; // 12小时重新验证，会设置 Cache-Control 头
export const dynamic = 'force-dynamic'; // 动态路由需要动态渲染

export default async function HomePage() {
  const t = await getTranslations();
  const currentLocale = await getLocale();

  const [moneySites, platformSubs, industryLeaders] = await Promise.all([
    getTopPaidSites(),
    getPlatformData(),
    getIndustryLeaders()
  ]);

  const sections = [
    {
      id: 'top-paid-sites',
      title: t('nav.topPaidSites'),
      description: t('home.paidSitesDescription'),
      path: '/top-paid-sites',
      icon: (
        <svg className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'platform-subsites',
      title: t('nav.topPlatformSubs'),
      description: t('home.platformDescription'),
      path: '/top-platform-subs',
      icon: (
        <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      id: 'industry-leaders',
      title: t('nav.industryLeaders'),
      description: t('home.industryDescription'),
      path: '/industry-leaders',
      icon: (
        <svg className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="mb-4 bg-gradient-to-br from-blue-50 to-indigo-100 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
            {t('home.heroTitle')}
          </h1>
          <p className="mt-3 max-w-3xl mx-auto text-lg text-gray-500 sm:text-xl">
            {t('home.heroDescription')}
          </p>
        </div>
      </div>

      {/* Section cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-28">
        <div className="grid grid-cols-1 gap-8">
          {sections.map((section) => (
            <div key={section.id} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* 左侧卡片 */}
              <Link href={section.path} className="lg:col-span-1">
                <div className="group relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 h-[400px]">
                  <div className="p-8">
                    <div className="flex justify-center">
                      {section.icon}
                    </div>
                    <div className="mt-6 text-center">
                      <h3 className="text-xl font-medium text-gray-900">{section.title}</h3>
                      <p className="mt-4 text-base text-gray-500">{section.description}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
                        {t('home.viewAll')}
                      </span>
                      <svg className="ml-1 h-5 w-5 text-blue-600 group-hover:text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>

              {/* 右侧数据预览 */}
              <div className="lg:col-span-3 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h4 className="text-lg font-medium text-gray-900">{t('home.latestData')}</h4>
                  <Link 
                      href={section.path}
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    {t('home.viewFullPage')}
                    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
                <div className="h-[352px] overflow-y-auto">
                  {section.id === 'top-paid-sites' && <TopPidTable initialData={moneySites} />}
                  {section.id === 'platform-subsites' && <PlatformSubsTable initialData={platformSubs} />}
                  {section.id === 'industry-leaders' && <IndustryLeadersTable initialData={industryLeaders} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 