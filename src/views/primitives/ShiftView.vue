<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useFloating, FloatingPanel } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import {
  CheckboxGroupControl,
  NumberControl,
  SelectControl,
  SwitchControl,
} from '@/components/playground/controls'
import { verticalPlacementOptions, triggerOptions } from '@/components/playground/placementOptions'
import { useScrollIntoViewDemo } from '@/composables/playground/useScrollIntoViewDemo'
import type { FloatingPlacement } from '@/composables/floating/types'

const { anchorProps, panelProps, options, open, close } = useFloating({
  placement: 'bottom-start',
  offset: 8,
  shift: true,
  trigger: [],
})

const anchorRef = useTemplateRef<HTMLButtonElement>('anchorRef')
const { scrollToAnchor } = useScrollIntoViewDemo(anchorRef, options.trigger, open, close)
</script>

<template>
  <PlaygroundLayout>
    <template #stage>
      <div class="playground-stage--scroll-area">
        <div class="playground-stage__scroll-target">
          <button ref="anchorRef" class="playground-anchor ui-surface" v-bind="anchorProps">
            Reference
          </button>
        </div>
      </div>

      <FloatingPanel v-bind="panelProps" class="playground-panel">
        <div class="playground-panel__content">
          <p>Clamped to stay in view.</p>
        </div>
      </FloatingPanel>
    </template>

    <template #controls>
      <button type="button" class="playground-controls__action ui-field" @click="scrollToAnchor">
        Scroll to reference
      </button>
      <SelectControl
        :model-value="options.placement"
        label="Placement"
        :options="[...verticalPlacementOptions]"
        @update:model-value="(value) => (options.placement = value as FloatingPlacement)"
      />
      <SwitchControl v-model="options.shift" label="Shift enabled" />
      <NumberControl v-model="options.offset" label="Offset" :min="0" :max="32" :step="2" />
      <CheckboxGroupControl
        v-model="options.trigger"
        label="Trigger"
        :options="[...triggerOptions]"
      />
    </template>
  </PlaygroundLayout>
</template>
