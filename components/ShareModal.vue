<template>
  <Modal
    :id="id"
    v-bind="{
      title: title,
      contentC: 'rounded-[12px] bg-white py-4 px-5',
      bodyC: '!p-[0px] rounded-[12px] border-solid border-red-500',
      closeSign: true,
      width: '382',
      headC: '',
    }"
  >
    <template>
      <div
        class="w-full mt-[16px] mb-[20px] h-[1px] bg-gray-200 opacity-20"
      ></div>
      <div>
        <FuckingQr
          class="relative z-10 my-[24px] mx-auto w-[164px] h-[164px]"
        />
        <ButtonCopy />

        <div class="my-[12px] flex-center w-full gap-[12px]">
          <span class="w-full h-[2px] bg-[#90A1B51F]"></span>
          <span
            class="text-gray-400 text-sm font-semibold translate-y-[-1px]"
            >{{ $t('or') }}</span
          >
          <span class="w-full h-[2px] bg-[#90A1B51F]"></span>
        </div>

        <div class="flex-center gap-[12px]">
          <img
            v-for="icon in socialShares"
            :key="icon"
            :src="`/icons/share/${icon}.svg`"
            :alt="icon"
            class="duration-200 hover:translate-y-[-2px] cursor-pointer"
            @click="share(icon, shareTitle)"
          />
        </div>
      </div>
    </template>
  </Modal>
</template>
<script>
import Modal from '@/components/volontyor/Modal.vue'
import ButtonCopy from '@/components/form/ButtonCopy.vue'
import { share } from '@/helpers'
import FuckingQr from '@/components/FuckingQr.vue'

export default {
  components: {
    FuckingQr,
    ButtonCopy,
    Modal,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    shareTitle: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      socialShares: ['facebook', 'twitter', 'telegram'],
      options: {
        cellSize: 8,
        correctLevel: 'H',
        background: '#2C2D33',
        foreground: '#fff',
      },
      qrConfig: {
        margin: 10,
        qrOptions: { typeNumber: '0', mode: 'Byte', errorCorrectionLevel: 'L' },
        imageOptions: { hideBackgroundDots: true, imageSize: 2, margin: 10 },
        dotsOptions: {
          type: 'extra-rounded',
          color: '#171717',
          gradient: null,
        },
        backgroundOptions: { color: '#ffffff' },
        dotsOptionsHelper: {
          colorType: { single: true, gradient: false },
          gradient: {
            linear: true,
            radial: false,
            color1: '#6a1a4c',
            color2: '#6a1a4c',
            rotation: '0',
          },
        },
        cornersSquareOptions: { type: '', color: '#90A1B5' },
        cornersSquareOptionsHelper: {
          colorType: { single: true, gradient: false },
          gradient: {
            linear: true,
            radial: false,
            color1: '#000000',
            color2: '#000000',
            rotation: '0',
          },
        },
        cornersDotOptions: { type: '', color: '#90A1B5' },
        cornersDotOptionsHelper: {
          colorType: { single: true, gradient: false },
          gradient: {
            linear: true,
            radial: false,
            color1: '#000000',
            color2: '#000000',
            rotation: '0',
          },
        },
        backgroundOptionsHelper: {
          colorType: { single: true, gradient: false },
          gradient: {
            linear: true,
            radial: false,
            color1: '#ffffff',
            color2: '#ffffff',
            rotation: '0',
          },
        },
      },
    }
  },
  computed: {
    optionsData() {
      const image = new Image()
      image.src = this.shareImg || '/icons/volontyor.png'
      image.width = 95
      image.height = 95
      image.borderRadius = 80
      image.border = '2px solid #fff'
      image.onload = () => {
        this.options = {
          ...this.options,
          ...this.qrConfig,
          logo: {
            image,
          },
        }
      }
      return Object.assign(this.options, {
        data: window?.location?.href || '',
      })
    },
  },
  methods: { share },
}
</script>
