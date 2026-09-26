<script setup lang="ts">
const links = [
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
    <nav class="primitives-layout__tabs" aria-label="Floating primitives">
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
.primitives-layout {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.primitives-layout__tabs {
  display: flex;
  gap: 0.25rem;
  padding: 0.75rem 1.5rem 0;
  border-bottom: 1px solid color-mix(in oklab, canvastext 15%, transparent);
  overflow-x: auto;
  position: sticky;
  top: 0;
  background: canvas;
  z-index: 3;
}

.primitives-layout__tab {
  padding: 0.6rem 1rem;
  border-radius: 6px 6px 0 0;
  color: inherit;
  text-decoration: none;
  white-space: nowrap;
  border-bottom: 2px solid transparent;

  &:hover {
    background: color-mix(in oklab, canvastext 8%, transparent);
  }

  &.router-link-active {
    border-bottom-color: canvastext;
    font-weight: 600;
  }
}

.primitives-layout__content {
  flex: 1;
  min-width: 0;
  padding: 1.5rem;
}
</style>
