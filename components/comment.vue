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
      commentNum: 2,
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
              console.log(val[i].children)
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
    doSend(content) {
      console.log("初始发送按钮点击事件：" + content);
    },
    doChidSend(args) {
      console.log("评论区发送按钮点击事件：");
      console.log("content=" + args[0]);
      console.log("targetUserId=" + args[1]);
      console.log("父级评论id=" + args[2]);
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
