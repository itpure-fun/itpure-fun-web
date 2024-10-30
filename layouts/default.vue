<template>
  <div class="bgg">
    <Header></Header>
    <slot />
    <Floor></Floor>
  </div>
</template>
<style scoped>
.bgg{
  background-image: linear-gradient(to right, #f8f8f8 1px, transparent 1px), linear-gradient(to bottom, #f8f8f8 1px, transparent 1px);
  background-size: 100px 60px;
  @apply pt-10
}
</style>