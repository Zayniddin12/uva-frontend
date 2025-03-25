export default {
  loading: false,
  // do not touch ssr please :) profile page does not work when ssr is false :(
  ssr: false, // don't touch this is must be true! by sanjar :)
  head: {
    title: 'Volontyor.uz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Волонтерство - это человек, который заботится о других, бескорыстно служит их счастью и интересам, \n' +
          'а также осуществляет добровольную, благодарную, беспристрастную, социально...',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content:
          'Волонтерство - это человек, который заботится о других, бескорыстно служит их счастью и интересам, \n' +
          'а также осуществляет добровольную, благодарную, беспристрастную, социально...',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Волонтерство - это человек, который заботится о других, бескорыстно служит их счастью и интересам, \n' +
          'а также осуществляет добровольную, благодарную, беспристрастную, социально...',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content:
          'https://volontyor.uz/media/slider/images/2023/12/DSC00376_copy.jpg',
      },
    ],

    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },
  css: [
    '~/assets/fonts/fonts.css',
    '~/assets/css/main.scss',
    '~/assets/icomoon/style.css',
  ],
  plugins: [
    { src: '@/plugins/element', ssr: false },
    { src: '@/plugins/vue-tel-input', ssr: false },
    { src: '@/plugins/vue-slick-carousel', ssr: false },
    { src: '@/plugins/toastification.js', ssr: false },
    { src: '@/plugins/vue-cool-lightbox', ssr: false },
    { src: '@/plugins/vmask.js', ssr: false },
    { src: '@/plugins/v-mask.js', ssr: false },
    { src: '@/assets/scripts/global.js' },
    { src: '@/plugins/moment.js', ssr: false },
    { src: '@/plugins/datePicker.js', ssr: false },
    { src: '@/plugins/aos.js', ssr: false },
    { src: '~/plugins/vue-kinesis.js', ssr: false },
    { src: '@/plugins/vuelidate.js' },
    { src: '@/plugins/axios.js' },
    { src: '@/plugins/locale.js' },
    { src: '@/plugins/google-map.js', ssr: false },
    { src: '@/plugins/vue-social-sharing.js', ssr: false },
    { src: '@/plugins/vue-infinite-scroll.js', ssr: false },
  ],
  purgeCSS: {
    whitelist: [
      'aos-init',
      'aos-animate',
      'data-aos-delay',
      'data-aos-duration',
      'fade-up',
      'fade-left',
      'fade-right',
      'flip-left',
    ],
  },
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg',
    // https://go.nuxtjs.dev/eslint
    [
      '@nuxtjs/eslint-module',
      {
        threads: true,
      },
    ],
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],
  modules: [
    // 'vue-social-sharing/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt',
    '@nuxtjs/recaptcha',
    '@nuxtjs/dayjs',
    '@nuxtjs/yandex-metrika',
    '@nuxtjs/sentry',
    [
      'nuxt-i18n',
      {
        detectBrowserLanguage: false,
        locales: [
          {
            code: 'ru',
            file: 'ru.js',
          },
          {
            code: 'uz',
            file: 'uz.js',
          },
          {
            code: 'en',
            file: 'en.js',
          },
          {
            code: 'kaa',
            file: 'kaa.js',
          },
        ],
        // strategy: 'prefix_and_default',
        defaultLocale: 'uz',
        lazy: true,
        langDir: 'lang/',
      },
    ],
  ],
  sentry: {
    dsn:
      'https://cf5ba7ded0ac4adc890bbdc04f9c30ad@o713327.ingest.sentry.io/4505000100495360',
  },
  yandexMetrika: {
    id: '93181740',
  },
  auth: {
    localStorage: false,
    cookie: {
      prefix: '@admin.auth.',
      options: {
        path: '/',
      },
    },
    strategies: {
      local1: {
        scheme: 'local',
        token: {
          property: 'token',
          maxAge: 3600 * 60 * 10,
          global: true,
          type: 'Token',
        },
        user: {
          property: false,
          autoFetch: true,
          autoLogout: false,
        },
        endpoints: {
          login: { url: '/auth/login/', method: 'post', propertyName: 'token' },
          loginViaEmail: {
            url: '/auth/auth/login_via_email//',
            method: 'post',
            propertyName: 'token',
          },
          logout: { url: '/auth/logout/', method: 'post' },
          user: { url: '/user_small_profile/', method: 'get' },
        },
      },
      local2: {
        scheme: 'local',
        token: {
          property: 'token',
          maxAge: 3600 * 60 * 10,
          global: true,
          type: 'Token',
        },
        user: {
          property: false,
          autoFetch: true,
          autoLogout: false,
        },
        endpoints: {
          login: {
            url: '/auth/login_via_email/',
            method: 'post',
            propertyName: 'token',
          },
          logout: { url: '/auth/logout/', method: 'post' },
          user: { url: '/user_small_profile/', method: 'get' },
        },
      },
    },
    redirect: {
      login: '/auth/login/',
      logout: '/auth/login/',
      // logout: '/',
      home: '/',
    },
    plugins: ['@/plugins/auth-lang-redirect.js'],
    resetOnError: true,
  },
  tailwindcss: {
    viewer: false,
  },
  axios: {
    baseURL: process.env.BASE_URL,
  },
  dayjs: {
    locales: ['en', 'ru', 'uz', 'uz-latn'],
    defaultLocale: 'uz-latn',
    plugins: ['utc'],
  },
  server: {
    port: process.env.SERVER_PORT || 3000,
    host: process.env.SERVER_HOST || '0.0.0.0',
  },
  recaptcha: {
    version: 2,
    language: 'v2',
    size: 'invisible', // Size: 'compact', 'normal', 'invisible' (v2)
    siteKey: '6LeQ9VgeAAAAAKGNtHiWY-4BLrbDuMq8E9pawVnD',
    // hideBadge: true,
  },
  build: {},
}
