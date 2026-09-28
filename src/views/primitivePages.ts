export const primitivePages = [
  { name: 'demo', title: 'Demo', component: () => import('@/views/demo/DemoView.vue') },
  {
    name: 'offset',
    title: 'Offset',
    component: () => import('@/views/primitives/OffsetView.vue'),
  },
  { name: 'flip', title: 'Flip', component: () => import('@/views/primitives/FlipView.vue') },
  { name: 'shift', title: 'Shift', component: () => import('@/views/primitives/ShiftView.vue') },
  { name: 'arrow', title: 'Arrow', component: () => import('@/views/primitives/ArrowView.vue') },
  { name: 'size', title: 'Size', component: () => import('@/views/primitives/SizeView.vue') },
  { name: 'hide', title: 'Hide', component: () => import('@/views/primitives/HideView.vue') },
]
