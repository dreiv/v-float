<script setup lang="ts">
import { DemoMenu, DemoMenuItem, DemoSubmenu } from '@/components/demo'
import { TooltipText } from '@/components/tooltip'
</script>

<template>
  <div class="demo">
    <header class="demo__intro">
      <h1>Demo</h1>
      <p>
        Everything below is built from the same two primitives used on the other tabs — a
        <code>popover</code> element positioned with CSS
        <TooltipText
          hint="position-anchor + anchor(): the panel reads its position straight off its trigger, no JS math involved."
        >
          anchor positioning
        </TooltipText>
        , driven by <code>useFloating</code>. The browser's own
        <TooltipText
          hint="The native Popover API. Open popovers are tracked in a stack; the browser handles outside-click and Escape dismissal for you."
          placement="bottom"
        >
          Popover API
        </TooltipText>
        also tracks nesting by DOM position: if a popover's trigger lives inside another popover's
        content, the two are treated as one
        <TooltipText
          hint="Opening the inner popover doesn't close the outer one, and clicking anywhere outside both closes the whole group at once."
          placement="bottom"
        >
          light-dismiss stack
        </TooltipText>
        . That's what the menu below relies on.
      </p>
      <p>
        Every dashed-underline word above is the same trigger pattern: a small
        <code>Tooltip</code> component wrapping <code>useFloating</code> with
        <code>trigger: ['hover', 'focus']</code> and <code>role="tooltip"</code>.
      </p>
    </header>

    <section class="demo__section">
      <h2>Menu with a submenu</h2>
      <p>
        A click-triggered <code>DemoMenu</code>, containing a row (<code>DemoSubmenu</code>) that
        opens a second menu panel when clicked — or, from the keyboard, when it's focused and Enter
        or Space is pressed, the same as any button. One row inside that submenu carries its own
        hover-triggered tooltip, three DOM layers deep, and the whole thing still dismisses as a
        single group.
      </p>

      <div class="demo__stage">
        <DemoMenu label="File actions">
          <DemoMenuItem label="Rename" shortcut="⌘R" hint="Give this file a new name in place." />
          <DemoMenuItem
            label="Duplicate"
            shortcut="⌘D"
            hint="Create a copy alongside the original, with '(copy)' appended."
          />
          <DemoSubmenu label="Share">
            <DemoMenuItem label="Copy link" hint="Anyone with the link can view, not edit." />
            <DemoMenuItem
              label="Invite people"
              hint="Send an invite by email. They'll need an account to accept it."
            />
          </DemoSubmenu>
          <DemoMenuItem label="Delete" shortcut="⌫" hint="Moves the file to Trash for 30 days." />
        </DemoMenu>
      </div>
    </section>

    <section class="demo__section">
      <h2>How the CSS popover is doing this</h2>
      <p>
        There's no JavaScript position math anywhere on this page. Every panel is a
        <code>popover</code> element anchored to its trigger with CSS, and placement comes from
        attribute selectors reading a <code>data-placement</code> value:
      </p>
      <pre class="demo__code"><code>.v-float-panel {
  position-anchor: var(--v-float-anchor-name);
  position: fixed;

  &amp;[data-placement^='top'] {
    position-area: block-start;
    margin-block-end: var(--ui-offset);
  }
}</code></pre>
      <p>
        The trigger sets <code>anchor-name</code> through an inline custom property, unique per
        instance, and <code>usePopoverTrigger</code> calls the element's own
        <code>showPopover()</code> / <code>hidePopover()</code> — the same calls a hover, focus, or
        click handler triggers here. Swapping <code>trigger: ['click']</code> for
        <code>['hover', 'focus']</code> is the entire difference between a menu row and a tooltip at
        the interaction level.
      </p>
    </section>
  </div>
</template>

<style scoped>
@layer components {
  .demo {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    max-inline-size: 40rem;
    margin: 0 auto;
    padding-block-end: 4rem;
    font-size: 1rem;
  }

  .demo__intro h1 {
    margin: 0 0 0.75rem;
    font-size: 1.75rem;
  }

  .demo__intro p,
  .demo__section p {
    font-size: 1rem;
    line-height: 1.65;
    color: var(--ui-text-muted);

    & a {
      color: inherit;
    }
  }

  .demo__section h2 {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
  }

  .demo__stage {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    min-block-size: 8.75rem;
    margin-block-start: 1rem;
    padding: 2rem;
    border: 1px dashed var(--ui-surface-border);
    border-radius: var(--ui-surface-radius);
  }

  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace;
    font-size: 0.875em;
    padding: 0.15em 0.4em;
    background: var(--ui-shade-08);
    border: 1px solid var(--ui-tint-12);
    border-radius: 4px;
  }

  .demo__code {
    margin: 0.75rem 0;
    padding: 1rem 1.15rem;
    overflow-x: auto;
    background: var(--ui-surface-bg-subtle);
    border: 1px solid var(--ui-divider);
    border-radius: var(--ui-surface-radius);

    & code {
      display: block;
      font-size: 0.85rem;
      line-height: 1.6;
      padding: 0;
      background: none;
      border: none;
    }
  }
}
</style>
