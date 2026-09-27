# v-float — CSS-first floating engine

A zero-dependency reimplementation of the core Floating UI / Popper.js
primitives using native CSS Anchor Positioning, the Popover API, and
`@starting-style`. No positioning math runs in JavaScript — JS's only job is
minting a unique anchor name and toggling data attributes; every actual
placement rule lives in `src/styles/floating/`.

## Layers

| Layer | File | Responsibility |
|---|---|---|
| `floating.tokens` | `tokens.css` | Spacing/size/motion custom properties |
| `floating.base` | `popover.css` | Anchor linkage, placement, offset, flip |
| `floating.arrow` | `arrow.css` | Arrow centering via `anchor()` |
| `floating.utilities` | `utilities.css` | Size (`anchor-size()`), hide (`position-visibility`), shift |

## The anchor-name trick

`anchor-name` and `position-anchor` take a `<dashed-ident>`. A CSS custom
property can hold one, and `var()` substitution happens *before* the value
is parsed — so `anchor-name: var(--v-float-anchor-name)` is valid, and lets
`useFloating()` mint a collision-free name (`--v-float-anchor-42`) per
instance in JS while the rule itself stays static CSS. See
`useFloating.ts` and `popover.css`.

## Primitive → mechanism map

1. **Offset** — margin on the logical edge matching the placement, driven by
   `--ui-offset` (`popover.css`).
2. **Flip** — `position-try-fallbacks: flip-block` (for top/bottom
   placements) or `flip-inline` (for left/right placements). These are the
   browser's built-in try-tactics: they mirror the box's own inset
   properties across the anchor, so the same `--ui-offset` margin that
   applies in the primary placement is preserved automatically in the
   flipped one — no separate `@position-try` block is needed to keep the
   offset.
3. **Shift** — partial. `justify-self: anchor-center` covers cross-axis
   centering for free. A true Floating-UI-style axis slide needs the
   floating element's *own* box size in the clamp math; there is no
   `anchor-size(self)` yet, so `utilities.css` documents this as a
   best-effort approximation, not parity.
4. **Arrow** — `anchor()` calls centering a 45°-rotated square on whichever
   edge the panel currently occupies, keyed off `data-placement` via
   descendant selectors (`arrow.css`).
5. **Size** — `anchor-size()` bounds `max-width`/`max-height` to the
   anchor's available space, floored by a viewport-relative ceiling
   (`utilities.css`).
6. **Hide** — `position-visibility: anchors-visible` (or `no-overflow`).

## Browser support

CSS Anchor Positioning (`anchor()`, `anchor-size()`, `position-try-fallbacks`,
`position-visibility`) reached Baseline in 2026: Chrome/Edge 125+, Safari 26+,
and Firefox 147+ all support it natively. Older versions of any of these
browsers fall back to the popover's default top-layer, top-of-viewport
placement — functional, just unanchored. Check your actual target browser
versions before relying on this as the only positioning strategy for a
production surface.

## Usage sketch (not included in this scaffold)

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

Per the brief, this file is documentation only — the six primitive views
under `src/views/primitives/` are placeholders, not filled-in demos.
