import { defineConfig } from "astro/config"

export default defineConfig({
  output: "static",
  site: "https://nshki.com",
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      transformers: [
        {
          pre(node) {
            delete node.properties.style
          }
        }
      ]
    }
  }
})
