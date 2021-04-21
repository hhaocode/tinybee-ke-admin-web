<template>
  <div class="page">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="8" :md="7" :lg="6" :xl="5">
        <div class="page-panel">
          <el-input suffix-icon="el-icon-search" placeholder="请输入部门名称"></el-input>
          <div class="dept-tree-wrapper">
            <el-tree
              :data="deptTree"
              ref="deptTree"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[]"
              :default-checked-keys="[]"
              :default-expand-all="true"
              :props="defaultProps">
            </el-tree>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="16" :md="17" :lg="18" :xl="19">
        <div class="page-panel">
          <el-form :inline="true">
            <el-form-item>
              <el-input v-model="searchForm.kw" placeholder="工号|姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="handleSearch" icon="el-icon-search">查询</el-button>
              <el-button @click="handleEdit('', true)" icon="el-icon-plus">新增</el-button>
            </el-form-item>
          </el-form>
          <ArcusTable ref="empTable" action="permission/pageEmp">
            <template>
              <el-table-column prop="jobNo" label="工号" type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" :inline="true" label-width="80px" class="emp-table-expand">
                    <el-form-item label="性别">
                      <span>{{ props.row.gender }}</span>
                    </el-form-item>
                    <el-form-item label="婚否">
                      <span>{{ props.row.married }}</span>
                    </el-form-item>
                    <el-form-item label="学历">
                      <span>{{ props.row.education }}</span>
                    </el-form-item>
                    <el-form-item label="电话">
                      <span>{{ props.row.mobile }}</span>
                    </el-form-item>
                    <el-form-item label="邮箱">
                      <span>{{ props.row.email }}</span>
                    </el-form-item>
                    <el-form-item label="住址">
                      <span>{{ props.row.address }}</span>
                    </el-form-item>
                    <el-form-item label="入职日期">
                      <span>{{ props.row.hiredate }}</span>
                    </el-form-item>
                    <el-form-item v-if="props.row.status === 3" label="离职日期">
                      <span>{{ props.row.termdate }}</span>
                    </el-form-item>
                    <el-form-item label="状态">
                      <span>{{ props.row.status }}</span>
                    </el-form-item>
                    <el-form-item label="备注">
                      <span>{{ props.row.remark }}</span>
                    </el-form-item>
                    <el-form-item label="创建时间">
                      <span>{{ props.row.createTime }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column prop="jobNo" label="工号"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="mobile" label="电话" ></el-table-column>
              <el-table-column prop="email" label="邮箱"></el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
              <el-table-column prop="createTime" label="创建时间"></el-table-column>
              <el-table-column label="操作" width="160px" fixed="right">
                <template slot-scope="scope">
                  <el-button @click="handleEdit(scope.row, true)" type="text"><el-link type="warning">编辑</el-link></el-button>
                  <el-button @click="handleDelete(scope.row.id)" type="text"><el-link type="danger">删除</el-link></el-button>
                  <el-button @click="handleCreateUser(scope.row)" type="text"><el-link type="warning">创建用户</el-link></el-button>
                  <el-button @click="handleTurnLecturer(scope.row)" type="text"><el-link type="warning">转为讲师</el-link></el-button>
                </template>
              </el-table-column>
            </template>
          </ArcusTable>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="查看|编辑人员" :visible.sync="empFormdialogVisible" width="700px" :close-on-click-modal="false">
      <div>
        <el-form :model="empForm" ref="empForm" :disabled="!editable" :inline="true" @submit.native.prevent label-width="90px">
          <el-form-item label="工号" required>
            <el-input v-model="empForm.jobNo"></el-input>
          </el-form-item>
          <el-form-item label="姓名" required>
            <el-input v-model="empForm.name"></el-input>
          </el-form-item>
          <el-form-item label="部门" required>
             <el-tree-select v-model="empForm.deptId" ref="deptTreeSelect" :treeParams="deptTreeSelectOptions" style="width:200px;"></el-tree-select>
          </el-form-item>
          <el-form-item label="职级" required>
            <el-select v-model="empForm.postId" style="width:200px;">
              <el-option v-for="post in postList" :key="post.id" :value="post.id" :label="post.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别" required>
            <el-select v-model="empForm.gender" style="width:200px;">
              <el-option value="U" label="保密"></el-option>
              <el-option value="M" label="男"></el-option>
              <el-option value="F" label="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历" required>
            <el-select v-model="empForm.education" style="width:200px;">
              <el-option v-for="education in educations" :key="education.id" :value="education.value" :label="education.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机" required>
            <el-input v-model="empForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" required>
            <el-input v-model="empForm.email"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="empForm.status" style="width:200px;">
              <el-option :value="1" label="在职"></el-option>
              <el-option :value="2" label="休假"></el-option>
              <el-option :value="3" label="离职"></el-option>
              <el-option :value="4" label="退休"></el-option>
              <el-option :value="5" label="死亡"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入职时间" required>
            <el-date-picker v-model="empForm.hiredate" type="date" style="width:200px;" placeholder="入职时间"></el-date-picker>
          </el-form-item>
          <el-form-item v-if="empForm.termdate" label="离职时间" required>
            <el-tag>{{empForm.termdate}}</el-tag>
          </el-form-item>
          <el-form-item label="婚否" required>
            <el-radio-group v-model="empForm.married">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="地址" required>
            <el-input v-model="empForm.address" type="textarea" style="width:500px;"></el-input>
          </el-form-item>
          <el-form-item label="备注" required>
            <el-input v-model="empForm.remark" type="textarea" style="width:500px;"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="empFormdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArcusTable from '@/components/table/ArcusTable'
import permission from '@/mixins/permission'
const initEmpForm = { id: '', jobNo: '', name: '', gender: 'U', postId: '', deptId: '', mgrId: '', married: '', education: '', mobile: '', email: '', address: '', hiredate: new Date(), termdate: '', status: 1, remark: '' }
export default {
  name: 'emp-manage',
  mixins: [permission],
  components: { ArcusTable },
  computed: {
    ...mapState({
      deptTree: state => state.permission.deptTree,
      postList: state => state.permission.postList,
      educations: state => state.common.educations
    })
  },
  mounted () {
    this.initPostList()
    this.initDeptTree().then(res => {
    }).catch(() => {})
  },
  methods: {
    handleSearch () {
      this.searchForm.deptIds = this.$refs.deptTree.getCheckedKeys().concat(this.$refs.deptTree.getHalfCheckedKeys())
      this.$refs.empTable.search(this.searchForm)
    },
    handleRefresh () {
      this.$refs.empTable.refresh()
    },
    initPostList () {
      this.$store.dispatch('permission/listPost')
    },
    handleTurnLecturer (row) {
      //
      this.$prompt('请输入简介', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$store.dispatch('permission/turnLecturer', { empId: row.id, intro: value }).then(res => {
          if (res.code === 0) {
            this.$notify.success('操作成功')
          }
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '取消输入'
        // })
      })
    },
    handleCreateUser (row) {
      if (row.status !== 1) {
        this.$notify.error('员工不是在职状态')
        return
      }
      this.$confirm('是否要创建为用户', '是否继续').then(() => {
        this.$store.dispatch('permission/createUser', row.id).then(res => {
          if (res.code === 0) {
            this.$notify.success('创建成功，初始密码****')
          }
        })
      }).catch(() => {
        this.$notify.info('取消创建')
      })
    },
    handleEdit (row, editable) {
      if (!row) {
        row = Object.assign({}, initEmpForm)
      }
      this.empForm = row
      this.editable = editable
      this.empFormdialogVisible = true
      this.$nextTick(() => {
        this.$refs.deptTreeSelect.treeDataUpdateFun(this.deptTree)
      })
      //
    },
    handleDelete (id) {
      this.$confirm('将删除员工与登录账号', '是否继续', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        this.$notify.success('删除')
      }).catch(() => {
        this.$notify.info('取消删除')
      })
    },
    handleSave () {
      this.$confirm('是否保存', '继续？').then(() => {
        this.$store.dispatch('permission/saveEmp', this.empForm).then(res => {
          if (res.code === 0) {
            this.$notify.success('保存成功')
            this.empFormdialogVisible = false
          }
        }).catch(() => {})
      })
    }
  },
  data () {
    return {
      searchForm: { kw: '', deptIds: [] },
      empFormdialogVisible: false,
      editable: false,
      empForm: Object.assign({}, initEmpForm),
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      deptTreeSelectOptions: {
        data: [],
        clickParent: true,
        props: {
          children: 'children',
          label: 'name',
          disabled: 'disabled',
          value: 'id'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dept-tree-wrapper {
  padding: 30px 15px;
}
.emp-table-expand {
  font-size: 0;
  ::v-deep label {
    color: #99a9bf;
  }
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>
