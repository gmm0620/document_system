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
                       <div class="con_4" id="loopDiv" style="width:800px;height:500px;">
                        <div v-for="(item, index) in imgList" :key="index" style="width: 800px; height:500px">
                              <canvas style="width:400px;height:500px" ref="canvas" class="canvas" @mousedown="mouseDown(index,$event)" @mouseup="mouseUp(index,$event)"></canvas>
                              <!-- <img :src="item.敏感图片 ? 'http://develop.gangwaninfo.com:9999' + item.敏感图片 : 'http://develop.gangwaninfo.com:9999' + item.原始图像路径" alt="" class="img"  style="width: 100%; height: 100%;"/> -->
                        </div>
                       </div>
                       <div class="opt_btn">
                            <button class="printf">打印</button>
                            <button class="export">导出</button>
                            <button @click="mosaic" style="background: none;border: 1px solid #ccc">马赛克</button>
                            <button @click="save" style="background: none;border: 1px solid #ccc">保存</button>
                            <!-- <button style="background: none;border: 1px solid #ccc">导出图片</button> -->
                            <!-- <input type="color" id="color" v-model="col" @change="changeColor">
                            <input type="range" id="range" min="5" max="15" v-model="w" @change="changeRange">
                            <button id="palette" ref="palette" @click="changeState" style="background:none;border:1px solid #fff">{{text}}</button>
                            <button id="save" @click="save" style="background:none;border:1px solid #fff">保存</button> -->
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
      isMasic: false,
      isTranslate: false,
      image: '',
      canvas: '',
      context: [],
      ctx: [],
      squareEdgeLength: 2,
      beginX: '',
      beginY: '',
      endX: '',
      endY: '',
      index: 0,
      dataUUID: ''
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
     // console.log('this.$route.query.content',this.$route.query.content)
    // this.docName = this.docNames[0].身份号 ? this.docNames[0].身份号 : this.$route.query.content 
    this.get_danganxaingqing()
  },
  mounted () {
    // this.canvasCon = document.querySelector('canvas')
    
    this.$nextTick(function () {
      this.$data.data.forEach(row => {
        if (row.show) {
          this.$refs.tree.setCurrentKey(row.id)
          this.$refs.tree.store.nodesMap[row.id].expanded = true
        }
      })
    })
    // this.initData()
    this.getPersonList()
  },
  methods: {
    base64toFile (dataurl, filename = 'file') {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let suffix = mime.split('/')[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      })
    },
    save () {
      let formData = new FormData();
      formData.append('file',this.base64toFile(this.canvas[this.index].toDataURL("image/jpg")))
      formData.append('shenqing', this.$route.query.shenpi)
      formData.append('uuid', this.dataUUID)
      formData.append('tupianuuid',this.imgList[this.index].UUID)
      formData.append('name',this.imgList[this.index].图像名称)
      this.$api.application.docImg(formData).then(data => {
          console.log(data)
      })
    },
    resetClickStatus () {
      this.isMasic = false
      this.isTranslate = false
    },
    exportImg () {
      this.resetClickStatus()
      const exportUrl = this.canvas[this.index].toDataURL()
      let a = document.createElement('a')
      a.setAttribute('download', '')
      a.href = exportUrl
      document.getElementsByClassName('canvas')[this.index].appendChild(a)
      a.click()
    },
     mosaic () {
        let self = this
        this.resetClickStatus()
        this.isMasic = true
      },
      makeGrid (beginX, beginY, rectWidth, rectHight) {
        const row = Math.round(rectWidth / this.squareEdgeLength) + 1
        const column = Math.round(rectHight / this.squareEdgeLength) + 1
        for (let i = 0; i < row * column; i++) {
          let x = (i % row) * this.squareEdgeLength + beginX
          let y = parseInt(i / row) * this.squareEdgeLength + beginY
          this.setColor(x, y)
        }
      },
      setColor (x, y) {
        console.log(x,y)
        const imgData = this.context[this.index].getImageData(x, y, this.squareEdgeLength, this.squareEdgeLength).data
        console.log(imgData, '1111111')
        let r = 0, g = 0, b = 0
        for (let i = 0; i < imgData.length; i += 4) {
          r += imgData[i]
          g += imgData[i + 1]
          b += imgData[i + 2]
        }
        r = Math.round(r / (imgData.length / 3))
        g = Math.round(g / (imgData.length / 3))
        b = Math.round(b / (imgData.length / 3))
        this.drawRect(x, y, this.squareEdgeLength, this.squareEdgeLength, `rgb(${r},${g}, ${b})`, 1, `rgb(${r},${g}, ${b})`)
      },
      drawRect  (x, y, width, height, fillStyle, lineWidth, strokeStyle, globalAlpha) {
        
        this.context[this.index].beginPath()
        this.context[this.index].rect(x, y, width, height)
        this.context[this.index].lineWidth = lineWidth
        this.context[this.index].strokeStyle = strokeStyle
        fillStyle && (this.context[this.index].fillStyle = fillStyle)
        globalAlpha && (this.context[this.index].globalAlpha = globalAlpha)
 
        this.context[this.index].fill()
        this.context[this.index].stroke()
        console.log(this.context[this.index])
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
    // redirectUrl (url) {
    //     return 'http://localhost:8080' + encodeURIComponent(url);
    // },
    handleNodeClick (data) {
      this.dataUUID = data.UUID
      if (data.父代码 !== '根') {
        this.$api.build.imageList({
          uuid: data.UUID
        }).then(data => {
           this.imgList = !data.message ? data : []
          this.$nextTick(function () {
              this.$data.imgList.forEach((item, index) => {
                  let imgContent = this.$refs.canvas
                  this.canvas = imgContent
                  this.context[index] =imgContent[index].getContext('2d')
                  let Img = new Image()
                  Img.style.width="400px"
                  Img.style.height="500px"
                  // Img.crossOrigin = 'anonymous'
                  this.image = Img
                  Img.src = 'http://develop.gangwaninfo.com:9999' + item.原始图像路径
                  // console.log(this.redirectUrl(item.原始图像路径))
                  Img.onload = () => {
                    this.context[index].drawImage(Img, 0, 0, 400, 500)
                  }
              })
          })
        }).then(() => {
            if (this.imgList) {
                var turnWidth = $('#cover').outerWidth(),
                    turnHeight = $('#cover').outerHeight();
                $('#loopDiv').turn({
                  width: turnWidth * 2 + 20,
                  height: turnHeight,
                  elevation: 50,
                  gradients: true,
                  autoCenter: true,
                  display: 'double',
                  when: { turning:(event, page, pageObject) => {
                    console.log(page, 'page')
                  }}
                });
              }
          })
      }
    },
    editDocImg () {
      
    },
    mouseDown (index,e) {
      console.log(e)
      this.index= index
      // this.canvas.addEventListener('mousedown', e => {
        this.beginX = e.offsetX
        this.beginY = e.offsetY
      // })
    },
    mouseUp (index,e) {
      this.index = index
      this.endX = e.offsetX
      this.endY = e.offsetY
      if (this.isMasic) {
        this.makeGrid(this.beginX, this.beginY, this.endX - this.beginX, this.endY - this.beginY)
        return
      }
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
    // width: 100%;
    width: 800px;
    height: 500px;
    margin: 0 auto !important;
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
