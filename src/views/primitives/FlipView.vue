<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useFloating } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import PlaygroundViewport from '@/components/playground/PlaygroundViewport.vue'
import {
  CheckboxGroupControl,
  NumberControl,
  SelectControl,
  SwitchControl,
} from '@/components/playground/controls'
import { placementOptions, triggerOptions } from '@/components/playground/placementOptions'
import type { FloatingPlacement } from '@/composables/floating/types'

type ViewportHandle = { el: HTMLElement | null; recenter: () => void }

const BLOCK_OPPOSITE: Partial<Record<FloatingPlacement, FloatingPlacement>> = {
  top: 'bottom',
  'top-start': 'bottom-start',
  'top-end': 'bottom-end',
  bottom: 'top',
  'bottom-start': 'top-start',
  'bottom-end': 'top-end',
}

const INLINE_OPPOSITE: Partial<Record<FloatingPlacement, FloatingPlacement>> = {
  left: 'right',
  right: 'left',
}

const { anchorName, options } = useFloating({
  placement: 'bottom',
  offset: 8,
  hide: true,
  trigger: [],
})

const isOpen = ref(true)
const containerAware = ref(true)
const effectivePlacement = ref<FloatingPlacement>(options.placement)

const viewportRef = useTemplateRef<ViewportHandle>('viewportRef')
const anchorRef = useTemplateRef<HTMLButtonElement>('anchorRef')
const panelRef = useTemplateRef<HTMLDivElement>('panelRef')

const styleVars = computed(() => ({
  '--v-float-anchor-name': anchorName,
  '--ui-offset': `${options.offset}px`,
}))

const hideEnabled = computed({
  get: () => options.hide !== false,
  set: (value: boolean) => (options.hide = value),
})

const hideAttr = computed(() => (options.hide === false ? undefined : String(options.hide)))

const dataPlacement = computed(() =>
  containerAware.value ? effectivePlacement.value : options.placement,
)

const anchorProps = computed(() => {
  const props: Record<string, unknown> = {
    style: styleVars.value,
    'data-floating-anchor': '',
  }
  if (options.trigger.includes('click')) props.onClick = () => (isOpen.value = !isOpen.value)
  if (options.trigger.includes('hover')) {
    props.onMouseenter = () => (isOpen.value = true)
    props.onMouseleave = () => (isOpen.value = false)
  }
  if (options.trigger.includes('focus')) {
    props.onFocus = () => (isOpen.value = true)
    props.onBlur = () => (isOpen.value = false)
  }
  return props
})

function recalcFlip() {
  effectivePlacement.value = options.placement
  if (!options.flip || !containerAware.value) return

  const container = viewportRef.value?.el
  const anchor = anchorRef.value
  const panel = panelRef.value
  if (!container || !anchor || !panel) return

  const containerRect = container.getBoundingClientRect()
  const anchorRect = anchor.getBoundingClientRect()
  const panelRect = panel.getBoundingClientRect()
  const placement = options.placement

  if (placement in BLOCK_OPPOSITE) {
    const spaceBelow = containerRect.bottom - anchorRect.bottom
    const spaceAbove = anchorRect.top - containerRect.top
    const wantsBottom = placement.startsWith('bottom')
    const space = wantsBottom ? spaceBelow : spaceAbove
    const opposite = wantsBottom ? spaceAbove : spaceBelow
    if (panelRect.height + options.offset > space && opposite > space) {
      effectivePlacement.value = BLOCK_OPPOSITE[placement]!
    }
  } else if (placement in INLINE_OPPOSITE) {
    const spaceRight = containerRect.right - anchorRect.right
    const spaceLeft = anchorRect.left - containerRect.left
    const wantsRight = placement === 'right'
    const space = wantsRight ? spaceRight : spaceLeft
    const opposite = wantsRight ? spaceLeft : spaceRight
    if (panelRect.width + options.offset > space && opposite > space) {
      effectivePlacement.value = INLINE_OPPOSITE[placement]!
    }
  }
}

let ticking = false
function onViewportChange() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    recalcFlip()
    ticking = false
  })
}

onMounted(async () => {
  isOpen.value = options.trigger.length === 0
  await nextTick()
  viewportRef.value?.el?.addEventListener('scroll', onViewportChange, { passive: true })
  window.addEventListener('resize', onViewportChange)
  recalcFlip()
})

onBeforeUnmount(() => {
  viewportRef.value?.el?.removeEventListener('scroll', onViewportChange)
  window.removeEventListener('resize', onViewportChange)
})

watch(
  () => options.trigger.length,
  (length) => (isOpen.value = length === 0),
)

watch(() => [options.placement, options.offset, options.flip, containerAware.value], recalcFlip)
</script>

<template>
  <PlaygroundLayout
    title="Flip"
    description="position-try-fallbacks swaps to the opposite side when the preferred one won't fit, but that check runs against the real browser window, not this box. With 'account for nested scroll container' on, a small JS measurement re-checks available space inside this box on every scroll/resize and swaps data-placement pre-emptively — position-area and the offset math are still plain CSS, only the flip decision itself is computed. Turn it off to see the native, window-relative behavior instead."
  >
    <template #viewport>
      <PlaygroundViewport ref="viewportRef" axis="both">
        <button ref="anchorRef" class="playground-anchor" v-bind="anchorProps">Reference</button>

        <div
          ref="panelRef"
          v-show="isOpen"
          class="v-float-panel playground-panel"
          :style="styleVars"
          :data-placement="dataPlacement"
          :data-flip="options.flip"
          :data-hide="hideAttr"
        >
          <div class="playground-panel__content">
            <p>Flips to stay on screen.</p>
          </div>
        </div>
      </PlaygroundViewport>
    </template>

    <template #controls>
      <SelectControl
        :model-value="options.placement"
        label="Preferred placement"
        :options="[...placementOptions]"
        @update:model-value="(value) => (options.placement = value as FloatingPlacement)"
      />
      <SwitchControl v-model="options.flip" label="Flip enabled" />
      <SwitchControl v-model="containerAware" label="Account for nested scroll container" />
      <SwitchControl v-model="hideEnabled" label="Hide when out of view" />
      <NumberControl v-model="options.offset" label="Offset" :min="0" :max="32" :step="2" />
      <CheckboxGroupControl
        v-model="options.trigger"
        label="Trigger"
        :options="[...triggerOptions]"
      />
    </template>
  </PlaygroundLayout>
</template>

<style scoped>
.playground-panel {
  position: absolute;
  opacity: 1;
  transform: none;
}
</style>
