<template>
  <div class="page">
    <div class="page-panel">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="短信" name="sms">
          <div>
            登录  注册  找回密码  其他校验
          </div>
        </el-tab-pane>
        <el-tab-pane label="点播" name="vod">点播</el-tab-pane>
        <el-tab-pane label="直播" name="live">直播</el-tab-pane>
        <el-tab-pane label="对象存储" name="oss">对象存储</el-tab-pane>
        <el-tab-pane label="支付设置" name="pay">支付设置</el-tab-pane>
        <el-tab-pane label="消息推送" name="push">消息推送</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'sms'
    }
  },
  methods: {
    handleClick () {
      console.log(this.activeName)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
