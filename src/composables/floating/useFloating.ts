import { computed, getCurrentInstance, onScopeDispose, reactive } from 'vue'
import { FLOATING_PLACEMENTS } from './types'
import type { AnchorName, FloatingPlacement, FloatingStrategy, FloatingStyleVars } from './types'

let fallbackId = 0

const HOVER_CLOSE_DELAY = 120

type PopoverEl = HTMLElement & {
  showPopover?: () => void
  hidePopover?: () => void
  togglePopover?: () => void
}

export function useFloating(initial: FloatingStrategy = {}) {
  const instance = getCurrentInstance()
  const uid = instance?.uid ?? fallbackId++
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

  let closeTimer: ReturnType<typeof setTimeout> | undefined

  function getPanelEl(): PopoverEl | null {
    return document.getElementById(panelId) as PopoverEl | null
  }

  function clearCloseTimer() {
    if (closeTimer !== undefined) {
      clearTimeout(closeTimer)
      closeTimer = undefined
    }
  }

  function open() {
    clearCloseTimer()
    getPanelEl()?.showPopover?.()
  }

  function close() {
    clearCloseTimer()
    getPanelEl()?.hidePopover?.()
  }

  function closeAfterDelay() {
    clearCloseTimer()
    closeTimer = setTimeout(close, HOVER_CLOSE_DELAY)
  }

  onScopeDispose(clearCloseTimer)

  const styleVars = computed<FloatingStyleVars>(() => ({
    '--v-float-anchor-name': anchorName,
    '--ui-offset': `${options.offset}px`,
  }))

  const anchorProps = computed(() => {
    const props: Record<string, unknown> = {
      style: styleVars.value,
      'data-floating-anchor': '',
    }

    if (options.trigger.includes('click')) {
      props.popovertarget = panelId
      props.popovertargetaction = 'toggle'
    }

    if (options.trigger.includes('hover')) {
      props.onMouseenter = open
      props.onMouseleave = closeAfterDelay
    }

    if (options.trigger.includes('focus')) {
      props.onFocus = open
      props.onBlur = close
    }

    return props
  })

  const panelProps = computed(() => {
    const base = {
      id: panelId,
      style: styleVars.value,
      placement: options.placement,
      flip: options.flip,
      shift: options.shift,
      hide: options.hide,
      autoSize: options.autoSize,
      mode: options.trigger.includes('click') ? ('auto' as const) : ('manual' as const),
    }

    if (!options.trigger.includes('hover')) return base

    return {
      ...base,
      onMouseenter: clearCloseTimer,
      onMouseleave: closeAfterDelay,
    }
  })

  const arrowProps = computed(() => ({
    style: styleVars.value,
  }))

  return {
    anchorName,
    panelId,
    options,
    anchorProps,
    panelProps,
    arrowProps,
    open,
    close,
  }
}

export type UseFloatingReturn = ReturnType<typeof useFloating>

export function isValidPlacement(value: string): value is FloatingPlacement {
  return (FLOATING_PLACEMENTS as readonly string[]).includes(value)
}
