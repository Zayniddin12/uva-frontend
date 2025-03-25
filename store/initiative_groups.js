export const state = () => ({
  groupList: [],
  groupSingle: [],
  groupVolunteer: [],
})

export const mutations = {
  setGroupList(state, groupList) {
    state.groupList = groupList
  },
  setGroupSingle(state, groupSingle) {
    state.groupSingle = groupSingle
  },
  setGroupVolunteer(state, groupVolunteer) {
    state.groupVolunteer = groupVolunteer
  },
}

export const actions = {
  async fetchGroupList({ commit }, { search, page, district, districtRegion }) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`initiative_groups/`, {
          headers: { 'Accept-Language': this.$i18n.locale },
          params: {
            search,
            page,
            district,
            district__region: districtRegion,
          },
        })
        .then((res) => {
          commit('setGroupList', res.data)
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  async fetchGroupSingle({ commit }, id) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`initiative_groups/${id}`, {
          headers: { 'Accept-Language': this.$i18n.locale },
        })
        .then((res) => {
          commit('setGroupSingle', res.data)
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  async fetchGroupVolunteer({ commit }, { id, page }) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`volunteers/?initiative_group__initiative_group__id=${id}`, {
          headers: { 'Accept-Language': this.$i18n.locale },
          params: {
            page,
          },
        })
        .then((res) => {
          commit('setGroupVolunteer', res.data)
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
