<template>
  <div>
    <el-dropdown trigger="click" placement="bottom-end">
      <span class="el-dropdown-link">
        <span v-if="$i18n.locale === 'ru'">
          <icon-base name="flag-rus" />
          Русский
        </span>
        <span v-if="$i18n.locale === 'uz'">
          <icon-base name="flag-uz" />
          O‘zbekcha
        </span>
        <span v-if="$i18n.locale === 'en'">
          <icon-base name="flag-en" />
          English
        </span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="el-dropdown">
        <el-dropdown-item>
          <nuxt-link :to="switchLocalePath('ru')">
            <icon-base name="flag-rus" />
            Русский
          </nuxt-link>
        </el-dropdown-item>
        <el-dropdown-item>
          <nuxt-link :to="switchLocalePath('uz')">
            <icon-base name="flag-uz" />
            O‘zbekcha
          </nuxt-link>
        </el-dropdown-item>
        <el-dropdown-item>
          <nuxt-link :to="switchLocalePath('en')">
            <icon-base name="flag-en" />
            English
          </nuxt-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import IconBase from '../volontyor/IconBase.vue'

export default {
  components: {
    IconBase,
  },
}
</script>

<style lang="scss">
.el-dropdown-link {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  font-size: 12px;
  color: #fff !important;
  cursor: pointer;
  & > i {
    transform: translateY(-0.5px);
    transition: 0.2s ease;

    &.active {
      transform: rotate(180deg);
    }
  }

  span {
    display: flex;
    align-items: center;
    gap: 6px;
  }
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-menu {
  padding: 4px 0 !important;
  z-index: 9999 !important;
  .el-dropdown-menu__item {
    padding: 0 !important;
    a {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      font-size: 12px;
      line-height: 130%;
      color: #52230f;
      padding: 10px 28px 10px 12px !important;
    }
  }
}
.el-popper .popper__arrow,
.el-popper .popper__arrow::after {
  display: none !important;
}
.el-popper[x-placement^='bottom'] .popper__arrow {
  display: none;
}
.el-popper[x-placement^='bottom'] .popper__arrow::after {
  display: none;
}
.el-dropdown-menu__item {
  margin: 12px 0 !important;
}
</style>
