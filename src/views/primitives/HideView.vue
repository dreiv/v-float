<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useFloating, FloatingPanel } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import {
  CheckboxGroupControl,
  NumberControl,
  SelectControl,
} from '@/components/playground/controls'
import {
  hideModeOptions,
  placementOptions,
  triggerOptions,
} from '@/components/playground/placementOptions'
import { useDemoAutoOpen } from '@/composables/playground/useDemoAutoOpen'
import type { FloatingHideMode, FloatingPlacement } from '@/composables/floating/types'

function parseHideMode(value: string): FloatingHideMode {
  if (value === 'false') return false
  if (value === 'true') return true
  return value as FloatingHideMode
}

const { anchorProps, panelProps, options, open, close } = useFloating({
  placement: 'right',
  offset: 8,
  hide: true,
  trigger: [],
})

const hideModeValue = computed(() => String(options.hide))
const anchorRef = useTemplateRef<HTMLButtonElement>('anchorRef')

function scrollToAnchor() {
  anchorRef.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

useDemoAutoOpen(options.trigger, open, close)
</script>

<template>
  <PlaygroundLayout
    title="Hide"
    description="[data-hide] sets position-visibility, which tracks the anchor's visibility within its nearest scrollable ancestor — unlike Flip/Shift, that's a real containing box regardless of the popover top layer, and here it's the page itself. Scroll the reference out of the window to watch the panel disappear, then scroll it back."
  >
    <template #stage>
      <div class="playground-stage playground-stage--scroll">
        <button type="button" class="playground-stage__scroll-to" @click="scrollToAnchor">
          Scroll to reference
        </button>
        <div class="playground-stage__spacer" />
        <button ref="anchorRef" class="playground-anchor" v-bind="anchorProps">Reference</button>
        <div class="playground-stage__spacer" />
      </div>

      <FloatingPanel v-bind="panelProps" class="playground-panel">
        <div class="playground-panel__content">
          <p>Hidden once the anchor scrolls out of view.</p>
        </div>
      </FloatingPanel>
    </template>

    <template #controls>
      <SelectControl
        :model-value="options.placement"
        label="Placement"
        :options="[...placementOptions]"
        @update:model-value="(value) => (options.placement = value as FloatingPlacement)"
      />
      <SelectControl
        :model-value="hideModeValue"
        label="Hide mode"
        :options="[...hideModeOptions]"
        @update:model-value="(value) => (options.hide = parseHideMode(value))"
      />
      <NumberControl v-model="options.offset" label="Offset" :min="0" :max="32" :step="2" />
      <CheckboxGroupControl
        v-model="options.trigger"
        label="Trigger"
        :options="[...triggerOptions]"
      />
    </template>
  </PlaygroundLayout>
</template>
