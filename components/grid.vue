<script setup type="ts">
defineProps({
  expansive: Boolean,
  moreSpacing: Boolean
})
</script>

<template>
  <div
    :class="{
      grid: true,
      'grid--expansive': expansive,
      'grid--more-spacing': moreSpacing
    }"
  >
    <slot />
  </div>
</template>

<style>
.grid {
  width: 100%;
  display: grid;
  gap: 16px;

  &.grid--more-spacing {
    gap: 32px;
  }

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;

    &.grid--expansive > *:first-of-type {
      grid-column: span 2 / span 2;
    }
  }

  &.grid--expansive {
    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}
</style>
