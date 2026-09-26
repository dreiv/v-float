<script setup lang="ts">
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
.control {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.85rem;
}

.control__label {
  font-weight: 600;
}

.control__select {
  font: inherit;
  padding: 0.4rem 0.5rem;
  border-radius: 6px;
  border: 1px solid color-mix(in oklab, canvastext 25%, transparent);
  background: canvas;
  color: inherit;
}
</style>
