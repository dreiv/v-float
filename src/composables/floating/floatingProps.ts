import type { FloatingOptions, FloatingStyleVars } from './types'
import type { PopoverTrigger } from './usePopoverTrigger'

export function buildAnchorProps(
  options: FloatingOptions,
  panelId: string,
  styleVars: FloatingStyleVars,
  trigger: PopoverTrigger,
) {
  const props: Record<string, unknown> = {
    style: styleVars,
    'data-floating-anchor': '',
  }

  if (options.trigger.includes('click')) {
    props.popovertarget = panelId
    props.popovertargetaction = 'toggle'
  }

  if (options.trigger.includes('hover')) {
    props.onMouseenter = trigger.open
    props.onMouseleave = trigger.closeAfterDelay
  }

  if (options.trigger.includes('focus')) {
    props.onFocus = trigger.open
    props.onBlur = trigger.close
  }

  return props
}

export function buildPanelProps(
  options: FloatingOptions,
  panelId: string,
  styleVars: FloatingStyleVars,
  trigger: PopoverTrigger,
) {
  const base = {
    id: panelId,
    style: styleVars,
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
    onMouseenter: trigger.clearCloseTimer,
    onMouseleave: trigger.closeAfterDelay,
  }
}
