<template>
  <div class="">
    <div class="image-choose-wrapper">
      <div class="image-thumb">
        <el-image v-if="value" style="width: 200px; height: 120px" :src="value" :preview-src-list="[value]"></el-image>
      </div>
      <div>
        <el-button size="mini" @click="handleChooseImage">选择图片</el-button>
        <div style="padding-top: 40px;">
          <el-link size="mini" type="info" @click="handleCopyUrl" :underline="false">复制链接</el-link>
        </div>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageChoose',
  props: {
    value: {
    }
  },
  methods: {
    handleChooseImage () {
      this.$ossChooseDialog({
        title: '选择图片',
        type: 1,
        confirm: (val) => {
          if (val) {
            this.$emit('input', val.url)
            this.$emit('change', val.url)
          }
        }
      })
    },
    handleCopyUrl () {
      const _this = this
      this.$copyText(this.value).then(function (e) {
        _this.$message.success('链接复制成功')
      }, function (e) {
        _this.$message.error('链接复制失败')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.image-choose-wrapper {
  display: flex;
  .image-thumb {
    width: 200px;
    height: 120px;
    border: 1px dashed #e8e8e8;
    margin-right: 10px;
  }
}
</style>
