<template>
  <el-drawer
    title="Arcus Control Center"
    :visible="settingDrawer"
    :direction="direction"
    :before-close="handleClose">
  <span>我来啦!</span>
</el-drawer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AppSetting',
  computed: {
    ...mapState({
      settingDrawer: state => state.app.settingDrawer
    })
  },
  data () {
    return {
      direction: 'rtl'
    }
  },
  methods: {
    handleClose (done) {
      console.log(arguments)
      // done()
      this.$store.dispatch('app/toggleSetting')
    }
  }
}
</script>

<style>

</style>
