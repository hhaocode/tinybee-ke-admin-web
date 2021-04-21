<template>
  <div class="grid-wrapper">
      <slot name="header"></slot>
      <div class="grid-content">
        <el-row :gutter="gutter">
          <el-col :span="span" v-for="(grid, index) in grids" :key="index">
            <slot v-bind:grid="grid"></slot>
          </el-col>
        </el-row>
      </div>
      <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'GridWrapper',
  props: {
    gutter: {
      type: Number,
      default: () => 10
    },
    col: {
      type: Number,
      default: () => 1
    },
    grids: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    span () {
      return 24 / this.col
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-wrapper {
  margin: 36px auto;
  .grid-content {
    padding-top: 20px;
  }
}
</style>
