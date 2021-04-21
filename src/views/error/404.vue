<template>
  <div>404
    <div>
      <el-button @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'noFound',
  methods: {
    handleBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
