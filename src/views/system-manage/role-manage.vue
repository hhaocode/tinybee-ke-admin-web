<template>
  <div class="page">
    <div class="page-panel">
      <el-form :inline="true" :model="searchForm" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="searchForm.kw" placeholder="名称|权限代码|备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleSearch" type="primary" icon="el-icon-search">查询</el-button>
          <el-button @click="handleEdit('')" type="primary" icon="el-icon-plus">新增</el-button>
        </el-form-item>
      </el-form>
      <ArcusTable ref="roleTable" action="permission/pageRole">
        <template>
          <el-table-column prop="name" label="名称" width="180">
          </el-table-column>
          <el-table-column prop="permissionCode" label="权限代码" width="180">
          </el-table-column>
          <el-table-column prop="sort" label="显示顺序"></el-table-column>
          <el-table-column prop="available" label="可用状态">
             <template slot-scope="scope">
               <el-switch v-model="scope.row.available"></el-switch>
             </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text"><el-link type="info">编辑</el-link></el-button>
              <el-button @click="handleDelete(scope.row.id)" type="text"><el-link type="warning">删除</el-link></el-button>
              <el-button @click="handleAuthorize(scope.row.id)" type="text"><el-link type="danger">授权</el-link></el-button>
            </template>
          </el-table-column>
        </template>
      </ArcusTable>
    </div>

    <el-dialog title="查看编辑角色" :visible.sync="roleFormdialogVisible" width="800px" :close-on-click-modal="false">
      <div>
        <el-form :model="roleForm" ref="roleForm" @submit.native.prevent label-width="80px">
          <el-form-item label="名称" required>
            <el-input v-model="roleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="备注" required>
            <el-input v-model="roleForm.remark" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="权限代码" required>
            <el-input v-model="roleForm.permissionCode"></el-input>
          </el-form-item>
          <el-form-item label="顺序" required>
            <el-input-number :min="0" v-model="roleForm.sort"></el-input-number>
          </el-form-item>
          <el-form-item label="可用状态" required>
            <el-switch v-model="roleForm.available"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleFormdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="赋权" :visible.sync="authorizeDialogVisible" width="600px" :close-on-click-modal="false">
      <div>
        <el-tree
          ref="permissionTree"
          :data="accessResourceTree"
          show-checkbox
          node-key="id"
          :check-strictly="true"
          :default-checked-keys="rolePermissionIds"
          :default-expand-all="true"
          :expand-on-click-node="true"
          :props="accessResourceTreeProps">
          <span class="permission-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-tag :type="resourceTypeTag[data.type].tag">{{resourceTypeTag[data.type].label}}</el-tag>
            </span>
          </span>
      </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="authorizeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveAuthorize">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArcusTable from '@/components/table/ArcusTable'
const initRoleForm = { id: '', name: '', remark: '', permissionCode: '', sort: 0, available: true }
export default {
  name: 'role-manage',
  components: { ArcusTable },
  computed: {
    ...mapState({
      resourceTypeTag: state => state.common.resourceTypeTag,
      accessResourceTree: state => state.permission.accessResourceTree
    })
  },
  mounted () {
    this.handleSearch()
  },
  methods: {
    // handleAccessResourceTree() {
    //   this.$
    // }
    handleSearch () {
      this.$refs.roleTable.search(this.searchForm)
    },
    handleRefresh () {
      this.$refs.roleTable.refresh()
    },
    handleEdit (param) {
      if (param) {
        this.roleForm = param
      } else {
        this.roleForm = Object.assign({}, initRoleForm)
      }
      this.roleFormdialogVisible = true
    },
    handleDelete (id) {
      this.$confirm('是否删除', '是否继续').then(() => {
        this.$store.dispatch('permission/deleteRoleById', id).then(res => {
          if (res.code === 0) {
            this.$notify.success('删除成功')
            this.handleRefresh()
            this.$store.dispatch('app/refreshPermission')
          }
        }).catch(() => {})
      }).catch(() => {
        this.$notify.info('取消了删除')
      })
    },
    handleAuthorize (id) {
      this.authorizedRoleId = id
      this.authorizeDialogVisible = true
      this.rolePermissionIds = []
      this.$store.dispatch('permission/getAccessResourceTree').then((res) => {
        this.$nextTick(() => {
          this.$store.dispatch('permission/getRoleResourceIds', id).then((res) => {
            res = res || []
            this.rolePermissionIds = res
            // res.forEach(v => {
            //   const node = this.$refs.permissionTree.getNode(v)
            //   if (node && node.isLeaf) {
            //     this.$refs.permissionTree.setChecked(node, true)
            //   }
            // })
          }).catch(() => {})
        })
      }).catch(() => {})
      // 获取原来的信息  获取权限树
      // 设置原来的数据 然后获取
    },
    handleSaveAuthorize () {
      // const checkedKeys = Array.from(new Set())
      const checkedKeys = this.rolePermissionIds // this.$refs.permissionTree.getCheckedKeys().concat(this.$refs.permissionTree.getHalfCheckedKeys())
      this.$confirm('是否更改权限', '是否继续').then(() => {
        this.$store.dispatch('permission/saveRoleResources', { id: this.authorizedRoleId, ids: checkedKeys }).then(res => {
          if (res.code === 0) {
            this.$notify.success('权限修改成功')
            this.authorizeDialogVisible = false
            this.$store.dispatch('app/refreshPermission')
          }
        }).catch(() => {})
      })
    },
    handleSave () {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('permission/saveRole', this.roleForm).then(res => {
            if (res.code === 0) {
              this.roleFormdialogVisible = false
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
      roleFormdialogVisible: false,
      searchForm: {
        kw: ''
      },
      roleForm: Object.assign({}, initRoleForm),
      authorizedRoleId: '',
      authorizeDialogVisible: false,
      accessResourceTreeProps: {
        children: 'children',
        label: 'title'
      },
      rolePermissionIds: []
    }
  }
}
</script>
