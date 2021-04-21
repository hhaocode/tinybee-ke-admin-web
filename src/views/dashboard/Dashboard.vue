<template>
  <div class="page">
      <div class="home-block">
        <el-row>
          <el-col :md="16">
            <div>
              <div class="flex">
                <div class="flex">
                  <div>头像</div>
                  <div>
                    <div>{{user.username}}</div>
                    <div><span>登录名：</span><span>{{user.username}}</span></div>
                    <div></div>
                    <div>
                      <el-button icon="el-icon-time" type="text">操作日志</el-button>
                    </div>
                  </div>
                </div>
                <div>
                  <div>昨日订单<span>10</span>笔</div>
                  <div>本月新增用户<span>10</span>个</div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :md="8">
            <div class="flex">
              <div>音视频数量</div>
              <div>文档</div>
              <div>浏览总量</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-row :gutter="30">
          <el-col :md="12">
            <div class="home-block">
              <div>浏览分析统计</div>
            </div>
          </el-col>
          <el-col :md="12">
            <div class="home-block">
              <div>全天浏览分析</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="home-block">
        <div>订单分析</div>
        <div>
          <div>今日收入</div>
          <div>今日付费用户</div>
          <div>总付费用户</div>
        </div>
      </div>
      <div class="home-block">
        <div>常用功能</div>
      </div>
      <div class="home-block">
        资料下载
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapState({
      user: state => state.app.administrator
    })
  }
}
</script>

<style lang="scss" scoped>
.home-block {
  border-radius: 10px;
  background: #fff;
  margin-bottom: 20px;
  padding: 20px;
  &:last-child {
    // margin-bottom: 10px;
  }
}
.page {
  padding: 20px;
}
</style>
