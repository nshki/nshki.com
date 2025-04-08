<template>
  <div class="grid">
    <slot />
  </div>
</template>

<style>
.grid {
  display: grid;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;

    & > *:first-of-type {
      grid-column: span 2 / span 2;
    }
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
