export default ({ $axios, store, app }) => {
  $axios.onRequest((config) => {
    config.headers.common['Accept-Language'] = app.i18n.locale
  })
}
