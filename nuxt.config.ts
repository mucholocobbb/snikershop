// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-02-16',
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '',
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://test-task-api.tapir.ws',
    },
  },
  typescript: {
    strict: true,
  },
})
