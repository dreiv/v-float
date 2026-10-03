import { onScopeDispose } from 'vue'

const HOVER_CLOSE_DELAY = 120

export function usePopoverTrigger(panelId: string) {
  let closeTimer: ReturnType<typeof setTimeout> | undefined

  const getPanel = () => document.getElementById(panelId)

  function clearCloseTimer() {
    clearTimeout(closeTimer)
  }

  function open() {
    clearCloseTimer()
    const panel = getPanel()
    if (!panel) return

    try {
      panel.showPopover()
    } catch {
      queueMicrotask(() => panel.showPopover())
    }
  }

  function close() {
    clearCloseTimer()
    getPanel()?.hidePopover()
  }

  function closeAfterDelay() {
    clearCloseTimer()
    closeTimer = setTimeout(close, HOVER_CLOSE_DELAY)
  }

  onScopeDispose(clearCloseTimer)

  return { open, close, closeAfterDelay, clearCloseTimer }
}

export type PopoverTrigger = ReturnType<typeof usePopoverTrigger>
