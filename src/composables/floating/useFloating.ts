import { computed, getCurrentInstance, reactive } from 'vue'
import { FLOATING_PLACEMENTS } from './types'
import { usePopoverTrigger } from './usePopoverTrigger'
import { buildAnchorProps, buildPanelProps } from './floatingProps'
import type { AnchorName, FloatingPlacement, FloatingStrategy, FloatingStyleVars } from './types'

let fallbackId = 0

export function useFloating(initial: FloatingStrategy = {}) {
  const uid = getCurrentInstance()?.uid ?? fallbackId++
  const anchorName = `--v-float-anchor-${uid}` as AnchorName
  const panelId = `v-float-panel-${uid}`

  const options = reactive<Required<FloatingStrategy>>({
    placement: initial.placement ?? 'bottom',
    offset: initial.offset ?? 8,
    flip: initial.flip ?? true,
    shift: initial.shift ?? false,
    hide: initial.hide ?? false,
    autoSize: initial.autoSize ?? false,
    trigger: initial.trigger ?? ['click'],
  })

  const trigger = usePopoverTrigger(panelId)

  const styleVars = computed<FloatingStyleVars>(() => ({
    '--v-float-anchor-name': anchorName,
    '--ui-offset': `${options.offset}px`,
  }))

  const anchorProps = computed(() => buildAnchorProps(options, panelId, styleVars.value, trigger))
  const panelProps = computed(() => buildPanelProps(options, panelId, styleVars.value, trigger))
  const arrowProps = computed(() => ({ style: styleVars.value }))

  return {
    anchorName,
    panelId,
    options,
    anchorProps,
    panelProps,
    arrowProps,
    open: trigger.open,
    close: trigger.close,
  }
}

export type UseFloatingReturn = ReturnType<typeof useFloating>

export function isValidPlacement(value: string): value is FloatingPlacement {
  return (FLOATING_PLACEMENTS as readonly string[]).includes(value)
}
