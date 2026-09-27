import { watchEffect } from 'vue'
import type { FloatingTrigger } from '@/composables/floating/types'

export function useAutoOpen(trigger: FloatingTrigger, open: () => void, close: () => void) {
  watchEffect(() => (trigger.length === 0 ? open() : close()), { flush: 'post' })
}
