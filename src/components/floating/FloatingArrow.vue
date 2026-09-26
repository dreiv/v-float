<script setup lang="ts">
defineProps<{
  style?: Record<string, string>
}>()
</script>

<template>
  <span class="v-float-arrow" :style="style" aria-hidden="true" />
</template>
