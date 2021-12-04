<template>
  <div id="login-page">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login-container" label-position="left" label-width="0px">
      <h3 class="login_title">拓奇</h3>
      <el-form-item prop="loginName">
        <el-input type="text" v-model="loginForm.loginName" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%; border: none" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  login
} from 'api/login'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        loginName: '',
        password: ''
      },
      rules: {
        loginName: [
          { required: true, message: '请填写账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { min: 2, max: 11, message: '密码过短，长度因在 2 到 11 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    login () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          login({
            loginName: this.loginForm.loginName,
            password: this.loginForm.password
          }).then((data) => {
            // console.log('user', data);
            const token = data.token
            // 存储token
            this.$store.commit('SET_TOKEN', token)
            // 存储user，优雅一点的做法是token和user分开获取
            this.$store.commit('SET_USER', data)
            // console.log('token', this.$store.state.token);
            // console.log('user', this.$store.state.user);
            this.$router.push({ name: 'welcome' })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #login-page {
    background: url("../assets/images/bg.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  body {
    margin: 0px;
  }

  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
