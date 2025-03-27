'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const currentLocale = useLocale();

  // Helper function to generate correct localized URLs
  const getLocalizedPath = (path: string) => {
    return currentLocale === 'en' ? path : `/${currentLocale}${path}`;
  };

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* About Us */}
          <div>
          <Link 
              href={currentLocale === 'en' ? '/' : `/${currentLocale}`}
              className="flex-shrink-0 flex items-center text-blue-600 font-bold text-2xl"
            >
              EarnMapify
            </Link>
            <p className="mt-4 text-base text-gray-500">
              {t('aboutDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              {t('quickLinks')}
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href={getLocalizedPath('/top-paid-sites')} className="text-base text-gray-500 hover:text-gray-900">
                  {t('moneyMaking')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/top-platform-subs')} className="text-base text-gray-500 hover:text-gray-900">
                  {t('platforms')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/category-sites')} className="text-base text-gray-500 hover:text-gray-900">
                  {t('categories')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/info-sites')} className="text-base text-gray-500 hover:text-gray-900">
                  {t('info')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              {t('resources')}
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href={getLocalizedPath('/blog')} className="text-base text-gray-500 hover:text-gray-900">
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/api')} className="text-base text-gray-500 hover:text-gray-900">
                  {t('api')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/documentation')} className="text-base text-gray-500 hover:text-gray-900">
                  {t('documentation')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              {t('contact')}
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="mailto:contact@makemoneyweb.com" className="text-base text-gray-500 hover:text-gray-900">
                  {t('email')}
                </a>
              </li>
            </ul>

            <h3 className="mt-8 text-sm font-semibold text-gray-400 tracking-wider uppercase">
              {t('social')}
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="https://twitter.com/makemoneyweb" className="text-base text-gray-500 hover:text-gray-900">
                  {t('twitter')}
                </a>
              </li>
              <li>
                <a href="https://github.com/makemoneyweb" className="text-base text-gray-500 hover:text-gray-900">
                  {t('github')}
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/company/makemoneyweb" className="text-base text-gray-500 hover:text-gray-900">
                  {t('linkedin')}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              {t('legal')}
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href={getLocalizedPath('/privacy')} className="text-base text-gray-500 hover:text-gray-900">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/terms')} className="text-base text-gray-500 hover:text-gray-900">
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/cookies')} className="text-base text-gray-500 hover:text-gray-900">
                  {t('cookies')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-4">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} MakeMoneyWeb. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 