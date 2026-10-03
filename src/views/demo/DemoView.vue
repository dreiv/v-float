<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import {
  DemoContextMenu,
  DemoMenu,
  DemoMenuAction,
  DemoMenuItem,
  DemoProfileCard,
  DemoSubmenu,
} from '@/components/demo'
import '@/components/demo/demo-stage.css'
import { OnboardingTour, type TourStep } from '@/components/tour'
import { TooltipText } from '@/components/tooltip'
import UiButton from '@/components/ui/UiButton.vue'

const tour = useTemplateRef<InstanceType<typeof OnboardingTour>>('tour')
const lastAction = ref('none yet')

const tourSteps: TourStep[] = [
  {
    target: '[data-tour="tooltips"]',
    title: 'Tooltips, nested',
    body: 'Every dashed word is a tooltip. Hover one, then hover a dashed word inside it.',
  },
  {
    target: '[data-tour="menu"]',
    title: 'Menus and submenus',
    body: 'Click the button, then the Share row. Both panels are popovers in the same dismiss group.',
  },
  {
    target: '[data-tour="context"]',
    title: 'Context menu',
    body: 'Right-click inside this box, or focus it and press the context-menu key.',
  },
  {
    target: '[data-tour="cards"]',
    title: 'Hover cards',
    body: 'Hover or focus a handle to preview its profile. The card stays open while you move into it.',
  },
  {
    target: '[data-tour="css"]',
    title: 'No positioning code',
    body: 'All of the placement above comes from a few lines of CSS like this.',
    placement: 'top',
  },
]
</script>

<template>
  <article class="prose demo">
    <header>
      <h1>Demo</h1>
      <p data-tour="tooltips">
        Everything below is built from the same two primitives used on the other tabs — a
        <code>popover</code> element positioned with CSS
        <TooltipText>
          <template #hint>
            <code>position-anchor</code> + <code>anchor()</code>: the panel reads its position
            straight off its trigger, no JS math involved. When it runs out of room, the browser
            tries
            <TooltipText
              placement="bottom"
              hint="position-try-fallbacks: flip-block, flip-inline, then both at once. The arrow follows along through a container query on the anchored fallback."
            >
              fallback positions
            </TooltipText>
            on its own.
          </template>
          anchor positioning </TooltipText
        >, driven by <code>useFloating</code>. The browser's own
        <TooltipText placement="bottom">
          <template #hint>
            The native Popover API. Open popovers are tracked in a
            <TooltipText
              placement="bottom"
              hint="Opening an auto popover closes every open one that isn't one of its ancestors. DOM-nested menus are ancestors, so they stay open together."
            >
              stack
            </TooltipText>
            ; the browser handles outside-click and Escape dismissal for you.
          </template>
          Popover API
        </TooltipText>
        also tracks nesting by DOM position: if a popover's trigger lives inside another popover's
        content, the two are treated as one
        <TooltipText
          hint="Opening the inner popover doesn't close the outer one, and clicking anywhere outside both closes the whole group at once."
          placement="bottom"
        >
          light-dismiss stack </TooltipText
        >. That's what the menus below rely on.
      </p>
      <p>
        Every dashed-underline word above is the same trigger pattern: a small
        <code>Tooltip</code> component wrapping <code>useFloating</code> with
        <code>trigger: ['hover', 'focus']</code> and <code>role="tooltip"</code>. Tooltips can
        <TooltipText placement="bottom">
          <template #hint>
            Hover <em>fallback positions</em> or <em>stack</em> inside the tooltips above: an inner
            trigger inside a tooltip is just another popover in the stack.
          </template>
          nest
        </TooltipText>
        too.
      </p>
      <UiButton @click="tour?.start()">Take the tour</UiButton>
    </header>

    <section>
      <h2>Menu with a submenu</h2>
      <p>
        A
        <TooltipText
          hint="trigger: ['click'] puts popovertarget on the button, so there is no click handler at all: the browser toggles the popover itself."
        >
          click-triggered
        </TooltipText>
        menu, <code>DemoMenu</code>, containing a row (<code>DemoSubmenu</code>) that opens a second
        menu panel when clicked — or, from the keyboard, when it's focused and Enter or Space is
        pressed, the same as any button. One row inside that submenu carries its own
        <TooltipText
          hint="Hover and focus handlers call showPopover() and hidePopover() on a manual popover, which never takes part in light dismiss."
        >
          hover-triggered tooltip </TooltipText
        >, three DOM layers deep, and the whole thing still dismisses as a
        <TooltipText
          hint="Auto popovers nested in the DOM share one dismiss group: Escape closes the top one, and an outside click closes them all."
        >
          single group </TooltipText
        >.
      </p>

      <div class="demo-stage" data-tour="menu">
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

    <section>
      <h2>Context menu</h2>
      <p>
        Right-click anywhere in the box, or focus it and press the context-menu key. The panel is a
        regular <code>useFloating</code> panel anchored to a
        <TooltipText
          hint="Anchor positioning only needs an element with an anchor-name. A fixed 0×0 span moved to the pointer coordinates is enough."
        >
          zero-size element
        </TooltipText>
        that follows the pointer, opened as an <code>auto</code> popover so
        <TooltipText
          hint="Auto popovers get light dismiss from the browser: outside clicks and Escape close them, and focus returns to where it was."
        >
          clicking away or pressing Escape
        </TooltipText>
        closes it.
      </p>

      <DemoContextMenu data-tour="context">
        <p>
          Right-click here. Last action: <strong>{{ lastAction }}</strong>
        </p>

        <template #menu>
          <DemoMenuAction label="Copy" shortcut="⌘C" @click="lastAction = 'Copy'" />
          <DemoMenuAction label="Paste" shortcut="⌘V" @click="lastAction = 'Paste'" />
          <DemoSubmenu label="Share">
            <DemoMenuAction label="Copy link" @click="lastAction = 'Copy link'" />
            <DemoMenuAction label="Invite people" @click="lastAction = 'Invite people'" />
          </DemoSubmenu>
          <DemoMenuAction label="Delete" shortcut="⌫" @click="lastAction = 'Delete'" />
        </template>
      </DemoContextMenu>
    </section>

    <section>
      <h2>Hover card</h2>
      <p>
        Hover or focus a handle to preview a profile. Unlike a tooltip, a
        <TooltipText
          hint="Same useFloating options as a tooltip, but without role=tooltip, which isn't allowed to contain links."
        >
          hover card
        </TooltipText>
        holds interactive content, so the panel stays open while the pointer — or
        <TooltipText
          hint="Focus leaving the trigger starts the same short close timer; focus entering the panel cancels it."
        >
          keyboard focus
        </TooltipText>
        — moves into it.
      </p>

      <div class="demo-stage" data-tour="cards">
        <p>
          Reviewed by
          <DemoProfileCard
            name="Mira Okafor"
            handle="mira"
            bio="Maintains the design tokens and reviews every new popover."
            href="https://example.com/mira"
          />
          and
          <DemoProfileCard
            name="Jonas Weber"
            handle="jonas"
            bio="Keeps the browser-support table honest."
            href="https://example.com/jonas"
          />.
        </p>
      </div>
    </section>

    <section>
      <h2>How the CSS popover is doing this</h2>
      <p>
        There's no JavaScript position math anywhere on this page. Every panel is a
        <code>popover</code> element anchored to its trigger with CSS, and placement comes from
        <TooltipText
          hint="FloatingPanel writes data-placement, data-flip, data-shift, data-hide and data-auto-size from the options, and popover.css reads them back with attribute selectors."
        >
          attribute selectors
        </TooltipText>
        reading a <code>data-placement</code> value:
      </p>
      <pre data-tour="css"><code>.v-float-panel {
  position-anchor: var(--v-float-anchor-name);
  position: fixed;

  &amp;[data-placement^='top'] {
    position-area: block-start;
    margin-block-end: var(--ui-offset);
  }
}</code></pre>
      <p>
        The trigger sets <code>anchor-name</code> through an
        <TooltipText
          hint="--v-float-anchor-name is derived from useId(), so any number of anchors can coexist on one page."
        >
          inline custom property </TooltipText
        >, unique per instance, and <code>usePopoverTrigger</code> calls the element's own
        <TooltipText placement="bottom">
          <template #hint>
            Hover and focus use a
            <TooltipText
              placement="bottom"
              hint="Manual popovers ignore outside clicks and Escape. The trigger decides when they close."
            >
              manual
            </TooltipText>
            popover; click uses an
            <TooltipText
              placement="bottom"
              hint="Auto popovers close on outside click and Escape, and stay open together with DOM-nested ones."
            >
              auto
            </TooltipText>
            one.
          </template>
          <code>showPopover()</code> / <code>hidePopover()</code>
        </TooltipText>
        — the same calls a hover, focus, or click handler triggers here. Swapping
        <code>trigger: ['click']</code> for <code>['hover', 'focus']</code> is the entire difference
        between a menu row and a tooltip at the interaction level.
      </p>
      <p>
        The tour reuses all of this: it moves one <code>anchor-name</code> from target to target and
        keeps a single popover open.
      </p>
    </section>

    <OnboardingTour ref="tour" :steps="tourSteps" />
  </article>
</template>

<style scoped>
@layer components {
  .demo {
    display: flex;
    flex-direction: column;
    gap: var(--ui-sp-10);
    padding-block-end: var(--ui-sp-16);
  }
}
</style>
