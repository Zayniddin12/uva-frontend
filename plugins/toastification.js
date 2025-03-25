import Vue from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

Vue.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  newestOnTop: true,
  hideProgressBar: true,
  timeout: 3000,
  closeButton: false,
  pauseOnHover: true,
  maxToasts: 3,
  icon: {
    iconClass: 'toast-icon', // Optional
    iconTag: 'span', // Optional
  },
})
