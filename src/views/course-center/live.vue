<template>
  <div class="page">
    <div class="page-panel">
      <div>
        <el-form inline @submit.native.prevent>
          <el-form-item label="关键字">
            <el-input v-model="queryForm.kw" placeholder="标题、副标题"></el-input>
          </el-form-item>
          <el-form-item label="直播状态">
            <el-select v-model="queryForm.status">
              <el-option :value="1" label="待直播"></el-option>
              <el-option :value="2" label="正在直播"></el-option>
              <el-option :value="3" label="直播结束"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间范围">
            <el-date-picker
              v-model="queryForm.rangeDateTime"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <tiny-bee-table ref="table" action="/cms/live/page">
          <template slot-scope="{rows}">
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="副标题" prop="subtitle"></el-table-column>
            <el-table-column label="讲师" prop=""></el-table-column>
            <el-table-column label="类型" prop="type"></el-table-column>
            <el-table-column label="封面" prop="coverUrl">
              <template slot-scope="{row}">
                <el-image :src="row.coverUrl" :preview-src-list="rows.map(v => v.coverUrl)" style="height: 60px; width: 120px;"></el-image>
              </template>
            </el-table-column>
            <el-table-column label="开始时间" prop="startTime"></el-table-column>
            <el-table-column label="结束时间" prop="endTime"></el-table-column>
            <el-table-column label="状态" prop="status"></el-table-column>
            <el-table-column label="视频是否已转码" prop="hasTranscoding"></el-table-column>
            <el-table-column label="音视频" prop="vodId"></el-table-column>
            <el-table-column label="关联课程" prop="periodId"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-dropdown trigger="click">
                  <el-button type="primary">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="handleEdit(scope.row)">编辑</el-dropdown-item>
                    <el-dropdown-item @click.native="handleGoLive(scope.row)">去直播</el-dropdown-item>
                    <!-- <el-dropdown-item @click.native="handlePlayback">推荐至......</el-dropdown-item> -->
                    <el-dropdown-item @click.native="handlePlayback(scope.row)">直播回放</el-dropdown-item>
                    <el-dropdown-item @click.native="handleDelete(scope.row)">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </template>
        </tiny-bee-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryForm: {
        kw: '',
        status: '',
        startTime: null,
        endTime: null,
        rangeDateTime: null
      }
    }
  },
  mounted () {
    this.handleQuery()
  },
  methods: {
    handleEdit () {
      this.$message.info('编辑')
    },
    handleGoLive () {
      this.$message.info('去直播')
    },
    handleRecommend () {
      this.$message.info('推荐')
    },
    handleDelete () {
      this.$message.info('删除')
    },
    handlePlayback () {
      this.$message.info('回放')
    },
    handleQuery () {
      this.$refs.table.search(this.queryForm)
    }
  },
  watch: {
    'queryForm.rangeDateTime': function (newVal) {
      if (newVal && newVal.length) {
        this.queryForm.startTime = newVal[0]
        this.queryForm.endTime = newVal[1]
      } else {
        this.queryForm.startTime = null
        this.queryForm.endTime = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
