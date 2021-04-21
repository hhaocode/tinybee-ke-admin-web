<template>
  <div>
    <div>
      <div class="">
        <input ref="file" type="file" name="" id="" @change="handleFileChange">
        <a href="javascript:;"></a>
      </div>
      <div>
        <el-button icon="el-icon-delete"></el-button>
        <el-button icon="el-icon-upload" @click="handleUpload"></el-button>
      </div>
    </div>
    <div v-if="videoUrls">
      <video :src="item"
      preload="preload"
      controls="controls"
      width="400"
      v-for="(item, index) in videoUrls"
      :key="index"></video>
    </div>
    <!-- <video src="http://127.0.0.1:7100/api/file/m3u8" type="application/x-mpegURL" height="300" width="400"  preload="auto" autoplay="autoplay" loop="loop" webkit-playsinline="true"></video> -->

  </div>
</template>

<script>
import http from '@/utils/http'
export default {
  name: 'ArcusUploadVod',
  props: {
    value: {
      type: [Number, String, Array],
      default: ''
    }
  },
  methods: {
    handleFileChange (e) {
      console.log(e)
      console.log(this.$refs.file)
      const files = this.$refs.file.files
      const fileUrls = []
      for (const file of files) {
        fileUrls.push(URL.createObjectURL(file))
      }
      this.videoUrls = fileUrls
    },
    emitInput (value) {
      this.$emit('input', value)
    },
    handleUpload () {
      const files = this.$refs.file.files
      const data = new FormData()
      data.append('file', files[0])
      data.append('module', 1)
      http.post('/cms/media/upload', data).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.$notify.success('上传成功')
          this.emitInput(res.data)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    handleGet () {
      http.get('/file/m3u8').then(res => {
        this.src = URL.createObjectURL(res)
      }).catch(e => {
        console.log(e)
      })
    }
  },
  data () {
    return {
      videoUrl: '',
      videoUrls: [],
      src: ''
    }
  },
  watch: {
    value (val) {
      if (val) {
        // 获取地址
      } else {
        this.videoUrls = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
