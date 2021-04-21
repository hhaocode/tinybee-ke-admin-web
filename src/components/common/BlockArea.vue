<template>
  <div class="block-area">
    <div class="title">
      <span class="label"></span>
      <span>{{title}}</span>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlockArea',
  props: {
    title: { default: '标题' }
  }
}
</script>

<style lang="scss" scoped>

</style>
