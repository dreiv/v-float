<script setup lang="ts">
import { primitivePages } from '@/router'
</script>

<template>
  <div class="primitives-layout">
    <header class="primitives-layout__header">
      <nav class="primitives-layout__nav" aria-label="Floating primitives and demo">
        <ul class="primitives-layout__tabs">
          <li v-for="page in primitivePages" :key="page.name" class="primitives-layout__item">
            <RouterLink :to="{ name: page.name }" class="primitives-layout__tab">
              {{ page.title }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </header>

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

  .primitives-layout__header {
    position: fixed;
    inset-block-start: 0;
    inset-inline: 0;
    block-size: var(--tabs-height);
    border-block-end: var(--ui-border-divider);
    background: var(--ui-surface-bg);
    z-index: 20;
  }

  .primitives-layout__nav {
    block-size: 100%;
    padding-inline: var(--ui-sp-6);
    overflow-x: auto;
  }

  .primitives-layout__tabs {
    display: flex;
    gap: var(--ui-sp-1);
    block-size: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .primitives-layout__item {
    display: flex;
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

    &[aria-current='page'] {
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
