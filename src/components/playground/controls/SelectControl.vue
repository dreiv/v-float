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
    <select class="control__select ui-field" v-model="model">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>
