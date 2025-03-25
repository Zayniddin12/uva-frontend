<template>
  <div>
    <section v-if="sliders && sliders.length" class="main-slider">
      <!--      <client-only>-->
      <!--&lt;!&ndash;        <img class="main__bg" src="@/static/icons/main-bg.svg" alt=""&ndash;&gt;-->
      <!--      /></client-only>-->
      <client-only>
        <VueSlickCarousel
          ref="carouselUsefulLinks"
          v-bind="settings"
          @beforeChange="slickDotsChange"
        >
          <div
            v-for="item in sliders"
            :key="item.id"
            class="main-slider__slide"
            :style="{ 'background-image': 'url(' + item.photo + ')' }"
            style="z-index: 9999999999 !important"
          >
            <div class="container">
              <div
                style="z-index: 3 !important"
                class="main-slider__slide__content"
              >
                <h1>{{ item.title }}</h1>
                <div v-html="item.text" />
                <a
                  v-if="item.button_title && !token && !user"
                  target="_blank"
                  :href="item.link"
                  class="text-base e:text-sm"
                >
                  {{ item.button_title }}
                  <icon-base name="arrow-right" />
                </a>
                <a
                  v-else-if="token || user"
                  class="text-base e:text-sm"
                  :href="item.link"
                >
                  {{ item.button_title }}
                  <icon-base name="arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </VueSlickCarousel>
      </client-only>
      <div class="container slider-dots">
        <!--        <client-only> </client-only>-->
        <div v-if="sliders.length > 1" class="flex justify-center">
          <button
            v-for="(_, i) in sliders.length"
            :key="i"
            class="btn"
            :class="{ active: i === slickDots.activeSlide }"
            @click="slickDotsGoTo(i)"
          >
            <span
              :style="{
                width: slickDots.progress + '%',
              }"
            />
          </button>
        </div>
      </div>
      <client-only>
        <div class="nav_bottom container px-4">
          <div class="flex items-center navbers container pl-[12px]">
            <nav class="nav" :class="openBurger ? 'open-nav' : ''">
              <button
                :class="openBurger ? '!block' : '!hidden'"
                class="p-[10px] ml-[275px] e:block x-button cursor-pointer"
                @click="burger()"
              >
                <icon-base name="Close" />
              </button>
              <div
                v-if="header && header.menu"
                class="nav__list flex e:flex-col justify-center items-center"
              >
                <div v-for="(item, idx) in header.menu" :key="idx">
                  <nuxt-link
                    v-if="item.link === 'about'"
                    :to="localePath('/' + item.link)"
                    class="relative nav-links group"
                  >
                    <span class="linkers">{{ item.title }}</span>
                  </nuxt-link>
                  <nuxt-link
                    v-else
                    :to="localePath('/' + item.link)"
                    @click.native="overScroll()"
                  >
                    <span class="linkers">{{ item.title }}</span>
                  </nuxt-link>
                </div>
              </div>
            </nav>

            <div class="header__bottom-item e:!items-start">
              <button v-if="!user" class="header__bottom-btn" @click="login">
                <icon-base name="header-btn" />
                <span>{{ $t('be_volunteer') }}</span>
              </button>

              <div
                v-else
                class="profile-dropdown dark"
                :class="{ active: showMenu }"
              >
                <div
                  class="profile-dropdown__header cursor-pointer"
                  @click="showMenu = !showMenu"
                >
                  <img
                    class="profile-dropdown__image"
                    :src="
                      user.photo ||
                      user.default_photo ||
                      getDefaultAvatar(user.user_type)
                    "
                    :alt="user.first_name"
                  />
                  <div class="profile-dropdown__text">
                    <p class="truncate max-w-[150px]">
                      {{
                        user.user_type === 1 && user.first_name
                          ? `${user.last_name} ${user.first_name[0]}.`
                          : `${user.organization_name}`
                      }}
                    </p>
                    <p class="profile-dropdown__text__id">
                      {{
                        user.user_type === 1
                          ? 'ID:' + user.id
                          : this.$t('organizationn')
                      }}
                    </p>
                  </div>
                  <i
                    class="profile-dropdown__link el-icon-arrow-down"
                    :class="{ active: showMenu }"
                  ></i>
                </div>

                <div
                  :class="{ active: showMenu }"
                  class="profile-dropdown__body"
                >
                  <ul class="!pl-0">
                    <li>
                      <nuxt-link :to="localePath('/profile/')">
                        <icon-base name="profile-fill" />
                        {{ $t('my_data') }}
                      </nuxt-link>
                    </li>
                    <li>
                      <nuxt-link :to="localePath('/profile/settings')">
                        <icon-base name="settings" />
                        {{ $t('settings') }}
                      </nuxt-link>
                    </li>
                    <li>
                      <button @click.prevent="logout">
                        <icon-base name="logout" />
                        {{ $t('leave') }}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <span @click="burger()">
                <icon-base name="burger" class="burger" />
              </span>
            </div>
          </div>
        </div>
      </client-only>
      <nuxt-link
        v-if="eventsLink"
        :to="localePath(`/possibilities/${eventsLink.slug}`)"
      >
        <DataRange />
      </nuxt-link>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import IconBase from '../volontyor/IconBase.vue'
import DataRange from '~/components/DataRange.vue'
export default {
  components: { IconBase, DataRange },
  data() {
    return {
      openBurger: false,
      token: undefined,
      currentProgress: 0,
      showMenu: false,
      settings: {
        autoplay: false,
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        swipeToSlide: true,
        centerMode: false,
        fade: true,
      },
      slickDots: {
        activeSlide: 0,
        progress: 0,
        tick: undefined,
        current: undefined,
      },
    }
  },
  computed: {
    ...mapState({
      sliders: (state) => state.home.sliders,
      user: (state) => state.auth.user,
      header: (state) => state.header,
      eventsLink: (state) => state.events.eventsLink,
    }),
  },
  mounted() {
    this.$store.dispatch('events/fetchEventsLink')
    this.slickDotsStart()
    this.hideElement('showMenu', '.profile-dropdown')
    this.token = window.localStorage.getItem('access')
  },
  beforeDestroy() {
    clearInterval(this.slickDots.tick)
  },
  methods: {
    slickDotsStart() {
      this.slickDots.progress = 0
      clearInterval(this.slickDots.tick)
      this.slickDots.tick = setInterval(this.slickDotsTick, 30)
    },
    slickDotsTick() {
      this.slickDots.progress += 0.7
      if (this.slickDots.progress >= 100) {
        if (this.$refs.carouselUsefulLinks) {
          this.$refs.carouselUsefulLinks.next()
          this.slickDotsStart()
        }
      }
    },
    slickDotsChange(from, to) {
      this.slickDots.activeSlide = to
      this.slickDotsStart()
    },
    slickDotsGoTo(to) {
      this.$refs.carouselUsefulLinks.goTo(to)
    },
    burger() {
      this.openBurger = !this.openBurger
      const element = document.querySelector('html')
      element.classList.add('_lock')
      if (this.openBurger === false) {
        element.classList.remove('_lock')
      }
    },
    overScroll() {
      const element = document.querySelector('html')
      element.classList.remove('_lock')
      element.classList.add('scroll')
    },
    login() {
      this.$router.push({
        path: this.localePath('/invite'),
      })
    },
    async logout() {
      await this.$auth.logout()
    },
    getDefaultAvatar(type) {
      return type === 1
        ? 'icons/user-avatar.svg'
        : 'icons/organization-avatar.svg'
    },
    hideElement(item, className) {
      document.addEventListener('mousedown', (event) => {
        if (!event.target.closest(className)) {
          this[item] = false
        }
      })
    },
  },
}
</script>

<style>
.about {
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
}
.navbers {
  border-radius: 16px;
  background: white;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.04);
  padding: 16px 16px 16px 32px !important;
  justify-content: space-between;
  position: absolute;
  bottom: -37px;
  width: 100%;
}

.nav__list {
  gap: 24px;
}
.nav_bottom {
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 769px) {
    bottom: -37px;
  }
}
.open-nav {
  left: 0 !important;
  visibility: visible !important;
  transition: 0.3s ease-in-out;
}
.x-button {
  position: relative;
  top: 3%;
  @media screen and (max-width: 768px) {
    top: -20%;
  }
}

.header__bottom-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 28px;
  background: #da6b3b;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #fff;
  transition: 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background: #fd6625 !important;
  }

  @media (max-width: 1025px) {
    font-size: 14px;
  }

  @media (max-width: 880px) {
    font-size: 12px;
    padding: 8px;
  }
}
.burger {
  display: none;

  @media (max-width: 769px) {
    display: block;
  }
}
.nav {
  display: flex;
  gap: 16px;
  transition: 0.3s ease-in-out;

  @media (max-width: 1025px) {
    gap: 24px;
  }

  @media (max-width: 769px) {
    position: fixed;
    top: 0;
    left: -100%;
    z-index: 100;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    background: rgba(28, 30, 33, 0.88);
    backdrop-filter: blur(4px);
    visibility: hidden;
  }

  &__item {
    color: #52230f !important;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    border-bottom: 1px solid transparent;
    transition: 0.3s ease-in-out;
    margin-right: 30px;

    &.nuxt-link-exact-active {
      @apply text-blue;

      &:hover {
        border-bottom: 1px solid transparent !important;
      }
    }

    img {
      margin: 0 auto;
    }

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      border-color: #fff;
    }

    @media (max-width: 1025px) {
      margin-right: 20px;
    }

    @media (max-width: 1200px) {
      font-size: 14px;
    }

    @media (max-width: 900px) {
      margin-right: 15px;
      font-size: 15px;
    }

    @media (max-width: 768px) {
      font-size: 18px;
      margin-top: 23px;
      margin-right: 0;
    }
  }
}

.linkers {
  @media screen and (min-width: 768px) {
    color: #52230f !important;
  }

  color: white;
  font-size: 16px !important;
  font-style: normal !important;
  font-weight: 600 !important;
  line-height: normal !important;
  transition: color 0.3s ease-in-out !important;

  &:hover {
    color: #da6b3b !important;
  }
}
.profile-dropdown__text p {
  margin-bottom: 0 !important;
}
</style>
<style scoped>
.v-application ul {
  padding-left: 0 !important;
}
.header__bottom-item {
  @media (max-width: 768px) {
    display: flex !important;
    align-items: center;
    gap: 20px;
    font-size: 12px;
    justify-content: space-between !important;
    width: 100% !important;
  }
  @media (max-width: 450px) {
    gap: 0;
    width: 100%;
    justify-content: space-between;

    &-btn {
      padding: 10px 0;
    }
    i {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>

<!--.nav__item {-->
<!--color: #52230F;-->
<!--text-align: right;-->
<!--font-size: 16px;-->
<!--font-style: normal;-->
<!--font-weight: 600;-->
<!--line-height: normal;-->
<!--}-->
