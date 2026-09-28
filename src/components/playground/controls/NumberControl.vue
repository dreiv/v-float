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
        v-model.number="model"
        class="control__range"
        type="range"
        :min="min"
        :max="max"
        :step="step"
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
    gap: var(--ui-sp-2);
  }

  .control__range {
    flex: 1;
  }

  .control__value {
    min-inline-size: 3ch;
    text-align: end;
    font-variant-numeric: tabular-nums;
    opacity: 0.8;
  }
}
</style>
