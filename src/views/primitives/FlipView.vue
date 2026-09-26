<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useFloating, FloatingPanel } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import PlaygroundViewport from '@/components/playground/PlaygroundViewport.vue'
import { NumberControl, SelectControl, SwitchControl } from '@/components/playground/controls'
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
    title="Flip"
    description="position-try-fallbacks swaps to the opposite side when the preferred one won't fit. Panels here are position: fixed, so the boundary is the real browser window — scroll this box until the anchor nears the window's top or bottom edge (not just this box's edge) to see it flip."
  >
    <template #viewport>
      <PlaygroundViewport axis="vertical">
        <button class="playground-anchor" v-bind="anchorProps">Reference</button>
      </PlaygroundViewport>

      <FloatingPanel v-bind="panelProps" mode="manual" class="playground-panel">
        <div class="playground-panel__content">
          <p>Flips to stay on screen.</p>
        </div>
      </FloatingPanel>
    </template>

    <template #controls>
      <SelectControl
        :model-value="options.placement"
        label="Preferred placement"
        :options="[...placementOptions]"
        @update:model-value="(value) => (options.placement = value as FloatingPlacement)"
      />
      <SwitchControl v-model="options.flip" label="Flip enabled" />
      <NumberControl v-model="options.offset" label="Offset" :min="0" :max="32" :step="2" />
      <SelectControl
        :model-value="options.trigger"
        label="Trigger"
        :options="[...triggerOptions]"
        @update:model-value="(value) => (options.trigger = value as FloatingTrigger)"
      />
    </template>
  </PlaygroundLayout>
</template>
