<script setup lang="ts">
import { FloatingPanel } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import PlaygroundStage from '@/components/playground/PlaygroundStage.vue'
import {
  CheckboxGroupControl,
  NumberControl,
  SelectControl,
} from '@/components/playground/controls'
import { placementOptions, triggerOptions } from '@/components/playground/placementOptions'
import { usePlaygroundFloating } from '@/composables/playground/usePlaygroundFloating'

const { anchorProps, panelProps, options } = usePlaygroundFloating({
  placement: 'bottom',
  offset: 8,
})
</script>

<template>
  <PlaygroundLayout>
    <template #stage>
      <PlaygroundStage v-bind="anchorProps" />

      <FloatingPanel v-bind="panelProps" class="playground-panel">
        <div class="playground-panel__content">
          <p>{{ options.offset }}px from the anchor.</p>
        </div>
      </FloatingPanel>
    </template>

    <template #controls>
      <SelectControl v-model="options.placement" label="Placement" :options="placementOptions" />
      <NumberControl v-model="options.offset" label="Offset" :min="0" :max="48" :step="2" />
      <CheckboxGroupControl v-model="options.trigger" label="Trigger" :options="triggerOptions" />
    </template>
  </PlaygroundLayout>
</template>
