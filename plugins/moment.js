import Vue from 'vue'
import moment from 'moment'

const getLocale = function () {
  let locale = 'uz'
  if (this._i18n.locale === 'uz') {
    locale = 'uz_latn'
  } else if (this._i18n.locale === 'ru') {
    locale = 'ru_RU'
  } else if (this._i18n.locale === 'en') {
    locale = 'en_EN'
  } else if (this._i18n.local === 'kaa') {
    locale = 'kaa'
  }
  return locale
}

Vue.prototype.$m = moment

Vue.prototype.$moment = function (date, type) {
  const locale = getLocale.call(this)
  if (type) {
    return moment(date).locale(locale).format(type)
  }
}
