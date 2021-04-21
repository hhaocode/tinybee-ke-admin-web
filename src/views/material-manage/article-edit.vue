<template>
  <div class="page">
    <div class="page-panel">
      <div>
        <RemoveCurrentToTarget title="文章管理" :targetPage="{ name: 'article-manage' }" content="文章编辑"></RemoveCurrentToTarget>
      </div>
      <el-form :model="form" ref="form" :rules="formRules" @submit.native.prevent label-width="90px" label-suffix=":" >
        <div class="block-area">
          <div class="title">
            <span class="label"></span>
            <span>基本信息</span>
          </div>
          <div class="content">
            <el-form-item label="文章标题" prop="title">
              <el-input maxlength="50" :show-word-limit="true" v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="副标题" prop="subtitle">
              <el-input type="textarea" maxlength="100" :show-word-limit="true" v-model="form.subtitle"></el-input>
            </el-form-item>
            <el-form-item label="文章总结" prop="summary">
              <el-input type="textarea" maxlength="150" :show-word-limit="true" v-model="form.summary"></el-input>
            </el-form-item>
            <el-form-item label="文章封面" prop="coverUrl">
              <image-choose v-model="form.coverUrl"></image-choose>
            </el-form-item>
            <el-form-item label="文章内容" prop="content">
              <ckeditor v-model="form.content" :config="{}"></ckeditor>
            </el-form-item>
            <el-form-item label="试看内容" prop="freeContent">
              <ckeditor v-model="form.freeContent" :config="{}"></ckeditor>
            </el-form-item>
          </div>
          <div class="footer c">
            <el-button type="primary" @click="handleSave">保存</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import RemoveCurrentToTarget from '@/components/common/RemoveCurrentToTarget'
const initForm = { title: '', subtitle: '', summary: '', coverUrl: '', content: '', freeContent: '' }

export default {
  components: { RemoveCurrentToTarget },
  data () {
    return {
      dialogVisible: false,
      form: Object.assign({}, initForm),
      formRules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        subtitle: [{ required: true, message: '请输入副标题', trigger: 'blur' }],
        summary: [{ required: true, message: '请输入文章总结', trigger: 'blur' }],
        coverUrl: [{ required: true, message: '请上传封面', trigger: 'blur' }],
        content: [{ required: true, message: '请输入文章详情', trigger: 'blur' }]
      },
      editable: false
    }
  },
  mounted () {
    const { id } = this.$route.params
    this.handleInit(id)
  },
  methods: {
    backArticleManage () {
      this.$alert('无效的文章ID，返回【文章管理】', '提示').then(() => {
        this.$store.dispatch('app/removeVisit', this.$route).then(() => {
          this.$router.replace({ name: 'article-manage' })
        })
      })
    },
    handleInit (id) {
      if (id) {
        this.$get(`/material/article/${id}`).then(res => {
          if (res.code === 0 && res.data) {
            this.form = res.data
          } else {
            this.backArticleManage()
          }
        }).catch(e => {
          this.backArticleManage()
        })
      } else {
        this.form = Object.assign({}, initForm)
      }
    },
    handleSave () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$post('/material/article/save', this.form).then(res => {
            if (res.code === 0) {
              this.$notify.success('保存成功')
              this.form = res.data
            }
          })
        }
      })
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

</style>
