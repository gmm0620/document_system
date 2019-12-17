<template>
    <div class="approval">
        <div style="position: relative;">
            <h3>线上接收</h3>
            <button class="back1 point" @click="">操作提示</button>
            <button class="back point" @click="back">返回</button>
            <!-- <div class="list common_style">
                <div class="title">
                    <span>基本信息</span>
                </div>
            </div> -->
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
                        <div class="status_1" v-else-if="$route.query.state === '待接收纸质'">
                            <i class="el-icon-time"></i>
                            <span class="close">待接收纸质</span>
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
                                <div>申请单位</div>
                                <div>飞行大队第七档案管理室</div>
                            </div>
                            <div>
                                <div>转递人</div>
                                <div>{{basicMsg.转递人姓名}}</div>
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
                        <el-table-column type="index" prop="ids" label="序号"></el-table-column>
                        <el-table-column prop="姓名" label="姓名"></el-table-column>
                        <el-table-column prop="单位" label="部别"></el-table-column>
                        <el-table-column prop="材料类别" label="材料类别"></el-table-column>
                        <el-table-column prop="材料名称" label="材料名称"></el-table-column>
                        <el-table-column prop="材料数量" label="材料数量"></el-table-column>
                        <el-table-column prop="option" label="操作">
                          <div slot-scope="scope">
                            <button class="look" @click="seeImg(scope.row)">查看图片</button>
                            <button class="look" v-if="$route.query.state === '待归档'" @click="zzgdHandle(scope.row)">纸质归档</button>
                          </div>
                        </el-table-column>
                      </el-table>
                    </div>
                  <div class="concat">
                    <img src="../../../../../assets/images/concat.png" alt="" @click="imgclick">
                  </div>
                    <div class="btn">
                        <button class="agree" v-if="$route.query.state === '待同意'" @click="handleApprove">同意申请</button>
                        <button class="agree" v-if="$route.query.state === '待归档'" @click="handleApprove">完成接收</button>
                        <button class="agree" v-if="$route.query.state === '待接收'" @click="handleApprove">确认接收纸质</button>
                        <button class="backs" @click="back">返回</button>
                    </div>
                </div>
              <el-dialog
                title="消息"
                :visible.sync="centerDialogVisible"
                width="40%"
                center  :modal-append-to-body='false'>
                <div class="content">
                  <div v-for="(dia,index) in dialogueArray" class="dialogue">
                    <div style="width: 35%;height: 20px;background: #e5e4e6;border-radius: 3px;margin-left: 50px;text-align: center" v-if="dia.own == 0">{{dia.发送人姓名}}&#12288;{{dia.发送时间}}</div>
                    <div v-if="dia.own == 0">
                      <div class="headimgLeft"></div>
                      <div class="dialogue-left" >
                        <div class="dialogue-show">{{dia.消息内容}}</div>
                      </div>
                    </div>
                    <div style="width: 35%;height: 20px;background: #e5e4e6;border-radius: 3px;margin-left: 297px;text-align: center" v-if="dia.own == 1">{{dia.发送人姓名}}&#12288;{{dia.发送时间}}</div>
                    <div v-if="dia.own == 1">
                      <div class="headimgRight"></div>
                      <div class="dialogue-right">
                        <div class="dialogue-show">{{dia.消息内容}}</div>
                      </div>
                    </div>
                  </div>
                  <div class="down">
                    <input class="line-input" @keyup.enter="send()" v-model="sendcontent">
                  </div>
                  <el-button style="width: 80px;height: 40px;float: right;margin-right: 2px;margin-top: 55px" @click="send">发送</el-button>
                </div>
              </el-dialog>
                <PostionHorn/>
            </div>
        </div>
        <el-dialog title="图片信息" :visible.sync="imgVisible" width="50%" :modal-append-to-body='false'>
          <el-carousel indicator-position="outside" arrow="always">
            <el-carousel-item v-for="(item, index) in imgMsg" :key="index">
              <img :src="item.原始图片" alt="" style="width: 100%; height: 100%;">
            </el-carousel-item>
          </el-carousel>
        </el-dialog>
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
      imgVisible: false,
      imgMsg: [],
      list: [],
      basicMsg: {},
      currpage: 1,
      pagesize: 6,
      imgUrl: 'http://develop.gangwaninfo.com:9999',
        dialogueArray:[{
            direction: '0',
            cin: '王小虎王小虎王小虎王小虎',
        }, {
            direction: '0',
            cin: '王小虎',
        }, {
            direction: '1',
            cin: '王小虎',
        }, {
            direction: '1',
            cin: '王小虎',
        },{
            direction: '0',
            cin: '王小虎王小虎王小虎王小虎',
        }, {
            direction: '0',
            cin: '王小虎',
        }, {
            direction: '1',
            cin: '王小虎',
        }, {
            direction: '1',
            cin: '王小虎',
        }],
        sendcontent:'',
        xiaoxiType:'',
        centerDialogVisible:false,
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
      this.userInfo = JSON.parse(document.cookie && document.cookie.split('=')[1])
      this.get_cailiaoxiangqing()
  },
  methods: {
      imgclick(){
          console.log(111)
          this.centerDialogVisible=true;
          this.queryMessage();
      },

      //联系对方方法
      send(){
          if(this.sendcontent==''){
              this.$message({
                  message: '警告哦，您还没有输入信息！',
                  type: 'warning'
              });
              return
          }
          this.$api.build.add_zhaundimessage({
              fsrsfh:this.userInfo.身份号,
              jsrsfh:this.basicMsg.接收人身份号,
              danhao :this.basicMsg.材料转递单号,
              xiaoxi:this.sendcontent,
              xiaoxiType:this.xiaoxiType,
          }).then(data => {
              console.log('data',data)
              this.sendcontent='';
              this.queryMessage();
          })
      },
      //查询弹框消息
      queryMessage(){
          this.$api.build.messageDetail({
              sfh:this.userInfo.身份号,
              uuid:this.basicMsg.UUID,
              danhao:this.basicMsg.材料转递单号
          }).then(data => {
              console.log(333,data)
              this.dialogueArray= data.shuju;
              if(this.dialogueArray){
                  this.dialogueArray.forEach(function (ele) {
                      var year =  ele.发送时间.substr(0, 4)
                      var month =  ele.发送时间.substr(5, 2)
                      var day =  ele.发送时间.substr(8, 2)
                      var hour =  ele.发送时间.substr(11, 2)
                      var min =  ele.发送时间.substr(14, 2)
                      ele.发送时间 = year + "-" + month + "-" + day + " " + hour + ":" + min + ""
                  })
              }


          })
      },
    // 查看图片
    seeImg () {
      this.imgVisible = true
    },
    // 纸质归档
    zzgdHandle(row) {
      this.$api.application.upt_zhizhiguidang({
         zddh: this.basicMsg.材料转递单号,
         sfh: this.basicMsg.人员身份号
      })
      .then(data => {
        this.$message(data.message);
      });
    },
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
          // console.log('data2222',data)
        data.材料信息.forEach((item, index) => {
          item.申请时间 = item.申请时间.substring(0 ,10)
        })
        this.list = data.材料信息
        this.xiaoxiType = data.类型
          console.log('this.list',this.list )
        this.basicMsg = data.材料信息[0]
        data[0].children.forEach((item, index) => {
          item.原始图片 = this.imgUrl + item.原始图片
        })
        this.imgMsg = data[0].children
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
.el-dialog__wrapper {
  width: auto !important;
}
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
      z-index:0;
      background:rgba(5,27,74,0.22);
      box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2);
      border:1px solid rgba(10,67,188,0.32);
      padding-bottom:16px;
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
  .back1 {
        width:60px;
        height:24px;
        background:rgba(3,129,255,0.26);
        border-radius:2px;
        border:1px solid rgba(10,67,188,1);
        color: #fff;
        position: absolute;
        right: 70px;
        top: 24px;
        z-index: 999;
  }
  /*1111*/
  .up{
    height: 90px;
    /*height: 137px;*/
    width: 100%;
    background: #393A3F;
    position: fixed;
    z-index: 2;
    top:0;
  }
  .content{
    margin-top: 20px;
    margin-bottom: 137px;
  }
  .listIcon{
    height: 20px;
    width:20px;
    background: #FFF;
    right:10px;
    top:22px;
    position: absolute;
    cursor: pointer;
  }
  .listIcon:before{
    font-family: 'iconic';
    font-style: normal;
    speak: none;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    font-smoothing: antialiased;
    font-size: 24px;
    content:"#";
  }
  .triangle{
    width: 0;
    height: 0;
    border:50px solid transparent;
    /*border-left:50px solid red;
    border-bottom:50px solid blue;*/
    border-top:50px solid black;
    /*border-right:50px solid purple*/
  }
  .chat{
    position: absolute;
    box-sizing: border-box;
    display: inline;
    width: 150px;
    height: 36px;
  }
  .dialogue{
    overflow: hidden;
    margin-bottom: 38px;
  }
  div .dialogue-left,div .dialogue-right{
    margin-bottom: 33px;
  }
  .dialogue-left ,.dialogue-right {
    margin-left: 36px;
    top: 18px;
    position: relative;
    max-width: 50%;
    /*height: 100px;*/
    border: 2px solid #D4D4D4;
    border-radius: 10px;
    background-color: #fff;
    display: inline-block;
    padding: 10px;
    z-index: 1;
    width: fit-content;
  }
  .dialogue-left:before {
    content: "";
    position: absolute;
    border-style: solid;
    border-color: transparent #D4D4D4  transparent  transparent;
    border-width: 9px;
    margin-left: -72px;
    margin-top: -7px;
    left: 54px;
    z-index: 2;
  }
  .dialogue-left:after {
    content: "";
    position: absolute;
    border-style: solid;
    border-color: transparent #fff transparent transparent;
    border-width: 21px;
    margin-left: -65px;
    margin-top: -47px;
    z-index: 1;
  }
  .dialogue-right{
    background-color: #A0E75A;
    border: 1px solid #74BE50;
    float: right;
    margin-right: 58px;
  }
  .dialogue-right:before {
    content: "";
    position: absolute;
    border-style: solid;
    border-color: transparent  transparent  transparent #A0E75A;
    border-width: 9px;
    right: -18px;
    top: 3px;
    z-index: 1;
  }
  /*.dialogue-right:after {
    content: "";
    position: absolute;
    border-style: solid;
    border-color: transparent  transparent  transparent #74BE50;
    border-width: 15px;
    right: -31px;
    top: 4px;
    right: -38px;
    top: 3px;
  }*/
  .dialogue-show{
    background: transparent;
    border-color: transparent;
    /*display: inline-block;
    position: absolute;*/
    box-sizing: border-box;
    font-size: 20x;
    /*max-width: 100%;*/
    word-wrap: break-word;
    max-width: 100%;
    /*  margin-top: 20px;
        margin-left: 29px;*/
  }
  /*.arrow {
    width: 40px;
    height: 40px;
    position: relative;
    display: inline-block;
    margin: 10px 10px;
  }*/
  .arrow{
    left:56px;
    top:56px;
    width: 30px;
    height: 30px;
    border-top: 6px solid #FFF;
    border-left: 6px solid #FFF;
    transform:rotate(-45deg);
    position: relative;
    display: inline-block;
  }
  .arrow:before, .arrow:after {
    content: '';
    border-color: transparent;
    border-style: solid;
    position: absolute;
  }
  .arrow-left:before {
    border: none;
    background-color: #FFF;
    height: 6px;
    width: 130%;
    top: 41%;
    left: -19%;
    transform: rotate(45deg);
  }
  .vertical-line{
    width:2px;
    height: 65px;
    background-color: #2E2F33;
    display: inline-block;
    left:134px;
    top:40px;
    position: absolute;
  }
  .up-input{
    background: transparent;
    color: #E2E2E2;
    max-width: 500px;
    height: 65px;
    display: inline-block;
    position: absolute;
    left:166px;
    top:40px;
    font-size: 49px;
    border-color: transparent;
    letter-spacing:3px;
    z-index: 3;
  }
  .img-people{
    display: inline-block;
    position: absolute;
    height: 60px;
    width: 60px;
    top:40px;
    right:37px;
  }
  .down{
    /*height: 130px;*/
    width: 36%;
    background: #F4F4F4;
    /*position: fixed;*/
    bottom: 0;
    border-width: 1px 0 0 0;
    /*border-style: solid;*/
    border-color: #DCDCDC;
    z-index: 2;
    float: left;
  }
  .add-icon{
    height: 83px;
    width: 83px;
    border: 2.5px solid #6F7378;
    border-radius: 50%;
    right:33px;
    bottom: 20px;
    position: absolute;
    background-color: transparent;
  }
  .add-icon:before {
    content: "";
    position: absolute;
    height: 60px;
    width: 6px;
    background-color: #6F7378;
    margin-top: 10px;
    right: 39px;
  }
  .add-icon:after {
    content: "";
    position: absolute;
    width : 60px;
    height: 6px;
    background-color: #6F7378;
    bottom: 39px;
    right: 12px;
  }
  .img-voice{
    display: inline-block;
    position: absolute;
    height: 83px;
    width: 83px;
    border: 2.5px solid #6F7378;
    border-radius: 50%;
    left: 39px;
    bottom: 20px;
  }
  .img-smile{
    display: inline-block;
    position: absolute;
    /*height: 83px;*/
    width: 83px;
    border: 2.5px solid #6F7378;
    border-radius: 50%;
    right: 165px;
    bottom: 20px;
  }
  .line-input {
    text-align: center;
    position: absolute;
    border-style: solid;
    border-color: #6F7378;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    border-left-width: 0px;
    min-width: 450px;
    min-height: 90px;
    background: transparent;
    bottom: 35px;
    left:36px;
    font-size: 20px;
    max-width: 50%;
  }
  .headimgLeft ,.headimgRight{
    position: absolute;
    display: inline-block;
    margin-top: 19px;
    margin-left: 20px;
    height: 100px;
    width: 100px;
  }
  .headimgLeft{
    /*background: url(../img/head1.png);*/
    background-size:100% 100%;
    background-repeat:no-repeat;
    float:left;
  }
  .headimgRight{
    /*background: url(../img/right.jpg);*/
    background-size:100% 100%;
    background-repeat:no-repeat;
    right:20px;
    float:right;
  }
  /*1111*/
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
  .concat {
    position: absolute;
    left: 24px;
    bottom: 0px;
  }
  .btn {
      position: absolute;
      right: 24px;
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
