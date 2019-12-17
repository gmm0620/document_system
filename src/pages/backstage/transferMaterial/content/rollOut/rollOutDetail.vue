<template>
    <div class="approval">
        <div style="position: relative;">
            <h3>线上转出</h3>
            <button class="back" @click="back">返回</button>
            <div class="list common_style">
                <div>
                    <div class="title">
                        <span>基本信息</span>
                    </div>
                    <div class="status">
                        <div class="status_1" v-if="$route.query.state === '已完成'">
                            <i class="el-icon-circle-check"></i>
                            <span class="finish">已完成</span>
                        </div>
                        <div class="status_1" v-else-if="$route.query.state === '待归档'">
                            <i class="el-icon-time"></i>
                            <span class="close">待归档</span>
                        </div>
                        <div class="status_1" v-else-if="$route.query.state === '待转出纸质'">
                            <i class="el-icon-time"></i>
                            <span class="close">待转出纸质</span>
                        </div>
                        <div class="status_1" v-else>
                            <i class="el-icon-time"></i>
                            <span class="close">待同意</span>
                        </div>
                        <el-steps :active="docState" align-center finish-status="success">
                          <el-step title="待同意"></el-step>
                          <el-step title="待转出"></el-step>
                          <el-step title="待接收"></el-step>
                          <el-step title="待归档"></el-step>
                          <el-step title="已完成"></el-step>
                        </el-steps>
                        <div class="cont">
                            <div>
                                <div>转递编号</div>
                                <div>{{basicMsg.材料转递单号}}</div>
                            </div>
                            <div>
                                <div>接收单位</div>
                                <div>{{basicMsg.接收单位}}</div>
                            </div>
                            <div>
                                <div>接收人</div>
                                <div>{{basicMsg.接收人姓名}}</div>
                            </div>
                            <div>
                                <div>材料数量</div>
                                <div>{{basicMsg.材料数量}}</div>
                            </div>
                            <div>
                                <div>申请时间</div>
                                <div>{{basicMsg.申请时间}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="title">
                        <span>材料信息</span>
                    </div>
                    <div class="table">
                      <el-table :data="list" stripe style="width: 100%">
                        <el-table-column type="index" prop="ids" label="序号" width="50"></el-table-column>
                        <el-table-column prop="姓名" label="姓名" width="100"></el-table-column>
                        <el-table-column prop="单位" label="部别" width="200"></el-table-column>
                        <el-table-column prop="材料类型" label="材料类型"></el-table-column>
                        <el-table-column prop="材料名称" label="材料名称"></el-table-column>
                        <el-table-column prop="图片数量" label="图片数量"></el-table-column>
                        <el-table-column prop="option" label="操作">
                          <button class="look">查看图片</button>
                        </el-table-column>
                      </el-table>
                    </div>
                    <div class="btn">
                        <button class="agree" v-if="$route.query.state == '待转出'" @click="handleApprove">转出纸质</button>
                        <button class="agree" v-if="$route.query.state == '待同意'" @click="handleApprove">撤回</button>
                        <button class="backs" @click="back">返回</button>
                    </div>
                </div>
                <PostionHorn/>
            </div>
        </div>
    </div>
</template>

<script>
import MyBreadcrumb from '@/components/My_Breadcrumb'
import PostionHorn from '@/components/Postion_Horn'
export default {
  name: 'my-approval',
  components: {
    MyBreadcrumb,
    PostionHorn
  },
  data () {
    return {
      list: [],
      basicMsg: {},
      currpage: 1,
      pagesize: 6
    }
  },
  created () {
    switch(this.$route.query.state) {
      case '待同意':
        this.docState = 1
        break
      case '待转出':
        this.docState = 2
        break
      case '待接收':
        this.docState = 3
        break
      case '待归档':
        this.docState = 4
        break
      case '已完成':
        this.docState = 5
        break
    }
    this.get_cailiaoxiangqing()
  },
  methods: {
    // 审核
    handleApprove(e) {
      this.$api.application.upt_xianshangtype({
         jieshoubianhao: this.basicMsg.材料转递单号,
         type: e.target.innerHTML,
         sfh: JSON.parse(document.cookie.split("=")[1]).身份号,
         name: JSON.parse(document.cookie.split("=")[1]).姓名,
      })
      .then(data => {
        history.go(-1)
      });
    },
    // 获取详情信息
    get_cailiaoxiangqing() {
      this.$api.application.get_cailiaoxiangqing({
         clzddh: this.$route.query.clzddh,
         type: '线上'
      }).then(data => {
        data.材料信息.forEach((item, index) => {
          item.申请时间 = item.申请时间.substring(0 ,10)
        })
        this.list = data.材料信息
        this.basicMsg = data.材料信息[0]
      });
    },
    handleCurrentChange (cpage) {
      this.currpage = cpage
    },
    handleSizeChange (psize) {
      this.pagesize = psize
    },
    back () {
      this.$router.back()
    },
    lookDeatil (item) {
      console.log(item, 'item')
    //   this.$router.push('/home/approval_detail?state=' + item['审批状态'] + '&identityCode=1111111&shengqingID=' + item['审批单号'])
    }
  }
}
</script>

<style lang="scss" scoped>
.approval {
  @include wh(100%, auto);
  @include box_flex;
  @include justify(center);
  &> div {
    @include wh(1200px, auto);
    @include box_flex;
    @include direction(column);
    @include justify(center);
  }
  h3 {
    font-size: 16px;
    margin: 16px 8px;
    position: relative;
    &::before {
      content: '';
      display: inline-block;
      margin-left: 8px;
      width: 6px;
      height: 20px;
      background: #029AFE;
      position: relative;
      right: 8px;
      top: 4px;
    }
  }
  .list {
      @include wh(1200px, auto);
      position: relative;
      background:rgba(5,27,74,0.22);
      box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2);
      border:1px solid rgba(10,67,188,0.32);
      padding-bottom: 8px;
      h3 {
          color: #fff;
          font-size: 14px;
          padding-bottom: 16px;
      }
  }
  .common_style {
    //   @include box_flex;
    //   @include align(center);
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
            background: url('../../../../../assets/images/tit-right.png');
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
  .opt_btn {
      position: absolute;
      z-index: 999;
      right: 16px;
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
    }
  }
  .table {
      margin: 16px 24px;
      padding-bottom: 16px;
  }
  .look {
        color: #00FEFF;
        font-size: 12px;
        width:60px;
        height:24px;
        background:rgba(3,129,255,0.26);
        border-radius:2px;
        border:1px solid rgba(10,67,188,1);
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
  .status {
    margin: 0 24px;
    margin-top: 16px;
    height:178px;
    @include box_flex;
    background:rgba(3,94,255,0.15);
    border:1px solid rgba(11,66,187,1);
    position: relative;
    .step {
      @include flex;
      padding: 0 72px;
    }
    .el-steps {
      width: 800px;
      position: absolute;
      top: 20px;
      left: 250px;
    }
  }
  .status_1 {
    width: 200px;
    margin: 32px 0;
    @include box_flex;
    @include direction(column);
    @include align(center);
    @include justify(center);
    border-right: 1px dashed #029AFE;
      .el-icon-circle-close {
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
      .close {
          color: #FEC600;
      }
      .el-icon-time {
        font-size: 64px;
        color: #FEC600
      }
      span {
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(254,7,0,1);
        margin-top: 16px;
      }
  }
  .btn {
      position: absolute;
      right: 20px;
      bottom: 8px;
      .backs {
        width:80px;
        height:28px;
        background: none;
        border:1px solid rgba(0,255,255,1);
        border-radius:2px;
        font-size:14px;
        font-weight:400;
        color:rgba(0,255,255,1);
    }
    .agree {
        width:80px;
        height:28px;
        border: none;
        background:linear-gradient(0deg,rgba(12,96,200,1),rgba(5,141,252,1));
        box-shadow:0px 4px 31px 0px rgba(0, 0, 0, 0.41);
        border-radius:2px;
        color: #fff;
        margin-left: 8px;
    }
  }
  .cont {
      @include flex;
      @include box_flex;
      @include justify(space-around);
      height: 70px;
      width: 880px;
      position: absolute;
      bottom: 20px;
      left: 220px;
      &>div {
          div:first-child {
            color:rgba(2,154,254,1);
            line-height: 25px;
          }
      }
  }
}
</style>
