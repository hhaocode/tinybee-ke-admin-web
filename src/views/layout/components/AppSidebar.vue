<template>
  <el-aside width="auto" :class="['app-sidebar',{'has-logo': hasLogo}]">
    <div v-if="hasLogo">
      <AppLogo :is-collapse="isCollapse"/>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <AppMenu :collapse="isCollapse" :menu-tree="menuTree" :default-active="defaultActive" :unique-opened="uniqueOpened"/>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import AppLogo from './AppLogo'
import AppMenu from './AppMenu'
import { mapState } from 'vuex'
export default {
  name: 'AppSidebar',
  components: { AppLogo, AppMenu },
  computed: {
    ...mapState({
      hasLogo: state => state.app.hasLogo,
      isCollapse: state => state.app.isCollapse,
      menuTree: state => state.app.menuTree,
      defaultActive: state => state.app.defaultActive,
      uniqueOpened: state => state.app.uniqueOpened
    })
  },
  data () {
    return {}
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
</style>
