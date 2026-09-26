/// <reference types="vite/client" />

export {};

declare global {
  interface CSSStyleDeclaration {
    anchorName?: string;
    positionAnchor?: string;
    positionArea?: string;
    positionTryFallbacks?: string;
    positionVisibility?: string;
  }
}
