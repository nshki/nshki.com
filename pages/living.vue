<script setup lang="ts">
const title = "Living"
const description = "A collection of things I want to share from my life."

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>

<template>
  <h1>{{ title }}</h1>

  <blockquote>
    <p>{{ description }}</p>
  </blockquote>

  <div class="journey-container">
    <section>
      <h2>Reading</h2>
      <Books />
    </section>

    <Grid more-spacing>
      <section>
        <h2>Gear</h2>
        <Gear />
      </section>

      <section>
        <h2>Software</h2>
        <Software />
      </section>
    </Grid>

    <section>
      <h2>Open Source</h2>
      <OpenSource />
    </section>

    <section>
      <h2>Activities</h2>
      <Activities />
    </section>
  </div>

  <FooterOrnament />
</template>

<style>
.journey-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>
