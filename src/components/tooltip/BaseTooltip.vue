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
