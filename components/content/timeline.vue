<template>
  <ul class="timeline">
    <li class="timeline__item">
      <div>
        <p class="timeline__item__title">
          <a href="https://elly.ai/">Elly</a>,
          Apr 2025 – Present
        </p>
        <p>Engineering Manager</p>
      </div>
    </li>

    <li class="timeline__item">
      <div>
        <p class="timeline__item__title">
          <a href="https://atomic.vc/">Atomic</a>,
          Jul 2021 – Apr 2025
        </p>
        <p>Lead Engineer</p>
      </div>
    </li>

    <li class="timeline__item">
      <div>
        <p class="timeline__item__title">
          <a href="https://litmus.com/">Litmus</a>,
          Nov 2019 – Jul 2021
        </p>
        <p>Senior Software Engineer</p>
      </div>
    </li>

    <li class="timeline__item">
      <div>
        <p class="timeline__item__title">
          <a href="https://roundtriphealth.com/">Roundtrip</a>,
          Feb 2019 – Nov 2019
        </p>
        <p>Senior Software Engineer</p>
      </div>
    </li>

    <li class="timeline__item">
      <div>
        <p class="timeline__item__title">
          <a href="https://wideeye.co/">Wide Eye</a>,
          Feb 2018 – Feb 2019
        </p>
        <p>Software Engineer</p>
      </div>
    </li>

    <li class="timeline__item">
      <div>
        <p class="timeline__item__title">
          <a href="https://padillaco.com/">Padilla</a>,
          Jun 2017 – Jan 2018
        </p>
        <p>Creative Technologist</p>
      </div>
    </li>

    <li class="timeline__item">
      <div>
        <p class="timeline__item__title">
          <a href="https://inmunited.com/">INM United</a>,
          Aug 2012 – Jun 2017
        </p>
        <p>Full-stack Developer</p>
      </div>
    </li>

    <li class="timeline__item">
      <div>
        <p class="timeline__item__title">
          Freelance, Jul 2006 – Present
        </p>
        <p>Web Designer & Developer</p>
      </div>
    </li>
  </ul>
</template>

<style>
.timeline {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 0;
  margin: 8px 0;
  list-style: none;
  font-family: var(--font-mono);
}

.timeline__item {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;

  &::before {
    content: "";
    background-color: var(--color-primary);
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 100%;
  }

  &::after {
    content: "";
    background-color: var(--color-border);
    display: block;
    width: 1px;
    height: 100%;
    position: absolute;
    top: calc(100% - 4px);
    left: 3px;
  }

  &:last-of-type::after {
    display: none;
  }

  & p {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.875rem;
  }
}

.timeline__item__title {
  font-weight: 500;
  color: var(--color-text-strong);
}
</style>
