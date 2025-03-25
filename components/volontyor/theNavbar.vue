<template>
  <div class="bg-white w-full h-[100vh] fixed top-0 right-0 z-[9999]">
    <div>
      <div class="container">
        <div class="nav-content relative pt-[100px]">
          <button class="absolute top-6 right-0" @click="close">
            <svg
              width="36"
              height="36"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36 12L12 36"
                stroke="#000"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 12L36 36"
                stroke="#000"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <div>
            <div class="flex flex-col gap-[60px]">
              <div @click="close">
                <a href="#about" class="text-xl text-[#212832] font-semibold">{{
                  $t('language')
                }}</a>
              </div>
              <div @click="close">
                <a href="#gallery" class="text-xl text-[#212832] font-semibold"
                  >Галерея</a
                >
              </div>
              <div @click="close">
                <a href="#project" class="text-xl text-[#212832] font-semibold"
                  >Проекты</a
                >
              </div>
              <div @click="close">
                <a href="#team" class="text-xl text-[#212832] font-semibold"
                  >Свяжитесь с нами</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheNavbar',

  methods: {
    close() {
      this.$emit('close-nav')
    },
  },
}
</script>
