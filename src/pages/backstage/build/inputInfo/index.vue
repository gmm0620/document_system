<template>
  <div class="stage">
    <h3>
      录入纸质档案信息
      <button class="back point" @click="back">返回</button>
    </h3>
    <div class="info">
      <div class="input">
        <div class="personId inputInfo">
          <span>姓名</span>
          <input type="text" v-model="name" />
          <button class="getInfo point">获取库房信息</button>
        </div>
        <div class="inputInfo">
          <span>身份号</span>
          <input type="text" v-model="sfh" />
        </div>
        <div class="inputInfo">
          <span>档案号</span>
          <input type="text" v-model="danganID" />
        </div>
        <div class="inputInfo">
          <span>建档时间</span>
          <!-- <input type="text" v-model="danganID"> -->
          <el-date-picker v-model="jiandangdate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </div>
        <div class="inputInfo">
          <span>是否缺件</span>
          <select v-model="isqj">
            <option>否</option>
            <option>是</option>
          </select>
        </div>
        <div class="inputInfo">
          <span>存放位置</span>
          <input type="text" v-model="cfwz" />
        </div>
        <div class="inputInfo">
          <span>RFID码</span>
          <input type="text" v-model="rfid" />
        </div>
        <!--<div class="inputInfo">
                    <span class="pos">人员来源</span>
                    <input type="text" v-model="type">
        </div>-->
        <div class="inputInfo">
          <span class="pos">档案现状</span>
          <select v-model="state">
            <option v-for="(item, index) in daxz" :value="item['代码']" :key="index">{{item['名称']}}</option>
          </select>
        </div>
        <div class="inputInfo">
          <span class="pos">自传数量</span>
          <input type="text" v-model="zzsl" placeholder="请输入数字类型" onkeyup = "value=value.replace(/[^\d]/g,'')"/>
        </div>
        <div class="inputInfo">
          <span>现自传职级</span>
          <input type="text" v-model="zzzj" />
        </div>
        <div class="inputInfo">
          <span>现自传日期</span>
<!--          <input type="text" v-model="zzrq" />-->
          <el-date-picker v-model="zzrq" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
<!--          <el-date-picker style="z-index: 99"-->
<!--            v-model="zzrq">-->
<!--          </el-date-picker>-->
        </div>
        <div class="inputInfo">
          <span>现管机构</span>
          <input type="text" v-model="organizationName" />
        </div>
        <div class="inputInfo">
          <span>选择现管机构</span>
          <div class="tree">
            <el-tree
              :data="data"
              :props="defaultProps"
              highlight-current
              @node-click="handleNodeClick"
            ></el-tree>
          </div>
        </div>
        <div class="inputInfo">
          <span class="short">缺件情况</span>
          <textarea v-model="qjqk"></textarea>
        </div>
      </div>
      <div class="btn" style="z-index: 1">
        <button class="submit point" @click="submit">提交</button>
        <button class="reset point" @click="reset">重置</button>
      </div>
      <position-horn />
    </div>
  </div>
</template>

<script>
import PositionHorn from "@/components/Postion_Horn";
export default {
  name: "inputInfo",
  data() {
    return {
      sfh: "",
      type: "",
      danganID: "",
      gljg: "",
      cfwz: "",
      jdsj: "",
      state: "",
      qjqk: "",
      rfid: "",
      xgjg: "",
      zzsl: "",
      zzzj: "",
      zzrq: "",
      isqj: "否",
      jiandangdate: "",
      organizationName: "",
      daxz: [],
      defaultProps: {
        children: "children",
        label: "单位名称",
        jgmcm: "机构名称码"
      },
      data: [],
      userInfo: {}
    };
  },
  components: {
    PositionHorn
  },
  created() {
    this.getPersonInfo();
    this.userInfo = JSON.parse(document.cookie.split("=")[1]);
    this.getPosition();
    this.getBaseInfo();
    this.getState();
  },
  methods: {
    getPersonInfo() {
      this.$api.build
        .getPersonInfo({
          sfh: this.$route.query.sfh
        })
        .then(data => {
          // this.info = data[0]
          // this.info['纸质建档时间'] = data[0]['纸质建档时间'].slice(0, 10)
          console.log(777,data);
          this.type = data[0]["人员来源类别"];
          this.danganID = data[0]["档案号"];
          if (data[0]["纸质建档时间"]) {
            this.jiandangdate = data[0]["纸质建档时间"].slice(0, 10);
          }
          this.cfwz = data[0]["存放位置"];
          this.rfid = data[0]["RFID码"];
          this.state = data[0]["档案现状"];
          this.zzsl = data[0]["自传数"];
          this.zzzj = data[0]["现自传职级"];
          if (data[0]["现自传日期"]) {
            this.zzrq = data[0]["现自传日期"].slice(0, 10);
          }
          this.organizationName = data[0]["现管单位名称"];
          this.gljg = data[0]["现管单位机构名称码"];
          this.qjqk = data[0]["纸质缺件情况"];
        });
    },
    getPosition() {
      this.$api.build
        .unitTreeQuery({
          parentCode: this.userInfo["权限范围"]
        })
        .then(data => {
          this.data = data["allUnitsList"];
        });
    },
    back() {
      this.$router.back();
    },
    getState() {
      this.$api.application.queryCondition().then(data => {
        this.daxz = data["档案现状"];
      });
    },
    getBaseInfo() {
      this.name = this.$route.query.name;
      this.sfh = this.$route.query.sfh;
      this.type = this.$route.query.type;
    },
    handleNodeClick(data) {
      this.gljg = data["机构名称码"];
      this.organizationName = data["单位名称"];
    },
    submit() {
        // this.zzrq = this.zzrq.slice(0, 10);
        // console.log('this.zzrq',this.zzrq)
      this.$api.build.addpaperArchives({
        sfh: this.sfh,
        danganhao: this.danganID,
        // laiyuantype: this.type,
        location: this.cfwz,
        state: this.state,
        qjqk: this.qjqk,
        rfid: this.rfid,
        organization: this.gljg,
        organizationName: this.organizationName,
        zzs: this.zzsl,
        xzzzj: this.zzzj,
        xzzrq: this.zzrq,
        sfqj: this.isqj,
        jiandangdate: this.jiandangdate
      })
      .then(data => {
        console.log(data);
        this.$message("提交成功");
        this.$router.back();
      });
    },
    reset() {
      this.danganID = "";
      this.gljg = "";
      this.cfwz = "";
      this.jdsj = "";
      this.state = "";
      this.qjqk = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.stage {
  @include wh(1200px, auto);
  margin: 0 auto;
  position: relative;
  h3 {
    font-size: 16px;
    margin: 16px 8px;
    position: relative;
    &::before {
      content: "";
      display: inline-block;
      margin-left: 8px;
      width: 6px;
      height: 20px;
      background: #029afe;
      position: relative;
      right: 8px;
      top: 4px;
    }
  }
  & > div {
    @include box_flex;
    @include wh(100%, auto);
    padding-bottom: 16px;
    position: relative;
    background: rgba(5, 27, 74, 0.15);
    box-shadow: 0px 0px 26px 0px rgba(0, 229, 255, 0.2) inset;
    border: 1px solid rgba(10, 67, 188, 0.32);
    .input {
      padding: 0 100px;
      padding-top: 40px;
      @include sizing;
      @include box_flex;
      // @include justify(center);
      @include flexWrap(wrap);
      position: relative;
      .personId {
        width: 100%;
      }
      .inputInfo {
        position: relative;
        // z-index: 999;
        margin-bottom: 16px;
        margin-right: 16px;
        .el-input {
          width: 220px;
        }
        span {
          font-size: 13px;
          display: inline-block;
          width: 80px;
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
        select {
          width: 220px;
          height: 30px;
          background: rgba(3, 94, 255, 0.15);
          border-radius: 2px;
          border: 1px solid rgba(10, 67, 188, 0.94);
          margin-left: 8px;
          outline: none;
          padding: 0 8px;
          box-sizing: border-box;
          color: #eee;
        }
        input {
          width: 220px;
          height: 30px;
          background: rgba(3, 94, 255, 0.15);
          border-radius: 2px;
          border: 1px solid rgba(10, 67, 188, 0.94);
          margin-left: 8px;
          // margin-right:
        }
        textarea {
          display: inline-block;
          color: #ddd;
          padding: 4px 8px;
          box-sizing: border-box;
          margin-left: 8px;
          width: 856px;
          height: 144px;
          background: rgba(3, 94, 255, 0.15);
          border-radius: 2px;
          border: 1px solid rgba(10, 67, 188, 0.94);
        }
        .getInfo {
          width: 100px;
          height: 32px;
          background: rgba(3, 129, 255, 0.26);
          border-radius: 2px;
          border: 1px solid rgba(10, 67, 188, 1);
          color: #00feff;
          margin-left: 8px;
        }
        .tree {
          position: relative;
          z-index: 9999;
          bottom: 44px;
          left: 90px;
        }
      }
    }
    .btn {
      text-align: center;
      button {
        border: none;
        background: none;
        width: 80px;
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.53),
          0px 1px 2px 0px rgba(255, 255, 255, 0.5);
        height: 30px;
      }
      .submit {
        background: linear-gradient(
          180deg,
          rgba(5, 141, 252, 1) 0%,
          rgba(12, 96, 200, 1) 100%
        );
        border-radius: 2px;
      }
      .reset {
        border-radius: 2px;
        border: 1px solid rgba(0, 254, 255, 1);
        color: #0ff;
      }
    }
  }
  .back {
    position: absolute;
    right: 0;
    top: 0;
    width: 60px;
    height: 24px;
    background: rgba(3, 129, 255, 0.26);
    border-radius: 2px;
    border: 1px solid rgba(10, 67, 188, 1);
    color: #fff;
  }
  input {
    color: #cccccc;
    padding: 0 8px;
    box-sizing: border-box;
  }
  button {
    position: relative;
    /*z-index: 9999;*/
  }
}
</style>
