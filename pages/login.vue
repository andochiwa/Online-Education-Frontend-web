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
          <input type="button" class="sign-in-button" value="登录" @click="LoginUser()">
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li><a id="wechat" class="wechat" target="_blank" href="http://qy.free.idcfengye.com/api/ucenter/weixinLogin/login"><i class="iconfont icon-wechat"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
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
    checkEmail (rule, value, callback) {
      //debugger
      if (!(/^1[34578]\d{9}$/.test(value))) {
        return callback(new Error('邮箱格式不正确'))
      }
      return callback()
    }
  }
}
</script>
<style>
</style>
