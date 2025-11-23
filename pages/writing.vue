<script setup lang="ts">
const title = "Writing"
const { data: posts } = await useAsyncData("posts", () =>
  queryCollection("posts").order("date", "DESC").all()
)

useSeoMeta({
  title,
  ogTitle: title
})
</script>

<template>
  <h1>{{ title }}</h1>

  <Grid expansive>
    <Card
      v-for="post in posts"
      :href="slugFromPath(post.path)"
      :title="post.title"
      :description="post.description"
      :date="post.date.toString()"
    />
  </Grid>

  <FooterOrnament />
</template>
