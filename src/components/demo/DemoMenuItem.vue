<script setup lang="ts">
import { Tooltip } from '@/components/tooltip'

defineProps<{
  label: string
  hint: string
  shortcut?: string
}>()
</script>

<template>
  <div class="demo-menu__item" role="menuitem">
    <span class="demo-menu__item-label">{{ label }}</span>
    <span v-if="shortcut" class="demo-menu__item-shortcut">{{ shortcut }}</span>

    <Tooltip placement="right" :offset="10">
      <template #trigger="{ trigger }">
        <button type="button" class="demo-menu__item-hint" v-bind="trigger" aria-label="More info">
          ?
        </button>
      </template>
      <p>{{ hint }}</p>
    </Tooltip>
  </div>
</template>
