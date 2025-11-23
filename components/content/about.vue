<template>
  <div class="about">
    <aside class="about__aside">
      <Timeline />
    </aside>

    <div class="about__main">
      <p class="about__paragraph">
        Currently, I work at
        <a href="https://elly.ai/">Elly</a>
        leading the engineering team.
      </p>

      <p class="about__paragraph">
        I started off building for the web in 2005 after discovering Photoshop, HTML, and CSS. I've since worked with
        freelance clients, web agencies, early & late-stage startups, and a VC studio.
      </p>

      <p class="about__paragraph">
        My passions are in building delightful things and systematizing them. Validating business ideas, collaborating
        on design systems, thinking through & implementing complex features, and hiring for & augmenting engineering
        teams are some examples of work I particularly enjoy.
      </p>

      <p class="about__paragraph">
        If you think there could be a good opportunity for us to work together,
        <a href="mailto:hello@nshki.com">please reach out</a>.
      </p>
    </div>
  </div>
</template>

<style>
.about {
  display: grid;
  gap: 48px;
  padding: 80px 0;

  @media (min-width: 640px) {
    grid-template-columns: 40% 1fr;
  }
}

.about__main {
  grid-row-start: 1;

  @media (min-width: 640px) {
    grid-row-start: auto;
  }
}

.about__paragraph {
  font-size: 1.5rem;

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>
