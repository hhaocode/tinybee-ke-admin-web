<template>
  <div class="page">
    <div class="page-panel">
      <el-form :inline="true" :model="searchForm" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="searchForm.kw" placeholder="账号|工号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleSearch" type="primary" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
      <ArcusTable ref="userTable" action="permission/pageUser">
        <template>
          <el-table-column prop="username" label="账号|工号" width="180">
          </el-table-column>
          <!-- <el-table-column prop="name" label="员工姓名" width="180">
          </el-table-column> -->
          <el-table-column prop="available" label="可用状态">
             <template slot-scope="scope">
               <el-switch v-model="scope.row.available" disabled></el-switch>
             </template>
          </el-table-column>
          <el-table-column prop="lastLoginTime" label="最近一次登录时间"></el-table-column>
          <el-table-column prop="lastChangePasswordTime" label="最近一次修改密码时间"></el-table-column>
          <el-table-column prop="creator" label="创建人"></el-table-column>
          <el-table-column prop="createTime" label="添加时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <template v-if="!scope.row.superAdmin">
                <el-button :disabled="scope.row.superAdmin" @click="handleDelete(scope.row.id)" type="text"><el-link type="warning">重置密码</el-link></el-button>
                <el-button :disabled="scope.row.superAdmin" @click="handleAuthorize(scope.row)" type="text"><el-link type="danger">授权</el-link></el-button>
                <el-button :disabled="scope.row.superAdmin" @click="handleDelete(scope.row.id)" type="text"><el-link type="warning">删除</el-link></el-button>
              </template>
              <template v-else>
                <span>-</span>
              </template>
            </template>
          </el-table-column>
        </template>
      </ArcusTable>
    </div>

    <el-dialog title="赋权" :visible.sync="authorizeDialogVisible" width="700px" :close-on-click-modal="false">
      <div style="padding: 10px 20px;">
        <div>
          <el-transfer
        :titles="['您拥有角色', authorizedUser + '的角色']"
        v-model="userRoleIds"
        :props="{key:'id', label:'name'}"
        :data="accessRoleList">
        </el-transfer>
        </div>
        <el-divider></el-divider>
        <div>
          <el-tree
          ref="userPermissionTree"
          :data="accessResourceTree"
          show-checkbox
          node-key="id"
          :check-strictly="true"
          :default-checked-keys="userPermissionIds"
          :default-expand-all="true"
          :expand-on-click-node="true"
          :props="accessPermissionTreeProps">
          <span class="permission-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-tag :type="resourceTypeTag[data.type].tag">{{resourceTypeTag[data.type].label}}</el-tag>
            </span>
          </span>
      </el-tree>
        </div>
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
export default {
  name: 'user-manage',
  components: { ArcusTable },
  computed: {
    ...mapState({
      resourceTypeTag: state => state.common.resourceTypeTag,
      accessRoleList: state => state.permission.accessRoleList,
      accessResourceTree: state => state.permission.accessResourceTree,
      administrator: state => state.app.administrator
    })
  },
  mounted () {
    this.handleSearch()
  },
  methods: {
    handleSearch () {
      this.$refs.userTable.search(this.searchForm)
    },
    handleRefresh () {
      this.$refs.userTable.refresh()
    },
    handleDelete (id) {
      this.$confirm('是否删除', '是否继续').then(() => {
        this.$store.dispatch('permission/deleteUserById', id).then(res => {
          if (res.code === 0) {
            this.$notify.success('删除成功')
            this.handleRefresh()
          }
        }).catch(() => {})
      }).catch(() => {
        this.$notify.info('取消了删除')
      })
    },
    handleAuthorize (row) {
      this.authorizedUserId = row.id
      this.authorizedUser = row.username
      this.authorizeDialogVisible = true
      this.userPermissionIds = []
      this.$store.dispatch('permission/getAccessResourceTree').then(() => {
        this.$nextTick(() => {
          this.$get(`/system-user/permission-ids/${row.id}`).then(res => {
            res = res.data || []
            this.userPermissionIds = res
            // res.forEach(v => {
            //   const node = this.$refs.userPermissionTree.getNode(v)
            //   console.log(node)
            //   if (node && node.isLeaf) {
            //     this.$refs.userPermissionTree.setChecked(node, true)
            //   }
            // })
          })
        })
      }).catch(() => {})
      this.$store.dispatch('permission/getAccessRoleList').then(() => {
        this.$store.dispatch('permission/getUserRoleIds', row.id).then(res => {
          this.userRoleIds = res || []
        }).catch(() => {})
      })
      // 获取原来的信息  获取权限树
      // 设置原来的数据 然后获取
    },
    handleSaveAuthorize () {
      const checkedKeys = this.userPermissionIds // this.$refs.userPermissionTree.getCheckedKeys().concat(this.$refs.userPermissionTree.getHalfCheckedKeys())
      this.$confirm('是否更改权限', '是否继续').then(() => {
        this.$store.dispatch('permission/saveUserRoles', { id: this.authorizedUserId, roleIds: this.userRoleIds, permissionIds: checkedKeys }).then(res => {
          if (res.code === 0) {
            this.$notify.success('权限修改成功')
            this.authorizeDialogVisible = false
            if (this.administrator.id === this.authorizedUserId) {
              this.$store.dispatch('app/refreshPermission')
            }
          }
        }).catch(() => {})
      })
    }
  },
  data () {
    return {
      searchForm: {
        kw: ''
      },
      authorizedUser: '角色',
      authorizedUserId: '',
      authorizeDialogVisible: false,
      userRoleIds: [],
      accessPermissionTreeProps: {
        children: 'children',
        label: 'title'
      },
      userPermissionIds: []
    }
  }
}
</script>
