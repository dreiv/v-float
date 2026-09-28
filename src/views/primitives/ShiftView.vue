<script setup lang="ts">
import { useTemplateRef } from 'vue'
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
import { verticalPlacementOptions, triggerOptions } from '@/components/playground/placementOptions'
import { usePlaygroundFloating } from '@/composables/playground/usePlaygroundFloating'

const { anchorProps, panelProps, options } = usePlaygroundFloating({
  placement: 'bottom-start',
  offset: 8,
  shift: true,
})

const stageRef = useTemplateRef<InstanceType<typeof PlaygroundStage>>('stage')
</script>

<template>
  <PlaygroundLayout>
    <template #stage>
      <PlaygroundStage ref="stage" scroll v-bind="anchorProps" />

      <FloatingPanel v-bind="panelProps" class="playground-panel">
        <div class="playground-panel__content">
          <p>Clamped to stay in view.</p>
        </div>
      </FloatingPanel>
    </template>

    <template #controls>
      <UiButton class="playground-controls__action" @click="stageRef?.scrollToAnchor()">
        Scroll to reference
      </UiButton>
      <SelectControl
        v-model="options.placement"
        label="Placement"
        :options="verticalPlacementOptions"
      />
      <SwitchControl v-model="options.shift" label="Shift enabled" />
      <NumberControl v-model="options.offset" label="Offset" :min="0" :max="32" :step="2" />
      <CheckboxGroupControl v-model="options.trigger" label="Trigger" :options="triggerOptions" />
    </template>
  </PlaygroundLayout>
</template>
