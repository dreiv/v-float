<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useFloating, FloatingPanel } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import PlaygroundViewport from '@/components/playground/PlaygroundViewport.vue'
import {
  CheckboxGroupControl,
  SelectControl,
  SwitchControl,
} from '@/components/playground/controls'
import { triggerOptions } from '@/components/playground/placementOptions'

const { anchorProps, panelProps, options, open, close } = useFloating({
  placement: 'bottom',
  offset: 8,
  autoSize: true,
  trigger: [],
})

const contentLength = ref<'short' | 'long'>('short')
const contentOptions = [
  { value: 'short', label: 'Short' },
  { value: 'long', label: 'Long (forces scroll)' },
]

onMounted(() => {
  if (options.trigger.length === 0) open()
})

watch(
  () => options.trigger.length,
  (length) => (length === 0 ? open() : close()),
)
</script>

<template>
  <PlaygroundLayout
    title="Size"
    description="[data-auto-size='true'] caps the panel's own max-width/max-height to the available viewport space, with overflow: auto once content exceeds it. anchor() can't express 'space remaining to the edge' since it's restricted to inset properties, so this is a plain viewport-relative ceiling rather than a true available-space calculation."
  >
    <template #viewport>
      <PlaygroundViewport :scrollable="false">
        <button class="playground-anchor" v-bind="anchorProps">Reference</button>
      </PlaygroundViewport>

      <FloatingPanel v-bind="panelProps" mode="manual" class="playground-panel">
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
      <SwitchControl v-model="options.autoSize" label="Cap panel size" />
      <SelectControl
        :model-value="contentLength"
        label="Content"
        :options="contentOptions"
        @update:model-value="(value) => (contentLength = value as 'short' | 'long')"
      />
      <CheckboxGroupControl
        v-model="options.trigger"
        label="Trigger"
        :options="[...triggerOptions]"
      />
    </template>
  </PlaygroundLayout>
</template>
