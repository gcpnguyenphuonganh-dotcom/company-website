import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from '@/locales/en/common.json'
import viCommon from '@/locales/vn/common.json'
import jaCommon from '@/locales/ja/common.json'

if (!i18n.isInitialized) {        // ← chỉ init 1 lần
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { common: enCommon },
        vi: { common: viCommon },
        ja: { common: jaCommon },
      },
      lng: 'en',
      fallbackLng: 'en',
      ns: ['common'],
      defaultNS: 'common',
      interpolation: { escapeValue: false },
    })
}

export default i18n