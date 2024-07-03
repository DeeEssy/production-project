import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { Locale } from './locales';

i18n
  .use(initReactI18next)
  .init({
    lng: Locale.EN,
    fallbackLng: Locale.EN,
    debug: false,

    interpolation: {
      escapeValue: false,
    },
    resources: { en: { translations: {} } },
  });

export default i18n;
