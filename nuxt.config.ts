import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  //ssr
  ssr: true,
  //运行时的一些全局变量
  runtimeConfig: {
    //只能在服务端期间获取到
    //serverText: 'text',
    

    //公开，客户端也能获取到
    public: {
      baseURL: process.env.BASE_URL,

      title: process.env.BASE_TITLE,
    }
  },
  imports: {
    dirs: [
      //扫描给定目录中的所有模块
      'store/modules/**'
    ]
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "zh-CN"
      },
      script: [
        {
          innerHTML: process.env.ANALYSIS
        }
      ]
    }
  },
  css: [
    '~/assets/css/main.css',
    'element-plus/dist/index.css',
    'element-plus/theme-chalk/display.css',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          //可引入多个：@use "~/assets/css/main.css" as *;@use "~/assets/css/main.css" as *; @use ...
          //更改elementplus主题变量
          additionalData: '@use "~/assets/css/element-variables.scss" as element;' 
        }
      }
    },
    optimizeDeps: {
      include: [
        'dayjs'
      ]
    },
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "assets/images/svg")],
      }),
    ]
  },
  //elementplus config
  elementPlus: {
    importStyle: 'scss',
  },
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',  //持久化插件
  ],
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    }
  },
  build: {
    transpile: ['pinia-plugin-persistedstate']
  },  
  nitro: {
    devProxy: {
      "/api": {
        target: process.env.NUXT_KINGBAL_PROXY_PATH,    // 目标后端API地址
        changeOrigin: true,
      },
    }
  },
  experimental: {
    renderJsonPayloads: true
  }
})
