<template>
  <nuxt-link
    :to="localePath(`/possibilities/organization/${data.id}`)"
    class="org-card p-[20px] mb-[24px] overflow-auto"
  >
    <div class="top grid grid-cols-4 mb-[8px]">
      <div
        class="left-side col-span-3 c:col-span-4 c:mb-[15px] flex items-center g:flex-col g:items-start"
      >
        <div v-if="data.photo" class="image-box shrink-0 mr-[12px] g:mb-[12px]">
          <img :src="data.photo" :alt="data.organization_name" />
        </div>
        <div v-else class="image-box shrink-0 mr-[12px] g:mb-[12px]">
          <img
            src="~/assets/volontyor/not-image.png"
            :alt="data.organization_name"
          />
        </div>
        <div class="top__texts line-clamp2">
          <h5 class="title">
            <client-only>
              <nuxt-link
                :to="localePath(`/possibilities/organization/${data.id}`)"
                class="d:text-base a:text-xl"
              >
                {{ data.organization_name }}
              </nuxt-link>
            </client-only>
          </h5>
          <div class="flex address items-center b:items-start shrink-0">
            <span v-if="data.district && data.region" class="flex items-center">
              <icon-base class="icon mr-[6px]" name="location-icon" />
              <div class="address__region flex items-center">
                <p>{{ data.district.name }},</p>
                <p>{{ data.region.name }}</p>
              </div>
            </span>
            <client-only>
              <el-divider
                v-if="data.phone"
                class="vertical-divider"
                direction="vertical"
              ></el-divider>
            </client-only>
            <span
              v-if="data.phone"
              class="flex address__phone items-center shrink-0"
            >
              <icon-base class="icon mr-[6px]" name="Calling" />
              <p>
                {{ ('+998' + data.phone) | VMask('+998 (##) ###-##-##') }}
              </p>
            </span>
          </div>
        </div>
      </div>
      <div
        v-if="data.youtube || data.telegram || data.facebook || data.instagram"
        class="right-side socials"
      >
        <a v-if="data.youtube" target="_blank" :href="data.youtube">
          <icon-base name="youtube" class="icon" />
        </a>
        <a v-if="data.telegram" target="_blank" :href="data.telegram">
          <icon-base name="tg" class="icon" />
        </a>
        <a v-if="data.facebook" target="_blank" :href="data.facebook">
          <icon-base name="fb" class="icon" />
        </a>
        <a v-if="data.instagram" target="_blank" :href="data.instagram">
          <icon-base name="insta" class="icon" />
        </a>
      </div>
    </div>
    <div class="initiative-info mt-[20px]">
      <p>{{ data.about }}</p>
    </div>
  </nuxt-link>
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
    // ava: { type: String, default: 'https://picsum.photos/80/80'},
    // name: { type: String, default: "UIC Group" },
    // location: { type: String, default: "г. Ташкент" },
    // number: { type: String, default: "+998 (93) 440-00-04" },
    // mail: { type: String, default: "info@uve.uz" },
    // text: { type: String, default: "UIC Group” предлагает свои услуги по 6 направлениям ИТ сферы любой сложности. “UIC Group” - место, где каждый проект имеет ценность и професс..." },
    // youtube: {type: String, default: 'https://www.youtube.com'},
    // telegram: {type: String, default: 'https://www.telegram.org'},
    // facebook: {type: String, default: 'https://www.facebook.com'},
    // insta: {type: String, default: 'https://www.instagram.com'},
  },
}
</script>

<style lang="scss" scoped>
.org-card {
  display: block;
  background: #fff;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .image-box {
    flex-shrink: 0;
    min-width: 80px;
    max-width: 80px;
    height: 80px;

    @media (max-width: 480px) {
      width: 60%;
      height: auto;
      //margin: 0 auto;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
  }

  .title {
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    color: #2c2d33 !important;
    transition: 0.3s ease-in-out;
    margin-bottom: 8px;

    @media (min-width: 798px) {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      max-width: 294px;
      margin-bottom: 8px;
    }

    a {
      color: #2c2d33 !important;
      transition: 0.3s ease-in-out;
    }

    &:hover {
      color: #da6b3b;
    }
  }

  .address {
    flex-direction: column;
    align-items: flex-start;

    //span {
    //  flex-shrink: 0;
    //
    //  @media (max-width: 1100px) {
    //    flex-shrink: 1;
    //  }
    //}
    &__region {
      p {
        white-space: nowrap;
      }

      @media (max-width: 1070px) {
        flex-direction: column;
        align-items: flex-start;
      }

      @media (max-width: 1000px) {
        flex-direction: row;
        align-items: center;
      }

      @media (max-width: 450px) {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    p {
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
      line-height: 18px;
      color: #2c2d33;
      margin-bottom: 0;
    }

    &__phone {
      flex-shrink: 0 !important;
    }

    @media (max-width: 1075px) {
      flex-direction: column;
      align-items: flex-start;

      .vertical-divider {
        display: none;
      }

      span:first-child {
        margin-bottom: 5px;
      }
    }
  }

  .socials {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    justify-content: right;

    @media (max-width: 900px) {
      justify-content: initial !important;
    }

    a {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      background: rgba(55, 148, 221, 0.1);
      border-radius: 4px;
      transition: 0.3s ease-in-out;

      &:hover {
        background: rgba(55, 148, 221, 0.4);

        svg {
          path {
            fill: #fff !important;
          }
        }
      }
    }
  }

  .quantity {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 18px;
    color: #90a1b5;
  }

  .count {
    font-size: 13px;
    line-height: 18px;
    color: #2c2d33;
  }

  .desc {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: #52230f;
    overflow: hidden;
    //display: inline-block;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .join-btn {
    padding: 8px 12px;
    border-radius: 4px;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #fff;
    transition: 0.3s ease-in-out;
    @apply bg-blue-600;

    &:hover {
      @apply bg-blue-500;
    }
  }

  .leave-btn {
    padding: 8px 12px;
    font-size: 12px;
    line-height: 16px;
    text-align: right;
    color: #d84343;
    border: 1px solid #d84343;
    border-radius: 4px;
  }
}
</style>
