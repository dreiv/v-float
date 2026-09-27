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
- **Placement** — each side (`top`/`bottom`/`left`/`right`) sets
  `position-area: block-start | block-end | inline-start | inline-end`,
  which spans the full cross-axis by default. The `-start`/`-end`/plain
  variant then sets `justify-self`/`align-self` explicitly
  (`start`/`end`/`anchor-center`) instead of computing an offset with
  `anchor()`. The gap to the anchor is a `margin-block-*`/
  `margin-inline-*` on the side facing the anchor, not a `calc()`.
- **Flip** — one shared `position-try-fallbacks: flip-block, flip-inline,
  flip-block flip-inline;` on the panel. Per spec, a flip mirrors the
  position-area's axis and any margin on that axis, so the offset margin
  flips sides along with the placement — no extra rule needed.
- **Shift** — `anchor-center` for plain centered placements; when
  `data-shift="true"`, a manual clamp takes over using
  `anchor-size(self-inline/self-block)` (the panel's own size — Baseline
  Jan 2026) so both viewport edges are respected, not just the near one.
  This still works unchanged under `position-area`, because each side's
  area spans the full cross-axis, so its near edge is the viewport edge
  (offset 0) — same frame of reference the clamp already assumed.
- **Arrow** — anchored to the same anchor, positioned with `anchor()`
  (there's no `position-area` equivalent precise enough for an 8px
  diamond). Also uses `@container anchored(fallback: ...)` to detect a
  real flip and re-point itself (see below).
- **Size** — `anchor-size()` caps max-width/height.
- **Hide** — `position-visibility`.

## The arrow-flip fix

`position-try-fallbacks` updates the panel's own position automatically on
a flip. The arrow is a separate element keyed off the _requested_
`data-placement`, which never reflected an actual flip — so it used to
point the wrong way once the panel silently flipped. Fix:
`container-type: anchored` on the panel + `@container anchored(fallback:
flip-block)` on the arrow, so it can detect the flip and swap edges.

## Why `position-area`, not raw `anchor()` + `justify-self`

The panel used to set `bottom: calc(anchor(top) + var(--ui-offset))`
plus `justify-self: anchor-center` etc. for every one of the 12
placements. That's the older technique from before `position-area`
reached Baseline (Jan 2026), and it's more fragile: it depends on
`position-anchor` resolving to a real anchor before the `anchor()`
call is read, and on getting every offset's sign right by hand.
`position-area` expresses "which side of the anchor" declaratively and
lets `position-try-fallbacks: flip-*` flip both the area and the
margin for you. If a panel still looks right in one Chromium build and
wrong in another, compare exact build numbers first (`edge://version`,
`chrome://version`) — embedded webviews (VS Code, Electron, WebView2)
often run a different Chromium than your system browser, and anchor
positioning is still evolving release to release.

## Known gaps

- Arrow doesn't handle the _combined_ corner flip
  (`flip-block flip-inline`), only single-axis. Rare in practice; extend
  `arrow.css` if you need it.
- Flip/shift overflow is checked against the panel's own containing
  block — the viewport, since it's `position: fixed`. An anchor nested in
  its own `overflow: auto` container needs `position: absolute` + a
  positioned ancestor instead, with the math adjusted accordingly.

## Browser support

Core anchor positioning + `position-area` + `position-try-fallbacks`:
Baseline Jan 2026 (Chrome/Edge 125+ for the core, current stable for
`position-area`). `@container anchored()` (used only for the arrow's
flip-tracking): Chrome/Edge 143+.

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

The six views under `src/views/primitives/` show each primitive in
isolation with live controls.
