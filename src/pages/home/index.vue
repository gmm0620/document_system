<template>
  <div class="content">
    <div ref="content">
      <div class="left">
        <div>
          <div class="person_info">
            <div class="head_info"><img src="../../assets/images/touxiang.png" alt=""></div>
            <div class="self_info">
              <span class="name">{{userinfo['姓名']}}</span>
              <span class="department">{{userinfo['部别']}}</span>
              <span class="post">{{userinfo['职务名称']}}</span>
            </div>
          </div>
          <div class="application">
            <div class="in_process">
              <div>
                <span>办理中</span>
                <span class="num" style="color: #FB111B">{{in_process}}</span>
              </div>
            </div>
            <div class="finished">
              <div>
                <span>可查阅</span>
                <span class="num">{{maylook}}</span>
              </div>
            </div>
            <div class="finished">
              <div>
                <span>已完成</span>
                <span class="num">{{finished}}</span>
              </div>
            </div>
            <div class="all">
              <div>
                <span>全部</span>
                <span class="num">{{all}}</span>
              </div>
            </div>
            <div class="number">
              <div>
                <span>方案数</span>
                <span class="num">{{number}}</span>
              </div>
            </div>
          </div>
          <PositionHorn />
        </div>
        <div class="service_application common_style">
          <div class="title">
            <span>服务申请</span>
          </div>
          <div class="service">
            <router-link v-for="(item, index) in servicesList" :key="index" :to="item.path">
              <img :src="item.imgSrc" alt="">
              <span>{{item.title}}</span>
            </router-link>
          </div>
          <PositionHorn />
        </div>
        <div class="productive_material common_style">
          <div class="title">
            <span>生产材料</span>
          </div>
          <div class="material">
            <!--<router-link v-for="(item, index) in applicationList" :key="index" :to="item.path">
              <img :src="item.imgSrc" alt="">
              <span>{{item.title}}</span>
            </router-link>-->
            <a v-for="(item, index) in applicationList" :key="index">
              <img :src="item.imgSrc" alt="">
              <span>{{item.title}}</span>
            </a>
          </div>
          <PositionHorn />
        </div>
      </div>
      <div class="right">
        <div class="common_style">
          <div class="title">
            <span>我的方案</span>
            <span @click="more('project')" class="more">查看列表</span>
          </div>
          <!-- <Tab :list="list">
            <TabPane v-for="(item, index) in list" :key="index" @getType="getType(index)">{{item.content}}</TabPane>
          </Tab> -->
          <div class="switchTab">
            <span class="prev point" @click="prevIndex"></span>
            <span class="next point" @click="addIndex"></span>
            <div v-for="(item, index) in list" v-if="index===defaultIndex" :key="index">
              <div class="refer_object_title">
                {{item['方案名称']}}
              </div>
              <div class="refer_object_content">
                <span>查阅对象：</span>
                <i v-for="(i, ind) in item['方案查档对象']" :key="ind">{{i}}&nbsp;&nbsp;</i>
              </div>
            </div>
          </div>
          <PositionHorn />
        </div>
        <div class="common_style">
          <div class="title">
            <span>我的申请</span>
            <span @click="more('application')" class="more">查看列表</span>
          </div>
          <div class="application_list common_style_second">
            <ol>
              <li v-for="(item, index) in application" :key="index">
                <span class="con">{{index+1}}. {{item['申请名称']}}</span>
                <div>
                  <!-- <span v-if="item['审批状态'] === '01'" class="red">待审核</span>
                  <span v-if="item['审批状态'] === '02'" class="red">待审批</span>
                  <span v-if="item['审批状态'] === '03'" class="red">审批中</span>
                  <span v-if="item['审批状态'] === '04'" class="green">已审核</span>
                  <span v-if="item['审批状态'] === '05'" class="green">已审批</span>
                  <span v-if="item['审批状态'] === '06'" class="green">已同意</span>
                  <span v-if="item['审批状态'] === '07'" class="orange">已结束</span>
                  <span v-if="item['审批状态'] === '08'" class="gray">已驳回</span>
                  <span v-if="item['审批状态'] === '09'" class="orange">已撤回</span> -->
                  <span :class="item['名称'] === '已审批' ? 'red' : ''">{{item['名称']}}</span>
                  <button class="look_application" @click="look_application(item['审批状态'],item['申请单号'],item['申请业务类型'])">查看</button>
                </div>
              </li>
            </ol>
          </div>
          <PositionHorn />
        </div>
        <div class="common_style">
          <div class="title">
            <span>我的审批</span>
            <span @click="more('approval')" class="more">查看列表</span>
          </div>
          <div class="application_list common_style_second">
            <ol>
              <li v-for="(item, index) in approval" :key="index">
                <span class="con">{{index+1}}. {{item['申请名称']}}</span>
                <div>
                  <!-- <span v-if="item['审批状态'] === '01'" class="red">待审核</span>
                  <span v-if="item['审批状态'] === '02'" class="red">待审批</span>
                  <span v-if="item['审批状态'] === '03'" class="red">审批中</span>
                  <span v-if="item['审批状态'] === '04'" class="green">已审核</span>
                  <span v-if="item['审批状态'] === '05'" class="green">已审批</span>
                  <span v-if="item['审批状态'] === '06'" class="green">已同意</span>
                  <span v-if="item['审批状态'] === '07'" class="orange">已结束</span>
                  <span v-if="item['审批状态'] === '08'" class="gray">已驳回</span> -->
                  <!-- <span v-if="item['审批状态'] === '09'" class="orange">已撤回</span> -->
                  <span :class="item['名称'] === '待审批' ? 'red' : ''">{{item['名称']}}</span>
                  <button @click="lookDetail(item['审批状态'], item['申请单号'],item['申请业务类型'])" class="lookDetail">查看</button>
                </div>
              </li>
            </ol>
          </div>
          <PositionHorn />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PositionHorn from '../../components/Postion_Horn'
import {Tab, TabPane} from '../../components/Tab/index.js'
export default {
  name: 'Index',
  data () {
    return {
      state: false,
      userinfo: {},
      in_process: 0,
      finished: 0,
      all: 0,
      number: 0,
      maylook: 0,
      list: [],
      servicesList: [
        {
          path: '/home/service/scan_files',
          imgSrc: require('../../assets/images/home-fuwu-01.png'),
          title: '查电子'
        },
        {
          path: '/home/service/paper_archives',
          imgSrc: require('../../assets/images/home-fuwu-02.png'),
          title: '查纸质'
        },
        {
          path: '/home/service/borrow_paper_files',
          imgSrc: require('../../assets/images/home-fuwu-03.png'),
          title: '借纸质'
        },
        {
          path: '/home/service/log_file',
          imgSrc: require('../../assets/images/home-fuwu-04.png'),
          title: '查日志'
        }
      ],
      applicationList: [
        {
          path: '/home/material/appoint',
          imgSrc: require('../../assets/images/home-sccl-01.png'),
          title: '任免表'
        },
        {
          path: '/home/material/reward',
          imgSrc: require('../../assets/images/home-sccl-02.png'),
          title: '奖励表'
        },
        {
          path: '/home/material/dispose',
          imgSrc: require('../../assets/images/home-sccl-03.png'),
          title: '处分表'
        },
        {
          path: '/home/material/retirement',
          imgSrc: require('../../assets/images/home-sccl-04.png'),
          title: '离退休'
        }
      ],
      defaultIndex: 0,
      type: 'tab',
      application: [],
      approval: []
    }
  },
  components: {
    PositionHorn,
    Tab,
    TabPane
  },
  created () {
    this.getUserInfo()
    this.getProject()
    this.getApplication()
    this.getApproval()
  },
  mounted () {
    // this.$nextTick(function () {
    //   let clientWidth = document.body.clientWidth
    //   let clientHeight = document.body.clientHeight
    //   if (clientWidth > 1366) {
    //     this.$refs.content.style.cssText = `transform:scale(${clientWidth / 1440})`
    //   }
    // })
  },
  methods: {
    getIndex () {
      this.$emit('getIndex')
    },
    addIndex () {
      if (this.defaultIndex < this.list.length - 1) {
        this.defaultIndex++
      } else {
        this.defaultIndex = this.list.length - 1
      }
    },
    prevIndex () {
      if (this.defaultIndex > 0) {
        this.defaultIndex--
      } else {
        this.defaultIndex = 0
      }
    },
    getUserInfo () {
      this.userInfo = JSON.parse(document.cookie.split('=')[1])
      this.$api.index.userinfo({
        identityCode: this.userInfo['身份号']
      }).then((data) => {
        this.userinfo = data['用户信息'][0]
        this.in_process = data['办理申请'][0]['数量']
        this.finished = data['已完成申请'][0]['数量']
        this.number = data['所有方案'][0]['数量']
        this.maylook = data['可查阅申请'][0]['数量']
        this.all = data['所有申请'][0]['数量']
      })
    },
    getProject () {
      this.$api.index.programList({
        identityCode: this.userInfo['身份号']
      }).then(data => {
        data = data.map(item => {
          item['方案查档对象'] = JSON.parse(item['方案查档对象'])
          return item
        })
        this.list = data
      })
    },
    // 我的申请
    getApplication () {
      this.$api.index.serviceApplication({
        identityCode: this.userInfo['身份号']
      }).then(data => {
        this.application = data.slice(0, 4)
      })
    },
    // 我的审批
    getApproval () {
      console.log(this.userInfo['身份号'], '身份号')
      this.$api.index.approvalList({
        pageIndex: 1,
        pageSize: 4,
        identityCode: this.userInfo['身份号']
      }).then(data => {
        this.approval = data['rows']
      })
    },
    more (type) {
      this.$router.push('/home/' + type)
    },
    lookDetail (state, id, type) {
      // 查看审批详情
      this.$router.push('/home/approval_detail?state=' + state + '&identityCode=' + this.userInfo['身份号'] + '&shenqingID=' + id + '&type=' + type)
    },
    look_application (state, id, type) {
      console.log(state)
      // 查看电子档案类型详情
      this.$router.push('/home/application_detail?state=' + state + '&identityCode=' + this.userInfo['身份号'] + '&shenqingID=' + id + '&type=' + type)
      // if (type === '01' && state === '03') {
      //   this.$router.push('/home/document_detail?state=' + state + '&identityCode=' + this.userInfo['身份号'] + '&shengqingID=' + id)
      // } else if (type === '04' && state === '03') {
      //   this.$router.push('/home/application_detail?state=' + state + '&identityCode=' + this.userInfo['身份号'] + '&shengqingID=' + id)
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
    @include flex;
    @include box_flex;
    width: 100%;
    @include justify(center);
    @include align(center);
    & > div{
      width: 1200px;
      height: 524px;
      @include box_flex;
      @include justify(space-between);
    }
    .left {
      & > div {
        background:rgba(5,27,74,0.22);
        border:1px solid rgba(10,67,188,1);
        box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
        opacity:0.8;
        position: relative;
        margin-bottom: 16px;
        &:first-child {
          @include wh(792px,150px);
          @include box_flex;
          .person_info {
            @include box_flex;
            @include align(center);
            .head_info {
              @include wh(110px, 110px);
              @include box_flex;
              @include justify(center);
              @include align(center);
              padding: 32px 0 32px 24px;
              background: url('../../assets/images/touxiang-bg.png') no-repeat 24px 32px;
              img {
                width: 78px;
                height: 78px;
              }
            }
            .self_info {
              @include box_flex;
              @include direction(column);
              color: #fff;
              font-size: 13px;
              line-height: 24px;
              width: 150px;
              span:nth-child(1) {
                font-size: 18px;
                line-height: 32px;
              }
            }
          }
          .application {
            @include box_flex;
            @include align(center);
            text-align: center;
            // @include justify(center);
            // margin-left:  0px;
            font-size: 14px;
            color: #fff;
            & > div {
              border-right: 1px dashed #09328B;
              &>div{
                @include wh(50px, auto);
                @include box_flex;
                @include direction(column);
                padding: 0 24px;
                .num {
                  font-size: 32px;
                  font-weight:bold;
                  margin-top: 16px;
                  color: #20FDFA;
                }
              }
              &:last-child {
                border:none;
              }
            }
          }
        }
        &:nth-child(2),&:nth-child(3){
          @include wh(792px,168px);
          background-size: 100% 100%;
          color:#fff;
          font-size: 14px;
        }
      }
    }
    .right {
      & > div {
        background:rgba(5,27,74,0.22);
        border:1px solid rgba(10,67,188,1);
        box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
        opacity:0.8;
        position: relative;
        margin-bottom: 16px;
        font-size: 13px;
        &:first-child {
         @include wh(388px,150px);
        }
        &:nth-child(2),&:nth-child(3){
          @include wh(388px,168px);
        }
      }
      .switchTab {
        @include wh(320px, auto);
        margin: 8px 32px;
        box-sizing: border-box;
        position: relative;
        .prev, .next{
          @include wh(16px, 16px);
          position: absolute;
          top: 8px;
          background-size: 16px 16px;
          z-index: 99;
        }
        .prev {
          background: url('../../assets/images/turnleft.png');
          left: 8px;
        }
        .next {
          background: url('../../assets/images/turnright.png');
          right: 8px;
        }
        .refer_object_title {
          @include wh(224px, 32px);
          background:rgba(3,94,255,0.4);
          line-height: 32px;
          text-align: center;
          position: relative;
          left: 160px;
          margin-left: -112px;
        }
        .refer_object_content {
          @include wh(320px, 72px);
          @include box_flex;
          padding: 8px 8px;
          box-sizing: border-box;
          background:rgba(3,94,255,0.15);
          border:1px solid rgba(10, 67, 188, 0.56);
          span:first-child {
            font-size:13px;
            line-height: 20px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(32,253,250,1);
          }
          span:nth-child(2) {
            @include flex;
            line-height: 20px;
            font-size: 13px;
          }
        }
      }
    }
    .common_style {
      @include box_flex;
      @include align(center);
      color: #fff;
      font-size: 14px;
      .title {
        height: 24px;
        span:first-child{
          position: relative;
          top: 8px;
          left: 16px;
          &::after {
            content: '';
            @include wh(87px, 12px);
            display: inline-block;
            margin-left:8px;
            background: url('../../assets/images/tit-right.png');
          }
        }
        span:nth-child(2) {
          position: relative;
          right: 16px;
          top: 8px;
          margin-left: 176px;
        }
      }
      .service,.material{
        @include box_flex;
        @include justify(space-around);
        margin-top: -8px;
        padding: 0 48px;
        position: relative;
        z-index: 99;
        & > a {
          @include wh(120px, auto);
          text-align: center;
          color: #fff;
          img {
            @include wh(120px, 120px);
          }
        }
      }
    }
    .common_style_second {
      ol {
        margin-top: 8px;
        li {
          @include box_flex;
          @include justify(space-between);
          padding: 0px 16px;
          line-height: 32px;
          div span {
             padding-right: 8px;
          }
          .green {
            color: #1EFE3B;
            padding-right: 8px;
            font-size: 13px;
          }
          .red {
            color: #FE0600;
            padding-right: 8px;
            font-size: 13px;
          }
          .orange {
            color:#FEC600;
            padding-right: 8px;
            font-size: 13px;
          }
          .gray {
            color:#666;
            padding-right: 8px;
            font-size: 13px;
          }
        }
        button {
          width:44px;
          height:20px;
          background:rgba(3,129,255,0.26);
          border:1px solid rgba(10, 67, 188, 1);
          box-shadow:0px 1px 3px 0px rgba(0, 0, 0, 0.16);
          border-radius:2px;
          color: #00FFFF;
        }
      }
    }
    .more {
      position: relative;
      z-index:999;
      // right: -4px;
      // left: 1px;
      cursor: pointer;
    }
    .lookDetail,.look_application {
      position: relative;
      z-index: 999;
    }
    .look_application.active {
      background: rgba(125, 125, 125, .5);
      color: #ccc;
    }
  }
</style>
