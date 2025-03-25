<template>
  <div class="header other-header">
    <div class="header__top py-[12px]">
      <div class="container header__top-item">
        <client-only>
          <el-dropdown trigger="click" placement="bottom-start">
            <span
              class="el-dropdown-link flex items-center gap-1"
              @click="showLangMenu = !showLangMenu"
            >
              <span v-if="$i18n.locale === 'ru'" class="flex items-center">
                <icon-base name="flag-rus" item-class="mr-1" />
                <span class="mr-1">Русский</span>
              </span>
              <span
                v-if="$i18n.locale === 'uz'"
                class="flex gap-1 items-center"
              >
                <icon-base name="flag-uz" item-class="mr-1" />
                <span class="mr-1">O‘zbekcha</span>
              </span>
              <span
                v-if="$i18n.locale === 'en'"
                class="flex gap-2 items-center"
              >
                <icon-base name="flag-en" item-class="mr-1" />
                <span class="mr-1">English</span>
              </span>
              <span
                v-if="$i18n.locale === 'kaa'"
                class="flex gap-2 items-center"
              >
                <icon-base name="kaa-flag" item-class="mr-1" />
                <span class="mr-1">Qaraqalpaqsha</span>
              </span>
              <icon-base
                :class="{ active: showLangMenu }"
                class="_black"
                name="arrow-down"
              />
            </span>
            <el-dropdown-menu
              slot="dropdown"
              class="page-header-lang custom-lang"
            >
              <el-dropdown-item>
                <nuxt-link
                  :to="switchLocalePath('ru')"
                  class="flex items-center"
                >
                  <icon-base name="flag-rus" />
                  <span>Русский</span>
                </nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <nuxt-link
                  :to="switchLocalePath('uz')"
                  class="flex items-center"
                >
                  <icon-base name="flag-uz" />
                  <span>O‘zbekcha</span>
                </nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <nuxt-link
                  :to="switchLocalePath('en')"
                  class="flex items-center"
                >
                  <icon-base name="flag-en" />
                  <span>English</span>
                </nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <nuxt-link
                  :to="switchLocalePath('kaa')"
                  class="flex items-center"
                >
                  <icon-base name="kaa-flag" />
                  <span>Qaraqalpaqsha</span>
                </nuxt-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </client-only>

        <div v-if="header && header.data" class="social-media">
          <div class="flex items-center gap-3 header__top-socials !mt-[0px]">
            <a
              v-if="header.data.instagram"
              :href="header.data.instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <icon-base name="other-header-insta" />
            </a>
            <a
              v-if="header.data.telegram"
              :href="header.data.telegram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <icon-base name="other-header-telegram" />
            </a>
            <a
              v-if="header.data.facebook"
              :href="header.data.facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <icon-base name="other-header-face" />
            </a>
          </div>
          <a
            v-if="header.data.phone"
            :href="`tel:` + header.data.phone"
            class="flex items-center gap-1 header__top-phone"
          >
            <icon-base name="other-header-phone" />
            {{ header.data.phone | VMask('+998 (##) ###-##-##') }}
          </a>
        </div>
      </div>
    </div>
    <div class="header__bottom">
      <div class="container">
        <nuxt-link
          style="display: flex; align-items: center"
          :to="localePath('/')"
        >
          <icon-base
            v-if="$i18n.locale === 'uz'"
            class="header__bottom__logo header-logo"
            name="header-logo3-uz"
          />
          <icon-base
            v-if="$i18n.locale === 'ru'"
            class="header__bottom__logo header-logo"
            name="header-logo3-ru"
          />
          <icon-base
            v-if="$i18n.locale === 'en'"
            class="header__bottom__logo header-logo"
            name="heade-logo3-end"
          />
          <icon-base
            v-if="$i18n.locale === 'kaa'"
            class="header__bottom__logo header-logo"
            name="header-logo3-kaa"
          />
          <span
            style="
              width: 1px;
              height: 28px;
              border-radius: 4px;
              background: #0f2852;
              display: block;
              margin: 0 12px;
              opacity: 0.5;
            "
          ></span>
          <icon-base
            v-if="$i18n.locale === 'ru'"
            class="header__bottom__logo header-logo"
            name="other-header-logo-ru"
          />
          <icon-base
            v-if="$i18n.locale === 'uz'"
            class="header__bottom__logo header-logo"
            name="other-header-logo-uz"
          />
          <icon-base
            v-if="$i18n.locale === 'en'"
            class="header__bottom__logo header-logo"
            name="other-header-logo-en"
          />
          <icon-base
            v-if="$i18n.locale === 'kaa'"
            class="header__bottom__logo header-logo"
            name="header-logo-kaa"
          />
        </nuxt-link>
        <nav class="nav" :class="openBurger ? 'open-nav' : ''">
          <button
            :class="openBurger ? '!block' : '!hidden'"
            class="p-[10px] ml-auto hidden e:block cursor-pointer"
            @click="burger()"
          >
            <icon-base name="Close" />
          </button>
          <div
            v-if="header && header.menu"
            class="nav__list flex e:flex-col justify-center items-center"
            @click="burgerClose()"
          >
            <div v-for="(item, idx) of header.menu" :key="idx">
              <router-link
                v-if="item.link === 'about'"
                :to="localePath('/' + item.link)"
                class="nav__item relative group"
              >
                {{ item.title }}
              </router-link>
              <a
                v-else-if="isValidURL(item?.link)"
                :href="item.link"
                target="_blank"
                class="nav__item relative group"
              >
                {{ item.title }}
              </a>
              <nuxt-link
                v-else
                :to="localePath('/' + item.link)"
                class="nav__item relative group"
              >
                {{ item.title }}
              </nuxt-link>
            </div>
          </div>
        </nav>
        <div class="header__bottom-item">
          <CollapseTransition>
            <NuxtLink v-if="!user" :to="localePath('/auth')">
              <button class="header__bottom-btn">
                <icon-base name="header-btn" />
                <span>{{ $t('be_volunteer') }}</span>
              </button>
            </NuxtLink>
          </CollapseTransition>

          <div
            v-if="user"
            class="profile-dropdown"
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

            <div :class="{ active: showMenu }" class="profile-dropdown__body">
              <ul>
                <li>
                  <nuxt-link :to="localePath('/profile/')">
                    <icon-base name="profile-fill" />
                    {{ $t('my_data') }}
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link
                    :to="localePath('/profile/settings')"
                    class="line-clamp-1"
                  >
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

          <span class="cursor-pointer" @click="burger()">
            <icon-base name="burger" class="burger" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import IconBase from '../volontyor/IconBase.vue'

export default {
  components: { IconBase, CollapseTransition },
  data() {
    return {
      openBurger: false,
      showLangMenu: false,
      showMenu: false,
      mount: false,
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      header: (state) => state.header,
    }),
  },
  mounted() {
    this.mount = true
    this.hideElement('showMenu', '.profile-dropdown')
  },
  beforeCreate() {
    this.openBurger = localStorage.getItem('openBurger') === 'true'
  },
  methods: {
    isValidURL(url) {
      const regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]{1,63}\.)+([a-zA-Z]{2,6})(\/[\w-]*)*(\?[\w=&]*)?$/
      return regex.test(url)
    },
    hideElement(item, className) {
      document.addEventListener('mousedown', (event) => {
        if (!event.target.closest(className)) {
          this[item] = false
        }
      })
    },
    burger() {
      this.openBurger = !this.openBurger
      const element = document.querySelector('html')
      element.classList.add('_lock')
      if (this.openBurger === false) {
        element.classList.remove('_lock')
      }
    },

    burgerClose() {
      this.openBurger = false
      const element = document.querySelector('html')
      element.classList.remove('_lock')
    },
    async logout() {
      await this.$auth.logout()
    },
    getDefaultAvatar(type) {
      return type === 1
        ? 'icons/user-avatar.svg'
        : 'icons/organization-avatar.svg'
    },
  },
}
</script>

<style lang="scss" scoped>
.header__bottom-item {
  @media (max-width: 768px) {
    justify-content: space-between !important;
    margin: 12px 0;
    display: flex !important;
    align-items: center;
    gap: 20px;
    font-size: 12px;
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

.page-header-lang {
  position: relative;
  z-index: 2004 !important;
}
.page-header-lang .el-dropdown-menu__item a {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 12px;
  color: #063f62;
  cursor: pointer;
  line-height: 36px;
  & > i {
    transform: translateY(-0.5px);
    transition: 0.2s ease;

    &.active {
      transform: rotate(180deg);
    }
  }
}

.el-dropdown-link__white {
  color: #90a1b5 !important;
  transition: 0.2s ease;
  & span {
    color: #52230f;
    &:focus-within {
      color: #4630ff;
    }
  }

  &.active {
    transform: rotate(180deg);
  }

  & ._black {
    transform: translateY(-0.5px);
    svg path {
      stroke: #90a1b5 !important;
    }
  }
}

.open-nav {
  left: 0 !important;
  transition: 0.3s ease-in-out;
  visibility: visible;
}
.x-button {
  position: relative;
  top: 30%;
}

.mr-1 {
  margin-right: 4px;
}
</style>
<style>
.custom-lang .el-dropdown-menu__item,
.el-menu-item {
  padding: 0 13px !important;
}

.header-logo-ijtimoiy {
  margin-left: 10px;
}
</style>
