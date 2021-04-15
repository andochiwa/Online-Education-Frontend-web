import request from "@/utils/request";

export default {
  // 登陆账户
  loginUser(userInfo) {
    return request({
      url: '/edu-center/login',
      method: 'post',
      data: userInfo
    })
  },
  // 根据token获取用户信息
  getLoginUserInfo() {
    return request({
      url: '/edu-center/user-info',
      method: 'get',
    })
  }
}
