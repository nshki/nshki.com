<script setup lang="ts">
const props = defineProps({
  href: String,
  title: String,
  description: String,
  date: String
})

const date = new Date(props?.date as string)
</script>

<template>
  <NuxtLink class="card" :href="href">
    <span class="card__title">{{ props.title }}</span>
    <span class="card__description">{{ props.description }}</span>
    <time :datetime="date?.toISOString()" class="card__date">
      {{ formatDate(date) }}
    </time>
  </NuxtLink>
</template>

<style>
.card {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 16px;
  padding: 32px;
  border: 1px solid var(--color-border);
  text-decoration: none;

  @media (prefers-reduced-motion: no-preference) {
    transition: all 0.1s ease-in-out;
  }

  &:is(:hover, :focus) {
    border-color: var(--color-primary);
  }
}

.card__title {
  font-weight: 700;
}

.card__date {
  margin-top: auto;
  margin-left: auto;
  font-size: 0.875rem;
}
</style>
