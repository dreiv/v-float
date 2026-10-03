import { onScopeDispose } from 'vue'

const HOVER_CLOSE_DELAY = 120

const manualOpen: string[] = []

function isOpen(panel: HTMLElement | null) {
  if (!panel) return false
  try {
    return panel.matches(':popover-open')
  } catch {
    return true
  }
}

function untrack(panelId: string) {
  const index = manualOpen.indexOf(panelId)
  if (index !== -1) manualOpen.splice(index, 1)
  if (manualOpen.length === 0) document.removeEventListener('keydown', onEscape, true)
}

function track(panelId: string) {
  untrack(panelId)
  manualOpen.push(panelId)
  if (manualOpen.length === 1) document.addEventListener('keydown', onEscape, true)
}

function onEscape(event: KeyboardEvent) {
  if (event.key !== 'Escape' || event.defaultPrevented || event.isComposing) return

  while (manualOpen.length > 0) {
    const panelId = manualOpen[manualOpen.length - 1]!
    const panel = document.getElementById(panelId)
    untrack(panelId)

    if (isOpen(panel)) {
      event.preventDefault()
      panel!.hidePopover()
      return
    }
  }
}

export function usePopoverTrigger(panelId: string) {
  let closeTimer: ReturnType<typeof setTimeout> | undefined

  const getPanel = () => document.getElementById(panelId)

  function clearCloseTimer() {
    clearTimeout(closeTimer)
  }

  function show(panel: HTMLElement) {
    panel.showPopover()
    if (panel.popover === 'manual') track(panelId)
  }

  function open() {
    clearCloseTimer()
    const panel = getPanel()
    if (!panel) return

    try {
      show(panel)
    } catch {
      queueMicrotask(() => show(panel))
    }
  }

  function close() {
    clearCloseTimer()
    untrack(panelId)
    getPanel()?.hidePopover()
  }

  function closeAfterDelay() {
    clearCloseTimer()
    closeTimer = setTimeout(close, HOVER_CLOSE_DELAY)
  }

  onScopeDispose(() => {
    clearCloseTimer()
    untrack(panelId)
  })

  return { open, close, closeAfterDelay, clearCloseTimer }
}

export type PopoverTrigger = ReturnType<typeof usePopoverTrigger>
