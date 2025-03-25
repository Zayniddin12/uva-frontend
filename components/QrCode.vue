<template>
  <div class="hello">
    <h1>QR code styling for Nuxt</h1>
    <div id="qr-code" ref="qrCode"></div>
    <label>
      <input v-model="options.data" placeholder="Add data" />
      <select v-model="extension">
        <option value="svg">SVG</option>
        <option value="png">PNG</option>
        <option value="jpeg">JPEG</option>
        <option value="webp">WEBP</option>
      </select>
      <button @click="download">Download</button>
    </label>
  </div>
</template>

<script>
import QRCodeStyling, {
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
  CornerDotType,
  Extension,
} from 'qr-code-styling';

export default {
  mounted() {
    this.qrCode.append(this.$refs['qrCode']);
  },
  watch: {
    ['options.data']() {
      this.qrCode.update(this.options);
    },
  },
  methods: {
    download() {
      this.qrCode.download({ extension: this.extension });
    },
  },
  data() {
    return {
      options: {
        width: 300,
        height: 300,
        type: 'svg' as DrawType,
        data: 'http://qr-code-styling.com',
        // ... (other options)
      },
      extension: 'svg',
      qrCode: new QRCodeStyling({ /* ... (your existing options) */ }),
    };
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
