<template>
  <div>
    <section v-if="lastEvents.length" class="events">
      <div class="container">
        <section-title
          v-bind="{
            title: $t('events'),
            link: $t('all_projects'),
            linkUrl: localePath('/possibilities'),
          }"
        />
        <div class="events__wrapper">
          <Events-card
            v-for="(item, index) in lastEvents"
            :key="index"
            :data="item"
            v-bind="{
              image: item.image,
              slug: item.slug,
              title: item.title,
              id: item.id,
              startingDate: item.starting_date,
              finishingDate: item.finishing_date,
              startingTime: item.starting_time,
              finishingTime: item.finishing_time,
              city: item.region ? item.region.name : '',
              district: item.district ? item.district.name : '',
              liked: item.liked,
              subscribed: item.is_subscribed,
              inProgress: item.status,
              tag: item.direction,
            }"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EventsCard from '../cards/EventsCard.vue'
import SectionTitle from '../volontyor/SectionTitle.vue'
export default {
  components: { EventsCard, SectionTitle },
  computed: {
    ...mapState({
      lastEvents: (state) => state.home.lastEvents,
    }),
  },
}
</script>
