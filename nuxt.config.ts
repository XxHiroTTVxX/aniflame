// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vue: {
    compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('media-'),
    },
},
  pages: true,
  devtools: { enabled: true },
  modules: ["nuxt-lucide-icons"],
  lucide: {
    namePrefix: "Icon",
  },
});
