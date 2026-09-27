<script setup lang="ts">
defineProps<{
  label: string
}>()

const model = defineModel<boolean>({ required: true })
</script>

<template>
  <label class="control control--inline">
    <input type="checkbox" v-model="model" />
    <span>{{ label }}</span>
  </label>
</template>
