<script setup lang="ts">
import { primitivePages } from '@/views/primitivePages'
</script>

<template>
  <div class="primitives-layout">
    <nav class="primitives-layout__tabs" aria-label="Floating primitives and demo">
      <RouterLink
        v-for="page in primitivePages"
        :key="page.name"
        :to="{ name: page.name }"
        class="primitives-layout__tab"
      >
        {{ page.title }}
      </RouterLink>
    </nav>

    <main class="primitives-layout__content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
@layer components {
  .primitives-layout {
    --tabs-height: 3.25rem;

    display: flex;
    flex-direction: column;
    min-block-size: 100%;
  }

  .primitives-layout__tabs {
    display: flex;
    align-items: stretch;
    gap: var(--ui-sp-1);
    block-size: var(--tabs-height);
    padding-inline: var(--ui-sp-6);
    border-block-end: var(--ui-border-divider);
    overflow-x: auto;
    position: fixed;
    inset-block-start: 0;
    inset-inline: 0;
    background: var(--ui-surface-bg);
    z-index: 20;
  }

  .primitives-layout__tab {
    display: flex;
    align-items: center;
    padding-inline: var(--ui-sp-4);
    color: inherit;
    text-decoration: none;
    white-space: nowrap;
    border-block-end: 2px solid transparent;

    &:hover {
      background: var(--ui-hover-bg-subtle);
    }

    &:focus-visible {
      outline-offset: var(--ui-focus-offset-inset);
    }

    &.router-link-active {
      border-block-end-color: CanvasText;
      font-weight: 600;
    }
  }

  .primitives-layout__content {
    flex: 1;
    min-inline-size: 0;
    padding: calc(var(--tabs-height) + var(--ui-sp-6)) var(--ui-sp-6) var(--ui-sp-6);
  }
}
</style>
