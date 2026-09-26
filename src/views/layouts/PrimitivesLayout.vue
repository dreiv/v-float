<script setup lang="ts">
/**
 * Route-level layout for /primitives/*. Provides just the nav shell; each
 * child view is a placeholder to be filled in with an actual primitive demo
 * later. Deliberately contains no floating-engine usage itself.
 */
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
    <nav class="primitives-layout__nav" aria-label="Floating primitives">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="primitives-layout__link"
      >
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
  display: grid;
  grid-template-columns: minmax(160px, 200px) 1fr;
  gap: 1.5rem;
  min-height: 100vh;
  padding: 1.5rem;
}

.primitives-layout__nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.primitives-layout__link {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  color: inherit;
  text-decoration: none;
}

.primitives-layout__link:hover,
.primitives-layout__link.router-link-active {
  background: color-mix(in oklab, canvastext 8%, transparent);
}

.primitives-layout__content {
  min-width: 0;
}
</style>
