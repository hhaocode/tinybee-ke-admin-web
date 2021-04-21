<template>
  <div>
    <input type="file" name="file" ref="file" @change="handleChange">
    <video :src="file"
      preload="preload"
      controls="controls"
      width="400"></video>
  </div>
</template>

<script>
import http from '@/utils/http'
export default {
  name: 'VideoUpload',
  data () {
    return {
      file: ''
    }
  },
  methods: {
    handleChange (e) {
      const fileDom = e.target
      this.file = URL.createObjectURL(fileDom.files[0])

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
