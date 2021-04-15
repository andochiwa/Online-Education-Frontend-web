import request from "@/utils/request";

export default {
  // 注册发送邮件验证码
  sendMailCode(email) {
    return request({
      url: `/edu-center/email/${email}`,
      method: 'get'
    })
  },
  // 注册
  register(memberInfo) {
    return request({
      url: '/edu-center/register',
      method: 'post',
      data: memberInfo
    })
  }
}
