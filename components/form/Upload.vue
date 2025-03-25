<template>
  <div class="">
    <div class="upload" :class="{ _active: foto }">
      <img :src="src || foto" />
      <button
        v-show="src"
        type="button"
        class="_delete"
        @click="deletePhoto"
      ></button>
      <input type="file" accept="image/*" @input="upload" />
    </div>
    <!-- <span @click="upload" class="text-[#DB490B] block text-[16px] font-semibold ml-[65px] mt-[12px] mb-[16px] cursor-pointer">{{ $t('choose') }}</span> -->
  </div>
</template>

<script>
export default {
  props: {
    foto: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      file: null,
      src: this.value,
    }
  },
  methods: {
    deletePhoto() {
      this.src = null
      document.querySelector('.upload').classList.remove('_active')
    },
    upload() {
      const upload = document.querySelector('.upload')
      // eslint-disable-next-line
      let deleteBtn, file
      upload.children.forEach((el) => {
        if (el.localName === 'button' && el.classList.contains('_delete')) {
          // eslint-disable-next-line
          deleteBtn = el
        }
        if (el.localName === 'input' && el.type === 'file') {
          file = el
        }
      })
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.src = e.target.result
          upload.classList.add('_active')
          // if (deleteBtn) {
          //   deleteBtn.addEventListener("click", () => {
          //     this.src = null;
          //     upload.classList.remove("_active");
          //   });
          // }
        }
        if (file.files[0]) {
          this.file = file.files[0]
          reader.readAsDataURL(file.files[0])
          this.$emit('input', this.file)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.upload {
  width: 200px;
  min-height: 200px;
  height: auto;
  position: relative;
  cursor: pointer;
  background: url('/img/upload.png') 0 0 no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  // overflow: hidden;
  // margin-left: auto;
  // margin-right: auto;
  &._active {
    background: none;
    min-height: auto;
    transition: all 0.2s;

    &:hover {
      // button {
      //   top: 0;
      //   opacity: 1;
      //   visibility: visible;
      //   transition: all 0.2s;
      // }

      transition: all 0.2s;
    }
  }

  input[type='file'] {
    border-radius: 4px;
    cursor: pointer;
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: auto;
    cursor: pointer;
    overflow: hidden;
    border-radius: 12px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // border-radius: 4px;
    background: rgba(82, 87, 99, 0.5);
    background-position: center;
    opacity: 0;
    visibility: hidden;
    cursor: pointer;
    border-radius: 12px;
    transition: all 0.2s;
  }

  button._delete {
    content: '';
    position: absolute;
    z-index: 2;
    top: -10px;
    right: -10px;
    width: 36px;
    height: 36px;
    border-radius: 4px;
    background-image: url('/icons/delete.svg');
    background-position: center;
    // opacity: 0;
    // visibility: hidden;
    cursor: pointer;
    transition: all 0.2s;
  }

  transition: all 0.2s;

  &:hover {
    &::before {
      opacity: 1;
      visibility: visible;
      transition: all 0.2s;
    }

    transition: all 0.2s;
  }
}
</style>
