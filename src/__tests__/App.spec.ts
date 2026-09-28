import { describe, it, expect } from 'vitest'

import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '@/App.vue'
import { routes } from '@/router'
import { primitivePages } from '@/views/primitivePages'

describe('App', () => {
  it('renders a tab for every primitive page', async () => {
    const router = createRouter({ history: createMemoryHistory(), routes })
    await router.push('/')

    const wrapper = mount(App, { global: { plugins: [router] } })
    await flushPromises()

    expect(wrapper.findAll('.primitives-layout__tab')).toHaveLength(primitivePages.length)
  })
})
