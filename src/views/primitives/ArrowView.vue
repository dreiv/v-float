<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import { useFloating, FloatingPanel, FloatingArrow } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import PlaygroundViewport from '@/components/playground/PlaygroundViewport.vue'
import { NumberControl, SelectControl, SwitchControl } from '@/components/playground/controls'
import { placementOptions } from '@/components/playground/placementOptions'
import type { FloatingPlacement } from '@/composables/floating/types'

const { anchorProps, panelProps, arrowProps, options } = useFloating({ placement: 'bottom', offset: 12 })
const showArrow = ref(true)

const panelRef = useTemplateRef('panelRef')
onMounted(() => panelRef.value?.show())
</script>

<template>
  <PlaygroundLayout
    title="Arrow"
    description="The arrow shares the panel's --v-float-anchor-name and centers itself on the anchor's edge with anchor(), rotating per data-placement via a descendant selector — no arrow positioning logic runs in JS."
  >
    <template #viewport>
      <PlaygroundViewport :scrollable="false">
        <button class="playground-anchor" v-bind="anchorProps">Reference</button>
      </PlaygroundViewport>

      <FloatingPanel ref="panelRef" v-bind="panelProps" mode="manual" class="playground-panel">
        <FloatingArrow v-if="showArrow" v-bind="arrowProps" />
        <div class="playground-panel__content">
          <p>Pointing back at the anchor.</p>
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
      <SwitchControl v-model="showArrow" label="Show arrow" />
      <NumberControl v-model="options.offset" label="Offset" :min="4" :max="32" :step="2" />
    </template>
  </PlaygroundLayout>
</template>
