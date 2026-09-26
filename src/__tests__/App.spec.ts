import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from '../App.vue'
import { primitiveRoutes } from '../router/routes/primitives.routes'

describe('App', () => {
  it('mounts and renders the router outlet', async () => {
    const router = createRouter({
      history: createWebHashHistory(),
      routes: [{ path: '/', redirect: '/primitives/offset' }, ...primitiveRoutes],
    })
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.find('#app-shell').exists()).toBe(true)
  })
})
