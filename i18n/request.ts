import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

// Statische Imports
const messagesMap = {
  en: () => import("@/messages/en.json"),
  de: () => import("@/messages/de.json"),
};

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await messagesMap[locale as keyof typeof messagesMap]()).default,
  };
});
