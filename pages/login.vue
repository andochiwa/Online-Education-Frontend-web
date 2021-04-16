<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">

        <el-form-item class="input-prepend restyle" prop="email" :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' },{validator: checkEmail, trigger: 'blur'}]">
          <div >
            <el-input type="text" placeholder="邮箱" v-model="user.email"/>
            <i class="iconfont icon-email" />
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="密码" v-model="user.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="LoginUser">
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li><a id="github" class="github" target="_self" href="http://localhost:8005/login/github">
            <svg t="1618575299610" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3133" width="32" height="32"><path d="M512 85.333333C276.266667 85.333333 85.333333 276.266667 85.333333 512a426.410667 426.410667 0 0 0 291.754667 404.821333c21.333333 3.712 29.312-9.088 29.312-20.309333 0-10.112-0.554667-43.690667-0.554667-79.445333-107.178667 19.754667-134.912-26.112-143.445333-50.133334-4.821333-12.288-25.6-50.133333-43.733333-60.288-14.933333-7.978667-36.266667-27.733333-0.554667-28.245333 33.621333-0.554667 57.6 30.933333 65.621333 43.733333 38.4 64.512 99.754667 46.378667 124.245334 35.2 3.754667-27.733333 14.933333-46.378667 27.221333-57.045333-94.933333-10.666667-194.133333-47.488-194.133333-210.688 0-46.421333 16.512-84.778667 43.733333-114.688-4.266667-10.666667-19.2-54.4 4.266667-113.066667 0 0 35.712-11.178667 117.333333 43.776a395.946667 395.946667 0 0 1 106.666667-14.421333c36.266667 0 72.533333 4.778667 106.666666 14.378667 81.578667-55.466667 117.333333-43.690667 117.333334-43.690667 23.466667 58.666667 8.533333 102.4 4.266666 113.066667 27.178667 29.866667 43.733333 67.712 43.733334 114.645333 0 163.754667-99.712 200.021333-194.645334 210.688 15.445333 13.312 28.8 38.912 28.8 78.933333 0 57.045333-0.554667 102.912-0.554666 117.333334 0 11.178667 8.021333 24.490667 29.354666 20.224A427.349333 427.349333 0 0 0 938.666667 512c0-235.733333-190.933333-426.666667-426.666667-426.666667z" fill="#000000" p-id="3134"></path></svg>
          </a></li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'

import login from "@/api/login";
import cookie from 'js-cookie'


export default {
  layout: 'sign',

  data () {
    return {
      //封装登录邮箱和密码对象
      user:{
        email:'',
        password:''
      },
      //用户信息
      loginInfo:{}
    }
  },

  methods: {
    //登录
    LoginUser() {
      // 调用接口进行登录，返回token字符串
      login.loginUser(this.user)
        .then(response => {
          // 校验
          if (response.data.code === 404) {
            this.$message({
              type: 'error',
              message: response.data.message
            })
            return false
          }
          // 获取token字符串放到cookie里面
          //第一个参数cookie名称，第二个参数值，第三个参数作用范围
          cookie.set('token',response.data.data.token,{domain: 'localhost'})

          // 调用接口 根据token获取用户信息，为了首页面显示
          login.getLoginUserInfo()
            .then(response => {
              this.loginInfo = response.data.data.items
              //获取返回用户信息，放到cookie里面
              cookie.set('user_info',this.loginInfo,{domain: 'localhost'})

              //跳转页面
              this.$router.push({
                path: '/'
              })
            })
        })
    },
    // github登陆
    githubLogin() {
      login.getLoginUserInfo()
    },
    checkEmail (rule, value, callback) {
      //debugger
      if (!(/^([a-z0-9_\\.-]+)@([\da-z\\.-]+)\.([a-z\\.]{2,6})$/.test(value))) {
        return callback(new Error('邮箱格式不正确'))
      }
      return callback()
    }
  }
}
</script>
<style>
</style>
