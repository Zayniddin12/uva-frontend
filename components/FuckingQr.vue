<template>
  <div class="flex items-center justify-center">
    <div ref="qrCodeContainer" class="flex items-center justify-center" />
  </div>
</template>
<script>
import QRCodeStyling from 'qr-code-styling'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      qrCodeContainer: null,
    }
  },
  computed: {
    ...mapState({
      image: (state) => state.image,
    }),
  },
  mounted() {
    this.qrCodeContainer = this.$refs.qrCodeContainer

    const qrCodeStyling = new QRCodeStyling({
      name: 'QR Code',
      data: window?.location?.href,
      image: this.image,
      width: 164,
      height: 164,
      margin: 0,
      dotsOptions: { color: '#2C2D33', type: 'classy-rounded' },
      cornersSquareOptions: { color: '#90A1B5', type: 'extra-rounded' },
      cornersDotOptions: { color: '#90A1B5', type: 'dot' },
      imageOptions: { margin: -1 },
      style: { borderRadius: '22px', background: '#ffffff' },
      // image: this.props.image === null ? undefined : this.props.image,
    })
    qrCodeStyling.append(this.qrCodeContainer)
  },
}
</script>
