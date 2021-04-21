<template>
  <div class="page">
    <div class="page-panel">
      <el-button @click="preview = !preview">{{previewInfo.text}}</el-button>
    </div>
    <div class="page-panel">
      <el-row :gutter="20">
        <el-col :lg="previewInfo.left">
          <script id="editor" type="text/plain" style="width: 100%;height:500px;"></script>
        </el-col>
        <el-col :lg="previewInfo.right">
          <div v-html="html"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

// https://ui.toast.com/tui-editor

<script>
export default {
  data () {
    return {
      editor: null,
      preview: false,
      html: ''
    }
  },
  computed: {
    previewInfo () {
      if (this.preview) {
        return {
          left: 12,
          right: 12,
          text: '关闭预览'
        }
      } else {
        return {
          left: 24,
          right: 0,
          text: '打开预览'
        }
      }
    }
  },
  mounted () {
    this.handleInitEditor()
  },
  methods: {
    handleInitEditor () {
      var editor = window.UE.getEditor('editor')
      this.editor = editor
      const that = this
      editor.addListener('contentChange', function () {
        that.html = editor.getContent()
      })
    }
  }
}
</script>

<style>

</style>
