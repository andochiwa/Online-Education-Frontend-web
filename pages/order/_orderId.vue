<template>
  <div class="Page Confirm">
    <div class="Title">
      <h1 class="fl f18">订单确认</h1>
      <img src="@/assets/img/cart_setp2.png" class="fr" alt>
      <div class="clear"></div>
    </div>
    <form name="flowForm" id="flowForm" method="post" action="">
      <table class="GoodList">
        <tbody>
        <tr>
          <th class="name">商品</th>
          <th class="price">原价</th>
          <th class="priceNew">价格</th>
        </tr>
        </tbody>
        <tbody>
        <!-- <tr>
          <td colspan="3" class="Title red f18 fb"><p>限时折扣</p></td>
        </tr> -->
        <tr>
          <td colspan="3" class="teacher">教师：{{orderInfo.teacherName}}</td>
        </tr>
        <tr class="good">
          <td class="name First">
            <a :href="'https://localhost:3000/course/'+orderInfo.courseId">
              <img :src="orderInfo.courseCover" alt></a>
            <div class="goodInfo">
              <input type="hidden" class="ids ids_14502" value="14502">
              <a :href="'https://localhost:3000/course/'+ orderInfo.courseId">{{orderInfo.courseTitle}}</a>
            </div>
          </td>
          <td class="price">
            <p>￥<strong>{{orderInfo.totalFee}}</strong></p>
            <!-- <span class="discName red">限时8折</span> -->
          </td>
          <td class="red priceNew Last">￥<strong>{{orderInfo.totalFee}}</strong></td>
        </tr>
        <tr>
          <td class="Billing tr" colspan="3">
            <div class="tr">
              <p>共 <strong class="red">1</strong> 件商品，合计<span
                class="red f20">￥<strong>{{orderInfo.totalFee}}</strong></span></p>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="Finish">
        <div class="fr" id="AgreeDiv">

          <label for="Agree"><p class="on"><input type="checkbox" checked="checked">我已阅读并同意<a href="javascript:" target="_blank">《在线教育购买协议》</a></p></label>
        </div>
        <div class="clear"></div>
        <div class="Main fl">
          <div class="fl">
            <a :href="'/course/'+orderInfo.courseId">返回课程详情页</a>
          </div>
          <div class="fr">
            <p>共 <strong class="red">1</strong> 件商品，合计<span class="red f20">￥<strong
              id="AllPrice">{{orderInfo.totalFee}}</strong></span></p>
          </div>
        </div>
        <input name="score" value="0" type="hidden" id="usedScore">
        <button class="fr redb" type="button" id="submitPay" @click="updateOrder()">去支付</button>
        <div class="clear"></div>
      </div>
    </form>
  </div>
</template>

<script>
import order from "@/api/order";

export default {
  data() {
    return {
      orderId: '',
      orderInfo: {}
    }
  },
  created() {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  },
  methods: {
    // 获取订单信息
    getOrder() {
      order.getOrder(this.orderId)
        .then(result => {
          this.orderInfo = result.data.data.items
        })
    },
    // 更新订单状态
    updateOrder() {
      order.updateOrder(this.orderId)
        .then(() => {
          this.$message({
            type: 'success',
            message: '支付成功'
          })
          this.$router.push({
            path: `/course/${this.orderInfo.courseId}`
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
