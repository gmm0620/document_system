<template>
  <div>
    <div class="role user limit">
      <h3>权限维护</h3>
      <div class="inset">
        <h4>系统内置角色</h4>
        <div>
          <el-table :data="tableData" border style="width: 100%" :span-method="objectSpanMethod">
            <el-table-column prop="mkqxSpan" label="模块权限" width="150">
              <div slot-scope="scope">
                <el-checkbox v-model="scope.row.mkqx.mkChecked">{{scope.row.mkqx.mkLabel}}</el-checkbox>
              </div>
            </el-table-column>
            <el-table-column prop="ymqx" label="页面权限" width="150">
              <div slot-scope="scope">
                <el-checkbox v-model="scope.row.ymqx.ymChecked" @change="handleChangeym(scope.row)">{{scope.row.ymqx.ymLabel}}</el-checkbox>
              </div>
            </el-table-column>
            <el-table-column prop="czqx" label="操作权限">
              <div slot-scope="scope">
                <el-checkbox 
                  v-if="scope.row.czqx.czMsg.length !== 0"
                  :indeterminate="scope.row.czqx.isIndeterminate" 
                  v-model="scope.row.czqx.czCheckAll" 
                  @change="handleCheckAllChange(scope.row)"
                  style="width: 20px; display: block">全选
                </el-checkbox>
                <el-checkbox-group v-model="scope.row.czqx.czChecked" @change="handleCheckedCitiesChange(scope.row)">
                  <el-checkbox v-for="(item, index) in scope.row.czqx.czMsg" :key="index" :label="item.czLabel"></el-checkbox>
                </el-checkbox-group>
              </div>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <PostionHorn />
    </div>
    <div class="btn">
      <button class="goBefore" @click="handleRevert" v-if="juese === 'son'">恢复默认</button>
      <button class="sure" @click="handleModify">确认</button>
    </div>
  </div>
</template>

<script>
import PostionHorn from "@/components/Postion_Horn";
export default {
  name: "limit",
  components: {
    PostionHorn
  },
  data() {
    return {
      tableData: [],
      currpage: 1,
      pagesize: 6,
      concatModel: true,
      checked: true,
      limitArray: [],
    };
  },
  created() {
    this.rowMsg = JSON.parse(this.$route.query.daima)
    this.juese = this.$route.query.juese
    this.getData();
  },
  watch: {
    // tableData: {
    //   handler (data) {
    //     data.forEach((item, index) => {
    //     })
    //   },
    //   deep: true
    // }
  },
  methods: {
    handleRevert () {
      let fujuese = ''
      switch (this.juese) {
        case 'father':
          fujuese = ''
          break
        case 'son':
          fujuese = this.rowMsg.父代码
          break
      }
      this.$api.systemSet.upquanxian({
        quanxian: [],
        juese: this.rowMsg.代码,
        fujuese
      }).then(res => {
        this.getData()
      })
    },
    handleModify () {
      this.limitArray = []
      this.tableData.forEach((item, index) => {
        if (!item.ymqx.ymChecked) {
          item.mkqx.mkChecked = false
        } else {
          item.mkqx.mkChecked = true
        }
      })
      this.tableData.forEach((item, index) => {
        if (item.mkqx.mkChecked && !this.limitArray.includes(item.mkqx.mkValue)) {
          this.limitArray.push(item.mkqx.mkValue)
        }
        if (item.ymqx.ymChecked && !this.limitArray.includes(item.ymqx.ymValue)) {
          this.limitArray.push(item.ymqx.ymValue)
        }
        item.czqx.czCheckedValueLabel.forEach((item1, index1) => {
          if (!this.limitArray.includes(item1.value)) {
            this.limitArray.push(item1.value)
          }
        })
      })
      // let fujuese = ''
      // switch (this.juese) {
      //   case 'father':
      //     fujuese = ''
      //     break
      //   case 'son':
      //     fujuese = this.rowMsg.父代码
      //     break
      // }
      this.$api.systemSet.upquanxian({
        quanxian: JSON.stringify(this.limitArray),
        juese: this.rowMsg.代码,
        // fujuese
      }).then(res => {
        this.$message({
          message: res.message,
          type: 'success'
        });
        history.go(-1)
      })
    },
    handleChangeym (val) {
      // if (!val.ymqx.ymChecked) {
      //   val.mkqx.mkChecked = false
      // }
    },
    handleCheckAllChange(val) {
      let czChecked = []
      val.czqx.czMsg.forEach((item, index) => {
        czChecked.push(item.czLabel)
      })
      val.czqx.czChecked = val.czqx.czCheckAll ? czChecked : [];
      this.isIndeterminate = false;
      if (val.czqx.czChecked.length > 0) {
        val.ymqx.ymChecked = true
      }
      val.czqx.czCheckedValueLabel = []
      val.czqx.czChecked.forEach((item, index) => {
        val.czqx.czMsg.forEach((item2, index2) => {
          if (item === item2.czLabel) {
            val.czqx.czCheckedValueLabel.push({'value': item2.czValue, 'label': item2.czLabel})
          }
        })
      })
    },
    handleCheckedCitiesChange(val) {
      val.czqx.czCheckAll = val.czqx.czChecked.length === val.czqx.czMsg.length ? true : false
      val.ymqx.ymChecked = val.czqx.czChecked.length > 0 ? true : false
      val.czqx.czCheckedValueLabel = []
      val.czqx.czChecked.forEach((item, index) => {
        val.czqx.czMsg.forEach((item2, index2) => {
          if (item === item2.czLabel) {
            val.czqx.czCheckedValueLabel.push({'value': item2.czValue, 'label': item2.czLabel})
          }
        })
      })
    },
    getData() {
      let juese = ''
      switch (this.juese) {
        case 'father':
          juese = ''
          break
        case 'son':
          juese = this.rowMsg.父代码
          break
      }
      let mkqxArray = [];
      let ymqxArray = [];
      let czqxArray = [];
      let havemkqxArray = [];
      let haveymqxArray = [];
      let haveczqxArray = [];
      let tableData = [];
      this.$api.systemSet.quanixan({
        daima: this.rowMsg.代码,
        juese
      }).then(res => {
        // 构造已选中的权限数据结构
        res.所选权限.forEach((item, index) => {
          item.forEach((item2, index2) => {
            if (item2.权限类型 === '模块') {
              havemkqxArray.push({'havemkValue': item2.所属模块, 'havemkLabel': item2.权限名称})
            } else if (item2.权限类型 === '页面') {
              haveymqxArray.push({'haveymValue': item2.代码, 'haveymLabel': item2.权限名称})
            } else if (item2.权限类型 === '操作') {
              haveczqxArray.push({'haveczValue': item2.代码, 'haveczLabel': item2.权限名称, 'haveczFather': item2.所属页面})
            }
          })
        })
        // 构造全部权限数据结构
        res.权限列表.forEach((item, index) => {
          item.forEach((item2, index2) => {
            if (item2.权限类型 === "模块") {
              mkqxArray.push({
                'father': item2.所属模块,
                'label': item2.权限名称
              });
            } else if (item2.权限类型 === "页面") {
              ymqxArray.push({
                'father': item2.所属模块,
                'label': item2.权限名称,
                'value': item2.代码
              });
            } else if (item2.权限类型 === "操作") {
              czqxArray.push({
                'grandFather': item2.所属模块,
                'father': item2.所属页面,
                'label': item2.权限名称,
                'value': item2.代码
              });
            }
          });
        });
        ymqxArray.forEach((item, index) => {
          tableData.push({"mkqxSpan": '',
                          "mkqx": {"mkValue": '', "mkLabel": '', "mkChecked": false},
                          "ymqx": {"ymValue": '', "ymLabel": '', "ymChecked": false}, 
                          "czqx": {"isIndeterminate": false, "czCheckAll": false, "czMsg": [], "czChecked": [], "czCheckedValueLabel": []}
                        });
        })
        ymqxArray.forEach((item, index) => {
          mkqxArray.forEach((item2, index2) => {
            if (item.father === item2.father) {
              tableData[index].mkqx.mkValue = item2.father
              tableData[index].mkqx.mkLabel = item2.label
              tableData[index].mkqxSpan = item2.label
              tableData[index].ymqx.ymValue = item.value
              tableData[index].ymqx.ymLabel = item.label
            }
          })
          czqxArray.forEach((item3, index3) => {
            if (item.value === item3.father) {
              tableData[index].czqx.czMsg.push({"czValue": item3.value, "czLabel": item3.label})
            }
          })
        })
        // 对比已有权限和全部权限，勾选选择框
        tableData.forEach((item, index) => {
          havemkqxArray.forEach((item2, index2) => {
            if (item.mkqx.mkValue === item2.havemkValue) {
              item.mkqx.mkChecked = true
            }
          })
          haveymqxArray.forEach((item3, index3) => {
            if (item.ymqx.ymValue === item3.haveymValue) {
              item.ymqx.ymChecked = true
            }
          })
          haveczqxArray.forEach((item4, index4) => {
            if (item.ymqx.ymValue === item4.haveczFather) {
              item.czqx.czChecked.push(item4.haveczLabel)
              item.czqx.czCheckedValueLabel.push({'value': item4.haveczValue, 'label': item4.haveczLabel})
            }
          })
        })
        tableData.forEach((item, index) => {
          if (item.czqx.czChecked.length === item.czqx.czMsg.length) {
            item.czqx.czCheckAll = true
          }
        })
        this.tableData = tableData
        this.tableData = this.mergeTableRow(tableData, [
          "mkqxSpan"
        ]);
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const span = column['property'] + '-span'
      if(row[span]){
        return row[span]
      }
    },
    mergeTableRow(data, merge) {
      if (!merge || merge.length === 0) {
        return data;
      }
      merge.forEach(m => {
        const mList = {};
        data = data.map((v, index) => {
          const rowVal = v[m];
          if (mList[rowVal]) {
            mList[rowVal]++;
            data[index - (mList[rowVal] - 1)][m + "-span"].rowspan++;
            v[m + "-span"] = {
              rowspan: 0,
              colspan: 0
            };
          } else {
            mList[rowVal] = 1;
            v[m + "-span"] = {
              rowspan: 1,
              colspan: 1
            };
          }
          return v;
        });
      });
      return data;
    }
  }
};
</script>

<style lang="scss" scoped>
.role {
  width: 100%;
  height: auto;
  position: relative;
   z-index:0;
  background: rgba(5, 27, 74, 0.22);
  box-shadow: 0px 0px 26px 0px rgba(0, 229, 255, 0.2) inset;
  border: 1px solid rgba(10, 67, 188, 0.32);
  h3 {
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
.btn {
  width: 176px;
  margin: 16px auto;
  button {
    border: none;
    background: none;
    text-align: center;
    color: #fff;
  }
  .goBefore {
    border: none;
    background: none;
    color: aqua;
    width: 80px;
    height: 30px;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.53);
    border-radius: 2px;
    border: 1px solid rgba(0, 254, 255, 1);
  }
  .sure {
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
</style>
