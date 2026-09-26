<script setup lang="ts">
/**
 * FloatingPanel
 * ---------------------------------------------------------------------------
 * Thin wrapper around a native `popover` element. Every actual positioning
 * behavior — offset, flip, shift, size, hide — lives in
 * `src/styles/floating/*.css`; this component's only job is rendering the
 * right tag/attributes and forwarding the anchor link + strategy options as
 * data attributes those stylesheets select on.
 *
 * Imperative open/close goes through the native popover API
 * (`showPopover`/`hidePopover`/`togglePopover`), exposed here so a parent
 * can call `panelRef.value?.show()` etc. without reaching into the DOM.
 */
import { computed, useTemplateRef } from 'vue'
import type { FloatingHideMode, FloatingPlacement, FloatingPopoverMode } from '@/composables/floating/types'

const props = withDefaults(
  defineProps<{
    /** The `--v-float-anchor-name` this panel binds to (from useFloating). */
    style?: Record<string, string>
    placement?: FloatingPlacement
    /** `auto` (light-dismiss, one-at-a-time) or `manual` (co-existing). */
    mode?: FloatingPopoverMode
    flip?: boolean
    shift?: boolean
    hide?: FloatingHideMode
    autoSize?: boolean
    /** Element tag to render. `div` covers almost every case. */
    as?: string
  }>(),
  {
    placement: 'bottom',
    mode: 'auto',
    flip: true,
    shift: false,
    hide: false,
    autoSize: false,
    as: 'div',
  },
)

const panelEl = useTemplateRef<HTMLElement & { showPopover?: () => void; hidePopover?: () => void; togglePopover?: () => void }>('panelEl')

const hideAttr = computed(() => (props.hide === false ? undefined : String(props.hide)))

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
