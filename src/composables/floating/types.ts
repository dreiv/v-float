export type FloatingPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'right'

export type FloatingPopoverMode = 'auto' | 'manual'

export type FloatingHideMode = boolean | 'no-overflow'

export type FloatingTrigger = 'click' | 'hover' | 'focus' | 'manual'

export interface FloatingStrategy {
  placement?: FloatingPlacement
  offset?: number
  flip?: boolean
  shift?: boolean
  hide?: FloatingHideMode
  autoSize?: boolean
  trigger?: FloatingTrigger
}

export type AnchorName = `--v-float-anchor-${string}`

export interface FloatingStyleVars {
  '--v-float-anchor-name': AnchorName
  '--ui-offset': string
  [key: string]: string
}
