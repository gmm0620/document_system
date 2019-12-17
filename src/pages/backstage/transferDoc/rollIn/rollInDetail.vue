<template>
    <div class="approval">
        <div style="position: relative;">
            <h3>转接档案</h3>
            <button class="back1 point">操作提示</button>
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
                        <div class="status_1" v-else-if="$route.query.state === '待同意'">
                            <i class="el-icon-time"></i>
                            <span class="close">待同意</span>
                        </div>
                        <div class="status_1" v-else-if="$route.query.state === '待转出'">
                            <i class="el-icon-time"></i>
                            <span class="close">待转出</span>
                        </div>
                        <div class="status_1" v-else-if="$route.query.state === '待接收'">
                            <i class="el-icon-time"></i>
                            <span class="close">待接收</span>
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
                                <div>转出单位</div>
                                <div>{{basicMsg.转递人单位}}</div>
                            </div>
                            <div v-if="$route.query.state === '待同意'">
                                <div>申请时间</div>
                                <div>{{basicMsg.转递申请时间}}</div>
                            </div>
                            <div v-if="$route.query.state === '待接收'">
                                <div>转出纸质时间</div>
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
                                <div>转递人</div>
                                <div>{{basicMsg.转递人姓名}}</div>
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
                        <el-table
                            :data="list"
                            stripe
                            style="width: 100%">
                            <el-table-column type="index" prop="ids" label="序号" width="50"></el-table-column>
                            <el-table-column prop="姓名" label="姓名" width="70"></el-table-column>
                            <el-table-column prop="单位" label="部别" width="200"></el-table-column>
                            <el-table-column prop="档案类型" label="档案类型"></el-table-column>
                            <el-table-column prop="转出原因" label="转出原因"></el-table-column>
                            <el-table-column prop="接收人审查纸质状态" label="纸质审查结果" v-if="$route.query.state === '待接收'"></el-table-column>
                            <el-table-column prop="接收人审查电子状态" label="电子审查结果" v-if="$route.query.state === '待接收'"></el-table-column>
                            <el-table-column prop="option" label="操作">
                              <div slot-scope="scope">
                                <button class="look" @click="seeScanFiles(scope)">查看扫描档案</button>
                                <button class="look" v-if="$route.query.state === '待接收'" @click="danganshencha(scope.row, '接收')">档案审查</button>
                                <button class="look" v-if="$route.query.state === '已完成'">查看审核结果</button>
                              </div>
                            </el-table-column>
                            <el-table-column prop="option" label="审核情况" v-if="$route.query.state === '待同意'">
                              <div slot-scope="scope">
                                <el-select v-model="scope.row.接收人审查电子状态" @change="add_shenheqingkuang(scope.row)" placeholder="请选择">
                                  <el-option v-for="(item, index) in shenheSituation" :key="index" :label="item.名称" :value="item.代码"></el-option>
                                </el-select>
                              </div>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="concat">
                  <img src="../../../../assets/images/concat.png" alt="" @click="imgclick">
                </div>

                    <div class="btn">
                        <!-- <button class="agree" v-if="$route.query.state === '待同意'" @click="baocunjindu">保存进度</button> -->
                        <button class="agree" v-if="$route.query.state === '待同意'" @click="Uptdangantype('同意接受')">同意接收</button>
                        <button class="agree" v-if="$route.query.state === '待接收'"  @click="Uptdangantype('确认接收')">确认接收</button>
                        <button class="agree" v-if="$route.query.state === '已完成'" @click="downloadreceipt">下载电子回执</button>
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
              <el-dialog
                :visible.sync="dialogVisible"
                width="50%"
                center  :modal-append-to-body='false'>
                <div id='iframe'>
                  <h1 style="text-align: center;font-size: 24px;margin-bottom: 20px;margin-top: 30px">查（借）阅干部档案审批表</h1>
                  <table style="margin: 0 auto;width: 80%;"  border="1">

                    <tr class="trcaption" style="width: 100%;height: 50px" >
                      <td class="linetd" style="width: 20%;text-align: center">
                        项 目
                      </td>
                      <td class="linetd" style="width: 20%;text-align: center">
                        姓 名
                      </td>
                      <td style="width: 30%;text-align: center;">
                        部  职  别
                      </td>
                      <td style="width: 200px;text-align: center;">
                        政治面貌
                      </td>
                    </tr>
                    <tr class="trcaption" v-for="(item, index) in tableMsg">
                      <td class="linetd" v-if="index === 0" :rowspan="tableMsg.length" style="text-align: center">
                        查 借 阅<br/>
                        人    员
                      </td>
                      <td class="linetd" style="text-align: center;height: 60px;">{{item.姓名}}
                        <!--               <ul>-->
                        <!--                 <li v-if="cdr.length" v-for="(item, index) in fileval" :key="index">{{item['姓名'] + " "}}</li>-->
                        <!--               </ul>-->
                        <!--               <span v-if="cdr.length" v-for="(item, index) in cdr" :key="index">{{item['姓名'] + " "}}</span>-->
                      </td>
                      <td style="width: 40%;text-align: center;height: 60px;">{{item.部别}}{{item.职务名称}}

                      </td>
                      <td style="width: 40%;text-align: center;height: 60px;">{{item.政治}}

                      </td>
                    </tr>
                    <tr class="trcaption" v-for="(item, index) in checked1">
                      <td class="linetd" style="text-align: center" v-if="index === 0" :rowspan="checked1.length">
                        被 查 借 阅<br/>
                        人       员
                      </td>
                      <td class="linetd" style="text-align: center;height: 60px;">{{item.姓名}}

                      </td>
                      <td style="width: 40%;text-align: center;height: 60px;" colspan="2" >{{item.部别}}{{item.职务名称}}

                      </td>
                    </tr>

                    <tr class="trcaption"  style="height: 150px">
                      <td class="linetd" style="text-align: center">
                        查 借 阅<br/>
                        理   由
                      </td>
                      <td class="linetd" colspan="3" >
                        <ul style="text-align: center">

                          <li v-for="(item, index) in fileval" style="display: inline-block;width: 60px;text-align: center">{{item}},</li>
                        </ul>
                      </td>
                    </tr>
                    <tr class="trcaption"  style="height: 230px">
                      <td class="linetd" style="text-align: center">
                        查 借 阅<br/>
                        单位意见
                      </td>
                      <td class="linetd" colspan="3">
                        <div style="margin-top: 80px;margin-left: 42px;float: left;"><span>负责人签字</span></div>
                        <div style="float: right;margin-right: 113px;margin-top: 20px;"><span style="">（公 章）</span></div>
                        <div style="float: right;margin-right: -98px;margin-top: 70px;"><span style="width: 100px">年</span><span style="margin-left: 40px">月</span><span style="margin-left: 40px">日</span></div>
                      </td>
                    </tr>

                    <tr class="trcaption" style="height: 150px">
                      <td class="linetd" style="text-align: center">
                        档 案 管 理<br/>
                        部 门 意 见
                      </td>
                      <td class="linetd" colspan="3">

                      </td>
                    </tr>

                  </table>
                </div>
                <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="print">下 载</el-button>
         </span>
              </el-dialog>
                <PostionHorn/>
            </div>
            <div class="modal" v-if="$route.query.state === '待接收' && modal">
              <div>
                <h2 class="title">提示 <span class="close" @click="close">×</span></h2>
                <div class="cont_alert">
                  <i class="el-icon-info"></i>
                  <div>
                    <h4>部分档案不予办理，将被退回</h4>
                    <div>是否退回不予办理的档案，并接收其他合格的档案</div>
                  </div>
                </div>

                <div class="sureBtn">
                  <button @click="close">取消</button>
                  <button class="sure" @click="close">确定</button>
                </div>

                <PostionHorn />

              </div>

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
      basicMsg: {},
      baocunjinduParams1: [],
      baocunjinduParams2: [],
      renyuansfh: [],
      centerDialogVisible:false,
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
      dialogVisible:false
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
    this.shendangSituation()
    this.get_danganInfo()
  },
  methods: {
      //下载电子回执方法
      downloadreceipt(){
          console.log(1111)
          this.dialogVisible=true;
      },
      imgclick(){
          console.log(11111122)
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
              jsrsfh:this.basicMsg.转递人身份号,
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
              // console.log(333,data)
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
    //档案审查方法
    danganshencha(row, shenchaType) {
      this.row = JSON.stringify(row);
      // this.$router.push("/home/backstage/quality_control/popup?row=" + this.row
        this.$router.push({path:"/home/backstage/quality_control/popup", query: {"shenchaType": shenchaType, "name": row.姓名, "danwei": row.部别, "jgmcm": row.机构名称码, "rowsfh": row.身份号, "zlbh": row.zlbh}});
    },
    // 保存进度
    baocunjindu () {
      this.baocunjinduParams1 = []
      this.baocunjinduParams2 = []
      this.list.forEach((item) => {
        this.baocunjinduParams1.push(item.UUID)
        this.baocunjinduParams2.push(item.shenheResult)
      })
      this.$api.application.baocunjindu({
        cailiaoUUID: JSON.stringify(this.baocunjinduParams1),
        shqk: JSON.stringify(this.baocunjinduParams2),
      }).then((data)=> {
        console.log(data)
      })
    },
    // 同意接收
    Uptdangantype (type) {
      let renyuanxinxi = []
      this.list.forEach((item, index) => {
        renyuanxinxi.push({"jyyy": item.转出原因, "sfh": item.身份号})
      })
      this.$api.application.add_jianyuan({
        renyuanxinxi: renyuanxinxi,
        jgmcm: JSON.parse(document.cookie.split("=")[1]).机构名称码,
        danwei: JSON.parse(document.cookie.split("=")[1]).部别,
      }).then((data)=> {
        this.$api.application.Uptdangantype({
          renyuantype: this.renyuanType,
          sfh: JSON.parse(document.cookie.split("=")[1]).身份号,
          zdsqdh: this.basicMsg.档案转递单号,
          type: type,
          renyuanlist: this.renyuansfh
        }).then((data)=> {
          history.go(-1)
        })
      })
    },
    // 选择审核情况
    add_shenheqingkuang(row) {
      console.log(row)
      this.$api.application.add_shenheqingkuang({
        UUID: row.UUID,
        persontype: this.renyuanType,
        state: row.转递人审查电子状态
      }).then((data)=> {
        console.log(data)
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
        // sfh: JSON.parse(document.cookie.split("=")[1]).身份号
      }).then( (data)=> {
          console.log('data',data.类型)
          this.xiaoxiType=data.类型;
        if (data.材料信息.length !== 0) {
          data.材料信息.forEach((item) => {
            if(!item.接收人审查电子状态) {
              item.接收人审查电子状态 = ''
            }
          })
        }
        this.list = data.材料信息
        // 反填纸质审查结果
        if(this.list.length !== 0 && sessionStorage.scSituation) {
          this.list.forEach((item, index) => {
            if (sessionStorage.scSituation) {
              JSON.parse(sessionStorage.scSituation).forEach((item2, index2) => {
                if (item2.shenchaType === '接收') {
                  if(item.身份号 === item2.rowsfh) {
                    item.zlbh = item2.zlbh
                    item.接收人审查纸质状态 = item2.dzState
                  }
                }
              })
            }
          })
        }
        this.list.forEach((item, index) => {
          this.renyuansfh.push({sfh: item.身份号, zzState: item.接收人审查纸质状态, scbh: item.zlbh})
        })
        console.log(this.renyuansfh)
        this.renyuanType = data.人员类别
        this.basicMsg = data.基本信息[0]
          console.log(' this.basicMsg222', this.basicMsg)
        if (this.basicMsg.转递申请时间) {
          this.basicMsg.转递申请时间 = this.basicMsg.转递申请时间.substring(0,10)
        }
        if (this.basicMsg.档案接收时间) {
          this.basicMsg.档案接收时间 = this.basicMsg.档案接收时间.substring(0,10)
        }
        if (this.basicMsg.档案送交时间) {
          this.basicMsg.档案送交时间 = this.basicMsg.档案送交时间.substring(0,10)

        }
        this.basicMsg.zuoji = data.基本信息[0].转递人联系方式.split(',')[0]
        this.basicMsg.shoujihao = data.基本信息[0].转递人联系方式.split(',')[1]
          this.basicMsg.转递人身份号 = this.basicMsg.转递人身份号
      })
    },
    // 加载审核情况选项
    shendangSituation () {
      this.$api.application.pulldownmenu({}).then(data => {
        this.shenheSituation = data.档案审查状态
      })
    },
    showModal() {
      this.modal = true
    },
    close () {
      this.modal= false
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
    }
  }
}
</script>

<style lang="scss" scoped>
.el-step {
  .el-step__head.is-process {
    color: #C0C4CC !important;
    border-color: #C0C4CC !important;
  }
  .el-step__main {
    .el-step__title.is-process {
      color: #C0C4CC !important;
    }
  }
}
.el-select-dropdown__item {
  padding: 0 20px;
}
.el-input__inner {
  height: 30px;
  line-height: 30px
}
.el-select-dropdown__item .el-input__icon {
  line-height: 30px
}
.list .el-table tr td:last-child .cell span.el-input__suffix,
.approval .el-table tr td:last-child .cell span.el-input__suffix{
  padding-right: 0;
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
        padding: 0 8px;
        height:24px;
        background:rgba(3,129,255,0.26);
        border-radius:2px;
        border:1px solid rgba(10,67,188,1);
  }

  .linetd{
    text-align: center;
    height: 50px;
  }
  .trcaption{
    height: 50px;
    text-align: center;
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
      right: 16px;
      bottom: 8px;
      z-index:999;
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
  select {
    width:60px;
    height:24px;
    background:rgba(3,129,255,0.26);
    border-radius:2px;
    border:1px solid rgba(10,67,188,1);
    color: #fff;
  }
}
.concat {
  position: absolute;
  z-index: 999;
  bottom: -4px;
  left: 20px;
}
.modal {
  position: fixed;
  right:0;
  left:0;
  top:0;
  bottom:0;
  background: rgba(0,0,0,.5);
  z-index:9999;
  // margin:0 auto;
  @include box_flex;
  @include justify(center);
  @include align(center);
  & >div {
    width: 500px;
    height: 188px;
    position: relative;
    background:rgba(5,27,74,1);
    box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2) inset;
    h2 {
      height: 40px;
      width: 100%;
      background:rgba(11,67,187,1);
      box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2) inset;
      color:#fff;
      line-height: 40px;
      font-size: 14px;
      padding:0 16px;
      @include sizing;
      position: relative;
      .close {
        position: absolute;
        z-index:9999;
        right:16px;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .cont_alert {
      @include box_flex;
      &>div {
        margin-top:16px;
        line-height: 30px;
        h4 {
          font-size: 16px;
        }
      }
    }
  .sureBtn {
    position: absolute;
    bottom:8px;
    right:20px;
    z-index:9999;
    button {
      margin-left:8px;
      width:80px;
      height:30px;
      box-shadow:0px 2px 10px 0px rgba(0,0,0,0.53);
      border-radius:2px;
      background: none;
      color:rgba(0,254,255,1);
      border:1px solid rgba(0,254,255,1);
    }
    .sure {
      background:linear-gradient(180deg,rgba(5,141,252,1) 0%,rgba(12,96,200,1) 100%);
      box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 2px 0px rgba(255,255,255,0.5) inset;
      color:#fff;
      border:none
    }
  }
    i {
      font-size: 40px;
      color:#FEC600;
      margin: 20px;
    }
  }
}
</style>
