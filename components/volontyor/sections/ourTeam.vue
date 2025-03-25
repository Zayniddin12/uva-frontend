<template>
  <div id="team" className="team py-[64px]">
    <div class="container">
      <div class="team-content flex justify-between flex-col md:flex-row gap-6">
        <div class="w-full md:w-[670px]">
          <h1 class="text-3xl font-semibold text-[#5E6282] mb-[60px]">
            Наша команда
          </h1>
          <teamSwiper />
        </div>
        <div class="right-contetn w-full md:w-[463px] pl-[20px]">
          <h1 class="text-lg text-[#5E6282] font-semibold">СВЯЖИТЕСЬ С НАМИ</h1>
          <p class="text-lg text-[#5E6282] font-medium py-[20px]">
            Инициативная группа “28 петель” открыта к сотрудничеству и участию в
            различных мероприятиях благотворительных организаций и инициативных
            групп
          </p>
          <div class="flex flex-col gap-[23px]">
            <a
              href="tel:+998 90 168-40-88"
              class="mt-1 text-lg font-medium text-[#2C2D33] flex items-center gap-[15px] group"
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 4.5H9L11 9.5L8.5 11C9.57096 13.1715 11.3285 14.929 13.5 16L15 13.5L20 15.5V19.5C20 20.0304 19.7893 20.5391 19.4142 20.9142C19.0391 21.2893 18.5304 21.5 18 21.5C14.0993 21.263 10.4202 19.6065 7.65683 16.8432C4.8935 14.0798 3.23705 10.4007 3 6.5C3 5.96957 3.21071 5.46086 3.58579 5.08579C3.96086 4.71071 4.46957 4.5 5 4.5"
                  stroke="#DA6B3B"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p
                class="transition duration-200 text-base lg:text-lg group-hover:text-[#DA6B3B]"
              >
                +998 90 168-40-88
              </p>
            </a>
            <a
              href="mailto:sadriddin19@gmail.com"
              class="text-lg font-medium text-[#2C2D33] flex items-center gap-[15px] group"
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 5.5H5C3.89543 5.5 3 6.39543 3 7.5V17.5C3 18.6046 3.89543 19.5 5 19.5H19C20.1046 19.5 21 18.6046 21 17.5V7.5C21 6.39543 20.1046 5.5 19 5.5Z"
                  stroke="#DA6B3B"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 7.5L12 13.5L21 7.5"
                  stroke="#DA6B3B"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p
                class="transition duration-200 text-base lg:text-lg group-hover:text-[#DA6B3B]"
              >
                uva.uzb@gmail.com
              </p>
            </a>
            <a
              href="#"
              class="text-lg font-medium text-[#2C2D33] flex items-center gap-[15px] group"
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.0006 3.5L14.5006 21.5C14.4567 21.5957 14.3862 21.6769 14.2976 21.7338C14.209 21.7906 14.1059 21.8209 14.0006 21.8209C13.8952 21.8209 13.7921 21.7906 13.7035 21.7338C13.6149 21.6769 13.5444 21.5957 13.5006 21.5L10.0006 14.5L3.00056 11C2.90482 10.9561 2.82369 10.8857 2.7668 10.7971C2.70992 10.7084 2.67969 10.6053 2.67969 10.5C2.67969 10.3947 2.70992 10.2916 2.7668 10.2029C2.82369 10.1143 2.90482 10.0439 3.00056 10L21.0006 3.5Z"
                  stroke="#DA6B3B"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p
                class="transition duration-200 text-base lg:text-lg group-hover:text-[#DA6B3B]"
              >
                г.Ташкент, ул Т.Шевченко 24/А
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import teamSwiper from '../teamSwiper.vue'
</script>
<style lang="scss" scoped>
.text {
  line-height: 130%;
}

.enter__btn {
  box-shadow: 0 20px 35px rgba(241, 165, 1, 0.15);
}

.right-contetn {
  border-left: 1px solid #90a1b5;
}
</style>
