<script setup lang="ts">
import { useId } from 'vue'
import { useRoute } from 'vue-router'
import './playground.css'

const route = useRoute()
const titleId = useId()
</script>

<template>
  <section class="playground" :aria-labelledby="titleId">
    <h1 :id="titleId" class="playground__title">{{ route.meta.title }}</h1>

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
