<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="#" title="在线教育">
            <img src="@/assets/img/logo.png" width="100%" alt="在线教育">
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <nuxt-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </nuxt-link>
            <nuxt-link to="/course" tag="li" active-class="current">
              <a>课程</a>
            </nuxt-link>
            <nuxt-link to="/teacher" tag="li" active-class="current">
              <a>名师</a>
            </nuxt-link>
          </ul>
          <ul class="h-r-login">
            <li v-if="!loginInfo.id" id="no-login">
              <nuxt-link to="/login" title="登录">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </nuxt-link>
              |
              <nuxt-link to="/register" title="注册">
                <span class="vam ml5">注册</span>
              </nuxt-link>
            </li>
            <li v-else id="is-login-one" class="mr10">
              <a id="headerMsgCountId" href="#" title="消息">
                <em class="icon18 news-icon">&nbsp;</em>
              </a>
              <q class="red-point" style="display: none">&nbsp;</q>
            </li>
            <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
              <a @click="dialogUserVisible = true" title>
                <img
                  :src="loginInfo.avatar"
                  width="30"
                  height="30"
                  class="vam picImg"
                  alt
                >
                <span id="userName" class="vam disIb">{{ loginInfo.nickName }}</span>
              </a>
              <a href="javascript:void(0);" title="退出" @click="logout()" class="ml5">退出</a>
            </li>
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>

          <aside class="h-r-search">
              <label class="h-r-s-box">
                <input type="text" placeholder="输入你想学的课程" v-model="courseName" value>
                <nuxt-link :to="{path: '/course', query: {courseName: courseName}}">
                  <button type="submit" class="s-btn">
                    <em class="icon18">&nbsp;</em>
                  </button>
                </nuxt-link>
              </label>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    <!-- /公共头引入 -->

    <!--  用户信息修改框开始  -->
    <el-dialog :before-close="beforeClose" title="收货地址" :visible.sync="dialogUserVisible">
      <el-form :model="loginInfo">
        <el-form-item label="昵称" label-width="120px">
          <el-input v-model="loginInfo.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="email" label-width="120px">
          <el-input :disabled="true" v-model="loginInfo.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="password" label-width="120px">
          <el-input type="password" :disabled="loginInfo.email === ''" v-model="loginInfo.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传头像" label-width="120px">
          <el-upload
            class="avatar-uploader"
            action="http://localhost/edu-oss/file"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            accept="image/*"
          >
            <img v-if="avatar" :src="avatar" class="avatar" alt="">
            <img v-else-if="loginInfo.avatar" :src="loginInfo.avatar" class="avatar" alt="">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveUserInfo">确 定</el-button>
      </div>
    </el-dialog>
    <!--  用户信息修改框结束  -->

    <nuxt/>

    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我们</a>|
                <a href="#" title="联系我们" target="_blank">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank">资源下载</a>|
                <span>Email：a1066079469@gmail.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>在线教育网站</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <a href="https://github.com/andochiwa" target="_blank">
                  <svg t="1618575299610" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="3133" width="150" height="150"><path
                    d="M512 85.333333C276.266667 85.333333 85.333333 276.266667 85.333333 512a426.410667 426.410667 0 0 0 291.754667 404.821333c21.333333 3.712 29.312-9.088 29.312-20.309333 0-10.112-0.554667-43.690667-0.554667-79.445333-107.178667 19.754667-134.912-26.112-143.445333-50.133334-4.821333-12.288-25.6-50.133333-43.733333-60.288-14.933333-7.978667-36.266667-27.733333-0.554667-28.245333 33.621333-0.554667 57.6 30.933333 65.621333 43.733333 38.4 64.512 99.754667 46.378667 124.245334 35.2 3.754667-27.733333 14.933333-46.378667 27.221333-57.045333-94.933333-10.666667-194.133333-47.488-194.133333-210.688 0-46.421333 16.512-84.778667 43.733333-114.688-4.266667-10.666667-19.2-54.4 4.266667-113.066667 0 0 35.712-11.178667 117.333333 43.776a395.946667 395.946667 0 0 1 106.666667-14.421333c36.266667 0 72.533333 4.778667 106.666666 14.378667 81.578667-55.466667 117.333333-43.690667 117.333334-43.690667 23.466667 58.666667 8.533333 102.4 4.266666 113.066667 27.178667 29.866667 43.733333 67.712 43.733334 114.645333 0 163.754667-99.712 200.021333-194.645334 210.688 15.445333 13.312 28.8 38.912 28.8 78.933333 0 57.045333-0.554667 102.912-0.554666 117.333334 0 11.178667 8.021333 24.490667 29.354666 20.224A427.349333 427.349333 0 0 0 938.666667 512c0-235.733333-190.933333-426.666667-426.666667-426.666667z"
                    fill="#000000" p-id="3134"></path></svg>
                </a>
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>
<script>
import '~/assets/css/reset.css'
import '~/assets/css/theme.css'
import '~/assets/css/global.css'
import '~/assets/css/web.css'
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import "~/assets/css/pages-weixinpay.css"

import cookie from 'js-cookie'
import login from "@/api/login";

export default {
  data() {
    return {
      token: '',
      loginInfo: {
        id: '',
        age: '',
        avatar: '',
        email: '',
        nickname: '',
        sex: ''
      },
      avatar: '',
      dialogUserVisible: false,
      courseName: ''
    }
  },
  created() {
    // 如果是github登陆，取得token
    this.token = this.$route.query.token

    if (this.$route.query.token) {
      this.githubLogin();
    }

    this.showInfo()
  },
  methods: {
    // 从cookie中获取用户信息
    showInfo() {
      let userInfo = cookie.get('user_info');
      // 转为json对象
      if (userInfo) {
        this.loginInfo = JSON.parse(userInfo)
      }
    },
    // github登陆取得用户信息
    githubLogin() {
      cookie.set('web-token', this.token)
      login.getLoginUserInfo()
        .then(result => {
          //获取返回用户信息，放到cookie里面
          cookie.set('user_info', result.data.data.items)
          this.loginInfo = result.data.data.items
        })
    },
    // 退出登录
    logout() {
      // 清空cookie
      cookie.remove('web-token')
      cookie.remove('user_info')
      this.loginInfo = {}
    },
    // 上传头像成功后
    handleAvatarSuccess(res) {
      this.avatar = res.data.url
      console.log(this.avatar)
    },
    // 用户修改框关闭前
    beforeClose() {
      console.log(this.loginInfo)
      this.dialogUserVisible = false
      this.showInfo()
    },
    saveUserInfo() {
      if (this.avatar) {
        this.loginInfo.avatar = this.avatar
      }
      this.loginInfo.gmtCreate = ''
      this.loginInfo.gmtModified = ''
      login.updateUser(this.loginInfo)
        .then(() => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.dialogUserVisible = false
          cookie.set('user_info', this.loginInfo)
          this.showInfo()
        })
    }
  }
};
</script>
