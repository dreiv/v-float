import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { primitivePages } from '@/views/primitivePages'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const SITE_TITLE = 'v-float'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/layouts/PrimitivesLayout.vue'),
    children: [
      ...primitivePages.map(({ path, name, title, component }) => ({
        path,
        name,
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
