<template>
  <div class="page-panel" style="padding-bottom: 15px; margin-bottom: 10px;">
      <el-page-header @back="goBack" :title="title" :content="content"></el-page-header>
  </div>
</template>

<script>
export default {
  name: 'RemoveCurrentToTarget',
  methods: {
    goBack () {
      this.$store.dispatch('app/removeVisit', this.$route).then(() => {
        this.$router.replace(this.targetPage)
      })
    }
  },
  props: {
    title: {
      default: '返回'
    },
    content: {
      default: '内容'
    },
    targetPage: {
      type: Object,
      default: () => {
        return {
          name: 'default'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
