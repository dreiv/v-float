<script setup lang="ts"></script>

<template>
  <section class="playground">
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
