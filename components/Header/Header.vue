<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
// import SvgIcon from "@/components/Icons/SvgIcon.vue";
// import LanguageSwitch from "@/components/Kit/LanguageSwitch/LanguageSwitch.vue";
// import DarkSwitch from "@/components/Kit/DarkSwitch/DarkSwitch.vue";
// import { Promotion } from '~element-plus/icons-vue'
import { useRouter } from 'vue-router';
const config = useRuntimeConfig();
const router = useRouter();
const userStore = useUserStore()
const loginRef = ref()
// const SettingPageRef = ref()
const loginShow = () => {
  if (loginRef.value) {
    loginRef.value.show()
  }
}

const submitProductRef = ref()
const submitProduct = () => {
  if (!userStore.isLogin()) {
    loginShow()
  } else {
    if (submitProductRef.value) {
      submitProductRef.value.show()
    }
  }
}

const logout = async () => {
  await userStore.logout()
  location.reload()
}

watch(() => userStore.token, async (New, Old) => {
  await userStore.userInfo()
}, {immediate: true})

onMounted(() => {
})
</script>

<template>
  <!-- <div class="fixed top-0 w-full z-[999] bg-[#F9CC45]"> -->
  <div class="fixed top-0 w-full z-[999] border-b-[1px] flex justify-center" style="background-color: rgb(255 255 255 / .75); backdrop-filter: var(--base-backdrop-blur);">
    <div class="flex items-center w-full h-16 justify-between p-5 c-2xl:w-4/5">
      <div class="text-2xl font-bold flex items-center cursor-pointer" @click="router.push('/');">
        <!-- <el-image style="width: 30px; height: 30px" src="/logo_w.png" fit="cover" /> -->
        <el-image style="width: 30px; height: 30px" src="/logo.png" fit="cover" />
        <div class="ml-2">{{ config.public.title }}</div>
      </div>

      <div class="flex items-center text-white  pt-1 pb-1 pl-2">
        <!-- <LanguageSwitch/> -->
        <el-button color="#000" :icon="ElIconPromotion" @click="submitProduct">提交收录</el-button>



        <div class="ml-2 c-xs:ml-0 flex items-center cursor-pointer" @click="loginShow" v-if="!userStore.isLogin()">
          <el-button  text>登录<el-icon><ElIconRight /></el-icon></el-button>
        </div>
        <div class="ml-5 flex items-center" v-else>
          <el-popover width="200">
            <template #reference>
              <el-image :src="userStore.avatar" class="w-8 h-8 rounded-full"></el-image>
              <!-- <svg t="1723541974690" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17949" data-spm-anchor-id="a313x.search_index.0.i14.1b3f3a812XOTWZ" width="35" height="35"><path d="M512 1024C229.229714 1024 0 794.770286 0 512S229.229714 0 512 0s512 229.229714 512 512-229.229714 512-512 512z m0-927.98781C282.258286 96.01219 96.01219 282.258286 96.01219 512c0 107.446857 41.081905 205.04381 107.934477 278.869333 60.269714-29.135238 38.13181-4.87619 116.955428-37.351619 80.676571-33.133714 99.791238-44.714667 99.791238-44.714666l0.75581-76.434286s-30.208-22.942476-39.594667-94.866286c-18.919619 5.436952-25.161143-22.016-26.282666-39.497143-0.999619-16.896-10.922667-69.632 12.117333-64.877714-4.705524-35.206095-8.094476-66.950095-6.436572-83.772952 5.778286-59.050667 63.097905-120.758857 151.356953-125.269334 103.838476 4.510476 144.969143 66.169905 150.723047 125.220572 1.682286 16.822857-2.023619 48.615619-6.729142 83.748571 23.064381-4.681143 13.04381 47.957333 11.922285 64.853334-1.024 17.481143-7.41181 44.836571-26.258285 39.424-9.435429 71.899429-39.643429 94.671238-39.643429 94.671238l0.707048 76.04419s19.090286 10.825143 99.766857 43.983238c78.823619 32.451048 56.710095 9.630476 116.955428 38.838857 66.876952-73.801143 107.958857-171.422476 107.958857-278.869333 0-229.741714-186.270476-415.98781-416.01219-415.98781z" fill="#ffffff" p-id="17950" data-spm-anchor-id="a313x.search_index.0.i12.1b3f3a812XOTWZ" class="usersvg"></path></svg> -->
            </template>
            <div>
              <div class="flex flex-col items-center">
                <div class="rounded-full w-20">
                  <el-image :src="userStore.avatar" class="rounded-full w-"></el-image>
                </div>
                <div class="flex justify-center mt-3 mb-3">
                  <el-text>{{ userStore.username }}</el-text>
                </div>
              </div>
              <div class="flex items-center border-t-[1px] pt-1 pb-1">
                <el-button text class="w-full" disabled>
                  <el-icon size="18"><ElIconStarFilled /></el-icon>
                  我的收藏
                </el-button>
              </div>
              <div @click="logout()" class="flex items-center border-t-[1px] pt-1">
                <el-button text class="w-full">
                  <div class="w-4 h-4 mr-1"><IconSvg name="logout"></IconSvg></div>
                  退出
                </el-button>
              </div>
            </div>
          </el-popover>
        </div>

      </div>

    </div>
  </div>
  

  <AuthLoginQuick ref="loginRef"/>
  <SubmitProduct ref="submitProductRef"/>

  <!-- <KitSettingPage ref="SettingPageRef"/> -->
</template>

<style scoped>
.usersvg:hover{
  fill: black
}
</style>