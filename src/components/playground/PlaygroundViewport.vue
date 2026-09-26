<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'

const props = withDefaults(
  defineProps<{
    scrollable?: boolean
    axis?: 'vertical' | 'horizontal'
  }>(),
  { scrollable: true, axis: 'vertical' },
)

const viewportEl = useTemplateRef<HTMLDivElement>('viewportEl')

function recenter() {
  const el = viewportEl.value
  if (!el) return
  if (props.axis === 'horizontal') {
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
  } else {
    el.scrollTop = (el.scrollHeight - el.clientHeight) / 2
  }
}

onMounted(() => {
  if (props.scrollable) recenter()
})

defineExpose({ el: viewportEl, recenter })
</script>

<template>
  <div class="playground-viewport-wrap">
    <div
      ref="viewportEl"
      class="playground-viewport"
      :class="scrollable ? `playground-viewport--${axis}` : 'playground-viewport--static'"
    >
      <template v-if="scrollable">
        <div class="playground-viewport__spacer" aria-hidden="true" />
        <div class="playground-viewport__anchor-slot">
          <slot />
        </div>
        <div class="playground-viewport__spacer" aria-hidden="true" />
      </template>
      <div v-else class="playground-viewport__anchor-slot">
        <slot />
      </div>
    </div>

    <button v-if="scrollable" type="button" class="playground-viewport__recenter" @click="recenter">
      Recenter scroll
    </button>
  </div>
</template>

<style scoped>
.playground-viewport-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
}

.playground-viewport {
  border: 1px solid color-mix(in oklab, canvastext 20%, transparent);
  border-radius: 8px;
  background: color-mix(in oklab, canvastext 4%, transparent);
}

.playground-viewport--static {
  height: min(50vh, 360px);
  display: grid;
  place-items: center;
}

.playground-viewport--vertical {
  height: min(65vh, 480px);
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.playground-viewport--horizontal {
  height: 220px;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.playground-viewport__spacer {
  flex: none;
}

.playground-viewport--vertical .playground-viewport__spacer {
  width: 100%;
  min-height: 320px;
}

.playground-viewport--horizontal .playground-viewport__spacer {
  height: 100%;
  min-width: 320px;
}

.playground-viewport__anchor-slot {
  flex: none;
  display: grid;
  place-items: center;
  padding: 2rem;
}

.playground-viewport__recenter {
  align-self: flex-start;
  font: inherit;
  font-size: 0.8rem;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  border: 1px solid color-mix(in oklab, canvastext 25%, transparent);
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.playground-viewport__recenter:hover {
  background: color-mix(in oklab, canvastext 8%, transparent);
}
</style>
