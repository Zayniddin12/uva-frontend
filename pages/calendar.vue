<template>
  <div class="m-calendar">
    <div class="m-calendar__year-bar">
      <span><icon-base name="arrow-right-light" /></span>
      <span>2021 год</span>
      <span><icon-base name="arrow-right-light" /></span>
    </div>
    <div class="m-calendar__main">
      <div class="m-calendar__month">
        <p>Декабрь 2021</p>
        <div class="days">
          <div v-for="day in days" :key="day">
            {{ day }}
          </div>
        </div>
        <div class="dates">
          <div v-for="data in 31" :key="data">
            {{ data }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from '../components/volontyor/IconBase.vue'
export default {
  components: { IconBase },
  layout: 'empty',
  data() {
    return {
      days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    }
  },
}
</script>

sty
