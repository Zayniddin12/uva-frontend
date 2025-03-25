<template>
  <div class="relative">
    <div class="w-[58px] lg:w-auto rounded p-[4px] overflow-hidden">
      <div class="flex items-center gap-1 cursor-pointer" @click="openLang">
        <span class="max-six h-[11px]">
          <i v-if="lang.value === 'uz'">
            <svg
              width="16"
              height="11"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_419_20902)">
                <rect width="20" height="20" rx="3.75" fill="white" />
                <g clip-path="url(#clip1_419_20902)">
                  <path
                    d="M-5 13.3871V17.3548C-5 19 -3.69355 20.1613 -2.09677 20.1613H22.0968C23.6935 20.1613 25 19 25 17.3548V13.3871H-5Z"
                    fill="#1EB53A"
                  />
                  <path
                    d="M22.0968 -0.161285H-2.09677C-3.69355 -0.161285 -5 1 -5 2.64517V6.61291H25V2.64517C25 1 23.6935 -0.161285 22.0968 -0.161285Z"
                    fill="#0099B5"
                  />
                  <path d="M25 6.61293H-5V13.3871H25V6.61293Z" fill="white" />
                  <path d="M25 6.129H-5V6.61287H25V6.129Z" fill="#CE1126" />
                  <path d="M25 13.3871H-5V13.8709H25V13.3871Z" fill="#CE1126" />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_419_20902">
                  <rect width="20" height="20" rx="3.75" fill="white" />
                </clipPath>
                <clipPath id="clip1_419_20902">
                  <rect
                    width="30"
                    height="30"
                    fill="white"
                    transform="translate(-5 -5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </i>
          <i v-if="lang.value === 'ru'">
            <svg
              width="16"
              height="11"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_419_20914)">
                <rect width="20" height="20" rx="3.75" fill="white" />
                <g clip-path="url(#clip1_419_20914)">
                  <path
                    d="M-5 13V17.1C-5 18.8 -3.69355 20 -2.09677 20H22.0968C23.6935 20 25 18.8 25 17.1V13H-5Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M22.0968 -0.161285H-2.09677C-3.69355 -0.161285 -5 1 -5 2.64517V6.61291H25V2.64517C25 1 23.6935 -0.161285 22.0968 -0.161285Z"
                    fill="#E0E1E2"
                  />
                  <path d="M25 6H-5V13H25V6Z" fill="#3F51B5" />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_419_20914">
                  <rect width="20" height="20" rx="3.75" fill="white" />
                </clipPath>
                <clipPath id="clip1_419_20914">
                  <rect
                    width="30"
                    height="30"
                    fill="white"
                    transform="translate(-5 -5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </i>
        </span>
        <span
          class="font-normal leading-4 tracking-[0.03em] text-xs font-semibold text-[#52230F] select-none"
        >
          {{ lang.label }}
        </span>
        <svg
          class="transition duration-200"
          :class="rotate"
          width="8"
          height="5"
          viewBox="0 0 8 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.157712 0.157707C-0.0525708 0.36799 -0.0525708 0.708926 0.157712 0.919209L0.49112 0.585802C0.157714 0.919211 0.157679 0.919176 0.157712 0.919209L0.193154 0.954555L0.292371 1.05311C0.37789 1.13787 0.500343 1.25881 0.648438 1.40389C0.944406 1.69381 1.3438 2.08111 1.75596 2.46903C2.16675 2.85566 2.59599 3.24835 2.95004 3.5465C3.12592 3.6946 3.29231 3.8271 3.43335 3.92521C3.5031 3.97373 3.57753 4.02152 3.65079 4.05933C3.70097 4.08522 3.83601 4.15386 4.00001 4.15386C4.16402 4.15386 4.29906 4.08522 4.34923 4.05933C4.4225 4.02152 4.49693 3.97373 4.56668 3.92521C4.70771 3.8271 4.87411 3.6946 5.04999 3.5465C5.40404 3.24835 5.83328 2.85566 6.24406 2.46903C6.65623 2.08111 7.05562 1.69381 7.35159 1.40388C7.49969 1.25881 7.62214 1.13787 7.70766 1.05311L7.80687 0.954555L7.84166 0.919863L7.84226 0.919267C7.84229 0.919232 7.84232 0.919209 7.46156 0.538458L7.0808 0.157719L7.04696 0.191471L6.94955 0.28823C6.86529 0.371738 6.74436 0.491183 6.59798 0.634573C6.305 0.92157 5.91112 1.3035 5.50598 1.68482C5.09945 2.06743 4.68734 2.44397 4.3563 2.72275C4.21489 2.84183 4.09477 2.93754 4.00001 3.00667C3.90526 2.93754 3.78514 2.84183 3.64373 2.72275C3.31269 2.44397 2.90058 2.06743 2.49405 1.68482C2.08891 1.3035 1.69503 0.92157 1.40205 0.634573C1.25567 0.491183 1.13474 0.371738 1.05048 0.288231L0.953072 0.191472L0.919682 0.158174C0.709399 -0.0521092 0.367995 -0.0525761 0.157712 0.157707ZM4.14472 3.10235C4.15858 3.10788 4.15926 3.10985 4.14472 3.10235C4.14453 3.10225 4.14491 3.10245 4.14472 3.10235ZM7.84232 0.157707C7.63203 -0.0525764 7.29108 -0.0525645 7.0808 0.157719L7.46156 0.538458L7.84226 0.919267C8.05254 0.708984 8.0526 0.36799 7.84232 0.157707Z"
            fill="#52230F"
          />
        </svg>
      </div>
    </div>
    <transition name="fadeDropdown">
      <div
        v-if="isLang"
        class="dropdown bg-white w-[158px] rounded-md absolute top-[38px] left-0 z-20"
      >
        <div
          v-for="(item, index) in langs"
          :key="index"
          :command="item"
          :class="
            index === 0
              ? 'rounded-tr-md rounded-tl-md'
              : index === langs.length - 1
              ? 'rounded-br-md rounded-bl-md'
              : ''
          "
          class="py-2 pl-[14px] hover:bg-[#F7FAFC] cursor-pointer"
          @click="handleCommand(item)"
        >
          <div class="flex items-center gap-1.5 handleClose">
            <span v-html="item.icon"></span>
            <span
              class="font-semibold text-sm tracking-wide"
              :class="{ active: $i18n.locale === item.value }"
            >
              {{ item.label }}
            </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: null,
      isLang: false,
      langTitle: '',
      isNavbar: false,
      currentLangVal: 'uz',
      mobile: false,
      langs: [
        {
          label: 'O‘zbekcha',
          value: 'uz',
          icon: `<svg width="16" height="11" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_419_20902)">
                  <rect width="20" height="20" rx="3.75" fill="white"/>
                  <g clip-path="url(#clip1_419_20902)">
                  <path d="M-5 13.3871V17.3548C-5 19 -3.69355 20.1613 -2.09677 20.1613H22.0968C23.6935 20.1613 25 19 25 17.3548V13.3871H-5Z" fill="#1EB53A"/>
                  <path d="M22.0968 -0.161285H-2.09677C-3.69355 -0.161285 -5 1 -5 2.64517V6.61291H25V2.64517C25 1 23.6935 -0.161285 22.0968 -0.161285Z" fill="#0099B5"/>
                  <path d="M25 6.61293H-5V13.3871H25V6.61293Z" fill="white"/>
                  <path d="M25 6.129H-5V6.61287H25V6.129Z" fill="#CE1126"/>
                  <path d="M25 13.3871H-5V13.8709H25V13.3871Z" fill="#CE1126"/>
                  </g>
                  </g>
                  <defs>
                  <clipPath id="clip0_419_20902">
                  <rect width="20" height="20" rx="3.75" fill="white"/>
                  </clipPath>
                  <clipPath id="clip1_419_20902">
                  <rect width="30" height="30" fill="white" transform="translate(-5 -5)"/>
                  </clipPath>
                  </defs>
                  </svg>

        `,
        },
        {
          label: 'Русский',
          value: 'ru',
          icon: `<svg width="16" height="11" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_419_20914)">
                  <rect width="20" height="20" rx="3.75" fill="white"/>
                  <g clip-path="url(#clip1_419_20914)">
                  <path d="M-5 13V17.1C-5 18.8 -3.69355 20 -2.09677 20H22.0968C23.6935 20 25 18.8 25 17.1V13H-5Z" fill="#FF3D00"/>
                  <path d="M22.0968 -0.161285H-2.09677C-3.69355 -0.161285 -5 1 -5 2.64517V6.61291H25V2.64517C25 1 23.6935 -0.161285 22.0968 -0.161285Z" fill="#E0E1E2"/>
                  <path d="M25 6H-5V13H25V6Z" fill="#3F51B5"/>
                  </g>
                  </g>
                  <defs>
                  <clipPath id="clip0_419_20914">
                  <rect width="20" height="20" rx="3.75" fill="white"/>
                  </clipPath>
                  <clipPath id="clip1_419_20914">
                  <rect width="30" height="30" fill="white" transform="translate(-5 -5)"/>
                  </clipPath>
                  </defs>
                  </svg>

        `,
        },
      ],
    }
  },
  computed: {
    rotate() {
      if (this.isLang) {
        return 'rotate-180deg'
      } else {
        return ''
      }
    },
  },
  created() {
    if (typeof window !== 'undefined') {
      this.currentLangVal = localStorage.getItem('locale')
      if (this.currentLangVal === null) {
        this.$i18n.locale = 'uz'
      } else {
        this.$i18n.locale = this.currentLangVal
      }
      this.lang = this.langs.find((lang) => lang.value === this.$i18n.locale)
    }
  },
  methods: {
    handleCommand(command) {
      this.lang = command
      this.$i18n.locale = command.value
      localStorage.setItem('locale', command.value)
      this.isLang = false
    },
    openLang() {
      this.isLang = !this.isLang
    },
  },
}
</script>

<style scoped>
.fadeDropdown-enter-active {
  animation: fadeDropdown 0.2s linear;
}
.fadeDropdown-leave-active {
  animation: fadeDropdown 0.2s linear reverse;
}
@keyframes fadeDropdown {
  from {
    opacity: 0;
    top: 30px;
  }
  to {
    opacity: 1;
    top: 38px;
  }
}
</style>
