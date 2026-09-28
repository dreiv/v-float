<script setup lang="ts" generic="T extends string">
import './controls.css'

defineProps<{
  label: string
  options: readonly { value: T; label: string }[]
}>()

const model = defineModel<T[]>({ required: true })
</script>

<template>
  <fieldset class="control">
    <legend class="control__label">{{ label }}</legend>
    <label v-for="option in options" :key="option.value" class="control__option">
      <input v-model="model" type="checkbox" :value="option.value" />
      <span>{{ option.label }}</span>
    </label>
  </fieldset>
</template>

<style scoped>
@layer components {
  fieldset.control {
    border: none;
    padding: 0;
    margin: 0;
  }

  .control__option {
    display: flex;
    align-items: center;
    gap: var(--ui-sp-2);
    font-weight: 400;
    cursor: pointer;
  }
}
</style>
