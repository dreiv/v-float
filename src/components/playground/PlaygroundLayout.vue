<script setup lang="ts">
import { useId } from 'vue'
import { useRoute } from 'vue-router'
import './playground.css'

const route = useRoute()
const titleId = useId()
</script>

<template>
  <section class="playground" :aria-labelledby="titleId">
    <h1 :id="titleId" class="visually-hidden">{{ route.meta.title }}</h1>

    <slot name="stage" />

    <details class="playground__controls" open>
      <summary class="playground__controls-toggle">Controls</summary>
      <div class="playground__controls-body">
        <slot name="controls" />
      </div>
    </details>
  </section>
</template>
