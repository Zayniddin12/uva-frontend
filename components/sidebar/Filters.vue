<template>
  <client-only>
    <div class="filter">
      <div class="b:flex items-center justify-between f:flex-col gap-[5px]">
        <div class="filter__item b:!w-4/5 f:!w-full">
          <h3 class="filter__item-title">{{ $t('region') }}</h3>
          <el-select
            v-model="regionsValue"
            filterable
            :filter-method="filterRegion"
            :placeholder="$t('enter_region')"
            @change="$emit('selectCountries', regionsValue), selectRegionID()"
          >
            <el-option
              v-for="item in allRegions"
              :key="item.id"
              :label="item?.name"
              :value="item?.id"
            >
            </el-option>
            <infinite-loading @infinite="infiniteHandler"
              ><span slot="no-more"> {{ $t('no_more_data') }} </span>
            </infinite-loading>
          </el-select>
        </div>
        <div class="filter__item b:!w-4/5 f:!w-full">
          <h3 class="filter__item-title">{{ $t('region_town') }}</h3>
          <el-select
            v-model="districtsValue"
            filterable
            :placeholder="$t('select_city')"
            :disabled="!regionsValue"
            @change="$emit('selectdistrict', districtsValue)"
          >
            <el-option
              v-for="item in districts"
              :key="item.id"
              :label="item?.name"
              :value="item?.id"
            >
            </el-option>
          </el-select>
        </div>
        <div v-if="eventType" class="filter__item b:!w-4/5 f:!w-full">
          <h3 class="filter__item-title">{{ $t('type_events') }}</h3>
          <el-select
            v-model="typeEvents"
            filterable
            :placeholder="$t('choose_type_events')"
            @change="handleTypeEventsChange"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div v-else-if="volunteerType" class="filter__item b:!w-4/5 f:!w-full">
          <h3 class="filter__item-title">{{ $t('volunteer_type') }}</h3>
          <el-select
            v-model="typeVolunteer"
            filterable
            :placeholder="$t('choose_type_events')"
            @change="handeTypeVolunteerChange"
          >
            <el-option
              v-for="item in volunteer_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!--      <div v-if="direction" class="filter__item filter__item-direction">-->
      <!--        <h3 class="filter__item-title">{{ $t('direction') }}</h3>-->
      <!--        &lt;!&ndash;      {{ checkList }}&ndash;&gt;-->
      <!--        <el-checkbox-group-->
      <!--          v-model="checkList"-->
      <!--          @change="$emit('selectedDirection', checkList)"-->
      <!--          >>-->
      <!--          <el-checkbox-->
      <!--            v-for="(item, index) in filerData"-->
      <!--            :key="index"-->
      <!--            :label="item.id"-->
      <!--            class="!line-clamp-1"-->
      <!--          >-->
      <!--            {{ item.title }}-->
      <!--          </el-checkbox>-->
      <!--        </el-checkbox-group>-->
      <!--        <button-->
      <!--          v-if="directions.length > 7"-->
      <!--          class="filter__item-more"-->
      <!--          @click="showMore"-->
      <!--        >-->
      <!--          {{-->
      <!--            directions.length === filerData.length-->
      <!--              ? $t('view_less')-->
      <!--              : $t('view_all')-->
      <!--          }}-->
      <!--        </button>-->
      <!--      </div>-->
      <div class="filter__item">
        <div v-if="!hideAge">
          <h3 v-if="age" class="filter__item-title">{{ $t('years_old') }}</h3>
          <h3 v-else class="filter__item-title">{{ $t('dates') }}</h3>
          <div class="filter__item-inputs">
            <div class="w-full">
              <template v-if="date">
                <ClientOnly>
                  <VueDatePicker
                    v-model="possDate"
                    :locale="{ lang: datePickerLocale }"
                    :no-header="true"
                    type="date"
                    format="DD.MM.YYYY"
                    value-format="yyyy-MM-dd"
                    :placeholder="this.$t('dateFormat')"
                    :clearable="true"
                    range
                  />
                </ClientOnly>
              </template>
              <template v-else>
                <form class="flex items-center">
                  <input
                    v-model="startDate"
                    v-mask="'##'"
                    :placeholder="age ? $t('minAge') : 'DD.MM.YYYY'"
                    class="input1"
                    :class="{ '!border-red': errorStartAge }"
                  />
                  <input
                    v-model="endDate"
                    v-mask="'##'"
                    :placeholder="age ? $t('maxAge') : 'DD.MM.YYYY'"
                    class="input2"
                    :class="{ '!border-red': errorEndAge }"
                  />
                </form>
              </template>
            </div>
          </div>
        </div>
        <button
          class="filter__item-date-btn px-[24px] py-[12px] b:py-[8px]"
          @click="$emit('sendResult')"
        >
          {{ $t('show') }}
        </button>
      </div>
      <button
        class="filter__item-btn px-[24px] py-[12px] b:py-[8px]"
        @click="$emit('resetResult'), resetResults()"
      >
        {{ $t('reset') }}
      </button>
    </div>
  </client-only>
</template>

<script>
import { mapState } from 'vuex'
import { debounce } from '@/helpers'
export default {
  props: {
    direction: {
      type: Boolean,
      default: true,
    },
    age: {
      type: Boolean,
      default: false,
    },
    hideAge: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Object,
      optional: true,
      default: () => ({}),
    },
    errorStartAge: {
      type: Boolean,
      default: false,
    },
    errorEndAge: {
      type: Boolean,
      default: false,
    },
    eventType: {
      type: Boolean,
      default: false,
    },
    volunteerType: {
      type: Boolean,
      default: false,
    },
  },
  async fetch() {
    await this.$store.dispatch('fetchRegions', { limit: 8, offset: 0 })
    await this.$store.dispatch('fetchDistricts', 1)
    await this.$store.dispatch('fetchDirections')
    if (this.directions?.length > 5) {
      for (let i = 0; i < 5; i++) {
        this.filerData.push(this.directions[i])
      }
    } else {
      for (const item of this.directions) {
        this.filerData.push(item)
      }
    }
  },
  data() {
    return {
      options: [
        {
          value: 'Option1',
          label: this.$t('all'),
        },
        {
          value: 'Option2',
          label: this.$t('protection_agency'),
        },
      ],
      volunteer_options: [
        {
          id: '',
          value: '',
          label: this.$t('all'),
        },
        {
          id: 1,
          value: 1,
          label: this.$t('volunteers'),
        },
        {
          id: 3,
          value: 2,
          label: this.$t('social_volunteer'),
        },
      ],
      value: '',
      allRegions: [],
      filerData: [],
      checkList: [],
      regionsValue: '',
      districtsValue: '',
      typeEvents: '',
      typeVolunteer: '',
      possDate: '',
      dateTime: null,
      startDate: '',
      endDate: '',
      minDate: '',
      maxDate: '',
      textDate: null,
      is_badge: false,
      pickerOptions: {
        disabledDate(time) {
          // return time.getTime() < Date.now();
        },
      },
      datePickerLocale: {
        name: 'uz',
        weekdays: [
          this.$t('calendar.weeks.yak'),
          this.$t('calendar.weeks.dush'),
          this.$t('calendar.weeks.sesh'),
          this.$t('calendar.weeks.chor'),
          this.$t('calendar.weeks.pay'),
          this.$t('calendar.weeks.jum'),
          this.$t('calendar.weeks.sham'),
        ],
        months: [
          this.$t('calendar.months.yan'),
          this.$t('calendar.months.fev'),
          this.$t('calendar.months.mart'),
          this.$t('calendar.months.aprel'),
          this.$t('calendar.months.may'),
          this.$t('calendar.months.iyun'),
          this.$t('calendar.months.iyul'),
          this.$t('calendar.months.avg'),
          this.$t('calendar.months.sent'),
          this.$t('calendar.months.okt'),
          this.$t('calendar.months.noy'),
          this.$t('calendar.months.dek'),
        ],
        weekStart: 1,
        weekdaysShort: [
          this.$t('calendar.week_short.yak'),
          this.$t('calendar.week_short.dush'),
          this.$t('calendar.week_short.sesh'),
          this.$t('calendar.week_short.chor'),
          this.$t('calendar.week_short.pay'),
          this.$t('calendar.week_short.jum'),
          this.$t('calendar.week_short.sham'),
        ],
        monthsShort: [
          this.$t('calendar.month_short.yan'),
          this.$t('calendar.month_short.fev'),
          this.$t('calendar.month_short.mart'),
          this.$t('calendar.month_short.aprel'),
          this.$t('calendar.month_short.may'),
          this.$t('calendar.month_short.iyun'),
          this.$t('calendar.month_short.iyul'),
          this.$t('calendar.month_short.avg'),
          this.$t('calendar.month_short.sent'),
          this.$t('calendar.month_short.okt'),
          this.$t('calendar.month_short.noy'),
          this.$t('calendar.month_short.dek'),
        ],
        formats: {
          LT: 'HH:mm',
          LTS: 'HH:mm:ss',
          L: 'DD/MM/YYYY',
          LL: 'D MMMM YYYY',
          LLL: 'D MMMM YYYY HH:mm',
          LLLL: 'dddd D MMMM YYYY HH:mm',
        },
        ordinal: (n) => `${n}º`,
        buttonCancel: 'Annulla',
        buttonValidate: 'Ok',
        rangeHeaderText: 'Dalle %d Alle 13',
      },
    }
  },
  computed: {
    ...mapState({
      regions: (state) => state.regions.results,
      districts: (state) => state.districts.results,
      directions: (state) => state.directions,
      eventsList: (state) => state.events.eventsList.results,
    }),
  },
  watch: {
    regions() {
      this.allRegions = [...this.allRegions, ...this.regions]
    },
    startDate(newValue) {
      this.$emit('startDate', newValue)
    },
    endDate(newValue) {
      this.$emit('endDate', newValue)
    },
    possDate(newValue) {
      if (newValue) {
        this.$emit('date', newValue)
      } else {
        this.$emit('date', '')
      }
    },
    regionsValue(newValue) {
      this.districtsValue = null
    },
  },
  methods: {
    handleTypeEventsChange() {
      this.is_badge = this.typeEvents !== 'Option1'
      this.$emit('typeEventsChange', this.is_badge)
    },
    handeTypeVolunteerChange() {
      this.$emit('typeVolunteerChange', this.typeVolunteer)
    },

    filterRegion(region) {
      debounce(
        'searchRegions',
        () => {
          this.$axios
            .$get(`regions`, {
              params: {
                search: region,
              },
            })
            .then((res) => {
              this.allRegions = res.results
            })
        },
        400
      )
    },
    async infiniteHandler($state) {
      if (this.allRegions.length >= this.regions?.count) {
        $state.complete()
        return
      }
      try {
        const response = await this.$store.dispatch('fetchRegions', {
          limit: 8,
          offset: this.allRegions.length,
        })
        const newData = response?.results || []
        this.allRegions = [...this.allRegions, ...newData]
        this.hasMoreData = newData.length > 0
        $state.loaded()
      } catch (error) {
        console.error('Error fetching more languages:', error)
        $state.complete()
      }
    },
    showMore() {
      if (this.directions > this.filerData) {
        for (let i = 5; i < this.directions?.length; i++) {
          this.filerData.push(this.directions[i])
        }
        // localStorage.setItem('more_sidebar', true);
      } else {
        for (let i = 5; i < this.directions?.length; i++) {
          this.filerData.pop()
        }
        // localStorage.setItem('more_sidebar', false);
      }
    },
    async selectRegionID() {
      await this.$store.dispatch('fetchDistricts', this.regionsValue)
    },
    resetResults() {
      this.regionsValue = ''
      this.districtsValue = ''
      this.startDate = ''
      this.endDate = ''
      this.typeEvents = ''
      this.possDate = ''
      this.checkList = []
      this.typeVolunteer = ''
    },
  },
}
</script>

<style lang="scss">
.vd-picker .vd-wrapper .vd-picker__input .vd-picker__input-icon {
  display: none !important;
}

.vd-picker__input-icon__wrapper {
  display: none;
}
.vd-picker__input-clear {
  position: absolute;
  right: 10px;
  top: 11px;
}
</style>
