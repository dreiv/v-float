<script setup lang="ts">
import { useFloating, FloatingPanel } from '@/components/floating'

withDefaults(
  defineProps<{
    label?: string
  }>(),
  {
    label: 'Open menu',
  },
)

const { anchorProps, panelProps } = useFloating({
  placement: 'bottom-start',
  offset: 6,
  shift: true,
  autoSize: true,
  trigger: ['click'],
})
</script>

<template>
  <button type="button" class="demo-menu__trigger" v-bind="anchorProps">
    {{ label }}
  </button>

  <FloatingPanel v-bind="panelProps" role="menu" class="demo-menu__panel">
    <slot />
  </FloatingPanel>
</template>
