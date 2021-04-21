export default {
  methods: {
    initDeptTree () {
      return this.$store.dispatch('permission/getDeptTree')
    }
  }
}
