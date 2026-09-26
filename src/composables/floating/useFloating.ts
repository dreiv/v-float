import { computed, getCurrentInstance, reactive } from 'vue'
import type { AnchorName, FloatingPlacement, FloatingStrategy, FloatingStyleVars } from './types'

let fallbackId = 0

export function useFloating(initial: FloatingStrategy = {}) {
  const instance = getCurrentInstance()
  const uid = instance?.uid ?? fallbackId++
  const anchorName = `--v-float-anchor-${uid}` as AnchorName

  const options = reactive<Required<FloatingStrategy>>({
    placement: initial.placement ?? 'bottom',
    offset: initial.offset ?? 8,
    flip: initial.flip ?? true,
    shift: initial.shift ?? false,
    hide: initial.hide ?? false,
    autoSize: initial.autoSize ?? false,
  })

  const styleVars = computed<FloatingStyleVars>(() => ({
    '--v-float-anchor-name': anchorName,
    '--ui-offset': `${options.offset}px`,
  }))

  const anchorProps = computed(() => ({
    style: styleVars.value,
    'data-floating-anchor': '',
  }))

  const panelProps = computed(() => ({
    style: styleVars.value,
    placement: options.placement,
    flip: options.flip,
    shift: options.shift,
    hide: options.hide,
    autoSize: options.autoSize,
  }))

  const arrowProps = computed(() => ({
    style: styleVars.value,
  }))

  return {
    anchorName,
    options,
    anchorProps,
    panelProps,
    arrowProps,
  }
}

export type UseFloatingReturn = ReturnType<typeof useFloating>

export function isValidPlacement(value: string): value is FloatingPlacement {
  return [
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'right',
  ].includes(value)
}
