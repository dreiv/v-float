<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <section class="playground">
    <header class="playground__header">
      <h1 class="playground__title">{{ title }}</h1>
      <p v-if="description" class="playground__description">{{ description }}</p>
    </header>

    <div class="playground__stage">
      <slot name="stage" />
    </div>

    <details class="playground__controls" open>
      <summary class="playground__controls-toggle">Controls</summary>
      <div class="playground__controls-body">
        <slot name="controls" />
      </div>
    </details>
  </section>
</template>

<style scoped>
.playground {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
}

.playground__header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.playground__title {
  font-size: 1.25rem;
  margin: 0;
}

.playground__description {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.75;
  max-width: 60ch;
}

.playground__stage {
  min-width: 0;
  position: relative;
}

.playground__controls {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 10;
  width: 240px;
  max-width: calc(100vw - 2rem);
  background: canvas;
  color: inherit;
  border: 1px solid color-mix(in oklab, canvastext 15%, transparent);
  border-radius: 8px;
  box-shadow: 0 4px 16px color-mix(in oklab, canvastext 18%, transparent);
  overflow: hidden;
}

.playground__controls-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font: inherit;
  font-weight: 600;
  padding: 0.75rem 1rem;
  cursor: pointer;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  &::after {
    content: '−';
    opacity: 0.7;
  }

  .playground__controls:not([open]) &::after {
    content: '+';
  }

  &:hover {
    background: color-mix(in oklab, canvastext 8%, transparent);
  }
}

.playground__controls-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem 1rem;
  max-height: min(60vh, 480px);
  overflow-y: auto;
  border-top: 1px solid color-mix(in oklab, canvastext 15%, transparent);
  padding-top: 1rem;
}
</style>
