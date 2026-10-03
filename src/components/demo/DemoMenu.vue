<script setup lang="ts">
import './demo-menu.css'
import { useFloating, FloatingPanel } from '@/components/floating'
import UiButton from '@/components/ui/UiButton.vue'

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
  <UiButton class="demo-menu__trigger" aria-haspopup="menu" v-bind="anchorProps">{{
    label
  }}</UiButton>

  <FloatingPanel v-bind="panelProps" role="menu" class="demo-menu__panel">
    <slot />
  </FloatingPanel>
</template>
