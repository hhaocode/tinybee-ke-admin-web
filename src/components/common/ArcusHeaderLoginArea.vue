<template>
  <div class="login-area-wrapper">
    <ul class="login-area">
      <li>
        <a href="">我的学习</a>
      </li>
      <li>
        <a href="">
          <i class="el-icon-bell"></i>
        </a>
      </li>
      <li>
        <a href="">
          <i :class="cartNum > 0 ? 'el-icon-shopping-cart-full' : 'el-icon-shopping-cart-2'"></i>
        </a>
      </li>
      <li class="user-area-wrapper">
        <a href="" class="header-avator-wrapper">
          <img class="header-avator" src="https://img4.mukewang.com/545865890001495702200220-100-100.jpg" alt="">
        </a>
        <div class="user-area-box">
          drop
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ArcusHeaderLoginArea',
  data () {
    return {
      cartNum: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.login-area {
  li {
    display: inline-block;
    > a {
      display: block;
      padding: 12px 12px;
    }
    &.user-area-wrapper {
      .header-avator-wrapper {
        vertical-align: middle;
        .header-avator {
          width: 32px;
          height: 32px;
          border-color: #4d5559;
          vertical-align: middle;
          margin-top: -5px;
          border-radius: 16px;
        }
      }
      position: relative;
      &:hover {
        .user-area-box {
          display: block;
        }
      }
      .user-area-box {
        display: none;
        position: absolute;
        top: 100%;
        right: 0;
        width: 200px;
        border: 1px solid #4d5559;
        border-radius: 0 0 5px 5px;
      }
    }
  }
}
</style>
