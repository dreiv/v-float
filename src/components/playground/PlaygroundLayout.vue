<script setup lang="ts">
import './playground.css'
</script>

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
@layer components {
  .playground {
    display: flex;
    flex-direction: column;
    gap: var(--ui-sp-4);
    min-inline-size: 0;
  }

  .playground__stage {
    min-inline-size: 0;
    position: relative;
  }

  .playground__controls {
    position: fixed;
    inset-inline-end: var(--ui-sp-4);
    inset-block-end: var(--ui-sp-4);
    z-index: 10;
    inline-size: var(--ui-w-panel);
    max-inline-size: calc(100vw - var(--ui-sp-8));
    background: var(--ui-surface-bg);
    color: inherit;
    border: var(--ui-border-divider);
    border-radius: var(--ui-surface-radius);
    box-shadow: var(--ui-shadow-raised);
    overflow: hidden;
  }

  .playground__controls-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font: inherit;
    font-weight: 600;
    padding: var(--ui-sp-3) var(--ui-sp-4);
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
      background: var(--ui-hover-bg-subtle);
    }

    &:focus-visible {
      outline-offset: var(--ui-focus-offset-inset);
    }
  }

  .playground__controls-body {
    display: flex;
    flex-direction: column;
    gap: var(--ui-sp-4);
    padding: var(--ui-sp-4);
    max-block-size: min(60vh, 30rem);
    overflow-y: auto;
    border-block-start: var(--ui-border-divider);
  }
}
</style>
