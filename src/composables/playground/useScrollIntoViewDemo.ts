import { onMounted } from 'vue'
import { useAutoOpen } from './useAutoOpen'
import type { FloatingTrigger } from '@/composables/floating/types'

export function useScrollIntoViewDemo(
  anchorRef: { value: HTMLElement | { $el: Element } | null },
  trigger: FloatingTrigger,
  open: () => void,
  close: () => void,
) {
  useAutoOpen(trigger, open, close)

  const scrollOptions: ScrollIntoViewOptions = { block: 'center', inline: 'center' }

  function anchorElement() {
    const target = anchorRef.value
    const el = target && '$el' in target ? target.$el : target
    return el instanceof HTMLElement ? el : null
  }

  function scrollToAnchor() {
    anchorElement()?.scrollIntoView({ ...scrollOptions, behavior: 'smooth' })
  }

  onMounted(() => {
    anchorElement()?.scrollIntoView(scrollOptions)
  })

  return { scrollToAnchor }
}
