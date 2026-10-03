<script setup lang="ts">
import { primitivePages } from '@/router'
</script>

<template>
  <nav class="primitives-layout__nav" aria-label="Floating primitives and demo">
    <ul>
      <li v-for="{ name, title } in primitivePages" :key="name">
        <RouterLink :to="{ name }" class="primitives-layout__tab">{{ title }}</RouterLink>
      </li>
    </ul>
  </nav>

  <main class="primitives-layout__content">
    <RouterView />
  </main>
</template>

<style scoped>
@layer components {
  .primitives-layout__nav,
  .primitives-layout__content {
    --tabs-height: 3.25rem;
  }

  .primitives-layout__nav {
    position: fixed;
    inset-block-start: 0;
    inset-inline: 0;
    z-index: var(--ui-z-nav);
    block-size: var(--tabs-height);
    padding-inline: var(--ui-sp-6);
    overflow-x: auto;
    background: var(--ui-surface-bg);
    border-block-end: var(--ui-border-divider);

    & ul {
      display: flex;
      gap: var(--ui-sp-1);
      block-size: 100%;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    & li {
      display: flex;
    }
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
    padding: var(--ui-sp-6);
    padding-block-start: calc(var(--tabs-height) + var(--ui-sp-6));
  }
}
</style>
