import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('h1')}</h1>
        
        <div className="prose prose-blue max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            {t('p1')}
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">{t('dataSources.title')}</h2>
          <p className="mb-4">
            {t('dataSources.description')}
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">{t('dataSources.sources.similarweb')}</li>
            <li className="mb-2">{t('dataSources.sources.public')}</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">{t('updateFrequency.title')}</h2>
          <p className="mb-4">
            {t('updateFrequency.description')}
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">{t('updateFrequency.items.topPaidSites')}</li>
            <li className="mb-2">{t('updateFrequency.items.platformSubsites')}</li>
            <li className="mb-2">{t('updateFrequency.items.industryLeaders')}</li>
            <li className="mb-2">{t('updateFrequency.items.infoTrends')}</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">{t('contact.title')}</h2>
          <p>
            {t('contact.description')}
            <a href="mailto:info@earnmapify.com" className="text-blue-600 hover:underline ml-1">
              info@earnmapify.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 