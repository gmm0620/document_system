<template>
  <div class="stage">
    <div class="right">
      <p style="font-size: 14px;
          margin-left: 18px;
          margin-top: 13px;">消息列表</p>
      <div class="materialperson_list common_style">
        <div class="con_2" style="margin-bottom: 50px;padding: 20px">
          <el-table style="width: 100%"
                    :data="tableData">
            <el-table-column
             type=index
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="名称"
              label="消息类型">
            </el-table-column>
            <el-table-column
              prop="发送时间"
              label="发送时间"
              width="200">
            </el-table-column>
            <el-table-column
              prop="消息内容"
              label="发送内容"
              :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
              prop="发送人姓名"
              label="发送人"
            >
            </el-table-column>
            <el-table-column
              prop="发送人单位"
              label="发送单位"
            >
            </el-table-column>
            <el-table-column
              prop="发送人职务"
              label="职务"
            >
            </el-table-column>
            <el-table-column
              prop="是否已读"
              label="状态"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange">
          </el-pagination>
          <el-dialog
            title="消息"
            :visible.sync="centerDialogVisible"
            width="40%"
            center  :modal-append-to-body='false'>
   <!-- <template id="chatinput">-->
              <div class="content" >
                <div v-for="(dia,index) in dialogueArray" class="dialogue">
                  <div style="width: 35%;height: 20px;background: #e5e4e6;border-radius: 3px;margin-left: 50px;text-align: center" v-if="dia.own == 0">{{dia.发送人姓名}}&#12288;{{dia.发送时间}}</div>
                  <div v-if="dia.own == 0">
                    <div class="headimgLeft"></div>
                    <div class="dialogue-left" >
                      <div class="dialogue-show">{{dia.消息内容}}</div>
                    </div>
                  </div>
                  <div style="width: 35%;height: 20px;background: #e5e4e6;border-radius: 3px;margin-left: 430px;text-align: center" v-if="dia.own == 1">{{dia.发送人姓名}}&#12288;{{dia.发送时间}}</div>
                  <div v-if="dia.own == 1">
                    <div class="headimgRight"></div>
                    <div class="dialogue-right">
                      <div class="dialogue-show">{{dia.消息内容}}</div>
                    </div>
                  </div>
                </div>
                <div class="down" v-if="this.xitonginfo=='02' || this.xitonginfo =='03'">
<!--                  <div class="img-voice">-->
<!--                    <a href="javascript:;" v-on:click="addLeft()">-->
<!--                    </a>-->
<!--                  </div>-->
                  <input class="line-input" @keyup.enter="send()" v-model="sendcontent">
<!--                  <div class="img-smile">-->
<!--                  </div>-->
<!--                  <div class="add-icon"></div>-->
<!--                  <div style="float:right;margin-right: 27px;margin-top: 60px"></div>-->
                </div>
                <el-button style="width: 80px;height: 40px;float: right;margin-right: 2px;margin-top: 55px" @click="send" v-if="this.xitonginfo=='02' || this.xitonginfo =='03'">发送</el-button>
              </div>
<!--            </template>-->
<!--    <span slot="footer" class="dialog-footer">-->
<!--    <el-button @click="centerDialogVisible = false" style="width: 90px;height: 40px">取 消</el-button>-->
<!--    <el-button type="primary" @click="centerDialogVisible = false" style="width: 90px;height: 40px">确 定</el-button>-->
<!--  </span>-->
          </el-dialog>
          <el-dialog
            title="消息内容"
            :visible.sync="dialogVisible"
            width="50%"
             :modal-append-to-body='false' center>
            <div style="margin-bottom: 30px">
              <div style="margin: 5px;"><span>发送人：</span><span style="font-weight: bold">{{this.fasongren}}</span></div>
              <div style="margin: 5px;"><span>发送单位：</span><span style="font-weight: bold">{{this.fasongdanwei}}</span></div>
              <div style="margin: 5px;"><span>消息类型：</span><span style="font-weight: bold">{{this.fasongneirong}}</span></div>
            </div>
          <el-button @click="dialogVisible = false" style="width: 80px;height: 40px;margin-left: 290px">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false" style="width: 80px;height: 40px;">确 定</el-button>
          </el-dialog>
        </div>
        <PositionHorn />
      </div>
      <PositionHorn />
    </div>
  </div>
</template>
<script>
    import PositionHorn from '@/components/Postion_Horn'
    export default {
        name: 'poolinfo',
        data () {
            return {
                dialogVisible:false,
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
                tableData: [],
                pageIndex:1,
                pageSize:10,
                total: 0,
                cin:"",
                sendcontent:'',
                centerDialogVisible: false,
                xitonginfo:'',
                fasongneirong:'',
                fasongren:'',
                fasongdanwei:''
            }
        },
        components: {
            PositionHorn
        },
        created () {
            this.userInfo = JSON.parse(document.cookie && document.cookie.split('=')[1])
            this.querylist()
        },
        methods: {
            //消息发送方法
            send(){
                if(this.sendcontent==''){
                    this.$message({
                        message: '警告哦，您还没有输入信息！',
                        type: 'warning'
                    });
                    return
                }
                if(this.xiaoxiType == '02'){
                    this.xiaoxiType ='转递材料';
                }else if(this.xiaoxiType == '01'){
                    this.xiaoxiType ='系统消息';
                }else if(this.xiaoxiType == '03'){
                    this.xiaoxiType ='转递档案';
                }else if(this.xiaoxiType == '04'){
                    this.xiaoxiType ='申请添加材料类别';
                }else if(this.xiaoxiType == '05'){
                    this.xiaoxiType ='申请添加材料名称';
                }else if(this.xiaoxiType == '06'){
                    this.xiaoxiType ='申请添加专有属性';
                }
                console.log('this.userInfo', this.userInfo.身份号)
                this.$api.build.add_zhaundimessage({
                    fsrsfh:this.userInfo.身份号,
                    jsrsfh:this.jsrsfh,
                    danhao :this.shenqingdanhao,
                    xiaoxi:this.sendcontent,
                    xiaoxiType:this.xiaoxiType,
                }).then(data => {
                    console.log('data',data)
                    this.sendcontent='';
                    this.queryMessage();
                })
            },
            //查看的方法
            handleClick(row){
                console.log('row',row)
                if(row.代码 =='04' || row.代码 =='05'|| row.代码 =='06'){
                    this.dialogVisible =true;
                }else{
                    this.centerDialogVisible=true;
                }
                this.UUID = row.UUID;
                this.xitonginfo=row.消息类型;
                this.shenqingdanhao=row.申请单号;
                this.jsrsfh=row.发送人身份号;
                this.jsrsfh=row.接收人身份号;
                this.xiaoxiType=row.消息类型;
                 this.fasongneirong=row.消息内容,
                 this.fasongren=row.发送人姓名,
                 this.fasongdanwei=row.发送人单位
                this.queryMessage();

            },
            handleSizeChange (psize){
                console.log('psize',psize)
                this.pageSize = psize;
                this.querylist()
            },
            handleCurrentChange (currpage) {
                console.log('currpage',currpage)
                this.pageIndex = currpage;
                this.querylist()
            },
            //查询列表
            querylist(){
                this.$api.build.systemMessage({
                    sfh:this.userInfo.身份号,
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize,
                }).then(data => {
                    this.tableData= data.rows;
                    this.total= data.total;
                    this.tableData.forEach(function (ele) {
                        var year =  ele.发送时间.substr(0, 4)
                        var month =  ele.发送时间.substr(5, 2)
                        var day =  ele.发送时间.substr(8, 2)
                        var hour =  ele.发送时间.substr(11, 2)
                        var min =  ele.发送时间.substr(14, 2)
                        // ele.发送时间 = year + "年" + month + "月" + day + "日" + hour + "点" + min + "分"
                        ele.发送时间 = year + "-" + month + "-" + day + " " + hour + ":" + min + ""
                    })
                 })
            },
            //查询弹框消息
            queryMessage(){
                this.$api.build.messageDetail({
                    sfh:this.userInfo.身份号,
                    uuid:this.UUID,
                    danhao:this.shenqingdanhao
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
        }
    }
</script>
<style lang="scss" scoped>
  .stage {
    @include wh(1200px, auto);
    margin: 0 auto;
    position: relative;
    @include box_flex;
    .title {
      width: 100%;
      font-size: 15px;
      height: 40px;
      margin: 16px 0;
      border-bottom: 1px solid #0A43BC;
      @include box_flex;
      span {
        line-height: 40px;
        width: 120px;
        text-align: center;
        background:rgba(3,94,255,0.15);
        &.active {
          background: rgba(3,94,255,0.6);
        }
      }
    }

    .content .el-radio, .stage .el-radio{
      position: static;
      bottom: 0;
      z-index: 9999;
      height: 30px;
      line-height: 30px;
      width: 0%;
      text-align: center;
      background: rgba(3, 94, 255, 0.15);
      border-radius: 2px;
      color: #FFF;
    }
    .right {
      @include flex;
      @include direction(column);
      position: relative;
      /*margin-left: 16px;*/
      margin-top: 25px;
      background:rgba(5,27,74,0.22);
      border:1px solid rgba(10,67,188,1);
      box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
      opacity:0.8;
      h3 {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0 16px;
        box-sizing: border-box;
        //  opacity: 0.8;
        background:rgba(2,154,254,0.15);
      }
      .title{
        width: 100%;
        font-size: 15px;
        height: 40px;
        margin: 16px 0;
        border-bottom: 1px solid #0A43BC;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
      }
      .con_flex{
        width: 1050px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        margin: 0 16px;
        margin-top: 30px;
      }
      .item{
        /*display: -webkit-box;*/
        /*display: -ms-flexbox;*/
        /*display: flex;*/
        /*display: -webkit-flex;*/
        /*text-align: right;*/
        width: 222px;
        margin-bottom: 8px;
        font-size: 13px;
        &.marginLeft {
          margin-left: 100px;
        }
      }
      .item input{
        width: 155px;
        height: 30px;
        background: rgba(3, 94, 255, 0.15);
        border: 1px solid #0a43bc;
        border-radius: 2px;
        color: #fff;
        margin-left: 8px;
        padding: 0 8px;
        outline: none;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
    }

  }
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
</style>