export const state = () => ({
  activity: {},
  organ: {},
})

export const mutations = {
  SET_ACTIVITY(state, activity) {
    state.activity = activity
  },
  SET_ORGAN(state, organ) {
    state.organ = organ
  },
}

export const actions = {
  async fetchActivity({ commit }) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`volunteer_events/`, {
          headers: {
            'Accept-Language': this.$i18n.locale,
          },
        })
        .then((res) => {
          commit('SET_ACTIVITY', res.data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  async fetchOrgan({ commit }) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`organization_events/`, {
          headers: {
            'Accept-Language': this.$i18n.locale,
          },
        })
        .then((res) => {
          commit('SET_ORGAN', res.data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
