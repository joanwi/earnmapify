import {getRequestConfig} from 'next-intl/server';
import {locales} from './index';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming locale is valid
  if (!locales.includes(locale as any)) {
    locale = 'en';
  }

  return {
    locale: locale as string,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
}); 