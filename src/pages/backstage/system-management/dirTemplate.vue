<template>
  <div class="stage">
<!--    <h3>目录管理</h3>-->
    <div class="choose">
      <div class="left_tree">
        <PositionHorn />
        <div class="queue">人员来源类别列表</div>
        <el-tree
          :data="data"
          :props="defaultProps"
          ref="tree"
          node-key="代码"
          accordion
          highlight-current
          @node-click="handleNodeClick"
        >
        </el-tree>
        <div class="btn">
          <el-button type="text" @click="dialogVisible = true" class="point">添加</el-button>
          <button @click="deleteNode" class="point">删除</button>
        </div>
        <el-dialog title="添加人员来源类别" :visible.sync="dialogVisible" width="20%" top="20%" :append-to-body="true">
          <span>
            <div style='width: 100%;height: 40px;line-height: 40px'>
              <span>代码：</span>
              <input style='width: 80%;height: 30px;' type='text' v-model="typeCode">
            </div>
            <div style='width: 100%;height: 40px;line-height: 40px'>
              <span>名称：</span>
              <input type='text' style='width: 80%;height: 30px;' v-model="typeName">
            </div>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" class="point">取 消</el-button>
            <el-button type="primary" @click="addNode()" class="point">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <div class="right_person">
        <div class="transfer">
          <div class="tree">
            <div class="queue">材料类别库</div>
            <div class="left-tree">
              <el-tree
                ref="tree1"
                :data="fromData"
                show-checkbox
                default-expand-all
                node-key="id"
                highlight-current
                :props="rightProps"
                @check="addcheckNode"
                >
              </el-tree>
            </div>
          </div>
          <div class="treebtn">
            <el-button type="primary" icon="el-icon-arrow-right" circle @click="removeNode"></el-button>
          </div>
          <div class="tree">
            <div class="queue">{{title}}</div>
            <div class="right-tree">
            <el-tree
              ref="tree2"
              :data="toData"
              show-checkbox
              default-expand-all
              node-key="id"
              highlight-current
              :props="rightProps"
              check-on-click-node
              @check="delcheckNode"
            >
            </el-tree>
            </div>
            <div class="btn">
              <button @click="deleteTreeNode" class="point">删除</button>
            </div>
          </div>
         <!-- <div class="btn">
            <button @click="addTreeNode">保存</button>
            <button @click="">取消</button> -->
          <!-- </div> -->
        </div>
        <PositionHorn />
      </div>
    </div>
  </div>
</template>

<script>
import PositionHorn from '@/components/Postion_Horn'
import treeTransfer from 'el-tree-transfer'
export default {
  name: 'stage',
  data () {
    return {
      defaultProps: {
        id: '代码',
        label: '名称'
      },
      rightProps: {
        children: 'children',
        label: '材料名称',
        id: '材料代码'
      },
      data: [],
      selectNode: '',//人员来源类别选中的节点
      mode: "transfer",
      title: "目录模板：",
      fromData: [],
      toData: [],
      dialogVisible: false,
      typeCode: '',
      typeName: '',
      currentTime: '',
      delCodeArr: [],
      addCodeArr: []
    }
  },
  components: {
    PositionHorn,
    treeTransfer
  },
  created () {
    this.getFormTypeData()
    this.getFromData()
  },
  methods: {
    //获取当前时间
    getNewDate () {
      this.currentTime =
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate();
    },
    //获取人员来源类别列表
    getFormTypeData () {
      this.$api.systemSet.userFormTypeList().then((res) => {
        this.data = res
      })
    },
    //获取材料类别库
    getFromData () {
      this.$api.systemSet.allDocDir().then((res) => {
        console.log(res)
        this.fromData = res
      })
    },
    //
    addcheckNode (data) {
      console.log(data)
    },
    delcheckNode (data,checkedNodes) {
      this.delCodeArr = checkedNodes['checkedNodes'].map((item, index) => {
        return item['材料代码']
      })
    },
    //根据人员来源类别获取对应类别库
    getToData () {
      this.$api.systemSet.docDirSettings({
        humanCode:this.selectNode['代码']
      }).then((res) => {
        this.toData = res
      })
    },
    //移动节点
    removeNode () {
        console.log(4444)
      var leftnode = this.$refs.tree.getCurrentNode()
      if (leftnode == null) {
        this.$alert('请先选择一个来源类别列表！', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return false
      }
      var select = this.$refs.tree1.getCheckedNodes()
      console.log(select, 'select')
      if (select.length == 0) {
        this.$alert('请左侧目录库选中目录！', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return false
      }
      // console.log(123333,select)
      select.forEach((item, index) => {
        if(!(item.children instanceof Array) || item.材料代码.length !== 2) {
           if(item.材料代码.toString().length == 6){
                this.addCodeArr.push(item.材料代码)
            }else{
               this.$message({
                   message: '警告哦，此操作只能添加三级材料！',
                   type: 'warning'
               });
               return
           }

        }
      })
      console.log(111111,this.addCodeArr)
      this.$api.systemSet.addDirSettings({
        dirList:this.addCodeArr,
        humanSourceTypeCode:this.selectNode['代码']
      }).then(data => {
        console.log(data)
        console.log(data.message)
        //判断是否保存成功
        if (data.message.indexOf('成功') > -1) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          this.getToData()
        } else {
          this.$message({
            type: 'error',
            message: '添加失败!'
          });
        }
        this.addCodeArr = []
      })
    },
    //添加树节点
    addTreeNode () {
      if (this.addCodeArr.length == 0) {
        this.$alert('没有要添加的人员来源类别！', '提示', {
          confirmButtonText: '确定',
          center: true
        });
        return false
      }
      this.$api.systemSet.addDirSettings({
        dirList:this.addCodeArr,
        humanSourceTypeCode:this.selectNode['代码']
      }).then(data => {
        console.log(data)
        console.log(data.message)
        //判断是否保存成功
        if (data.message.indexOf('成功') > -1) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
        } else {
          this.$message({
            type: 'error',
            message: '添加失败!'
          });
        }
      })
    },
    //删除树节点
    deleteTreeNode () {
      console.log(this.delCodeArr, '树节点')
      if (this.delCodeArr.length==0) {
        this.$alert('没有要删除的人员来源类别！', '提示', {
          confirmButtonText: '确定',
          center: true
        });
        return false
      }
      this.$api.systemSet.deleteDirSettings({
        deleteList:this.delCodeArr,
        humanSourceTypeCode:this.selectNode['代码']
      }).then(data => {
        console.log(data)
        console.log(data.message)
        //判断是否保存成功
        if (data.message.indexOf('成功') > -1) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getToData()
        } else {
          this.$message({
            type: 'error',
            message: '删除失败!'
          });
        }
      })
    },
    //左侧列表点击事件
    handleNodeClick (data) {
      this.title = "档案目录设置: "+data['名称']
      this.selectNode = data
      console.log(this.selectNode)
      this.getToData()
    },
    //删除左侧列表
    deleteNode () {
      if (this.selectNode == '') {
        this.$alert('请选择一个节点再删除', '提示', {
          confirmButtonText: '确定'
        });
      } else {
        this.$confirm('确定删除选中的人员来源类别?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.systemSet.deleteUserFormType({
            humanSourceType : this.selectNode['代码']
          }).then(data => {
            console.log(data)
            console.log(data.message)
            //判断是否删除成功
            if (data.message.indexOf('成功')>-1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              //刷新列表
              this.getFormTypeData()
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
            this.getFormTypeData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    //添加左侧列表
    addNode () {
      this.getNewDate()
      this.$api.systemSet.addUserFormType({
        humanSourceType: this.typeName,
        code: this.typeCode,
        addTime: this.currentTime
      }).then(data => {
        //判断是否保存成功
        if (data.message.indexOf('成功') > -1) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          //刷新列表
          this.getFormTypeData()
        } else {
          this.$message({
            type: 'error',
            message: '添加失败!'
          });
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .stage {
    @include wh(1200px, auto);
    margin: 0 auto;
    position: relative;
    h3 {
      font-size: 16px;
      margin: -8px 0px 10px;
      position: relative;
      width: 100%;
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
    .choose {
      margin-top: 10px;
      position: relative;
      @include box_flex;
      .queue {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0 16px;
        background:rgba(2,154,254,0.15);
        @include sizing;
        font-size: 14px;
        color: #fff;
      }
      .right_person {
        position: relative;
        z-index: 0;
        width: 78%;
        margin-left: 16px;
        padding: 10px;
        background: rgba(5, 27, 74, 0.22);
        border: 1px solid #0a43bc;
        -webkit-box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
        box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
        opacity: 0.8;
        overflow: hidden;
        .btn{
          position: absolute;
          bottom: 10px;
          width: 100%;
          text-align: center;
          button{
            width: 80px;
            height: 30px;
            font-size: 14px;
            background: rgba(3, 129, 255, 0.5);
            border-radius: 2px;
            border: 1px solid #0a43bc;
            color: #fff;
          }
        }
        .tree{
          position: relative;
          float: left;
          width: 45%;
          height: 560px;
          border: 1px solid #0a43bc;
          -webkit-box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
          box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
          opacity: 0.8;
          margin: 10px;
          .left-tree{
            height: 90%;
            overflow-y: auto;
          }
          .right-tree{
            height: 85%;
            overflow-y: auto;
          }
        }
        .treebtn{
          float: left;
          width: 5%;
          height: 100%;
          padding: 30% 0;
          text-align: center;
        }
      }
      .left_tree {
        position: relative;
        @include wh(160px, 640px);
        width:20%;
        height:639px;
        background:rgba(5,27,74,0.22);
        border:1px solid rgba(10,67,188,1);
        box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
        opacity:0.8;
        overflow: hidden;
        z-index: 99;
        .btn{
          position: absolute;
          bottom: 10px;
          right: 10px;
          button{
            width: 60px;
            height: 30px;
            line-height: 30px;
            background: rgba(3, 129, 255, 0.5);
            border-radius: 2px;
            border: 1px solid #0a43bc;
            color: #fff;
          }
        }
        .el-tree{
          height: 85%;
          overflow-y: auto;
        }
      }
    }
  }
  .el-dialog{
    width: 100%;
    .el-button{
      width: 60px;
      height: 30px;
      line-height: 30px;
    }
  }
</style>
