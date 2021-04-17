import request from "@/utils/request";

export default {
  // 获取视频凭证
  getPlayAuth(id) {
    return request({
      url: `/edu-vod/video/${id}`,
      method: 'get'
    })
  }
}
