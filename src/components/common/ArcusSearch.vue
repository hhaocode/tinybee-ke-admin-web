<template>
  <div :class="['search-container', classOption[type || 'defult']]">
    <div class="search-wrapper">
      <el-input size="large" @focus="handleFocus" ref="searchInput">
        <el-button class="search-btn" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div v-if="searchDropdown" class="search-dropdown">
      111
    </div>
  </div>
</template>

<script>
import { getStyle } from '@/utils/dom'
const classOption = {}
export default {
  name: 'ArcusSearch',
  props: {
    type: {
      type: String,
      default: () => 'defult'
    }
  },
  data () {
    return {
      classOption: classOption,
      domain: '1',
      kw: '',
      searchDropdown: false
    }
  },
  methods: {
    handleFocus () {
      const inputWidth = getStyle(this.$refs.searchInput.$el).width
      console.log(inputWidth)
    }
  }
}
</script>

<style lang="scss" scoped>
$mainColor: #1DD39A;
.search-wrapper {
  ::v-deep .search-btn {
    background-color: $mainColor;
    color: #ffffff;
    border: 1px solid $mainColor;
    border-radius: 0;
  }
}
</style>
