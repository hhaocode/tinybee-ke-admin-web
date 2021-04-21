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
      <ArcusTable ref="postTable" action="permission/pagePost">
        <template>
          <el-table-column prop="name" label="名称">
          </el-table-column>
          <el-table-column prop="code" label="代码" >
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
              <el-button @click="handleEdit(scope.row)" type="text"><el-link type="warning">编辑</el-link></el-button>
              <el-button @click="handleDelete(scope.row.id)" type="text"><el-link type="danger">删除</el-link></el-button>
            </template>
          </el-table-column>
        </template>
      </ArcusTable>
    </div>

    <el-dialog title="查看|编辑岗位" :visible.sync="postFormdialogVisible" width="800px" :close-on-click-modal="false">
      <div>
        <el-form :model="postForm" ref="postForm" @submit.native.prevent label-width="80px">
          <el-form-item label="名称" required>
            <el-input v-model="postForm.name"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="postForm.remark" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="权限代码" required>
            <el-input v-model="postForm.code"></el-input>
          </el-form-item>
          <el-form-item label="顺序" required>
            <el-input-number :min="0" v-model="postForm.sort"></el-input-number>
          </el-form-item>
          <el-form-item label="可用状态">
            <el-switch v-model="postForm.available"></el-switch>
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
import ArcusTable from '@/components/table/ArcusTable'
const initpostForm = { id: '', name: '', remark: '', code: '', sort: 0, available: true }
export default {
  name: 'post-manage',
  components: { ArcusTable },
  mounted () {
    this.handleSearch()
  },
  methods: {
    handleSearch () {
      this.$refs.postTable.search(this.searchForm)
    },
    handleRefresh () {
      this.$refs.postTable.refresh()
    },
    handleEdit (param) {
      if (param) {
        this.postForm = param
      } else {
        this.postForm = Object.assign({}, initpostForm)
      }
      this.postFormdialogVisible = true
    },
    handleDelete (id) {
      this.$notify.info('未实现')
      // 删除岗位 删除的时候  要判断是否在使用
      //
    },
    handleSave () {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('permission/savePost', this.postForm).then(res => {
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
        kw: ''
      },
      postForm: Object.assign({}, initpostForm)
    }
  }
}
</script>
