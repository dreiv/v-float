<script setup lang="ts">
const links = [
  { to: '/primitives/demo', label: 'Demo' },
  { to: '/primitives/offset', label: 'Offset' },
  { to: '/primitives/flip', label: 'Flip' },
  { to: '/primitives/shift', label: 'Shift' },
  { to: '/primitives/arrow', label: 'Arrow' },
  { to: '/primitives/size', label: 'Size' },
  { to: '/primitives/hide', label: 'Hide' },
]
</script>

<template>
  <div class="primitives-layout">
    <nav class="primitives-layout__tabs" aria-label="Floating primitives and demo">
      <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="primitives-layout__tab">
        {{ link.label }}
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
    gap: 0.25rem;
    block-size: var(--tabs-height);
    padding: 0 1.5rem;
    border-bottom: 1px solid var(--ui-divider);
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
    padding: 0 1rem;
    color: inherit;
    text-decoration: none;
    white-space: nowrap;
    border-bottom: 2px solid transparent;

    &:hover {
      background: var(--ui-hover-bg-subtle);
    }

    &.router-link-active {
      border-bottom-color: canvastext;
      font-weight: 600;
    }
  }

  .primitives-layout__content {
    flex: 1;
    min-inline-size: 0;
    padding: calc(var(--tabs-height) + 1.5rem) 1.5rem 1.5rem;
  }
}
</style>
