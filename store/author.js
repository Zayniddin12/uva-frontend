export const state = () => ({
  isAuth: false,
  phone: '',
  email: '',
  formTab: 'phone',
  author: null,
})
export const mutations = {
  setPhone(state, phone) {
    state.phone = phone
  },
  setEmail(state, email) {
    state.email = email
  },
  setFormTab(state, tab) {
    state.formTab = tab
  },
  setAuthor(state, author) {
    state.author = author
  },
}
export const actions = {}
