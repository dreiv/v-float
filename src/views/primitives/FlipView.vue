<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { useFloating, FloatingPanel } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import PlaygroundViewport from '@/components/playground/PlaygroundViewport.vue'
import { NumberControl, SelectControl, SwitchControl } from '@/components/playground/controls'
import { placementOptions } from '@/components/playground/placementOptions'
import type { FloatingPlacement } from '@/composables/floating/types'

const { anchorProps, panelProps, options } = useFloating({ placement: 'bottom', offset: 8 })

const panelRef = useTemplateRef('panelRef')
onMounted(() => panelRef.value?.show())
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

      <FloatingPanel ref="panelRef" v-bind="panelProps" mode="manual" class="playground-panel">
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
    </template>
  </PlaygroundLayout>
</template>
