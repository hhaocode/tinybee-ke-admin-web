<template>
  <el-scrollbar class="login-scrollbar" wrap-class="scrollbar-wrapper">
    <div class="login-wrapper" @keydown.enter="login">
      <el-form class="login-form" :model="form" ref="loginForm" :rules="checkRules" size="large">
        <el-form-item prop="username">
          <el-input placeholder="用户名" v-model="form.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="密码" v-model="form.password" prefix-icon="el-icon-lock" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-link>测试账号: test/test</el-link>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" @click="login" type="primary" v-loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: '',
        type: 'PWD'
      },
      loading: false,
      checkRules: {
        username: [
          {
            required: true, message: '用户名', trigger: 'change'
          }
        ],
        password: [
          {
            required: true, message: '密码', trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.loading = true
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('app/login', this.form).then(res => {
            console.log(res)
            if (res.code === 0) {
              this.$router.replace('/')
            }
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.loading = false
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-scrollbar {
  background-color: #3C3F41;
  height: 100vh;
  .login-wrapper {
    // height: 900px;
    width: 450px;
    // background-color: #2d3a4b;
    padding-top: 160px;
    margin: auto;
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
