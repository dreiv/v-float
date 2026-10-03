<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useFloating, FloatingPanel } from '@/components/floating'
import './demo-menu.css'
import './demo-stage.css'

defineOptions({ inheritAttrs: false })

const panelRef = useTemplateRef<InstanceType<typeof FloatingPanel>>('panel')

const { anchorProps, panelProps, open, close } = useFloating({
  placement: 'bottom-start',
  offset: 2,
  shift: true,
  autoSize: true,
  trigger: [],
})

const point = ref({ x: 0, y: 0 })

function onContextMenu(event: MouseEvent) {
  const fromKeyboard = event.clientX === 0 && event.clientY === 0
  const { left, top } = (event.currentTarget as HTMLElement).getBoundingClientRect()

  point.value = fromKeyboard
    ? { x: left + 16, y: top + 16 }
    : { x: event.clientX, y: event.clientY }

  open()
  panelRef.value?.$el.querySelector('[role="menuitem"]')?.focus()
}

function onPanelClick(event: MouseEvent) {
  if ((event.target as Element).closest('[role="menuitem"]:not([aria-haspopup])')) close()
}
</script>

<template>
  <div v-bind="$attrs" class="demo-stage" tabindex="0" @contextmenu.prevent="onContextMenu">
    <slot />
  </div>

  <span
    v-bind="anchorProps"
    class="demo-context__anchor"
    :style="{ left: `${point.x}px`, top: `${point.y}px` }"
    aria-hidden="true"
  />

  <FloatingPanel
    ref="panel"
    v-bind="panelProps"
    mode="auto"
    role="menu"
    class="demo-menu__panel"
    @click="onPanelClick"
  >
    <slot name="menu" />
  </FloatingPanel>
</template>

<style scoped>
@layer components {
  .demo-context__anchor {
    position: fixed;
    inline-size: 0;
    block-size: 0;
    pointer-events: none;
  }
}
</style>
