import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

export default async function IncomeTrendsPage() {
  const t = await getTranslations();
  const currentDate = getCurrentDate();

  const pages = [
    {
      title: 'AI Tools Revenue',
      description: 'Discover top AI tools ranked by revenue and monthly visits. Track market leaders and emerging players in the AI industry.',
      bgColor: 'bg-blue-600',
      href: 'https://www.toolify.ai/Best-AI-Tools-revenue'
    },
    {
      title: 'Daily Product Hunt Leaders',
      description: 'Explore trending products and innovations. Updated daily with the latest launches and success stories.',
      bgColor: 'bg-red-600',
      href: `https://www.producthunt.com/leaderboard/daily/${currentDate}`
    },
    {
      title: 'Indie Hackers AI Revenue',
      description: 'Find successful AI products built by independent developers. Verified revenue data through Stripe integration.',
      bgColor: 'bg-green-600',
      href: 'https://www.indiehackers.com/products?category=ai&revenueVerification=stripe&sorting=highest-revenue'
    },
    {
      title: 'Trending AI Models',
      description: 'Explore popular AI models on Hugging Face. Stay updated with the latest developments in machine learning.',
      bgColor: 'bg-orange-500',
      href: 'https://huggingface.co/models?sort=trending'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">{t('incomeTrends.title')}</h1>
      <p className="text-gray-600 mb-8">{t('incomeTrends.description')}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pages.map((page, index) => (
          <Link 
            key={index}
            href={page.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className={`h-48 ${page.bgColor} flex items-center justify-center`}>
              <span className="text-2xl font-bold text-white">{page.title}</span>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-200">
                {page.title}
              </h2>
              <p className="text-gray-600">
                {page.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 