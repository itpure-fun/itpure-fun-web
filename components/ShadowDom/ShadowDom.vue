<script setup lang="ts">
const element = ref<HTMLElement | null>(null)

const props = defineProps({
  sourceDoc: {
    type: String,
    default: null,
  },
})
onMounted(() => {
  sleep(2000)
  const shadowHost = computed(
    () => {
      if (element.value != null) {
        return element.value!.shadowRoot || element.value.attachShadow({ mode: 'open' })
      }
    }
  )
  shadowHost.value!.innerHTML = props.sourceDoc
})
</script>

<template>
  <div ref="element"></div>
</template>