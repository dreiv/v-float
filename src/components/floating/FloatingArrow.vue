<script setup lang="ts">
/**
 * FloatingArrow
 * ---------------------------------------------------------------------------
 * Renders inside a <FloatingPanel>'s slot. Must share the SAME
 * `--v-float-anchor-name` as its parent panel (pass the same value you gave
 * the panel — typically `arrowProps` from the same `useFloating()` call) so
 * `arrow.css` can center it on the shared anchor's edge via `anchor()`.
 *
 * Rotation/edge placement is entirely driven by the parent panel's
 * `data-placement` attribute through a descendant selector in arrow.css —
 * this component carries no placement logic itself.
 */
defineProps<{
  style?: Record<string, string>
}>()
</script>

<template>
  <span class="v-float-arrow" :style="style" aria-hidden="true" />
</template>
