import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { primitivePages } from '@/views/primitivePages'

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: { name: 'demo' } },
  {
    path: '/primitives',
    component: () => import('@/views/layouts/PrimitivesLayout.vue'),
    children: [
      { path: '', redirect: { name: 'demo' } },
      ...primitivePages.map(({ name, component }) => ({ path: name, name, component })),
    ],
  },
]

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})
