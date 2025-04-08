<template>
  <div class="container">
    <slot />
  </div>
</template>

<style>
.container {
  max-width: 1152px;
  padding-inline: 16px;
  margin-inline: auto;

  @media (min-width: 640px) {
    padding-inline: 16px;
  }
}
</style>
