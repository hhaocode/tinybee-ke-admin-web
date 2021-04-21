<template>
  <div class="page">
    <div class="page-panel">
      <div>
        <div class="flex row space-between">
          <div>
            <el-button type="primary" @click="handleEdit('')">添加文章</el-button>
          </div>
          <div>
            <el-form :inline="true" @submit.native.prevent>
              <el-form-item>
                <el-input placeholder="请输入标题" v-model="param.title"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="handleQuery" type="primary">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div style="">
        <div></div>
        <div>
          <tiny-bee-table ref="table" action="/material/article/page" :border="false">
            <template slot-scope="{rows}">
              <el-table-column prop="title" label="文章标题"></el-table-column>
              <el-table-column prop="coverUrl" label="封面">
                <template slot-scope="{row}">
                  <el-image
                    style="width: 120px; height: 50px"
                    :src="row.coverUrl"
                    :preview-src-list="rows.map(v => v.coverUrl)"
                    fit="fill"></el-image>
                </template>
              </el-table-column>
              <el-table-column prop="subtitle" label="副标题"></el-table-column>
              <el-table-column prop="summary" label="文章总结"></el-table-column>
              <el-table-column label="操作" width="180">
                <template slot-scope="{row}">
                  <div>
                    <el-button type="text" @click="handlePreview(row)">
                        <el-link type="primary" :underline="false">预览</el-link>
                    </el-button>
                    <el-button type="text" @click="handleEdit(row.id)">
                        <el-link type="warning" :underline="false">编辑</el-link>
                    </el-button>
                    <el-button type="text" @click="handleDelete(row)">
                        <el-link type="danger" :underline="false">删除</el-link>
                    </el-button>
                    <!-- 更多 -->
                  </div>
                </template>
              </el-table-column>
            </template>
          </tiny-bee-table>
        </div>
      </div>
    </div>
    <el-dialog :title="current.title" :visible.sync="preViewVisible" :close-on-click-modal="false" width="1080px">
      <div>
        <div class="block-area">
          <div class="title">
            <span class="label"></span>
            <span>文章内容</span>
          </div>
          <div class="content">
            <div>
              <div v-html="current.content"></div>
            </div>
          </div>
        </div>
        <el-divider v-if="current.freeContent"></el-divider>
        <div class="block-area" v-if="current.freeContent">
          <div class="title">
            <span class="label"></span>
            <span>试看内容</span>
          </div>
          <div class="content">
            <div>
              <div v-html="current.freeContent"></div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button @click="preViewVisible = false">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      param: {
        title: ''
      },
      current: { title: '', content: '', freeContent: '' },
      preViewVisible: false
    }
  },
  mounted () {
    this.handleQuery()
  },
  methods: {
    handleQuery () {
      this.$refs.table.search(this.param)
    },
    handleRefresh () {
      this.$refs.table.refresh()
    },
    handleEdit (id) {
      if (id) {
        this.$router.push({ path: `/material-manage/article-edit/${id}` })
      } else {
        this.$router.push({ path: '/material-manage/article-edit' })
      }
    },
    handlePreview (data) {
      this.current = data
      this.preViewVisible = true
    },
    handleDelete (data) {
      this.$confirm(`是否删除【${data.title}】`, '提示').then(() => {
        this.$delete(`/material/article/${data.id}`).then(res => {
          if (res.code === 0) {
            this.$notify.success('删除成功')
            this.handleRefresh()
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  text-align: left;
}
</style>
