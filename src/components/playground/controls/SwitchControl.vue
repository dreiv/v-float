<script setup lang="ts">
defineProps<{
  label: string
}>()

const model = defineModel<boolean>({ required: true })
</script>

<template>
  <label class="control control--checkbox">
    <input type="checkbox" v-model="model" />
    <span>{{ label }}</span>
  </label>
</template>

<style scoped>
.control--checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  cursor: pointer;
}
</style>
