<template>
  <div>
    <el-upload
      :action="action"
      list-type="picture-card"
      :auto-upload="true"
      :headers="headers"
      >
    <i slot="default" class="el-icon-plus"></i>
    <div slot="file" slot-scope="{file}">
      <img
        class="el-upload-list__item-thumbnail"
        :src="file.url" alt=""
      >
      <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
  </div>
</template>

<script>
import { tokenHeaders } from '@/utils/auth'
export default {
  name: 'MutipleMediaUpload',
  props: {
    value: {
      type: [Array],
      default: () => []
    }
  },
  data () {
    return {
      action: process.env.VUE_APP_BASE_API + 'api/file/upload',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      headers: tokenHeaders()
    }
  },
  methods: {
    handleRemove (file) {
      console.log(file)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload (file) {
      console.log(file)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
