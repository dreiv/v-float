<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useFloating, FloatingPanel, FloatingArrow } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import {
  CheckboxGroupControl,
  NumberControl,
  SelectControl,
  SwitchControl,
} from '@/components/playground/controls'
import { placementOptions, triggerOptions } from '@/components/playground/placementOptions'
import type { FloatingPlacement } from '@/composables/floating/types'

const { anchorProps, panelProps, arrowProps, options, open, close } = useFloating({
  placement: 'bottom',
  offset: 12,
  trigger: [],
})
const showArrow = ref(true)

onMounted(() => {
  if (options.trigger.length === 0) open()
})

watch(
  () => options.trigger.length,
  (length) => (length === 0 ? open() : close()),
)
</script>

<template>
  <PlaygroundLayout
    title="Arrow"
    description="The arrow shares the panel's --v-float-anchor-name and centers itself on the anchor's edge with anchor(), rotating per data-placement via a descendant selector — no arrow positioning logic runs in JS."
  >
    <template #stage>
      <div class="playground-stage">
        <button class="playground-anchor" v-bind="anchorProps">Reference</button>
      </div>

      <FloatingPanel v-bind="panelProps" class="playground-panel">
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
      <CheckboxGroupControl
        v-model="options.trigger"
        label="Trigger"
        :options="[...triggerOptions]"
      />
    </template>
  </PlaygroundLayout>
</template>
