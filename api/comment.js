import request from "@/utils/request";

export default {
  // 获取评论信息
  getComment(courseId) {
    return request({
      url: `/eduservice/edu-comment/${courseId}`,
      method: 'get'
    })
  },
  // 添加评论信息
  saveComment(courseId, commentInfo) {
    return request({
      url: `/eduservice/edu-comment/${courseId}`,
      method: 'post',
      data: commentInfo
    })
  }
}
