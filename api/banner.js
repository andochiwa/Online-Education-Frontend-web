import request from "~/utils/request";

export default {
  getListBanner() {
    return request({
      url: '/cms/banner',
      method: 'get'
    })
  }
}
