import { computed, getCurrentInstance, reactive } from 'vue'
import type {
  AnchorName,
  FloatingPlacement,
  FloatingStrategy,
  FloatingStyleVars,
} from './types'

let fallbackId = 0

/**
 * The single entry point into the floating engine.
 *
 * Everything this composable returns is DATA — plain objects meant to be
 * `v-bind`'d onto elements. There is no positioning math in here; every
 * primitive (offset, flip, shift, arrow, size, hide) is a CSS rule in
 * `src/styles/floating/`. This function's only job is minting a unique,
 * collision-free anchor name and shaping the reactive options into the
 * attributes/styles that stylesheet expects.
 *
 * @example
 * ```ts
 * const { anchorProps, panelProps, arrowProps } = useFloating({ placement: 'bottom' })
 * ```
 * ```vue
 * <button v-bind="anchorProps">Trigger</button>
 * <FloatingPanel v-bind="panelProps">…</FloatingPanel>
 * ```
 */
export function useFloating(initial: FloatingStrategy = {}) {
  const instance = getCurrentInstance()
  const uid = instance?.uid ?? fallbackId++
  const anchorName = `--v-float-anchor-${uid}` as AnchorName

  const options = reactive<Required<FloatingStrategy>>({
    placement: initial.placement ?? 'bottom',
    flip: initial.flip ?? true,
    shift: initial.shift ?? false,
    hide: initial.hide ?? false,
    autoSize: initial.autoSize ?? false,
  })

  const styleVars: FloatingStyleVars = { '--v-float-anchor-name': anchorName }

  /** Spread onto whichever element should act as the anchor. */
  const anchorProps = computed(() => ({
    style: styleVars,
    'data-floating-anchor': '',
  }))

  /** Spread onto a <FloatingPanel>. */
  const panelProps = computed(() => ({
    style: styleVars,
    placement: options.placement,
    flip: options.flip,
    shift: options.shift,
    hide: options.hide,
    autoSize: options.autoSize,
  }))

  /** Spread onto a <FloatingArrow> nested inside that same panel. */
  const arrowProps = computed(() => ({
    style: styleVars,
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

/** Type helper for consumers building their own placement pickers. */
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
