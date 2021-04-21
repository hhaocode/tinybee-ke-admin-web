<template>
  <el-select :value="value" :filterable="filterable" placeholder="请选择"
  @input="handleChange"
  >
    <el-option v-if="all" label="请选择讲师" value=""></el-option>
    <el-option
      v-for="lecturer in lecturers"
      :key="lecturer.id"
      :label="lecturer.name"
      :value="lecturer.id"
      >
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'LecturerSelect',
  props: {
    value: {
    },
    all: {
      default: false
    },
    filterable: {
      default: true
    }
  },
  mounted () {
    this.$get('/platform/lecturer/list').then(res => {
      this.lecturers = res.data || []
    })
  },
  data () {
    return {
      lecturers: []
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
      this.$emit('input', val)
    }
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>

</style>
