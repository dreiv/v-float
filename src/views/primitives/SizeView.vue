<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import { useFloating, FloatingPanel } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import PlaygroundViewport from '@/components/playground/PlaygroundViewport.vue'
import { NumberControl, SelectControl, SwitchControl } from '@/components/playground/controls'

const { anchorProps, panelProps, options } = useFloating({ placement: 'bottom', offset: 8, autoSize: true })

const anchorWidth = ref(140)

const contentLength = ref<'short' | 'long'>('short')
const contentOptions = [
  { value: 'short', label: 'Short' },
  { value: 'long', label: 'Long (forces scroll)' },
]

const panelRef = useTemplateRef('panelRef')
onMounted(() => panelRef.value?.show())
</script>

<template>
  <PlaygroundLayout
    title="Size"
    description="[data-auto-size='true'] uses anchor-size() to match the panel's min-width to its anchor's — the classic 'dropdown as wide as its trigger' pattern. Height is a plain viewport-relative ceiling with overflow: auto; anchor() can't express 'space remaining to the edge' since it's restricted to inset properties (see the comment in utilities.css)."
  >
    <template #viewport>
      <PlaygroundViewport :scrollable="false">
        <button class="playground-anchor" v-bind="anchorProps" :style="{ width: `${anchorWidth}px` }">Reference</button>
      </PlaygroundViewport>

      <FloatingPanel ref="panelRef" v-bind="panelProps" mode="manual" class="playground-panel">
        <div class="playground-panel__content" :class="{ 'playground-panel__content--long': contentLength === 'long' }">
          <p>Width tracks the reference's {{ anchorWidth }}px via anchor-size().</p>
          <template v-if="contentLength === 'long'">
            <p>Long content clamps to a viewport-relative max-height and scrolls instead of overflowing the window.</p>
            <p>Scroll within this panel to see the rest.</p>
            <p>One more line to make sure it actually overflows on most screens.</p>
            <p>And a little more, just to be safe.</p>
          </template>
        </div>
      </FloatingPanel>
    </template>

    <template #controls>
      <SwitchControl v-model="options.autoSize" label="Auto-size (match width)" />
      <NumberControl v-model="anchorWidth" label="Reference width" :min="80" :max="320" :step="10" />
      <SelectControl
        :model-value="contentLength"
        label="Content"
        :options="contentOptions"
        @update:model-value="(value) => (contentLength = value as 'short' | 'long')"
      />
    </template>
  </PlaygroundLayout>
</template>
