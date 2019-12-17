<template>
    <div class="document_detail">
      <button class="back point" @click="back">返回</button>
        <div>
            <MyBreadcrumb/>
            <div class="content">
                <div class="left">
                    <div class="personal">{{docNames[0].姓名}}的档案</div>
                    <el-tree
                    :data="docTree"
                    :props="defaultProps"
                    node-key="id"
                    :default-expanded-keys="[3]"
                    current-node-key="3"
                    highlight-current
                    @node-click="handleNodeClick"></el-tree>
                    <div class="check_document">
                        <span>上一卷</span>
                        <select v-model="docName">
                          <option v-for="(item, index) in docNames" :key="index" :value="item.身份号" :label="item.姓名"></option>
                        </select>
                        <span>下一卷</span>
                    </div>
                    <PositionHorn />
                </div>
                <div>
                   <div class="right">
                      <div class="con_4" id="loopDiv">
                        <el-carousel indicator-position="outside" arrow="always" :autoplay="false">
                          <el-carousel-item v-for="(item, index) in imgList" :key="index">
                              <!-- <img :src="'http://develop.gangwaninfo.com:9999' + item.原始图像路径" alt="" style="width: 100%; height: 100%;"  v-editImg="{text: userInfo['用户名'] + '' + nowDate,textColor:'rgba(225, 225, 225, 1)'}" /> -->
                              <canvas style="width:100%;height:100%" ref="canvas" @mousedown="clickCanvas" @mouseup="upCanvas"></canvas>
                          </el-carousel-item>
                        </el-carousel>
                           <!-- <h4>翻页书籍</h4>
                           <div class="book">
                               <div class="prev_page">
                                   <img src="../../assets/images/book.png" alt="">
                               </div>
                               <div class="next_page">
                                   <img src="../../assets/images/book.png" alt="">
                               </div>
                           </div>
                           <button class="prev-btn">上翻</button>
                           <button class="next-btn">下翻</button> -->
                       </div>
                       <div class="opt_btn">
                            <button class="printf">打印</button>
                            <button class="export">导出</button>
                            <input type="color" id="color" v-model="col" @change="changeColor">
                            <input type="range" id="range" min="5" max="15" v-model="w" @change="changeRange">
                            <button id="palette" ref="palette" @click="changeState" style="background:none;border:1px solid #fff">{{text}}</button>
                            <button id="save" @click="save" style="background:none;border:1px solid #fff">保存</button>
                       </div>
                       <PositionHorn />
                   </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PositionHorn from '../../components/Postion_Horn'
import MyBreadcrumb from '@/components/My_Breadcrumb'
import html2canvas from 'html2canvas'
export default {
  name: 'document_detail',
  data () {
    return {
      imgList: [],
      docTree: [],
      data:[],
      defaultProps: {
        children: 'children',
        label: '材料名称'
      },
      personOption: [],
      userInfo: {},
      nowDate: '',
      w: '',
      col: '',
      ctx: [],
      text: '橡皮擦',
      isMove: false,
      canvasCon: ''
    }
  },
  components: {
    PositionHorn,
    MyBreadcrumb
    // RightContent
  },
  created () {
    this.userInfo = JSON.parse(document.cookie.split('=')[1])
    let date = new Date()
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()
    this.nowDate = y+ '-' + m +'-'+ d
    this.docNames = this.$route.query.docNames ? JSON.parse(this.$route.query.docNames) : this.$route.query.content
      if (this.docNames.length == 0){
          this.docName = this.$route.query.content.身份号
      }else {
          this.docName = this.docNames[0].身份号
      }
      console.log('this.$route.query.content',this.$route.query.content)
    // this.docName = this.docNames[0].身份号 ? this.docNames[0].身份号 : this.$route.query.content
    this.get_danganxaingqing()
  },
  mounted () {
    this.canvasCon = document.querySelector('canvas')
    this.$nextTick(function () {
      this.$data.data.forEach(row => {
        if (row.show) {
          this.$refs.tree.setCurrentKey(row.id)
          this.$refs.tree.store.nodesMap[row.id].expanded = true
        }
      })
    })
    this.getPersonList()
  },
  methods: {
    moveCanvas(e) {
        console.log($('canvas'))
        console.log(e)
        this.ctx[0].lineTo(e.offsetX, e.offsetY);
        this.ctx[0].lineWidth = this.w;
        this.ctx[0].strokeStyle = this.col;
        this.ctx[0].stroke();
    },

    clickCanvas (e) {
        this.ctx[0].beginPath();
        this.ctx[0].moveTo(e.offsetX, e.offsetY);
        this.isMove = true
        $('canvas').mousemove((e) => {
            this.ctx[0].lineTo(e.offsetX, e.offsetY);
            this.ctx[0].lineWidth = this.w;
            this.ctx[0].strokeStyle = this.col;
            this.ctx[0].stroke();
        })
    },
    upCanvas () {
        $('canvas').mouseup((e) =>{
            $('canvas').unbind('mousemove')
        })
    },
    changeColor() {
        // this.color = e.target.value
    },
    changeRange() {
        // this.w = this.value;
    },
    changeState() {
        if (this.text == "橡皮擦") {
            this.text = "画布";
            this.ctx[0].globalCompositeOperation = "destination-out";
        } else {
            this.text = "橡皮擦";
            this.ctx[0].globalCompositeOperation = "source-over";
        }
    },
    save() {
        let that = this;
        html2canvas(document.querySelector("canvas"), {
        useCORS:true,//解决canvas跨域
        allowTaint:false
        }).then(function(canvas) {
            let contentWidth = canvas.width;
            let contentHeight = canvas.height;
            let pageHeight = (contentWidth / 592.28) * 841.89;
            let leftHeight = contentHeight;
            let position = 0;
            let imgWidth = 595.28;
            let imgHeight = (592.28 / contentWidth) * contentHeight;
            let pageData = canvas.toDataURL("image/png");
            console.log(pageData)
            // var a = document.createElement('a')
            // var event = new MouseEvent('click')
            // a.download = 'xx分析报告'
            // a.href = pageData
            // a.dispatchEvent(event)
        });
    },
    // 获取档案列表档案
    get_danganxaingqing() {
      let cailiaodaima = []
      if (this.$route.query.content.indexOf(' ') === -1) {
        cailiaodaima.push(this.$route.query.content)
      } else {
        cailiaodaima = this.$route.query.content.split(' ')
      }
      this.$api.application.get_danganxaingqing({
        sfh: this.docName,
        cailiaodaima: JSON.stringify(cailiaodaima)
      }).then(data => {
        this.docTree = data
      })
    },
    back () {
        this.$router.back()
    },
    handleNodeClick (data) {
      this.$api.build.imageList({
        uuid: data.UUID
      }).then(data => {
        this.imgList = data
        this.$nextTick(function () {
            this.$data.imgList.forEach((item, index) => {
                console.log(item.原始图像路径)
                let img=new Image()
                img.src = 'http://develop.gangwaninfo.com:9999' + item.原始图像路径
                // img.style.width = '860px'
                // img.style.height = '300px'
                this.ctx[index] = this.$refs.canvas[index].getContext('2d')
                console.log(this.ctx)
                img.onload = () => {
                    this.ctx[index].drawImage(img, 50, 0, 200, 300)
                }
                    
                // }
                
            })
        })
      })
    },
    getPersonList () {
      this.$api.application.detail_person({
        shenqingID: this.$route.query.shenqingID,
        yewuType: this.$route.query.type
      }).then(data => {
        this.personOption = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.document_detail {
  @include wh(100%, auto);
  @include box_flex;
  @include justify(center);
  &> div {
    @include wh(1200px, auto);
    @include box_flex;
    @include direction(column);
    @include justify(center);
  }
}
.back {
  position: absolute;
  right: 180px;
  top: 97px;
  width:60px;
  height:24px;
  background:rgba(3,129,255,0.26);
  border-radius:2px;
  border:1px solid rgba(10,67,188,1);
  color: #fff;
  z-index: 100;
}
.content {
  @include box_flex;
  @include justify(space-between);
  color: #fff;
  position: relative;
  z-index:999;
  margin-top:32px;
  &> div {
      @include wh(1200px, 100px);
      margin: 0 auto;
  }
  .left {
    position: relative;
    @include wh(160px, 640px);
    width:160px;
    height:639px;
    background:rgba(5,27,74,0.22);
    border:1px solid rgba(10,67,188,1);
    box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
    opacity:0.8;
    overflow: hidden;
  }
  .right {
    position: relative;
    margin-left: 16px;
    width:1022px;
    height:639px;
    background:rgba(5,27,74,0.22);
    border:1px solid rgba(10,67,188,1);
    box-shadow:0px 0px 40px 0px rgba(0,229,255,0.4) inset;
    opacity:0.8;
    @include box_flex;
    @include align(center);
  }
  .include_bottom {
    position: absolute;
    z-index: 999;
    bottom: 0;
    height: 30px;
    background:rgba(3,94,255,0.15);
    border-radius:2px;
    width: 100%;
    line-height: 30px;
    text-align: center;
  }
  .personal {
      @include wh(100%, 40px);
      background:rgba(2,154,254,0.15);
      padding-left: 16px;
      font-size: 13px;
      line-height: 40px;
  }
  .con_4 {
    width: 100%;
    margin: 0 80px;
    position: relative;
    background:rgba(3,94,255,0.15);
    border-radius:2px;
    border:1px solid rgba(11,66,187,1);
  }
  .opt_btn {
      position: absolute;
      z-index: 999;
      right: 16px;
      top: 16px;
      button {
        width:80px;
        height:30px;
        border: none;
        color: #fff;
        margin-left: 8px;
      }
      .printf {
        background:linear-gradient(180deg,rgba(5,141,252,1) 0%,rgba(12,96,200,1) 100%);
        box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 2px 0px rgba(255,255,255,0.5);
        border-radius:2px;
      }
      .export {
        background:linear-gradient(0deg,rgba(166,242,189,1),rgba(34,162,72,1));
        box-shadow:0px 4px 31px 0px rgba(0, 0, 0, 0.41);
        border-radius:2px;
      }
  }
  h4 {
      font-size: 14px;
      padding: 16px;
  }
  .book {
    //   width: 100%;
      height: 440px;
      margin: 0px 104px;
      @include box_flex;
      @include justify(space-between);
      .prev_page, .next_page {
          height: 100%;
          width: 312px;
          background:rgba(255,255,255,0.45);
          @include box_flex;
          @include justify(center);
          @include align(center);
      }
  }
  .prev-btn, .next-btn {
    position: absolute;
    z-index:999;
    border: none;
    color: #fff;
    width:80px;
    height:30px;
    background:linear-gradient(180deg,rgba(5,141,252,1) 0%,rgba(12,96,200,1) 100%);
    box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 2px 0px rgba(255,255,255,0.5);
    border-radius:15px;
    top:50%;
    margin-top: -16px;
  }
   .prev-btn {
       left: -41px;
   }
   .next-btn {
       right: -41px;
   }
   .check_document {
       position: absolute;
       height: 40px;
       z-index: 99999;
       bottom: 0;
       background:rgba(2,154,254,0.15);
       select {
            color: #fff;
            background:rgba(3,94,255,0.15);
            border-radius:0px 0px 2px 2px;
            border:1px solid rgba(10,67,188,0.94);
       }
       span {
           font-size: 12px;
           line-height: 40px;
           color: #00FFFF;
       }
   }
}
</style>
