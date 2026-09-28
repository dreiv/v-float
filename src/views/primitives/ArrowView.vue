<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { FloatingPanel, FloatingArrow } from '@/components/floating'
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

const { anchorProps, panelProps, arrowProps, options } = usePlaygroundFloating({
  placement: 'bottom',
  offset: 12,
})
const showArrow = ref(true)

const stageRef = useTemplateRef<InstanceType<typeof PlaygroundStage>>('stage')
</script>

<template>
  <PlaygroundLayout>
    <template #stage>
      <PlaygroundStage ref="stage" scroll v-bind="anchorProps" />

      <FloatingPanel v-bind="panelProps" class="playground-panel">
        <FloatingArrow v-if="showArrow" v-bind="arrowProps" />
        <div class="playground-panel__content">
          <p>Pointing back at the anchor.</p>
        </div>
      </FloatingPanel>
    </template>

    <template #controls>
      <UiButton class="playground-controls__action" @click="stageRef?.scrollToAnchor()">
        Scroll to reference
      </UiButton>
      <SelectControl v-model="options.placement" label="Placement" :options="placementOptions" />
      <SwitchControl v-model="showArrow" label="Show arrow" />
      <NumberControl v-model="options.offset" label="Offset" :min="4" :max="32" :step="2" />
      <CheckboxGroupControl v-model="options.trigger" label="Trigger" :options="triggerOptions" />
    </template>
  </PlaygroundLayout>
</template>
