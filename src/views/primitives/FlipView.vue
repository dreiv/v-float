<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useFloating, FloatingPanel } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import {
  CheckboxGroupControl,
  NumberControl,
  SelectControl,
  SwitchControl,
} from '@/components/playground/controls'
import { placementOptions, triggerOptions } from '@/components/playground/placementOptions'
import { useScrollIntoViewDemo } from '@/composables/playground/useScrollIntoViewDemo'
import type { FloatingPlacement } from '@/composables/floating/types'

const { anchorProps, panelProps, options, open, close } = useFloating({
  placement: 'bottom',
  offset: 8,
  trigger: [],
})

const hideEnabled = computed({
  get: () => options.hide !== false,
  set: (value: boolean) => (options.hide = value),
})

const anchorRef = useTemplateRef<HTMLButtonElement>('anchorRef')
const { scrollToAnchor } = useScrollIntoViewDemo(anchorRef, options.trigger, open, close)
</script>

<template>
  <PlaygroundLayout>
    <template #stage>
      <div class="playground-stage--scroll-area">
        <div class="playground-stage__scroll-target">
          <button ref="anchorRef" class="playground-anchor" v-bind="anchorProps">Reference</button>
        </div>
      </div>

      <FloatingPanel v-bind="panelProps" class="playground-panel">
        <div class="playground-panel__content">
          <p>Flips to stay on screen.</p>
        </div>
      </FloatingPanel>
    </template>

    <template #controls>
      <button type="button" class="playground-controls__action" @click="scrollToAnchor">
        Scroll to reference
      </button>
      <SelectControl
        :model-value="options.placement"
        label="Placement"
        :options="[...placementOptions]"
        @update:model-value="(value) => (options.placement = value as FloatingPlacement)"
      />
      <SwitchControl v-model="options.flip" label="Flip enabled" />
      <SwitchControl v-model="hideEnabled" label="Hide when out of view" />
      <NumberControl v-model="options.offset" label="Offset" :min="0" :max="32" :step="2" />
      <CheckboxGroupControl
        v-model="options.trigger"
        label="Trigger"
        :options="[...triggerOptions]"
      />
    </template>
  </PlaygroundLayout>
</template>
