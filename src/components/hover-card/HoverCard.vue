<script setup lang="ts">
import { watchEffect } from 'vue'
import {
  useFloating,
  FloatingPanel,
  FloatingArrow,
  type FloatingPlacement,
} from '@/components/floating'

const { placement = 'bottom', offset = 10 } = defineProps<{
  placement?: FloatingPlacement
  offset?: number
}>()

const { anchorProps, panelProps, arrowProps, options } = useFloating({
  shift: true,
  trigger: ['hover', 'focus'],
})

watchEffect(() => {
  options.placement = placement
  options.offset = offset
})
</script>

<template>
  <slot name="trigger" :trigger="anchorProps" />

  <FloatingPanel v-bind="panelProps" class="hover-card">
    <FloatingArrow v-bind="arrowProps" />
    <div class="hover-card__content">
      <slot />
    </div>
  </FloatingPanel>
</template>

<style scoped>
@layer components {
  .hover-card {
    inline-size: min(18rem, calc(100vw - var(--ui-size-viewport-gutter) * 2));
  }

  .hover-card__content {
    padding: var(--ui-sp-4);
    font-size: var(--ui-fs-md);
  }
}
</style>
