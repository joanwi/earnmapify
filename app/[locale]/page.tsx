'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations();
  const currentLocale = useLocale();

  // Helper function to generate correct localized URLs
  const getLocalizedPath = (path: string) => {
    return currentLocale === 'en' ? path : `/${currentLocale}${path}`;
  };

  const sections = [
    {
      id: 'money-making-sites',
      title: t('moneyMakingSites.title'),
      description: t('moneyMakingSites.description'),
      path: '/top-paid-sites',
      icon: (
        <svg className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'platform-subsites',
      title: t('platformSubsites.title'),
      description: t('platformSubsites.description'),
      path: '/top-platform-subs',
      icon: (
        <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      id: 'industry-leaders',
      title: t('categorySites.title'),
      description: t('categorySites.description'),
      path: '/industry-leaders',
      icon: (
        <svg className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
    {
      id: 'info-sites',
      title: t('infoSites.title'),
      description: t('infoSites.description'),
      path: '/info-sites',
      icon: (
        <svg className="h-10 w-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100" aria-hidden="true" />
        <div className="relative pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                {t('home.title')}
              </h1>
              <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                {t('home.subtitle')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <Link key={section.id} href={getLocalizedPath(section.path)}>
              <div className="group relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex justify-center">
                    {section.icon}
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                    <p className="mt-2 text-sm text-gray-500 line-clamp-3">{section.description}</p>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
                      {t('common.viewAll')}
                    </span>
                    <svg className="ml-1 h-5 w-5 text-blue-600 group-hover:text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent updates section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('home.recentUpdates')}</h2>
          <div className="bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex items-center">
                <svg className="h-8 w-8 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {t('common.updatedOn')}: {new Date().toLocaleDateString(currentLocale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t('moneyMakingSites.title')} & {t('categorySites.title')} {t('common.updatedOn').toLowerCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 