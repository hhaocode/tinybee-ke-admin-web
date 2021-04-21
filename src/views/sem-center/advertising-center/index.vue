<template>
  <div class="page">
    <div class="page-panel">
      <el-form :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="qeuryParam.kw"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleEdit('')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="page-panel">
      <tiny-bee-table ref="table" action="/sem-advertisement/page">
          <template v-slot:default="{ rows }">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="title" label="广告标题"></el-table-column>
            <el-table-column label="广告封面">
              <template slot-scope="{row}">
                <el-image :src="row.coverUrl" :preview-src-list="rows.map(v => v.coverUrl)"></el-image>
              </template>
            </el-table-column>
            <el-table-column prop="location" label="广告位置"></el-table-column>
            <el-table-column prop="sort" label="顺序"></el-table-column>
            <el-table-column prop="beginTime" label="开始时间"></el-table-column>
            <el-table-column prop="endTime" label="结束时间"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="{row}">
                <el-switch @change="handleSwithAvailable($event, row)" v-model="row.available"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="220px">
              <template slot-scope="{row}">
                <el-button type="warning" @click="handleEdit(row)">编辑</el-button>
                <el-button type="danger" @click="handleDelete(row)">删除</el-button>
              </template>
            </el-table-column>
          </template>
      </tiny-bee-table>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="编辑" :close-on-click-modal="false" :close-on-press-escape="false">
      <div>
        <el-form @submit.native.prevent size="mini" ref="advForm" :model="advForm" :rules="advFormRule" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="advForm.title" maxlength="50" :show-word-limit="true"></el-input>
          </el-form-item>
          <el-form-item label="封面">
            <!-- <el-input v-model="advForm.image"></el-input> -->
            <!-- <image-select v-model="advForm.image"></image-select> -->
            <image-choose v-model="advForm.coverUrl"></image-choose>
          </el-form-item>
          <el-form-item label="目标地址">
            <el-input v-model="advForm.targetUrl" maxlength="50" :show-word-limit="true"></el-input>
          </el-form-item>
          <el-form-item label="打开类型">
            <el-radio-group v-model="advForm.target">
              <el-radio label="_blank">新标签页</el-radio>
              <el-radio label="_self">当前签页</el-radio>
              <!-- _parent _top -->
            </el-radio-group>
          </el-form-item>
          <el-form-item label="位置">
            <el-radio-group v-model="advForm.location">
              <el-radio :label="1">首页轮播</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="有效时间">
            <el-date-picker
                v-model="advForm.time"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
          </el-form-item>
           <el-form-item label="平台">
            <el-radio-group v-model="advForm.platform">
              <el-radio :label="1">PC</el-radio>
              <el-radio :label="2">APP</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否有效">
            <el-switch v-model="advForm.available" active-text="有效" inactive-text="暂停"></el-switch>
          </el-form-item>
          <el-form-item label="显示顺序">
            <el-input-number v-model="advForm.sort"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="handleSave" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'
const initForm = { id: '', coverUrl: '', targetUrl: '', target: '', location: '', time: '', beginTime: '', endTime: '', platform: 1, available: true, sort: 1 }
export default {
  data () {
    return {
      qeuryParam: { kw: '' },
      dialogVisible: false,
      advForm: Object.assign({}, initForm),
      advFormRule: {}
    }
  },
  mounted () {
    this.handleQuery()
  },
  methods: {
    handleQuery () {
      this.$refs.table.search(this.qeuryParam)
    },
    handleRefresh () {
      this.$refs.table.refresh()
    },
    handleEdit (row) {
      this.dialogVisible = true
      if (row) {
        row.time = [row.beginTime, row.endTime]
        this.advForm = Object.assign({}, row)
      } else {
        this.advForm = Object.assign({}, initForm)
      }
    },
    handleSwithAvailable (val, row) {
      const msg = val ? '启用' : '暂停'
      this.$confirm(`是否${msg}`).then(() => {
        this.$put(`/sem-advertisement/available/${row.id}`, qs.stringify({ available: val })).then(res => {
          if (res.code === 0) {
            this.$notify.success(`${msg}成功`)
          } else {
            row.available = !val
          }
        }).catch(() => {
          row.available = !val
        })
      }).catch(() => {
        row.available = !val
      })
    },
    handleDelete (row) {
      this.$confirm('是否删除').then(() => {
        this.$delete(`/sem-advertisement/delete/${row.id}`).then(res => {
          if (res.code === 0) {
            this.$notify.success('删除成功')
            this.handleRefresh()
          }
        })
      })
    },
    handleSave () {
      this.$refs.advForm.validate(valid => {
        if (valid) {
          this.advForm.beginTime = this.advForm.time[0]
          this.advForm.endTime = this.advForm.time[1]
          this.$confirm('是否保存').then(() => {
            this.$post('/sem-advertisement/save', this.advForm).then(res => {
              if (res.code === 0) {
                this.$notify.success('保存成功')
                this.handleRefresh()
                this.dialogVisible = false
              }
            })
          })
        }
      })
    }
  }
}
</script>
