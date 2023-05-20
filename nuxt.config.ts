// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ["@/assets/style/global.scss"],
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  tailwindcss: {
    configPath: "~/tailwind.config.js",
  },
  vite: {
    resolve: {
      alias: {
        "near-api-js": "near-api-js/dist/near-api-js.js",
      },
    },
  },
});
