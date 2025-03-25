export const state = () => ({
  eventsList: [],
  eventsSingle: [],
  eventsLink: [],
})

export const mutations = {
  setEventsList(state, eventsList) {
    state.eventsList = eventsList
  },
  setEventsSingle(state, eventsSingle) {
    state.eventsSingle = eventsSingle
  },
  setEventsLink(state, eventsLink) {
    state.eventsLink = eventsLink
  },
}

export const actions = {
  async fetchEventsList(
    { commit },
    {
      search,
      district,
      region,
      direction,
      startingDate,
      finishingDate,
      page,
      isBadge,
    }
  ) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get('event/', {
          params: {
            page,
            search,
            district,
            region,
            direction,
            starting_date__gte: startingDate,
            finishing_date__lte: finishingDate,
            is_badge: isBadge,
          },
          headers: { 'Accept-Language': this.$i18n.locale },
        })
        .then((res) => {
          commit('setEventsList', res.data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  async fetchEventsSingle({ commit }, slug) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`event/${slug}`, {
          headers: { 'Accept-Language': this.$i18n.locale },
        })
        .then((res) => {
          commit('setEventsSingle', res.data)
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  async fetchEventsLink({ commit }, slug) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`/least-event-link`, {
          headers: { 'Accept-Language': this.$i18n.locale },
        })
        .then((res) => {
          commit('setEventsLink', res.data)
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
