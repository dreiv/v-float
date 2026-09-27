<script setup lang="ts">
defineProps<{
  label: string
  description?: string
}>()

const model = defineModel<boolean>({ required: true })
</script>

<template>
  <div class="control">
    <label class="control__row">
      <input type="checkbox" v-model="model" />
      <span>{{ label }}</span>
    </label>
    <p v-if="description" class="control__description">{{ description }}</p>
  </div>
</template>

<style scoped>
.control {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.85rem;

  &__row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
}
</style>
