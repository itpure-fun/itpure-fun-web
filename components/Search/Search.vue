<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const config = useRuntimeConfig()
const productStore = useProductStore()
const keyword = ref('')
//search
const search = async () => {
  await productStore.getProductList({
    title: keyword.value
  })
}
defineExpose({
  
})
</script>

<template>
<!-- content -->
<div class="flex justify-center flex-col h-[280px] items-center">
  <div class="flex justify-center flex-col items-center">
    <div class="font-bold text-5xl c-lg:text-5xl c-md:text-4xl c-sm:text-3xl c-xs:text-3xl">
      <!-- 实用的导航平台收录 -->
      实用的开发者导航
    </div>
    <div class="mt-3 mb-3">
      <!-- 专注收录全球最新优质的导航平台<span class="c-xs:hidden">，人工严选，持续更新</span> -->
      专注收集和分享IT程序员互联网工具<span class="c-xs:hidden">、资源、产品</span>
    </div>
  </div>
  <!-- seatch box -->
  <div class="flex flex-col items-center w-full">
    <div class="search-input pl-3 border-solid border-[3px] border-black">
      <el-image src="/logo.png" style="width: 25px; height: 25px;"></el-image>
      <!-- <SvgIcon name="baidu" style="width: 25px; height: 25px; cursor: pointer;"></SvgIcon> -->

      <input type="text" class="outline-none h-12 bg-[rgba(255,255,255,0)] w-[85%] ml-3 mr-3" v-model="keyword" @keyup.enter="search" placeholder="名称/描述">
      <Search class="w-6 h-6 cursor-pointer c-sm:mr-2 c-xs:mr-2" @click="search"/>
    </div>
  </div>
</div>
</template>

<style scoped>
.search-input{
  @apply w-[600px] rounded-md flex items-center bg-white c-md:w-[600px] c-sm:w-4/5 c-xs:w-4/5
}
</style>