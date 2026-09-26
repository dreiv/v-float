import { FLOATING_PLACEMENTS, type FloatingPlacement } from '@/composables/floating/types'

const PLACEMENT_LABELS: Record<FloatingPlacement, string> = {
  top: 'Top',
  'top-start': 'Top start',
  'top-end': 'Top end',
  right: 'Right',
  'right-start': 'Right start',
  'right-end': 'Right end',
  bottom: 'Bottom',
  'bottom-start': 'Bottom start',
  'bottom-end': 'Bottom end',
  left: 'Left',
  'left-start': 'Left start',
  'left-end': 'Left end',
}

export const placementOptions = FLOATING_PLACEMENTS.map((value) => ({
  value,
  label: PLACEMENT_LABELS[value],
}))

export const verticalPlacementOptions = placementOptions.filter(
  (option) => option.value.startsWith('top') || option.value.startsWith('bottom'),
)

export const hideModeOptions = [
  { value: 'false', label: 'Off' },
  { value: 'true', label: 'anchors-visible' },
  { value: 'no-overflow', label: 'no-overflow' },
] as const

export const triggerOptions = [
  { value: 'click', label: 'Click' },
  { value: 'hover', label: 'Hover' },
  { value: 'focus', label: 'Focus' },
] as const
