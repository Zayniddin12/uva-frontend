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
      :placeholder="$t(placeholderSearch)"
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
    placeholderSearch: {
      type: String,
      default: 'search_project',
    },
  },
  data() {
    return {
      search: '',
    }
  },
}
</script>
