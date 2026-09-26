/// <reference types="vite/client" />

// CSS Anchor Positioning is very new; some TS/CSSOM lib versions don't yet
// know about these properties on CSSStyleDeclaration. Widening them here
// keeps `el.style.setProperty('anchor-name', ...)`-style code (and the
// inline styles the floating engine writes) type-safe without waiting on
// upstream lib.dom.d.ts updates.
export {}

declare global {
  interface CSSStyleDeclaration {
    anchorName?: string
    positionAnchor?: string
    positionArea?: string
    positionTryFallbacks?: string
    positionVisibility?: string
  }
}
