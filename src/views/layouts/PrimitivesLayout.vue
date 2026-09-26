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
    <nav class="primitives-layout__nav" aria-label="Floating primitives">
      <section class="primitives-layout__about">
        <h2 class="primitives-layout__about-title">About</h2>
        <p class="primitives-layout__about-text">
          A zero-dependency playground for the core Floating UI-style primitives, reimplemented with
          native CSS anchor positioning and the Popover API — no JS layout math.
        </p>
      </section>

      <div class="primitives-layout__links">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="primitives-layout__link"
        >
          {{ link.label }}
        </RouterLink>
      </div>
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
  grid-template-areas: 'nav content';
  gap: 1.5rem;
  min-height: 100vh;
  padding: 1.5rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'nav' 'content';
    gap: 1rem;
    padding: 1rem;
  }
}

.primitives-layout__about {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid color-mix(in oklab, canvastext 15%, transparent);
}

.primitives-layout__about-title {
  margin: 0;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.7;
}

.primitives-layout__about-text {
  margin: 0;
  font-size: 0.85rem;
  max-width: 60ch;
  opacity: 0.85;
}

.primitives-layout__nav {
  grid-area: nav;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.primitives-layout__links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 720px) {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 0.25rem;
  }
}

.primitives-layout__link {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  color: inherit;
  text-decoration: none;
  white-space: nowrap;

  &:hover,
  &.router-link-active {
    background: color-mix(in oklab, canvastext 8%, transparent);
  }
}

.primitives-layout__content {
  grid-area: content;
  min-width: 0;
}
</style>
