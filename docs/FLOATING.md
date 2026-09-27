# v-float — CSS-first floating engine

Zero-dependency Floating UI/Popper replacement built on CSS Anchor
Positioning + the Popover API. JS only mints an anchor name and toggles
data attributes — all placement math is CSS, in
`src/assets/styles/floating/`.

## Layers

| Layer     | File            | Does                                 |
| --------- | --------------- | ------------------------------------ |
| tokens    | `tokens.css`    | spacing/motion custom properties     |
| base      | `popover.css`   | anchor link, placement, offset, flip |
| arrow     | `arrow.css`     | arrow position + flip-tracking       |
| utilities | `utilities.css` | size, hide, shift                    |

## How it works

- `anchor-name`/`position-anchor` hold a `<dashed-ident>` via a CSS var
  (`--v-float-anchor-name`), minted uniquely per instance in
  `useFloating.ts`.
- **Flip** — one shared `position-try-fallbacks: flip-block, flip-inline,
flip-block flip-inline;` on the panel. Browser tries the primary spot,
  then flips whichever axis overflows, then both for corners.
- **Shift** — `anchor-center` for plain centered placements; when
  `data-shift="true"`, a manual clamp takes over using
  `anchor-size(self-inline/self-block)` (the panel's own size — Baseline
  Jan 2026) so both viewport edges are respected, not just the near one.
- **Arrow** — anchored to the same anchor, positioned with `anchor()`.
  Also uses `@container anchored(fallback: ...)` to detect a real flip
  and re-point itself (see below).
- **Size** — `anchor-size()` caps max-width/height.
- **Hide** — `position-visibility`.

## The arrow-flip fix

`position-try-fallbacks` updates the panel's own position automatically on
a flip. The arrow is a separate element keyed off the _requested_
`data-placement`, which never reflected an actual flip — so it used to
point the wrong way once the panel silently flipped. Fix:
`container-type: anchored` on the panel + `@container anchored(fallback:
flip-block)` on the arrow, so it can detect the flip and swap edges.

**Chrome/Edge 143+ only.** Degrades gracefully elsewhere — the arrow just
stays put on unsupported engines, same as before this fix.

## Known gaps

- Arrow doesn't handle the _combined_ corner flip
  (`flip-block flip-inline`), only single-axis. Rare in practice; extend
  `arrow.css` if you need it.
- Flip/shift overflow is checked against the panel's own containing
  block — the viewport, since it's `position: fixed`. An anchor nested in
  its own `overflow: auto` container needs `position: absolute` + a
  positioned ancestor instead, with the math adjusted accordingly.

## Browser support

Core anchor positioning: Baseline Jan 2026 (Chrome/Edge 125+, Safari 26+,
Firefox 147+). `@container anchored()` (used only for the arrow's
flip-tracking): Chrome/Edge 143+ so far.

If it looks right in one browser and wrong in another, compare exact
build numbers first (`edge://version`, `chrome://version`) — embedded
webviews (VS Code, Electron, WebView2) often run a different Chromium
build than your system browser.

## Usage

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

The six views under `src/views/primitives/` are placeholders, not filled
demos.
