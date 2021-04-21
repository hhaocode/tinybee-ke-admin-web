<template>
  <div>
    <el-select :value="value" @change="handleChange">
      <el-option :label="item.name" v-for="item in dataList" :key="item.id" :value="item.id"></el-option>
    </el-select>
    <div style="padding-top: 20px;">
      <el-image v-if="url" style="width: 120px; height: 120px" :src="url" :preview-src-list="[url]"></el-image>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageSelect',
  props: {
    value: {
    }
  },
  data () {
    return {
      dataList: '',
      dataMap: {},
      url: '',
      load: false
    }
  },
  created () {
    if (!this.load) {
      this.handleInit()
    }
  },
  methods: {
    handleInit () {
      return new Promise((resolve, reject) => {
        this.$get('/material-file/list/image').then(res => {
          this.dataList = res.data || []
          this.dataMap = {}
          this.dataList.forEach(v => {
            this.dataMap[v.id] = v
          })
          this.load = true
          resolve(res)
        })
      })
    },
    handleChange (val) {
      this.$emit('input', val)
      this.url = this.dataMap[val] ? this.dataMap[val].url : ''
    }
  },
  watch: {
    value: function (newVal, oldVal) {
      if (!this.load) {
        this.handleInit().then(res => {
          this.interlVal = newVal
          this.url = this.dataMap[newVal] ? this.dataMap[newVal].url : ''
        })
      } else {
        this.interlVal = newVal
        this.url = this.dataMap[newVal] ? this.dataMap[newVal].url : ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
