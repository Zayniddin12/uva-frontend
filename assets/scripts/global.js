import Vue from 'vue'

import Preloader from '~/components/Preloader.vue'

Vue.prototype.$getErrorMessage = function (err) {
  if (!err.response) return Vue.$toast.error(this.$t('error_server'))

  const firstKey = Object.keys(err.response.data)[0] || undefined
  const keyValue = firstKey ? err.response.data[firstKey] : []
  const msg2 = typeof keyValue === 'string' ? keyValue : keyValue[0]

  const msg =
    err.response.data.error ||
    err.response.data.message ||
    err.response.data.error_message ||
    msg2 ||
    'error code ' + err.response.status

  Vue.$toast.error(msg)
}
const components = { Preloader }
Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})

Vue.prototype.$filterTextTags = function (string, tag) {
  // remove dangerous tags from text
  const regex = `<${tag}>`
  return string.replace(regex, '')
}

Vue.prototype.$modal = function (e) {
  document.querySelector(`#${e}`).classList.add('_active')
  document.documentElement.classList.add('_lock')
}
Vue.prototype.$modalHide = function (e) {
  document.querySelector(`#${e}`).classList.remove('_active')
  document.documentElement.classList.remove('_lock')
}

Vue.prototype.$numberWithSpaces = function (num) {
  // return a number with spaces
  if (num !== null) return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

Vue.prototype.$validateForm = function (form, name) {
  if (typeof form.$model === 'object') {
    const formKeys = Object.keys(form.$model)
    const params = form.$flattenParams().map((item) => item.name)
    for (const element of formKeys) {
      for (const item of [...new Set(params)]) {
        if (
          form[element] &&
          Object.hasOwnProperty.call(form[element], item) &&
          !form[element][item]
        ) {
          return Vue.$toast.error(this.$t(`fill_above`)) // it will be key of error
        }
      }
    }
  } else {
    const params = form.$flattenParams().map((item) => item.name)
    for (const item of [...new Set(params)]) {
      if (Object.hasOwnProperty.call(form, item) && !form[item]) {
        return Vue.$toast.error(this.$t(`${name.replace('-', '_')}_${item}`)) // it will be key of error
      }
    }
  }
}

// API Functions

const mergeUrlWithParams = function (url, payload) {
  const urlParams = []
  const matches = [...url.matchAll(/{(\w+)}/g)]
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i]
    urlParams.push(match[1])
  }
  let mergedUrl = url
  for (const param of urlParams) {
    mergedUrl = mergedUrl.replace(`{${param}}`, payload[param])
  }
  return mergedUrl
}

Vue.prototype.$postAction = function (
  url,
  { data = undefined, params = {} } = {}
) {
  return new Promise((resolve, reject) => {
    const mergedUrl = mergeUrlWithParams(url, arguments[1])
    this.$axios
      .post(mergedUrl, data, {
        params,
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

Vue.prototype.$getAction = function (url, { params = {} } = {}) {
  return new Promise((resolve, reject) => {
    const mergedUrl = mergeUrlWithParams(url, arguments[1])
    this.$axios
      .$get(mergedUrl, {
        params,
      })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

Vue.prototype.$updateAction = function (
  url,
  { data = undefined, partial = true, params = {} } = {}
) {
  return new Promise((resolve, reject) => {
    const mergedUrl = mergeUrlWithParams(url, arguments[1])
    this.$axios[partial ? 'patch' : 'put'](mergedUrl, data, {
      params,
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

Vue.prototype.$deleteAction = function (url, { params = {} } = {}) {
  return new Promise((resolve, reject) => {
    const mergedUrl = mergeUrlWithParams(url, arguments[1])
    this.$axios
      .delete(mergedUrl, {
        params,
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
Vue.prototype.scrollToTop = function () {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  })
}
Vue.prototype.formatSeconds = function (time) {
  // Hours, minutes and seconds
  const hrs = ~~(time / 3600)
  const mins = ~~((time % 3600) / 60)
  const secs = ~~time % 60

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = ''
  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
  }
  ret += '' + String(mins).padStart(2, '0') + ':' + (secs < 10 ? '0' : '')
  ret += '' + secs
  return ret
}

Vue.prototype.startCountDown = function () {
  clearInterval(this.interval)
  this.timer = 59
  this.interval = setInterval(() => {
    this.timer--
    if (this.timer < 1) {
      clearInterval(this.interval)
    }
  }, 1000)
}
