<template>
  <div ref="editor">
  </div>
</template>

<script>
import E from 'wangeditor'
// import { getToken } from '@/util/permission'
// const filePathPrefix = process.env.VUE_APP_BASE_API + '/api/file/get/'
export default {
  name: 'WangEditor',
  props: {
    value: {
      type: [String, Number],
      default: () => ''
    }
  },
  data () {
    return {
      editor: ''
    }
  },
  mounted () {
    // const _this = this
    const editor = new E(this.$refs.editor)
    editor.customConfig.uploadImgShowBase64 = true
    // editor.customConfig.uploadImgServer = process.env.VUE_APP_BASE_API + '/api/file/upload'
    // 将图片大小限制为 10M
    editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024
    // editor.customConfig.uploadImgParams = {
    //   typeId: this.type
    // }
    // editor.customConfig.uploadImgHeaders = {
    //   // 'sys-token': getToken()
    // }

    editor.customConfig.uploadFileName = 'file'
    // editor.customConfig.uploadImgHooks = {
    //   before: function (xhr, editor, files) {
    //     // 图片上传之前触发
    //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

    //     // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
    //     // return {
    //     //     prevent: true,
    //     //     msg: '放弃上传'
    //     // }
    //   },
    //   success: function (xhr, editor, result) {
    //     // 图片上传并返回结果，图片插入成功之后触发
    //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
    //     console.log(result)
    //   },
    //   fail: function (xhr, editor, result) {
    //     // 图片上传并返回结果，但图片插入错误时触发
    //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
    //   },
    //   error: function (xhr, editor) {
    //     // 图片上传出错时触发
    //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
    //     // console.log(arguments)
    //   },
    //   timeout: function (xhr, editor) {
    //     // 图片上传超时时触发
    //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
    //   },

    //   // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
    //   // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
    //   customInsert: function (insertImg, result, editor) {
    //     // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
    //     // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

    //     // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
    //     // var url = filePathPrefix + result.id
    //     // insertImg(url)

    //     // result 必须是一个 JSON 格式字符串！！！否则报错
    //   }
    // }
    // // editor.customConfig.customAlert = function (info) {
    // // // info 是需要提示的内容
    // //   console.log(arguments)
    // //   _this.$notify.error('文件上传失败')
    // // }
    // // editor.customConfig.uploadImgTimeout = 10 * 60 * 1000
    // // editor.customConfig.zIndex = 100
    // // editor.customConfig.onchange = html => {
    // //   this.$emit('input', html)
    // }
    editor.create()
    this.editor = editor
  },
  watch: {
    value: function () {
      this.editor.txt.html(this.value || '')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
