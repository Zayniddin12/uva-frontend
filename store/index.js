export const state = () => ({
  districts: [],
  regions: [],
  directions: [],
  header: null,
  footer: null,
  volunteerForm: null,
  organizationForm: null,
  image: undefined,
})
export const mutations = {
  setVolunteerForm(state, data) {
    state.volunteerForm = data
  },
  setOrganizationForm(state, data) {
    state.organizationForm = data
  },
  setDistricts(state, districts) {
    state.districts = districts
  },
  setRegions(state, regions) {
    state.regions = regions
  },
  setDirections(state, directions) {
    state.directions = directions
  },
  setHeader(state, data) {
    state.header = data
  },
  setFooter(state, data) {
    state.footer = data
  },
  setImage(state, image) {
    state.image = image
  },
}
export const actions = {
  async fetchDistricts({ commit }, region) {
    console.log(region)
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`districts/?region=${region}`, {
          headers: { 'Accept-Language': this.$i18n.locale },
        })
        .then((res) => {
          commit('setDistricts', res.data)
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  async fetchRegions({ commit }, { limit, offset }) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get('regions/', {
          params: { limit, offset },
          headers: { 'Accept-Language': this.$i18n.locale },
        })
        .then((res) => {
          commit('setRegions', res.data)
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  async fetchDirections({ commit }) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get('directions/', {
          headers: { 'Accept-Language': this.$i18n.locale },
        })
        .then((res) => {
          commit('setDirections', res.data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
