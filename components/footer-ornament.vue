<template>
  <div class="footer-ornament">
    <VectorPet />
  </div>
</template>

<style>
.footer-ornament {
  display: flex;
  justify-content: flex-end;
  margin-top: 64px;

  & + .footer {
    margin-top: 32px;
  }
}
</style>
