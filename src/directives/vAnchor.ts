import type { Directive } from 'vue'
import type { AnchorName } from '@/composables/floating/types'

/**
 * `v-anchor="anchorName"` — sets `--v-float-anchor-name` inline, wiring an
 * arbitrary element (a <button>, an <input>, a table row…) into the
 * floating engine without wrapping it or fighting `useFloating`'s
 * `anchorProps` object for `style` ownership.
 *
 * Prefer this over `anchorProps` when the trigger element already has its
 * own `:style` binding, or when the anchor name is threaded through props
 * rather than created via `useFloating()` in the same component.
 *
 * @example
 * ```vue
 * <script setup>
 * const { anchorName, panelProps } = useFloating()
 * </script>
 * <template>
 *   <button v-anchor="anchorName">Trigger</button>
 *   <FloatingPanel v-bind="panelProps">…</FloatingPanel>
 * </template>
 * ```
 */
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
