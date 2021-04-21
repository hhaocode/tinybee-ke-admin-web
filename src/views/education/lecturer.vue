<template>
  <div class="page">
    <div class="page-panel">
      <el-form :inline="true" :model="searchForm" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="searchForm.name" placeholder="姓名" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleSearch" type="primary" icon="el-icon-search">查询</el-button>
          <el-button @click="handleEdit('')" type="primary" icon="el-icon-plus">新增</el-button>
        </el-form-item>
      </el-form>
      <tiny-bee-table ref="table" action="/platform/lecturer/page">
        <template slot-scope="{rows}">
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column label="头像" >
            <template slot-scope="{row}">
              <el-image :src="row.avatar" style="width: 90px; height: 80px" fit="fill" :preview-src-list="rows.map(v => v.avatar)"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="nickname" label="昵称" >
          </el-table-column>
          <el-table-column prop="mobile" label="手机" >
          </el-table-column>
          <el-table-column prop="email" label="邮箱" >
          </el-table-column>
          <el-table-column prop="intro" label="简介" >
          </el-table-column>
          <el-table-column prop="available" label="可用状态">
             <template slot-scope="scope">
               <el-switch v-model="scope.row.available" :disabled="true"></el-switch>
             </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text"><el-link type="warning">编辑</el-link></el-button>
              <el-button @click="handleDelete(scope.row.id)" type="text"><el-link type="danger">删除</el-link></el-button>
            </template>
          </el-table-column>
        </template>
      </tiny-bee-table>
    </div>

    <el-dialog title="编辑讲师" :visible.sync="postFormdialogVisible" width="800px" :close-on-click-modal="false">
      <div>
        <el-form :model="form" ref="form" :rules="formRules" @submit.native.prevent label-width="80px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="form.nickname"></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <single-image-upload v-model="form.avatar"></single-image-upload>
          </el-form-item>
          <el-form-item label="简介" prop="intro">
            <el-input v-model="form.intro" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="可用状态">
            <el-switch v-model="form.available"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="postFormdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const initForm = { id: '', lecturerNo: '', empId: '', userId: '', name: '', nickname: '', avatar: '', position: '', intro: '', mobile: '', email: '', type: 1, available: true, deleted: false }
export default {
  name: 'lecturer',
  mounted () {
    this.handleSearch()
  },
  methods: {
    handleSearch () {
      this.$refs.table.search(this.searchForm)
    },
    handleRefresh () {
      this.$refs.table.refresh()
    },
    handleEdit (param) {
      if (param) {
        this.form = param
        // this.$get(`/platform/lecturer/${param.id}`).then(res => {

        // })
      } else {
        this.form = Object.assign({}, initForm)
      }
      this.postFormdialogVisible = true
    },
    handleDelete (id) {
      this.$notify.info('未实现')
      // 删除岗位 删除的时候  要判断是否在使用
      this.$confirm('请确认删除').then(() => {
        this.$delete(`/platform/lecturer/${id}`).then(res => {
          if (res.code === 0) {
            this.$notify.success('删除成功')
            this.handleRefresh()
          }
        })
      })
    },
    handleSave () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$post('/platform/lecturer/save', this.form).then(res => {
            if (res.code === 0) {
              this.postFormdialogVisible = false
              this.$notify.success('保存成功')
              this.handleRefresh()
            }
          })
        } else {
          this.$notify.warning('数据校验未通过')
          return false
        }
      })
    }
  },
  data () {
    return {
      postFormdialogVisible: false,
      searchForm: {
        name: ''
      },
      form: Object.assign({}, initForm),
      formRules: {
        name: [
          { required: true, message: '请输入讲师姓名', trigge: 'blur' }
        ],
        intro: [
          { required: true, message: '请输入简介', trigge: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigge: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigge: 'blur' }
        ],
        avatar: [
          { required: true, message: '请上传头像', trigge: 'blur' }
        ]
      }
    }
  }
}
</script>
