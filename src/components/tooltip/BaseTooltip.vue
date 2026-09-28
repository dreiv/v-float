<script setup lang="ts">
import { watchEffect } from 'vue'
import {
  useFloating,
  FloatingPanel,
  FloatingArrow,
  type FloatingPlacement,
} from '@/components/floating'

const {
  placement = 'top',
  offset = 8,
  arrow = true,
} = defineProps<{
  placement?: FloatingPlacement
  offset?: number
  arrow?: boolean
}>()

const { anchorProps, panelProps, arrowProps, panelId, options } = useFloating({
  trigger: ['hover', 'focus'],
})

watchEffect(() => {
  options.placement = placement
  options.offset = offset
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
