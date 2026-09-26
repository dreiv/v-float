<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useFloating, FloatingPanel } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import PlaygroundViewport from '@/components/playground/PlaygroundViewport.vue'
import { NumberControl, SelectControl } from '@/components/playground/controls'
import { placementOptions, triggerOptions } from '@/components/playground/placementOptions'
import type { FloatingPlacement, FloatingTrigger } from '@/composables/floating/types'

const { anchorProps, panelProps, options, open, close } = useFloating({
  placement: 'bottom',
  offset: 8,
  trigger: 'manual',
})

onMounted(() => {
  if (options.trigger === 'manual') open()
})

watch(
  () => options.trigger,
  (trigger) => (trigger === 'manual' ? open() : close()),
)
</script>

<template>
  <PlaygroundLayout
    title="Offset"
    description="Margin on the placement's logical edge, sized from --ui-offset. Drag the slider — the gap changes live, no JS positioning math involved, just the panel re-reading a custom property."
  >
    <template #viewport>
      <PlaygroundViewport :scrollable="false">
        <button class="playground-anchor" v-bind="anchorProps">Reference</button>
      </PlaygroundViewport>

      <FloatingPanel v-bind="panelProps" mode="manual" class="playground-panel">
        <div class="playground-panel__content">
          <p>{{ options.offset }}px from the anchor.</p>
        </div>
      </FloatingPanel>
    </template>

    <template #controls>
      <NumberControl v-model="options.offset" label="Offset" :min="0" :max="48" :step="2" />
      <SelectControl
        :model-value="options.placement"
        label="Placement"
        :options="[...placementOptions]"
        @update:model-value="(value) => (options.placement = value as FloatingPlacement)"
      />
      <SelectControl
        :model-value="options.trigger"
        label="Trigger"
        :options="[...triggerOptions]"
        @update:model-value="(value) => (options.trigger = value as FloatingTrigger)"
      />
    </template>
  </PlaygroundLayout>
</template>
