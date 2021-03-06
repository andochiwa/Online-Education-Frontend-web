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
  },
  // 更新订单状态
  updateOrder(orderId) {
    return request({
      url: `/order/pay-log/${orderId}`,
      method: 'put'
    })
  },
  // 根据课程id和用户id查询
  isBuyCourse(courseId) {
    return request({
      url: `/order/order/course-status/${courseId}`,
      method: 'get'
    })
  }
}
