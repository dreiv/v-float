import { describe, it, expect } from 'vitest'

import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '@/App.vue'
import { routes } from '@/router'
import { primitivePages } from '@/views/primitivePages'

async function mountAt(path: string) {
  const router = createRouter({ history: createMemoryHistory(), routes })
  await router.push(path)

  const wrapper = mount(App, { global: { plugins: [router] } })
  await flushPromises()

  return { router, wrapper }
}

describe('App', () => {
  it('renders a tab for every primitive page', async () => {
    const { wrapper } = await mountAt('/')

    expect(wrapper.findAll('.primitives-layout__tab')).toHaveLength(primitivePages.length)
  })

  it('serves the demo at the root without redirecting', async () => {
    const { router } = await mountAt('/')

    expect(router.currentRoute.value.name).toBe('demo')
    expect(router.currentRoute.value.redirectedFrom).toBeUndefined()
  })

  it('renders the not-found page for unknown paths', async () => {
    const { router, wrapper } = await mountAt('/does-not-exist')

    expect(router.currentRoute.value.name).toBe('not-found')
    expect(wrapper.find('h1').text()).toBe('Page not found')
  })
})
