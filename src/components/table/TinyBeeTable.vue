<template>
  <div class="page-table-wrapper" v-loading="loading">
    <div class="page-table-content">
      <el-table
        :border="border"
        @sort-change="handleSortChange"
        :data="data"
        :show-summary="showSummary"
        :empty-text="emptyText"
      >
        <slot v-bind:rows="data"></slot>
      </el-table>
    </div>
    <div class="page-table-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageParam.page"
        :page-sizes="[2, 5, 10, 20, 50, 100]"
        :page-size="pageParam.size"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :pager-count="5"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TinyBeeTable',
  props: {
    border: {
      type: Boolean,
      default: false
    },
    showSummary: {
      type: Boolean,
      default: false
    },
    tableOption: {
      type: Object,
      default: () => {}
    },
    // queryParam: {
    //   type: Object,
    //   default: () => {}
    // },
    action: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {
      loading: false,
      currentPage: 1,
      pageParam: {
        page: 1,
        size: 10,
        orderBy: ''
      },
      data: [],
      total: 0,
      emptyText: '暂无数据',
      param: {}
    }
  },
  methods: {
    handleSortChange (orderBy) {
      console.log('Order by => ', orderBy)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageParam.size = val
      this.search()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageParam.page = val
      this.search()
    },
    handleMergeParam () {
      return Object.assign({}, this.pageParam, this.param)
    },
    refresh () {
      // this.pageParam.page = 1
      return this.searchAll()
    },
    query (param) {
      this.search(param)
    },
    search (param) {
      this.pageParam.page = 1
      return this.searchAll(param)
    },
    searchAll (param) {
      return new Promise((resolve, reject) => {
        if (param) {
          this.param = param
        }
        this.loading = true
        this.$get(this.action, { params: this.handleMergeParam() }).then(res => {
          const resData = res.data
          this.data = (resData && resData.records) || []
          this.total = (resData && resData.total) || 0
          this.emptyText = '暂无数据'
          this.loading = false
          resolve(resData)
        }).catch(e => {
          this.emptyText = e
          this.loading = false
          reject(e)
        })
      })
      // this.$store.dispatch(this.action, this.handleMergeParam()).then(res => {
      //   this.data = (res && res.records) || []
      //   this.total = (res && res.total) || 0
      //   this.emptyText = '暂无数据'
      //   this.loading = false
      // }).catch(e => {
      //   this.emptyText = e
      //   this.loading = false
      // })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
