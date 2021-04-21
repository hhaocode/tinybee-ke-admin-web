<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="action"
      :show-file-list="false"
      :on-success="handlePicSuccess"
      :on-remove="handlePicRemove"
      :on-change="handlePicChange"
      :on-error="handlePicError"
      :data="data"
      :headers="headers"
      >
      <img v-if="value" :src="value" class="avatar" :style="{width: width, height: height}" />
        <i v-else class="el-icon-plus avatar-uploader-icon" :style="{width: width, height: height, lineHeight: height}"></i>
      </el-upload>
      <el-input v-if="editable" :value="value" @change="handleChange"></el-input>
  </div>
</template>

<script>
import { tokenHeaders } from '@/utils/auth'
export default {
  name: 'SingleImageUpload',
  data () {
    return {
      imageUrl: '',
      action: process.env.VUE_APP_BASE_API + 'api/oss/upload',
      headers: tokenHeaders()
    }
  },
  props: {
    value: {
      type: [Number, String]
    },
    data: {
      type: Object,
      default: () => {}
    },
    width: {
      default: '178px'
    },
    height: {
      default: '178px'
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleEmit () {

    },
    handleChange (e) {
      console.log(e)
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    handlePicRemove (file, fileList) {
      // this.$emit('change', this.single ? file : fileList)
    },
    handlePicSuccess (response, file, fileList) {
      // let res = null
      // if (this.single) {
      //   this.imageUrl = URL.createObjectURL(file.raw)
      //   res = file
      // } else {
      //   res = fileList
      // }
      // console.log(res)
      // this.$emit('change', res)
      this.imageUrl = response
      this.$emit('input', response)
    },
    handlePicChange (file, fileList) {
      // console.log(fileList)
    },
    handlePicError (err, file, fileList) {
      this.$error('文件上传失败')
      console.log('file upload err =>', err)
      // this.$emit('change', this.single ? file : fileList)
      this.$emit('input', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader{
  ::v-deep .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409EFF;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
