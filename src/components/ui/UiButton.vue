<template>
  <button type="button" class="ui-button">
    <slot />
  </button>
</template>

<style scoped>
@layer ui {
  .ui-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font: inherit;
    border-radius: var(--ui-surface-radius);
    border: var(--ui-border);
    background: var(--ui-surface-bg-subtle);
    color: inherit;
    cursor: pointer;
    transition: background-color var(--ui-transition-duration) var(--ui-transition-easing);

    &:hover {
      background: var(--ui-hover-bg-strong);
    }

    &:active {
      background: var(--ui-active-bg-strong);
      scale: 0.97;
    }
  }
}
</style>
