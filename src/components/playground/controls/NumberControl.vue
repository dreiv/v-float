<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    min: number
    max: number
    step?: number
  }>(),
  { step: 1 },
)

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
