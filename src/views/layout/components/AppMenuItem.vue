<template>
    <div v-if="item">
        <el-menu-item v-if="!item.children" :index="item.path">
            <i v-if="item.icon" :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
        </el-menu-item>
        <el-submenu popper-append-to-body v-else :index="item.id + ''">
            <template slot="title">
                <i v-if="item.icon" :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
            </template>
            <AppMenuItem
                v-for="route in item.children"
                :key="route.id"
                :item="route"
                :path="route.path"
            />
        </el-submenu>
    </div>
</template>

<script>
export default {
  name: 'AppMenuItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  }
}
</script>
