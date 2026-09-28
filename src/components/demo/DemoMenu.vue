<script setup lang="ts">
import { useFloating, FloatingPanel } from '@/components/floating'

const { label = 'Open menu' } = defineProps<{
  label?: string
}>()

const { anchorProps, panelProps } = useFloating({
  placement: 'bottom-start',
  offset: 6,
  shift: true,
  autoSize: true,
  trigger: ['click'],
})
</script>

<template>
  <button type="button" class="demo-menu__trigger ui-surface" v-bind="anchorProps">
    {{ label }}
  </button>

  <FloatingPanel v-bind="panelProps" role="menu" class="demo-menu__panel">
    <slot />
  </FloatingPanel>
</template>
