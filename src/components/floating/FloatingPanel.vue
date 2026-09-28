<script setup lang="ts">
import type {
  FloatingHideMode,
  FloatingPlacement,
  FloatingPopoverMode,
} from '@/composables/floating/types'

const {
  placement = 'bottom',
  mode = 'auto',
  flip = true,
  shift = false,
  hide = false,
  autoSize = false,
  as = 'div',
} = defineProps<{
  placement?: FloatingPlacement
  mode?: FloatingPopoverMode
  flip?: boolean
  shift?: boolean
  hide?: FloatingHideMode
  autoSize?: boolean
  as?: string
}>()
</script>

<template>
  <component
    :is="as"
    class="v-float-panel"
    :popover="mode"
    :data-placement="placement"
    :data-flip="flip"
    :data-shift="shift || undefined"
    :data-hide="hide === false ? undefined : String(hide)"
    :data-auto-size="autoSize || undefined"
  >
    <slot />
  </component>
</template>
