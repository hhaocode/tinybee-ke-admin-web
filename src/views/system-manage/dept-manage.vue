<template>
  <div class="page">
    <div class="page-panel">
      <el-form :inline="true"  @submit.native.prevent>
        <el-form-item>
          <el-input v-model="searchForm.kw" placeholder="名称|代码|路径|ICON" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" icon="el-icon-search">查询</el-button>
          <el-button type="primary" @click="handleAdd('')" icon="el-icon-plus">新增</el-button>
        </el-form-item>
      </el-form>
      <div class="page-table-wrapper">
        <div class="page-table">
          <el-table
            :data="deptTableTree"
            style="width: 100%;margin-bottom: 20px;"
            :default-expand-all="true"
            row-key="id"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column  prop="name"  label="名称"></el-table-column>
            <el-table-column prop="shortName" label="简称"></el-table-column>
            <!-- <el-table-column prop="available" label="是否可用">
              <template slot-scope="scope"><el-switch v-model="scope.row.available" disabled></el-switch></template>
            </el-table-column> -->
            <el-table-column prop="sort" label="顺序"></el-table-column>
            <el-table-column width="160" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleAdd(scope.row.id)" type="text"><el-link type="primary">新增</el-link></el-button>
                <el-button @click="handleEdit(scope.row)" type="text"><el-link type="warning">修改</el-link></el-button>
               <el-button type="text"> <el-link type="danger">删除</el-link></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog title="编辑资源" :visible.sync="dialogFormVisible" width="800px" :close-on-click-modal="false" >
      <div>
        <el-form ref="deptForm" :model="deptForm" label-width="80px" :rules="deptFormRules"  @submit.native.prevent>
          <el-form-item label="名称" required>
            <el-input v-model="deptForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="父部门">
             <el-tree-select v-model="deptForm.pid" ref="parentTreeSelect" :treeParams="parentTreeSelectOptions" />
          </el-form-item>
          <el-form-item label="简称">
            <el-input v-model="deptForm.shortName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="顺序" required>
            <el-input-number v-model="deptForm.sort" :min="0"></el-input-number>
          </el-form-item>
          <!-- <el-form-item label="是否可用">
            <el-switch v-model="DeptForm.available" disabled></el-switch>
          </el-form-item> -->
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const initDeptForm = { id: '', pid: '', name: '', shortName: '', sort: 0 }
export default {
  name: 'Dept-manage',
  computed: {
    ...mapState({
      deptTree: state => state.permission.resourceTree,
      deptTableTree: state => state.permission.deptTableTree
    })
  },
  mounted () {
    this.handleSearch()
  },
  methods: {
    handleSearch () {
      this.$store.dispatch('permission/getDeptTableTree', this.searchForm)
    },
    handleEditDialog () {
      this.$store.dispatch('permission/getDeptTree').then(res => {
        this.$refs.parentTreeSelect.treeDataUpdateFun(res)
      })
      this.dialogFormVisible = true
    },
    handleEdit (row) {
      this.handleEditDialog()
      this.deptForm = row
      if (row.pid === 0) {
        this.deptForm.pid = ''
      }
    },
    handleAdd (pid) {
      this.handleEditDialog()
      this.deptForm = Object.assign({}, initDeptForm)
      this.deptForm.pid = pid || ''
    },
    handleSave () {
      this.$refs.deptForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('permission/saveDept', this.deptForm).then(res => {
            if (res.code === 0) {
              // 新增成功
              this.$notify.success('保存成功')
              this.dialogFormVisible = false
              this.handleSearch()
            }
          }).catch(err => {
            console.log(err)
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
      dialogFormVisible: false,
      deptForm: Object.assign({}, initDeptForm),
      deptFormRules: {
        title: [{ required: true, message: '必填项', trigger: 'blur' }, { max: 30, message: '不能超过30个字符', trigger: 'blur' }],
        permissionCode: [{ max: 50, message: '不能超过30个字符', trigger: 'blur' }],
        path: [{ max: 100, message: '不能超过100个字符', trigger: 'blur' }],
        icon: [{ max: 50, message: '不能超过30个字符', trigger: 'blur' }]
      },
      searchForm: {
        kw: '',
        type: ''
      },
      parentTreeSelectOptions: {
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
