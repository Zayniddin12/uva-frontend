<template>
  <div>
    <section
      v-if="organizations.length"
      class="organization container !mt-[28px]"
    >
      <section-title
        v-bind="{
          title: $t('organization'),
          link: $t('all_organization'),
          linkUrl: localePath('/possibilities/organization'),
        }"
      />
      <div class="organization__wrapper">
        <organization-card
          v-for="(item, index) in organizations"
          :key="index"
          :data="item"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import OrganizationCard from '../cards/OrganizationCard.vue'
import SectionTitle from '../volontyor/SectionTitle.vue'
export default {
  components: { SectionTitle, OrganizationCard },
  computed: {
    ...mapState({
      organizations: (state) => state.home.organizations,
    }),
  },
}
</script>
