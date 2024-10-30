<script setup lang="ts">
const config = useRuntimeConfig()
useSeoMeta({
  title: config.public.title + ' - 专注收集和分享IT程序员互联网工具',
  description: '收录开发者工具、资源、产品收录导航，一键提交网址分享你喜爱的产品吧',
  keywords: '开发者导航，网址导航，IT导航，独立开发者导航，程序员导航，ITPURE，工具箱'
})
</script>

<template>
  <Home></Home>
</template>
