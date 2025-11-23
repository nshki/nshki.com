<script setup type="ts">
defineProps({
  inactive: Boolean
})
</script>

<template>
  <span
    :class="{
      badge: true,
      'badge--inactive': inactive
    }"
  >
    <slot />
  </span>
</template>

<style>
.badge {
  --color: var(--color-go);

  display: inline-block;
  padding: 1px 4px 0;
  border: 1px solid var(--color);
  border-bottom-width: 2px;
  border-radius: 6px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--color);
}

.badge--inactive {
  --color: var(--color-text);
}
</style>
