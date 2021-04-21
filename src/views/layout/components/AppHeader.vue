<template>
  <el-header height="90px" class="app-header">
    <div :class="['header-wrapper',{'has-nav-tab': hasNavTab}]">
      <div class="header-container clearfix">
        <div class="f-l">
          <i
          :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold','toggle-fold pointer']"
            @click="toggleMenu"
          ></i>
          <div class="header-breadcrumb-nav">
            <el-breadcrumb separator="/">
              <!-- :to="{ path: breadcrumb.path } -->
              <el-breadcrumb-item v-for="breadcrumb in breadcrumbNav" :to="{ path: breadcrumb.path }" :key="breadcrumb.id">{{breadcrumb.title}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
        <div class="f-r">
          <div class="right-row">
            <!-- <router-link to="/mall">商城</router-link> -->
            <i class="el-icon-setting pointer" @click="toggleSetting"></i>
            <!-- <router-link to="/user-info" class="adminstrator-area">
              <span>
                {{administrator.username}}
              </span>
              <img class="avator" src="https://img4.mukewang.com/545865890001495702200220-100-100.jpg" alt="">
            </router-link> -->
            <el-dropdown>
              <span class="el-dropdown-link">
                <div class="adminstrator-area">
                  <img class="avator" src="https://img4.mukewang.com/545865890001495702200220-100-100.jpg" alt="">
                  <span>
                    {{administrator.username}}
                  </span>
                </div>
                <!-- 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> -->
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link to="/user-info">个人信息</router-link>
                </el-dropdown-item>
                <!-- <el-dropdown-item disabled>双皮奶</el-dropdown-item> -->
                <el-dropdown-item divided>
                  <el-button type="text" @click="logout" icon="el-icon-switch-button">登出</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
      <AppNavTab />
    </div>
  </el-header>
</template>

<script>
import { mapState } from 'vuex'
import AppNavTab from './AppNavTab'
export default {
  name: 'AppHeader',
  components: { AppNavTab },
  computed: {
    ...mapState({
      hasNavTab: state => state.app.hasNavTab,
      isCollapse: state => state.app.isCollapse,
      administrator: state => state.app.administrator,
      breadcrumbNav: state => state.app.breadcrumbNav
    })
  },
  data () {
    return {
    }
  },
  methods: {
    toggleMenu () {
      this.$store.dispatch('app/toggleMenu')
    },
    toggleSetting () {
      this.$store.dispatch('app/toggleSetting')
    },
    logout () {
      this.$confirm('是否注销, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('app/logout')
      }).catch(() => {
        this.$notify({
          type: 'info',
          message: '已取消注销'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
$administratorAreaHeight: 32px;
.app-header {
  padding: 0;
  .header-wrapper {
    height: 100%;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
    &.has-nav-tab {
      .header-container {
        height: $headerHeight;
      }
    }
    .header-container {
      height: 100%;
      border-bottom: 1px solid #f6f6f6;
      .header-breadcrumb-nav {
        display: inline-block;
        margin-left: 8px;
      }
      .toggle-fold {
        font-size: 18px;
        margin-top: 18px;
        margin-left: 10px;
        &:hover {
          color: $mainColor;
        }
      }
      .right-row {
        height: $headerHeight;
        line-height: $headerHeight;
        display: flex;
        align-items: center;
        padding-right: 8px;
        > * {
          margin-left: 12px;
        }
        .adminstrator-area {
          display: flex;
          height: $administratorAreaHeight;
          // vertical-align: middle;
          align-items: center;
          color: $mainColor;
          &:hover {
            cursor: pointer;
          }
          // justify-content: center;
          .avator {
            width: $administratorAreaHeight;
            height: $administratorAreaHeight;
            border-color: #4d5559;
            // margin-top: -8px;
            // display: inline-block;
            border-radius: 50%;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
