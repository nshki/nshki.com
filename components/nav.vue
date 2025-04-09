<template>
  <nav class="nav">
    <NuxtLink class="nav__logo" href="/">
      <VectorLogo />
    </NuxtLink>

    <ul class="nav__items">
      <li class="nav__item">
        <NuxtLink class="nav__link" href="/writing">Writing</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 80px;
  font-family: var(--font-mono);

  @media (min-width: 640px) {
    margin-bottom: 160px;
  }
}

.nav__logo {
  @media (prefers-reduced-motion: no-preference) {
    transition: transform 0.2s ease-in-out;

    &:is(:hover, :focus) {
      transform: translate3d(0, -3px, 0);
    }
  }
}

.nav__items {
  display: flex;
  gap: 32px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.nav__link {
  text-transform: uppercase;
  letter-spacing: 1.6px;
  font-size: 0.875rem;
}
</style>
