<script setup lang="ts">
useSeoMeta({
  title: "Nishiki Liu",
  ogTitle: "Nishiki Liu",
  description: "Personal blog of a full-stack developer.",
  ogDescription: "Personal blog of a full-stack developer.",
  ogImage: "https://nshki.com/assets/og.png"
})
</script>

<template>
  <Container>
    <Nav />

    <main>
      <NuxtPage />
    </main>

    <Footer />
  </Container>
</template>

<style>
:root {
  --color-primary: #ca8a1e;
  --color-black: #000;
  --color-white: #fafafa;

  --color-background: light-dark(var(--color-white), #282c34);
  --color-background-code: light-dark(#fff, rgba(0, 0, 0, 0.2));
  --color-text: light-dark(#6b7079, #979fad);
  --color-text-strong: light-dark(var(--color-black), var(--color-white));
  --color-link: light-dark(rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0.8));
  --color-link-underline: light-dark(rgba(0, 0, 0, 0.3), rgba(255, 255, 255, 0.3));
  --color-link-focus: light-dark(var(--color-black), var(--color-white));
  --color-border: light-dark(rgba(0, 0, 0, 0.2), rgba(255, 255, 255, 0.2));

  --font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  --font-mono: SFMono-Regular, "Consolas", "Liberation Mono", "Menlo", monospace;

  --shadow: 0 8px 8px -4.8px rgba(0, 0, 0, 0.3);

  color-scheme: light dark;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: inherit;
}

body {
  background-color: var(--color-background);
  margin: 0;
  overflow-x: hidden;
  line-height: 1.5;
  font-family: var(--font-body);
  color: var(--color-text);
}

img {
  border-radius: 8px;
  box-shadow: var(--shadow);
}

:is(img, svg) {
  max-width: 100%;
  height: auto;
}

:is(h1, h2, h3, h4, h5, h6) {
  color: var(--color-text-strong);
}

h1 {
  font-size: 2.25rem;
}

:is(p, ul, ol) {
  font-size: 1.125rem;
}

p {
  & strong {
    color: var(--color-text-strong);
  }

  & code {
    background-color: var(--color-background-code);
    padding: 4px;
    font-size: 1rem;
  }
}

:is(code, pre) {
  font-family: var(--font-mono);
}

pre {
  background-color: var(--color-background-code);
  padding: 24px;
  border-radius: 8px;
  margin: 24px 0;
  box-shadow: var(--shadow);
  overflow-x: auto;
}

time {
  font-family: var(--font-mono);
  opacity: 0.9;
}

blockquote {
  padding-left: 24px;
  border-left: 2px solid var(--color-primary);
  margin: 24px 0;
}

a {
  text-decoration-color: var(--color-link-underline);
  text-underline-offset: 4.8px;
  color: var(--color-link);

  &:is(:hover, :focus) {
    text-decoration-color: var(--color-primary);
    color: var(--color-link-focus);
  }

  &:active {
    opacity: 0.5;
  }

  @media (prefers-reduced-motion: no-preference) {
    transition: color 0.1s ease-in-out, text-decoration-color 0.1s ease-in-out;
  }
}
</style>
