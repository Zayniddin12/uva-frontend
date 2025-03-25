export const state = () => ({
  volunteersList: [],
  volunteersSingle: [],
  volunteerComments: [],
  volunteerCommentsInson: [],
  commentTotal: 0,
  commentTotalInson: 0,
})

export const mutations = {
  setVolunteersList(state, volunteersList) {
    state.volunteersList = volunteersList
  },
  setVolunteersSingle(state, volunteersSingle) {
    state.volunteersSingle = volunteersSingle
  },
  setVolunteerComments(state, volunteerComments) {
    state.volunteerComments = volunteerComments
  },
  setVolunteerCommentsInson(state, volunteerComments) {
    state.volunteerCommentsInson = volunteerComments
  },
  setCommentTotal(state, commentTotal) {
    state.commentTotal = commentTotal
  },
  settCommentTotalInson(state, commentTotal) {
    state.commentTotalInson = commentTotal
  },
}

export const actions = {
  async fetchVolunteersList(
    { commit },
    {
      search,
      districtRegion,
      district,
      page,
      ageGt,
      ageLt,
      volunteerforeventEventSlug,
      status,
      size,
      volunteerType,
    }
  ) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`volunteers`, {
          headers: { 'Accept-Language': this.$i18n.locale },
          params: {
            search,
            district__region: districtRegion,
            district,
            page,
            age_gt: ageGt,
            age_lt: ageLt,
            volunteerforevent__event__slug: volunteerforeventEventSlug,
            status,
            size,
            volunteer_type: volunteerType,
          },
        })
        .then((res) => {
          commit('setVolunteersList', res.data)
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  async fetchVolunteersSingle({ commit }, id) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`volunteers/${id}/`, {
          headers: { 'Accept-Language': this.$i18n.locale },
        })
        .then((res) => {
          commit('setVolunteersSingle', res.data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  async fetchVolunteerComments({ commit }, { id, limit, offset }) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`volunteer-comments/${id}/`, {
          params: { limit, offset },
          headers: { 'Accept-Language': this.$i18n.locale },
        })
        .then((res) => {
          commit('setVolunteerComments', res.data.results)
          commit('setCommentTotal', res.data.count)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  async fetchVolunteerCommentsInson({ commit }, { id, limit, offset }) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`inson-comments/${id}/`, {
          params: { limit, offset },
          headers: { 'Accept-Language': this.$i18n.locale },
        })
        .then((res) => {
          commit('setVolunteerCommentsInson', res.data.results)
          commit('commentTotalInson', res.data.count)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
