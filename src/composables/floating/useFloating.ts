import { computed, reactive, useId } from 'vue'
import { usePopoverTrigger } from './usePopoverTrigger'
import { buildAnchorProps, buildPanelProps } from './floatingProps'
import type { AnchorName, FloatingOptions, FloatingStrategy, FloatingStyleVars } from './types'

const createDefaults = (): FloatingOptions => ({
  placement: 'bottom',
  offset: 8,
  flip: true,
  shift: false,
  hide: false,
  autoSize: false,
  trigger: ['click'],
})

export function useFloating(strategy: FloatingStrategy = {}) {
  const id = useId()
  const anchorName: AnchorName = `--v-float-anchor-${id}`
  const panelId = `v-float-panel-${id}`

  const options = reactive<FloatingOptions>({ ...createDefaults(), ...strategy })

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
