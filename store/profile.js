export const state = () => ({
  profile: {},
  organization: {},
  country: [],
  region: [],
  district: [],
  goal: [],
  langs: [],
})

export const mutations = {
  SET_PROFILE(state, profile) {
    state.profile = profile
  },
  SET_ORGANIZATION(state, organization) {
    state.organization = organization
  },
  SET_COUNTRIES(state, country) {
    state.country = country
  },
  SET_REGIONS(state, region) {
    state.region = region
  },
  SET_DISTRICTS(state, district) {
    state.district = district
  },
  SET_GOALS(state, goal) {
    state.goal = goal
  },
  SET_LANGUAGES(state, langs) {
    state.langs = langs
  },
}

export const actions = {
  // !Volunteer Profile
  async fetchProfile({ commit }) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`volunteer_profile/`, {
          headers: {
            'Accept-Language': this.$i18n.locale,
          },
        })
        .then((res) => {
          commit('SET_PROFILE', res.data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // !Organization Profile
  async fetchOrganization({ commit }) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`organization_profile/`, {
          headers: {
            'Accept-Language': this.$i18n.locale,
          },
        })
        .then((res) => {
          commit('SET_ORGANIZATION', res.data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  async fetchCountries({ commit }, { limit, offset }) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`countries/`, {
          params: { limit, offset },
          headers: {
            'Accept-Language': this.$i18n.locale,
          },
        })
        .then((res) => {
          commit('SET_COUNTRIES', res.data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  async fetchRegions({ commit }, { country, limit, offset } = '') {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`regions/`, {
          params: {
            country,
            limit,
            offset,
          },
          headers: {
            'Accept-Language': this.$i18n.locale,
          },
        })
        .then((res) => {
          commit('SET_REGIONS', res.data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  async fetchDistricts({ commit }, { region } = '') {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`districts/`, {
          params: {
            region,
          },
          headers: {
            'Accept-Language': this.$i18n.locale,
          },
        })
        .then((res) => {
          commit('SET_DISTRICTS', res.data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  async fetchGoals({ commit }) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`goals/`, {
          headers: {
            'Accept-Language': this.$i18n.locale,
          },
        })
        .then((res) => {
          commit('SET_GOALS', res.data.results)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  async fetchLanguages({ commit }, { limit, offset }) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`languages/`, {
          params: { limit, offset },
          headers: {
            'Accept-Language': this.$i18n.locale,
          },
        })
        .then((res) => {
          commit('SET_LANGUAGES', res.data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
