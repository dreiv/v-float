<script setup lang="ts">
import './demo-menu.css'
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
  <button
    type="button"
    class="demo-menu__item"
    role="menuitem"
    aria-haspopup="menu"
    v-bind="anchorProps"
  >
    <span class="demo-menu__item-label">{{ label }}</span>
    <span class="demo-menu__item-arrow" aria-hidden="true">›</span>
  </button>

  <FloatingPanel v-bind="panelProps" role="menu" class="demo-menu__panel">
    <slot />
  </FloatingPanel>
</template>

<style scoped>
@layer components {
  .demo-menu__item-arrow {
    flex-shrink: 0;
    font-size: 1.35rem;
    font-weight: 600;
    line-height: 1;
    color: var(--ui-tint-65);
  }
}
</style>
