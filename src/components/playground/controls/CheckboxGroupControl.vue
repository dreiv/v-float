<script setup lang="ts">
defineProps<{
  label: string
  options: { value: string; label: string }[]
}>()

const model = defineModel<string[]>({ required: true })

function toggle(value: string, checked: boolean) {
  model.value = checked ? [...model.value, value] : model.value.filter((item) => item !== value)
}
</script>

<template>
  <fieldset class="control">
    <legend class="control__label">{{ label }}</legend>
    <label v-for="option in options" :key="option.value" class="control__option">
      <input
        type="checkbox"
        :value="option.value"
        :checked="model.includes(option.value)"
        @change="toggle(option.value, ($event.target as HTMLInputElement).checked)"
      />
      <span>{{ option.label }}</span>
    </label>
  </fieldset>
</template>
