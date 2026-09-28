<script setup lang="ts">
import './demo-menu.css'
import { Tooltip } from '@/components/tooltip'

defineProps<{
  label: string
  hint: string
  shortcut?: string
}>()
</script>

<template>
  <div class="demo-menu__item" role="menuitem">
    <span class="demo-menu__item-label">{{ label }}</span>
    <span v-if="shortcut" class="demo-menu__item-shortcut">{{ shortcut }}</span>

    <Tooltip placement="right" :offset="10">
      <template #trigger="{ trigger }">
        <button type="button" class="demo-menu__item-hint" v-bind="trigger" aria-label="More info">
          ?
        </button>
      </template>
      <p>{{ hint }}</p>
    </Tooltip>
  </div>
</template>

<style scoped>
@layer components {
  .demo-menu__item-shortcut {
    font-size: 0.8rem;
    opacity: 0.6;
  }

  .demo-menu__item-hint {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    inline-size: 1.15rem;
    block-size: 1.15rem;
    flex-shrink: 0;
    font-size: 0.75rem;
    line-height: 1;
    border-radius: 50%;
    border: 1px solid var(--ui-tint-35);
    background: transparent;
    color: inherit;
    cursor: help;

    &:hover,
    &:focus-visible {
      background: var(--ui-accent-tint-15);
      border-color: AccentColor;
    }

    &:focus-visible {
      outline: 2px solid AccentColor;
      outline-offset: 2px;
    }
  }
}
</style>
