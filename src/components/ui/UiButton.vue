<template>
  <button type="button" class="ui-button">
    <span class="ui-button__face"><slot /></span>
  </button>
</template>

<style scoped>
@layer ui {
  .ui-button {
    display: inline-flex;
    min-block-size: 2.5rem;
    padding: 0;
    font: inherit;
    color: inherit;
    background: none;
    border: var(--ui-border-width) solid transparent;
    border-radius: var(--ui-surface-radius);
    cursor: pointer;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  .ui-button__face {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    margin: calc(var(--ui-border-width) * -1);
    padding: var(--ui-button-padding, var(--ui-sp-2) var(--ui-sp-4));
    border: var(--ui-border);
    border-radius: inherit;
    background: var(--ui-surface-bg-subtle);
    transition: background-color var(--ui-transition-duration) var(--ui-transition-easing);
    user-select: none;
  }

  @media (pointer: coarse) {
    .ui-button {
      min-block-size: 2.75rem;
      min-inline-size: 2.75rem;
    }
  }

  @media (hover: hover) {
    .ui-button:enabled:hover .ui-button__face {
      background: var(--ui-hover-bg-strong);
    }
  }

  .ui-button:enabled:active .ui-button__face {
    background: var(--ui-active-bg-strong);
    transition: none;
  }

  @media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
    .ui-button:enabled:not([aria-expanded='true']):active .ui-button__face {
      transform: translateY(1px);
    }
  }

  .ui-button:disabled {
    cursor: default;
    opacity: 0.5;
  }
}
</style>
