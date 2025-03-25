import Vue from 'vue'
// Or only as a filter-only
import VueMask, { VueMaskFilter } from 'v-mask'

Vue.use(VueMask)
Vue.filter('VMask', VueMaskFilter)
