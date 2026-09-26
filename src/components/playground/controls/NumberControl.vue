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

<style scoped>
.control {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.85rem;

  &__label {
    font-weight: 600;
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  &__range {
    flex: 1;
  }

  &__value {
    min-width: 3ch;
    text-align: right;
    font-variant-numeric: tabular-nums;
    opacity: 0.8;
  }
}
</style>
