<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <article class="prose">
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
