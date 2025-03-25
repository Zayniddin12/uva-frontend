<template>
  <div class="relative flex items-center justify-center w-1/2 h-full bg-radial">
    <img src="/img/volontyor.svg" alt="volontyors" class="z-10" />
  </div>
</template>

<script>
export default {}
</script>
<style scoped lang="scss">
.bg-radial {
  background: radial-gradient(50% 50% at 50% 50%, #1b3766 0%, #062252 100%);
  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(55, 148, 221, 0.28);
    filter: blur(200px);
  }
}
</style>
