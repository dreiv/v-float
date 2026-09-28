<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import UiButton from '@/components/ui/UiButton.vue'
import './playground.css'

defineOptions({ inheritAttrs: false })

const { scroll = false } = defineProps<{
  scroll?: boolean
}>()

const anchorRef = useTemplateRef<InstanceType<typeof UiButton>>('anchor')

function scrollToAnchor(behavior: ScrollBehavior = 'auto') {
  anchorRef.value?.$el.scrollIntoView({ block: 'center', inline: 'center', behavior })
}

onMounted(() => {
  if (scroll) scrollToAnchor()
})

defineExpose({ scrollToAnchor: () => scrollToAnchor('smooth') })
</script>

<template>
  <div class="playground-stage" :class="{ 'playground-stage--scroll': scroll }">
    <UiButton ref="anchor" class="playground-anchor" v-bind="$attrs">Reference</UiButton>
  </div>
</template>
