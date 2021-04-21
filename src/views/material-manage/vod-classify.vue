<template>
  <div class="page">
    <div class="page-panel" style="background: inherit;">
      <el-row :gutter="30">
        <el-col :xs="24" :sm="13" :md="12" :lg="11" :xl="10">
          <div class="page-panel">
            <div>
              <el-form :inline="true">
                <el-form-item>
                  <el-select v-model="type" @change="handleChangeType">
                    <el-option label="视频" value="video"></el-option>
                    <el-option label="音频" value="audio"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button icon="el-icon-search" @click="handleChangeType"></el-button>
                </el-form-item>
                <el-form-item>
                  <el-button icon="el-icon-plus" @click="handleAdd('')"></el-button>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <div style="padding: 20px 0;">
                <el-tree :data="classifies" default-expand-all>
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span>
                      <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                        <el-button
                          type="text"
                          @click.native.stop="() => handleEdit( node, data)"
                          icon="el-icon-edit-outline">
                        </el-button>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="添加同级" placement="top-start">
                        <el-button
                          type="text"
                          @click.native.stop="() => handleAdd( node, data, true)"
                          icon="el-icon-circle-plus-outline">
                        </el-button>
                      </el-tooltip>
                      <el-tooltip v-if="type === 'video'" class="item" effect="dark" content="添加下级" placement="top-start">
                        <el-button
                          type="text"
                          @click.native.stop="() => handleAdd( node, data, false)"
                          icon="el-icon-circle-plus">
                        </el-button>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                        <el-button
                          type="text"
                          @click.native.stop="() => handleDelete( node, data)"
                          icon="el-icon-delete">
                        </el-button>
                      </el-tooltip>
                    </span>
                  </span>
                </el-tree>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="11" :md="12" :lg="13" :xl="14">
          <div class="page-panel">
            用于分析类型视频的使用情况 TODO
          </div>
          <!-- <el-table>

          </el-table> -->
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="800px">
      <div>
        <el-form ref="dialogForm" @submit.native.prevent :model="dialogForm" :rules="dialogFormRules">
          <el-form-item prop="pid">
            <el-tree-select v-model="dialogForm.pid" ref="parentTreeSelect" :treeParams="parentTreeSelectOptions" :disabled="type === 'audio'"></el-tree-select>
          </el-form-item>
          <el-form-item prop="name">
            <el-input v-model="dialogForm.name" minlength="2" maxlength="20"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const initForm = {
  id: '', pid: '', name: '', type: 'video'
}
export default {
  data () {
    return {
      type: 'video', // audio
      classifies: [],
      dialogVisible: false,
      dialogForm: Object.assign({}, initForm, true),
      parentTreeSelectOptions: {
        data: [],
        clickParent: true,
        props: {
          children: 'children',
          label: 'label',
          disabled: 'disabled',
          value: 'id'
        }
      },
      dialogFormRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.handleChangeType()
  },
  methods: {
    handleChangeType () {
      this.$get('/material-vod-classify/tree', { params: { type: this.type } }).then(res => {
        const data = res.data || []
        // data.forEach(element => {
        //   element.id = String(element.id)
        //   element.pid = String(element.pid)
        // })
        this.classifies = data
      })
    },
    handleAdd (node, data, sameLevel) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.handleDialogPid().then(() => {
          this.dialogForm = Object.assign({}, initForm, true)
          if (!node) {
            this.dialogForm.type = this.type
            return
          }
          this.dialogForm.type = data.data.type
          if (sameLevel) {
            this.dialogForm.pid = data.pid || ''
          } else {
            this.dialogForm.pid = data.id
          }
          console.log(this.dialogForm)
        })
      })
    },
    handleEdit (node, data) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.handleDialogPid().then(() => {
          console.log(data.data)
          this.dialogForm = data.data
          this.dialogForm.pid = data.pid || ''
        })
      })
    },
    handleDelete (node, data) {
      console.log(node, data)
      this.$confirm('请确认删除').then(() => {
        this.$notify.info('暂不支持删除')
      })
    },
    handleDialogPid () {
      const _this = this
      return new Promise((resolve, reject) => {
        this.$get('/material-vod-classify/tree', { params: { type: this.type } }).then(res => {
          // this.classifies = res.data
          const data = res.data || []
          // data.forEach(element => {
          //   element.id = String(element.id)
          //   element.pid = String(element.pid)
          // })
          _this.$refs.parentTreeSelect.treeDataUpdateFun(data)
          resolve()
        })
      })
    },
    handleSaveInfo () {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.$post('/material-vod-classify/saveOrUpdate', this.dialogForm).then(res => {
            if (res.code === 0) {
              this.$notify.success('保存成功')
              this.dialogVisible = false
              this.handleChangeType()
            }
          })
        }
      })
    }
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    padding: 8px 0;
  }
.page-panel {
  margin-bottom: 15px;
}
</style>
