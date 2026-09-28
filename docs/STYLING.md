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

`tokens.css` has two primitive scales plus semantic aliases:

- `--ui-tint-*` — `canvastext` mixed toward transparent
- `--ui-shade-*` — `canvastext` mixed toward `canvas`
- aliases (`--ui-divider`, `--ui-hover-bg-strong`, `--ui-surface-border`, ...)
  are what component CSS should reach for

Add a value to the scale before using a raw `color-mix(...)` in a component.

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
