<script setup lang="ts">
import './demo-menu.css'

defineProps<{
  label: string
  shortcut?: string
}>()
</script>

<template>
  <button type="button" class="demo-menu__item" role="menuitem">
    <span class="demo-menu__item-label">{{ label }}</span>
    <span v-if="shortcut" class="demo-menu__item-shortcut">{{ shortcut }}</span>
  </button>
</template>
