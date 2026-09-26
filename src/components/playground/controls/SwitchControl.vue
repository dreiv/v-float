<script setup lang="ts">
defineProps<{
  label: string
}>()

const model = defineModel<boolean>({ required: true })
</script>

<template>
  <label class="control control--switch">
    <input class="control__checkbox" type="checkbox" role="switch" v-model="model" />
    <span class="control__label">{{ label }}</span>
  </label>
</template>

<style scoped>
.control--switch {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  cursor: pointer;
}

.control__label {
  font-weight: 600;
}

.control__checkbox {
  width: 2rem;
  height: 1.15rem;
  accent-color: currentColor;
}
</style>
