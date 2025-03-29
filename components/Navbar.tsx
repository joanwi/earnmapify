'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { locales } from '@/i18n';

export default function Navbar() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const currentLocale = useLocale();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Add debug logging to help understand paths
  useEffect(() => {
    console.log('Current locale:', currentLocale);
    console.log('Current pathname:', pathname);
  }, [currentLocale, pathname]);

  // Handle language paths correctly
  const getLocalePath = (locale: string) => {
    let path = pathname;
    if (currentLocale !== 'en' && pathname.startsWith(`/${currentLocale}`)) {
      path = pathname.replace(`/${currentLocale}`, '');
    }
    if (locale === 'en') {
      return path === '' ? '/' : path;
    }
    return `/${locale}${path === '' ? '/' : path}`;
  };

  // Handle language switch
  const handleLanguageSwitch = (locale: string) => {
    const path = getLocalePath(locale);
    console.log(`Switching to locale: ${locale}, path: ${path}`);
    setIsLangOpen(false);
    router.push(path);
  };

  const routes = [
    { name: t('moneyMakingSites'), path: '/top-paid-sites'},
    { name: t('platformSubsites'), path: '/top-platform-subs' },
    { name: t('categorySites'), path: '/industry-leaders' },
    { name: t('incomeTrends'), path: '/income-trends' },
  ];

  const isActive = (path: string) => {
    if (currentLocale === 'en') {
      return pathname === path || (path === '/' && pathname === '');
    }
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
    return path === pathWithoutLocale || (path === '/' && pathWithoutLocale === '');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              href={currentLocale === 'en' ? '/' : `/${currentLocale}`}
              className="flex-shrink-0 flex items-center text-blue-600 font-bold text-2xl"
            >
              EarnMapify
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={currentLocale === 'en' ? route.path : `/${currentLocale}${route.path}`}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(route.path)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {route.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center">
            <div className="relative ml-3">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
                onClick={() => setIsLangOpen(!isLangOpen)}
              >
                <span>{currentLocale.toUpperCase()}</span>
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {locales.map((locale) => (
                    <button
                      key={locale}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        locale === currentLocale
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => handleLanguageSwitch(locale)}
                    >
                      {locale === 'en' ? 'English' :
                       locale === 'de' ? 'Deutsch' :
                       locale === 'fr' ? 'Français' :
                       locale === 'es' ? 'Español' :
                       locale === 'it' ? 'Italiano' :
                       locale === 'ja' ? '日本語' :
                       locale === 'ru' ? 'Русский' :
                       locale === 'zh' ? '中文' : locale}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <div className="relative mr-2">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md px-2 py-1 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
                onClick={() => setIsLangOpen(!isLangOpen)}
              >
                <span>{currentLocale.toUpperCase()}</span>
                <svg
                  className="ml-1 h-3 w-3"
                  fill="none"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {locales.map((locale) => (
                    <button
                      key={locale}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        locale === currentLocale
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => handleLanguageSwitch(locale)}
                    >
                      {locale === 'en' ? 'English' :
                       locale === 'de' ? 'Deutsch' :
                       locale === 'fr' ? 'Français' :
                       locale === 'es' ? 'Español' :
                       locale === 'it' ? 'Italiano' :
                       locale === 'ja' ? '日本語' :
                       locale === 'ru' ? 'Русский' :
                       locale === 'zh' ? '中文' : locale}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={currentLocale === 'en' ? route.path : `/${currentLocale}${route.path}`}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(route.path)
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {route.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 