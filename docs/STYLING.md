# Styling

Plain CSS, no framework. Global styles are imported once in `main.ts`;
component-local styles that don't belong anywhere else stay in scoped
`<style>` blocks.

## Files

```
src/assets/styles/
  layers.css       cascade order, nothing else — import this first
  tokens.css       all custom properties (:root)
  base.css         element reset
  surfaces.css     .ui-surface / .ui-field shared classes
  controls.css     playground form controls
  demo.css         demo page, menu, tooltip
  playground.css   playground stage / anchor / panel
  floating/        the floating-ui primitives (anchor positioning, popover)
```

## Layers

`layers.css` declares the full cascade order once:

```css
@layer reset, tokens, components, floating.base, floating.arrow, floating.utilities;
```

Every other stylesheet just opens `@layer <name> { ... }` using one of
those names — it doesn't need to know about anything else. This is what
keeps `floating/*.css` from ever losing to app CSS (or vice versa)
regardless of selector specificity or import order.

## Tokens

`tokens.css` holds two primitive scales plus a set of semantic aliases
that build on them:

- `--ui-tint-*` — `canvastext` mixed toward transparent (borders, muted
  text, dashed lines)
- `--ui-shade-*` — `canvastext` mixed toward `canvas` (solid fills)
- semantic aliases (`--ui-divider`, `--ui-hover-bg-strong`,
  `--ui-surface-border`, etc.) — what most component CSS should actually
  reach for

Add a new value to the scale before reaching for a raw `color-mix(...)`
literal in a component file.

## Shared classes

`.ui-surface` (filled, bordered, has hover/active/focus-visible — used by
buttons like the demo menu trigger and the playground anchor) and
`.ui-field` (plain bordered shell — used by the playground's scroll
button and the select control) live in `surfaces.css`. Add either as a
second class alongside a component's own BEM class; keep only what's
actually unique to that component in its own stylesheet.

## Conventions

- BEM (`block__element--modifier`) for component classes.
- Logical properties (`inline-size`, `inset-block-start`, ...) over
  physical ones, except inside `floating/*.css` where a value is pinned
  to a physical axis by `anchor()`/`position-area` on purpose.
- No visual-facing magic numbers — pull from `tokens.css` instead.
