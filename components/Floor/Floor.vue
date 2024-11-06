<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { goto } from '~/utils/url';

const router = useRouter();

function goRouter(path: string) {
  router.push(path);
}

const currentDade = new Date()
const currentYear = currentDade.getFullYear()
const config = useRuntimeConfig()

onMounted(() => {

})
</script>

<template>
  <div class="w-full border-gray-200 mt-10 border-t-[1px] pt-10 pb-10 pl-5 pr-5 bg-white flex justify-center">

    <div class="flex justify-between c-md:justify-between c-md:flex-row c-sm:flex-col c-xs:flex-col c-2xl:w-4/5 w-full">
      <div>
        <div class="text-2xl font-bold flex items-center cursor-pointer" @click="router.push('/');">
          <el-image style="width: 30px; height: 30px" src="/logo.png" fit="cover" />
          <div class="ml-2">{{ config.public.title }}</div>
        </div>
        <div class="mt-5">
          <el-text>收集和分享各种工具、产品，让查找资源更加方便!</el-text>
        </div>
      </div>

      <div class="flex flex-col c-md:mt-0 c-sm:mt-5 c-xs:mt-5">
        <div class="grid grid-cols-3 gap-10">
          <div>
            <div class="font-bold">产品</div>
            <div class="mt-2 cursor-pointer hover-black-text"><el-text @click="goto('https://tools.ranblogs.com/')">Tools-Web</el-text></div>
          </div>
          <div>
            <div class="font-bold">关于</div>
            <div class="mt-2 cursor-pointer hover-black-text"><el-text @click="goRouter('/about')">关于网站</el-text></div>
            <div class="mt-2 cursor-pointer hover-black-text"><el-text @click="goRouter('/changelog')">更新日志</el-text></div>
          </div>
          <div>
            <div class="font-bold">信息</div>
            <div class="mt-2 cursor-pointer hover-black-text"><el-text @click="goRouter('/privacy')">隐私政策</el-text></div>
            <div class="mt-2 cursor-pointer hover-black-text"><el-text  @click="goRouter('/terms')">服务条款</el-text></div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div class="w-full  border-gray-200 pt-2 pb-2 flex justify-center items-center bg-black">
    <div class="">
      <el-text style="color: #fff;">©{{ currentYear }} {{ config.public.title }}, All Rights Reserved.</el-text>
    </div>
  </div>


</template>

<style scoped>
.hover-black-text .el-text{
  @apply hover:text-black
}
</style>