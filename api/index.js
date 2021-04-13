import request from "~/utils/request";

export default {
  getIndexData() {
    return request({
      url: '/eduservice/index',
      method: 'get'
    })
  }
}
