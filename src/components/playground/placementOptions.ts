export const placementOptions = [
  { value: 'top', label: 'Top' },
  { value: 'top-start', label: 'Top start' },
  { value: 'top-end', label: 'Top end' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'bottom-start', label: 'Bottom start' },
  { value: 'bottom-end', label: 'Bottom end' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
] as const

export const verticalPlacementOptions = placementOptions.filter(
  (option) => option.value.startsWith('top') || option.value.startsWith('bottom'),
)

export const hideModeOptions = [
  { value: 'false', label: 'Off' },
  { value: 'true', label: 'anchors-visible' },
  { value: 'no-overflow', label: 'no-overflow' },
] as const

export const triggerOptions = [
  { value: 'manual', label: 'Manual (always open)' },
  { value: 'click', label: 'Click' },
  { value: 'hover', label: 'Hover' },
  { value: 'focus', label: 'Focus' },
] as const
