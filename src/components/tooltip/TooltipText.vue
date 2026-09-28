<script setup lang="ts">
import Tooltip from './BaseTooltip.vue'
import type { FloatingPlacement } from '@/composables/floating/types'

const { placement = 'top' } = defineProps<{
  hint: string
  placement?: FloatingPlacement
}>()
</script>

<template>
  <Tooltip :placement="placement">
    <template #trigger="{ trigger }">
      <button type="button" class="v-tooltip-term" v-bind="trigger">
        <slot />
      </button>
    </template>
    <p>{{ hint }}</p>
  </Tooltip>
</template>

<style scoped>
@layer components {
  .v-tooltip-term {
    font: inherit;
    padding: 0;
    border: none;
    background: none;
    color: inherit;
    cursor: help;
    text-decoration: underline dashed;
    text-underline-offset: 3px;
    text-decoration-color: var(--ui-tint-45);

    border-radius: var(--ui-radius-xs);

    &:hover,
    &:focus-visible {
      text-decoration-color: AccentColor;
    }
  }
}
</style>
