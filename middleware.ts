import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './app/i18n';

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
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the root (/) pathname
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Also match root pathname without trailing slash
    '/'
  ]
}; 