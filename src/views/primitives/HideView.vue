<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useFloating, FloatingPanel } from '@/components/floating'
import PlaygroundLayout from '@/components/playground/PlaygroundLayout.vue'
import PlaygroundViewport from '@/components/playground/PlaygroundViewport.vue'
import { SelectControl } from '@/components/playground/controls'
import { hideModeOptions, triggerOptions } from '@/components/playground/placementOptions'
import type { FloatingHideMode, FloatingTrigger } from '@/composables/floating/types'

const { anchorProps, panelProps, options, open, close } = useFloating({
  placement: 'right',
  offset: 8,
  hide: true,
  trigger: 'manual',
})

const hideModeValue = computed(() => String(options.hide))

onMounted(() => {
  if (options.trigger === 'manual') open()
})

watch(
  () => options.trigger,
  (trigger) => (trigger === 'manual' ? open() : close()),
)
</script>

<template>
  <PlaygroundLayout
    title="Hide"
    description="[data-hide] sets position-visibility, which tracks the anchor's visibility within its OWN scrollable ancestors — unlike Flip/Shift, this one really does react to this box, not the real window. Scroll the reference out of view to watch the panel disappear, then scroll it back."
  >
    <template #viewport>
      <PlaygroundViewport axis="vertical">
        <button class="playground-anchor" v-bind="anchorProps">Reference</button>
      </PlaygroundViewport>

      <FloatingPanel v-bind="panelProps" mode="manual" class="playground-panel">
        <div class="playground-panel__content">
          <p>Hidden once the anchor scrolls out of view.</p>
        </div>
      </FloatingPanel>
    </template>

    <template #controls>
      <SelectControl
        :model-value="hideModeValue"
        label="Hide mode"
        :options="[...hideModeOptions]"
        @update:model-value="
          (value) =>
            (options.hide = (
              value === 'false' ? false : value === 'true' ? true : value
            ) as FloatingHideMode)
        "
      />
      <SelectControl
        :model-value="options.trigger"
        label="Trigger"
        :options="[...triggerOptions]"
        @update:model-value="(value) => (options.trigger = value as FloatingTrigger)"
      />
    </template>
  </PlaygroundLayout>
</template>
