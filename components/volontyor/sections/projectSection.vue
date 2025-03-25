<template>
  <div id="project" class="gallery py-[64px]">
    <div class="container">
      <div class="gallery-content relative">
        <div class="relative mb-[60px]">
          <h1 class="text-3xl font-semibold text-[#5E6282] text-center">
            Проекты
          </h1>
          <h1
            class="text-4xl md:text-5xl font-bold text-center text-[#14183E] mt-1"
          >
            Подробнее о наших проектах
          </h1>
          <!--          <img src="../../assets/galleryShape.svg" class="absolute top-[-18px] right-[50px] z-[-1]" alt="">-->
        </div>
        <div>
          <projectSwiper />
        </div>
        <!--        <div></div>-->
        <!--        <div class="shape w-[100px] h-[100px] bg-[#FF7559] absolute bottom-[-20px] left-0"></div>-->
        <div
          class="absolute lg:right-[15px] xl:right-[-67px] bottom-[103px] z-[-1]"
        >
          <img src="../../assets/Decore.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shape {
  border-radius: 30px 0 10px;
}
</style>
