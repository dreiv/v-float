# Styling

Plain CSS, no framework. Component styles live next to their component;
only cross-cutting CSS is global.

## Global (`src/assets/styles/`)

```
layers.css   cascade order, nothing else
tokens.css   all custom properties (:root)
base.css     element reset
```

These three are imported first in `main.ts`.

## Layers

`layers.css` declares the full order once:

```css
@layer reset, tokens, ui, components, floating.base, floating.arrow, floating.utilities;
```

Every stylesheet just opens `@layer <name> { ... }`. `ui` holds the base look
of shared primitives (`UiButton`) so any `components` rule can override it
without fighting specificity.

## Where component CSS goes

- **One component only** → scoped `<style>` in the SFC.
- **Shared by a few components, or applied to slot content** → a plain `.css`
  file next to them, imported by those components:
  `demo/demo-menu.css`, `playground/playground.css`,
  `playground/controls/controls.css`. Scoped styles can't reach slot content
  rendered by another component, which is why the playground stage and panel
  styles aren't scoped.
- **Floating library** → `components/floating/styles/`, imported by
  `components/floating/index.ts`.

## Tokens

`tokens.css` holds the values that repeat across components:

- `--ui-sp-*` — spacing, `n * 0.25rem` (`--ui-sp-4` is `1rem`)
- `--ui-fs-*` — font sizes (`xs`, `sm`, `md`, `lg`, `xl`)
- `--ui-w-panel` — shared width for narrow floating panels (menus, tooltips, the controls dock)
- `--ui-radius-*`, `--ui-surface-radius`, `--ui-field-radius` — corner radii
- `--ui-border-width` and the composites `--ui-border`, `--ui-border-divider`,
  `--ui-border-control`
- `--ui-tint-*` — `canvastext` mixed toward transparent
- `--ui-shade-*` — `canvastext` mixed toward `canvas`
- `--ui-focus-*` — focus ring, offset and inset offset
- aliases (`--ui-divider`, `--ui-hover-bg-strong`, `--ui-surface-border`, ...)
  are what component CSS should reach for

Add a value to a scale before using a raw `color-mix(...)`, `rem` spacing or
font size in a component. Sizes that belong to one component (a fixed width,
the tab bar height, a font family used once) stay local.

## Color scheme

`base.css` sets `color-scheme: light dark`, and every color is derived from system
colors (`Canvas`, `CanvasText`, `AccentColor`) or `light-dark()`, so both schemes work
without a separate theme. Shadows use `--ui-shadow-color`, the one token that needs
`light-dark()`, because a tint of `CanvasText` would glow on a dark surface.

`prefers-reduced-motion` zeroes `--ui-transition-duration`; use that token for every
transition.

## Focus

The focus ring is a single `:focus-visible` rule in `base.css` built from
`--ui-focus-ring` and `--ui-focus-offset`. It applies to every element, including native
form controls, so the ring is the same accent color in both schemes instead of depending on
the browser's default ring.

Components never redraw the ring. Inside a container that clips overflow (tab bar,
controls dock, menu rows) set `outline-offset: var(--ui-focus-offset-inset)`.

## Buttons

`<UiButton>` (`components/ui/UiButton.vue`) renders a native `<button>` with
the shared look. Attributes, listeners and `v-bind="anchorProps"` fall through
to it. A template ref gives the component instance; use its `$el` for the
element. Add a component class only for what's unique (size, padding).

## Conventions

- BEM (`block__element--modifier`).
- Logical properties over physical ones, except in the floating library where
  `anchor()` pins a value to a physical axis on purpose.
- No visual magic numbers — use `tokens.css`.
