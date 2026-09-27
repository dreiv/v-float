import { onScopeDispose } from 'vue'

type PopoverEl = HTMLElement & {
  showPopover?: () => void
  hidePopover?: () => void
}

const HOVER_CLOSE_DELAY = 120

export function usePopoverTrigger(panelId: string) {
  let closeTimer: ReturnType<typeof setTimeout> | undefined

  function getPanelEl(): PopoverEl | null {
    return document.getElementById(panelId) as PopoverEl | null
  }

  function clearCloseTimer() {
    if (closeTimer === undefined) return
    clearTimeout(closeTimer)
    closeTimer = undefined
  }

  function open() {
    clearCloseTimer()
    getPanelEl()?.showPopover?.()
  }

  function close() {
    clearCloseTimer()
    getPanelEl()?.hidePopover?.()
  }

  function closeAfterDelay() {
    clearCloseTimer()
    closeTimer = setTimeout(close, HOVER_CLOSE_DELAY)
  }

  onScopeDispose(clearCloseTimer)

  return { open, close, closeAfterDelay, clearCloseTimer }
}

export type PopoverTrigger = ReturnType<typeof usePopoverTrigger>
