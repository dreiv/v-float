<script setup lang="ts" generic="T extends string | number | boolean">
import './controls.css'

defineProps<{
  label: string
  options: readonly { value: T; label: string }[]
}>()

const model = defineModel<T>({ required: true })
</script>

<template>
  <label class="control">
    <span class="control__label">{{ label }}</span>
    <select v-model="model" class="control__select">
      <option v-for="option in options" :key="String(option.value)" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>

<style scoped>
@layer components {
  .control__select {
    font: inherit;
    padding: var(--ui-sp-1) var(--ui-sp-2);
    border-radius: var(--ui-field-radius);
    border: var(--ui-border-control);
    background: var(--ui-surface-bg);
    color: inherit;
  }
}
</style>
