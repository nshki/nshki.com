<script setup lang="ts">
const props = defineProps({
  href: String,
  title: String,
  description: String,
  date: String,
  badgeInactive: Boolean,
  badgeText: String
})

const parsedDate = props?.date ? new Date(props.date) : null
</script>

<template>
  <NuxtLink class="card" :href="href">
    <span class="card__title">
      {{ title }}

      <Badge v-if="badgeText" :inactive="badgeInactive">{{ badgeText }}</Badge>
    </span>

    <span class="card__description">{{ description }}</span>

    <time v-if="parsedDate" :datetime="parsedDate?.toISOString()" class="card__date">
      {{ formatDate(parsedDate) }}
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-weight: 700;
}

.card__date {
  margin-top: auto;
  margin-left: auto;
  font-size: 0.875rem;
}
</style>
