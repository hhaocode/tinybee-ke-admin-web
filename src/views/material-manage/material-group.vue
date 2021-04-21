<template>
  <div class="page">
   <div class="page-panel">
     <div>
       <el-form @submit.native.prevent inline>
         <el-form-item>
           <el-select v-model="queryForm.type"  @change="handleQuery" clearable>
             <el-option value="" label="全部分组"></el-option>
             <el-option v-for="item in types" :key="item.value" :value="item.value" :label="item.label"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="handleQuery">查询</el-button>
         </el-form-item>
         <el-form-item>
           <el-button @click="handleEdit('')">新增分组</el-button>
         </el-form-item>
       </el-form>
     </div>
     <div>
       <tiny-bee-table border ref="table" action="/material/group/page">
        <template>
          <el-table-column label="分组名称" prop="name"></el-table-column>
          <el-table-column label="备注" prop="remark"></el-table-column>
          <el-table-column label="分组类型" prop="type">
            <span slot-scope="{row}">{{typeMap[row.type]}}</span>
          </el-table-column>
          <el-table-column label="顺序" prop="sort"></el-table-column>
          <el-table-column label="更新时间" prop="modifyTime"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row}">
              <el-button size="mini" type="warning" @click="handleEdit(row)">编辑</el-button>
            </template>
          </el-table-column>
        </template>
       </tiny-bee-table>
     </div>
   </div>
   <el-dialog title="编辑分组" :visible.sync="dialogVisible" :close-on-click-modal="false" width="800">
     <div>
       <el-form :model="form" ref="form" :rules="formRules" @submit.native.prevent label-position="left" label-width="80px">
         <el-form-item label="分组名称" prop="name">
           <el-input v-model="form.name" clearable></el-input>
         </el-form-item>
         <el-form-item label="备注" prop="remark">
           <el-input v-model="form.remark" type="textarea" clearable></el-input>
         </el-form-item>
         <el-form-item label="分组类型" prop="type">
            <el-select v-model="form.type" clearable>
             <el-option v-for="item in types" :key="item.value" :value="item.value" :label="item.label"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="顺序" prop="sort">
           <el-input-number v-model="form.sort" clearable></el-input-number>
         </el-form-item>
       </el-form>
     </div>
     <div slot="footer">
       <el-button @click="dialogVisible = false">取消</el-button>
       <el-button type="primary" @click="handleSave">保存</el-button>
     </div>
   </el-dialog>
  </div>
</template>

<script>
const initForm = { name: '', remark: '', type: '', sort: 0 }
export default {
  data () {
    return {
      queryForm: {
        type: ''
      },
      types: [
        { value: 1, label: '图片分组' }, { value: 2, label: '音频分组' }, { value: 3, label: '视频分组' }, { value: 4, label: '文件分组' }, { value: 5, label: '文章分组' }
      ],
      typeMap: {},
      form: Object.assign({}, initForm),
      formRules: {
        name: [{ required: true, message: '请输入分组名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择分组类型', trigger: 'change' }],
        sort: [{ required: true, message: '请输入顺序', trigger: 'blur' }, { type: 'number', min: 0, message: '顺序不能输入负数', trigger: 'blur' }]
      },
      dialogVisible: false
    }
  },
  mounted () {
    const typeMap = {}
    this.types.forEach(v => {
      typeMap[v.value] = v.label
    })
    this.typeMap = typeMap
    this.handleQuery()
  },
  methods: {
    handleQuery () {
      this.$refs.table.search(this.queryForm)
    },
    handleEdit (row) {
      if (row) {
        this.form = Object.assign({}, row)
      } else {
        this.form = Object.assign({}, initForm, { type: this.queryForm.type })
      }
      this.dialogVisible = true
    },
    handleSave () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$post('/material/group/save', this.form).then(res => {
            if (res.code === 0) {
              this.$notify.success('保存成功')
              this.$refs.table.refresh()
              this.dialogVisible = false
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
