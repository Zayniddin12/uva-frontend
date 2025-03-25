<template>
  <div class="container !my-[32px]">
    <Preloader :fetch-state="$fetchState" :data="single">
      <div class="p-[24px] profile">
        <form class="flex flex-col gap-[24px]" @submit.prevent="checkForm">
          <h1 class="font-bold text-[#2C2D33] text-[32px] f:text-[24px]">
            {{ $t('add_functional') }}
          </h1>
          <h2 class="font-bold text-[#52230F] text-[24px] mt-[16px] mb-[8px]">
            {{ $t('about_the_event') }}
          </h2>
          <Upload v-model="form.image" :foto="url" />
          <Input
            v-model="form.title"
            :placeholder="$t('enter_title')"
            :label="$t('event_title')"
            :error="$v.form.title.$error"
            :maxlength="80"
          />
          <div class="grid grid-cols-2 c:grid-cols-1 gap-[12px]">
            <Input
              v-model="form.region"
              :placeholder="$t('enter_region')"
              :label="$t('region_req')"
              select
              filter
              :list="filteredRegions"
              :error="$v.form.region.$error"
              @typingValue="filterRegion($event)"
              @load="loadMore"
            />
            <Input
              v-model="form.district"
              :placeholder="$t('select_city')"
              :label="$t('city_req')"
              select
              filter
              no-infinite
              :disabled="!form.region"
              :list="filteredDistricts"
              :error="$v.form.district.$error"
              @typingValue="filterDistrict($event)"
            />
          </div>
          <div class="flex items-center justify-between w-full">
            <span class="form__label">{{ $t('short_descr') }}</span>
            <span> {{ form.description2?.length }}/1000 </span>
          </div>

          <Input
            v-model="form.description2"
            :placeholder="$t('about_project')"
            textarea
            :error="$v.form.description2.$error"
            maxlength="1000"
          />
          <div class="grid grid-cols-2 c:grid-cols-1 gap-[12px]">
            <div class="grid grid-cols-2 c:grid-cols-1 gap-[12px]">
              <div class="flex flex-col gap-[8px]">
                <label class="form__label">{{ $t('date_req') }}</label>
                <VueDatePicker
                  v-model="form.date"
                  :value="form.date"
                  :locale="{ lang: datePickerLocale }"
                  :no-header="true"
                  :placeholder="this.$t('dateFormat')"
                  type="date"
                  :class="{ _error: $v.form.date.$error }"
                  format="DD.MM.YYYY"
                  value-format="yyyy-MM-dd"
                  range
                />
              </div>
              <div class="flex flex-col gap-[8px]">
                <label class="form__label">{{ $t('time_req') }}</label>

                <el-time-picker
                  v-model="form.time"
                  is-range
                  range-separator="-"
                  start-placeholder="00:00"
                  end-placeholder="00:00"
                  value-format="HH:mm"
                  format="HH:mm"
                  :class="{ _error: $v.form.time.$error }"
                >
                </el-time-picker>
              </div>
            </div>
            <Input
              v-model="form.volunteers_needed"
              :placeholder="$t('number_volunteers')"
              :label="$t('number_volunteers_req')"
              :mask="currencyMask"
              :error="$v.form.volunteers_needed.$error"
              maxlength="9"
            />
          </div>
          <label class="form__label">{{ $t('contact_person_req') }}</label>
          <div class="flex items-center gap-[50px]">
            <el-radio v-model="who" :label="true">{{
              $t('choose_yourself')
            }}</el-radio>
            <el-radio v-model="who" :label="false">{{ $t('other') }}</el-radio>
          </div>
          <Input
            v-model="form.contact_person"
            :disabled="who"
            :placeholder="$t('enter_number_volunteer')"
            :error="$v.form?.contact_person.$error"
          />
          <label class="form__label">{{ $t('direction_req') }}</label>
          <el-checkbox-group
            v-model="form.direction"
            class="grid grid-cols-2 c:grid-cols-1 gap-[20px]"
            :class="{ _error: $v.form.direction.$error }"
          >
            <div v-for="(item, index) in directions" :key="index">
              <el-checkbox :label="item?.id">{{ item?.title }}</el-checkbox>
            </div>
          </el-checkbox-group>
          <h2 class="font-bold text-[#52230F] text-[24px] my-[16px]">
            {{ $t('requirements_volunteers') }}
          </h2>
          <Input
            v-model="form.requirement_text"
            :placeholder="$t('enter_requierment')"
            :label="$t('requierment_volunteer')"
            :maxlength="150"
            :error="$v.form.requirement_text.$error"
          />

          <!--          <Input-->
          <!--            v-model="form.requirements"-->
          <!--            :placeholder="$t('enter_knowledge')"-->
          <!--            :label="$t('requierment_vol_know')"-->
          <!--            select-title="title"-->
          <!--            :list="knowledge"-->
          <!--            :error="$v.form.requirements.$error"-->
          <!--            @typingValue="knowledgeTyping = $event"-->
          <!--          >-->
          <!--            <template #empty>-->
          <!--              <div class="empty-select">-->
          <!--                <h1>{{ $t('not_found') }}</h1>-->
          <!--                <h2>{{ $t('add_this_work') }}</h2>-->
          <!--                <button-->
          <!--                  type="button"-->
          <!--                  class="btn btn&#45;&#45;blue max-w-[300px]"-->
          <!--                  @click="addToList('requirements/create', knowledgeTyping)"-->
          <!--                >-->
          <!--                  {{ $t('add') }}-->
          <!--                </button>-->
          <!--              </div>-->
          <!--            </template>-->
          <!--          </Input>-->
          <label class="form__label">{{ $t('enter_knowledge') }}</label>
          <el-checkbox-group
            v-model="form.requirements"
            class="grid grid-cols-2 c:grid-cols-1 gap-[20px]"
            :class="{ _error: $v.form.requirements.$error }"
          >
            <div v-for="(item, index) in knowledge" :key="index">
              <el-checkbox :label="item?.id">{{ item?.title }}</el-checkbox>
            </div>
          </el-checkbox-group>
          <!--          <Input-->
          <!--            v-model="form.required_skills"-->
          <!--            :placeholder="$t('enter_skills')"-->
          <!--            :label="$t('skills_label')"-->
          <!--            select-title="title"-->
          <!--            :list="skills"-->
          <!--            :error="$v.form.required_skills.$error"-->
          <!--            @typingValue="skillsTyping = $event"-->
          <!--          >-->
          <!--            <template #empty>-->
          <!--              <div class="empty-select">-->
          <!--                <h1>{{ $t('not_found') }}</h1>-->
          <!--                <h2>{{ $t('add_this_skils') }}</h2>-->
          <!--                <button-->
          <!--                  type="button"-->
          <!--                  class="btn btn&#45;&#45;blue max-w-[300px]"-->
          <!--                  @click="addToList('required_skills/create', skillsTyping)"-->
          <!--                >-->
          <!--                  {{ $t('add') }}-->
          <!--                </button>-->
          <!--              </div>-->
          <!--            </template>-->
          <!--          </Input>-->
          <label class="form__label">{{ $t('enter_skills') }}</label>
          <el-checkbox-group
            v-model="form.required_skills"
            class="grid grid-cols-2 c:grid-cols-1 gap-[20px]"
            :class="{ _error: $v.form.required_skills.$error }"
          >
            <div v-for="(item, index) in skills" :key="index">
              <el-checkbox :label="item?.id">{{ item?.title }}</el-checkbox>
            </div>
          </el-checkbox-group>
          <label class="form__label">{{ $t('costs_covered') }}</label>
          <div class="flex items-center gap-[50px]">
            <el-radio v-model="form.volunteers_will_be_paid" :label="true">{{
              $t('yes')
            }}</el-radio>
            <el-radio v-model="form.volunteers_will_be_paid" :label="false">{{
              $t('no')
            }}</el-radio>
          </div>
          <button
            type="submit"
            class="btn btn--blue max-w-[50%] f:max-w-[100%] ml-auto mt-[24px]"
          >
            {{ $t('add') }}
          </button>
        </form>
      </div>
    </Preloader>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { mapState } from 'vuex'
import Input from '~/components/form/Input.vue'
import Upload from '~/components/form/Upload.vue'
export default {
  layout: 'pages',
  middleware: ['auth'],
  components: {
    Upload,
    Input,
  },
  async fetch() {
    await this.$getAction('/required_skills/')
      .then((response) => {
        this.skills = response.results
      })
      .catch(() => {})
    await this.$getAction('/requirements/')
      .then((response) => {
        this.knowledge = response.results
      })
      .catch(() => {})
    await this.$store.dispatch('fetchRegions', { limit: 10, offset: 0 })
    await this.$getAction('/directions/')
      .then((response) => {
        this.directions = response.results
      })
      .catch(() => {})
    if (this.$route.query.slug) {
      await this.$store
        .dispatch('events/fetchEventsSingle', this.$route.query.slug)
        .then((response) => {
          this.single = response.data.instance
          if (this.single) {
            this.form.image = this.single.image
            this.url = this.single.image
            this.form.title = this.single.title
            this.form.region = this.single.region?.name
            this.form.district = this.single.district?.id
            this.form.description2 = this.single.description2.replace(
              /<[^>]+>/g,
              ''
            )
            if (this.single.starting_date && this.single.finishing_date) {
              this.form.date = {
                start: this.single.starting_date,
                end: this.single.finishing_date,
              }
              // this.form.date.push(this.single.starting_date)
              // this.form.date.push(this.single.finishing_date)
            }
            if (this.single.starting_time && this.single.finishing_time) {
              this.form.time = []
              this.form.time.push(this.single.starting_time)
              this.form.time.push(this.single.finishing_time)
            }
            this.form.volunteers_needed = this.single.volunteers_needed
            if (
              this.single.organization.organization_name !==
              this.single?.contact_person
            ) {
              this.who = false
              this.form.contact_person = this.single?.contact_person
            }
            this.form.direction = this.single.direction.map((item) => item?.id)
            this.form.requirement_text = this.single.requirement_text
            this.form.requirements = this.single.requirements.map(
              (item) => item?.id
            )
            this.form.required_skills = this.single?.required_skills
            this.form.volunteers_will_be_paid = this.single.volunteers_will_be_paid
          }
        })
    }
  },
  data() {
    return {
      currencyMask: createNumberMask({
        prefix: '',
        includeThousandsSeparator: true,
        allowNegative: false,
        thousandsSeparatorSymbol: ' ',
      }),
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
      url: null,
      single: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        },
      },
      knowledgeTyping: '',
      skillsTyping: '',
      who: true,
      districts: [],
      directions: [],
      knowledge: [],
      skills: [],
      filteredRegions: [],
      filteredDistricts: [],
      form: {
        image: null,
        title: '',
        region: '',
        district: '',
        description2: '',
        date: '',
        time: '',
        volunteers_needed: '',
        contact_person: this.$auth.user.organization_name,
        organization: this.$auth?.user?.id,
        direction: [],
        requirement_text: '',
        requirements: [],
        required_skills: [],
        volunteers_will_be_paid: true,
      },
    }
  },
  validations: {
    form: {
      image: { required },
      title: { required, minLength: minLength(3) },
      region: { required },
      district: { required },
      description2: { required, minLength: minLength(3) },
      date: { required },
      time: { required },
      volunteers_needed: { required },
      contact_person: { required },
      direction: { required },
      requirement_text: { required, minLength: minLength(3) },
      requirements: { required },
      required_skills: { required },
      volunteers_will_be_paid: { required },
    },
  },
  computed: {
    ...mapState({
      regions: (state) => state.regions,
    }),
  },
  watch: {
    async 'form.region'(value) {
      if (value) {
        console.log(this.form.region?.id, value)
        await this.$store
          .dispatch(
            'fetchDistricts',
            typeof value !== 'number' ? this.single.region?.id : value
          )
          .then((response) => {
            this.districts = response.data
          })
      }
    },
    async knowledgeTyping(value) {
      await this.$getAction('/requirements/', {
        params: {
          search: value,
        },
      })
        .then((response) => {
          this.knowledge = response.results
        })
        .catch(() => {})
    },
    async skillsTyping(value) {
      await this.$getAction('/required_skills/', {
        params: {
          search: value,
        },
      })
        .then((response) => {
          this.skills = response
        })
        .catch(() => {})
    },
    who(value) {
      this.form.contact_person = value
        ? this.$auth.user.organization_name
        : this.single?.contact_person
    },
    regions: {
      handler() {
        this.filteredRegions = [
          ...this.filteredRegions,
          ...this.regions?.results,
        ]
      },
      deep: true,
    },
    districts: {
      handler() {
        this.filteredDistricts = this.districts?.results
      },
      deep: true,
    },
  },

  methods: {
    async loadMore($state) {
      if (this.filteredRegions?.length >= this.regions?.count) {
        $state.complete()
        return
      }
      try {
        const response = await this.$store.dispatch('fetchRegions', {
          limit: 10,
          offset: this.filteredRegions?.length,
        })
        const newData = response?.results || []
        this.filteredRegions = [...this.filteredRegions, ...newData]
        this.hasMoreData = newData?.length > 0
        $state.loaded()
      } catch (error) {
        console.error('Error fetching more languages:', error)
        $state.complete()
      }
    },
    async filterRegion(value) {
      await this.$getAction('/regions/', {
        params: {
          search: value,
        },
      })
        .then((response) => {
          this.filteredRegions = response?.results
        })
        .catch(() => {})
    },
    filterDistrict(value) {
      this.filteredDistricts = this.districts?.results.filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase())
      })
    },
    async checkForm() {
      this.$v.form.$touch()
      this.$validateForm(this.$v.form)
      if (!this.$v.form.$error) {
        const formData = new FormData()
        Object.keys(this.form).forEach((element, index) => {
          if (element === 'volunteers_needed') {
            const filteredCopy = this.form.volunteers_needed
            formData.append('volunteers_needed', filteredCopy.replace(/ /g, ''))
          } else if (element === 'date') {
            formData.append(
              'starting_date',
              this.$moment(this.form.date.start, 'YYYY-MM-DD')
            )
            formData.append(
              'finishing_date',
              this.$moment(this.form.date.end, 'YYYY-MM-DD')
            )
          } else if (element === 'time') {
            formData.append('starting_time', this.form?.time[0])
            formData.append('finishing_time', this.form?.time[1])
          } else if (
            element === 'image' &&
            typeof this.form.image === 'object'
          ) {
            formData.append('image', this.form.image)
          } else if (element === 'region') {
            formData.append(
              'region',
              typeof this.form.region !== 'number'
                ? this.single.region?.id
                : this.form.region
            )
          } else if (element === 'district') {
            formData.append(
              'district',
              this.districts?.results.find(
                (item) =>
                  item.name === this.form.district ||
                  item?.id === this.form.district
              )?.id
            )
          } else if (
            element !== 'date' &&
            element !== 'time' &&
            element !== 'image'
          ) {
            if (Array.isArray(this.form[element])) {
              this.form[element].forEach((item) => {
                formData.append(element, item)
              })
            } else {
              formData.append(element, this.form[element])
            }
          }
        })
        if (this.$route.query.slug) {
          await this.$updateAction(`/event/update/${this.$route.query.slug}/`, {
            data: formData,
          })
            .then(() => {
              this.$toast.success(this.$t('event_changed'))
              const localePrefix =
                this.$i18n.locale === 'uz' ? '' : `/${this.$i18n.locale}`
              this.$router.push(`${localePrefix}/profile/projects/`)
            })
            .catch(() => {
              this.$toast.error(this.$t('enter_empty_field'))
            })
        } else {
          await this.$postAction('/create-event/', { data: formData })
            .then(() => {
              this.$toast.success(this.$t('event_send'))
              const localePrefix =
                this.$i18n.locale === 'uz' ? '' : `/${this.$i18n.locale}`
              this.$router.push(`${localePrefix}/profile/projects/`)
            })
            .catch((error) => {
              this.$getErrorMessage(error)
            })
        }
      }
    },
    async addToList(postLink, value) {
      await this.$postAction(`/${postLink}/`, {
        data: { title: value },
      })
        .then((response) => {
          this.knowledge = response
          this.$fetch()
        })
        .catch(() => {})
    },
  },
}
</script>
<style lang="scss">
.el-popper {
  max-width: 900px;
}
.vd-picker__input input {
  color: #2c2d33 !important;
}
.vd-picker__table-day__effect {
  background: #ba3e09 !important;
}
.vd-picker__table-day__wrapper::after {
  background: #ba3e09 !important;
}
</style>
