import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { primitiveRoutes } from './routes/primitives.routes'

const routes: RouteRecordRaw[] = [{ path: '/', redirect: '/primitives/offset' }, ...primitiveRoutes]

const router = createRouter({
  history: createWebHashHistory('/v-float/'),
  routes,
})

export default router
