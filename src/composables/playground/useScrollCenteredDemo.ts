import { nextTick, onMounted, watch } from 'vue'
import type { FloatingTrigger } from '@/composables/floating/types'

export function useScrollCenteredDemo(
  anchorRef: { value: HTMLElement | null },
  trigger: FloatingTrigger,
  open: () => void,
  close: () => void,
) {
  async function centerAndOpen() {
    anchorRef.value?.scrollIntoView({ block: 'center', inline: 'center' })
    await nextTick()
    if (trigger.length === 0) open()
  }

  function scrollToCenter() {
    anchorRef.value?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
  }

  onMounted(centerAndOpen)

  watch(
    () => trigger.length,
    (length) => (length === 0 ? open() : close()),
  )

  return { scrollToCenter }
}
