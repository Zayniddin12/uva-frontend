<template>
  <div class="container !my-[32px]">
    <div class="p-[24px] profile">
      <form class="flex flex-col gap-[24px]" @submit.prevent="checkForm">
        <h1 class="font-bold text-[#2C2D33] text-[32px]">
          {{ $t('add_functional') }}
        </h1>
        <h2 class="font-bold text-[#52230F] text-[24px] mt-[16px] mb-[8px]">
          {{ $t('about_the_event') }}
        </h2>
        <Upload v-model="form.image" />
        <Input
          v-model="form.title"
          :placeholder="$t('enter_title')"
          :label="$t('event_title')"
          :error="$v.form.title.$error"
        />
        <div class="grid grid-cols-2 c:grid-cols-1 gap-[12px]">
          <Input
            v-model="form.region"
            :placeholder="$t('enter_region')"
            :label="$t('region_req')"
            :select="true"
            :filter="true"
            :list="filteredRegions"
            :error="$v.form.region.$error"
            @typingValue="filterRegion($event)"
          />
          <Input
            v-model="form.district"
            :placeholder="$t('select_city')"
            :label="$t('city_req')"
            :filter="true"
            :select="true"
            :disabled="!form.region"
            :list="filteredDistricts"
            :error="$v.form.district.$error"
            @typingValue="filterDistrict($event)"
          />
        </div>
        <Input
          v-model="form.description"
          :placeholder="$t('about_project')"
          :label="$t('short_descr')"
          :textarea="true"
          :error="$v.form.description.$error"
        />
        <div class="grid grid-cols-2 c:grid-cols-1 gap-[12px]">
          <div class="grid grid-cols-2 c:grid-cols-1 gap-[12px]">
            <div class="flex flex-col gap-[8px]">
              <label class="form__label">{{ $t('date_req') }}</label>
              <el-date-picker
                v-model="form.date"
                type="daterange"
                range-separator="-"
                :start-placeholder="$t('start_cal')"
                :end-placeholder="$t('end_cal')"
                :class="{ _error: $v.form.date.$error }"
              >
              </el-date-picker>
            </div>
            <div class="flex flex-col gap-[8px]">
              <label class="form__label">{{ $t('time_req') }}</label>
              <el-time-picker
                v-model="form.time"
                is-range
                range-separator="-"
                start-placeholder="00:00"
                end-placeholder="00:00"
                :class="{ _error: $v.form.time.$error }"
              >
              </el-time-picker>
            </div>
          </div>
          <Input
            v-model="form.volunteers_needed"
            :placeholder="$t('number_volunteers')"
            :label="$t('number_volunteers_req')"
            :mask="`#`.repeat(10)"
            :error="$v.form.volunteers_needed.$error"
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
          :error="$v.form.contact_person.$error"
        />
        <label class="form__label">{{ $t('direction_req') }}</label>
        <el-checkbox-group
          v-model="form.direction"
          class="grid grid-cols-2 c:grid-cols-1 gap-[20px]"
          :class="{ _error: $v.form.direction.$error }"
        >
          <div v-for="(item, index) in directions.results" :key="index">
            <el-checkbox :label="item.id"> </el-checkbox>
          </div>
        </el-checkbox-group>
        <h2 class="font-bold text-[#52230F] text-[24px] my-[16px]">
          Требования к волонтёрам*
        </h2>
        <Input
          v-model="form.requirement_text"
          :placeholder="$t('enter_requierment')"
          :label="$t('requierment_volunteer')"
          :error="$v.form.requirement_text.$error"
        />
        <Input
          v-model="form.requirements"
          :placeholder="$t('enter_knowledge')"
          :label="$t('requierment_vol_know')"
          select
          select-title="title"
          multy
          filter
          :list="knowledge?.results"
          :error="$v.form.requirements.$error"
        >
          <template #empty>
            <div class="empty-select">
              <h1>{{ $t('not_found') }}</h1>
              <h2>{{ $t('add_this_work') }}</h2>
              <button
                type="button"
                class="btn btn--blue max-w-[300px]"
                @click="addToList('requirements/create', '')"
              >
                {{ $t('add') }}
              </button>
            </div>
          </template>
        </Input>
        <Input
          v-model="form.required_skills"
          :placeholder="$t('enter_skills')"
          :label="$t('enter_knowledge')"
          select
          select-title="title"
          multy
          filter
          :list="skills?.results"
          :error="$v.form.required_skills.$error"
        >
          <template #empty>
            <div class="empty-select">
              <h1>{{ $t('not_found') }}</h1>
              <h2>{{ $t('add_this_skils') }}</h2>
              <button
                type="button"
                class="btn btn--blue max-w-[300px]"
                @click="addToList('required_skills/create', '')"
              >
                {{ $t('add') }}
              </button>
            </div>
          </template>
        </Input>
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
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import Input from '~/components/form/Input.vue'
import Upload from '~/components/form/Upload.vue'

const customCheckDate = (value) => new Date(value[0]) < new Date(value[1])

export default {
  components: {
    Upload,
    Input,
  },
  async fetch() {
    await this.$getAction('/required_skills/')
      .then((response) => {
        this.skills = response
      })
      .catch(() => {})
    await this.$getAction('/requirements/')
      .then((response) => {
        this.knowledge = response
      })
      .catch(() => {})
    await this.$store
      .dispatch('fetchRegions')
      .then((response) => {
        this.regions = response.data
      })
      .catch(() => {})
    await this.$getAction('/directions/')
      .then((response) => {
        this.directions = response
      })
      .catch(() => {})
  },
  data() {
    return {
      who: true,
      regions: [],
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
        description: '',
        date: '',
        time: '',
        volunteers_needed: '',
        contact_person: this.$auth.user.organization_name,
        organization: this.$auth.user.id,
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
      description: { required, minLength: minLength(3) },
      date: { required, customCheckDate },
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
  watch: {
    async 'form.region'(value) {
      await this.$store.dispatch('fetchDistricts', value).then((response) => {
        this.districts = response.data
      })
    },
    regions: {
      handler() {
        this.filteredRegions = this.regions
      },
      deep: true,
    },
    districts: {
      handler() {
        this.filteredDistricts = this.districts
      },
      deep: true,
    },
  },
  methods: {
    filterRegion(value) {
      this.filteredRegions = this.regions.filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase())
      })
    },
    filterDistrict(value) {
      this.filteredDistricts = this.districts.filter((item) => {
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
            formData.append(
              'volunteers_needed',
              filteredCopy.replace('/ /g', '')
            )
          } else if (
            (Array.isArray(this.form[element]) &&
              element !== 'date' &&
              element !== 'time') ||
            (element !== 'date' &&
              element !== 'time' &&
              element !== 'volunteers_needed')
          ) {
            this.form[element].forEach((item) => {
              formData.append(element, item)
            })
          } else if (element === 'date') {
            formData.append(
              'starting_date',
              this.$moment(this.form.date[0], 'MM-DD-YYYY')
            )
            formData.append(
              'finishing_date',
              this.$moment(this.form.date[1], 'MM-DD-YYYY')
            )
          } else if (element === 'time') {
            formData.append(
              'starting_time',
              this.$moment(this.form.time[0], 'hh:mm')
            )
            formData.append(
              'finishing_time',
              this.$moment(this.form.time[1], 'hh:mm')
            )
          } else if (element === 'volunteers_needed') {
            formData.append(
              'volunteers_needed',
              this.form.volunteers_needed.replace('/ /g', '')
            )
          } else {
            formData.append(element, this.form[element])
          }
        })
        await this.$postAction('/create-event/', { data: formData })
          .then(() => {
            this.$toast.success(this.$t('event_send'))
            this.$router.push(this.$i18n.localePath('/profile/projects/'))
          })
          .catch(() => {
            this.$toast.error('error')
          })
      }
    },
    async addToList(postLink, value) {
      await this.$postAction(`/${postLink}/`, {
        data: { title: value },
      })
        .then((response) => {})
        .catch(() => {})
    },
  },
}
</script>
