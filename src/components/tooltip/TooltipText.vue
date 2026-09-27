<script setup lang="ts">
import Tooltip from './BaseTooltip.vue'
import type { FloatingPlacement } from '@/composables/floating/types'

withDefaults(
  defineProps<{
    hint: string
    placement?: FloatingPlacement
  }>(),
  {
    placement: 'top',
  },
)
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
