<template>
  <div class="app-logo-wrapper">
      <span v-if="isCollapse">TBK</span>
      <span v-else>小蜜蜂课堂</span>
  </div>
</template>

<script>
export default {
  name: 'AppLogo',
  props: ['isCollapse']
}
</script>

<style lang="scss" scoped>
.app-logo-wrapper {
    height: 80px;
    font-size: 20px;
    text-align: center;
    display: block;
    line-height: 80px;
    color: #ffffff;
    background-color: #253442;
}
</style>
