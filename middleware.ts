import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix: 'as-needed',
  localeDetection: false
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/'
  ]
}; 