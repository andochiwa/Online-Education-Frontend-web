import request from "@/utils/request";

export default {
  // 创建订单
  createOrder(courseId) {
    return request({
      url: `/order/order/${courseId}`,
      method: 'post'
    })
  },
  // 查询订单
  getOrder(orderId) {
    return request({
      url: `/order/order/${orderId}`,
      method: 'get'
    })
  }
}
