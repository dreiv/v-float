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
import { placementOptions, triggerOptions } from '@/components/playground/placementOptions'
import { useDemoAutoOpen } from '@/composables/playground/useDemoAutoOpen'
import type { FloatingPlacement } from '@/composables/floating/types'

const { anchorProps, panelProps, options, open, close } = useFloating({
  placement: 'bottom',
  offset: 8,
  hide: true,
  trigger: [],
})

const anchorX = ref(50)
const anchorY = ref(50)

const hideEnabled = computed({
  get: () => options.hide !== false,
  set: (value: boolean) => (options.hide = value),
})

const anchorStyle = computed(() => ({
  ...(anchorProps.value.style as Record<string, string>),
  left: `${anchorX.value}%`,
  top: `${anchorY.value}%`,
}))

useDemoAutoOpen(options.trigger, open, close)
</script>

<template>
  <PlaygroundLayout
    title="Flip"
    description="position-try-fallbacks swaps to the opposite side when the preferred one won't fit against the real browser window — the only containing block a top-layer popover panel ever measures against. Drag the reference near a window edge to watch it flip."
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
          <p>Flips to stay on screen.</p>
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
      <SwitchControl v-model="options.flip" label="Flip enabled" />
      <SwitchControl v-model="hideEnabled" label="Hide when out of view" />
      <NumberControl v-model="options.offset" label="Offset" :min="0" :max="32" :step="2" />
      <NumberControl
        v-model="anchorX"
        label="Reference position (horizontal %)"
        :min="0"
        :max="100"
        :step="1"
      />
      <NumberControl
        v-model="anchorY"
        label="Reference position (vertical %)"
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
