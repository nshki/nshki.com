<template>
  <div class="hero">
    <div class="hero__content">
      <p class="hero__paragraph">
        <strong>Hi there, my name is Nishiki.</strong>
        I'm a full-stack developer that enjoys everything from writing stylesheets to tweaking cloud infrastructure. And
        illustrating sometimes.
      </p>
    </div>

    <div class="hero__illustration" aria-hidden>
      <VectorIllustration />
    </div>
  </div>
</template>

<style>
.hero {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 80px;
  border-bottom: 1px solid var(--color-border);

  @media (min-width: 1024px) {
    flex-direction: row;
    margin-top: 80px;
  }
}

.hero__paragraph {
  font-size: 1.875rem;

  @media (min-width: 640px) {
    font-size: 2.25rem;
  }

  @media (min-width: 1024px) {
    max-width: 768px;
    margin-top: 0;
  }
}

.hero__illustration {
  display: flex;
  justify-content: center;
}

@media (prefers-reduced-motion: no-preference) {
  .hero__illustration .illustration__person-body {
    animation: lean-turn-reset 10s ease-in-out infinite;
  }

  .hero__illustration .illustration__person-left-eye,
  .hero__illustration .illustration__person-right-eye {
    animation: blink-squint-look 10s ease-in-out infinite;
  }

  .hero__illustration .illustration__person-left-eye {
    transform-origin: 378px 150px;
  }

  .hero__illustration .illustration__person-right-eye {
    transform-origin: 449px 150px;
  }

  .hero__illustration .illustration__pet-body {
    animation: shake 10s ease-in-out infinite;
    transform-origin: 640px 408px;
  }
}

@keyframes lean-turn-reset {
  0%, 30%   { transform: translate3d(0, 0, 0); }
  50%, 60%  { transform: translate3d(-2%, 2%, 0); }
  65%, 85%  { transform: translate3d(2%, 1%, 0); }
  95%, 100% { transform: translate3d(0, 0, 0); }
}

@keyframes blink-squint-look {
  0%, 5%   { transform: scale3d(1, 1, 1) translate3d(0, 0, 0); }
  6%       { transform: scale3d(1, 0.2, 1) translate3d(0, 0, 0); }
  8%, 30%  { transform: scale3d(1, 1, 1) translate3d(0, 0, 0); }
  50%, 60% { transform: scale3d(1, 0.5, 1) translate3d(-2%, 2%, 0); }
  65%, 85% { transform: scale3d(1, 1, 1) translate3d(10%, 5%, 0); }
  95%      { transform: scale3d(1, 1, 1) translate3d(8%, 3%, 0); }
  100%     { transform: scale3d(1, 1, 1) translate3d(0, 0, 0); }
}

@keyframes shake {
  0%, 57% { transform: rotate(0); }
  58%     { transform: rotate(-2deg); }
  59%     { transform: rotate(2deg); }
  60%     { transform: rotate(-2deg); }
  61%     { transform: rotate(0); }
}
</style>
