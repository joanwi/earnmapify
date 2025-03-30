import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2025 Income Trends: Top AI Tools Revenue & Trending Models',
  description: 'Explore 2025 income trends with top AI tools revenue from Toolify, Product Hunt leaderboard insights, and trending Hugging Face models.',
};

function getCurrentWeek() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  const weekNumber = Math.floor(diff / oneWeek) + 1;
  return `${now.getFullYear()}/${weekNumber}`;
}

export default async function IncomeTrendsPage() {
  const t = await getTranslations();
  const currentWeek = getCurrentWeek();

  const pages = [
    {
      title: 'Toolify: Best AI Tools Revenue Insights',
      description: 'AI High Revenue Ranking based on AI website rankings on payment platforms and actual monthly traffic to the website.',
      image: '/toolify.png',
      href: 'https://www.toolify.ai/Best-AI-Tools-revenue'
    },
    {
      title: 'Product Hunt: Monthly & Weekly Leaderboard Trends',
      description: 'Product Hunt is a curation of the best new products, every day. Discover the latest mobile apps, websites, and technology products that everyone\'s talking about.',
      image: '/producthunt.png',
      href: `https://www.producthunt.com/leaderboard/weekly/${currentWeek}`
    },
    {
      title: 'Indie Hackers - Products that make money',
      description: 'Discover hundreds of businesses, startups, and side projects that are making money online, and learn how they got to where they are today.',
      image: '/indeshacks.png',
      href: 'https://www.indiehackers.com/products?category=ai&revenueVerification=stripe&sorting=highest-revenue'
    },
    {
      title: 'Hugging Face: Most Downloaded & Liked Models',
      description: 'We\'re on a journey to advance and democratize artificial intelligence through open source and open science.',
      image: '/huggingface.png',
      href: 'https://huggingface.co/models?sort=trending'
    },
    {
      title: 'Google Trends: What\'s Hot in 2025',
      description: 'Explore the latest trending searches with real-time insights. This page showcases what people are currently searching for, from breaking news to popular topics, updated dynamically. ',
      image: '/Google-trending-now.png',
      href: 'https://trends.google.com/trending?geo=US&hl=en-US'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold my-2 text-center">{t('incomeTrends.heroTitle')}</h1>
      <p className="text-gray-600 mb-2 text-center ">{t('incomeTrends.heroDescription')}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page, index) => (
          <Link 
            key={index}
            href={page.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="relative h-48 bg-gray-100">
              <Image
                src={page.image}
                alt={page.title}
                width={640}
                height={360}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                unoptimized
              />
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