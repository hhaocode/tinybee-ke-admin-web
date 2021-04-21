<template>
  <div class="page">
    <div class="page-panel">
      <el-form @submit.native.prevent inline>
        <div>
          <el-form-item label="">
            <el-input v-model="queryParam.kw" clearable placeholder="标题、描述"></el-input>
          </el-form-item>
          <el-form-item><el-button @click="handleQuery"  type="primary">查询</el-button></el-form-item>
        </div>
        <div style="display: block;">
          <el-form-item>
            <el-button @click="handleGoEditor(false)">新建学习路径</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div v-if="paths && paths.length">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" v-for="item in paths" :key="item.id">
            <el-card :body-style="{ padding: '0px', }" style="margin-bottom: 30px; border-radius: 8px; cursor: pointer;">
              <div class="path-item">
                <div class="title">
                  <h3>{{item.title}}</h3>
                </div>
                <div class="stat">
                  <span>{{item.courseCnt}}门课</span>
                </div>
                <p class="desc">
                  {{item.description}}
                </p>
                <div>
                  <el-button type="warning" @click="handleGoEditor(item)">编辑</el-button>
                  <el-button type="text">上架</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div>
          <div style="width:750px;margin:auto;"><el-divider>更多正在规划中</el-divider></div>
        </div>
      </div>
      <div>
        <no-data :no-data="!(paths && paths.length)" text="暂无学习路径"></no-data>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      paths: [],
      queryParam: {
        kw: ''
      }
    }
  },
  mounted () {
    this.handleQuery()
  },
  methods: {
    handleQuery () {
      this.$get('/cms/learning-path/listPath', { params: this.queryParam }).then(res => {
        this.paths = res.data || []
      })
    },
    handleGoEditor (row) {
      const query = {}
      if (row) {
        query.pathId = row.id
      }
      this.$router.push({ path: '/course-center/learning-path-editor', query: query })
    }
  }
}
</script>

<style lang="scss" scoped>
[class*=el-col-] {
  float: left;
  // display: inline-block;
  transition: 0.5s;
  &:hover {
    transform: translateY(-8px);
    transition: 0.5s;
  }
}
.path-item {
  padding: 20px;
  border-radius: 8px;
  .title {
    font-size: 24px;
    font-weight: 500;
    color: #4c4c4c;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    -webkit-transition: color 0.2s linear;
    transition: color 0.2s linear;
  }
  .stat {
    font-size: 15px;
    font-weight: 400;
    color: #888;
    padding-top: 10px;
    font-size: 12px;
  }
  .desc {
    margin-top: 10px;
    line-height: 24px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 10px;
  }
}
</style>
