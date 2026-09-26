import type { Directive } from 'vue'
import type { AnchorName } from '@/composables/floating/types'

export const vAnchor: Directive<HTMLElement, AnchorName> = {
  mounted(el, binding) {
    el.style.setProperty('--v-float-anchor-name', binding.value)
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      el.style.setProperty('--v-float-anchor-name', binding.value)
    }
  },
  unmounted(el) {
    el.style.removeProperty('--v-float-anchor-name')
  },
}
