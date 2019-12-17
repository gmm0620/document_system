<template>
    <div class="approval">
        <div style="position: relative;">
            <h3>转接档案</h3>
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
                        <div class="status_1" v-else-if="$route.query.state === '待接收'">
                            <i class="el-icon-time"></i>
                            <span class="close">待接收</span>
                        </div>
                        <div class="status_1" v-else-if="$route.query.state === '待同意'">
                            <i class="el-icon-time"></i>
                            <span class="close">待同意</span>
                        </div>
                        <div class="status_1" v-else-if="$route.query.state === '待转出'">
                            <i class="el-icon-time"></i>
                            <span class="close">待转出</span>
                        </div>
                        <div class="status_1" v-else>
                            <i class="el-icon-circle-close"></i>
                            <span>撤回</span>
                        </div>
                        <el-steps :active="docState" align-center finish-status="success">
                          <el-step title="待同意"></el-step>
                          <el-step title="待转出"></el-step>
                          <el-step title="待接收"></el-step>
                          <el-step title="已完成"></el-step>
                        </el-steps>
                        <div class="cont">
                            <div>
                                <div>转递编号</div>
                                <div>{{basicMsg.档案转递单号}}</div>
                            </div>
                            <div>
                                <div>接收单位</div>
                                <div>{{basicMsg.接收单位}}</div>
                            </div>
                            <div v-if="$route.query.state === '待同意'">
                                <div>申请时间</div>
                                <div>{{basicMsg.转递申请时间}}</div>
                            </div>
                            <div v-if="$route.query.state === '待转出'">
                                <div>同意时间</div>
                                <div>{{basicMsg.档案送交时间}}</div>
                            </div>
                            <div v-if="$route.query.state === '已完成'">
                                <div>完成时间</div>
                                <div>{{basicMsg.档案接收时间}}</div>
                            </div>
                            <div>
                                <div>数量</div>
                                <div>{{basicMsg.数量}}</div>
                            </div>
                            <div>
                                <div>接收人</div>
                                <div>{{basicMsg.接收人姓名}}</div>
                            </div>
                            <div>
                                <div>联系方式</div>
                                <div>
                                  <span>{{basicMsg.zuoji}}</span><br/><span>{{basicMsg.shoujihao}}</span>
                                </div>
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
                          <el-table-column prop="姓名" label="姓名" width="70"></el-table-column>
                          <el-table-column prop="单位" label="部别" width="200"></el-table-column>
                          <el-table-column prop="档案类型" label="档案类型"></el-table-column>
                          <el-table-column prop="转出原因" label="转出原因"></el-table-column>
                          <el-table-column prop="转递人审查电子状态" label="电子审查状态"></el-table-column>
                          <el-table-column prop="转递人审查纸质状态" label="纸质审查状态"></el-table-column>
                          <el-table-column prop="option" label="操作">
                            <div slot-scope="scope">
                              <button class="look" @click="seeScanFiles(scope)">查看扫描档案</button>
                              <button class="look" v-if="$route.query.state === '已完成'">查看审核结果</button>
                            </div>
                          </el-table-column>
                        </el-table>
                    </div>
                    <div class="concat" @click="concat">
                      <img src="../../../../assets/images/concat.png" alt="" @click="imgclick">
                    </div>
                    <div class="btn">
                        <button class="agree" v-if="$route.query.state === '待同意'" @click="Uptdangantype('取消申请')">取消申请</button>
                        <button class="agree" v-if="$route.query.state === '待转出'" @click="Uptdangantype('确认转出')">确认转出</button>
                        <!-- <button class="send" v-if="$route.query.state === '1'">手动存入减员副本库</button>
                        <button class="send" v-if="$route.query.state === '1'">发送已转出消息并存入减员副本库</button> -->
                          <button class="send" v-if="$route.query.state === '已完成'" @click="downloadreceipt">下载电子回执</button>
                        <button class="backs" @click="back">返回</button>
                    </div>
                </div>
              <el-dialog
                :visible.sync="dialogVisible"
                width="50%"
                center  :modal-append-to-body='false'>
                <div id='iframe'>
                  <h1 style="text-align: center;font-size: 30px;margin-bottom: 20px;margin-top: 60px;letter-spacing: 8px;">干部档案材料转递单</h1>
                  <span type="text" style="display:block;font-size: 16px;width: 293px;border-left: none;border-right: none;border-top: none;border-bottom: 1px solid black;margin-left: 67px;margin-bottom: 15px;letter-spacing: 8px">{{basicMsg.接收单位}}<i style="margin-left:23px">:</i></span>
                  <p style=" letter-spacing:8px;text-align: left;margin: 0 auto;display: block;width: 570px;font-size: 16px;margin-bottom: 15px;">&emsp;&emsp;兹转去干档字第XXXXXXX号<span>{{basicMsg.接收人姓名}}</span>同志等<span>{{basicMsg.数量}}</span>人干部档案材料共计<span>{{basicMsg.数量}}</span>份,请查收后即退回执。</p>
                  <div style="width: 70%;height: 50px;margin-top: 25px;font-size: 16px;">
                    <div style="margin-left: 130px"><sapn>承办人：</sapn><span>{{this.userInfo.姓名}}</span></div>
                  </div>
                  <div style="margin-top: -50px;margin-left: 440px;font-size: 16px"><sapn>单位：</sapn><span>{{this.userInfo.部别}}</span></div>
                  <div style="margin-top: 27px;margin-left: 480px;width: 200px;font-size: 16px;margin-bottom: 10px"><span>年</span><span style="margin-left: 40px">月</span><span  style="margin-left: 40px">日</span></div>
                <table style="margin: 0 auto;width: 80%;"  border="1">
                    <tr class="trcaption" style="width: 100%;height: 50px" >
                      <td class="linetd" style="width: 20%;text-align: center">
                        序号
                      </td>
                      <td class="linetd" style="width: 20%;text-align: center">
                        部 职 别
                      </td>
                      <td style="width: 30%;text-align: center;">
                        材料名称
                      </td>
                      <td style="width: 200px;text-align: center;">
                        转递原因
                      </td>
                    </tr>
                    <tr class="trcaption" style="width: 100%;height: 50px"  v-for="(item, index) in list">
                      <td class="linetd" style="width: 20%;text-align: center">
                        {{index+1}}
                      </td>
                      <td class="linetd" style="width: 20%;text-align: center">
                        {{item.姓名}}
                      </td>
                      <td style="width: 30%;text-align: center;">
                        {{item.档案类型}}
                      </td>
                      <td style="width: 200px;text-align: center;">
                        {{item.转出原因}}
                      </td>
                    </tr>
<!--                    <tr class="trcaption" style="width: 100%;height: 50px" >-->
<!--                      <td class="linetd" style="width: 20%;text-align: center">-->
<!--                        序号-->
<!--                      </td>-->
<!--                      <td class="linetd" style="width: 20%;text-align: center">-->
<!--                        部 职 别-->
<!--                      </td>-->
<!--                      <td style="width: 30%;text-align: center;">-->
<!--                        材料名称-->
<!--                      </td>-->
<!--                      <td style="width: 200px;text-align: center;">-->
<!--                        转递原因-->
<!--                      </td>-->
<!--                    </tr>-->
<!--                  <tr class="trcaption" style="width: 100%;height: 50px" >-->
<!--                    <td class="linetd" style="width: 20%;text-align: center">-->
<!--                      序号-->
<!--                    </td>-->
<!--                    <td class="linetd" style="width: 20%;text-align: center">-->
<!--                      部 职 别-->
<!--                    </td>-->
<!--                    <td style="width: 30%;text-align: center;">-->
<!--                      材料名称-->
<!--                    </td>-->
<!--                    <td style="width: 200px;text-align: center;">-->
<!--                      转递原因-->
<!--                    </td>-->
<!--                  </tr>-->
<!--                  <tr class="trcaption" style="width: 100%;height: 50px" >-->
<!--                    <td class="linetd" style="width: 20%;text-align: center">-->
<!--                      序号-->
<!--                    </td>-->
<!--                    <td class="linetd" style="width: 20%;text-align: center">-->
<!--                      部 职 别-->
<!--                    </td>-->
<!--                    <td style="width: 30%;text-align: center;">-->
<!--                      材料名称-->
<!--                    </td>-->
<!--                    <td style="width: 200px;text-align: center;">-->
<!--                      转递原因-->
<!--                    </td>-->
<!--                  </tr>-->

                  </table>
                  <p style="display: block;margin: 7px auto;width: 125px;margin-bottom: 15px;letter-spacing: 6px;">第1页/共1页</p>
                  <span style="border-bottom: 1.5px dotted #000;width: 80%;display: block;margin: 0 auto;"></span>
                  <div style="width: 80%;height: 250px;border: 1px solid rgb(12, 12, 12);margin: 0 auto;margin-top: 45px;padding: 7px">
                    <div type="text" style="letter-spacing: 8px;margin-top:13px;font-size: 16px;width: 255px;border-left: none;border-right: none;border-top: none;border-bottom: 1px solid black;margin-bottom: 15px;">{{this.userInfo.部别}}<i style="margin-left:80px">:</i></div>
                    <p style="letter-spacing: 6px;margin: 20px;font-size: 16px">&emsp;&emsp;你部转来干档字第XXXXXXX号干部档案材料共计<span>{{basicMsg.数量}}</span>份，已如数收到，现将回执退回。</p>
                    <div style="width: 70%">

<!--                      <div><span>收件机关<br/>盖章</span></div> <div><span style="margin-left: 190px;">收件人<br/>签名盖章</span></div> <div><span>年</span><span>月</span><span>日</span></div>-->
                      <div style="margin: 0 auto;width: 330px;margin-top: 69px;font-size: 16px">收件机关<br/>盖&emsp;&emsp;章</div>
                      <div style="margin-top: -41px;margin-left: 230px;font-size: 16px">收 件 人<br/>签名盖章</div>
                      <div style="margin-top: -20px;margin-left: 408px;width: 200px;font-size: 16px"><span>年</span><span style="margin-left: 40px">月</span><span  style="margin-left: 40px">日</span></div>                    </div>
                  </div>
                  <p style="width: 300px;margin-left: 80px;margin-top: 4px">回执请寄：某某目标单位邮政地址（邮编）</p>
                </div>
                <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" style="width: 80px;height: 35px">取 消</el-button>
          <el-button type="primary" @click="print" style="width: 80px;height: 35px">下 载</el-button>
         </span>
              </el-dialog>
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
      currpage: 1,
      pagesize: 6,
      modal: false,
      shenheResult: '',
      shenheSituation: [],
      renyuanType: '',
      basicMsg: '',
      baocunjinduParams1: [],
      baocunjinduParams2: [],
      renyuansfh: [],
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
        dialogVisible:false,
        checked1:[],
        tableMsg:[],
        fileval:[]

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
      case '已完成':
        this.docState = 4
        break
    }
    this.userInfo = JSON.parse(document.cookie && document.cookie.split('=')[1])
      console.log('this.userInfo',this.userInfo)
    this.get_danganInfo()
  },
  methods: {
      print(){
          //根据div标签ID拿到div中的局部内容
          this.bdhtml=document.body.innerHTML;
          var jubuData = document.getElementById("iframe").innerHTML;
          //把获取的 局部div内容赋给body标签, 相当于重置了 body里的内容
          document.body.innerHTML= jubuData;
          //调用打印功能
          window.print();
          window.location.reload();

          document.body.innerHTML=this.bdhtml;//重新给页面内容赋值；
          // jubuData.contentDocument.close();
          // window.location.reload() close
          // return 0;
          // this.dialogVisible=false;
      },
      //下载电子回执方法
      downloadreceipt(){
          this.dialogVisible=true;
      },
      imgclick(){
          // console.log(111)
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
              danhao :this.basicMsg.档案转递单号,
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
              uuid:this.UUID,
              danhao:this.basicMsg.档案转递单号
          }).then(data => {
              console.log(333,data)
              this.dialogueArray= data.shuju;
              this.dialogueArray.forEach(function (ele) {
                  var year =  ele.发送时间.substr(0, 4)
                  var month =  ele.发送时间.substr(5, 2)
                  var day =  ele.发送时间.substr(8, 2)
                  var hour =  ele.发送时间.substr(11, 2)
                  var min =  ele.发送时间.substr(14, 2)
                  ele.发送时间 = year + "-" + month + "-" + day + " " + hour + ":" + min + ""
              })

          })
      },
    // 同意接收
    Uptdangantype (type) {
      this.$api.application.Uptdangantype({
        renyuantype: this.renyuanType,
        sfh: JSON.parse(document.cookie.split("=")[1]).身份号,
        zdsqdh: this.basicMsg.档案转递单号,
        type: type,
        renyuanlist: this.renyuansfh
      }).then((data)=> {
        history.go(-1)
      })
    },
    // 查看扫描档案
    seeScanFiles () {
      this.$router.push("/home/document_detail");
    },
    // 加载转接档案详情
    get_danganInfo () {
      this.$api.application.get_danganInfo({
        orderId: this.$route.query.orderId,
        jgmcm: JSON.parse(document.cookie.split("=")[1]).机构名称码
      }).then( (data)=> {
          console.log('datadata',data)
        if (data.材料信息.length !== 0) {
          data.材料信息.forEach((item) => {
            item.shenheResult = ''
          })
        }
        this.list = data.材料信息
          console.log('this.list ',this.list )
        this.xiaoxiType = data.类型
        this.list.forEach((item, index) => {
          this.renyuansfh.push(item.身份号)
        })
        this.renyuanType = data.人员类别
        this.basicMsg = data.基本信息[0]
        if (this.basicMsg.转递申请时间) {
          this.basicMsg.转递申请时间 = this.basicMsg.转递申请时间.substring(0,10)
        }
          this.basicMsg.接收人身份号 = this.basicMsg.接收人身份号
        if (this.basicMsg.档案接收时间) {
          this.basicMsg.档案接收时间 = this.basicMsg.档案接收时间.substring(0,10)
        }
        if (this.basicMsg.档案送交时间) {
          this.basicMsg.档案送交时间 = this.basicMsg.档案送交时间.substring(0,10)
        }
        this.basicMsg.zuoji = data.基本信息[0].接收人联系方式.split(',')[0]
        this.basicMsg.shoujihao = data.基本信息[0].接收人联系方式.split(',')[1]
      })
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
    //   this.$router.push('/home/approval_detail?state=' + item['审批状态'] + '&identityCode=1111111&shengqingID=' + item['审批单号'])
    },
    concat () {
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
            background: url('../../../../assets/images/tit-right.png');
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
        width:auto;
        height:30px;
        border:none;
        color: #fff;
        margin-left: 8px;
        width: 96px;
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
        width:90px;
        height:24px;
        padding: 0 8px;
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
  .btn {
      position: absolute;
      z-index:99;
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
        margin-left: 8px;
    }
    .agree,.send {
        width:auto;
        padding: 0 8px;
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
  .concat {
    position: absolute;
    z-index: 999;
    bottom: -4px;
    left: 20px;
  }
}
select {
  background:rgba(3,94,255,0.15);
  border:1px solid rgba(10,67,188,1);
  color: #fff;
}
</style>
