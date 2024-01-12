// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  devtools: { enabled: true },
  modules: ["nuxt-lucide-icons"],
  lucide: {
    namePrefix: 'Icon'
  }
})