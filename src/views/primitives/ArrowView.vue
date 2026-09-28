<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useFloating, FloatingPanel, FloatingArrow } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import UiButton from '@/components/ui/UiButton.vue'
import {
  CheckboxGroupControl,
  NumberControl,
  SelectControl,
  SwitchControl,
} from '@/components/playground/controls'
import { placementOptions, triggerOptions } from '@/components/playground/placementOptions'
import { useScrollIntoViewDemo } from '@/composables/playground/useScrollIntoViewDemo'
import type { FloatingPlacement } from '@/composables/floating/types'

const { anchorProps, panelProps, arrowProps, options, open, close } = useFloating({
  placement: 'bottom',
  offset: 12,
  trigger: [],
})
const showArrow = ref(true)

const anchorRef = useTemplateRef<InstanceType<typeof UiButton>>('anchorRef')
const { scrollToAnchor } = useScrollIntoViewDemo(anchorRef, options.trigger, open, close)
</script>

<template>
  <PlaygroundLayout>
    <template #stage>
      <div class="playground-stage--scroll-area">
        <div class="playground-stage__scroll-target">
          <UiButton ref="anchorRef" class="playground-anchor" v-bind="anchorProps"
            >Reference</UiButton
          >
        </div>
      </div>

      <FloatingPanel v-bind="panelProps" class="playground-panel">
        <FloatingArrow v-if="showArrow" v-bind="arrowProps" />
        <div class="playground-panel__content">
          <p>Pointing back at the anchor.</p>
        </div>
      </FloatingPanel>
    </template>

    <template #controls>
      <UiButton class="playground-controls__action" @click="scrollToAnchor">
        Scroll to reference
      </UiButton>
      <SelectControl
        :model-value="options.placement"
        label="Placement"
        :options="[...placementOptions]"
        @update:model-value="(value) => (options.placement = value as FloatingPlacement)"
      />
      <SwitchControl v-model="showArrow" label="Show arrow" />
      <NumberControl v-model="options.offset" label="Offset" :min="4" :max="32" :step="2" />
      <CheckboxGroupControl
        v-model="options.trigger"
        label="Trigger"
        :options="[...triggerOptions]"
      />
    </template>
  </PlaygroundLayout>
</template>
