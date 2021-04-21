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
      <arcus-table ref="table" action="permission/pageDict">
        <template>
          <el-table-column prop="id" label="字典ID">
          </el-table-column>
          <el-table-column prop="name" label="名称">
          </el-table-column>
          <el-table-column prop="dictCode" label="代码" >
          </el-table-column>
          <el-table-column prop="srcSql" label="执行sql"></el-table-column>
          <el-table-column prop="available" label="可用状态">
             <template slot-scope="scope">
               <el-switch v-model="scope.row.available"></el-switch>
             </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text"><el-link type="warning">编辑</el-link></el-button>
              <el-button @click="handleDelete(scope.row.id)" type="text"><el-link type="danger">删除</el-link></el-button>
              <el-button @click="handleEditItems(scope.row)" type="text"><el-link type="info">编辑子类</el-link></el-button>
            </template>
          </el-table-column>
        </template>
      </arcus-table>
    </div>

    <el-dialog title="查看|编辑岗位" :visible.sync="formdialogVisible" width="800px" :close-on-click-modal="false">
      <div>
        <el-form :model="form" ref="form" @submit.native.prevent label-width="80px">
          <el-form-item label="名称" required>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="代码" required>
            <el-input v-model="form.dictCode"></el-input>
          </el-form-item>
          <el-form-item label="执行代码">
            <el-input v-model="form.srcSql" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="可用状态">
            <el-switch v-model="form.available"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog ref="dictItemDialog" title="编辑子类" :visible.sync="dictItemDialog" width="1200px" :close-on-click-modal="false">
      <div>
        <div>
          <el-button @click="handleAddDictItem">添加</el-button>
        </div>
        <el-form :inline="true">
          <div class="dict-item" v-for="(item, idx) in dictItemData.dictItems" :key="idx">
            <el-form-item label="标签">
              <el-input v-model="item.label" placeholder="标签"></el-input>
            </el-form-item>
            <el-form-item label="值">
              <el-input v-model="item.value" placeholder="值"></el-input>
            </el-form-item>
            <el-form-item label="是否默认">
              <el-switch v-model="item.isDeault">是否默认</el-switch>
            </el-form-item>
            <el-form-item label="排序">
              <el-input-number v-model="item.sort" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="状态">
              <el-switch v-model="item.available">状态</el-switch>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="item.remark" placeholder="备注"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="deleteItem(idx)" type="danger">删除</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dictItemDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleDictItems">保 存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

const initForm = { id: '', name: '', remark: '', dictCode: '', srcSql: '', available: true }
const initDictItem = { id: '', dictId: '', label: '', value: '', remark: '', isDefault: '', sort: 0, available: true }
export default {
  name: 'dictionary-manage',
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
    handleAddDictItem () {
      this.dictItemData.dictItems.push(Object.assign({}, initDictItem))
    },
    handleEditItems (param) {
      // childrenData
      this.dictItemData.id = param.id
      this.$get(`/base/dict-item/listByDictId/${param.id}`).then(res => {
        if (res.code === 0) {
          this.dictItemData.dictItems = res.data || []
          this.dictItemDialog = true
        }
      })
    },
    handleEdit (param) {
      if (param) {
        this.form = param
      } else {
        this.form = Object.assign({}, initForm)
      }
      this.formdialogVisible = true
    },
    handleDelete (id) {
      this.$confirm('请确认', '提示').then(() => {
        this.$delete(`/base/dict/${id}`).then(res => {
          if (res.code === 0) {
            this.$notify.success('删除成功')
          }
        })
      })
    },
    deleteItem (idx) {
      this.dictItemData.dictItems.splice(idx, 1)
    },
    handleSave () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch('permission/saveDict', this.form).then(res => {
            if (res.code === 0) {
              this.formdialogVisible = false
              this.$notify.success('保存成功')
              this.handleRefresh()
            }
          })
        } else {
          this.$notify.warning('数据校验未通过')
          return false
        }
      })
    },
    handleDictItems () {
      var flag = true
      this.dictItemData.dictItems.forEach(v => {
        if (!v.value || !v.label) {
          flag = false
          this.$notify.error('请补全数据')
        }
      })
      if (!flag) {
        return
      }
      this.$store.dispatch('permission/saveDictItemBatch', this.dictItemData).then(res => {
        if (res.code === 0) {
          this.dictItemDialog = false
          this.$notify.success('保存成功')
          // this.handleRefresh()
        }
      })
    }
  },
  data () {
    return {
      formdialogVisible: false,
      searchForm: {
        kw: ''
      },
      form: Object.assign({}, initForm),
      dictItemData: {
        id: '',
        dictItems: []
      },
      dictItemDialog: false
    }
  }
}
</script>

<style lang="scss" scoped>
.dict-item {
  background: rgb(254, 240, 240);
  border-radius: 8px;
  padding: 10px;
  margin: 10px auto;
}
</style>
