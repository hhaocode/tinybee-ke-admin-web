<template>
  <div class="page">
    <div class="page-panel">
        <el-button @click="handleNew(1, '')">添加方向</el-button>
    </div>
    <div class="page-panel content-panel">
      <!-- <div class="flex row">
        <div class="direction-wrapper">
          <div class="wrapper-header">
            <el-tag style="margin-right:20px;">方向</el-tag><el-button @click="handleEdit(1, '')" size="mini">添加方向</el-button>
          </div>
          <div v-if="directions"></div>
        </div>
        <div class="classify-wrapper">
          <div class="wrapper-header">
            <el-tag>分类</el-tag>
          </div>
        </div>
        <div class="content-wrapper">
          <div class="wrapper-header">
            <el-tag>编辑区域</el-tag>
          </div>
        </div>
      </div> -->
      <div style="padding: 20px 10px;">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8">
            <div style="padding-top: 30px;">
              <el-tabs tab-position="left"  style="height: 200px;" v-model="current">
                <el-tab-pane v-for="(direction, index) in directionTree" :label="direction.label" :name="direction.id + ''" :key="index">
                  <span @click="handleChooseClassify(direction)" slot="label" class="flex row a-center j-end" @contextmenu.prevent="onDirectionContextmenu($event, direction)">
                    <el-image style="width: 16px; height: 16px" :src="direction.data.imgUrl" fit="fill"></el-image><span>{{direction.label}}</span>
                  </span>
                  <div>
                    <div>
                      <a :class="{active: currentClassify.id === classify.id }" @click="handleChooseClassify(classify)" href="javascript:void(0);" class="classify-item" v-for="classify in direction.children" :key="classify.id">
                        <span>{{classify.label}}</span>
                        <i @click.stop="handleDeleteClassify(classify.data)" class="el-icon-delete delete-icon"></i>
                      </a>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="14" :xl="16">
            <div>
              <h3>编辑区域</h3>
            </div>
            <div v-if="currentClassify.id" style="padding-top: 30px;">
              <div>
                <el-form ref="currentClassify" :model="currentClassify" :rules="editFormRules" label-width="60px" @submit.native.prevent>
                  <el-form-item label="标题" prop="name">
                    <el-input v-model="currentClassify.name"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="图标">
                    <el-input v-model="editForm.icon"></el-input>
                  </el-form-item> -->
                  <el-form-item label="图片" prop="imgUrl">
                    <single-image-upload v-model="currentClassify.imgUrl" width="80px" height="80px" :editable="false"></single-image-upload>
                  </el-form-item>
                  <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="currentClassify.sort"></el-input-number>
                  </el-form-item>
                  <el-form-item label="状态" prop="available">
                    <el-switch v-model="currentClassify.available"></el-switch>
                  </el-form-item>
                  <el-form-item label="备注" prop="remark">
                    <el-input v-model="currentClassify.remark" type="textarea"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="text-center">
                <el-button type="primary">保存</el-button>
              </div>
            </div>
            <div>

            </div>
          </el-col>
        </el-row>
        <div style="padding-top: 40px;">
          <div class="block-area">
            <div class="title">
              <span class="label"></span>
              <span>方向推荐课程</span>
            </div>
            <div class="content">
            </div>
          </div>

          <div class="block-area">
            <div class="title">
              <span class="label"></span>
              <span>方向推荐路线</span>
            </div>
            <div class="content">
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" :title="title" :close-on-click-modal="false" :close-on-press-escape="false" width="800px">
      <div>
        <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="90px" @submit.native.prevent>
          <el-form-item label="标题">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <!-- <el-form-item label="图标">
            <el-input v-model="editForm.icon"></el-input>
          </el-form-item> -->
          <el-form-item label="图片">
            <single-image-upload v-model="editForm.imgUrl" width="80px" height="80px" :editable="false"></single-image-upload>
          </el-form-item>
           <el-form-item label="排序">
            <el-input-number v-model="editForm.sort"></el-input-number>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch v-model="editForm.available"></el-switch>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="editForm.remark" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SingleImageUpload from '../../components/common/SingleImageUpload.vue'
const initEditForm = { id: '', name: '', pid: 0, sort: 0, imgUrl: '', available: true, remark: '', type: 1 }
export default {
  components: { SingleImageUpload },
  data () {
    return {
      current: '',
      directionTree: [],
      directions: [],
      direction: '',
      classifyies: [],
      classify: '',
      dialogVisible: false,
      editFormRules: {
        name: [{
          required: true, message: '请输入标题', trigger: 'blur'
        }],
        imgUrl: [{
          required: true, message: '请选择图片', trigger: 'blur'
        }],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ]
      },
      title: '',
      editForm: Object.assign({}, initEditForm),
      currentClassify: Object.assign({}, initEditForm)
    }
  },
  mounted () {
    this.handleGetDirections(true)
  },
  methods: {
    handlerRefresh () {
      this.handleGetDirections()
    },
    handleGetDirections (init) {
      this.$get('/cms-classify/tree').then(res => {
        this.directionTree = res.data || []
        if (init && this.directionTree.length) {
          this.current = this.directionTree[0].id + ''
        }
      })

      // this.$get('/cms-classify/list/1').then(res => {
      //   this.directions = res.data || []
      //   if (this.directions.length) {
      //     this.direction = this.directions[0]
      //     this.handleGetClassifyies(this.directions[0].id)
      //   }
      // })
    },
    handleGetClassifyies (pid) {
      this.$get(`/cms-classify/children/${pid}`).then(res => {
        this.classifyies = res.data || []
      })
    },
    handleSave () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm('确认保存', '提示', { type: 'warning' }).then(() => {
            this.$post('/cms-classify/save', this.editForm).then(res => {
              if (res.code === 0) {
                this.$notify.success('保存成功')
                this.dialogVisible = false
                this.handlerRefresh()
              }
            })
          })
        }
      })
    },
    handleChooseClassify (classifyNode) {
      this.currentClassify = classifyNode.data
    },
    handleNew (type, pid) { //
      this.dialogVisible = true
      if (type === 1) {
        this.title = '新增方向'
        pid = 0
      } else {
        this.title = '新增分类'
      }
      this.editForm = Object.assign({}, initEditForm, { type: type, pid: pid })
      console.log(this.editForm)
    },
    handleEdit (type, data) {
      if (type === 1) {
        this.title = '编辑方向'
      } else {
        this.title = '编辑分类'
      }
      this.editForm = Object.assign({}, initEditForm)
    },
    handleDeleteClassify (classify) {
      this.$confirm(`是否删除【${classify.name}】分类`, '提示').then(() => {
        //
      }).catch(() => {})
    },
    onDirectionContextmenu (event, direction) {
      const items = [{
        label: '新增分类',
        icon: 'el-icon-circle-plus',
        onClick: () => {
          this.handleNew(2, direction.id)
        }
      }, {
        label: '删除',
        icon: 'el-icon-delete-solid',
        onClick: () => {
          if (direction.children && direction.children.length) {
            this.$notify.error('此方向下有分类，不能删除')
            return
          }
          console.log('删除')
        }
      }]

      this.$contextmenu({
        items,
        event,
        customClass: 'app-nav-tab-menu',
        zIndex: 3,
        minWidth: 140
      })
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
// .page {
//   display: flex;
//   flex: 1;
//   height: 100%;
//   min-height: 400px;
//   overflow-y: auto;
// }
// .content-panel {
//   display: block;
// }
.wrapper-header {
  height: 36px;
  display: flex;
  align-items: center;
}
.direction-wrapper {
  width: 150px;
  margin-right: 20px;
}
.classify-wrapper {
  width: 150px;
  margin-right: 20px;
}
.content-wrapper {
  display: flex;
  flex: 1;
}
.classify-item {
  // display: inline-flex;
  display: inline-block;
    position: relative;
    margin-top: 2px;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 0 16px;
    height: 26px;
    line-height: 26px;
    font-size: 14px;
    font-weight: 400;
    border-radius: 14px;
    color: #888;
    // white-space: nowrap;
    overflow: visible;
  &.active {
    font-weight: 500;
    color: #fa8919;
    background: #fbf5ee;
  }
  &:hover {
    color: #fa8919;
    .delete-icon {
      visibility: visible;
    }
  }
  .delete-icon {
    visibility: hidden;
    position: absolute;
    font-size: 12px;
    right: -4px;
    top: -2px;
    z-index: 3;
    color: #333;
    &:hover {
      color: #000000;
    }
  }
}
</style>
