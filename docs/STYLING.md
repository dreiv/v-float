# Styling

Plain CSS, no framework. Component styles live next to their component; only cross-cutting CSS is global.

## Global (`src/assets/styles/`)

- `layers.css` — cascade order (`reset, tokens, ui, components, floating.*`)
- `tokens.css` — all custom properties
- `base.css` — element reset and the focus ring

Every stylesheet opens with `@layer <name> { ... }`. The `ui` layer holds shared primitives like `UiButton`, so `components` rules can override them.

## Where component CSS goes

- One component only: scoped `<style>` in the SFC.
- Shared by several components, or applied to slot content: a plain `.css` file next to them.
- Floating library: `components/floating/styles/`.

## Tokens

Use the aliases in `tokens.css` (`--ui-sp-*`, `--ui-fs-*`, `--ui-tint-*`, `--ui-shade-*`, `--ui-radius-*`, ...) instead of raw values. Use `--ui-transition-duration` for every transition.

## Focus

One `:focus-visible` rule in `base.css` draws the ring. Components don't redraw it. Inside clipped containers, set `outline-offset: var(--ui-focus-offset-inset)`.

## Buttons

`<UiButton>` renders a native `<button>` that stays static (hit area and popover anchor). All visuals and the pressed sink live on the inner `.ui-button__face`. Style state colors there. Set padding with `--ui-button-padding`.

## Conventions

- BEM (`block__element--modifier`).
- Logical properties over physical ones (except in the floating library).
- No magic numbers where a token exists.
