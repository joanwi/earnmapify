import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  defaultLocale,
  locales,
  // Don't include a locale prefix for the default locale
  localePrefix: 'as-needed',
  // Don't automatically detect user locale based on headers
  localeDetection: false
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/'
  ]
}; 