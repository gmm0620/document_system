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
          <button @click="deleteDataTable" disabled class="point">删除</button>
        </div>
      </div>
      <div class="right_person">
        <div class="bottom">
          <div class="table_design">
            <div class="ytable">
              <div class="queue">表设计</div>
              <h4>原表结构</h4>
              <div class="table">
                <el-table :data="originColumn" style="width: 95%">
                    <el-table-column prop="COLUMN_NAME" label="字段名"></el-table-column>
                    <el-table-column prop="DATA_TYPE" label="类型"></el-table-column>
                    <el-table-column prop="DATA_LENGTH" label="大小"></el-table-column>
                    <el-table-column prop="DATA_DEFAULT" label="默认值"></el-table-column>
                    <el-table-column prop="比例" label="比例"></el-table-column>
                    <el-table-column prop="NULLABLE" label="允许为空"></el-table-column>
                    <el-table-column prop="注释" label="注释"></el-table-column>
                </el-table>
              </div>
            </div>
            <div class="bottomd">
              <h4>自定义字段</h4>
              <div class="table">
                <el-table :data="userColumn" style="width: 95%">
                    <el-table-column prop="COLUMN_NAME" label="字段名"></el-table-column>
                    <el-table-column prop="DATA_TYPE" label="类型"></el-table-column>
                    <el-table-column prop="DATA_LENGTH" label="大小"></el-table-column>
                    <el-table-column prop="DATA_DEFAULT" label="默认值"></el-table-column>
                    <el-table-column prop="比例" label="比例"></el-table-column>
                    <el-table-column prop="NULLABLE" label="允许为空"></el-table-column>
                    <el-table-column prop="注释" label="注释"></el-table-column>
                    <el-table-column
                        label="操作"
                        width="130">
                        <template slot-scope="scope">
                            <el-button @click="deleteUseColume(scope.row)" style="padding-left:8px;font-size:12px;height: 25px;font-size: 14px;background: rgba(3, 129, 255, 0.5);border-radius: 2px;border: 1px solid #0a43bc;color: #fff;" class="point">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
              </div>
              <div class="btn" style="position:absolute;top:8px;">
                <button @click="columnDialog = true" class="point">添加</button>
              </div>
            </div>

          </div>
          <PositionHorn />
        </div>
      </div>
      <el-dialog title="添加数据项" :visible.sync="dialogFormVisible" width="400px" :append-to-body="true">
        <el-form :model="form">
          <el-form-item label="代码">
            <el-input  v-model='form.code'></el-input>
          </el-form-item>
           <el-form-item label="名称">
            <el-input  v-model='form.name'></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addDataItem" style="width: 60px;height: 30px;" class="point">确 定</el-button>
          <el-button @click="dialogFormVisible = false" style="width: 60px;height: 30px;" class="point">取 消</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加自定义字段" :visible.sync="columnDialog" width="600px" :append-to-body="true">
        <el-form :model="form">
          <el-form-item label="字段名">
            <el-input  v-model='colmform.name'></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <!--<el-input  v-model='colmform.type'></el-input>-->
            <br />
            <el-select v-model="colmform.type">
                <el-option v-for="(item, index) in typeList" :key="index" :label="item.名称" :value="item.名称"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="大小">
            <el-input  v-model='colmform.size'></el-input>
          </el-form-item>
          <el-form-item label="默认值">
            <el-input  v-model='colmform.default'></el-input>
          </el-form-item>
          <el-form-item label="比例">
            <el-input  v-model='colmform.scale'></el-input>
          </el-form-item>
         <!-- <el-form-item label="是否允许为空">
            <el-input  v-model='colmform.isNull'></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="注释">
            <el-input  v-model='colmform.comment'></el-input>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveUseColume" style="width: 60px;height: 30px;" class="point">确 定</el-button>
          <el-button @click="columnDialog = false" style="width: 60px;height: 30px;" class="point">取 消</el-button>
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
      typeList: [],
      leftTableData: [],
      originColumn: [],
      userColumn: [],
      selectTable: '',
      dialogFormVisible: false,
      form: {
        name: '',
        type: '',
        size: '',
        scale: '',
        default: '',
        isNull: '',
        comment: ''
      },
      colmform: {
        name: '',
        type: '',
        size: '',
        scale: '',
        default: '',
        isNull: '',
        comment: ''
      },
      columnDialog: false
    }
  },
  components: {
    PositionHorn
  },
  created () {
    this.getTypeList()
    this.getTableList()
  },
  methods: {
    //获取左侧数据表
    getTableList () {
      this.$api.systemSet.dataTableList1().then((res) => {
        if (res.code) {
          this.data = res.data
        }
      })
    },
    // 字段类型
    getTypeList () {
      this.$api.application.queryCondition().then((data) => {
        this.typeList = data['字段类型']
      })
    },
    //左侧数据表的点击事件
    handleNodeClick (data) {
      console.log(data)
      this.selectTable = data
      this.getTableInfo()
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
        addColumnName: this.colmform.name,
        addType: this.colmform.type,
        addSize: this.colmform.size,
        defaultValue: this.colmform.default,
        // nullAble: this.colmform.isNull,
        comments: this.colmform.comment
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
        this.columnDialog = false
        this.getTableInfo()
      })
    },
    //删除自定义字段
    deleteUseColume (data) {
      let node = this.$refs.tree.getCurrentNode()
      this.$api.systemSet.deleteTableInfo({
        tableName: node['TABLE_NAME'],
        colName: data.COLUMN_NAME
      }).then((data) => {
        //判断是否保存成功
        if (data.code) {
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
        this.getTableInfo()
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
            width: 29.8%;
            height: 100%;
            border-right: 1px solid #0a43bc;
            margin: 0;
            .el-table{
              margin-left: 8px;
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
          .table_design{
            position: relative;
            float: left;
            width: 100%;
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
              min-height: 48%;
               height:auto;
              .table{
                  height:auto;
              }
            }
            .bottomd{
              position: relative;
              height:auto;
              min-height: 48%;
              &>h4 {
                height: 40px;
                line-height: 40px;
              }
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
