<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useFloating, FloatingPanel } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import PlaygroundViewport from '@/components/playground/PlaygroundViewport.vue'
import {
  CheckboxGroupControl,
  NumberControl,
  SelectControl,
  SwitchControl,
} from '@/components/playground/controls'
import { verticalPlacementOptions, triggerOptions } from '@/components/playground/placementOptions'
import type { FloatingPlacement } from '@/composables/floating/types'

const { anchorProps, panelProps, options, open, close } = useFloating({
  placement: 'bottom-start',
  offset: 8,
  shift: true,
  trigger: [],
})

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
    title="Shift"
    description="[data-shift='true'] clamps the panel's inline position so it doesn't run off the edge of its containing block — the real window, since panels are position: fixed. Scroll this box sideways until the anchor nears a window edge to see the clamp engage. This is documented as a best-effort approximation, not full parity — see utilities.css."
  >
    <template #viewport>
      <PlaygroundViewport axis="horizontal">
        <button class="playground-anchor" v-bind="anchorProps">Reference</button>
      </PlaygroundViewport>

      <FloatingPanel v-bind="panelProps" mode="manual" class="playground-panel">
        <div class="playground-panel__content">
          <p>Clamped to stay in view.</p>
        </div>
      </FloatingPanel>
    </template>

    <template #controls>
      <SwitchControl v-model="options.shift" label="Shift enabled" />
      <SelectControl
        :model-value="options.placement"
        label="Placement"
        :options="[...verticalPlacementOptions]"
        @update:model-value="(value) => (options.placement = value as FloatingPlacement)"
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
