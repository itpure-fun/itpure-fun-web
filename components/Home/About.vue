<script setup lang="ts">

const configStore = useConfigStore()

await configStore.getConfigByCode({
  code: 'about'
})

onMounted(() => {

})
</script>

<template>
  <div class="mt-20">
    <ShadowDom :source-doc="configStore.configInfo.value"></ShadowDom>
  </div>
</template>

<style scoped>
</style>