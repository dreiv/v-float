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

    <div class="playground__body">
      <div class="playground__stage">
        <slot name="viewport" />
      </div>
      <aside class="playground__controls" aria-label="Controls">
        <slot name="controls" />
      </aside>
    </div>
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

.playground__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: 1.25rem;
  align-items: start;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
}

.playground__stage {
  min-width: 0;
  position: relative;
}

.playground__controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid color-mix(in oklab, canvastext 15%, transparent);
  border-radius: 8px;
}
</style>
