export const primitivePages = [
  { name: 'demo', path: '', title: 'Demo', component: () => import('@/views/demo/DemoView.vue') },
  {
    name: 'offset',
    path: 'offset',
    title: 'Offset',
    component: () => import('@/views/primitives/OffsetView.vue'),
  },
  {
    name: 'flip',
    path: 'flip',
    title: 'Flip',
    component: () => import('@/views/primitives/FlipView.vue'),
  },
  {
    name: 'shift',
    path: 'shift',
    title: 'Shift',
    component: () => import('@/views/primitives/ShiftView.vue'),
  },
  {
    name: 'arrow',
    path: 'arrow',
    title: 'Arrow',
    component: () => import('@/views/primitives/ArrowView.vue'),
  },
  {
    name: 'size',
    path: 'size',
    title: 'Size',
    component: () => import('@/views/primitives/SizeView.vue'),
  },
  {
    name: 'hide',
    path: 'hide',
    title: 'Hide',
    component: () => import('@/views/primitives/HideView.vue'),
  },
]
