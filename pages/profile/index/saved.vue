<template>
  <div class="profile-saved">
    <Preloader :fetch-state="$fetchState" :data="liked">
      <div v-if="liked.length">
        <Main-event-card
          v-for="(item, index) in liked"
          :key="index"
          v-bind="{
            title: item.title,
            date: `${item.starting_date} - ${item.finishing_date}`,
            time: `${item.starting_time} - ${item.finishing_time}`,
            address: `${item.district ? item.district.name : ''},  ${
              item.region ? item.region.name : ''
            }`,
            organizer: item.organization.organization_name,
            organizerImg: item.organization.photo,
            tags: item.tag,
            slug: item.slug,
            inProgress: item.status,
            liked: item.liked,
            subscribed: item.is_subscribed,
            likedIcon: true,
            img: item.image,
            id: item.id,
          }"
        />
      </div>
      <NotFound v-else />
    </Preloader>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MainEventCard from '../../../components/cards/MainEventCard.vue'
import NotFound from '~/components/notFound.vue'

export default {
  components: { MainEventCard, NotFound },

  async fetch() {
    await this.$store.dispatch('activity/fetchActivity')

    this.liked = this.activity.volunteer_liked_events
  },
  data() {
    return {
      liked: [],
      status: ['', 'inProgress', 'completed', 'beVolunteer'],
    }
  },

  computed: {
    ...mapState({
      activity: (state) => state.activity.activity,
      user: (state) => state.auth.user,
    }),
  },
}
</script>
