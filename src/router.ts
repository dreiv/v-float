import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const SITE_TITLE = 'v-float'

export const primitivePages = [
  { name: 'demo', title: 'Demo', component: () => import('@/views/demo/DemoView.vue') },
  { name: 'offset', title: 'Offset', component: () => import('@/views/primitives/OffsetView.vue') },
  { name: 'flip', title: 'Flip', component: () => import('@/views/primitives/FlipView.vue') },
  { name: 'shift', title: 'Shift', component: () => import('@/views/primitives/ShiftView.vue') },
  { name: 'arrow', title: 'Arrow', component: () => import('@/views/primitives/ArrowView.vue') },
  { name: 'size', title: 'Size', component: () => import('@/views/primitives/SizeView.vue') },
  { name: 'hide', title: 'Hide', component: () => import('@/views/primitives/HideView.vue') },
]

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/layouts/PrimitivesLayout.vue'),
    children: [
      ...primitivePages.map(({ name, title, component }) => ({
        name,
        path: name === 'demo' ? '' : name,
        component,
        meta: { title },
      })),
      {
        path: ':pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFoundView.vue'),
        meta: { title: 'Page not found' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · ${SITE_TITLE}` : SITE_TITLE
})

export default router
