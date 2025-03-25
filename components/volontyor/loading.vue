<template>
  <div class="bg-white h-[100vh] w-full flex items-center justify-center">
    <div class="loading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
}
</script>

<style scoped>
.loading {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 0.5rem;
  row-gap: 1.5rem;
}

.loading::after {
  content: 'Loading';
  color: #000;
  flex: 0 100%;
  font: 700 1.3rem 'Caveat', cursive;
  text-align: center;
}

.loading div {
  background-color: #000;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: loading-effect 1s cubic-bezier(0.77, 0.8, 0.58, 1) infinite
    var(--delay, 0.2s) alternate-reverse;
}

.loading div:nth-child(2) {
  --delay: 0.4s;
}
.loading div:nth-child(3) {
  --delay: 0.6s;
}
.loading div:nth-child(4) {
  --delay: 0.8s;
}
.loading div:nth-child(5) {
  --delay: 1s;
}

@keyframes loading-effect {
  0% {
    box-shadow: 0 0 4px 1px #fff3;
    opacity: 0.2;
    transform: translateY(3px) scale(1.1);
  }

  100% {
    opacity: 0.8;
    transform: translateY(-3px);
  }
}
</style>
