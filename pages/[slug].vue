<script setup lang="ts">
const route = useRoute()
const { data: posts } = await useAsyncData("posts", () =>
  queryCollection("posts").order("date", "DESC").all()
)
const slug = route.path.split("/").at(1) || ""
const post = posts?.value?.find((post) => post.path.includes(slug))
const date = new Date(post?.date ?? "")

useSeoMeta({
  title: `${post?.title} | Nishiki Liu`,
  ogTitle: post?.title,
  description: post?.description,
  ogDescription: post?.description
})
</script>

<template>
  <div class="post">
    <time :datetime="date.toISOString()">{{ formatDate(date) }}</time>
    <h1>{{ post?.title }}</h1>

    <ContentRenderer v-if="post" :value="post" />
  </div>

  <FooterOrnament />
</template>

<style>
.post {
  max-width: 640px;

  :is(h2, h3, h4, h5, h6) {
    margin-top: 48px;
  }
}
</style>
