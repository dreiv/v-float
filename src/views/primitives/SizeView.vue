<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { FloatingPanel } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import PlaygroundStage from '@/components/playground/PlaygroundStage.vue'
import UiButton from '@/components/ui/UiButton.vue'
import {
  CheckboxGroupControl,
  NumberControl,
  SelectControl,
  SwitchControl,
} from '@/components/playground/controls'
import { placementOptions, triggerOptions } from '@/components/playground/placementOptions'
import { usePlaygroundFloating } from '@/composables/playground/usePlaygroundFloating'

const contentOptions = [
  { value: 'short', label: 'Short' },
  { value: 'long', label: 'Long (forces scroll)' },
] as const

const { anchorProps, panelProps, options } = usePlaygroundFloating({
  placement: 'bottom',
  offset: 8,
  autoSize: true,
})

const contentLength = ref<(typeof contentOptions)[number]['value']>('short')

const stageRef = useTemplateRef<InstanceType<typeof PlaygroundStage>>('stage')
</script>

<template>
  <PlaygroundLayout>
    <template #stage>
      <PlaygroundStage ref="stage" scroll v-bind="anchorProps" />

      <FloatingPanel v-bind="panelProps" class="playground-panel">
        <div
          class="playground-panel__content"
          :class="{ 'playground-panel__content--long': contentLength === 'long' }"
        >
          <p>Capped to a viewport-relative max width and height.</p>
          <template v-if="contentLength === 'long'">
            <p>
              Long content clamps to a viewport-relative max-height and scrolls instead of
              overflowing the window.
            </p>
            <p>Scroll within this panel to see the rest.</p>
            <p>One more line to make sure it actually overflows on most screens.</p>
            <p>And a little more, just to be safe.</p>
          </template>
        </div>
      </FloatingPanel>
    </template>

    <template #controls>
      <UiButton class="playground-controls__action" @click="stageRef?.scrollToAnchor()">
        Scroll to reference
      </UiButton>
      <SelectControl v-model="options.placement" label="Placement" :options="placementOptions" />
      <SwitchControl v-model="options.autoSize" label="Cap panel size" />
      <NumberControl v-model="options.offset" label="Offset" :min="0" :max="48" :step="2" />
      <SelectControl v-model="contentLength" label="Content" :options="contentOptions" />
      <CheckboxGroupControl v-model="options.trigger" label="Trigger" :options="triggerOptions" />
    </template>
  </PlaygroundLayout>
</template>
