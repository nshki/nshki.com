<script setup lang="ts">
const { data: posts } = await useAsyncData("posts", () =>
  queryCollection("posts").order("date", "DESC").all()
)

useSeoMeta({
  title: "Writing | Nishiki Liu",
  ogTitle: "Writing"
})
</script>

<template>
  <h1>Writing</h1>

  <Grid>
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
