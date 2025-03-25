<template>
  <div class="form__group">
    <div v-if="label" class="flex items-center justify-between gap-[10px]">
      <label class="form__label" :for="id">{{ label }}</label>
      <slot name="extra"></slot>
    </div>
    <div class="relative w-full">
      <div
        v-if="right !== undefined || rightBottom !== undefined"
        :class="`form__addright ${
          right !== undefined
            ? '!top-[50%] translate-y-[-50%]'
            : rightBottom !== undefined
            ? '!top-[-30px]'
            : ''
        }`"
      >
        <icon-base
          v-if="password !== undefined"
          name="eye"
          class="input-password"
          :class="{ _active: passwordHide }"
          @click.native="passwordHide = !passwordHide"
        />
        <slot v-else name="right"> </slot>
      </div>
      <div v-if="left !== undefined" class="form__addleft">
        <slot name="left"></slot>
      </div>
      <textarea
        v-if="textarea !== undefined"
        :id="id"
        :value="value"
        type="text"
        :disabled="disabled"
        class="form__txt"
        :class="[classInput, { _error: error }]"
        :maxlength="maxlength"
        :placeholder="placeholder"
        oninput='style.height = ""; style.height = scrollHeight + 2 + "px"'
        @input="updateValue($event.target.value.trim())"
      />
      <template v-else-if="select !== undefined">
        <el-select
          remote
          :remote-method="updateTypingValue"
          :filterable="filter"
          :multiple="multy !== undefined"
          :class="[
            classInput,
            { _error: error },
            { _multy: multy !== undefined },
          ]"
          :disabled="disabled"
          :value="value"
          :placeholder="placeholder"
          @change="updateValue($event)"
        >
          <el-option
            v-for="item in list"
            id="observerTarget"
            :key="item[selectValue]"
            :label="item[selectTitle]"
            :value="item[selectValue]"
          >
          </el-option>
          <template #empty>
            <slot name="empty"></slot>
          </template>
          <div v-if="!noInfinite">
            <infinite-loading @infinite="infiniteHandler"
              ><span slot="no-more"> {{ $t('no_more_data') }} </span>
            </infinite-loading>
          </div>
        </el-select>
      </template>
      <template v-else-if="mask !== undefined">
        <input
          :id="id"
          v-mask="mask"
          :value="value"
          :type="password !== undefined && passwordHide ? 'password' : 'text'"
          class="form__inp"
          :disabled="disabled"
          :class="[classInput, { _error: error }]"
          :style="
            left !== undefined
              ? `padding-left: ${paddintInputLeft + 10}px`
              : `padding-right: ${paddintInputRight + 10}px`
          "
          :maxlength="maxlength"
          :placeholder="placeholder"
          @input="updateValue($event.target.value.trim())"
        />
      </template>
      <template v-else>
        <input
          :id="id"
          :value="value"
          :type="password !== undefined && passwordHide ? 'password' : 'text'"
          class="form__inp"
          :disabled="disabled"
          :class="[classInput, { _error: error }]"
          :style="
            left !== undefined
              ? `padding-left: ${paddintInputLeft + 10}px`
              : `padding-right: ${paddintInputRight + 10}px`
          "
          :maxlength="maxlength"
          :placeholder="placeholder"
          @input="updateValue($event.target.value.trim())"
        />
      </template>
    </div>
  </div>
</template>

<script>
import infiniteLoading from 'vue-infinite-loading'
import IconBase from '../volontyor/IconBase.vue'
export default {
  components: {
    IconBase,
    infiniteLoading,
  },
  props: {
    noInfinite: { default: false, type: Boolean },
    disabled: { default: false, type: Boolean },
    value: { default: '', type: [String, Number, Array] },
    label: { default: '', type: String },
    id: { type: [String, Number], default: '' },
    classInput: { default: '', type: String },
    classLabel: { default: '', type: String },
    maxlength: { type: [String, Number], default: '' },
    placeholder: { default: '', type: String },
    left: undefined,
    right: undefined,
    password: undefined,
    rightBottom: undefined,
    textarea: undefined,
    select: undefined,
    selectValue: { type: String, default: 'id' },
    selectTitle: { type: String, default: 'name' },
    multy: undefined,
    filter: undefined,
    error: { type: Boolean, default: false },
    mask: { type: [String, Function], default: undefined },
    list: {
      type: [Array, Object],
      default: () => [
        { name: 'Option1', id: 1 },
        { name: 'Option2', id: 2 },
      ],
    },
  },
  data() {
    return {
      passwordHide: true,
      paddintInputRight: '',
      paddintInputLeft: '',
    }
  },
  mounted() {
    this.paddintInputRight = document?.querySelector(
      '.form__addright'
    )?.clientWidth
    this.paddintInputLeft = document?.querySelector(
      '.form__addleft'
    )?.clientWidth
  },
  methods: {
    infiniteHandler($state) {
      this.$emit('load', $state)
      // $state.complete()
    },
    updateValue(value) {
      this.$emit('input', value)
    },
    updateTypingValue(value) {
      this.$emit('typingValue', value)
    },
  },
}
</script>

<style lang="scss" scoped>
.input-password {
  cursor: pointer;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 0%;
    height: 1.5px;
    transform: rotate(45deg) translateY(-50%);
    background: #25385b;
    // transition: width 0.3s;
  }
  &._active {
    &::before {
      width: 100%;
      // transition: width 0.3s;
    }
  }
}
</style>
