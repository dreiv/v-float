<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFloating, FloatingPanel } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import {
  CheckboxGroupControl,
  NumberControl,
  SelectControl,
  SwitchControl,
} from '@/components/playground/controls'
import { verticalPlacementOptions, triggerOptions } from '@/components/playground/placementOptions'
import { useDemoAutoOpen } from '@/composables/playground/useDemoAutoOpen'
import type { FloatingPlacement } from '@/composables/floating/types'

const { anchorProps, panelProps, options, open, close } = useFloating({
  placement: 'bottom-start',
  offset: 8,
  shift: true,
  trigger: [],
})

const anchorX = ref(50)

const anchorStyle = computed(() => ({
  ...(anchorProps.value.style as Record<string, string>),
  left: `${anchorX.value}%`,
}))

useDemoAutoOpen(options.trigger, open, close)
</script>

<template>
  <PlaygroundLayout
    title="Shift"
    description="[data-shift='true'] clamps the panel's inline position so it doesn't run off the edge of the real window — panels are position: fixed, so the real window is the only containing block a top-layer popover ever measures against. Drag the reference toward a horizontal edge to see the clamp engage. This is documented as a best-effort approximation, not full parity — see utilities.css."
  >
    <template #stage>
      <div class="playground-stage playground-stage--free">
        <button
          class="playground-anchor playground-anchor--free"
          v-bind="{ ...anchorProps, style: anchorStyle }"
        >
          Reference
        </button>
      </div>

      <FloatingPanel v-bind="panelProps" class="playground-panel">
        <div class="playground-panel__content">
          <p>Clamped to stay in view.</p>
        </div>
      </FloatingPanel>
    </template>

    <template #controls>
      <SelectControl
        :model-value="options.placement"
        label="Placement"
        :options="[...verticalPlacementOptions]"
        @update:model-value="(value) => (options.placement = value as FloatingPlacement)"
      />
      <SwitchControl v-model="options.shift" label="Shift enabled" />
      <NumberControl v-model="options.offset" label="Offset" :min="0" :max="32" :step="2" />
      <NumberControl
        v-model="anchorX"
        label="Reference position (horizontal %)"
        :min="0"
        :max="100"
        :step="1"
      />
      <CheckboxGroupControl
        v-model="options.trigger"
        label="Trigger"
        :options="[...triggerOptions]"
      />
    </template>
  </PlaygroundLayout>
</template>
