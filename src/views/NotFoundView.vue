<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <article class="not-found">
    <h1>Page not found</h1>
    <p>
      Nothing lives at <code>{{ route.fullPath }}</code
      >.
    </p>
    <p>
      <RouterLink :to="{ name: 'demo' }">Back to the demo</RouterLink>
    </p>
  </article>
</template>

<style scoped>
@layer components {
  .not-found {
    max-inline-size: 40rem;
    margin-inline: auto;
  }

  .not-found h1 {
    margin: 0 0 var(--ui-sp-3);
    font-size: var(--ui-fs-xl);
  }

  .not-found p {
    line-height: 1.65;
    color: var(--ui-text-muted);
  }

  .not-found code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace;
    font-size: 0.875em;
    padding: 0.15em 0.4em;
    background: var(--ui-shade-08);
    border: var(--ui-border-width) solid var(--ui-tint-12);
    border-radius: var(--ui-radius-sm);
  }
}
</style>
