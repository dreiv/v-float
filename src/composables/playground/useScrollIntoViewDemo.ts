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

  function scrollToAnchor() {
    anchorRef.value?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
  }

  onMounted(() => {
    anchorRef.value?.scrollIntoView({ block: 'center', inline: 'center' })
  })

  return { scrollToAnchor }
}
