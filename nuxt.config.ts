// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxt/test-utils"],
  content: {
    build: {
      markdown: {
        highlight: {
          theme: "one-dark-pro",
          langs: [
            "bash",
            "html",
            "css",
            "javascript",
            "js",
            "jsx",
            "typescript",
            "ts",
            "coffeescript",
            "ruby",
            "erb",
            "dockerfile",
            "json",
            "yaml"
          ]
        }
      }
    }
  }
})
