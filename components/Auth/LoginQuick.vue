<script setup lang="ts">
import { goto } from '@/utils/url'
//visible
const visible = ref(false)
//store
const userStore = useUserStore()
//显示弹窗
const show = () => {
  visible.value = true
}

const githubAuth = async () => {
  const data = await userStore.githubAuthUrl({})
  // goto(data.url, '_blank')
  goto(data.url, '_self')
}

defineExpose({
  show
})
</script>

<template>
  <!-- 登录弹窗 -->
  <el-dialog v-model="visible" title="" width="450" center class="pl-6 pr-6 pb-6 rounded-xl">
    <el-divider><div class="text-xl font-normal">登录方式</div></el-divider>
    <div class="grid grid-rows-1 gap-5 p-5 w-full text-center">
      <div class="">
        <el-button size="large" class="w-3/6" @click="githubAuth" plain>
          <div class="w-[20px] h-[20px] mr-2"><IconSvg name="github"></IconSvg></div>
          通过GitHub登录
        </el-button>
      </div>
      <!-- <div class="">
        <el-button size="large" class="w-3/6" @click="githubAuth">通过Google登录</el-button>
      </div>
      <div class="">
        <el-button size="large" class="w-3/6" @click="githubAuth">微信扫码登录</el-button>
      </div> -->
    </div>
  </el-dialog>
</template>

<style scoped>
.fold-enter-active {
  transition: all 1s ease-out;
}

.fold-enter-from,
.fold-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
:deep(.el-button.is-plain:hover){
  @apply border-black text-black
}
</style>