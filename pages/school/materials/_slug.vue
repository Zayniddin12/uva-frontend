<template>
  <div>
    <div v-if="single">
      <bread-crumbs
        v-bind="{
          links: [
            {
              title: this.$t('volunteer_school'),
              url: `school`,
            },
            {
              title: this.$t('materials'),
              url: `school/materials`,
            },
            {
              title: single.material.title,
              url: `school/materials/${single.material.slug}`,
            },
          ],
        }"
      />
      <div class="container">
        <div class="grid grid-cols-12 gap-[24px] mb-[24px]">
          <div class="col-span-9 c:col-span-12">
            <section-title
              class="title-b-margin"
              v-bind="{
                title: single.material.title,
              }"
            />
            <div class="single-material">
              <div class="single-material__image">
                <div>
                  <img
                    v-if="single.material.image"
                    :src="single.material.image"
                    :alt="single.material.title"
                  />
                  <div
                    v-if="!single.material.image"
                    class="single-material__image_def"
                  >
                    <icon-base name="no-data-img" />
                  </div>
                </div>
              </div>
              <div
                class="single-material__content"
                v-html="single.material.body"
              ></div>
              <div class="single-material__action">
                <button
                  class="blue-button"
                  @click.prevent="download(single.material)"
                >
                  <icon-base name="received" />
                  {{ $t('download') }}
                </button>
                <span>
                  <icon-base name="received" />
                  {{ single.material.downloaded_count }}
                </span>
              </div>
            </div>
          </div>
          <div class="col-span-3 grid gap-[24px]">
            <UvaBanner class="" />
          </div>
        </div>
        <!-- o'xshash materiallar -->
        <section-title
          v-if="single.similar_materials && single.similar_materials.length"
          class="title-b-margin"
          v-bind="{
            title: $t('similar_materials'),
          }"
        />
        <div
          v-if="single.similar_materials && single.similar_materials.length"
          class="grid-list grid grid-cols-4 c:grid-cols-3 e:grid-cols-2 j:grid-cols-1"
        >
          <material-card
            v-for="(item, idx) of single.similar_materials"
            :key="idx"
            :data="{
              title: item.title,
              small_body: item.small_body,
              downloaded_count: item.downloaded_count,
              file_url: item.file_url,
              image: item.image,
              slug: item.slug,
            }"
            @dowloadClicked="$fetch()"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MaterialCard from '../../../components/cards/MaterialCard.vue'
import UvaBanner from '~/components/Banners/UvaBanner.vue'
import BreadCrumbs from '~/components/BreadCrumbs.vue'
import IconBase from '~/components/volontyor/IconBase.vue'
import SectionTitle from '~/components/SectionTitle.vue'
export default {
  layout: 'pages',
  components: {
    BreadCrumbs,
    SectionTitle,
    IconBase,
    MaterialCard,
    UvaBanner,
  },
  async fetch() {
    await this.$getAction(`/materials/${this.$route.params.slug}/`)
      .then((response) => {
        this.single = response
      })
      .catch(() => {})
  },
  data() {
    return {
      single: null,
    }
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
          const fileURL = response?.data?.file_url
          const fileLink = document.createElement('a')
          if (fileLink && fileURL) {
            fileLink.href = fileURL
            fileLink.setAttribute(
              'download',
              `download.${response?.data?.extension?.replace(/\./g, '')}`
            )
            document?.body?.appendChild(fileLink)
            fileLink.click()
            this.$fetch()
          }
        })
    },
  },
}
</script>
