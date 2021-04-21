<template>
  <div class="page">
    <div class="page-panel">
      <div class="flex row space-between">
        <div>
          <el-button type="primary" @click="handleEdit(true, '')">添加图文</el-button>
        </div>
        <div>
          <el-form :inline="true" @submit.native.prevent>
            <el-form-item>
              <el-input placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button>搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="page-panel">
      <div></div>
      <div>
        <tiny-bee-table action="">
          <template>
            <el-table-column prop="title" label="名称"></el-table-column>
            <el-table-column prop="title" label="关联课程"></el-table-column>
            <el-table-column prop="title" label="操作" width="180">
              <template>
                <div>
                  <el-link type="primary" :unline="false">详情</el-link>
                  <el-link type="primary" :unline="false">编辑</el-link>
                  <!-- 更多 -->
                </div>
              </template>
            </el-table-column>
          </template>
        </tiny-bee-table>
      </div>
    </div>
    <el-dialog  title="编辑" :visible.sync="dialogVisible" width="1000px" :close-on-click-modal="false">
      <div>
        <el-form :model="form" :rules="formRules" @submit.native.prevent label-width="90px" label-suffix=":" >
          <div class="block-area">
            <div class="title">
              <span class="label"></span>
              <span>基本信息</span>
            </div>
            <div class="content">
              <el-form-item label="图文名称" prop="title">
                <el-input maxlength="50" :show-word-limit="true" v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="图文封面" prop="imgUrl">
                <single-image-upload v-model="form.imageUrl"></single-image-upload>
                <el-button @click="openOssChooseDialog">选择图片</el-button>
              </el-form-item>
              <el-form-item label="图文详情" prop="content">
                <ckeditor v-model="form.content" :config="{}"></ckeditor>
              </el-form-item>
              <el-form-item label="试看内容" prop="freeContent">
                <ckeditor v-model="form.freeContent" :config="{}"></ckeditor>
              </el-form-item>
              <el-form-item label="文字防复制">
              </el-form-item>
            </div>
          </div>
          <div class="block-area">
            <div class="title">
              <span class="label"></span>
              <span>模式</span>
            </div>
            <div class="content"></div>
          </div>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="handleSave">保存</el-button><el-button @click="dialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const initForm = { title: '', content: '', freeContent: '' }
export default {
  data () {
    return {
      dialogVisible: false,
      form: Object.assign({}, initForm),
      formRules: {
        title: [{ required: true, message: '请输入图文名称', trigger: blur }],
        imgUrl: [{ required: true, message: '请上传图片', trigger: blur }],
        content: [{ required: true, message: '请输入图文详情', trigger: blur }]
      },
      editable: false
    }
  },
  methods: {
    handleSave () {
      console.log(this.form)
    },
    handleEdit (editable, data) {
      if (data) {
        //
        this.form = Object.assign({}, data)
      } else {
        this.form = Object.assign({}, initForm)
      }
      this.editable = editable
      this.dialogVisible = true
    },
    openOssChooseDialog () {
      this.$ossChooseDialog({
        title: '选择图片'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  text-align: left;
}
</style>
