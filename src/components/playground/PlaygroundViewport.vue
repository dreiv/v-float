<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'

const props = withDefaults(
  defineProps<{
    scrollable?: boolean
    axis?: 'vertical' | 'horizontal' | 'both'
  }>(),
  { scrollable: true, axis: 'vertical' },
)

const viewportEl = useTemplateRef<HTMLDivElement>('viewportEl')

function recenter() {
  const el = viewportEl.value
  if (!el) return
  if (props.axis === 'vertical' || props.axis === 'both') {
    el.scrollTop = (el.scrollHeight - el.clientHeight) / 2
  }
  if (props.axis === 'horizontal' || props.axis === 'both') {
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
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
      <div v-if="scrollable" class="playground-viewport__pad">
        <div class="playground-viewport__anchor-slot">
          <slot />
        </div>
      </div>
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
  position: relative;
  border: 1px solid color-mix(in oklab, canvastext 20%, transparent);
  border-radius: 8px;
  background: color-mix(in oklab, canvastext 4%, transparent);

  &.playground-viewport--static {
    height: min(50vh, 360px);
    display: grid;
    place-items: center;
  }

  &.playground-viewport--vertical {
    height: min(65dvh, 560px);
    overflow-y: auto;
    overflow-x: hidden;

    & .playground-viewport__pad {
      width: 100%;
      height: 220%;
    }
  }

  &.playground-viewport--horizontal {
    height: 320px;
    overflow-x: auto;
    overflow-y: hidden;

    & .playground-viewport__pad {
      width: 220%;
      height: 100%;
    }
  }

  &.playground-viewport--both {
    height: min(65dvh, 560px);
    overflow: auto;

    & .playground-viewport__pad {
      width: 220%;
      height: 220%;
    }
  }
}

.playground-viewport__pad {
  display: grid;
  place-items: center;
}

.playground-viewport__anchor-slot {
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

  &:hover {
    background: color-mix(in oklab, canvastext 8%, transparent);
  }
}
</style>
