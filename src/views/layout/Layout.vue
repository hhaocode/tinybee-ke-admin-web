<template>
  <el-container class="app-wrapper" v-loading="loading">
    <AppSidebar />
    <el-container direction="vertical">
      <AppHeader />
      <AppMain />
      <AppFooter/>
    </el-container>
    <AppSetting />
  </el-container>
</template>

<script>
import AppSidebar from './components/AppSidebar'
import AppMain from './components/AppMain'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import AppSetting from './components/AppSetting'
export default {
  name: 'Layout',
  components: { AppSidebar, AppMain, AppHeader, AppFooter, AppSetting },
  watch: {
    $route (to) {
      this.addVisit(to)
    }
  },
  mounted () {
    this.loading = true
    this.initMainMenu().then(res => {
      if (this.$route.name) {
        this.addVisit(this.$route)
      }
      this.loading = false
    }).catch(() => {
      this.loading = false
    })
  },
  methods: {
    initMainMenu () {
      return this.$store.dispatch('app/initMenuTree')
    },
    addVisit (route) {
      this.$store.dispatch('app/addVisit', route)
    }
  },
  data () {
    return {
      loading: false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

</style>
