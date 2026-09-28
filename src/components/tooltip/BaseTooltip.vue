<script setup lang="ts">
import { useFloating, FloatingPanel, FloatingArrow } from '@/components/floating'
import type { FloatingPlacement } from '@/composables/floating/types'

const {
  placement = 'top',
  offset = 8,
  arrow = true,
} = defineProps<{
  placement?: FloatingPlacement
  offset?: number
  arrow?: boolean
}>()

const { anchorProps, panelProps, arrowProps, panelId } = useFloating({
  placement,
  offset,
  trigger: ['hover', 'focus'],
  shift: false,
})
</script>

<template>
  <slot name="trigger" :trigger="{ ...anchorProps, 'aria-describedby': panelId }" />

  <FloatingPanel v-bind="panelProps" role="tooltip" class="v-tooltip">
    <FloatingArrow v-if="arrow" v-bind="arrowProps" />
    <div class="v-tooltip__content">
      <slot />
    </div>
  </FloatingPanel>
</template>

<style scoped>
@layer components {
  .v-tooltip {
    inline-size: max-content;
  }

  .v-tooltip__content {
    padding: var(--ui-sp-2) var(--ui-sp-3);
    font-size: var(--ui-fs-sm);
    max-inline-size: var(--ui-w-panel);
  }

  :slotted(p) {
    margin: 0;
  }
}
</style>
