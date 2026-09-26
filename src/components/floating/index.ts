import type { App } from 'vue'
import { vAnchor } from '@/directives/vAnchor'
import FloatingPanel from './FloatingPanel.vue'
import FloatingArrow from './FloatingArrow.vue'

export { FloatingPanel, FloatingArrow }
export { useFloating, isValidPlacement } from '@/composables/floating/useFloating'
export * from '@/composables/floating/types'
export { vAnchor }

export const floatingPlugin = {
  install(app: App) {
    app.component('FloatingPanel', FloatingPanel)
    app.component('FloatingArrow', FloatingArrow)
    app.directive('anchor', vAnchor)
  },
}
