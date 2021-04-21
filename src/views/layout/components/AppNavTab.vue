<template>
  <div class="nav-wrapper" v-if="hasNavTab">
    <swiper :options="swiperOption" class="nav-tab-wrap">
      <swiper-slide v-for="(item, index) in visitedViews" :key="index" >
        <div @contextmenu.prevent="onContextmenu($event, index, item)">
          <router-link
            ref="nav"
            :class="['nav-tab', {'active': item.name === $route.name}]"
            :to="item.fullPath"
            tag="span"

          >
            <i class="point"></i>
            <span>{{menuTreeMap[item.name] && menuTreeMap[item.name].title ||  item.title }}</span>
            <i v-if="item.name !== 'Dashboard'" class="el-icon-close" @click.prevent.stop="closeVisit(item)"></i>
          </router-link>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import closeVisit from '@/mixins/closeVisit'
import swiper from '@/mixins/swiper'
export default {
  name: 'AppNavTab',
  mixins: [swiper, closeVisit],
  computed: {
    ...mapState({
      hasNavTab: state => state.app.hasNavTab,
      visitedViews: state => state.app.visitedViews,
      menuTreeMap: state => state.app.menuTreeMap
    })
  },
  methods: {
    // renderTitle (item) {
    //   menuTreeMap[item.name]
    // },
    consleItem (item) {
      console.log(item)
      return ''
    },
    onContextmenu (event, index, item) {
      const items = []
      if (index !== 0) {
        items.push({
          label: '关闭当前',
          icon: 'el-icon-close',
          onClick: () => {
            this.$store.dispatch('app/removeVisit', item).then(res => {
              this.$router.replace({ name: res[res.length - 1].name }).catch(e => {})
            })
          }
        })
      }
      items.push({
        label: '关闭所有',
        icon: 'el-icon-error',
        onClick: () => {
          this.$store.dispatch('app/removeAllVisit').then(() => {
            this.$router.replace({ name: 'Dashboard' }).catch(e => {})
          })
        }
      }
      )
      this.$contextmenu({
        items,
        event,
        customClass: 'app-nav-tab-menu',
        zIndex: 3,
        minWidth: 140
      })
      return false
    }
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        initialSlide: 0,
        effect: 'slide',
        spaceBetween: 1,
        preventClicks: false,
        freeMode: true,
        mousewheel: {
          sensitivity: 1.5
        }
      }
    }
  }
}
</script>

<style lang="scss">
// .app-nav-tab-menu {
// }
</style>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
$active: #f6f6f6;
.nav-wrapper {
  background: #ffffff;
  height: 36px;
  box-sizing: border-box;
  border-bottom: 1px solid $active;
  ::v-deep .swiper-slide {
    width: auto;
  }
  .nav-tab {
    color: #666666;
    height: 36px;
    line-height: 36px;
    box-sizing: border-box;
    display: inline-block;
    min-width: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    border-right: 1px solid $active;
    vertical-align: top;
    padding-left: 20px;
    padding-right: 30px;
    position: relative;
    font-size: 14px;
    .point {
      margin-right: 4px;
      display: inline-block;
      visibility: hidden;
      height: 8px;
      width: 8px;
      border-radius: 50%;
    }
    &:hover {
      background: $active;
      cursor: pointer;
      .point {
        visibility: visible;
        background-color: #ffffff;
      }
      .el-icon-close {
        visibility: visible;
      }
    }
    &.active {
      background: $active;
      color: #000000;
      .point {
        visibility: visible;
        background-color: $mainColor;
      }
    }
    .el-icon-close {
      position: absolute;
      visibility: hidden;
      top: 4px;
      right: 4px;
      &:hover {
        border-radius: 50%;
        background-color: $mainColor;
        color: #ffffff;
      }
    }
  }
}
</style>
