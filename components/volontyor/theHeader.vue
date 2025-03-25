<script>
// import { RouterLink } from 'vue-router'
import theNavbar from '@/components/theNavbar.vue'
export default {
  components: {
    theNavbar,
  },
  data() {
    return {
      isNavbar: false,
    }
  },
  watch: {
    isNavbar(newValue) {
      if (newValue) {
        document.querySelector('body').style.paddingRight = '16px'
        document.querySelector('body').style.overflow = 'hidden'
      } else {
        document.querySelector('body').style.paddingRight = '0'
        document.querySelector('body').style.overflowY = 'scroll'
      }
    },
  },
  methods: {
    close() {
      this.isNavbar = false
    },

    open() {
      this.isNavbar = true
    },
  },
}
</script>

<template>
  <header class="py-6">
    <transition name="navbar">
      <theNavbar v-if="isNavbar" @close-nav="close" />
    </transition>
    <div class="container">
      <div class="header-content flex items-center justify-between">
        <div class="flex items-center lg:gap-[90px] xl:gap-[130px]">
          <div>
            <a href="#">
              <img src="../assets/Logo.svg" alt="" />
            </a>
          </div>
          <div class="hidden lg:flex items-center gap-[60px]">
            <a
              href="#about"
              class="lg:text-sm xl:text-base text-[#212832] font-semibold"
              >{{ $t('about_us') }}</a
            >
            <a
              href="#gallery"
              class="lg:text-sm xl:text-base text-[#212832] font-semibold"
              >{{ $t('gallery') }}</a
            >
            <a
              href="#project"
              class="lg:text-sm xl:text-base text-[#212832] font-semibold"
              >{{ $t('projects') }}</a
            >
            <a
              href="#team"
              class="lg:text-sm xl:text-base text-[#212832] font-semibold"
              >{{ $t('contact') }}</a
            >
          </div>
        </div>
        <div class="hidden lg:block">
          <a
            href="tel:999 999 999"
            class="flex items-center gap-[7px] text-[#212832] font-medium group"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="transition duration-200"
                d="M7.9855 6.16645C7.56158 6.77959 6.66546 7.63542 6.66546 8.33333C6.66546 9.16436 7.551 10.8378 8.70105 11.9737C9.8511 13.1096 10.8241 13.75 11.6655 13.75C12.2383 13.75 12.5262 12.3684 14.0562 12.3684C15.2037 12.3684 16.6655 13.6184 17.0821 15C17.3022 15.7296 16.5259 16.3938 15.5823 16.8832C14.6123 17.3862 13.4958 17.5544 12.4116 17.4185C10.7742 17.2132 8.51668 16.4906 5.83214 13.9474C2.58087 10.4167 2.41672 8.10365 2.4988 5.84488C2.58088 3.5861 4.58213 2.5 5.25845 2.5C5.87653 2.5 7.79408 4.14836 8.11979 5.47884C8.17799 5.71659 8.12471 5.96511 7.9855 6.16645Z"
                stroke="black"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p class="group-hover:text-[#6246E5] lg:text-sm xl:text-base">
              +998 (97) 707-77-07
            </p>
          </a>
        </div>
        <button class="block lg:hidden" @click="open()">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 7H19" stroke="#000" stroke-linecap="round" />
            <path d="M5 12H19" stroke="#000" stroke-linecap="round" />
            <path d="M5 17H19" stroke="#000" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>
<style scoped>
.group:hover svg path {
  stroke: #6246e5;
}

.navbar-enter-active {
  animation: navbar 0.4s ease-out;
}
.navbar-leave-active {
  animation: navbar 0.4s ease-in reverse;
}
@keyframes navbar {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
