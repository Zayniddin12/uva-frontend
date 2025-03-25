<template>
  <client-only>
    <div class="header">
      <div class="header__top py-[10px]">
        <div class="container header__top-item !z-[2004]">
          <client-only>
            <el-dropdown
              trigger="click"
              placement="bottom-start"
              class="!z-[2004]"
            >
              <div
                class="el-dropdown-link__dark flex items-center gap-2"
                @click="showLangMenu = !showLangMenu"
              >
                <template v-if="$i18n.locale === 'ru'">
                  <icon-base name="flag-rus" item-class="mr-[8px]" />
                  <span class="langer">Русский</span>
                </template>
                <template v-if="$i18n.locale === 'uz'">
                  <icon-base name="flag-uz" item-class="mr-[8px]" />
                  <span class="langer">O‘zbekcha</span>
                </template>
                <template v-if="$i18n.locale === 'en'">
                  <icon-base name="flag-en" item-class="mr-[8px]" />
                  <span class="langer">English</span>
                </template>
                <template v-if="$i18n.locale === 'kaa'">
                  <icon-base name="kaa-flag" item-class="mr-[8px]" />
                  <span class="langer">Qaraqalpaqsha</span>
                </template>
                <icon-base
                  :class="{ active: showLangMenu }"
                  class="ml-1 _black"
                  name="arrow-down"
                />
              </div>
              <el-dropdown-menu slot="dropdown" class="page-header-lang">
                <el-dropdown-item>
                  <nuxt-link
                    :to="switchLocalePath('ru')"
                    class="flex items-center"
                  >
                    <icon-base name="flag-rus" item-class="mr-[8px]" />
                    <span class="langer">Русский</span>
                  </nuxt-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <nuxt-link
                    :to="switchLocalePath('uz')"
                    class="flex items-center"
                  >
                    <icon-base name="flag-uz" item-class="mr-[8px]" />
                    <span class="langer">O‘zbekcha</span>
                  </nuxt-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <nuxt-link
                    :to="switchLocalePath('en')"
                    class="flex items-center"
                  >
                    <icon-base name="flag-en" item-class="mr-[8px]" />
                    <span class="langer">English</span>
                  </nuxt-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <nuxt-link
                    :to="switchLocalePath('kaa')"
                    class="flex items-center"
                  >
                    <icon-base name="kaa-flag" item-class="mr-[8px]" />
                    <span class="langer">Qaraqalpaqsha</span>
                  </nuxt-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </client-only>

          <div v-if="header && header.data" class="social-media">
            <div class="items-center flex gap-x-5 !mt-[0px]">
              <a
                v-if="header.data.instagram"
                :href="header.data.instagram"
                target="_blank"
                rel="noopener noreferrer"
                class="mr-[10px] g:mr-[5px] mt-[3px]"
              >
                <icon-base name="header-insta" />
              </a>
              <a
                v-if="header.data.telegram"
                :href="header.data.telegram"
                target="_blank"
                rel="noopener noreferrer"
                class="mr-[10px] g:mr-[5px]"
              >
                <icon-base name="header-telegram" />
              </a>
              <a
                v-if="header.data.facebook"
                :href="header.data.facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <icon-base name="header-face" />
              </a>
            </div>
            <a
              v-if="header.data.phone"
              :href="`tel:` + header.data.phone"
              class="flex items-end gap-1 header__top-phone"
            >
              <img
                class="mr-[4px]"
                src="@/static/icons/header-phone2.svg"
                alt=""
              />
              {{ header.data.phone | VMask('+998 (##) ###-##-##') }}
            </a>
          </div>
        </div>
      </div>
      <div class="header__bottom">
        <div class="container">
          <div class="logos__wrap">
            <nuxt-link :to="localePath('/')">
              <icon-base
                v-if="$i18n.locale === 'en'"
                class="header__bottom__logo header-logo"
                name="logo-en"
              />
              <icon-base
                v-if="$i18n.locale === 'ru'"
                class="header__bottom__logo header-logo"
                name="logo-ru"
              />
              <icon-base
                v-if="$i18n.locale === 'uz'"
                class="header__bottom__logo header-logo"
                name="logo"
              />
              <icon-base
                v-if="$i18n.locale === 'kaa'"
                class="header__bottom__logo header-logo"
                name="header-logo-kaasvg"
              />
            </nuxt-link>
            <a
              target="_blank"
              :href="
                $i18n.locale === 'ru'
                  ? 'https://yoshlar.gov.uz/ru/'
                  : $i18n.locale === 'en'
                  ? 'https://yoshlar.gov.uz/en/'
                  : 'https://yoshlar.gov.uz/'
              "
            >
              <icon-base
                v-if="$i18n.locale === 'uz'"
                class="secondary-logo uz"
                name="secondaryLogoUz"
              />
              <icon-base
                v-if="$i18n.locale === 'ru'"
                class="secondary-logo ru"
                name="secondaryLogoRu"
              />
              <icon-base
                v-if="$i18n.locale === 'en'"
                class="secondary-logo en"
                name="secondaryLogoEn"
              />
              <icon-base
                v-if="$i18n.locale === 'kaa'"
                class="secondary-logo en"
                name="header-yia"
              />
            </a>
          </div>
        </div>
        <div class="main-logo-center">
          <a
            target="_blank"
            href="https://ihma.uz/
            "
          >
            <img
              v-if="$i18n.locale === 'uz'"
              src="@/static/icons/mainer.png"
              alt=""
            />
            <img
              v-if="$i18n.locale === 'en'"
              src="@/static/icons/mainer-en.png"
              alt=""
            />
            <img
              v-if="$i18n.locale === 'ru'"
              src="@/static/icons/mainer-ru.png"
              alt=""
            />
            <img
              v-if="$i18n.locale === 'kaa'"
              src="@/static/icons/main-kaa.png"
              alt=""
            />
          </a>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapState } from 'vuex'
import IconBase from '../volontyor/IconBase.vue'

export default {
  components: { IconBase },
  data() {
    return {
      showLangMenu: false,
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      header: (state) => state.header,
    }),
  },
  methods: {},
}
</script>

<style lang="scss">
.el-dropdown-link__dark {
  & span {
    color: #fff;
    &:focus {
      color: #4630ff;
    }
  }
  & .active {
    transform: rotate(180deg);
  }
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
  }
}

.logos__wrap {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  @media screen and (max-width: 1200px) {
    svg {
      max-width: 90px;
    }
  }
  @media screen and (max-width: 768px) {
    gap: 8px;
  }
}
.secondary-logo.uz {
  @media screen and (max-width: 768px) {
    width: 90px !important;
  }
}
.secondary-logo.ru {
  @media screen and (max-width: 768px) {
    width: 90px !important;
  }
}
.secondary-logo.en {
  @media screen and (max-width: 768px) {
    width: 90px !important;
  }
}
.secondary-logo svg {
  width: 100%;
  height: 100%;
}

.ml-1 {
  margin-left: 4px;
}
.langer {
  color: black;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%;
  margin-right: 4px;
}
.main-logo-center {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 200px;
  height: 185px;

  @media screen and (max-width: 768px) {
    width: 100px;
    height: 100px;
    top: 46px;
  }
}
.main__bg {
  position: absolute;
  left: 0;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);

  @media screen and (max-width: 768px) {
    display: none;
  }
}
.el-dropdown-menu__item,
.el-menu-item {
  padding: 6px 13px !important;
}
</style>
