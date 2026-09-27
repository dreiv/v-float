<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useFloating, FloatingPanel } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import {
  CheckboxGroupControl,
  NumberControl,
  SelectControl,
} from '@/components/playground/controls'
import {
  hideModeOptions,
  placementOptions,
  triggerOptions,
} from '@/components/playground/placementOptions'
import { useScrollIntoViewDemo } from '@/composables/playground/useScrollIntoViewDemo'
import type { FloatingHideMode, FloatingPlacement } from '@/composables/floating/types'

function parseHideMode(value: string): FloatingHideMode {
  if (value === 'false') return false
  if (value === 'true') return true
  return value as FloatingHideMode
}

const { anchorProps, panelProps, options, open, close } = useFloating({
  placement: 'right',
  offset: 8,
  hide: true,
  trigger: [],
})

const hideModeValue = computed(() => String(options.hide))
const anchorRef = useTemplateRef<HTMLButtonElement>('anchorRef')
const { scrollToAnchor } = useScrollIntoViewDemo(anchorRef, options.trigger, open, close)
</script>

<template>
  <PlaygroundLayout>
    <template #stage>
      <div class="playground-stage--scroll-area">
        <div class="playground-stage__scroll-target">
          <button ref="anchorRef" class="playground-anchor" v-bind="anchorProps">
            Reference
          </button>
        </div>
      </div>

      <FloatingPanel v-bind="panelProps" class="playground-panel">
        <div class="playground-panel__content">
          <p>Hides when the reference scrolls out of view, and reappears once it's back.</p>
        </div>
      </FloatingPanel>
    </template>

    <template #controls>
      <button type="button" class="playground-controls__action" @click="scrollToAnchor">
        Scroll to reference
      </button>
      <SelectControl :model-value="options.placement" label="Placement" :options="[...placementOptions]"
        @update:model-value="(value) => (options.placement = value as FloatingPlacement)" />
      <SelectControl :model-value="hideModeValue" label="Hide mode" :options="[...hideModeOptions]"
        @update:model-value="(value) => (options.hide = parseHideMode(value))" />
      <NumberControl v-model="options.offset" label="Offset" :min="0" :max="32" :step="2" />
      <CheckboxGroupControl v-model="options.trigger" label="Trigger" :options="[...triggerOptions]" />
    </template>
  </PlaygroundLayout>
</template>
