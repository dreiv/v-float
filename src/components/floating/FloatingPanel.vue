<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
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
  style?: Record<string, string>
  placement?: FloatingPlacement
  mode?: FloatingPopoverMode
  flip?: boolean
  shift?: boolean
  hide?: FloatingHideMode
  autoSize?: boolean
  as?: string
}>()

const panelEl = useTemplateRef<
  HTMLElement & { showPopover?: () => void; hidePopover?: () => void; togglePopover?: () => void }
>('panelEl')

const hideAttr = computed(() => (hide === false ? undefined : String(hide)))

defineExpose({
  show: () => panelEl.value?.showPopover?.(),
  hide: () => panelEl.value?.hidePopover?.(),
  toggle: () => panelEl.value?.togglePopover?.(),
  el: panelEl,
})
</script>

<template>
  <component
    :is="as"
    ref="panelEl"
    class="v-float-panel"
    :popover="mode"
    :style="style"
    :data-placement="placement"
    :data-flip="flip"
    :data-shift="shift || undefined"
    :data-hide="hideAttr"
    :data-auto-size="autoSize || undefined"
  >
    <slot />
  </component>
</template>
