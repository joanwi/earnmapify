'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navs = [
    { name: t('topPaidSites'), path: '/top-paid-sites' },
    { name: t('topPlatformSubs'), path: '/top-platform-subs' },
    { name: t('industryLeaders'), path: '/industry-leaders' },
    { name: t('incomeTrends'), path: '/income-trends' },
  ];

  const isActive = (path: string) => {
    return pathname === path || (path === '/' && pathname === '');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex-shrink-0 flex items-center text-blue-600 font-bold text-2xl"
            >
              EarnMapify
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navs.map((nav) => (
              <Link
                key={nav.path}
                href={nav.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive(nav.path)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                {nav.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center">
            <div className="ml-3">
              <LanguageSwitcher scrolled={true} />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navs.map((nav) => (
              <Link
                key={nav.path}
                href={nav.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(nav.path)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {nav.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <LanguageSwitcher scrolled={true} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 