<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useFloating, FloatingPanel } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import {
  CheckboxGroupControl,
  NumberControl,
  SelectControl,
  SwitchControl,
} from '@/components/playground/controls'
import { verticalPlacementOptions, triggerOptions } from '@/components/playground/placementOptions'
import { useScrollCenteredDemo } from '@/composables/playground/useScrollCenteredDemo'
import type { FloatingPlacement } from '@/composables/floating/types'

const { anchorProps, panelProps, options, open, close } = useFloating({
  placement: 'bottom-start',
  offset: 8,
  shift: true,
  trigger: [],
})

const anchorRef = useTemplateRef<HTMLButtonElement>('anchorRef')
const { scrollToCenter } = useScrollCenteredDemo(anchorRef, options.trigger, open, close)
</script>

<template>
  <PlaygroundLayout
    title="Shift"
    description="[data-shift='true'] clamps the panel's inline position so it doesn't run off the edge of the real window — panels are position: fixed, so the real window is the only containing block a top-layer popover ever measures against. Scroll the page toward a horizontal edge of this 2x-viewport stage to see the clamp engage. This is documented as a best-effort approximation, not full parity — see utilities.css."
  >
    <template #stage>
      <div class="playground-stage--scroll-area">
        <div class="playground-stage__scroll-target">
          <button ref="anchorRef" class="playground-anchor" v-bind="anchorProps">Reference</button>
        </div>
      </div>

      <FloatingPanel v-bind="panelProps" class="playground-panel">
        <div class="playground-panel__content">
          <p>Clamped to stay in view.</p>
        </div>
      </FloatingPanel>
    </template>

    <template #controls>
      <button type="button" class="playground-controls__action" @click="scrollToCenter">
        Scroll to center
      </button>
      <SelectControl
        :model-value="options.placement"
        label="Placement"
        description="Top/bottom only — shift clamps the inline axis, so vertical side is what's left to pick."
        :options="[...verticalPlacementOptions]"
        @update:model-value="(value) => (options.placement = value as FloatingPlacement)"
      />
      <SwitchControl
        v-model="options.shift"
        label="Shift enabled"
        description="Clamp the panel's inline position so it can't run off the window edge."
      />
      <NumberControl
        v-model="options.offset"
        label="Offset"
        description="Gap between the anchor and the panel, in pixels."
        :min="0"
        :max="32"
        :step="2"
      />
      <CheckboxGroupControl
        v-model="options.trigger"
        label="Trigger"
        description="How the panel is opened: click toggles it, hover opens on mouseenter, focus opens on focus."
        :options="[...triggerOptions]"
      />
    </template>
  </PlaygroundLayout>
</template>
