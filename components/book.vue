<script setup lang="ts">
defineProps({
  current: Boolean,
  coverAssetUrl: String,
  title: String,
  author: String
})
</script>

<template>
  <article class="book">
    <img
      class="book__cover"
      :src="coverAssetUrl"
      :alt="`${title} by ${author}`"
    />

    <div class="book__content">
      <h3 class="book__title">
        {{ title }}

        <Badge v-if="current">Current</Badge>
        <Badge inactive v-else>Read</Badge>
      </h3>

      <p class="book__author">{{ author }}</p>

      <div class="book__description">
        <slot />
      </div>
    </div>
  </article>
</template>

<style>
.book {
  display: grid;
  grid-template-columns: 0.3fr 0.7fr;
  gap: 24px;
  position: relative;
}

.book__cover {
  background-color: var(--color-border);
  width: 100%;
  height: auto;
}

.book__title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 0;
  margin-bottom: 0;
}

.book__author {
  margin-top: 0;
  font-size: 1rem;
  font-style: italic;
}

.book__description {
  & > * {
    font-size: 1rem;
  }
}
</style>
