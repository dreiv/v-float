import { beforeEach, describe, expect, it, vi } from 'vitest'

import { mount, type VueWrapper } from '@vue/test-utils'
import DemoView from '@/views/demo/DemoView.vue'

const showPopover = vi.fn<() => void>()
const hidePopover = vi.fn<() => void>()

beforeEach(() => {
  showPopover.mockClear()
  hidePopover.mockClear()
  Object.defineProperty(HTMLElement.prototype, 'showPopover', {
    value: showPopover,
    configurable: true,
  })
  Object.defineProperty(HTMLElement.prototype, 'hidePopover', {
    value: hidePopover,
    configurable: true,
  })
  Element.prototype.scrollIntoView = vi.fn<() => void>()
  document.body.innerHTML = ''
})

function mountDemo() {
  return mount(DemoView, { attachTo: document.body })
}

function button(wrapper: VueWrapper, label: string) {
  const found = wrapper.findAll('button').find((candidate) => candidate.text() === label)
  if (!found) throw new Error(`No button labelled "${label}"`)
  return found
}

describe('DemoView tour', () => {
  it('walks through every step and cleans up its target', async () => {
    const wrapper = mountDemo()

    await button(wrapper, 'Take the tour').trigger('click')

    expect(showPopover).toHaveBeenCalledTimes(1)
    expect(wrapper.find('.tour__title').text()).toBe('Tooltips, nested')
    expect(document.querySelectorAll('[data-tour-active]')).toHaveLength(1)
    expect(document.querySelector('[data-tour-active]')?.getAttribute('data-tour')).toBe('tooltips')

    await button(wrapper, 'Next').trigger('click')
    expect(wrapper.find('.tour__title').text()).toBe('Menus and submenus')
    expect(document.querySelectorAll('[data-tour-active]')).toHaveLength(1)
    expect(document.querySelector('[data-tour-active]')?.getAttribute('data-tour')).toBe('menu')

    await button(wrapper, 'Back').trigger('click')
    expect(wrapper.find('.tour__title').text()).toBe('Tooltips, nested')

    for (let step = 0; step < 4; step++) await button(wrapper, 'Next').trigger('click')
    expect(wrapper.find('.tour__title').text()).toBe('No positioning code')

    await button(wrapper, 'Done').trigger('click')
    expect(hidePopover).toHaveBeenCalledTimes(1)
    expect(document.querySelector('[data-tour-active]')).toBeNull()
    expect(
      document.querySelector('[data-floating-anchor][style*="--v-float-anchor-name"]'),
    ).not.toBeNull()

    wrapper.unmount()
  })

  it('stops on skip and on escape', async () => {
    const wrapper = mountDemo()

    await button(wrapper, 'Take the tour').trigger('click')
    await button(wrapper, 'Skip').trigger('click')
    expect(document.querySelector('[data-tour-active]')).toBeNull()

    await button(wrapper, 'Take the tour').trigger('click')
    await wrapper.find('.tour').trigger('keydown', { key: 'Escape' })
    expect(document.querySelector('[data-tour-active]')).toBeNull()
    expect(hidePopover).toHaveBeenCalledTimes(2)

    wrapper.unmount()
  })
})

describe('DemoView context menu', () => {
  it('opens at the pointer and closes after an action', async () => {
    const wrapper = mountDemo()
    const area = wrapper.find('[data-tour="context"]')

    await area.trigger('contextmenu', { clientX: 120, clientY: 80 })

    const anchor = wrapper.find<HTMLElement>('.demo-context__anchor')
    expect(showPopover).toHaveBeenCalledTimes(1)
    expect(anchor.element.style.left).toBe('120px')
    expect(anchor.element.style.top).toBe('80px')

    const copy = wrapper
      .findAll('[role="menuitem"]')
      .find((item) => item.find('.demo-menu__item-label').text() === 'Copy')
    await copy?.trigger('click')
    expect(wrapper.find('strong').text()).toBe('Copy')
    expect(hidePopover).toHaveBeenCalledTimes(1)

    wrapper.unmount()
  })

  it('keeps the menu open when a submenu row is clicked', async () => {
    const wrapper = mountDemo()

    await wrapper.find('[data-tour="context"]').trigger('contextmenu', { clientX: 10, clientY: 10 })
    const share = wrapper
      .findAll('[role="menuitem"][aria-haspopup="menu"]')
      .find((item) => item.text().startsWith('Share') && item.element.closest('[role="menu"]'))!
    await share.trigger('click')

    expect(hidePopover).not.toHaveBeenCalled()

    wrapper.unmount()
  })
})
