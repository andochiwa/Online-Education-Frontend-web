export default {
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  head: {
    title: '在线教育平台',
    // htmlAttrs: {
    //   lang: 'en'
    // },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'swiper/swiper-bundle.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    {
      src: '@/plugins/awesome-swiper.js',
      ssr: false
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },

}

