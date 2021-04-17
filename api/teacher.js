import request from '@/utils/request'

export default {

  // 教师列表，条件查询，分页
  getTeacherListPage(current, limit) {
    return request({
      url: `/eduservice/teacher/pageTeacher/${current}/${limit}`,
      method: 'get'
    })
  },
  // 根据id获取教师和负责的课程
  getTeacherCourse(id) {
    return request({
      url: `/eduservice/front-teacher/${id}`,
      method: 'get'
    })
  }

}
