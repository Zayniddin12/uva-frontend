<template>
  <div id="gallery" className="gallery py-[64px]">
    <div class="container">
      <div class="gallery-content relative">
        <div class="relative mb-[60px]">
          <h1 class="text-3xl font-semibold text-[#5E6282] text-center">
            {{ $t('gallery') }}
          </h1>
          <h1
            class="text-3xl lg:text-5xl font-bold text-center text-[#14183E] mt-1"
          >
            {{ $t('gallery_title') }}
          </h1>
          <img
            src="/src/assets/galleryShape.svg"
            class="absolute top-[100px] -right-5 lg:top-[-18px] lg:right-[50px] z-[-1]"
            alt=""
          />
        </div>
        <div class="flex items-center justify-start mb-3">
          <gallerySlider :items="images_top" />
        </div>
        <div class="flex items-center justify-end">
          <gallerySlider :items="images_bottom" />
        </div>
        <div
          class="shape w-[100px] h-[100px] bg-[#FF7559] absolute bottom-[-20px] left-0 z-[-1]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import gallerySlider from '../galleySlider.vue'
export default {
  components: {
    gallerySlider,
  },
  data() {
    return {
      images_top: [
        {
          image: '/src/assets/images/gallery_image_1.png',
          title: 'Choose Destination',
          text:
            'Волонтерство - это человек, который заботится о других, бескорыстно служит их счастью и интересам',
        },
        {
          image: '/src/assets/images/gallery_image_2.png',
          title: 'Choose Destination',
          text:
            'Волонтерство - это человек, который заботится о других, бескорыстно служит их счастью и интересам',
        },
        {
          image: '/src/assets/images/gallery_image_3.png',
          title: 'Choose Destination',
          text:
            'Волонтерство - это человек, который заботится о других, бескорыстно служит их счастью и интересам',
        },
        {
          image: '/src/assets/images/gallery_image_4.png',
          title: 'Choose Destination',
          text:
            'Волонтерство - это человек, который заботится о других, бескорыстно служит их счастью и интересам',
        },
      ],
      images_bottom: [
        {
          image: '/src/assets/images/gallery_image_5.png',
          title: 'Choose Destination',
          text:
            'Волонтерство - это человек, который заботится о других, бескорыстно служит их счастью и интересам',
        },
        {
          image: '/src/assets/images/gallery_image_6.png',
          title: 'Choose Destination',
          text:
            'Волонтерство - это человек, который заботится о других, бескорыстно служит их счастью и интересам',
        },
        {
          image: '/src/assets/images/gallery_image_7.png',
          title: 'Choose Destination',
          text:
            'Волонтерство - это человек, который заботится о других, бескорыстно служит их счастью и интересам',
        },
        {
          image: '/src/assets/images/gallery_image_8.png',
          title: 'Choose Destination',
          text:
            'Волонтерство - это человек, который заботится о других, бескорыстно служит их счастью и интересам',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.shape {
  border-radius: 30px 0 10px;
}
</style>
