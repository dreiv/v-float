<script setup lang="ts">
import { useFloating, FloatingPanel } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import {
  CheckboxGroupControl,
  NumberControl,
  SelectControl,
} from '@/components/playground/controls'
import { placementOptions, triggerOptions } from '@/components/playground/placementOptions'
import { useDemoAutoOpen } from '@/composables/playground/useDemoAutoOpen'
import type { FloatingPlacement } from '@/composables/floating/types'

const { anchorProps, panelProps, options, open, close } = useFloating({
  placement: 'bottom',
  offset: 8,
  trigger: [],
})

useDemoAutoOpen(options.trigger, open, close)
</script>

<template>
  <PlaygroundLayout
    title="Offset"
    description="Margin on the placement's logical edge, sized from --ui-offset. Drag the slider — the gap changes live, no JS positioning math involved, just the panel re-reading a custom property."
  >
    <template #stage>
      <div class="playground-stage">
        <button class="playground-anchor" v-bind="anchorProps">Reference</button>
      </div>

      <FloatingPanel v-bind="panelProps" class="playground-panel">
        <div class="playground-panel__content">
          <p>{{ options.offset }}px from the anchor.</p>
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
      <NumberControl v-model="options.offset" label="Offset" :min="0" :max="48" :step="2" />
      <CheckboxGroupControl
        v-model="options.trigger"
        label="Trigger"
        :options="[...triggerOptions]"
      />
    </template>
  </PlaygroundLayout>
</template>
