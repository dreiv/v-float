import type { FloatingPlacement } from '@/components/floating'

export interface TourStep {
  target: string
  title: string
  body: string
  placement?: FloatingPlacement
}
