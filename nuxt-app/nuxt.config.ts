// https://nuxt.com/docs/api/configuration/nuxt-config

export default ({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt3-socket.io',
  ],


  typescript: {
    strict: true
  },
})
