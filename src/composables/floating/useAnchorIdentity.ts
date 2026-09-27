import { getCurrentInstance } from 'vue'
import type { AnchorName } from './types'

let fallbackId = 0

export function useAnchorIdentity() {
  const uid = getCurrentInstance()?.uid ?? fallbackId++

  return {
    anchorName: `--v-float-anchor-${uid}` as AnchorName,
    panelId: `v-float-panel-${uid}`,
  }
}
