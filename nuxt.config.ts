// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@pinia/nuxt', '@nuxt/ui'],
  css: [
    '~/assets/styles/main.scss'
  ],
  typescript: {
    strict: true
  },
})