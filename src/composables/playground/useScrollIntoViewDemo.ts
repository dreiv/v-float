import { onMounted } from 'vue'
import { useAutoOpen } from './useAutoOpen'
import type { FloatingTrigger } from '@/composables/floating/types'

export function useScrollIntoViewDemo(
  anchorRef: { value: HTMLElement | null },
  trigger: FloatingTrigger,
  open: () => void,
  close: () => void,
) {
  useAutoOpen(trigger, open, close)

  const scrollOptions: ScrollIntoViewOptions = { block: 'center', inline: 'center' }

  function scrollToAnchor() {
    anchorRef.value?.scrollIntoView({ ...scrollOptions, behavior: 'smooth' })
  }

  onMounted(() => {
    anchorRef.value?.scrollIntoView(scrollOptions)
  })

  return { scrollToAnchor }
}
