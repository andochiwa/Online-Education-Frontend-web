import request from "@/utils/request";

export default {
  // 条件查询，分页
  getPageCondition(current, limit, courseQuery) {
    return request({
      url: `/eduservice/front-course/condition/${current}/${limit}`,
      method: 'post',
      data: courseQuery
    })
  },
  // 查询所有课程分类
  getSubject() {
    return request({
      url: `/eduservice/subject`,
      method: 'get'
    })
  },
  // 查询课程以及相关联的教师，分类的详细信息
  getAllCourseInfo(courseId) {
    return request({
      url: `/eduservice/front-course/${courseId}`,
      method: 'get'
    })
  }
}
