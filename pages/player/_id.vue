<template>
  <div>

    <!-- 阿里云视频播放器样式 -->
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.9.3/skins/default/aliplayer-min.css" />
    <!-- 阿里云视频播放器脚本 -->
    <script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.9.3/aliplayer-min.js"></script>

    <!-- 定义播放器dom -->
    <div id="J_prismPlayer" class="prism-player" />
  </div>
</template>

<script>
import vod from "@/api/vod";

export default {
  layout: 'video',
  data() {
    return {
      playAuth: '',
      vid: ''
    }
  },
  created() {
    this.vid = this.$route.params.id
    this.getPlayAuth()
  },
  methods: {
    // 获取视频凭证
    getPlayAuth() {
      vod.getPlayAuth(this.vid)
        .then(result => {
          this.playAuth = result.data.data.playAuth
          new Aliplayer({
            id: 'J_prismPlayer',
            width: '100%',
            height: '500px',
            autoplay: true,
            vid: this.vid,
            playauth: this.playAuth,
            encryptType:1, //当播放私有加密流时需要设置。
          },function(player){
            console.log('播放器创建好了。')
          });
        })
    }
  }
}
</script>

<style scoped>

</style>
