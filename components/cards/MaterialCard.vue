<template>
  <div>
    <nuxt-link
      v-if="data"
      :to="localePath('/school/materials/' + data.slug)"
      class="material-card h-full"
    >
      <div>
        <div
          v-if="data.image"
          class="material-card__image"
          :style="'background-image: url(' + data.image + ')'"
        ></div>
        <div v-if="!data.image" class="material-card__default">
          <icon-base name="no-data-img" class="mx-auto my-auto" />
        </div>
        <h6 class="line-clamp-3">{{ data.title }}</h6>
      </div>
      <p class="line-clamp-3" v-html="data.body"></p>
      <div v-if="data.file_url" class="material-card__action">
        <a @click.prevent="download(data)">
          {{ $t('download') }}
        </a>
        <span v-if="data.downloaded_count">
          <icon-base name="received" />
          {{ data.downloaded_count }}
        </span>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import IconBase from '../volontyor/IconBase.vue'
export default {
  components: { IconBase },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    async download(item) {
      await this.$axios
        .post(`/download-material/${item.slug}/`, {
          // headers: {
          //   "Accept-Language": this.$i18n.locale,
          // },
          responseType: 'blob',
        })
        .then((response) => {
          this.$emit('dowloadClicked')
          // const fileURL = window?.URL?.createObjectURL(
          //   new Blob([response?.data?.file_url])
          // )
          const fileURL = response.data.file_url
          const fileLink = document.createElement('a')
          if (fileLink && fileURL) {
            fileLink.href = fileURL
            fileLink.setAttribute(
              'download',
              `download.${response?.data?.extension?.replace(/\./g, '')}`
            )
            document?.body?.appendChild(fileLink)
            fileLink.click()
          }
        })
    },
  },
}
</script>
