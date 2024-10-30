<template>
  <Header></Header>
  <div class="flex flex-col flex-1 p-5 w-full items-center">
    <div class="w-4/5">
      <slot />
    </div>
  </div>
  <Floor></Floor>
</template>
<style scoped>
</style>