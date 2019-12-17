<template>
  <div class="stage">
    <h3>材料类别库</h3>
    <div class="topbtn">
      <el-button type="text" @click="addFirst">添加一级节点</el-button>
      <el-button type="text" @click="addSecond">添加二级节点</el-button>
      <el-button type="text" @click="addThird">添加三级节点</el-button>
      <button class="attrbtn" @click="divType = 1;getAttrList()">基本属性管理</button>
    </div>
    <div class="btn">
      <button @click="addOrEditNode('edit')" class="point">编辑</button>
      <button @click="deleteNode" class="point">删除</button>
    </div>
    <div class="choose">
      <div class="left_tree">
        <div class="treeDiv">
          <el-tree
            ref="tree"
            :data="data"
            :props="defaultProps"
            node-key="id"
            accordion
            current-node-key
            highlight-current
            @node-click="handleNodeClick">
          </el-tree>
        </div>

        <PositionHorn />
      </div>
      <div class="right_person">
        <div v-show="divType==1">
          <h4>基础属性字段管理</h4>
          <div class="topbtn">
            <button class="attradd" @click="addOrEditAttr('')">添加</button>
          </div>
          <el-table :data="attrlist" stripe>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column label="字段名称" prop="字段名称"></el-table-column>
            <el-table-column label="字段类型" prop="数据类型"></el-table-column>
            <el-table-column label="默认值" prop="默认值" width="100"></el-table-column>
            <el-table-column label="是否必填" prop="是否必填" width="100"></el-table-column>
            <el-table-column prop="option" label="操作" width="250">
              <div slot-scope="scope">
                <el-button @click="deleteAttr(scope.row)" type="text">删除</el-button>
                <el-button @click="addOrEditAttr(scope.row)" type="text">编辑</el-button>
                <el-button v-show="!scope.row['removeUp']" type="text" style="width: 42px;"></el-button>
                <el-button v-show="scope.row['removeUp']" @click="removeUporDown(scope.row,-1)" type="text">上移</el-button>
                <el-button v-show="scope.row['removeDown']" @click="removeUporDown(scope.row,1)" type="text">下移</el-button>
              </div>
            </el-table-column>
          </el-table>
          <div class="bottomBtn">
            <p style="margin-bottom: 30px"><span style="color: red;">*注意：</span>带有'是否'字样的字段在前台页面中展示为单选按钮格式！</p>
            <button style="border-radius: 2px;border: 1px solid #00feff;color: #0ff;background: none;">保存</button>
            <button @click="divType = 0">取消</button>
          </div>
        </div>
        <div v-show="divType==2">
          <div class="chldiv topdiv">
            <div class="inputInfo">
              <span>大类名称</span>
              <el-select v-model="towform.optionVue" placeholder="请选择">
                <el-option
                  v-for="item in optionList"
                  :key="item['材料代码']"
                  :label="item['材料名称']"
                  :value="item['材料代码']">
                </el-option>
              </el-select>
            </div>
            <div class="inputInfo">
              <span>类别名称</span>
              <input type="text" :readonly ="defaultEdit" v-model="towform.materialName"/>
            </div>
          </div>
          <div class="chldiv botchdiv"  v-if="showAdd">
            <h4>基础属性字段默认值配置</h4>
            <div>
              <div class="inputInfo" v-for="(item, index) in jcattrData" :key="index"  v-if="item['字段名称'] && item['字段名称'].substring(0,2) !== '是否'">
                <span>{{item['字段名称']}}</span>
                <input type="text"  v-model="item['默认值']"  v-if="item['数据类型'] !== 'date'"/>
                <el-date-picker
                  v-model="item['默认值']"
                  v-else
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <div class="inputInfo" v-for="(item, index) in jcattrData" :key="index" v-if="item['字段名称'] && item['字段名称'].substring(0,2) === '是否'">
                <input type="checkbox" name="" id="" class="checkbox" v-model="item['默认值']">
                <span style="width: 200px;text-align: left;">{{item['字段名称']}}</span>
              </div>
            </div>
          </div>
          <div class="chldiv botchdiv"  v-else>
            <h4>基础属性字段默认值配置</h4>
            <div>
              <div class="inputInfo" v-for="(item, index) in jcattrData" :key="index" v-if="item.key && item.key.substring(0,2) !== '是否'">
                <span>{{item.key}}</span>
                <input type="text"  v-model="item.value"  v-if="item.key.substring(item.key.length-2, item.key.length) !== '时间'"/>
                <el-date-picker
                  v-else
                  v-model="item.value"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <div class="inputInfo" v-for="(item, index) in jcattrData" :key="index" v-if="item.key && item.key.substring(0,2) === '是否'">
                <input type="checkbox" name="" id="" class="checkbox" v-model="item.value">
                <span style="width: 200px;text-align: left;">{{item.key}}</span>
              </div>
            </div>
          </div>
          <div class="chldiv" style="height: auto;min-height: 280px;max-height:400px">
            <h4>专有属性字段管理</h4>
            <div class="topbtn">
              <el-button type="text" class="zyattrbtn" @click="addOrEditZyattr('add')">添加</el-button>
            </div>
            <el-table :data="zyattrData" stripe>
              <el-table-column label="序号" type="index" width="50"></el-table-column>
              <el-table-column label="字段名称" prop="字段名称"></el-table-column>
              <el-table-column label="数据类型" prop="数据类型"></el-table-column>
              <el-table-column label="默认值" prop="默认值"></el-table-column>
              <el-table-column label="是否必填" prop="是否必填"></el-table-column>
              <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                  <el-button @click="deletezyAttr(scope.row)" type="text" size="small">删除</el-button>
                  <el-button @click="addOrEditZyattr(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button v-show="!scope.row['removeUp']" type="text" size="small" style="width: 42px;"></el-button>
                  <el-button v-show="scope.row['removeUp']" @click="" type="text" size="small">上移</el-button>
                  <el-button v-show="scope.row['removeDown']" @click="" type="text" size="small">下移</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="bottomBtn">
            <button @click="addAttDefault">保存</button>
            <button @click="defaultEdit = false">取消</button>
          </div>
        </div>
         <PositionHorn />
      </div>
    </div>
    <!--  节点添加弹窗  -->
    <el-dialog :title="winTitle" :visible.sync="dialogFormVisible" :append-to-body="true">
      <el-form :model="form" v-show="formShow">
        <el-form-item label="节点名称">
          <el-input v-model="form.name" style="width: 90%;" placeholder="请输入节点名称"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="显示序号">
          <el-input v-model="form.number" style="width: 90%;" placeholder="输入格式为'二'、'三'、'四'，或者'二-1'、'三-2'、'四-1'等"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="节点代码">
          <el-input v-model="form.code" style="width: 90%;" placeholder="节点代码为2位数字，与显示序号对应，如显示序号为“八”则节点代码应为“80”，显示序号为“九-2”则节点代码应为“92”。"></el-input>
        </el-form-item>
      </el-form>
      <!--   添加三级节点弹窗  -->
      <el-form :model="form" v-show="!formShow">
        <el-form-item label="节点名称">
          <el-input v-model="form.name" style="width: 90%;" placeholder="请输入节点名称"></el-input>
        </el-form-item>
        <br>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveDocNode(formShow)">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 二级节点弹窗 -->
    <el-dialog title="添加二级节点名称" :visible.sync="secondDiv" :append-to-body="true">
      <el-form>
        <el-form-item label="目录名称">
          <br />
          <el-select v-model="towform.optionVue" placeholder="请选择">
            <el-option
              v-for="item in optionList"
              :key="item['材料代码']"
              :label="item['材料名称']"
              :value="item['材料代码']">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别名称">
          <el-input :readonly ="defaultEdit" v-model="towform.materialName" placeholder="请输入类别名称" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveDocTowNode('add')">确 定</el-button>
        <el-button @click="secondDiv = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--  基本属性编辑弹窗  -->
    <el-dialog :title="attrWinTitle" :visible.sync="attrForm" :append-to-body = "true">
      <el-form :model="attrformArr" v-show="formShow">
        <el-form-item label="字段名称">
          <el-input v-model="attrformArr['字段名称']" style="width: 90%;" placeholder="请输入字段名称"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="字段类型">
          <!--<el-input v-model="attrformArr['数据类型']" style="width: 90%;" placeholder="请输入字段类型"></el-input>-->
            <!-- <br /> -->
            <el-select v-model="attrformArr['数据类型']" style="width: 90%;">
              <el-option v-for="(item, index) in typeList" :key="index" :label="item.名称" :value="item.名称"></el-option>
            </el-select>
        </el-form-item>
        <br>
        <el-form-item label="默认值：">
          <el-input v-model="attrformArr['默认值']" style="width: 90%;" placeholder="请输入字段类型"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="是否必填">
          <el-radio v-model="attrformArr['是否必填']" label="1">是</el-radio>
          <el-radio v-model="attrformArr['是否必填']" label="2">否</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveAttr()">确 定</el-button>
        <el-button @click="attrForm = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--  专有属性添加和编辑弹窗  -->
    <el-dialog :title="attrWinTitle" :visible.sync="zyattrForm" :append-to-body ="true">
      <el-form :model="zyattrformArr" v-show="formShow">
        <el-form-item label="字段名称">
          <el-input v-model="zyattrformArr['name']" style="width: 90%;" placeholder="请输入字段名称"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="字段类型">
          <!--<el-input v-model="zyattrformArr['type']" style="width: 90%;" placeholder="请输入字段类型"></el-input>-->
          <br />
            <el-select v-model="zyattrformArr['type']" style="width: 90%;">
                <el-option v-for="(item, index) in typeList" :key="index" :label="item.名称" :value="item.名称"></el-option>
              </el-select>
        </el-form-item>
        <br>
        <el-form-item label="默认值：">
          <el-input v-model="zyattrformArr['default']" style="width: 90%;" placeholder="请输入字段类型"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="是否必填">
          <el-radio v-model="zyattrformArr['isNes']" label="1">是</el-radio>
          <el-radio v-model="zyattrformArr['isNes']" label="2">否</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveZyattr">确 定</el-button>
        <el-button @click="zyattrForm = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PositionHorn from '@/components/Postion_Horn'
export default {
  name: 'stage',
  data () {
    return {
      data: [],
      optionList: [],
      defaultProps: {
        children: 'children',
        label: '材料名称',
        id: '材料代码',
      },
      list: [],
      attrlist: [],
      attrListValue: [],
      secondDiv: false,
      divType: 0,
      winTitle: '添加节点',
      attrWinTitle: '基本属性信息',
      zyattrData: [],
      jcattrData: [],
      form: {
        name: '',
        number: '',
        code: '',
        pcode: '',
        beforname: '',
        binary : ''
      },
      attrformArr: {
        原字段名称: '',
        字段名称: '',
        数据类型: '',
        默认值: '',
        是否必填: ''
      },
      zyattrformArr: {
        nameBefore: '',
        name: '',
        type: '',
        default: '',
        isNes: '',
        pcode: ''

      },
      attrDefaultform: {},
      towform: {
        materialName: '',
        materialCode: '',
        optionVue: ''
      },
      directoryName: '',
      defaultEdit: true,
      dialogFormVisible: false,
      formLabelWidth: '60px',
      winTitle: '添加一级节点',
      formShow: true,
      attrForm: false,
      zyattrForm: false,
      attrAddOrEdit: 'add',
      typeAddOrEdit: 'add',
      seletNode: '',
      showAdd: false,
      addjcattrData: {},
      typeList:[]
    }
  },
  components: {
    PositionHorn
  },
  created () {
    this.getTypeList()
    this.$nextTick(function () {
      this.$data.data.forEach(row => {
        if (row.show) {
          this.$refs.tree.setCurrentKey(row.id)
          this.$refs.tree.store.nodesMap[row.id].expanded = true
        }
      })
    })
    this.getLeftTreeData()
  },
  methods: {
    // 获取字段类型列表
    getTypeList () {
      this.$api.application.queryCondition().then((data) => {
        this.typeList = data['字段类型']
      })
    },
    //获取材料类别tree数据
    getLeftTreeData () {
      this.$api.systemSet.docTypeLibrary().then((res) => {
        if (res.message.indexOf("成功") > -1) {
          for (var item of res.data) {
            for (var tchildrev of item['children1']) {
              tchildrev['children'] = tchildrev['children2']
              delete tchildrev['children2']
            }
            item['children'] = item['children1']
            delete item['children1']
          }
          this.data = res.data
          this.optionList = res.data
        }
      })
    },
    //添加/修改一级、二级、三级目录页面操作
    addOrEditNode (type) {
      var node = this.$refs.tree.getCurrentNode()
      if (type == 'edit') {
        this.typeAddOrEdit = 'edit'
        //获取当前选中的节点信息
        if (node == null) {
          this.$alert('请先选中要编辑的节点！', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
          return false
        }
        var pCode = node['父代码']
        if (pCode.length == 1) {        //一级节点编辑
          this.winTitle = '编辑一级节点'
          this.dialogFormVisible = true
          this.formShow = true
          this.form['beforname'] = node['材料名']
          this.form['name'] = node['材料名']
          this.form['number'] = node['序号']
          this.form['code'] = node['材料代码']
          this.form['pcode'] = pCode
        } else if (pCode.length == 2) {
          this.divType = 2
          this.defaultEdit = false
        } else if (pCode.length == 4) {
          this.winTitle = '编辑三级节点'
          this.dialogFormVisible = true
          this.formShow = false
          this.form['beforname'] = node['材料名称']
          this.form['name'] = node['材料名称']
          this.form['pcode'] = pCode
        }
      } else {
        this.typeAddOrEdit = 'add'
        this.form['name'] = ''
        this.form['number'] = ''
        this.form['code'] = ''
      }
    },
    addFirst() {
      this.winTitle = '添加一级节点'
      this.dialogFormVisible = true
      this.formShow = true
    },
    addSecond() {
      this.secondDiv = true
      this.divType = ''
      // this.showAdd = true
      this.towform.materialName = ''
      this.towform.materialCode = ''
      this.towform.optionVue = ''
      this.defaultEdit = false
      // this.divType = 2
      //获取基本属性列表
      this.getAttrList()

    },
    addThird() {
      console.log(this.seletNode)
      if (this.seletNode == '') {
          this.$alert('请先选中二级节点！', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
          return false
        } else {
          var pCode = this.seletNode['父代码']
          if (pCode.length != 2) {
            this.$alert('只有选中二级节点才能添加！', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
            return false
          }
          this.winTitle = '添加三级节点'
          this.dialogFormVisible = true
          this.formShow = false
          this.form.pcode = this.seletNode['材料代码']
          var pnode = this.$refs.tree.currentNode.node.parent;
          if (pnode) {
            if (pnode.data['序号'].indexOf("十、") > -1 || pnode.data['序号'].indexOf("十-") > -1) {
              this.form.binary = 2
            } else {
              this.form.binary = 1
            }
          }
        }
    },
    //添加/修改一级和三级目录
    saveDocNode (type) {
      if (this.typeAddOrEdit == 'add') {
        if (type) {//添加一级目录
          this.$api.systemSet.addFirst({
            showSerial: this.form.number,
            docCode: this.form.code,
            docName: this.form.name
          }).then((data) => {
            console.log(data)
            //判断是否保存成功
            if (data.message.indexOf('成功') > -1) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.dialogFormVisible = false
              this.getLeftTreeData()
            } else {
              this.$message({
                type: 'error',
                message: data.message
              });
            }
          })
        } else {//添加三级节点
          console.log("添加三级节点传入的数据：")
          console.log(this.form)
          this.$api.systemSet.addDocName({
            parentCode: this.form.pcode,
            docName: this.form.name,
            binary: this.form.binary
          }).then((data) => {
            console.log(data)
            //判断是否保存成功
            if (data.code) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.dialogFormVisible = false
              this.getLeftTreeData()
            } else {
              this.$message({
                type: 'error',
                message: data.message
              });
            }
          })
        }
      } else {
        this.$api.systemSet.editDocName({
          docParent: this.form.pcode,//父代码,
          docNameBefore: this.form.beforname,//修改前,
          docNameAfter: this.form.name//修改后
        }).then((data) => {
          console.log(data)
          //判断是否保存成功
          if (data.message.indexOf('成功') > -1) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.dialogFormVisible = false
            this.getLeftTreeData()
          } else {
            this.$message({
              type: 'error',
              message: '修改失败!'
            });
          }
        })
      }
    },
    //添加/修改二级目录
    saveDocTowNode (type) {
      if (type=='add') {
        this.$api.systemSet.addSecondDir({
          docName: this.towform.materialName,
          parentCode: this.towform.optionVue
        }).then((data) => {
          this.showAdd = true
          this.divType = 2
          this.secondDiv = false
          this.zyattrData = []
          //判断是否保存成功
          if (data.code) {
            this.zyattrformArr['pcode'] = data.docCode
            this.towform.materialCode = data.docCode
            this.$message(data.message)
            return true
          } else {
            this.$message({
              type: 'error',
              message: data.message
            });
            return false
          }
        })
      }
    },
    //删除材料类别节点
    deleteNode () {
      var node = this.$refs.tree.getCurrentNode()
      //获取当前选中的节点信息
      if (node == null) {
        this.$alert('请先选中要删除的节点！', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return false
      }
      if (node.children && node.children.length > 0) {
        this.$alert('当前节点下存在字节点，不能删除！', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return false
      }
      console.log('要删除的节点信息：')
      console.log(node)
      // var nameaStr = node['材料名'].split("、")
      // var  name = ''
      // if (name.length > 1) {
      //   name = nameaStr[1]
      // } else {
      //   name = node['材料名称']
      // }
      this.$api.systemSet.deleteDocType({
        deleteDocParent: node['父代码'],
        deleteDocName: node['材料名称']
      }).then((data) => {
        //判断是否保存成功
        if (data.message.indexOf('成功') > -1) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.dialogFormVisible = false
          this.getLeftTreeData()
        } else {
          this.$message({
            type: 'error',
            message: '删除失败!'
          });
        }
      })
    },
    //获取基本属性列表数据
    getAttrList () {
      this.$api.systemSet.basicAttributes().then((res) => {
        this.jcattrData = res.data
        var len = this.jcattrData.length
        for (var item of this.jcattrData) {
          item['removeUp'] = true
          item['removeDown'] = true
        }
        this.jcattrData[0]['removeUp'] = false
        this.jcattrData[len-1]['removeDown'] = false
        this.attrlist = this.jcattrData
        this.attrListValue = this.jcattrData
        console.log('基础属性列表')
        console.log(this.attrListValue)
      })
    },
    //删除基本属性
    deleteAttr (row) {
      this.$api.systemSet.deleteBasicAttributes({
        deleteKey: row['字段名称']
      }).then((data) => {
        if (data.code) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getAttrList()
        } else {
          this.$message({
            type: 'success',
            message: data.message
          })
        }
      })
    },
    //添加/修改基本属性页面操作
    addOrEditAttr (row) {
      if (row == '') {
        this.attrWinTitle = '添加基本属性'
        this.attrAddOrEdit = 'add'
        this.attrformArr['字段名称'] = ''
        this.attrformArr['数据类型'] = ''
        this.attrformArr['默认值'] = ''
        this.attrformArr['是否必填'] = ''
      } else {
        this.attrWinTitle = '编辑基本属性'
        this.attrAddOrEdit = 'edit'
        this.attrformArr['原字段名称'] = row['字段名称']
        this.attrformArr['字段名称'] = row['字段名称']
        this.attrformArr['数据类型'] = row['数据类型']
        this.attrformArr['默认值'] = row['默认值']
        this.attrformArr['是否必填'] = row['是否必填']
      }
      this.attrForm = true
    },
    //添加/修改基本属性接口
    saveAttr () {
      if (this.attrAddOrEdit == 'edit') {//编辑
        this.$api.systemSet.editBasicAttributes({
          nameBefore: this.attrformArr['原字段名称'],
          nameAfter: this.attrformArr['字段名称'],
          typeAfter: this.attrformArr['数据类型'],
          defaultAfter: this.attrformArr['默认值'],
          isNesAfter: this.attrformArr['是否必填']
        }).then((data) => {
          //判断是否保存成功
          if (data.message.indexOf('成功') > -1) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.attrForm = false
            this.getAttrList()
          } else {
            this.$message({
              type: 'error',
              message: '修改失败!'
            });
          }
        })
      } else {//添加
        this.$api.systemSet.addBasicAttributes({
          keyName: this.attrformArr['字段名称'],
          keyType: this.attrformArr['数据类型'],
          defaultValue: this.attrformArr['默认值'],
          isNecessary: this.attrformArr['是否必填']
        }).then((data) => {
          //判断是否保存成功
          if (data.code) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            this.attrForm = false
            this.getAttrList()
          } else {
            this.$message({
              type: 'error',
              message: '添加失败!'
            });
          }
        })
      }
    },
    //基本属性的上移或下移
    removeUporDown (row,type) {
      this.$api.systemSet.moveUpBasicAttributes({
        direction: type,
        moveName: row['字段名称']
      }).then((data) => {
        //判断是否保存成功
        console.log("移动后输出的数据：")
        console.log(data)
        if (data.message.indexOf('成功') > -1) {
          this.getAttrList()
        } else {
          this.$message({
            type: 'error',
            message: '移动失败!'
          });
        }
      })
    },
    //左侧列表的点击事件
    handleNodeClick (data) {
      console.log(data)
      this.seletNode = data
      this.zyattrformArr['pcode'] = data.材料代码
      if (data['父代码'].length == 2) {
        this.towform.materialName = data['材料名称']
        this.towform.materialCode = data['材料代码']
        this.towform.optionVue = data['父代码']
        this.divType = 2
        this.showAdd = false
        //调用接口获取数据
        this.getzyAttr()//专有属性
        this.getAttDefault()//默认配置数据
      } else {
        this.divType = 0
      }
    },
    //根据code值获取专有属性列表
    getzyAttr () {
      var code = this.seletNode['材料代码']
      if (code === '') {
         this.$api.systemSet.proprietaryAtt({
          parentCode: this.zyattrformArr['pcode']
        }).then((res) => {
          console.log("获取的专有属性列表：")
          console.log(res)
          if (res.code) {
            this.zyattrData = res.data
          }
        })
      } else {
         this.$api.systemSet.proprietaryAtt({
          parentCode: code
        }).then((res) => {
          console.log("获取的专有属性列表：")
          console.log(res)
          if (res.code) {
            this.zyattrData = res.data
          }
        })
      }
    },
    //添加专有属性
    addOrEditZyattr (type) {
      if (type == 'add') {
        if (this.towform.materialName == '' || this.towform.optionVue == '') {
          this.$alert('请先完善目录名称和材料名称信息', '提示', {
            confirmButtonText: '确定'
          });
          return false
        }
        //先保存二级目录的基本信息
        // if (this.towform.materialCode == '') {
        //   this.saveDocTowNode('add')
        // } else {
          this.attrWinTitle = '添加专有属性'
          this.attrAddOrEdit = 'add'
          this.zyattrformArr['nameBefore'] = ''
          this.zyattrformArr['name'] = ''
          this.zyattrformArr['type'] = ''
          this.zyattrformArr['default'] = ''
          this.zyattrformArr['isNes'] = ''
          this.zyattrForm = true
        // }
      } else {
        this.attrWinTitle = '编辑专有属性'
        this.attrAddOrEdit = 'edit'
        this.zyattrformArr['pcode'] = this.seletNode['节点代码']
        this.zyattrformArr['nameBefore'] = type['字段名称']
        this.zyattrformArr['name'] = type['字段名称']
        this.zyattrformArr['type'] = type['数据类型']
        this.zyattrformArr['default'] = type['默认值']
        this.zyattrformArr['isNes'] = type['是否必填']
        this.zyattrformArr['uuid'] = type.UUID
        this.zyattrForm = true
      }
    },
    //专有属性添加和编辑保存
    saveZyattr () {
      if (this.attrAddOrEdit == 'edit') {//编辑
        this.$api.systemSet.updateProprietary({
          nameBefore: this.zyattrformArr['name'],
          UUID: this.zyattrformArr['uuid'],
          shujutype:  this.zyattrformArr['type'],
          morenzhi:this.zyattrformArr['default'],
          shifou: this.zyattrformArr['isNes']
        }).then((data) => {
          //判断是否保存成功
          if (data.code) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '修改失败!'
            });
          }
          this.zyattrForm = false
          this.getzyAttr()
        })
      } else {//添加
        this.$api.systemSet.proprietaryAdd({
          addName: this.zyattrformArr['name'],
          dataType: this.zyattrformArr['type'],
          defaultValue: this.zyattrformArr['default'],
          isNes: this.zyattrformArr['isNes'],
          parentCode: this.zyattrformArr['pcode']
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
          this.zyattrForm = false
          this.getzyAttr()
          // this.$api.systemSet.proprietaryAtt({
          //   parentCode: this.zyattrformArr['pcode']
          // }).then((res) => {
          //   console.log("获取的专有属性列表：")
          //   console.log(res)
          //   if (res.code) {
          //     this.zyattrData = res.data
          //   }
          // })
        })
      }
    },
    //删除专有属性
    deletezyAttr (row) {
      this.$api.systemSet.deleteProprietary({
        attributeName: row['字段名称'],
        parentCode: this.towform.materialCode
      }).then((data) => {
        if (data.code) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        } else {
          this.$message({
            type: 'success',
            message: '删除失败'
          })
        }
        this.getzyAttr()
      })
    },
    //根据code值获取基础属性默认值配置
    getAttDefault () {
      var code = this.seletNode['材料代码']
      console.log(code)
      this.$api.systemSet.basicAttDefault({
        docTypeCode: code
      }).then((res) => {
        console.log('获取的基础属性配置')
        console.log(res)
        if (res.code) {
          this.jcattrData = res.res
        }
        console.log(666,this.jcattrData)
      })
    },
    //添加基本属性字段默认设置
    addAttDefault () {
      // console.log("添加数据")
      // console.log(this.attrDefaultform)
      // console.log(this.towform)
      //判断是否已保存基础字段
      if (this.showAdd) {
        if (this.zyattrformArr['pcode']) {
          this.jcattrData.forEach((item, index) => {
            this.addjcattrData[item['字段名称']] = item.默认值
          })
          console.log(this.addjcattrData, '添加')
          this.$api.systemSet.updateAttDefault({
            docTypeCode: this.zyattrformArr['pcode'],
            jsonStr: JSON.stringify(this.addjcattrData)
          }).then((data) => {
            this.jcattrData = []
            this.getLeftTreeData()
          })
        }
      } else {
         this.jcattrData.forEach((item, index) => {
            this.addjcattrData[item['key']] = item.value
          })
          console.log(this.addjcattrData, '编辑')
          this.$api.systemSet.updateAttDefault({
            docTypeCode: this.seletNode.材料代码,
            jsonStr: JSON.stringify(this.addjcattrData)
          }).then((data) => {
            this.getLeftTreeData()
            this.getAttDefault()
          })
      }

      // if (this.towform.materialCode == '') {
      //   //先保存基本信息
      //   console.log(this.jcattrData, '基础属性')
      //   if (this.saveDocTowNode('add')) {
      //       //保存基础数据默认值

      //       // this.$api.systemSet.updateAttDefault({
      //       //   docTypeCode: '',
      //       //   jsonStr: ''
      //       // }).then((data) => {

      //       // })
      //       console.log(1111)
      //   }
      //   // else{
      //   //       this.jcattrData.forEach((item, index) => {
      //   //         this.addjcattrData[item['key']] = item.value
      //   //       })
      //   //       console.log(this.addjcattrData, '编辑')
      //   //   }
      // }
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
    .topbtn{
      position: absolute;
      z-index:999;
      top: 0px;
      right: 0px;
      width: 68%;
      button{
        width: 100px;
        height: 30px;
        font-size: 14px;
        background: rgba(3, 129, 255, 0.5);
        border-radius: 2px;
        border: 1px solid #0a43bc;
        color: #fff;
      }
      .attrbtn{
        float: right;
        cursor: pointer;
      }
      .zyattrbtn{
        position: absolute;
        right: 5px;
        top: 5px;
        width: 60px;
        cursor: pointer;
      }
    }
    .choose {
      margin-top: 10px;
      @include box_flex;
      a{
        cursor: pointer;
        color: #FFF;
      }
      .right_person {
        position: relative;
        width: 68%;
        margin-left: 16px;
        background: rgba(5, 27, 74, 0.22);
        border: 1px solid #0a43bc;
        -webkit-box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
        box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
        opacity: 0.8;
        overflow: hidden;
        h4 {
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          padding: 0 16px;
          box-sizing: border-box;
          width: 100%;
          background: rgba(2, 154, 254, 0.15);
        }
        .attradd{
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
        }
        .bottomBtn{
          width: 100%;
          position: absolute;
          bottom:40px;
          text-align: center;
          button{
            width: 100px;
            height: 30px;
            font-size: 14px;
            background: rgba(3, 129, 255, 0.5);
            border-radius: 2px;
            border: 1px solid #0a43bc;
            color: #fff;
          }
        }
        .chldiv{
          position: relative;
          height: auto;
          h4{
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            padding: 0 16px;
            box-sizing: border-box;
            width: 100%;
            background: rgba(2, 154, 254, 0.15);
          }
        }
        .topdiv{
          height: 50px;
        }
        .botchdiv{
          margin-top: 20px;
          &>div {
            height: auto;
            min-height:200px;
          }
        }
        .inputInfo {
          position: relative;
          margin-top: 16px;
          width: 40%;
          float: left;
          margin-left:30px;
          z-index: 999;
          @include box_flex;
          span {
            font-size: 13px;
            display: inline-block;
            width: 110px;
            line-height: 32px;
            text-align: right;
            margin-right:8px;
            &.pos {
              width: 80px;
            }
            &.short {
              position: relative;
              bottom: 126px;
            }
          }
          input{
            width: 250px;
            height: 30px;
            color: #ccc;
            padding: 0 8px;
            box-sizing: border-box;
            background:rgba(3,94,255,0.15);
            border-radius:2px;
            border:1px solid rgba(10,67,188,0.94);
          }
          .checkbox{
            width: 40px;
            height: 18px;
            margin-top: 8px;
            margin-left: 55px;
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
          .el-checkbox{
            padding-left: 100px;
            width: 100%;
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
      }
      .left_tree {
        position: relative;
        @include wh(160px, 640px);
        width:30%;
        height:700px;
        background:rgba(5,27,74,0.22);
        border:1px solid rgba(10,67,188,1);
        box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
        opacity:0.8;
        overflow: hidden;
        .treeDiv{
          position: relative;
          height: 95%;
          overflow-y: auto;
        }
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
        .btn{
          position: absolute;
          z-index:99;
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
      .winDiv{
        position: absolute;
        top: 60px;
        left: 222px;
        width: 400px;
        height: 140px;
        z-index: 9999;
        background: #013980;
        border: 1px #0a43bc solid;
        padding: 0 10px;
        h4{
          height: 30px;
          line-height: 30px;
          font-size: 16px;
        }
        .inputInfo{
          width: 90%;
          margin: 5px auto;
        }
        input{
          width: 280px;
          height: 30px;
          color: #ccc;
          padding: 0 8px;
          box-sizing: border-box;
          background:rgba(3,94,255,0.15);
          border-radius:2px;
          border:1px solid rgba(10,67,188,0.94);
          margin-left: 8px;
        }
        .close{
          position: absolute;
          right: 0;
          top: 0;
          width: 20px;
          height: 20px;
          font-size: 16px;
          background: #013980;
          border: none;
          color: #FFF;
        }
        .btn{
          position: absolute;
          z-index:99;
          bottom: 10px;
          width: 100%;
          text-align: center;
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
  .btn{
    /*position: absolute;*/
    /*bottom: 5px;*/
    /*right: 10px;*/
    margin-left: 240px;
    margin-top: -34px;
    position: relative;
    z-index:99;
    button{
      width: 56px;
      height: 30px;
      background: rgba(3, 129, 255, 0.5);
      border-radius: 2px;
      border: 1px solid #0a43bc;
      color: #fff;
    }
  }
  .dialog-footer{
    width: 100%;
    button{
      width: 60px;
      height: 30px;
      line-height: 30px;
    }
  }
</style>
