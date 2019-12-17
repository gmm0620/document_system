<template>
  <div class="stage">
    <div class="right">
      <div style="height: 100%;padding: 20px; position: relative;">
        <el-table class="leftTable" :data="tableData" :span-method="objectSpanMethod">
          <el-table-column prop="项目类别" label="类别" width="100"></el-table-column>
          <el-table-column prop="项目名称" label="项目"></el-table-column>
          <el-table-column prop="审查情况结果" label="审查情况">
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row.审查情况结果">
                <el-radio v-for="item in scope.row.审查情况" :label="item" :key="item">{{item}}</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column prop="详细情况说明" label="详细情况说明">
            <template slot-scope="scope">
              <el-input v-model="scope.row.详细情况说明" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <!-- 类别 项目 审查情况 详细情况 说明电子扫描档案 -->
        </el-table>
        <el-table class="rightTable2" :data="rightTable2" max-height="310">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="name" label="材料名称"></el-table-column>
          <el-table-column prop="state" label="状态"></el-table-column>
        </el-table>
        <div class="rightTree1">
          <p class="rightTreeTitle">电子扫描档案</p>
          <el-tree
            ref="tree"
            :data="tenTree"
            :props="defaultProps"
            node-key="id"
            current-node-key="13"
            highlight-current
            @node-click="handleNodeClick">
          </el-tree>
        </div>
        <div style="margin-top: 15px;margin-left: 500px" v-show="xianshi">
          <el-button type="primary" style="width: 70px;height: 30px" @click="submitconfirm">确定</el-button>
          <el-button type="primary" plain style="width: 70px;height: 30px" @click="quxiao">取消</el-button>
        </div>
      </div>
      <PositionHorn />
    </div>
  </div>
</template>
<script>
import PositionHorn from "@/components/Postion_Horn";
export default {
  name: "system-management",
  data() {
    return {
        xianshi:false,
      // 确定时储存审查结果
      scSituation: [],
      // 单位树
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      cailiaoxinxi: [],
      twoTree: [],
      tenTree: [],
      tableData: [],
      rightTable2: [],
      tableDataParams: [],
      zdscjg: '',
      spanArr: [],
      material: "",
      archiving: "",
      accuracy: "",
      annotation: "",
      chushengconsistent: "",
      renmianjinzhi: "",
      chushengdate: "",
      ganbulvlishu: "",
      ruwudengjibiao: "",
      ruxuetigancailiao: "",
      rudangrutuancailiao: "",
      radio12: "无",
      radio11: "否",
      radio10: "否",
      radio9: "否",
      radio8: "否",
      radio7: "否",
      radio6: "否",
      radio5: "无",
      radio4: "不全",
      radio3: "无",
      radio2: "无",
      radio1: "无",
      radio: "",
      lists: [],
      datamulu: [],
      datamulunew: [],
      condition: [],
      pagesize: 6,
      pagesizeTab: 11,
      currpage: 1,
      list: [],
      showCondition: false,
      type: "card",
      items: {},
      rowdata: []
    };
  },
  components: {
    PositionHorn
  },
  created() {
      // console.log('scope.row.审查情况',scope.row.审查情况)
    // 判断是 档案转出列表 还是 接入列表 中的审查
    this.shenchaType = this.$route.query.shenchaType;
    // 被审查人信息
    this.name = this.$route.query.name;
    this.danwei = this.$route.query.danwei;
    this.jgmcm = this.$route.query.jgmcm;
    this.rowsfh = this.$route.query.rowsfh;
      console.log('this.$route.query.xianshi',this.$route.query.xianshi == 'xianshi')
    if(this.$route.query.xianshi == 'xianshi'){
        this.xianshi =false;
    }else{
        this.xianshi =true;
    }


    if (this.$route.query.zlbh) {
      this.zlbh = this.$route.query.zlbh;
    } else {
      this.zlbh = ''
    }
    // 审查人信息
    this.scrsfh = JSON.parse(document.cookie.split("=")[1]).身份号;
    this.scrname = JSON.parse(document.cookie.split("=")[1]).姓名;
    this.scrjgmcm = JSON.parse(document.cookie.split("=")[1]).机构名称码;
    this.danganshencha();
    this.shenchadianzimulu();
    this.getTree()
  },
  methods: {
    getTree () {
      this.tenTree = []
      this.twoTree = []
      this.$api.build.tenTree({
        sfh: this.rowsfh
      }).then((data) => {
        if (data.message === "暂无目录") {
          console.log("暂无目录")
        } else {
          data.forEach((item, index) => {
            if (item['children']) {
              var arr = []
              item.children.forEach((v, i) => {
                if (v['children']) {
                  var arr1 = []
                  v['children'].forEach((v1, i1) => {
                    arr1.push({
                      id: v1['材料代码'],
                      label: (i1+ 1) + '、' +v1['材料名称'],
                      danganID: v1['档案号'],
                      sfh: v1['身份号'],
                      fdm: v1['父代码'],
                      type: v1['二分法_类别']
                    })
                  })
                  arr.push({
                    id: v['材料代码'],
                    label: '(' + this.toChinese(i + 1) + '）' + v['材料名称'],
                    danganID: v['档案号'],
                    sfh: v['身份号'],
                    fdm: v['父代码'],
                    type: v['二分法_类别'],
                    children: arr1
                  })
                } else {
                  arr.push({
                    id: v['材料代码'],
                    label: '(' + this.toChinese(i + 1) + '）' + v['材料名称'],
                    danganID: v['档案号'],
                    sfh: v['身份号'],
                    fdm: v['父代码'],
                    type: v['二分法_类别']
                  })
                }
              })
              this.tenTree.push({
                id: item['材料代码'],
                label: item['显示序号'] + '、' + item['材料名称'],
                danganID: item['档案号'],
                sfh: item['身份号'],
                fdm: item['父代码'],
                type: item['二分法_类别'],
                children: arr
              })
            } else {
              this.tenTree.push({
                id: item['材料代码'],
                label: item['材料名称'],
                danganID: item['档案号'],
                sfh: item['身份号'],
                fdm: item['父代码'],
                type: item['二分法_类别']
              })
            }
          })
        }
      })
      this.$api.build.twoTree({
        sfh: this.rowsfh
      }).then((data) => {
        this.twoTree = data
      })
    },
    toChinese (num) {
      switch (num) {
        case 1: return '一'
        break
        case 2: return '二'
        break
        case 3: return '三'
        break
        case 4: return '四'
        break
        case 5: return '五'
        break
        case 6: return '六'
        break
        case 7: return '七'
        break
        case 8: return '八'
        break
        case 9: return '九'
        break
        case 10: return '十'
        break
      }
    },
    // 合并单元格
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if(columnIndex === 0){
        const _row = this.spanArr[rowIndex]
        const _col = _row>0?1:0;
        return{
          rowspan:_row,
          colspan:_col
        }
      }
      if (rowIndex === (this.tableData.length - 1)) {
        if (columnIndex === 2) {
          return [1, 3];
        } else if (columnIndex === 1) {
          return [0, 0];
        } else if (columnIndex === 3) {
          return [0, 0];
        }
      }
    },
    //确定方法
    submitconfirm() {
      this.tableDataParams = JSON.parse(JSON.stringify(this.tableData))
      this.tableDataParams.forEach((item, index) => {
        item.审查情况2 = ''
        item.审查情况.forEach((item2, index2) => {
          item.审查情况2 += (',' + item2)
        })
        item.审查情况 = item.审查情况2.substring(1)
        delete item.审查情况2
      })
      this.$api.application.shenchainterface({
        name: this.name,
        danwei: this.danwei,
        jgmcm: this.jgmcm,
        sfh: this.rowsfh,
        scrsfh: this.scrsfh,
        scrname: this.scrname,
        scrjgmcm: this.scrjgmcm,
        sgscjg: this.tableData[this.tableData.length - 1].审查情况结果,
        sgscxx: JSON.stringify(this.tableDataParams),
        zdscjg: this.zdscjg,
        zdscxx: JSON.stringify(this.rightTable2),
        cailiaoxinxi: JSON.stringify(this.cailiaoxinxi)
      }).then(data => {
        if (this.shenchaType === '质量') {
          history.go(-1)
        } else {
          let flag = false
          // 处理存入缓存的数据
          if (sessionStorage.scSituation) {
            if (JSON.parse(sessionStorage.scSituation).length === 1 && JSON.parse(sessionStorage.scSituation)[0].rowsfh === this.rowsfh) {
              this.scSituation = [{"shenchaType": this.shenchaType, "rowsfh": this.rowsfh, "dzState": this.tableData[this.tableData.length - 1].审查情况结果, "zzState": this.zdscjg, "zlbh": data.质量单号}]
            } else if (JSON.parse(sessionStorage.scSituation).length === 1 && JSON.parse(sessionStorage.scSituation)[0].rowsfh !== this.rowsfh) {
              this.scSituation = JSON.parse(sessionStorage.scSituation)
              this.scSituation.push({"shenchaType": this.shenchaType, "rowsfh": this.rowsfh, "dzState": this.tableData[this.tableData.length - 1].审查情况结果, "zzState": this.zdscjg, "zlbh": data.质量单号})
            } else if (JSON.parse(sessionStorage.scSituation).length !== 1) {
              this.scSituation = JSON.parse(sessionStorage.scSituation)
              this.scSituation.forEach((item, index) => {
                if (item.rowsfh === this.rowsfh) {
                  flag = true
                }
              })
              if (flag) {
                this.scSituation.forEach((item, index) => {
                  if (item.rowsfh === this.rowsfh) {
                    item.dzState = this.tableData[this.tableData.length - 1].审查情况结果
                    item.zzState = this.zdscjg
                  }
                })
              } else {
                this.scSituation.push({"shenchaType": this.shenchaType, "rowsfh": this.rowsfh, "dzState": this.tableData[this.tableData.length - 1].审查情况结果, "zzState": this.zdscjg, "zlbh": data.质量单号})
              }
            }
          } else {
            this.scSituation.push({"shenchaType": this.shenchaType, "rowsfh": this.rowsfh, "dzState": this.tableData[this.tableData.length - 1].审查情况结果, "zzState": this.zdscjg, "zlbh": data.质量单号})
          }
          sessionStorage.setItem("scSituation", JSON.stringify(this.scSituation))
          history.go(-1)
        }

      });
    },
    // 右下表格数据获取
    shenchadianzimulu() {
      this.$api.application.shenchadianzimulu({
        sfh: this.rowsfh
      })
      .then(data => {
        if (data.二级空目录) {
          data.二级空目录.forEach((item, index) => {
            this.rightTable2.push({"name": item.材料名称, "state": "空目录"})
            this.cailiaoxinxi.push(item)
          })
        }
        if (data.三级空材料) {
          data.三级空材料.forEach((item, index) => {
            this.rightTable2.push({"name": item.材料名称, "state": "空材料"})
            this.cailiaoxinxi.push(item)
          })
        }
        if (data.二级空目录 && data.三级空材料) {
          if (data.二级空目录.length === 0 && data.三级空材料.length === 0) {
            this.zdscjg = '合格'
          } else {
            this.zdscjg = '不合格'
          }
        } else {
          this.zdscjg = '合格'
        }
      })
    },
    //电子扫描档案目录
    danganshencha() {
      this.$api.application.danganshencha({
        sfh: this.rowsfh,
        zlUUID: "",
        zlbh: this.zlbh
      })
      .then(data => {
        if (data.质量审查.length === 1) { // 再次审批
          this.tableData = JSON.parse(data.质量审查[0].手工审查信息)

          this.tableData.forEach((item, index) => {
            item.审查情况 = item.审查情况.split(',')
          })
        } else { // 首次审批
          data.质量审查.forEach((item, index)=> {
            this.tableData.push({"项目类别": item.项目类别, "项目名称": item.项目名称, "详细情况说明": '', "审查情况": item.审查情况.split(','), "审查情况结果": ''})
          })
        }
        let contactDot = 0;
        this.tableData.forEach((item,index) => {
          // 准备合并单元格所需数组
          if(index===0){
            this.spanArr.push(1)
          }else{
            if(item.项目类别 === this.tableData[index-1].项目类别){
                this.spanArr[contactDot] += 1;
                this.spanArr.push(0)
            }else{
                contactDot = index
                this.spanArr.push(1)
            }
          }
        })
      });
    },
    //取消方法返回上一个页面
    quxiao() {
      this.$router.go(-1);
    },
    handleNodeClick (data) {
      // this.treeSelectNode = data
      // if (data.type === 1) {
      //   this.dialogDiv = false
      //   this.isShowInput = true
      //   this.isShowBtn = false
      //   this.clIsShow = false
      //   this.$api.build.getMaterialData({
      //     sfh: this.$route.query.sfh,
      //     daima: data.id
      //   }).then((data) => {
      //     this.baseData = JSON.parse(data[0]['通用属性值'])
      //     this.properData = JSON.parse(data[0]['专有属性值'])
      //     this.baseEdit = JSON.parse(data[0]['通用属性值'])
      //     this.properEdit = JSON.parse(data[0]['专有属性值'])
      //     console.log(this.baseData, '基本')
      //     console.log(this.properData, '专有')
      //   })
      // } else {
      //   this.dialogDiv = true
      // }
      // console.log(data)
      // this.$refs.tree.setCurrentKey(data.id)
    },
    //审查列表的方法。
    getshenchaList() {
      this.$api.application
        .danganlist({
          // sfh: '9991120'
          sfh: this.sfh
        })
        .then(data => {
          this.lists = data;
          this.lists.forEach(function(ele) {
            ele.quejian = "缺件";
            return ele;
            console.log("ele", ele);
          });
        });
    },
    goMaterial(path, index) {
      console.log(11);
      this.$router.push({
        path: path
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.stage {
  @include wh(1200px, auto);
  margin: 0 auto;
  position: relative;
  @include box_flex;
  .leftTable {
    width: 70%;
  }
  .rightTree1 {
    height: 46%;
    width: 28%;
    position: absolute;
    left: 70%;
    top: 20px;
    .rightTreeTitle {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #029AFF;
      background: #02419e;
      text-align: center;
    }
    .el-tree {
      margin: 0;
      overflow-y: scroll;
    }
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: #0a43bc;
    }
    ::-webkit-scrollbar-track {
      border-radius: 10px;
      background: #0381ff;
    }
  }
  .rightTable2 {
    width: 28%;
    position: absolute;
    left: 70%;
    top: 50%;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: #0a43bc;
    }
    ::-webkit-scrollbar-track {
      border-radius: 10px;
      background: #0381ff;
    }
  }

  .title {
    width: 100%;
    font-size: 15px;
    height: 40px;
    margin: 16px 0;
    border-bottom: 1px solid #0a43bc;
    @include box_flex;
    span {
      line-height: 40px;
      width: 120px;
      text-align: center;
      background: rgba(3, 94, 255, 0.15);
      &.active {
        background: rgba(3, 94, 255, 0.6);
      }
    }
  }

  .content .el-radio,
  .stage .el-radio {
    position: static;
    bottom: 0;
    z-index: 9999;
    height: 30px;
    line-height: 30px;
    width: 17%;
    text-align: center;
    /*background: rgba(3, 94, 255, 0.15);*/
    border-radius: 2px;
    color: #fff;
    margin-left: 20px;
  }
  .stage .el-table .el-table__row .el-table_1_column_3 .el-radio-group {
    margin: 0 auto;
    display: block;
    width: 200px;
  }
  .stage .el-table .el-table__row .el-table_1_column_3 .el-radio-group .el-radio {
    display: inline;
    background: none;
  }
  .tdrowtable tr {
    border: solid #0a43bc 1px;
  }
  .tdrowtable td {
    height: 40px;
    text-align: center;
    border: solid #0a43bc 1px;
  }
  .tdrow {
    width: 200px;
    margin: 8px;
  }

  .right {
    @include flex;
    @include direction(column);
    position: relative;
    margin-left: 16px;
    background: rgba(5, 27, 74, 0.22);
    border: 1px solid rgba(10, 67, 188, 1);
    box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
    opacity: 0.8;
    h3 {
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding: 0 16px;
      box-sizing: border-box;
      //  opacity: 0.8;
      background: rgba(2, 154, 254, 0.15);
    }
    .title {
      width: 100%;
      font-size: 15px;
      height: 40px;
      margin: 16px 0;
      border-bottom: 1px solid #0a43bc;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      display: -webkit-flex;
    }
    .con_flex {
      width: 1050px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      display: -webkit-flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      margin: 0 16px;
      margin-top: 30px;
    }
    .item {
      /*display: -webkit-box;*/
      /*display: -ms-flexbox;*/
      /*display: flex;*/
      /*display: -webkit-flex;*/
      /*text-align: right;*/
      width: 290px;
      margin-bottom: 8px;
      font-size: 13px;
    }
    .item input {
      width: 220px;
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
</style>




