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
@layer components {
  .playground {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-inline-size: 0;
  }

  .playground__stage {
    min-inline-size: 0;
    position: relative;
  }

  .playground__controls {
    position: fixed;
    inset-inline-end: 1rem;
    inset-block-end: 1rem;
    z-index: 10;
    inline-size: 240px;
    max-inline-size: calc(100vw - 2rem);
    background: var(--ui-surface-bg);
    color: inherit;
    border: 1px solid var(--ui-divider);
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
      background: var(--ui-hover-bg-subtle);
    }
  }

  .playground__controls-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    max-block-size: min(60vh, 480px);
    overflow-y: auto;
    border-top: 1px solid var(--ui-divider);
  }
}
</style>
