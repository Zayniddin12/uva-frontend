export const state = () => ({
  regionId: undefined,
  sliders: [
    {
      id: 1,
      photo: 'https://picsum.photos/2000?random=1',
      title: 'no data :(',
    },
  ],
  lastNews: [],
  lastEvents: [],
  organizations: [],
  volunteers: [],
  partners: [],
  numbers: {},
})
export const mutations = {
  setRegionId(state, date) {
    state.regionId = date
  },
  setMainPageData(state, data) {
    if (data.sliders.length) state.sliders = data.sliders

    state.lastNews = data.last_news
    state.lastEvents = data.last_events
    state.organizations = data.organizations
    state.volunteers = data.volunteers
    state.partners = data.partners
    state.numbers = data.numbers
  },
}
export const actions = {
  async fetchHomePage({ commit }) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`/home_page/`, {
          headers: { 'Accept-Language': this.$i18n.locale },
        })
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
