# v-float

A lightweight Floating UI/Popper replacement built on native CSS Anchor
Positioning and the Popover API. No runtime positioning math — placement,
flipping, shifting, sizing, and hiding are all handled in CSS.

## Import

```ts
import { useFloating, FloatingPanel, FloatingArrow } from '@/components/floating'
```

## Basic usage

```vue
<script setup>
import { useFloating } from '@/components/floating'

const { anchorProps, panelProps, arrowProps } = useFloating({ placement: 'bottom' })
</script>

<template>
  <button v-bind="anchorProps">Trigger</button>
  <FloatingPanel v-bind="panelProps">
    <FloatingArrow v-bind="arrowProps" />
    Content
  </FloatingPanel>
</template>
```

- `anchorProps` go on the trigger element.
- `panelProps` go on `<FloatingPanel>`.
- `arrowProps` go on `<FloatingArrow>` (optional — omit it if you don't want an arrow).

## Options

Pass these to `useFloating(options)`:

| Option      | Type                                 | Default     | Description                                              |
| ----------- | ------------------------------------ | ----------- | ---------------------------------------------------------|
| `placement` | `FloatingPlacement`                  | `'bottom'`  | Where the panel sits relative to the anchor.              |
| `offset`    | `number`                             | `8`         | Gap between anchor and panel, in pixels.                  |
| `flip`      | `boolean`                            | `true`      | Flip to the opposite side when there's no room.           |
| `shift`     | `boolean`                            | `false`     | Clamp the panel to stay within the viewport.               |
| `hide`      | `boolean \| 'no-overflow'`           | `false`     | Hide the panel when the anchor is off-screen or clipped.   |
| `autoSize`  | `boolean`                            | `false`     | Cap the panel's size to the available space.               |
| `trigger`   | `('click' \| 'hover' \| 'focus')[]`  | `['click']` | What opens the panel. Combine as needed.                   |

`FloatingPlacement` is one of: `top`, `top-start`, `top-end`, `right`,
`right-start`, `right-end`, `bottom`, `bottom-start`, `bottom-end`, `left`,
`left-start`, `left-end`.

## Return value

`useFloating()` returns:

- `anchorProps`, `panelProps`, `arrowProps` — bind these to your elements.
- `open()`, `close()` — imperatively open or close the panel.
- `anchorName`, `panelId` — the generated CSS anchor name and panel id.
- `options` — the reactive resolved options object.

## FloatingPanel

Accepts `placement`, `mode` (`'auto' | 'manual'`), `flip`, `shift`, `hide`,
`autoSize`, and `as` (the rendered tag, default `div`). Normally you just
spread `panelProps` onto it rather than setting these by hand.

It also exposes `show()`, `hide()`, and `toggle()` via template ref, for
manual control beyond `open`/`close`.

## Triggers

- `click` — uses the native popover `popovertarget` attribute.
- `hover` — opens on mouseenter, closes on mouseleave (with a short delay).
- `focus` — opens on focus, closes on blur.

Combine as needed, e.g. `trigger: ['click', 'focus']`.

## Examples

See `src/views/primitives/` for a live example of each primitive: arrow,
flip, hide, offset, shift, and size.

## Browser support

Requires CSS Anchor Positioning, `position-area`, and
`position-try-fallbacks` (Baseline Jan 2026 — current Chrome/Edge). The
arrow's flip-tracking additionally needs `@container anchored()`
(Chrome/Edge 143+).
