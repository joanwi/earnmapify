import { getRequestConfig } from 'next-intl/server';
import { locales } from './index';

export default getRequestConfig(async ({ locale }: { locale?: string }) => {
  // 如果 locale 未定义或无效，使用 'en'
  if (!locale || !locales.includes(locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
}); 