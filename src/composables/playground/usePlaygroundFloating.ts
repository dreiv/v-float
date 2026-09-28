import { watchEffect } from 'vue'
import { useFloating, type FloatingStrategy } from '@/components/floating'

export function usePlaygroundFloating(strategy: Omit<FloatingStrategy, 'trigger'>) {
  const floating = useFloating({ ...strategy, trigger: [] })
  const { options, open, close } = floating

  watchEffect(
    () => {
      if (options.trigger.length === 0) open()
      else close()
    },
    { flush: 'post' },
  )

  return floating
}
