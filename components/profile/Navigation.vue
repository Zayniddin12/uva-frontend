<template>
  <div class="profile">
    <div class="profile-info">
      <div class="profile-info__avatar">
        <img :src="user.photo || user.default_photo" alt="profile.name" />
        <div
          v-if="profile.avg_rating >= 0 && user.user_type === 1"
          class="profile-info__rating"
        >
          <icon-base name="star_1" />{{ profile.avg_rating }}
        </div>
      </div>
      <div class="profile-info__content">
        <h3 v-if="user.user_type === 1" class="">
          {{ user.first_name }} {{ user.last_name }}
        </h3>
        <h3 v-if="user.user_type === 2" class="line-clamp1">
          {{ user.organization_name }}
        </h3>
        <h3 v-if="user.user_type === 3" class="line-clamp1">
          {{ user.organization_name }}
        </h3>
        <p v-if="user.user_type === 1" class="mb-1">
          {{ $t('ager') }}:
          <span class="text-[#2C2D33] font-semibold">{{ userAge }}</span>
        </p>
        <p>ID:{{ user.id }}</p>
      </div>
    </div>
    <div v-if="user.user_type === 1" class="profile-info__status">
      <div v-if="profile.status === 4" class="profile-info__status_box">
        <img src="/icons/medallions-platine.svg" alt="medallion" />
        <p>{{ $t('platinum_single') }}</p>
      </div>
      <div v-if="profile.status === 3" class="profile-info__status_box">
        <img src="/icons/medallions-gold.svg" alt="medallion" />
        <p>{{ $t('gold_single') }}</p>
      </div>
      <div v-if="profile.status === 2" class="profile-info__status_box">
        <img src="/icons/medallions-silver.svg" alt="medallion" />
        <p>{{ $t('silver_single') }}</p>
      </div>

      <div v-if="profile.status === 1" class="profile-info__status_box">
        <img src="/icons/medallions-bronze.svg" alt="medallion" />
        <p>{{ $t('bronze_single') }}</p>
      </div>
    </div>
    <ul v-if="user.user_type === 1" class="profile__nav-list">
      <li v-for="tab in tabs" :key="tab.title">
        <nuxt-link :to="localePath(tab.link)">
          <span class="profile__nav-list__icon">
            <icon-base :name="tab.icon" />
            <icon-base :name="tab.iconActive" />
          </span>
          {{ tab.title }}
        </nuxt-link>
      </li>
    </ul>
    <ul v-if="user.user_type === 2" class="profile__nav-list">
      <li v-for="tab in organTabs" :key="tab.title">
        <nuxt-link :to="localePath(tab.link)">
          <span class="profile__nav-list__icon">
            <icon-base :name="tab.icon" />
            <icon-base :name="tab.iconActive" />
          </span>
          {{ tab.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import IconBase from '../volontyor/IconBase.vue'
export default {
  layout: 'pages',
  components: { IconBase },

  async fetch() {
    await this.$store.dispatch('profile/fetchProfile')
  },
  data() {
    return {
      tabs: [
        {
          title: this.$t('my_data'),
          icon: 'profile',
          iconActive: 'profile-fill',
          link: '/profile',
        },
        {
          title: this.$t('settings'),
          icon: 'settings',
          iconActive: 'settings-fill',
          link: '/profile/settings',
        },
        {
          title: this.$t('projectss'),
          icon: 'megaphone',
          iconActive: 'megaphone-fill',
          link: '/profile/projects',
        },
        {
          title: this.$t('saved'),
          icon: 'heart',
          iconActive: 'heart-fill',
          link: '/profile/saved',
        },
        {
          title: this.$t('my_qrcode'),
          icon: 'qrcode',
          iconActive: 'qrcode',
          link: '/profile/share',
        },
      ],
      organTabs: [
        {
          title: this.$t('our_data'),
          icon: 'profile',
          iconActive: 'profile-fill',
          link: '/profile',
        },
        {
          title: this.$t('projectss'),
          icon: 'megaphone',
          iconActive: 'megaphone-fill',
          link: '/profile/projects',
        },
        {
          title: this.$t('saved'),
          icon: 'heart',
          iconActive: 'heart-fill',
          link: '/profile/saved',
        },
        {
          title: this.$t('my_org_qrcode'),
          icon: 'qrcode',
          iconActive: 'qrcode',
          link: '/profile/share',
        },
      ],
    }
  },

  computed: {
    ...mapState({
      profile: (state) => state.profile.profile,
      user: (state) => state.auth.user,
    }),
    userAge() {
      return new Date().getFullYear() - this.profile?.date_of_birth?.slice(0, 4)
    },
  },
}
</script>
<style>
.profile__nav-list li:last-child a svg path {
  stroke: transparent !important;
}
</style>
