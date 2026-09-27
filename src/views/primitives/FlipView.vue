<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useFloating, FloatingPanel } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import {
  CheckboxGroupControl,
  NumberControl,
  SelectControl,
  SwitchControl,
} from '@/components/playground/controls'
import { placementOptions, triggerOptions } from '@/components/playground/placementOptions'
import { useScrollCenteredDemo } from '@/composables/playground/useScrollCenteredDemo'
import type { FloatingPlacement } from '@/composables/floating/types'

const { anchorProps, panelProps, options, open, close } = useFloating({
  placement: 'bottom',
  offset: 8,
  trigger: [],
})

const hideEnabled = computed({
  get: () => options.hide !== false,
  set: (value: boolean) => (options.hide = value),
})

const anchorRef = useTemplateRef<HTMLButtonElement>('anchorRef')
const { scrollToCenter } = useScrollCenteredDemo(anchorRef, options.trigger, open, close)
</script>

<template>
  <PlaygroundLayout
    title="Flip"
    description="position-try-fallbacks swaps to the opposite side when the preferred one won't fit against the real browser window — the only containing block a top-layer popover panel ever measures against. Scroll the page toward an edge of this 2x-viewport stage to watch it flip. Shown by default; toggle hide separately to see that primitive combined with flip."
  >
    <template #stage>
      <div class="playground-stage--scroll-area">
        <div class="playground-stage__scroll-target">
          <button ref="anchorRef" class="playground-anchor" v-bind="anchorProps">Reference</button>
        </div>
      </div>

      <FloatingPanel v-bind="panelProps" class="playground-panel">
        <div class="playground-panel__content">
          <p>Flips to stay on screen.</p>
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
        description="Which side of the anchor the panel prefers to appear on."
        :options="[...placementOptions]"
        @update:model-value="(value) => (options.placement = value as FloatingPlacement)"
      />
      <SwitchControl
        v-model="options.flip"
        label="Flip enabled"
        description="Try the opposite side via position-try-fallbacks when the preferred side overflows."
      />
      <SwitchControl
        v-model="hideEnabled"
        label="Hide when out of view"
        description="Combine with position-visibility: anchors-visible to hide instead of flip."
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
