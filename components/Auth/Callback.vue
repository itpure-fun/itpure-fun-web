<script setup lang="ts">
const route = useRoute();
const code = route.query.code;
const state = route.query.state;
const message = ref('登录中...')
//store
const userStore = useUserStore()
const githubAutlCallbackHandle = async () => {
  if (!code || !state) {
    message.value = '参数异常'
    await navigateTo({
      path: '/'
    })
    return false
  }
  await userStore.githubAuthCallback({
    code: code,
    state: state,
  })
  await navigateTo({
    path: '/'
  })
}

if (import.meta.client) {
  githubAutlCallbackHandle()
}

onMounted(() => {

})
</script>

<template>
<div class="h-[100vh] flex justify-center items-center flex-col">
  <div class="animate-bounce w-20 h-20">
    <IconSvg name="favicon"></IconSvg>
  </div>
  <div class="mt-3">{{ message }}</div>
</div>
</template>

<style scoped>

</style>