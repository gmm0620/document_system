<template>
    <div class="approval_detail">
        <div>
          <div>
            <MyBreadcrumb />
            <button class="back" @click="back">返回</button>
          </div>
            <div class="cont">
              <div class="detail common_style">
                <div>
                  <div class="title">
                    <span>申请详情</span>
                  </div>
                </div>
                <div class="status">
                  <div class="status_1">
                    <i class="el-icon-circle-check" v-if="$route.query.state === '已同意' || $route.query.state === '06'"></i>
                    <i class="el-icon-time" v-else></i>
                    <!-- <span v-if="$route.query.state === '待审核' || $route.query.state === '01'">待审核</span>
                    <span v-if="$route.query.state === '待审批' || $route.query.state === '02'">待审批</span>
                    <span v-if="$route.query.state === '审批中' || $route.query.state === '03'">审批中</span>
                    <span v-if="$route.query.state === '已审核' || $route.query.state === '04'">已审核</span>
                    <span v-if="$route.query.state === '已审批' || $route.query.state === '05'">已审批</span>
                    <span v-if="$route.query.state === '已同意' || $route.query.state === '06'" class="finish">已同意</span>
                    <span v-if="$route.query.state === '已结束' || $route.query.state === '07'">已结束</span>
                    <span v-if="$route.query.state === '已驳回' || $route.query.state === '08'">已驳回</span>
                    <span v-if="$route.query.state === '已撤回' || $route.query.state === '09'">已撤回</span> -->
                    <span :class="list['名称'] === '已审批'?'finish':''">{{list['名称']}}</span>
                  </div>
                  <div class="step">
                    <el-steps :active="logData.length" finish-status="success">
                      <el-step v-for="(item, index) in logData" :title="item['名称']" :description="item['审批人姓名'] ? item['审批人姓名']+'('+item['审批单位']+')': ''" :key="index"></el-step>
                    </el-steps>
                  </div>
                </div>
                <div class="approval_info">
                  <div class="title_info">
                    <span>申请单信息</span>
                  </div>
                  <div class="info">
                    <ul class="left">
                      <li>申请单号</li>
                      <li>申请时间</li>
                      <li>申请类型</li>
                      <li>查档人员</li>
                      <li>查档对象</li>
                      <li>档案现管单位</li>
                      <li>查档事由</li>
                      <li>查档形式</li>
                      <li>查档内容</li>
                      <!-- <li>查档天数</li>
                      <li>查档次数</li> -->
                      <!-- <li>查档单位意见</li> -->
                    </ul>
                    <ul class="right">
                      <li>{{list['申请单号']}}</li>
                      <li>{{list['申请时间']}}</li>
                      <li>{{list['申请业务类型']}}</li>
                      <li>{{list['查阅人姓名'] == null ? list['查阅人姓名'] : list['申请人姓名']}}</li>
                      <!-- <li><span v-for="(item, key) in list" :key="key">{{item['查档对象'] + " "}}</span></li> -->
                      <li>{{cddx}}</li>
                      <li>{{list['现管部门名字']}}</li>
                      <li>{{list['申请事由']}}</span></li>
                      <li><!--{{list['申请业务类型']}}--> {{list['查档形式']}}</li>
                      <li>{{list['申请查档内容']}}</span></li>
                      <!-- <li>
                          <select>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                          </select>天
                      </li>
                      <li>
                          <select>
                            <option value="10">10</option>
                            <option value="30">30</option>
                            <option value="60">60</option>
                          </select>天
                      </li> -->
                      <!-- <li>{{list['单位意见'] ? '' : '同意'}}</li> -->
                    </ul>
                  </div>
                  <div class="opt_btn">
                    <button class="agree" @click="detail" v-if="($route.query.state === '已同意' || $route.query.state === '06') && $route.query.type === '01'">
                      查看电子档案
                    </button>
                    <button class="agree" @click="detail" v-if="($route.query.state === '已同意' || $route.query.state === '06') && $route.query.type === '04'">
                      查看档案日志
                    </button>
                    <!-- <button class="agree" @click="agree" :checked="check">同意</button>
                    <button class="submit" @click="submit" :checked="check">提交上级</button>
                    <button class="stop" @click="banli">{{btnCon}}</button> -->
                  </div>
                 </div>
                <PostionHorn/>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import MyBreadcrumb from '@/components/My_Breadcrumb'
import PostionHorn from '@/components/Postion_Horn'
export default {
  name: 'approval-detail',
  components: {
    MyBreadcrumb,
    PostionHorn
  },
  data () {
    return {
      list: {},
      currpage: 1,
      pagesize: 6,
      stepVal2: 2,
      state: false,
      cddx: '',
      rizhiData: [],
      logData: []
    }
  },
  created () {
    this.getProject()
    this.getState()
  },
  methods: {
    agree () {
      this.$api.application.agreeAproval({
        shenpidanhao: this.list['审批单号']
      }).then(data => {
        if (data) {
          this.state = true
          this.stepVal2 = 3
        }
      })
    },
    submit () {
      this.$message('提交成功')
    },
    detail () {
      console.log('this.list[\'申请查档内容\']',this.list['申请查档内容'])
      console.log('JSON.stringify(this.list[\'查档对象\'])',JSON.stringify(this.list['查档对象']))
      if (this.$route.query.type === '01') {
        this.$router.push('/home/document_detail?content=' + this.list['申请查档内容'] + '&docNames=' + JSON.stringify(this.list['查档对象']) + '&shenpi=' + this.list['申请单号'])
      } else {
        this.$router.push('/home/filelog_detail?option=' + JSON.stringify(this.list['查档对象']) + '&content=' + JSON.stringify(this.rizhiData) + '&shenqingID=' + this.list['申请单号'])
      }
    },
    getProject () {
      this.$api.detail.shenqingxiangqing({
        identityCode: this.$route.query.identityCode,
        shenqingID: this.$route.query.shenqingID,
        yewuType: this.$route.query.type
      }).then(data => {
        this.rizhiData = data['日志数据']
        this.logData = data['审批流程数据']
        this.list = data['申请详情数据'] &&  data['申请详情数据'].map((item, index) => {
          item.ids = index + 1
          // item['申请事由'] = JSON.parse(item['申请事由'])
          // item['申请查档内容'] = JSON.parse(item['申请查档内容'])
          item['申请时间'] = item['申请时间'].slice(0, 10)
          if (item['申请业务类型'] === '01') {
            item['申请业务类型'] = '查阅电子档案'
          } else if (item['申请服务类型'] === '02') {
            item['申请业务类型'] = '查阅纸质档案'
          } else if (item['申请服务类型'] === '03') {
            item['申请业务类型'] = '借阅纸质档案'
          } else {
            item['申请业务类型'] = '查看档案日志'
          }
          return item
        })[0]
        this.cddx = this.list['查档对象'] && this.list['查档对象'].map((item) => {
          return item['姓名']
        }).join('、')
        console.log(this.list)
        // this.list.forEach((i,v) => {
        //   this.cddx = arr.push(v['查档对象']).join(',')
        // });
        // console.log(data['审批数据'], '审批数据')
        // this.logData.unshift({
        //   '名称': '提交申请',
        //   '审批人姓名': this.list['申请人'],
        //   '审批单位': this.list['申请单位']
        // })
        // this.logData.push({
        //   '名称': '已同意'
        // })
      })
    },
    handleCurrentChange (cpage) {
      this.currpage = cpage
    },
    handleSizeChange (psize) {
      this.pagesize = psize
    },
    getState () {
      if (this.$route.query.state === '03') {
        this.stepVal2 = 3
        this.state = true
      } else {
        this.state = false
      }
    },
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.approval_detail {
  @include wh(100%, auto);
  @include box_flex;
  @include justify(center);
  &> div {
    @include wh(1200px, auto);
    @include box_flex;
    @include direction(column);
    position: relative;
  }
  .cont {
    color: #fff;
    position: relative;
    z-index:999;
    margin-top:16px;
    .detail {
      position: relative;
      @include wh(1200px, auto);
      background:rgba(5,27,74,0.22);
      box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2);
      border:1px solid rgba(10,67,188,0.32);
      padding-bottom: 40px;
      h3 {
          color: #fff;
          font-size: 14px;
          padding-bottom: 16px;
      }
    }
    .approval_info {
      margin: 24px 24px;
      font-size: 13px;
      .title_info {
        line-height: 40px;
      }
      .info {
      @include box_flex;
      border: 1px solid #0B42BB;
      margin-bottom: 16px;
      position: relative;
      z-index: 999;
      .left {
        width: 200px;
        height: auto;
        background:rgba(3,94,255,0.25);
        border-right: 1px solid rgba(11,66,187,1);
        text-align: right;
        li {
          padding-right: 16px;
          color: #029AFE;
        }
      }
      .right {
        @include flex;
        height: auto;
        background:rgba(3,94,255,0.15);
        li {
          padding-left: 16px;
        }
      }
      li {
        border-bottom:1px solid rgba(11,66,187,1);
        line-height: 40px;
        min-height:40px;
        height:auto;
        &:last-child {
          border: none;
        }
      }
    }
    }
  }
  .common_style {
      color: #fff;
      font-size: 14px;
      .title {
        height: 24px;
        margin-bottom: 8px;
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
  }
  .table {
    margin: 0 16px;
  }
  .status {
    margin: 0 24px;
    margin-top: 16px;
    height:178px;
    @include box_flex;
    @include align(center);
    background:rgba(3,94,255,0.15);
    border:1px solid rgba(11,66,187,1);
    .step {
      @include flex;
      padding: 0 72px;
    }
  }
  .status_1 {
    width: 264px;
    margin: 32px 0;
    @include box_flex;
    @include direction(column);
    @include align(center);
    @include justify(center);
    border-right: 1px dashed #029AFE;
      .el-icon-time {
        // margin: 0 100px;
        color:#FE0700;
        font-size: 64px;
      }
      .el-icon-circle-check {
        font-size: 64px;
        color: #20FE3C;
      }
      .finish {
        color: #20FE3C;
      }
      span {
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(254,7,0,1);
        margin-top: 16px;
      }
  }
  .opt_btn {
      position: absolute;
      z-index: 999;
      right: 24px;
        button {
        width:96px;
        height:30px;
        border:none;
        color: #fff;
        margin-left: 8px;
    }
    .agree {
        background:linear-gradient(0deg,rgba(12,96,200,1),rgba(5,141,252,1));
        box-shadow:0px 4px 31px 0px rgba(0, 0, 0, 0.41);
        border-radius:2px;
    }
    .submit {
        background:linear-gradient(0deg,rgba(166,242,189,1),rgba(34,162,72,1));
        box-shadow:0px 4px 31px 0px rgba(0, 0, 0, 0.41);
        border-radius:2px;
    }
    .stop {
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(0,255,255,1);
        border:1px solid rgba(0,255,255,1);
        border-radius:2px;
        background: none;
        position: relative;
        z-index: 999;
    }
  }
  .back {
        width:60px;
        height:24px;
        background:rgba(3,129,255,0.26);
        border-radius:2px;
        border:1px solid rgba(10,67,188,1);
        color: #fff;
        position: absolute;
        right: 0;
        top: 24px;
        z-index: 999;
  }
  .detail,.status {
    position: relative;
    z-index: 999;
  }
  select {
    color:#fff;
    padding: 0 8px;
    outline: none;
    background: rgba(3, 94, 255, 0.15);
    border: 1px solid #0a43bc;
    border-radius: 2px;
  }
}
</style>
