<script setup lang="ts">
import './controls.css'
defineProps<{
  label: string
  options: { value: string; label: string }[]
}>()

const model = defineModel<string>({ required: true })
</script>

<template>
  <label class="control">
    <span class="control__label">{{ label }}</span>
    <select class="control__select" v-model="model">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>

<style scoped>
@layer components {
  .control__select {
    font: inherit;
    padding: 0.4rem 0.5rem;
    border-radius: var(--ui-field-radius);
    border: 1px solid var(--ui-control-border);
    background: var(--ui-surface-bg);
    color: inherit;
  }
}
</style>
