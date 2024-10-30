/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
    screens: {
      // 自定义响应式尺寸
      'c-xs': {'max': '500px'},
      'c-sm': {'min': '500px'},
      'c-md': {'min': '768px'},
      'c-lg': {'min': '1024px'},
      'c-xl': {'min': '1280px'},
      'c-2xl': {'min': '1536px'},
      ...defaultTheme.screens,
    }
  },
  plugins: [],
}

