<template>
  <el-main class="app-main" id="_app-main">
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper" class="el-scrollbar-no-x">
      <transition name="fade-transform" mode="out-in">
        <keep-alive exclude="courseMasterEdit">
        <router-view class="main-content"/>
        </keep-alive>
      </transition>
    </el-scrollbar> -->
    <router-view class="main-content"/>
  </el-main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AppMain',
  computed: {
    ...mapState({
      // transitionName: state => state.app.transitionName
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
