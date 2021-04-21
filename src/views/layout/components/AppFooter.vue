<template>
  <el-footer height="30px" v-if="hasFooter">
    <div class="footer-wrapper">footer</div>
  </el-footer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AppFooter',
  computed: {
    ...mapState({
      hasFooter: state => state.app.hasFooter
    })
  }
}
</script>

<style lang="scss" scoped>
.footer-wrapper {
  color: #e8e8e8;
}
</style>
