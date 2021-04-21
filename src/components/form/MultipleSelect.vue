<template>
  <el-select style="width: 500px;" :popper-append-to-body="false" :value="value" popper-class="multiple-select-popper-class" @change="handleChange" multiple >
    <el-option v-for="(val ,idx ) in data" :key="idx" :value="val.id" :label="val.name">
                    <!-- <el-checkbox ></el-checkbox> -->
      <div>
        <span class="el-checkbox__input" :class="{'is-checked' : isChecked(val.id)}"><span class="el-checkbox__inner"></span></span>
        <span>{{val.name}}</span>
     </div>
                    <!-- :label="salesAttributeGroup.id" -->
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'MultipleSelect',
  data () {
    return {}
  },
  props: {
    value: {
      type: [Array, String, Number],
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    isChecked (id) {
      return this.value.indexOf(id) >= 0
    },
    handleChange (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
