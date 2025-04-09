<template>
  <footer class="footer">
    <ul class="footer__items">
      <li class="footer__item">
        <a href="mailto:hello@nshki.com">Email</a>
      </li>

      <li class="footer__item">
        <a href="https://ruby.social/@nshki" rel="me">Mastodon</a>
      </li>

      <li class="footer__item">
        <a href="https://github.com/nshki">GitHub</a>
      </li>

      <li class="footer__item">
        <a href="/feed.xml">RSS</a>
      </li>
    </ul>

    <p>© Nishiki Liu</p>
  </footer>
</template>

<style>
.footer {
  display: flex;
  justify-content: space-between;
  padding: 32px 0;
  border-top: 1px solid var(--color-border);
  margin: 64px 0 32px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: var(--font-mono);

  & > * {
    margin: 0;
    font-size: 0.875rem;
  }
}

.footer__items {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: 640px) {
    flex-direction: row;
    gap: 32px;
  }
}
</style>
