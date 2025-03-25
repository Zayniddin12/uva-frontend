import ElementLocale from 'element-ui/lib/locale'
import lang from 'element-ui/lib/locale/lang/en'
import uzLocale from 'element-ui/lib/locale/lang/uz-UZ'
import ruLocale from 'element-ui/lib/locale/lang/ru-RU'
// eslint-disable-next-line
import kaaLocale from 'element-ui/lib/locale/lang/ru-RU'
export default function ({ i18n }, inject) {
  if (process.client) {
    const setLocale = (locale) => {
      // $dayjs
      const locales = {
        uz: uzLocale,
        ru: ruLocale,
        en: lang,
        kaa: kaaLocale,
      }
      ElementLocale.use(locales[locale])
      // v-calendar
    }

    setLocale(i18n.locale)
    i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
      setLocale(newLocale)
    }
  }
}
