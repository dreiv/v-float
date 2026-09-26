import { watchEffect } from 'vue'
import type { FloatingTrigger } from '@/composables/floating/types'

export function useDemoAutoOpen(trigger: FloatingTrigger, open: () => void, close: () => void) {
  watchEffect(
    () => {
      if (trigger.length === 0) open()
      else close()
    },
    { flush: 'post' },
  )
}
