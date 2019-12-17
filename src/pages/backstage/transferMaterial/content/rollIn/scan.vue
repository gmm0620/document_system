<template>
    <div class="stage1">
        <h3>扫描材料</h3>
        <button class="back1 point" @click="">操作提示</button>
        <button class="back point" @click="back">返回</button>
        <div>
            <div class="left">
              <div class="top">
                   <el-table
                    :data="tableData"
                    >
                    <el-table-column
                        prop="ids"
                        label="序"
                        width="30"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="姓名"
                        label="姓名"
                        width="70"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="部职别"
                        label="部职别"
                        width="90"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="材料名称"
                        label="材料名称"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="图片页数"
                        label="图片页数"
                        width="80"
                    >
                    </el-table-column>
                    </el-table>
                  <PositionHorn />
              </div>
              <div class="bottom">
                <div class="queue">档案目录</div>
                <div class="choose"><i class="el-icon-full-screen">选择扫描仪</i></div>
                <div class="type">
                  <div>扫描仪类型</div>
                  <div>
                    <input type="radio" name="type"> <span>平板/拍摄扫描仪</span>
                  </div>
                  <div>
                    <input type="radio" name="type"> <span>高速扫描仪</span>
                  </div>
                </div>
                <PositionHorn />
              </div>
            </div>
            <div class="right">
                <div class="bottom">
                  <div class="left_img">
                    <div class="suoluetu">缩略图</div>
                    <div class="imgs">
                      <dl>
                        <dt><img src="../../../../../assets/images/book.png" alt=""></dt>
                        <dd>图片名称1.png</dd>
                      </dl>
                      <dl>
                        <dt><img src="../../../../../assets/images/book.png" alt=""></dt>
                        <dd>图片名称1.png</dd>
                      </dl>
                      <dl>
                        <dt><img src="../../../../../assets/images/book.png" alt=""></dt>
                        <dd>图片名称1.png</dd>
                      </dl>
                      <dl>
                        <dt><img src="../../../../../assets/images/book.png" alt=""></dt>
                        <dd>图片名称1.png</dd>
                      </dl>
                    </div>
                  </div>
                  <div class="right_img">
                    <div class="opt">
                      <div>
                        <span>图像缩放</span>
                        <button><i class="el-icon-zoom-in"></i>放大</button>
                        <button><i class="el-icon-zoom-out"></i>缩小</button>
                      </div>
                      <div>
                        <span>图像基本处理</span>
                        <button>剪裁</button>
                        <button><i class="el-icon-zoom-out"></i>左旋</button>
                        <button><i class="el-icon-zoom-out"></i>右旋</button>
                      </div>
                    </div>
                    <div class="current-img">
                      <div>
                        <img src="../../../../../assets/images/book.png" alt="">
                      </div>
                    </div>
                  </div>
                  <PositionHorn />
                </div>
            </div>
        </div>
        <div class="uploadModel" v-if="uploadModel">
            <div>
              <div class="title">上传图片至目录<span class="close" @click="cancelUp">×</span></div>
              <div class="cont">
                <p><span class="color">上传内容:</span>&nbsp;&nbsp;<span>原始图片；优化后图片</span></p>
                <p><span class="color">上传至材料类别:</span>&nbsp;&nbsp;<span>干部简历</span></p>
                <p><span class="color">上传至材料名称:</span>&nbsp;&nbsp;<span>1991年简历表</span></p>
                <p><span class="color">图片页数:</span>&nbsp;&nbsp;<span>45</span></p>
              </div>
              <div class="btn">
                <button class="cancel" @click="cancelUp">取消</button>
                <button class="up" @click="up">上传</button>
              </div>
              <PositionHorn/>
            </div>
        </div>
    </div>
</template>

<script>
import PositionHorn from '@/components/Postion_Horn'
export default {
  name: 'stage',
  data () {
    return {
      tableData: [
        {
          ids: 1,
          '姓名': '赵河北',
          '部职别': '空军第一大队飞行中队',
          '材料名称': '干部简历',
          '图片页数': 5
        },
        {
          ids: 2,
          '姓名': '王江苏',
          '部职别': '空军第一大队飞行中队',
          '材料名称': '干部简历',
          '图片页数': 5
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      radio: false,
      type: true,
      clmc: '1989年干部简历',
      did: true,
      classModel: false,
      uploadModel: false
    }
  },
  components: {
    PositionHorn
  },
  created () {
    // this.getResult()
    // this.queryCondition()
  },
  methods: {
    imgOpt () {
      this.$router.push('/home/backstage/image_opt')
    },
    cancelUp () {
      this.uploadModel = false
    },
    up () {
      this.uploadModel = false
    },
    back () {
      this.$router.back()
    },
    upload () {
      this.uploadModel = true
    },
    changeType (type) {
      if (type === 1) {
        this.type = true
      } else {
        this.type = false
      }
    },
    handleNodeClick (data) {
      console.log(data)
    },
    newBuild () {
      this.did = false
      this.clmc = ''
    },
    cancel () {
      this.did = true
      this.clmc = '1989年干部材料'
    },
    addClass () {
      this.classModel = true
    },
    close () {
      this.classModel = false
    },
    scanMaterial () {
      this.$router.push('/home/backstage/scan_material')
    }
  }
}
</script>

<style lang="scss" scoped>
.stage1 {
  @include wh(1200px, auto);
  margin: 0 auto;
  position: relative;
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
  & > div {
    @include box_flex;
    @include justify(space-between);
    position: relative;
    &>.left {
      .queue {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0 16px;
        background:rgba(2,154,254,0.15);
        @include sizing;
        font-size: 13px;
        color: #fff;
        position: relative;
        z-index: 999;
      }
      .top {
        position: relative;
        z-index: 999;
        @include wh(350px, 620px);
        overflow: hidden;
        background:rgba(5,27,74,0.22);
        border:1px solid rgba(10,67,188,1);
        box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
        opacity:0.8;
        overflow: hidden;
        @include box_flex;
        @include direction(column);
      }
      .bottom {
        margin-top: 24px;
        width: 350px;
        height: 215px;
        position: relative;
        z-index: 999;
        overflow: hidden;
        background:rgba(5,27,74,0.22);
        border:1px solid rgba(10,67,188,1);
        box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
        opacity:0.8;
        .choose {
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          padding: 0 24px;
          @include sizing;
          border-bottom: 1px solid rgba(3,94,255,0.4);
        }
        .type {
          line-height: 30px;
          padding: 16px 24px;
          @include sizing;
        }
      }
    }
    .right {
      @include flex;
      margin-left: 16px;
      .top {
        min-height: 60px;
        height: auto;
        width: 100%;
        position: relative;
        background:rgba(5,27,74,0.22);
        border:1px solid rgba(10,67,188,1);
        box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
        .top_btn {
          // margin: 0 16px;
          height: 60px;
          @include box_flex;
          @include justify(space-around);
          @include align(center);
          position: relative;
          z-index: 9999;
          button {
            width: 80px;
            height: 30px;
            color: #fff;
            border: none;
            background:linear-gradient(180deg,rgba(5,141,252,1) 0%,rgba(12,96,200,1) 100%);
            box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 2px 0px rgba(255,255,255,0.5);
            border-radius:2px;
            &.create {
              background:linear-gradient(180deg,rgba(194,194,194,1) 0%,rgba(91,112,131,1) 100%);
            }
            &.scan {
              background:linear-gradient(0deg,rgba(166,242,189,1),rgba(34,162,72,1));
            }
          }
        }
      }
      .bottom {
        @include box_flex;
        width: 100%;
        height: auto;
        position: relative;
        background:rgba(5,27,74,0.22);
        border:1px solid rgba(10,67,188,1);
        box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
        .base {
          margin-bottom: 16px;
        }
        .base, .zhuanyou {
          // padding: 0 16px;
          &>div {
            @include box_flex;
            @include sizing;
            @include flexWrap(wrap);
            margin: 0 auto;
          }
          h4 {
            height: 40px;
            margin-top: 0px;
            line-height: 40px;
            padding: 0 16px;
            font-size: 14px;
            background:rgba(3,94,255,0.15);
            &::after {
              content: '';
              display: inline-block;
              width: 86px;
              height: 20px;
              position: relative;
              top: 8px;
              left: 10px;
              background: url('../../../../../assets/images/tit-right.png') no-repeat;
            }
          }
        }
        .zhuanyou .inputInfo:last-child {
              width: 100%;
        }
        .inputInfo {
            position: relative;
            z-index: 999;
            margin-top: 16px;
            margin-left: 56px;
            @include box_flex;
            span {
                font-size: 13px;
                display: inline-block;
                width: 56px;
                line-height: 32px;
                text-align: right;
                &.pos {
                    width: 80px;
                }
                &.short {
                    position: relative;
                    bottom: 126px;
                }
            }
            input {
                width: 320px;
                height: 30px;
                color: #ccc;
                padding: 0 8px;
                box-sizing: border-box;
                background:rgba(3,94,255,0.15);
                border-radius:2px;
                border:1px solid rgba(10,67,188,0.94);
                margin-left: 8px;
                // margin-right:
            }
            textarea {
                display: inline-block;
                margin-left: 8px;
                width: 320px;
                height: 110px;
                background:rgba(3,94,255,0.15);
                border-radius:2px;
                border:1px solid rgba(10,67,188,0.94);
                padding: 8px;
                box-sizing: border-box;
                color: #ccc;
            }
            .getInfo {
                width:100px;
                height:32px;
                background:rgba(3,129,255,0.26);
                border-radius:2px;
                border:1px solid rgba(10,67,188,1);
                color: #00FEFF;
                margin-left: 8px;
            }
        }
        .btn {
            text-align: center;
            margin-top: 16px;
            position: relative;
            z-index: 999;
            button {
                border: none;
                background: none;
                width:80px;
                box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 2px 0px rgba(255,255,255,0.5);
                height:30px;
            }
            .edit, .cancel {
                background:linear-gradient(180deg,rgba(5,141,252,1) 0%,rgba(12,96,200,1) 100%);
                margin-right: 8px;
                border-radius:2px;
            }
            .doc, .submit {
                border-radius:2px;
                border:1px solid rgba(0,254,255,1);
                color: #0ff;
            }
        }
        .left_img {
          width: 200px;
          border-right: 1px solid rgba(10,67,188,0.65);
          @include box_flex;
          @include direction(column);
          .suoluetu {
            @include sizing;
            width: 100%;
            height: 40px;
            padding: 0 16px;
            font-size: 14px;
            line-height: 40px;
            border-bottom: 1px solid rgba(10,67,188,0.65);
          }
          .imgs {
            width: 100%;
            @include flex;
            @include box_flex;
            @include justify(center);
            @include align(center);
            @include direction(column);
            padding: 8px 0;
            margin-top: 8px;
            dl {
              text-align: center;
              width: 120px;
              margin-bottom: 16px;
              dt {
                width: 120px;
                height: 160px;
                background:rgba(216,216,216,1);
                @include box_flex;
                @include justify(center);
                @include align(center);
              }
              dd {
                line-height: 24px;
              }
            }
            img {
              width: 60px;
              height: 40px;
            }
          }
        }
        .right_img {
          @include flex;
          @include box_flex;
          @include direction(column);
          .opt {
            height: 40px;
            border-bottom: 1px solid rgba(10,67,188,1);
            @include box_flex;
            @include align(center);
            span {
              padding:0 16px;
            }
            button {
              border: none;
              width:75px;
              height:30px;
              background:rgba(3,94,255,0.36);
              border-radius:2px;
              border:1px solid rgba(10,67,188,0.94);
              color: #fff;
              margin-right: 8px;
              font-size: 14px;
              i {
                padding-right: 8px;
                font-size: 16px;
              }
            }
          }
          .current-img {
            @include flex;
            @include box_flex;
            @include justify(center);
            @include align(center);
            &>div {
              width:560px;
              height:720px;
              background:rgba(216,216,216,1);
               @include box_flex;
                @include justify(center);
                @include align(center);
            }
          }
        }
      }
    }
  }
  .classModel {
    position: absolute;
    z-index: 9999;
    left: 150px;
    top: 75px;
    width:320px;
    height:132px;
    background:rgba(5,27,74,1);
    box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2);
    border:1px solid rgba(10,67,188,0.65);
    .title {
      width:320px;
      height:24px;
      background:rgba(11,67,187,1);
      box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2);
      opacity:0.7;
      border:1px solid rgba(10,67,188,1);
      line-height: 24px;
      @include box_flex;
      @include justify(space-between);
      padding: 0 8px;
      box-sizing: border-box;
      color: #fff;
    }
    .leibie {
      @include box_flex;
      margin: 24px 0 0 16px;
      line-height: 30px;
      select {
        width:220px;
        height:30px;
        background:rgba(3,94,255,0.15);
        border-radius:2px;
        border:1px solid rgba(10,67,188,0.94);
        margin-left: 8px;
        color: #ccc;
        option {
          background:rgba(3,94,255,0.15);
        }
      }
    }
    .applcaition {
      // text-align: center;
      border: none;
      width:105px;
      height:30px;
      background:linear-gradient(180deg,rgba(5,141,252,1) 0%,rgba(12,96,200,1) 100%);
      box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 2px 0px rgba(255,255,255,0.5);
      border-radius:2px;
      margin-left: 16px;
      margin-top: 8px;
    }
  }
  .back {
    position: absolute;
    right: 0;
    top: 0;
    width:60px;
    height:24px;
    background:rgba(3,129,255,0.26);
    border-radius:2px;
    border:1px solid rgba(10,67,188,1);
    color: #fff;
  }
  .back1 {
    position: absolute;
    right: 70px;
    top: 0;
    width:60px;
    height:24px;
    background:rgba(3,129,255,0.26);
    border-radius:2px;
    border:1px solid rgba(10,67,188,1);
    color: #fff;
  }
  .uploadModel {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:rgba(0,0,0,.7);
    // opacity:0.7;
    z-index: 9999;
    @include box_flex;
    @include justify(center);
    @include align(center);
    &> div {
      position: relative;
      width: 500px;
      height: 282px;
      background:rgba(5,27,74,1);
      box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2) inset;
      border:1px solid rgba(10,67,188,0.65);
      .title {
        height:40px;
        background:rgba(11,67,187,1);
        box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2);
        opacity:0.7;
        border:1px solid rgba(10,67,188,1);
        line-height: 40px;
        font-size: 14px;
        padding: 0 16px;
        position: relative;
        z-index: 9999;
        span {
          position: absolute;
          font-size: 24px;
          right: 16px;
        }
      }
      p {
        line-height: 35px;
        font-size: 14px;
      }
      .color {
        color:#019AFE;
      }
      .cont {
        padding: 16px 24px;
      }
      .btn {
        margin-left: 250px;
        margin-top: 20px;
        position: relative;
        z-index: 9999;
      }
      button {
        border: none;
        width:80px;
        height:30px;
        border-radius:2px;
        background: none;
        &.cancel {
          box-shadow:0px 2px 10px 0px rgba(0,0,0,0.53);
          border:1px solid rgba(0,254,255,1);
          color:#019AFE;
        }
        &.up {
          background:linear-gradient(180deg,rgba(5,141,252,1) 0%,rgba(12,96,200,1) 100%);
          box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 2px 0px rgba(255,255,255,0.5);
        }
      }
    }
  }
}
</style>
