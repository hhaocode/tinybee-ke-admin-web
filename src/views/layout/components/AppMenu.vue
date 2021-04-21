<template>
  <el-menu
    :collapse="collapse"
    :collapse-transition="true"
    :default-active="defaultActive"
    class="app-main-menu"
    :background-color="backgroundColor"
    :text-color="textColor"
    :active-text-color="activeTextColor"
    :router="true"
    menu-trigger="click"
    :unique-opened="uniqueOpened"
  >
    <template v-for="menu in menuTree">
      <el-menu-item v-if="!menu.children" :index="menu.path" :key="menu.id">
        <i v-if="menu.icon" :class="menu.icon"></i>
        <span slot="title">{{menu.title}}</span>
      </el-menu-item>
      <el-submenu popper-append-to-body v-else :index="menu.id  + ''" :key="menu.id">
        <template slot="title">
          <i v-if="menu.icon" :class="menu.icon"></i>
          <span slot="title">{{menu.title}}</span>
        </template>
        <AppMenuItem v-for="item in menu.children" :key="item.id" :item="item" :path="item.path" />
      </el-submenu>
    </template>
    <!-- <AppMenuItem v-for="item in menuTree" :key="item.id" :item="item" :path="item.path" /> -->
  </el-menu>
</template>

<script>
import AppMenuItem from './AppMenuItem'
export default {
  name: 'AppMenu',
  props: {
    collapse: {
      type: Boolean,
      default: () => false
    },
    menuTree: {
      type: Array,
      default: () => []
    },
    defaultActive: {
      type: String
    },
    uniqueOpened: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      default: '#2F4050'
    },
    textColor: {
      default: '#a7b1c2'// '#FFFFFF'
    },
    activeTextColor: {
      default: '#1cd39b'
    }
  },
  components: { AppMenuItem },
  data () {
    return {
    }
  }
}
// #00B9B2
</script>

<style>
</style>
