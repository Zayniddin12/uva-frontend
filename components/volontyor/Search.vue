<template>
  <form
    class="search"
    @submit.prevent=""
    @keyup.enter="$emit('search', search)"
  >
    <icon-base name="search-icon" class="search__icon" />
    <input
      v-model="search"
      type="text"
      class="search__input"
      :placeholder="$t('search_project')"
    />
    <button class="search__btn" @click="$emit('search', search)">
      {{ $t('search') }}
    </button>
  </form>
</template>

<script>
import IconBase from './IconBase.vue'
export default {
  components: { IconBase },
  props: {
    searchText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      search: '',
    }
  },
  watch: {
    searchText(value) {
      this.search = this.searchText
    },
  },
}
</script>
