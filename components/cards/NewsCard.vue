<template>
  <nuxt-link
    :to="localePath(`/news/${slug}`)"
    class="news-item nitem"
    :class="orange ? 'nitem--orange' : ''"
  >
    <div class="nitem__img-box">
      <img :src="img || ''" :alt="title" />
    </div>
    <div class="nitem__content">
      <h6 class="nitem__title">{{ title }}</h6>
      <p class="nitem__subtitle line-clamp-3" v-html="subtitle"></p>
      <div class="nitem__dates flex items-center">
        <time class="flex items-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.66667 7.33325H6V8.66658H4.66667V7.33325ZM14 3.99992V13.3333C14 14.0666 13.4 14.6666 12.6667 14.6666H3.33333C2.59333 14.6666 2 14.0666 2 13.3333L2.00667 3.99992C2.00667 3.26659 2.59333 2.66659 3.33333 2.66659H4V1.33325H5.33333V2.66659H10.6667V1.33325H12V2.66659H12.6667C13.4 2.66659 14 3.26659 14 3.99992ZM3.33333 5.33325H12.6667V3.99992H3.33333V5.33325ZM12.6667 13.3333V6.66658H3.33333V13.3333H12.6667ZM10 8.66658H11.3333V7.33325H10V8.66658ZM7.33333 8.66658H8.66667V7.33325H7.33333V8.66658Z"
              fill="white"
            />
          </svg>
          {{ date }}
        </time>
        <time class="flex items-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="2"
              width="12"
              height="12"
              rx="6"
              stroke="white"
              stroke-width="1.4"
            />
            <path
              d="M8 5.33325V8.66659L10.3333 9.99992"
              stroke="white"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {{ time }}
        </time>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    time: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
      default: 'slug',
    },
    orange: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style>
.nitem__subtitle p span {
  height: 57px;
  font-size: 14px !important;
  line-height: 19px;
  color: #2c2d33;
}
</style>
