<script setup lang="ts">
import { ref } from 'vue'
import { useFloating, FloatingPanel } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import {
  CheckboxGroupControl,
  NumberControl,
  SelectControl,
  SwitchControl,
} from '@/components/playground/controls'
import { placementOptions, triggerOptions } from '@/components/playground/placementOptions'
import { useDemoAutoOpen } from '@/composables/playground/useDemoAutoOpen'
import type { FloatingPlacement } from '@/composables/floating/types'

const { anchorProps, panelProps, options, open, close } = useFloating({
  placement: 'bottom',
  offset: 8,
  autoSize: true,
  trigger: [],
})

const contentLength = ref<'short' | 'long'>('short')
const contentOptions = [
  { value: 'short', label: 'Short' },
  { value: 'long', label: 'Long (forces scroll)' },
]

useDemoAutoOpen(options.trigger, open, close)
</script>

<template>
  <PlaygroundLayout
    title="Size"
    description="[data-auto-size='true'] caps the panel's own max-width/max-height to the available viewport space, with overflow: auto once content exceeds it. anchor() can't express 'space remaining to the edge' since it's restricted to inset properties, so this is a plain viewport-relative ceiling rather than a true available-space calculation."
  >
    <template #stage>
      <div class="playground-stage">
        <button class="playground-anchor" v-bind="anchorProps">Reference</button>
      </div>

      <FloatingPanel v-bind="panelProps" class="playground-panel">
        <div
          class="playground-panel__content"
          :class="{ 'playground-panel__content--long': contentLength === 'long' }"
        >
          <p>Capped to a viewport-relative max width and height.</p>
          <template v-if="contentLength === 'long'">
            <p>
              Long content clamps to a viewport-relative max-height and scrolls instead of
              overflowing the window.
            </p>
            <p>Scroll within this panel to see the rest.</p>
            <p>One more line to make sure it actually overflows on most screens.</p>
            <p>And a little more, just to be safe.</p>
          </template>
        </div>
      </FloatingPanel>
    </template>

    <template #controls>
      <SelectControl
        :model-value="options.placement"
        label="Placement"
        description="Which side of the anchor the panel appears on."
        :options="[...placementOptions]"
        @update:model-value="(value) => (options.placement = value as FloatingPlacement)"
      />
      <SwitchControl
        v-model="options.autoSize"
        label="Cap panel size"
        description="Cap the panel's max width/height to the available viewport space."
      />
      <NumberControl
        v-model="options.offset"
        label="Offset"
        description="Gap between the anchor and the panel, in pixels."
        :min="0"
        :max="48"
        :step="2"
      />
      <SelectControl
        :model-value="contentLength"
        label="Content"
        description="Swap in longer content to force the panel to scroll internally."
        :options="contentOptions"
        @update:model-value="(value) => (contentLength = value as 'short' | 'long')"
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
