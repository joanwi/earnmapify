import { getRequestConfig, GetRequestConfigParams } from 'next-intl/server';

export const locales = ['en', 'zh'];
export const defaultLocale = 'en';


export default getRequestConfig(async (params:GetRequestConfigParams) => {
  let locale=params.locale;

  if (!locale || !locales.includes(locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
}); 