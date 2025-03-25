<template>
  <div class="space-y-[20px] w-[190px]">
    <div
      class="flex items-center justify-center relative qr-code p-[18px] w-full h-[188px]"
    >
      <QRCanvas
        id="capture"
        :options="optionsData"
        class="relative z-10 w-full h-full"
      ></QRCanvas>
      <QRCanvas
        id="capture-clone"
        :options="optionsCloneData"
        class="absolute top-[18px] left-[18px] w-[150px] h-[150px]"
      />
    </div>
    <div class="relative flex items-center flex-col">
      <CButton
        button-style="py-[8px] px-[44px]"
        class="w-full flex items-center justify-center space-x-[8px] !rounded"
        @click="printTimetable"
      >
        <icon-base name="download" />
        <span
          class="text-sm text-white font-semibold leading-18 whitespace-nowrap"
        >
          {{ $t('download_qrcode') }}
        </span>
      </CButton>
      <!--      share btn-->
      <CButton
        button-style="py-[8px] px-[44px] mt-2"
        class="w-full flex items-center justify-center space-x-[8px] !rounded"
        @click="toggleTooltip"
      >
        <icon-base name="share" />
        <span
          class="text-sm text-white font-semibold leading-18 whitespace-nowrap"
        >
          {{ $t('share_code') }}
          <Tooltip
            ref="tooltip"
            class="absolute"
            :show="showTooltip"
            :with-trigger="true"
            :timeout="false"
            @hide="hideTooltip"
          >
            <div class="flex items-center justify-center gap-[10px]">
              <a
                :href="
                  'https://t.me/share/url?url=' +
                  checkUserType +
                  '&text=' +
                  user.first_name +
                  ' ' +
                  user.last_name
                "
                target="_blank"
              >
                <icon-base name="telegram" />
              </a>
              <ShareNetwork
                network="facebook"
                :title="user.first_name + ' ' + user.last_name"
                :url="checkUserType"
              >
                <icon-base name="facebook" />
              </ShareNetwork>
            </div>
          </Tooltip>
        </span>
      </CButton>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import { QRCanvas } from 'qrcanvas-vue'
import CButton from '@/components/new/Button/CButton.vue'
import IconBase from '@/components/volontyor/IconBase.vue'
import Tooltip from '~/components/Tooltip.vue'

export default {
  components: {
    Tooltip,
    IconBase,
    CButton,
    QRCanvas,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showTooltip: false,
      options: {
        cellSize: 8,
        correctLevel: 'H',
        background: '#DA6B3B',
        foreground: '#fff',
      },
      optionsClone: {
        correctLevel: 'H',
        cellSize: 8,
      },
    }
  },
  computed: {
    optionsData() {
      return {
        ...this.options,
        data: this.checkUserType,
        logo: {
          image: '/icons/volontyor.png',
        },
      }
    },
    optionsCloneData() {
      return {
        ...this.optionsClone,
        data: this.checkUserType,
      }
    },

    checkUserName() {
      return this.user?.user_type === 1
        ? `${
            this.user?.first_name +
            ' ' +
            this.user?.last_name +
            ' ' +
            this.user?.middle_name
          }.png`
        : `${this.user?.organization_name}.png`
    },
    checkUserType() {
      return this.user?.user_type === 1
        ? `https://volontyor.uz/volunteer/${this.user.id}`
        : `https://volontyor.uz/possibilities/organization/${this.user.id}`
    },
    telegramLink() {
      return `https://t.me/share/url?url=${this.checkUserType}&text=${this.user.first_name} ${this.user.last_name}`
    },
  },
  methods: {
    toggleTooltip() {
      this.showTooltip = !this.showTooltip
    },
    hideTooltip() {
      this.showTooltip = false
    },
    printTimetable() {
      html2canvas(document.querySelector('#capture-clone')).then((canvas) => {
        const link = document.createElement('a')
        link.download = this.checkUserName
        link.href = canvas.toDataURL()
        link.click()
      })
    },
  },
  head() {
    return {
      // meta: [
      //   {
      //     name: 'first_name',
      //     hid: 'first_name',
      //     content: this.user.first_name,
      //   },
      //   {
      //     name: 'last_name',
      //     hid: 'last_name',
      //     content: this.user.last_name,
      //   },
      //   {
      //     name: 'first_name',
      //     hid: 'first_name',
      //     content: this.user.first_name,
      //   },
      //   {
      //     name: 'last_name',
      //     hid: 'last_name',
      //     content: this.user.last_name,
      //   },
      //   {
      //     name: 'og:middle_name',
      //     hid: 'og:middle_name',
      //     content: this.user.middle_name,
      //   },
      //   {
      //     name: 'og:description',
      //     hid: 'og:description',
      //     content:
      //       " 'Волонтерство - это человек, который заботится о других, бескорыстно служит их счастью и интересам, \\n' +\n" +
      //       "          'а также осуществляет добровольную, благодарную, беспристрастную, социально...',",
      //   },
      //   {
      //     name: 'og:image',
      //     hid: 'og:image',
      //     content:
      //       'https://volontyor.uz/media/slider/images/2023/12/DSC00376_copy.jpg',
      //   },
      // ],
      meta: [
        {
          name: 'title',
          hid: 'title',
          content: this.user.first_name,
        },
        {
          name: 'description',
          hid: 'description',
          content: this.user.last_name,
        },
        {
          name: 'og:title',
          hid: 'og:title',
          content: this.user.first_name,
        },
        {
          name: 'og:description',
          hid: 'og:description',
          content: this.user.last_name,
        },
        {
          name: 'og:content',
          hid: 'og:content',
          content: this.user.last_name,
        },
        {
          name: 'og:image',
          hid: 'og:image',
          content:
            'https://volontyor.uz/media/slider/images/2023/12/DSC00376_copy.jpg',
        },
      ],
    }
  },
}
</script>
<style scoped>
.qr-code {
  background: #da6b3b;
  border: 1px solid #da6b3b;
  box-shadow: 0 4px 36px rgba(55, 148, 221, 0.4);
  border-radius: 12px;
}
</style>
