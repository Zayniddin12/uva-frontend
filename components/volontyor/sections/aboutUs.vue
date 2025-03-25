<template>
  <div id="about" class="about py-[64px]">
    <div class="container">
      <div class="about-content">
        <div class="flex flex-col lg:flex-row items-center justify-between">
          <div class="max-w-[540px] w-full">
            <h1 class="text-2xl font-semibold text-[#5E6282]">
              {{ $t('about_us') }}
            </h1>
            <h1
              class="text-4xl lg:text-5xl font-bold text-[#14183E] mt-1 mb-[60px]"
            >
              {{ $t('our_goal') }}
            </h1>
            <div class="mt-[22px]">
              <h4 class="text-[#5E6282] text-base mb-1 font-bold">
                Цель проекта
              </h4>
              <p class="text-base font-normal text-[#5E6282]">
                Внести свой вклад в выхаживание и поддержку недоношенных детей и
                детей, родившихся с малым весом.
              </p>
            </div>
            <div class="mt-[22px]">
              <h4 class="text-[#5E6282] text-base mb-1 font-bold">
                Перед клубом стоят следующие задачи:
              </h4>
              <p class="text-base font-normal text-[#5E6282]">
                На постоянной основе предоставлять отделениям детской реанимации
                и неонатологии шерстяные вязаные изделия, способствующие более
                эффективному процессу выхаживания недоношенных детей.
              </p>
            </div>
            <div class="mt-[22px]">
              <p class="text-base font-normal text-[#5E6282]">
                Для этого, через работу клуба, мы объединяем усилия социально
                активных граждан в оказании помощи для недоношенных детей.
              </p>
            </div>
          </div>
          <div class="relative">
            <img
              src="../../assets/aboutBlur.png"
              class="absolute top-0 right-0 z-[-1]"
              alt=""
            />
            <img src="/src/assets/images/our_mission.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
