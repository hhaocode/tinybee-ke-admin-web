<template>
  <el-dialog :visible.sync="visible" :title="title" :close-on-click-modal="false" @closed="onClose" width="1000px">
    <div style="height: 540px;">
      <div class="flex column _1 v-100" style="">
        <div class="flex space-between">
          <div>
            <el-button disabled>上传</el-button>
          </div>
          <div class="flex row">
            <el-button @click="handleSearch" icon="el-icon-refresh" style="margin-right: 10px;"></el-button>
            <el-input>
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
        </div>
        <div class="flex space-between _1" style="padding: 15px;">
          <div class="group-nav " style="width: 200px;">
            <div>
              <el-link :unline="false">全部分组</el-link>
            </div>
            <div class="flex column _1" style="max-height: 400px; padding-top: 15px;">
              <el-tree v-loading="groupLoading" :data="groups" :props="defaultProps" :render-content="renderContent" @node-click="handleNodeClick"></el-tree>
            </div>
          </div>
          <div class="content">
            <el-table ref="table"  style="width: 100%; height: 100%;" max-height="440px" :data="tableData.records" highlight-current-row @current-change="handleCurrentChange" v-loading="loading">
                <el-table-column :key="0" type="index" label="序号"></el-table-column>
                <el-table-column :key="1" prop="title" :label="colTitles[type]" show-overflow-tooltip>
                  <template slot-scope="{row}">
                    <div>
                      {{row.title}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column :key="10" v-if="type === 1">
                  <template slot-scope="{row}">
                    <el-image :src="row.url" :preview-src-list="tableData.records.map(v => v.url)" style="width: 60px; height: 40px;"></el-image>
                  </template>
                </el-table-column>
                <el-table-column v-if="type !== 1 && type !== 4 && type !== 5" :key="2" prop="duration" label="时长" show-overflow-tooltip>
                  <span slot-scope="{row}">{{ row.duration | secondToTime }}</span>
                </el-table-column>
                <el-table-column :key="3" prop="size" label="大小" v-if="type !== 5" width="100" show-overflow-tooltip>
                  <template slot-scope="{row}">
                    <span>{{row.size | fileSize}}</span>
                  </template>
                </el-table-column>
                <el-table-column :key="4" prop="createTime" label="上传时间" width="130" show-overflow-tooltip></el-table-column>
            </el-table>
            <div class="page-wrapper">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentPageChange"
                :current-page="param.page"
                :page-sizes="[5, 10, 15, 20, 50, 100, 200, 300, 400]"
                :page-size="param.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer">
      <el-button @click="onConfirm">确认</el-button><el-button @click="current = null" icon="el-icon-remove-outline">清除</el-button><el-button @click="onCancle">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  data () {
    return {
      title: '',
      visible: false,
      current: null,
      type: 1,
      colTitles: {
        1: '图片',
        2: '音频',
        3: '视频',
        4: '文件',
        5: '标题'
      },
      groups: [{ id: '', name: '全部' }],
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      tableData: {
        records: [],
        total: 0
      },
      param: {
        groupId: '',
        type: 1,
        size: 10,
        page: 1
      },
      loading: false,
      groupLoading: false
    }
  },
  mounted () {
    // this.initData()
  },
  methods: {
    handleSizeChange (size) {
      this.param.page = 1
      this.param.size = size
      this.handleSearch()
    },
    handleCurrentPageChange (current) {
      this.param.page = current
      this.handleSearch()
    },
    handleCurrentChange (val) {
      this.current = val
      console.log(val)
    },
    onConfirm () {
      this._confirm && typeof this._confirm === 'function' && this._confirm(this.current)
      this.visible = false
    },
    onClose () {
      this._close && typeof this._close === 'function' && this._close()
    },
    onCancle () {
      this._cancle && typeof this._cancle === 'function' && this._cancle(this.current)
      this.visible = false
    },
    _refreshData () {
      // colTitle:
      // 初始化数据
      // 变化数据
      this.initData()
    },
    handleNodeClick (data) {
      this.param.groupId = data.id
      this.param.size = 10
      this.param.page = 0
      this.handleSearch()
    },
    renderContent (h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <i class="fa fa-folder"></i>
          <span>{node.label}</span>
          <span></span>
        </span>)
    },
    initData () {
      // 初始化组
      // this.$get('/cms/material/groupPage', { params: { type: 'video' } }).then(res => {
      //   console.log(res)
      // })
      // 分组
      // 图片默认分组 全部 '', '', 1 音视频封面 2 富文本 3 课程封面 4 banner图 5 广告 5 图标
      this.groupLoading = true
      this.$get(`/material/group/list/${this.type}`).then(res => {
        this.groups = res.data || []
        this.groupLoading = false
      }).catch(() => {
        this.groupLoading = false
      })
      this.handleSearch()
    },
    handleSearch () {
      this.loading = true
      this.$get('/material/groupPage', { params: this.param }).then(res => {
        this.tableData = res.data || { records: [], total: 0 }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
      // this.$refs.table.search(this.param)
    }
  },
  watch: {
    visible (newVal, oldVal) {
      if (newVal) {
        //
        this.initData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.group-nav {
  border: 1px solid #eee;
  display: flex;
  padding: 15px;
  overflow-y: auto;
  flex-direction: column;
}
::v-deep .fa-folder {
  color: $mainColor;
  margin-right: 10px;
}
.content {
  display: flex;
  flex: 1;
  border: 1px solid #eee;
  border-left: none;
  overflow-y: auto;
  padding: 10px;
  flex-direction: column;
  .page-wrapper {
    padding-top: 15px;
  }
}
</style>
