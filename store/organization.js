export const state = () => ({
  organizationList: [],
  organizationSingle: [],
  organizationComments: [],
  commentTotal: 0,
})

export const mutations = {
  setOrganizationList(state, organizationList) {
    state.organizationList = organizationList
  },
  setOrganizationSingle(state, organizationSingle) {
    state.organizationSingle = organizationSingle
  },
  setOrganiztionComments(state, organizationComments) {
    state.organizationComments = organizationComments
  },
  setCommentTotal(state, commentTotal) {
    state.commentTotal = commentTotal
  },
}

export const actions = {
  async fetOrganizationList({ commit }, { search, page, district, region }) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`organizations/`, {
          headers: { 'Accept-Language': this.$i18n.locale },
          params: {
            search,
            page,
            district,
            region,
          },
        })
        .then((res) => {
          commit('setOrganizationList', res.data)
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  async fetchOrganizationSingle({ commit }, id) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`organization/${id}`, {
          headers: { 'Accept-Language': this.$i18n.locale },
        })
        .then((res) => {
          commit('setOrganizationSingle', res.data)
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  async fetchOrganizationComments({ commit }, { id, limit, offset }) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`organization-comments/${id}/`, {
          params: { limit, offset },
          headers: { 'Accept-Language': this.$i18n.locale },
        })
        .then((res) => {
          commit('setOrganiztionComments', res.data.results)
          commit('setCommentTotal', res.data.count)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
