<script setup lang="ts">
import { useFloating, FloatingPanel } from '@/components/floating'

defineProps<{
  label: string
}>()

const { anchorProps, panelProps } = useFloating({
  placement: 'right-start',
  offset: 4,
  shift: true,
  autoSize: true,
  trigger: ['click'],
})
</script>

<template>
  <button type="button" class="demo-menu__item" role="menuitem" v-bind="anchorProps">
    <span class="demo-menu__item-label">{{ label }}</span>
    <span class="demo-menu__item-arrow" aria-hidden="true">›</span>
  </button>

  <FloatingPanel v-bind="panelProps" role="menu" class="demo-menu__panel">
    <slot />
  </FloatingPanel>
</template>
