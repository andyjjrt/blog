import { defineNuxtConfig } from 'nuxt'
import { lang } from "./shiki.lang"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['~/app.css'],
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],
  content: {
    highlight: {
      theme: "github-dark",
      preload: lang
    }
  },
  postcss: {
    plugins: {
      'tailwindcss/nesting': 'postcss-nesting',
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
