import { getTranslations } from 'next-intl/server';

export default async function AboutPage() {
  const t = await  getTranslations();

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('about.title')}</h1>
        
        <div className="prose prose-blue max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            {t('about.description')}
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Data Sources</h2>
          <p className="mb-4">
            The data presented on this website is gathered from multiple sources:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Similarweb for traffic and analytics data</li>
            <li className="mb-2">Public from platforms like GitHub, Product Hunt, and more</li>
            <li className="mb-2">Custom web scrapers for specialized data collection</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Update Frequency</h2>
          <p className="mb-4">
            Our data is updated according to the following schedule:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Top Paid Sites: Monthly</li>
            <li className="mb-2">Top Platform Subsites: Monthly</li>
            <li className="mb-2">Industry Leaders: Monthly</li>
            <li className="mb-2">Info & Trends: Weekly</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Contact</h2>
          <p>
            For questions, suggestions, or data corrections, please contact us at:
            <a href="mailto:info@makemoneyweb.com" className="text-blue-600 hover:underline ml-1">
              info@makemoneyweb.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 