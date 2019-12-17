<template>
  <div class="stage">
    <div class="choose">
      <div class="left_tree">
        <PositionHorn />
        <div class="queue">数据表</div>
        <el-tree
          ref="tree"
          :data="data"
          :props="defaultProps"
          highlight-current
          accordion
          @node-click="handleNodeClick">
        </el-tree>
        <div class="btn">
          <button @click="addDataTable" disabled class="point">添加</button>
          <button @click="" disabled class="point">编辑</button>
          <button @click="deleteDataTable" disabled class="point">删除</button>
        </div>
      </div>
      <div class="right_person">
        <div class="bottom">
          <div class="dataList">
            <div class="queue">数据项</div>
            <div class="btn">
              <button @click="dialogFormVisible = true" class="point">添加</button>
              <button @click="" class="point">编辑</button>
            </div>
            <div class="table">
              <el-table
                :data="leftTableData"
                style="width: 100%"
                @row-click="chickClick">
                <el-table-column
                  label="序号"
                  type="index"
                  >
                </el-table-column>
                <el-table-column
                  prop="代码"
                  label="代码">
                </el-table-column>
                <el-table-column
                  prop="名称"
                  label="名称"
                  >
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="130">
                  <template slot-scope="scope">
                    <el-button @click="deleteDataItem(scope.row)" type="text" size="small">删除</el-button>
                    <el-button @click="editData(scope.row)" type="text" size="small">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <PositionHorn />
        </div>
      </div>
      <el-dialog title="添加数据项" :visible.sync="dialogFormVisible" width="400px" :append-to-body="true">
        <el-form :model="form">
          <el-form-item label="名称">
            <el-input  v-model='form.name'></el-input>
          </el-form-item>
          <el-form-item label="代码">
            <el-input  v-model='form.code'></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addDataItem" style="width: 60px;height: 30px;">确 定</el-button>
          <el-button @click="dialogFormVisible = false" style="width: 60px;height: 30px;">取 消</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑数据项" :visible.sync="editDiv" width="400px" :append-to-body="true">
        <el-form :model="form">
          <el-form-item label="名称">
            <el-input  v-model='form.editName'></el-input>
          </el-form-item>
          <el-form-item label="代码">
            <el-input  v-model='form.editCode'></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editDataItem" style="width: 60px;height: 30px;">确 定</el-button>
          <el-button @click="editDiv = false" style="width: 60px;height: 30px;">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import PositionHorn from '@/components/Postion_Horn'
export default {
  name: 'stage',
  data () {
    return {
      data: [],
      defaultProps: {
        label: 'TABLE_NAME'
      },
      leftTableData: [],
      originColumn: [],
      userColumn: [],
      selectTable: '',
      dialogFormVisible: false,
      form: {
        name: '',
        code: '',
        editName: '',
        editCode: '',
        defaultName:'',
        defaultCode: ''
      },
      columnDialog: false,
      editDiv:false
    }
  },
  components: {
    PositionHorn
  },
  created () {
    this.getTableList()
  },
  methods: {
    //获取左侧数据表
    getTableList () {
      this.$api.systemSet.dataTableList().then((res) => {
        if (res.code) {
          this.data = res.data
        }
      })
    },
    // 编辑数据项
    editData (row) {
      this.editDiv = true
      this.form.editName = row.名称
      this.form.editCode = row.代码
      this.form.defaultName = row.名称
      this.form.defaultCode = row.代码
    },
    // 编辑数据项
    editDataItem () {
      let node = this.$refs.tree.getCurrentNode()
      this.$api.systemSet.editData({
        tableName: node.TABLE_NAME,
        codeBefore: this.form.defaultCode,
        codeAfter: this.form.editCode,
        nameBefore: this.form.defaultName,
        nameAfter: this.form.editName
      }).then((data) => {
        this.getTableItem()
        this.editDiv = false
      })
    },
    //左侧数据表的点击事件
    handleNodeClick (data) {
      console.log(data)
      this.selectTable = data
      this.getTableItem()
      // this.getTableInfo()
    },
    //添加数据表
    addDataTable () {
      this.$prompt('请输入数据表名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.$api.systemSet.addDataTable({
          addName: value
        }).then((data) => {
          //判断是否保存成功
          if (data.code) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            //刷新数据
            this.getTableList()
          } else {
            this.$message({
              type: 'error',
              message: '添加失败!'
            });
          }
        })
      })
    },
    //删除数据表
    deleteDataTable () {
      let node = this.$refs.tree.getCurrentNode()
      if (node == null) {
        this.$alert('请选择要删除的数据表！', '提示', {
          confirmButtonText: '确定'
        });
        return false
      }
      this.$confirm('确定删除该数据表?','提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.$api.systemSet.deleteDataTable({
          deleteName: node['TABLE_NAME']
        }).then((data) => {
          //判断是否保存成功
          if (data.code) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //刷新数据
            this.getTableList()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
        })
      })
    },
    //获取数据表内容
    getTableItem () {
      let node = this.$refs.tree.getCurrentNode()
      this.$api.systemSet.getTableItem({
        queryName: node['TABLE_NAME']
      }).then((res) => {
          console.log('selectTable',res)
        // if (res.code == true) {
          this.leftTableData = res.data
          console.log('this.leftTableData',this.leftTableData)
        // }
      })
    },
    //添加数据表内容
    addDataItem () {
      if (this.form['name'] == '' || this.form['code'] == '') {
        this.$alert('名称和代码都不能为空！', '提示', {
          confirmButtonText: '确定'
        })
        return false
      }
      //接口保存
      let node = this.$refs.tree.getCurrentNode()
      if (node == null) {
        this.$alert('请从左侧选择一个数据表！', '提示', {
          confirmButtonText: '确定'
        });
        return false
      }
      this.$api.systemSet.addTableItem({
        tableName: node['TABLE_NAME'],
        name: this.form.name,
        code: this.form.code
      }).then((data) => {
        //判断是否保存成功
        if (data.code) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          //刷新数据
          this.dialogFormVisible = false
          this.getTableItem()
        } else {
          this.$message({
            type: 'error',
            message: '添加失败!'
          });
        }
      })
    },
    //删除数据表内容
    deleteDataItem (row) {
      console.log(row)
      let node = this.$refs.tree.getCurrentNode()
      this.$confirm('确定删除该条数据?','提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.$api.systemSet.deleteTableItem({
          tableName: node['TABLE_NAME'],
          deleteName: row['名称']
        }).then((data) => {
          //判断是否保存成功
          if (data.code) {
            this.getTableItem()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
        })
      })
    },
    // 获取数据表设计信息
    getTableInfo () {
      this.$api.systemSet.getTableInfo({
        tableName: this.selectTable['TABLE_NAME']
      }).then((res) => {
          console.log(1475,res)
        if (res.code == true) {
          // this.originColumn = res.originColumn['originColumn']
          // this.userColumn = res.userColumn['userColumn']
            this.originColumn = res.originColumn;
            this.userColumn = res.userColumn;
        }
      })
    },
    //数据项列表的点击事件
    chickClick (data) {
      console.log(data)
      this.selectTable = data
    },
    //添加自定义字段
    saveUseColume () {
      let node = this.$refs.tree.getCurrentNode()
      console.log(this.colmform)
      this.$api.systemSet.addTableInfo({
        tableName: node.TABLE_NAME,
        addColumnName: this.form.name,
        addType: this.form.type,
        addSize: this.form.size,
        defaultValue: this.form.default,
        nullAble: this.form.isNull,
        comments: this.form.comment
      }).then((data) => {
        //判断是否保存成功
        if (data.code) {
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
    //删除自定义字段
    deleteUseColume () {
      let node = this.$refs.tree.getCurrentNode()
      this.$api.systemSet.deleteTableInfo({
        tableName: node['TABLE_NAME'],
        colName: ''
      }).then((data) => {
        //判断是否保存成功
        if (data.code) {
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
      @include box_flex;
      .queue {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0 16px;
        background:rgba(2,154,254,0.15);
        @include sizing;
        font-size: 13px;
        color: #fff;
      }
      .right_person {
        position: relative;
        width: 78%;
        margin-left: 16px;
        .btn{
          width: 100%;
          height: 45px;
          text-align: left;
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
        .bottom{
          width: 100%;
          height: 100%;
          position: relative;
          background: rgba(5, 27, 74, 0.22);
          border: 1px solid #0a43bc;
          -webkit-box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
          box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
          opacity: 0.8;
          overflow: hidden;
          .dataList{
            float: left;
            position: relative;
            width: 100%;
            height: 100%;
            // border-right: 1px solid #0a43bc;
            margin: 0;
            .el-table{
              margin-left: 8px;
            }
            .btn{
              width: 96%;
              height: 30px;
              text-align: right;
              position: absolute;
              top: 8px;
              right: 60px;
              button{
                width: 50px;
                height: 24px;
                background: rgba(3, 129, 255, 0.5);
                border-radius: 2px;
                border: 1px solid #0a43bc;
                color: #fff;
              }
            }
            &>.table {
              margin:20px auto;
              height: 560px;
              overflow: auto;
              overflow-x: hidden;
            }
          }
          .table_design{
            position: relative;
            float: left;
            width: 70%;
            height: 100%;
            margin: 0;
            h4{
              height: 30px;
              line-height: 30px;
              font-size: 13px;
              padding: 0 20px;
            }
            .el-table{
              margin-left: 20px;
            }
            .ytable{
              height: 48%;
            }
            .bottomd{
              position: relative;
              height: 48%;
            }
            .btn{
              width: 96%;
              height: 30px;
              text-align: right;
              position: absolute;
              bottom: 0px;
              button{
                width: 50px;
                height: 24px;
                background: rgba(3, 129, 255, 0.5);
                border-radius: 2px;
                border: 1px solid #0a43bc;
                color: #fff;
              }
            }
          }
          .savebtn{
            position: absolute;
            bottom: 10px;
            right: 10px;
            width: 80px;
            height: 30px;
            font-size: 14px;
            background: rgba(3, 129, 255, 0.5);
            border-radius: 2px;
            border: 1px solid #0a43bc;
            color: #fff;
          }
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
        .el-tree{
          height: 85%;
          overflow-y: auto;
        }
        .btn{
          position: absolute;
          bottom: 5px;
          right: 10px;
          top:6px;
          button{
            width: 50px;
            height: 24px;
            background: rgba(3, 129, 255, 0.5);
            border-radius: 2px;
            border: 1px solid #0a43bc;
            color: #fff;
          }
        }
      }
    }
  }
</style>
