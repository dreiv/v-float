<script setup lang="ts">
import './controls.css'

defineProps<{
  label: string
}>()

const model = defineModel<boolean>({ required: true })
</script>

<template>
  <label class="control control--inline">
    <input v-model="model" type="checkbox" role="switch" />
    <span>{{ label }}</span>
  </label>
</template>

<style scoped>
@layer components {
  .control--inline {
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }
}
</style>
