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

/** How aggressively `[data-hide]` reacts to the anchor leaving view. */
export type FloatingHideMode = boolean | 'no-overflow'

export interface FloatingStrategy {
  /** Preferred side. The browser flips/shifts away from here as needed. */
  placement?: FloatingPlacement
  /** Whether `position-try-fallbacks` (flip) is enabled. Default: true. */
  flip?: boolean
  /** Whether the edge-clamping shift utility is enabled. Default: false. */
  shift?: boolean
  /** Whether the panel hides once its anchor leaves the viewport. */
  hide?: FloatingHideMode
  /** Constrain the panel's box to the anchor's available space. */
  autoSize?: boolean
}

/**
 * The dashed-ident CSS custom property value that links an anchor element
 * to its floating element(s). Generated once per `useFloating()` call.
 */
export type AnchorName = `--v-float-anchor-${string}`

export interface FloatingStyleVars {
  '--v-float-anchor-name': AnchorName
}
