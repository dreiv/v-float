<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, useTemplateRef } from 'vue'
import { useFloating, FloatingPanel, FloatingArrow } from '@/components/floating'
import UiButton from '@/components/ui/UiButton.vue'
import type { TourStep } from './types'
import './tour.css'

const { steps } = defineProps<{
  steps: TourStep[]
}>()

const titleId = useId()
const panelRef = useTemplateRef<InstanceType<typeof FloatingPanel>>('panel')

const { anchorName, panelProps, arrowProps, options, open, close } = useFloating({
  offset: 14,
  shift: true,
  trigger: [],
})

const index = ref(0)
const step = computed(() => steps[index.value])
const isLast = computed(() => index.value === steps.length - 1)

let target: HTMLElement | null = null

function releaseTarget() {
  target?.removeAttribute('data-floating-anchor')
  target?.removeAttribute('data-tour-active')
  target?.style.removeProperty('--v-float-anchor-name')
  target = null
}

function claimTarget(selector: string) {
  releaseTarget()
  target = document.querySelector<HTMLElement>(selector)
  if (!target) return

  target.setAttribute('data-floating-anchor', '')
  target.setAttribute('data-tour-active', '')
  target.style.setProperty('--v-float-anchor-name', anchorName)

  target.scrollIntoView({ block: 'center' })
}

async function go(next: number) {
  const nextStep = steps[next]
  if (!nextStep) return

  index.value = next
  options.placement = nextStep.placement ?? 'bottom'
  claimTarget(nextStep.target)

  await nextTick()
  panelRef.value?.$el.querySelector('[data-tour-primary]')?.focus({ preventScroll: true })
}

function start() {
  open()
  go(0)
}

function finish() {
  releaseTarget()
  close()
}

function next() {
  if (isLast.value) finish()
  else go(index.value + 1)
}

onBeforeUnmount(releaseTarget)

defineExpose({ start })
</script>

<template>
  <FloatingPanel
    ref="panel"
    v-bind="panelProps"
    role="dialog"
    :aria-labelledby="titleId"
    class="tour"
    @keydown.esc="finish"
  >
    <FloatingArrow v-bind="arrowProps" />
    <div v-if="step" class="tour__content">
      <p class="tour__progress">
        <span class="visually-hidden">Step </span>{{ index + 1 }} / {{ steps.length }}
      </p>
      <div :id="titleId" class="tour__title">{{ step.title }}</div>
      <p class="tour__body">{{ step.body }}</p>
      <div class="tour__actions">
        <UiButton @click="finish">Skip</UiButton>
        <UiButton v-if="index > 0" @click="go(index - 1)">Back</UiButton>
        <UiButton data-tour-primary @click="next">{{ isLast ? 'Done' : 'Next' }}</UiButton>
      </div>
    </div>
  </FloatingPanel>
</template>

<style scoped>
@layer components {
  .tour {
    inline-size: min(20rem, calc(100vw - var(--ui-size-viewport-gutter) * 2));
  }

  .tour__content {
    display: flex;
    flex-direction: column;
    gap: var(--ui-sp-2);
    padding: var(--ui-sp-4);
  }

  .tour__progress {
    margin: 0;
    font-size: var(--ui-fs-xs);
    font-variant-numeric: tabular-nums;
    opacity: 0.7;
  }

  .tour__title {
    font-size: var(--ui-fs-lg);
    font-weight: 600;
  }

  .tour__body {
    margin: 0;
    font-size: var(--ui-fs-md);
    line-height: 1.5;
  }

  .tour__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--ui-sp-2);
    margin-block-start: var(--ui-sp-2);
  }
}
</style>
