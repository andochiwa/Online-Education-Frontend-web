<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" @click="courseQuery = {}; getPageCondition(1)" href="#">全部</a>
                </li>
                <!-- 一级课程 -->
                <li v-for="(subjectFirst, index) in subject">
                  <a :title="subjectFirst.title"
                     @click="clickFirstSubject(index)"
                     href="#">
                    {{ subjectFirst.title }}
                  </a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <!-- 二级课程 -->
                <li v-for="subjectSecond in subject[secondSubjectIndex].children">
                  <a :title="subjectSecond.title" @click="clickSecondSubject(subjectSecond.id)" href="#">{{ subjectSecond.title }}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li>
                <a title="关注度" href="#">关注度</a>
              </li>
              <li>
                <a title="最新" href="#">最新</a>
              </li>
              <li class="current bg-orange">
                <a title="价格" href="#">价格&nbsp;
                  <span>↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="courseInfo.length === 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="course in courseInfo">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="course.cover" class="img-responsive" alt>
                    <div class="cc-mask">
                      <nuxt-link :to="`/course/` + course.id" title="开始学习" class="comm-btn c-btn-1">开始学习</nuxt-link>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <nuxt-link :to="`/course/` + course.id" :title="course.title" class="course-title fsize18 c-333">
                      {{course.title}}
                    </nuxt-link>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">
                        {{course.price === 0 ? '免费' : course.price + '元'}}
                      </i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">9634人学习</i>
                      |
                      <i class="c-999 f-fA">9634评论</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <el-pagination
            background
            :current-page="page"
            :page-size="limit"
            :total="total"
            style="padding: 30px 0; text-align: center"
            layout="total, prev, pager, next, jumper"
            @current-change="getPageCondition"
          >
          </el-pagination>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import course from "@/api/course";

export default {
  data() {
    return {
      courseInfo: {},
      // 包含了一级分类和二级分类
      subject: [
        {
          id: '',
          children: []
        }
      ],
      // 查询时二级分类的索引位置
      secondSubjectIndex: 0,
      page: 1,
      limit: 8,
      total: 0,
      courseQuery: {
        subjectId: '',
        subjectParentId: '',
        buyCountSort: '',
        gmtCreateSort: '',
        priceSort: ''
      },
      // 以下是点击时是否点亮用的变量
      firstSubject: false,
      secondSubject: false,
      butCount: false,
      gmtCreate: false,
      price: false
    }
  },
  created() {
    this.getPageCondition()
    this.getSubject()
  },
  methods: {
    // 查询分页后的课程信息
    getPageCondition(page = 1) {
      course.getPageCondition(page, this.limit, this.courseQuery)
        .then(result => {
          this.total = result.data.data.total
          this.courseInfo = result.data.data.items
        })
    },
    // 查询所有分类
    getSubject() {
      course.getSubject()
        .then(result => {
          this.subject = result.data.data.items
        })
    },
    // 一级分类查询
    clickFirstSubject(index) {
      this.secondSubjectIndex = index
      this.courseQuery.subjectParentId = this.subject[index].id
      this.courseQuery.subjectId = ''
      this.getPageCondition()
    },
    // 二级分类查询
    clickSecondSubject(subjectId) {
      this.courseQuery.subjectId = subjectId
      this.getPageCondition()
    }
  }
};
</script>
