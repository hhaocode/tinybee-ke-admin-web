<template>
  <div class="no-data-wrapper" v-if="noData">
    <img :src="require('@/assets/images/no-data.png')" alt="" srcset="">
    <div class="text">{{text}}</div>
  </div>
</template>

<script>
export default {
  props: {
    noData: {
      type: Boolean,
      default: false
    },
    text: {
      default: ''
    }
  },
  name: 'NoData'
}
</script>

<style lang="scss" scoped>
.no-data-wrapper {
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
  color: #ac9c9c;
}
</style>
