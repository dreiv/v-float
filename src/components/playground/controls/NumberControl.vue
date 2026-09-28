<script setup lang="ts">
import './controls.css'
const { step = 1 } = defineProps<{
  label: string
  min: number
  max: number
  step?: number
}>()

const model = defineModel<number>({ required: true })
</script>

<template>
  <label class="control">
    <span class="control__label">{{ label }}</span>
    <span class="control__row">
      <input
        class="control__range"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="model"
      />
      <output class="control__value">{{ model }}</output>
    </span>
  </label>
</template>

<style scoped>
@layer components {
  .control__row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .control__range {
    flex: 1;
  }

  .control__value {
    min-inline-size: 3ch;
    text-align: right;
    font-variant-numeric: tabular-nums;
    opacity: 0.8;
  }
}
</style>
