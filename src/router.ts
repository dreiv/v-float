import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

export const primitiveRoutes: RouteRecordRaw[] = [
  {
    path: '/primitives',
    component: () => import('@/views/layouts/PrimitivesLayout.vue'),
    children: [
      { path: '', redirect: '/primitives/offset' },
      {
        path: 'offset',
        name: 'primitives-offset',
        component: () => import('@/views/primitives/OffsetView.vue'),
        meta: { title: 'Offset' },
      },
      {
        path: 'flip',
        name: 'primitives-flip',
        component: () => import('@/views/primitives/FlipView.vue'),
        meta: { title: 'Flip' },
      },
      {
        path: 'shift',
        name: 'primitives-shift',
        component: () => import('@/views/primitives/ShiftView.vue'),
        meta: { title: 'Shift' },
      },
      {
        path: 'arrow',
        name: 'primitives-arrow',
        component: () => import('@/views/primitives/ArrowView.vue'),
        meta: { title: 'Arrow' },
      },
      {
        path: 'size',
        name: 'primitives-size',
        component: () => import('@/views/primitives/SizeView.vue'),
        meta: { title: 'Size' },
      },
      {
        path: 'hide',
        name: 'primitives-hide',
        component: () => import('@/views/primitives/HideView.vue'),
        meta: { title: 'Hide' },
      },
    ],
  },
]

const routes: RouteRecordRaw[] = [{ path: '/', redirect: '/primitives/offset' }, ...primitiveRoutes]

const router = createRouter({
  history: createWebHashHistory('/v-float/'),
  routes,
})

export default router
