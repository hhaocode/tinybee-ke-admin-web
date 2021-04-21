<template>
  <div class="page">
    <div class="page-panel">
      <div>
        <el-alert :title="saveMessage" type="info" :closable="false"></el-alert>
      </div>
      <div>
        <el-form ref="form" :model="form" :rules="formRules" @submit.native.prevent label-position="left" label-width="70px">
          <block-area title="基本信息">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input type="textarea" v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="图标" prop="icon">
              <image-choose v-model="form.icon"></image-choose>
            </el-form-item>
            <el-form-item label="封面" prop="coverUrl">
              <image-choose v-model="form.coverUrl"></image-choose>
            </el-form-item>
            <el-form-item label="总时长">
              <span></span>
            </el-form-item>
            <el-form-item label="序号" prop="sort">
              <el-input v-model.number="form.sort"></el-input>
            </el-form-item>
          </block-area>

          <block-area title="阶段信息">
            <div style="padding-bottom: 18px;"><el-button @click="handleAddPathStage('')">添加阶段</el-button></div>
            <div>
              <el-table :data="form.stages">
                <el-table-column type="expand">
                  <template slot-scope="{row}">
                    <el-table :data="row.courses">
                      <el-table-column label="标题" prop="title"></el-table-column>
                      <el-table-column label="类型" prop="type"></el-table-column>
                      <el-table-column label="操作">
                        <template slot-scope="courseProp">
                          <el-button @click="() => { courseProp.row.splice(courseProp.$index, 1) }">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-table-column>
                <el-table-column label="名称" prop="name"></el-table-column>
                <el-table-column label="描述" prop="description"></el-table-column>
                <el-table-column label="顺序" prop="sort"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="{$index, row}">
                    <span>
                      <el-button @click="() => form.stages.splice($index, 1)">删除</el-button>
                      <el-button @click="handleAddCourse(row)">添加课程</el-button>
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </block-area>

          <!-- <block-area title="课程信息"></block-area> -->
          <div>
            <el-button type="primary" @click="handleSave">保存</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <el-dialog title="编辑路径阶段" :close-on-click-modal="false" :visible.sync="stageDialogVisible">
      <div>
        <el-form :model="stageForm" :rules="stageFormRules" ref="stageForm" @submit.native.prevent>
          <el-form-item label="名称" prop="name">
            <el-input v-model="stageForm.name"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" v-model="stageForm.description"></el-input>
          </el-form-item>
          <el-form-item label="顺序" prop="sort">
            <el-input-number :min="0" v-model="stageForm.sort"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="stageDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSavePathStage">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const initForm = { id: '', title: '', description: '', icon: '', coverUrl: '', totalHour: 0, sort: 1, stages: [] }
const initStageForm = { id: '', name: '', pathId: '', description: '', sort: 1, courseIds: [], courses: [] }
export default {
  data () {
    return {
      form: Object.assign(initForm),
      formRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        icon: [{ required: true, message: '请选择图标' }],
        coverUrl: [{ required: true, message: '请选择封面', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入序号', trigger: 'blur' }]
      },
      saveMessage: '',
      stageForm: Object.assign({}, initStageForm),
      stageDialogVisible: false,
      stageFormRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入序号', trigger: 'blur' }, { type: 'number', min: 0, message: '序号最小为0' }]
      }
    }
  },
  mounted () {
    const { pathId } = this.$route.query
    if (pathId) {
      // 读取
      // this.form =
      this.$get(`/cms/learning-path/getDetailById/${pathId}`).then(res => {
        if (res.code === 0) {
          this.form = res.data
          this.saveMessage = '已保存'
        } else {
          this.saveMessage = ''
        }
      })
    } else {
      this.saveMessage = '待编辑'
    }
  },
  methods: {
    handleSave () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$post('/cms/learning-path/save', this.form).then(res => {
            if (res.code === 0) {
              this.$notify.success('保存成功')
              this.form = res.data
              this.saveMessage = '保存成功'
            } else {
              this.$notify.error(res.message)
              this.saveMessage = res.message
            }
          })
        }
      })
    },
    handleAddPathStage (row) {
      if (row) {
        this.stageForm = row
      } else {
        this.stageForm = Object.assign({}, initStageForm)
      }
      this.stageDialogVisible = true
    },
    handleSavePathStage () {
      this.$refs.stageForm.validate(valid => {
        if (valid) {
          if (this.form.stages) {
            this.form.stages.push(this.stageForm)
          } else {
            this.form.stages = [this.stageForm]
          }
          this.stageDialogVisible = false
        }
      })
    },
    handleAddCourse (stage) {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
