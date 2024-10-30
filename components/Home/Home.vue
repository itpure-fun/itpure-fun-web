<script setup lang="ts">

onMounted(() => {

})
</script>

<template>
  <div class="">

    <!-- box -->
    <div class="mt-16">
      <!-- <div class="bg-[#F9CC45]"> -->
      <div class="">
        <Search/>
      </div>

      <div class="box">
        <NavBox/>
      </div>
      
    </div>

    <el-backtop :bottom="100" :right="20">
      <div class="flex items-center">
        <el-icon color="#F7BA1E"><ElIconCaretTop /></el-icon>
      </div>
    </el-backtop>

  </div>
</template>

<style scoped>
.box{
  @apply min-h-[350px]
}
</style>

