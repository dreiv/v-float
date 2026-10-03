<script setup lang="ts">
import { computed } from 'vue'
import { HoverCard } from '@/components/hover-card'

const { name } = defineProps<{
  name: string
  handle: string
  bio: string
  href: string
}>()

const initials = computed(() =>
  name
    .split(' ')
    .map((word) => word.charAt(0))
    .join(''),
)
</script>

<template>
  <HoverCard>
    <template #trigger="{ trigger }">
      <a :href class="demo-profile__trigger" target="_blank" rel="noreferrer" v-bind="trigger">
        @{{ handle }}
      </a>
    </template>

    <div class="demo-profile">
      <span class="demo-profile__avatar" aria-hidden="true">{{ initials }}</span>
      <div class="demo-profile__body">
        <strong>{{ name }}</strong>
        <span class="demo-profile__handle">@{{ handle }}</span>
        <p class="demo-profile__bio">{{ bio }}</p>
        <a :href target="_blank" rel="noreferrer">View profile</a>
      </div>
    </div>
  </HoverCard>
</template>

<style scoped>
@layer components {
  .demo-profile__trigger {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: var(--ui-tint-45);
    text-underline-offset: 3px;
    border-radius: var(--ui-radius-xs);

    &:hover,
    &:focus-visible {
      text-decoration-color: AccentColor;
    }
  }

  .demo-profile {
    display: flex;
    gap: var(--ui-sp-3);
  }

  .demo-profile__avatar {
    display: grid;
    flex-shrink: 0;
    place-items: center;
    inline-size: 2.5rem;
    block-size: 2.5rem;
    font-size: var(--ui-fs-sm);
    font-weight: 600;
    background: var(--ui-accent-tint-15);
    border: var(--ui-border-width) solid AccentColor;
    border-radius: 50%;
  }

  .demo-profile__body {
    display: flex;
    flex-direction: column;
    gap: var(--ui-sp-1);
    min-inline-size: 0;
  }

  .demo-profile__handle {
    font-size: var(--ui-fs-sm);
    opacity: 0.7;
  }

  .demo-profile__bio {
    margin: var(--ui-sp-1) 0;
    line-height: 1.5;
  }
}
</style>
