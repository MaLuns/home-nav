module.exports = {
  telemetry: false, // 关闭提示

  server: {
    port: 7000,
  },
  dev: process.env.NODE_ENV !== 'production',
  env: {
    baseURL: "http://localhost:7000",
    port: 7000,
    db: "mongodb://localhost/home-nav"
  },

  loading: '~/components/loading.vue',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '导航',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: '/styles/index.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    /* 'view-design/dist/styles/iview.css' */
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/view-ui',
    '@/plugins/mock',
    "@/plugins/gloab.components"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    optimization: {
      runtimeChunk: 'multiple',
      minimize: undefined,
      minimizer: undefined,
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: undefined,
        cacheGroups: {}
      }
    },
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    },
  }
}
