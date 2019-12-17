<template>
  <div class="role user">
    <h3>角色管理</h3>
    <div class="inset">
      <h4>系统内置角色</h4>
      <div>
        <el-table :data="list" style="width: 100%">
          <el-table-column prop="ID" label="ID" width="80"></el-table-column>
          <el-table-column prop="角色名称" label="角色名称" width="180"></el-table-column>
          <el-table-column prop="角色描述" label="角色描述" width="640"></el-table-column>
          <el-table-column prop="option" label="操作">
            <div slot-scope="scope">
              <button class="btn point" @click="limit(scope.row, 'father')">权限维护</button>
              <button class="btn point" @click="addRole(scope.row)">添加子角色</button>
            </div>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="child">
      <h4>本级添加子角色</h4>
      <div>
        <el-table :data="childList" style="width: 100%">
          <el-table-column prop="ID" label="ID" width="80"></el-table-column>
          <el-table-column prop="角色名称" label="子角色名称" width="150"></el-table-column>
          <el-table-column prop="父角色" label="父角色" width="150"></el-table-column>
          <el-table-column prop="角色描述" label="子角色描述" width="520"></el-table-column>
          <el-table-column prop="option" label="操作">
            <div slot-scope="scope">
              <button class="btn point" @click="limit(scope.row, 'son')">权限维护</button>
              <button class="btn point" @click="deleteRole(scope.row)">删除</button>
            </div>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <PostionHorn />
    <div v-if="saveModel" class="save_model">
      <div class="con_3">
        <h3>
          <span>方案信息</span>
          <span class="close" @click="close">×</span>
        </h3>
        <div class="project_name">
          <h5>
            <span class="must">*</span>名称角色
          </h5>
          <input type="text" v-model="addrole.jsmc" placeholder="请输入角色名称" style="color: #fff" />
        </div>
        <div class="project_desc">
          <h5>
            <span class="must">*</span>角色描述
          </h5>
          <textarea
            name
            id
            cols="30"
            rows="10"
            placeholder="请填写角色描述"
            v-model="addrole.jsms"
            style="color: #fff"
          ></textarea>
        </div>
        <div class="project_btn">
          <button class="cancel" @click="cancel">取消</button>
          <button class="submit" @click="submit">提交</button>
        </div>
        <PostionHorn />
      </div>
    </div>
  </div>
</template>

<script>
import PostionHorn from "@/components/Postion_Horn";
export default {
  name: "role",
  data() {
    return {
      tableData: [
        {
          ids: 1,
          角色名称: "档案使用人员",
          角色描述: "主要为业务部门使用档案人员"
        },
        {
          ids: 2,
          角色名称: "业务部门领导",
          角色描述: "主要用于审批档案利用的申请档案管理部门人员"
        },
        {
          ids: 3,
          角色名称: "档案管理人员",
          角色描述: "主要为档案管理部门的业务"
        },
        {
          ids: 4,
          角色名称: "档案主管领导",
          角色描述:
            "档案管理部门领导，主要负责审批信息变更、材料撤换、材料删除等重要事项"
        },
        {
          ids: 5,
          角色名称: "系统管理人员",
          角色描述: "负责系统配置和维护"
        },
        {
          ids: 6,
          角色名称: "数据维护人员",
          角色描述: "用于接收数据更新提醒信息"
        }
      ],
      list: [
        {
          ids: 1,
          子角色名称: "档案扫描员",
          父角色: "档案使用人员",
          子角色描述: "主要专职负责扫描电子档案，以及档案信息录入"
        },
        {
          ids: 2,
          子角色名称: "业务部门领导a",
          父角色: "业务部门领导",
          子角色描述: "临时来的一个领导"
        },
        {
          ids: 3,
          子角色名称: "档案管理人员a",
          父角色: "档案管理人员",
          子角色描述: "档案管理人员"
        }
      ],
      currpage: 1,
      pagesize: 6,
      concatModel: true,
      saveModel: false,
      childList: [],
      addrole: {
        jsmc: "",
        jsms: ""
      },
      fudaima: "",
      fudaimaChild: "",
      userInfo: {}
    };
  },
  components: {
    PostionHorn
  },
  created() {
    this.userInfo = JSON.parse(document.cookie.split("=")[1]);
    console.log("this.userInfo", this.userInfo);
    // this.getApproval()
    this.getList();
    this.getChildList();
  },
  methods: {
    limit(code, juese) {
      this.$router.push("/home/backstage/system-management/limit?daima=" + JSON.stringify(code) + "&juese=" + juese);
    },
    addRole(data) {
      this.saveModel = true;
      this.fudaima = data.代码;
    },
    getList() {
      this.$api.systemSet.roleList().then(res => {
        this.list = res.map((item, index) => {
          item["ID"] = index + 1;
          return item;
        });
        console.log(res);
      });
    },
    close() {
      this.saveModel = false;
    },
    cancel() {
      this.saveModel = false;
    },
    getChildList() {
      console.log(this.userInfo["身份号"]);
      this.$api.systemSet
        .childRoleList({
          sfh: this.userInfo["身份号"]
        })
        .then(data => {
          console.log("data", data);
          this.childList = data.map((item, index) => {
            item["ID"] = index + 1;
            return item;
          });
        });
    },
    // changeChild (row) {
    //   this.fudaimaChild = row['代码']
    //   this.$api.systemSet.childRoleList({
    //     fudaima: this.fudaimaChild
    //   }).then((data) => {
    //       this.childList = data.map((item, index) => {
    //         item['ID'] = index + 1
    //         return item
    //     })
    //   })
    //   console.log(row)
    // },
    submit() {
      // console.log(datas, 'tijiao')
      this.saveModel = false;
      console.log(this.userInfo["身份号"]);
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      this.$api.systemSet
        .addRole({
          jsmc: this.addrole.jsmc,
          jsms: this.addrole.jsms,
          fudaima: this.fudaima,
          sfh: this.userInfo["身份号"],
          addDate: y + "-" + m + "-" + d
        })
        .then(data => {
          console.log(data);
          this.getChildList();
          // this.changeChild(this.fudaimaChild)
        });
    },
    deleteRole(datas) {
      this.$api.systemSet
        .deleteRole({
          jsUUID: datas.UUID,
          daima: datas["代码"]
        })
        .then(data => {
          this.getChildList();
          console.log(data);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.role {
  width: 100%;
  height: auto;
  position: relative;
   z-index: 0;
  background: rgba(5, 27, 74, 0.22);
  box-shadow: 0px 0px 26px 0px rgba(0, 229, 255, 0.2) inset;
  border: 1px solid rgba(10, 67, 188, 0.32);
  & > h3 {
    height: 24px;
    margin-bottom: 8px;
    font-size: 14px;
    position: relative;
    top: 8px;
    left: 16px;
    &::after {
      content: "";
      @include wh(87px, 12px);
      display: inline-block;
      margin-left: 8px;
      background: url("../../../assets/images/tit-right.png");
    }
  }
  .inset,
  .child {
    margin: 16px 24px;
    h4 {
      font-size: 13px;
      // line-height: px;
    }
    & > div {
      margin-top: 8px;
    }
  }
}
.save_model {
  position: fixed;
  z-index: 9999;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  @include box_flex;
  @include justify(center);
  @include align(center);
  .con_3 {
    // padding: 0;
    position: relative;
    @include wh(500px, 368px);
    background: rgba(5, 27, 74, 1);
    box-shadow: 0px 0px 26px 0px rgba(0, 229, 255, 0.2) inset;
    border: 1px solid rgba(10, 67, 188, 0.65);
    h3 {
      box-sizing: border-box;
      position: relative;
      z-index: 999;
      height: 40px;
      width: 100%;
      background: rgba(11, 67, 187, 1);
      box-shadow: 0px 0px 26px 0px rgba(0, 229, 255, 0.2);
      opacity: 0.7;
      border: 1px solid rgba(10, 67, 188, 1);
      @include box_flex;
      @include justify(space-between);
      span {
        font-size: 15px;
        color: #fff;
        line-height: 40px;
        margin-left: 16px;
        // line-height:20px;
      }
      .close {
        font-size: 20px;
        color: #029afe;
        margin-right: 16px;
      }
    }
    .project_name,
    .project_desc {
      position: relative;
      z-index: 999;
      margin: 24px 24px 0 24px;
      box-sizing: border-box;
      h5 {
        margin-bottom: 8px;
        font-size: 13px;
        .must {
          color: #f00;
          font-size: 14px;
          padding-right: 8px;
        }
      }
      input {
        width: 100%;
        height: 30px;
        background: rgba(3, 94, 255, 0.15);
        border-radius: 2px;
        border: 1px solid rgba(10, 67, 188, 0.94);
        padding: 0 16px;
        box-sizing: border-box;
      }
      textarea {
        width: 100%;
        height: 120px;
        background: rgba(3, 94, 255, 0.15);
        border-radius: 2px;
        border: 1px solid rgba(10, 67, 188, 0.94);
        padding: 0 16px;
        box-sizing: border-box;
        line-height: 24px;
      }
    }
    .project_btn {
      position: absolute;
      right: 24px;
      bottom: 16px;
      z-index: 999;
      .cancel {
        border: none;
        background: none;
        color: aqua;
        width: 80px;
        height: 30px;
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.53);
        border-radius: 2px;
        border: 1px solid rgba(0, 254, 255, 1);
      }
      .submit {
        border: none;
        width: 80px;
        height: 30px;
        background: linear-gradient(
          180deg,
          rgba(5, 141, 252, 1) 0%,
          rgba(12, 96, 200, 1) 100%
        );
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.53),
          0px 1px 2px 0px rgba(255, 255, 255, 0.5);
        border-radius: 2px;
      }
    }
  }
  .con_4 {
    width: 1000px;
    height: 505px;
    background: rgba(5, 27, 74, 1);
    box-shadow: 0px 0px 26px 0px rgba(0, 229, 255, 0.2);
    border: 1px solid rgba(10, 67, 188, 0.65);
    .project_btn {
      left: 500px;
      margin-left: -84px;
      bottom: 40px;
    }
    .success_hint {
      position: relative;
      z-index: 999;
      @include wh(100%, 170px);
      @include box_flex;
      @include justify(center);
      @include align(center);
      .el-icon-circle-check {
        @include wh(90px, 90px);
        font-size: 90px;
        color: #20fe3c;
        text-align: center;
      }
    }
    .hint {
      @include wh(100%, auto);
      text-align: center;
      h3 {
        font-size: 18px;
      }
      p {
        font-size: 12px;
        margin-top: 8px;
      }
    }
    .application_info {
      margin: 40px 358px;
      h4 {
        color: #029afe;
        font-size: 13px;
        line-height: 20px;
      }
      p {
        line-height: 30px;
        font-size: 13px;
      }
    }
    .close_info {
      position: absolute;
      z-index: 999;
      right: 8px;
      font-size: 24px;
      color: #029afe;
      top: 8px;
    }
  }
  .project_btn {
    position: absolute;
    right: 24px;
    bottom: 16px;
    z-index: 999;
    .cancel,
    .goback {
      border: none;
      background: none;
      color: aqua;
      width: 80px;
      height: 30px;
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.53);
      border-radius: 2px;
      border: 1px solid rgba(0, 254, 255, 1);
      margin-right: 8px;
    }
    .submit,
    .my_application {
      border: none;
      width: 80px;
      height: 30px;
      background: linear-gradient(
        180deg,
        rgba(5, 141, 252, 1) 0%,
        rgba(12, 96, 200, 1) 100%
      );
      box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.53),
        0px 1px 2px 0px rgba(255, 255, 255, 0.5);
      border-radius: 2px;
    }
  }
}
.cancel {
  border: none;
  background: none;
  color: aqua;
  width: 80px;
  height: 30px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.53);
  border-radius: 2px;
  border: 1px solid rgba(0, 254, 255, 1);
}
.submit {
  border: none;
  width: 80px;
  height: 30px;
  background: linear-gradient(
    180deg,
    rgba(5, 141, 252, 1) 0%,
    rgba(12, 96, 200, 1) 100%
  );
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.53),
    0px 1px 2px 0px rgba(255, 255, 255, 0.5);
  border-radius: 2px;
}
</style>
