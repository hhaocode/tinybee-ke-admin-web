<template>
  <div class="page">
    <div class="page-panel">
      <el-form :inline="true"  @submit.native.prevent>
        <el-form-item>
          <el-input v-model="searchForm.kw" placeholder="名称|代码|路径|ICON" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchForm.type" :clearable="true" placeholder="资源类型">
            <el-option label="导航菜单" :value="1"></el-option>
            <el-option label="路由菜单" :value="2"></el-option>
            <el-option label="操作" :value="3"></el-option>
            <el-option label="页面元素" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" icon="el-icon-search">查询</el-button>
          <el-button type="primary" @click="handleAdd('')" icon="el-icon-plus">新增</el-button>
        </el-form-item>
      </el-form>
      <div class="page-table-wrapper">
        <div class="page-table">
          <el-table
            :data="resourceTableTree"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column  prop="title"  label="资源名称"></el-table-column>
            <el-table-column prop="type" label="资源类型">
              <template slot-scope="scope">
                <el-tag :type="resourceTypeTag[scope.row.type].tag || 'info'">{{resourceTypeTag[scope.row.type].label || '其他'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="permissionCode" label="权限代码"></el-table-column>
            <el-table-column prop="path" label="资源路径">
              <template slot-scope="{row}">
                <router-link v-if="row.type === 1 && row.path" :to="row.path">
                  {{row.path}}
                </router-link>
                <span v-else>
                  {{row.path}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="icon" label="资源ICON">
              <template slot-scope="scope">
                <i :class="scope.row.icon"></i> <el-tag v-if="scope.row.icon" type="info">{{scope.row.icon}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="available" label="是否可用">
              <template slot-scope="scope"><el-switch v-model="scope.row.available" disabled></el-switch></template>
            </el-table-column>
            <el-table-column prop="sort" label="顺序"></el-table-column>
            <el-table-column width="160" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleAdd(scope.row.id)" type="text"><el-link type="primary">新增子级</el-link></el-button>
                <el-button @click="handleEdit(scope.row)" type="text"><el-link type="warning">修改</el-link></el-button>
               <el-button @click="handleDelete(scope.row)" type="text"> <el-link type="danger">删除</el-link></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog title="编辑资源" :visible.sync="dialogFormVisible" width="800px" :close-on-click-modal="false" >
      <div>
        <el-form ref="resourceForm" :model="resourceForm" label-width="80px" :rules="resourceFormRules"  @submit.native.prevent>
          <el-form-item label="名称" required>
            <el-input v-model="resourceForm.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="父资源">
             <el-tree-select v-model="resourceForm.pid" ref="parentTreeSelect" :treeParams="parentTreeSelectOptions" />
          </el-form-item>
          <el-form-item label="权限代码">
            <el-input v-model="resourceForm.permissionCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" required>
            <el-radio-group v-model="resourceForm.type">
              <el-radio-button label="1">导航菜单</el-radio-button>
              <el-radio-button label="2">路由菜单</el-radio-button>
              <el-radio-button label="3">操作</el-radio-button>
              <el-radio-button label="4" >页面元素</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="路径">
            <el-input v-model="resourceForm.path" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图标">
            <el-input v-model="resourceForm.icon" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="顺序" required>
            <el-input-number v-model="resourceForm.sort" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="是否可用">
            <el-switch v-model="resourceForm.available" disabled></el-switch>
          </el-form-item>
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
const initResourceForm = { id: '', pid: '', title: '', permissionCode: '', type: 1, path: '', icon: 'el-icon-cloudy', sort: 99, available: true }
export default {
  name: 'resource-manage',
  computed: {
    ...mapState({
      resourceTypeTag: state => state.common.resourceTypeTag,
      resourceTree: state => state.permission.resourceTree,
      resourceTableTree: state => state.permission.resourceTableTree
    })
  },
  mounted () {
    this.handleSearch()
  },
  methods: {
    handleSearch () {
      this.$store.dispatch('permission/getResourceTableTree', this.searchForm)
    },
    handleEditDialog () {
      this.$store.dispatch('permission/getResourceTree').then(res => {
        this.$refs.parentTreeSelect.treeDataUpdateFun(res)
      })
      this.dialogFormVisible = true
    },
    handleEdit (row) {
      this.handleEditDialog()
      this.resourceForm = Object.assign({}, row)
      if (row.pid === 0) {
        this.resourceForm.pid = ''
      }
    },
    handleAdd (pid) {
      this.handleEditDialog()
      this.resourceForm = Object.assign({}, initResourceForm)
      this.resourceForm.pid = pid || ''
    },
    handleDelete (row) {
      this.$confirm(`是否删除${row.title}`).then(() => {
        this.$store.dispatch('permission/deleteResourceById', row.id).then(res => {
          console.log(res)
          this.$notify.success('删除成功')
          this.handleSearch()
          this.$store.dispatch('app/refreshPermission')
        }).catch(err => {
          console.log(err)
        })
      })
    },
    handleSave () {
      this.$refs.resourceForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('permission/saveResource', this.resourceForm).then(res => {
            if (res.code === 0) {
              // 新增成功
              this.$notify.success('保存成功')
              this.dialogFormVisible = false
              this.handleSearch()
              this.$store.dispatch('app/refreshPermission')
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
      resourceForm: Object.assign({}, initResourceForm),
      resourceFormRules: {
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
          label: 'title',
          disabled: 'disabled',
          value: 'id'
        }
      }
    }
  }
}
</script>
