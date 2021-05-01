<template>
  <div class="ml10 mr10 pt20">
    <div>
      <comment @doSend="doSend($event)" @doChidSend="doChidSend(arguments)" :commentList="commentList"
               :commentNum="commentNum" :avatar="userInfo.avatar" :placeholder="placeholder" :minRows="minRows"
               :maxRows="maxRows"></comment>
    </div>
  </div>
</template>

<script>
import Comment from 'hbl-comment'
import comment from "@/api/comment";
import cookie from "js-cookie";

export default {
  name: 'courseId',
  props: {courseId: String},
  data() {
    return {
      userInfo: {
        id: '',
        avatar: '',
        nickname: '',
      },
      placeholder: "说点什么吧",
      minRows: 4,
      maxRows: 4,
      commentNum: 0,
      commentList: []
    }
  },
  components: {
    Comment
  },
  created() {
    let userInfo = cookie.get('user_info');
    // 转为json对象
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo)
    }
    this.getComment()
  },
  methods: {
    // 获取评论信息
    getComment() {
      comment.getComment(this.courseId)
        .then(result => {
          let val = result.data.data.items
          this.commentList = []
          this.commentNum = val.length
          for (let i = 0; i < val.length; i++) {
            this.commentList.push({
              commentUser: {
                id: val[i].id,
                nickName: val[i].nickname,
                avatar: val[i].avatar
              },
              content: val[i].content,
              createDate: val[i].gmtCreate,
              childrenList: []
            })
            for (let j = 0; j < val[i].children.length; j++) {
              this.commentList[i].childrenList.push({
                commentUser: {
                  id: val[i].children[j].id,
                  nickName: val[i].children[j].nickname,
                  avatar: val[i].children[j].avatar
                },
                targetUser: this.commentList[i].commentUser,
                content: val[i].children[j].content,
                createDate: val[i].children[j].gmtCreate
              })
            }
          }
        })
    },
    // 添加评论
    saveComment(course) {
      comment.saveComment(this.courseId, course)
        .then(() => {
          this.$message({
            type: 'success',
            message: '评论成功'
          })
          this.getComment()
        })
    },
    doSend(content) {
      let course = {
        courseId: this.courseId,
        memberId: this.userInfo.id,
        nickname: this.userInfo.nickname,
        avatar: this.userInfo.avatar,
        content: content
      }
      this.saveComment(course)
    },
    doChidSend(args) {
      let course = {
        courseId: this.courseId,
        memberId: this.userInfo.id,
        nickname: this.userInfo.nickname,
        avatar: this.userInfo.avatar,
        content: args[0],
        parentId: args[1]
      }
      this.saveComment(course)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
