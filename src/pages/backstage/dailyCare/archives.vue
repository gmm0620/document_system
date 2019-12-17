<template>
  <div class="stage6">
    <div>
      <div class="left">
        <div class="queue">单位组织序列</div>
        <div class="tree">
          <el-tree
            :data="data"
            :props="defaultProps"
            node-key="id"
            default-expand-all
            @node-click="handleNodeClick"
            ref="tree"
          ></el-tree>
        </div>
        <!-- <el-radio v-model="radio" label="1">显示包含下级单位</el-radio>-->
        <PositionHorn />
      </div>
      <div class="right">
        <el-dialog title="提示" :visible.sync="isJump" width="30%">
          <span>当前档案尚未建成，请先到建立档案模块完成建档</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="isJump = false">取 消</el-button>
            <el-button type="primary" @click="sureJump">跳 转</el-button>
          </span>
        </el-dialog>
        <div class="top">
          <div>
            <button class="custom point" @click="showConBox">条件查询</button>
            <button class="custom point" @click="showSqlBox">查询sql语句</button>
            <div class="search_btn" v-if="isShowsql">
              <button
                class="search point"
                @click="conditionSearch"
                @keyup.enter.native="conditionSearch()"
              >查询</button>
              <button class="clear_all point" @click="clearAll">清空</button>
            </div>
            <div class="search_btn" v-else>
              <button
                class="search point"
                @click="conditionSearch1"
                @keyup.enter.native="conditionSearch1()"
              >查询</button>
              <button class="clear_all point" @click="clearAll">清空</button>
            </div>
          </div>
          <div class="con con_flex" v-if="isShowsql">
            <div class="item">
              <span>身份号:</span>
              <input type="text" v-model="conditionList['sfh']" />
            </div>
            <div class="item">
              <span>姓名:</span>
              <input type="text" value="李浩芮" v-model="conditionList['name']" />
            </div>
            <div class="item">
              <span>职务等级:</span>
              <select v-model="conditionList['zwdj']">
                <option v-for="(item, index) in condition['职务等级']" :key="index">{{item['名称']}}</option>
              </select>
            </div>
            <div class="item">
              <span>部别:</span>
              <input type="text" v-model="conditionList['bubie']" />
            </div>
            <div class="item">
              <span>职务名称:</span>
              <input type="text" v-model="conditionList['zwmc']" />
            </div>
            <div class="item">
              <span>军衔文职:</span>
              <select v-model="conditionList['jxwj']">
                <option v-for="(item, index) in condition['军衔文级']" :key="index">{{item['名称']}}</option>
              </select>
            </div>
            <div class="item">
              <span>干部性质:</span>
              <select v-model="conditionList['gbxz']">
                <option v-for="(item, index) in condition['干部性质']" :key="index">{{item['名称']}}</option>
              </select>
            </div>
            <div class="item">
              <span>档案现状:</span>
              <select v-model="conditionList['daxz']">
                <option v-for="(item, index) in condition['档案现状']" :key="index">{{item['名称']}}</option>
              </select>
            </div>
            <div class="item">
              <span>档案号:</span>
              <select v-model="conditionList['glbs']">
                <option v-for="(item, index) in condition['管理标识']" :key="index">{{item['名称']}}</option>
              </select>
            </div>
          </div>
          <div class="con con_flex" v-else>
            <div class="sqlBox">
              <span>输入sql语句:</span>&nbsp;&nbsp;
              <textarea cols="130" rows="6" v-model="sql" style="color:#FFFFFF;"></textarea>
              <!-- <p>*提示：SELECT A.*,S.档案号,S.档案现状,S.管理标识,D.名称 as 技术,z.名称 as 职务,M.名称 as 政治,J.名称 as 军衔 FROM A_基本情况 A left join S_人员档案信息 S on A.身份号=S.身份号 left join D_职务等级 Z on A.职务等级=Z.代码 left join D_政治面貌 M on A.政治面貌=M.代码 left join D_军衔文级 J on A.军衔文级=J.代码 left join D_技术等级 D on A.技术等级=D.代码 where 1=1 and A.姓名 like '姓名' and z.名称 like '职务等级' and J.名称 like '军衔文级' and A.部别 like '部别' and A.身份号 like '身份号'</p> -->
            </div>
          </div>
          <PositionHorn />
        </div>
        <div class="bottom">
          <div class="title_tab">
            <div class="tishi">
              <span class="point">已完成</span>
              <span class="point">缺件</span>
              <span class="point">无数据</span>
            </div>
            <div style="position:absolute;right: 150px;top:10px;">
              <el-switch
                v-model="isAll"
                active-text="可维护"
                inactive-text="全部"
                active-value="daily"
                inactive-value="all"
                @change="changeIfShowAll"
              ></el-switch>
            </div>
            <ul class="tab">
              <li @click="changeType('card')" class="point">
                <img src="../../../assets/images/kapian-1.png" alt />
                <span>卡片</span>
              </li>
              <li @click="changeType('table')" class="point">
                <img src="../../../assets/images/liebiao-1.png" alt />
                <span>列表</span>
              </li>
            </ul>
          </div>
          <div class="con" v-if="type === 'card'">
            <div class="list">
              <div v-for="(item, index) in list" :key="index" class="card">
                <div class="dentity">
                  <span>{{item['姓名']}}</span>
                  <span>{{item['职务名称']}}</span>
                  <img src="../../../assets/images/junzhang.png" alt />
                </div>
                <div class="detail_info">
                  <img src="../../../assets/images/tx.png" alt />
                  <div class="person_info">
                    <ul class="list_title">
                      <li>
                        <span>人员类别 :</span>
                      </li>
                      <li>
                        <span>籍&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;贯 :</span>
                      </li>
                      <li>
                        <span>出生时间 :</span>
                      </li>
                      <li>
                        <span>入伍时间 :</span>
                      </li>
                      <li>
                        <span>身&nbsp;份&nbsp;号 :</span>
                      </li>
                      <li>
                        <span>档&nbsp;案&nbsp;号 :</span>
                      </li>
                      <li>
                        <span>存放位置 :</span>
                      </li>
                    </ul>
                    <ul class="list_info">
                      <li>
                        <span>{{item['人员来源类别'] ? item['人员来源类别'] : ''}}</span>
                      </li>
                      <li>
                        <span>{{item['籍贯']}}</span>
                      </li>
                      <li>
                        <span>{{item['出生时间'] && item['出生时间'].split('T')[0]}}</span>
                      </li>
                      <li>
                        <span>{{item['入伍时间'] && item['入伍时间'].split('T')[0]}}</span>
                      </li>
                      <li>
                        <span>{{item.身份号}}</span>
                      </li>
                      <li>
                        <span>{{item.档案号}}</span>
                      </li>
                      <li>
                        <span>{{item['存放位置']}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="add_info">
                  <!-- <el-checkbox>选中</el-checkbox> -->
                  <span style="background:none;color:#00feff" @click="checkPerson(item)">选中</span>
                  <span
                    v-if="item['纸质档案状态'] === '有缺件'"
                    class="short_item point"
                    @click="lookPaper(item)"
                  >纸质档案</span>
                  <span
                    v-if="item['纸质档案状态'] === '已完成'"
                    class="finish point"
                    @click="lookPaper(item)"
                  >纸质档案</span>
                  <span
                    v-if="item['纸质档案状态'] === '无数据'"
                    class="null point"
                    @click="lookPaper(item)"
                  >纸质档案</span>
                  <span
                    v-if="item['电子档案状态'] === '有缺件'"
                    class="short_item point"
                    @click="lookDoc(item)"
                  >电子档案</span>
                  <span
                    v-if="item['电子档案状态'] === '已完成'"
                    class="finish point"
                    @click="lookDoc(item)"
                  >电子档案</span>
                  <span
                    v-if="item['电子档案状态'] === '无数据'"
                    class="null point"
                    @click="lookDoc(item)"
                  >电子档案</span>
                </div>
              </div>
            </div>
            <el-pagination
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              background
              :page-size="pagesize"
              :total="length"
              prev-text="上一页"
              next-text="下一页"
              layout="prev, pager, next, jumper"
            ></el-pagination>
          </div>
          <div class="con_2" v-if="type === 'table'">
            <el-table :data="list" stripe style="width: 1000px">
              <el-table-column prop="ids" label="序号" width="70"></el-table-column>
              <el-table-column prop="姓名" label="姓名"></el-table-column>
              <el-table-column prop="职务" label="职务名称"></el-table-column>
              <el-table-column prop="入伍时间" label="入伍时间" width="120"></el-table-column>
              <el-table-column prop="职务等级" label="职务等级"></el-table-column>
              <el-table-column prop="技术" label="技术等级" width="100"></el-table-column>
              <el-table-column prop="军衔" label="军衔"></el-table-column>
              <el-table-column prop="技术职务" label="技术职务"></el-table-column>
              <el-table-column prop="option" label="操作" width="280">
                <div slot-scope="scope">
                  <span @click="checkPerson(scope.row)">选中</span>
                  <span
                    v-if="scope.row['纸质档案状态'] === '有缺件'"
                    class="short_item point"
                    @click="lookPaper(scope.row)"
                  >纸质档案</span>
                  <span
                    v-if="scope.row['纸质档案状态'] === '已完成'"
                    class="finish"
                    @click="lookPaper(scope.row)"
                  >纸质档案</span>
                  <span
                    v-if="scope.row['纸质档案状态'] === '无数据'"
                    class="null point"
                    @click="lookPaper(scope.row)"
                  >纸质档案</span>
                  <span
                    v-if="scope.row['电子档案状态'] === '有缺件'"
                    class="short_item point"
                    @click="lookDoc(scope.row)"
                  >电子档案</span>
                  <span
                    v-if="scope.row['电子档案状态'] === '已完成'"
                    class="finish point"
                    @click="lookDoc(scope.row)"
                  >电子档案</span>
                  <span
                    v-if="scope.row['电子档案状态'] === '无数据'"
                    class="null point"
                    @click="lookDoc(scope.row)"
                  >电子档案</span>
                </div>
              </el-table-column>
            </el-table>
            <el-pagination
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              background
              :page-size="pagesize"
              :total="length"
              prev-text="上一页"
              next-text="下一页"
              layout="prev, pager, next, jumper"
            ></el-pagination>
          </div>
          <PositionHorn />
        </div>
        <div class="materialperson_list common_style">
          <h3>选中列表</h3>
          <div class="search_btn">
            <button class="search point">更新数据</button>
            <button class="search point">取出档案</button>
            <button class="search point">手动减员</button>
          </div>
          <div class="con_2">
            <el-table :data="checked" stripe style="width: 100%">
              <el-table-column prop="姓名" label="姓名"></el-table-column>
              <el-table-column prop="部别" label="单位" width="280"></el-table-column>
              <el-table-column prop="身份号" label="身份号"></el-table-column>
              <el-table-column prop="档案现管单位" label="档案现管单位"></el-table-column>
              <el-table-column prop="option" label="操作" width="280">
                <div slot-scope="scope">
                  <button class="point" @click="removeCheck(scope.row)">移除</button>
                  <button class="point" @click="importfile(scope.row)">导出档案</button>
                  <button class="point" style="background: none;border: none">
                    <!-- <input
                      type="file"
                      @change="importzip"
                      multiple="multiple"
                    />-->
                    <el-upload
                      action="//jsonplaceholder.typicode.com/posts/"
                      :before-upload="importzip"
                      style="margin-top: -31px;display: block;"
                    >
                      <span
                        size="small"
                        type="primary"
                        style="margin-left: -7px;margin-top: -17px;position: absolute;padding: 0px 3px;height: 25px;background: rgba(3, 129, 255, 0.26);border-radius: 2px;border: 1px solid rgb(10, 67, 188);line-height: 25px;"
                      >导入档案</span>
                    </el-upload>
                  </button>
                </div>
              </el-table-column>
            </el-table>
            <div class="btns">
              <button class="submit point">导出备考表</button>
              <button class="submit point">导出转递表</button>
              <button class="submit point">导出查阅表</button>
              <button class="submit point">导出审查表</button>
              <button class="submit point">导出年龄不一致处理意见表</button>
              <button class="submit point">专业复原审查登记表</button>
            </div>
          </div>
          <PositionHorn />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import JSZip from "jszip";
import { saveAs } from "file-saver";
import PositionHorn from "@/components/Postion_Horn";
var zhdajbStr;
var zhdazpStr;
var zhdasmStr;
var sumdata = [];
var sumdata1 = [];
var sumdata2 = [];
export default {
  name: "dailyCare",
  data() {
    return {
      isJump: false,
      data: [],
      sumdata: [],
      sumdata1: [],
      sumdata2: [],
      sfh: "",
      dataList: [],
      dataListobject: {},
      list: [],
      listwo: [],
      defaultProps: {
        id: "机构名称码",
        children: "children",
        label: "单位名称",
        jgmcm: "机构名称码"
      },
      radio: false,
      condition: [],
      conditionList: {
        name: "",
        bubie: "",
        zwmc: "",
        zwdj: "",
        jxwj: "",
        gbxz: "",
        daxz: "",
        glbs: "",
        sfh: ""
      },
      pagesize: 6,
      items: {},
      isShowsql: true,
      showCondition: false,
      type: "card",
      daima: [],
      zhdajbStr: "",
      zhdazpStr: "",
      zhdasmStr: "",
      tableData: [
        {
          ids: 1,
          姓名: "赵河北",
          单位: "空军第一大队飞行中队",
          身份证: "34878895",
          档案现管单位: "档案现管单位"
        },
        {
          ids: 2,
          姓名: "王江苏",
          单位: "空军第一大队飞行中队",
          身份证: "34878895",
          档案现管单位: "档案现管单位"
        }
      ],
      length: 0,
      jgmcm: "",
      sql: "",
      checked: [],
      userInfo: {},
      isAll: "daily",
      currentDoc: {}
    };
  },
  components: {
    PositionHorn
  },
  created() {
    this.userInfo = JSON.parse(document.cookie.split("=")[1]);
    this.getData();
    this.getResult();
    this.$nextTick(function() {
      this.$data.data.forEach(row => {
        if (row.show) {
          this.$refs.tree.setCurrentKey(row.id);
          this.$refs.tree.store.nodesMap[row.id].expanded = true;
        }
      });
    });
    this.queryCondition();
    var _self = this;
    document.onkeydown = function(e) {
      if (window.event == undefined) {
        var key = e.keyCode;
      } else {
        var key = window.event.keyCode;
      }
      if (key == 13) {
        _self.conditionSearch();
        _self.conditionSearch1();
      }
    };
  },
  methods: {
    base64toFile(dataurl, filename = "file") {
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let suffix = mime.split("/")[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      });
    },
    //导入压缩包方法
    importzip(file) {
      let that = this;
      let dataList = [];
      let dataList1 = [];
      let fileName = [];
      let formData = new FormData();
      let dataimg = [];
      let content1 = [];
      let original = [];
      let new_zip = new JSZip();
      let fileNum = 0;
      new_zip.loadAsync(file).then(function(file) {
        for (let key in file.files) {
          // 判断是否是目录
          if (!file.files[key].dir) {
            if (/\.(txt)$/.test(file.files[key].name)) {
              fileNum++;
              // 判断是否是文本文件
              let base = file.file(file.files[key].name).async("string"); // 以字符串形式输出文本内容
              base.then(res => {
                dataList1.push({
                  fileName: file.files[key].name,
                  type: "text",
                  content: res
                });
              });
            }
            if (/\.(png|jpg|jpeg|gif)$/.test(file.files[key].name)) {
              fileNum++;
              // 判断是否是图片格式
              let base = file.file(file.files[key].name).async("base64"); // 将图片转化为base64格式
              base.then(res => {
                dataimg.push(file.files[key].name); //导入扫描档案的图片
                // if (that.img.length > 0) {
                //   for (var i = 0; i < that.img.length; i++) {
                //     if (that.img[i].名称 != null) {
                //       original.push(that.img[i].名称);
                //     }
                //   }
                // }
                dataList.push({
                  fileName: file.files[key].name.substring(
                    file.files[key].name.lastIndexOf("/") + 1
                  ),
                  type: "img",
                  content: `data:image/png;base64,${res}`
                });
                fileName.push(
                  file.files[key].name.substring(
                    file.files[key].name.lastIndexOf("/") + 1
                  )
                );
                formData.append(
                  "file",
                  that.base64toFile(`data:image/png;base64,${res}`)
                );
                // formData.push({fileName: file.files[key].name.substring(file.files[key].name.lastIndexOf('/') + 1),content: `data:image/png;base64,${res}`})
                // 遍历最后一次时，调用接口
                if (fileNum === dataList.length + dataList1.length) {
                  console.log(fileName);
                  formData.append("sfh", that.sfh);
                  formData.append("fileName", JSON.stringify(fileName));
                  formData.append("dataList1", JSON.stringify(dataList1)),
                    that.$api.application.Importdangan(formData).then(data => {
                      console.log(data);
                    });
                }
              });
              // if (dataimg.length > 0 && original.length <= 0) {
              //   that.$confirm(
              //     "提示",
              //     "扫描档案导入跟现有的图片不一致是否覆盖？",
              //     {
              //       confirmButtonText: "确定",
              //       cancelButtonText: "取消",
              //       type: "warning",
              //       center: true
              //       // message: sumdata2
              //     }
              //   ).then(() => {
              //     that.$message({
              //       type: "success",
              //       message: "覆盖成功!"
              //     });
              //   }).catch(() => {
              //     that.$message({
              //       type: "info",
              //       message: "取消覆盖"
              //     });
              //   });
              // }
            }
          }
        }
        // new_zip.file("zhdasm.txt").async("string").then(function(content) {
        //   content1 = content.split(",");
        //   zhdasmStr = zhdasmStr.split(",");
        //   for (var i = 0; i < content1.length; i++) {
        //     for (var i = 0; i < zhdasmStr.length; i++) {
        //       //判断zhdasm.txt导入跟现有的值一样吗 不一样提示一下
        //       if (content1[i] != zhdasmStr[i]) {
        //         sumdata2.push(
        //           "导入值：" +
        //             content1[i] +
        //             ",  " +
        //             "现有值：" +
        //             zhdasmStr[i] +
        //             ";"
        //         );
        //       }
        //     }
        //     if (sumdata2.length > 0) {
        //       that.$confirm(
        //         "提示",
        //         "zhdasm.txt导入跟现有的值不一样是否覆盖？",
        //         {
        //           confirmButtonText: "确定",
        //           cancelButtonText: "取消",
        //           type: "warning",
        //           center: true,
        //           message: sumdata2
        //         }
        //       ).then(() => {
        //         that.$message({
        //           type: "success",
        //           message: "覆盖成功!"
        //         });
        //       }).catch(() => {
        //         that.$message({
        //           type: "info",
        //           message: "取消覆盖"
        //         });
        //       });
        //     }
        //   }
        // if(sumdata.length >0){
        //     that.$message({
        //         message: '警告哦，这些值不一样是否覆盖',
        //         type: 'warning'
        //     });
        // }
        // 此处是压缩包中的testTXT.txt文件，以string形式返回其内容，此时已经可以获取zip中的所有文件了
        // });
        // new_zip.file("zhdazp.txt").async("string").then(function(content) {
        //   content1 = content.split(",");
        //   zhdazpStr = zhdazpStr.split(",");
        //   for (var i = 0; i < content1.length; i++) {
        //     for (var i = 0; i < zhdazpStr.length; i++) {
        //       //判断zhdazp.txt导入跟现有的值一样吗 不一样提示一下
        //       if (content1[i] != zhdazpStr[i]) {
        //         sumdata1.push(
        //           "导入值：" +
        //             content1[i] +
        //             ",  " +
        //             "现有值：" +
        //             zhdazpStr[i] +
        //             ";"
        //         );
        //       }
        //     }
        //     if (sumdata1.length > 0) {
        //       that.$confirm(
        //         "提示",
        //         "zhdazp.txt导入跟现有的值不一样是否覆盖？",
        //         {
        //           confirmButtonText: "确定",
        //           cancelButtonText: "取消",
        //           type: "warning",
        //           center: true,
        //           message: sumdata1
        //         }
        //       ).then(() => {
        //         that.$message({
        //           type: "success",
        //           message: "覆盖成功!"
        //         });
        //       }).catch(() => {
        //         that.$message({
        //           type: "info",
        //           message: "取消覆盖"
        //         });
        //       });
        //     }
        //   }
        // });
        // new_zip.file("zhdajb.txt").async("string").then(function(content) {
        //   content1 = content.split(",");
        //   zhdajbStr = zhdajbStr.split(",");
        //   for (var i = 0; i < content1.length; i++) {
        //     for (var i = 0; i < zhdajbStr.length; i++) {
        //       //判断zhdajb.txt导入跟现有的值一样吗 不一样提示一下
        //       if (content1[i] != zhdajbStr[i]) {
        //         sumdata.push(
        //           "导入值：" +
        //             content1[i] +
        //             ",  " +
        //             "现有值：" +
        //             zhdajbStr[i] +
        //             ";"
        //         );
        //       }
        //     }
        //     if (sumdata.length > 0) {
        //       that.$confirm(
        //         "提示",
        //         "zhdajb.txt导入跟现有的值不一样是否覆盖？",
        //         {
        //           confirmButtonText: "确定",
        //           cancelButtonText: "取消",
        //           type: "warning",
        //           center: true,
        //           message: sumdata
        //         }
        //       ).then(() => {
        //         that.$message({
        //           type: "success",
        //           message: "覆盖成功!"
        //         });
        //       }).catch(() => {
        //         that.$message({
        //           type: "info",
        //           message: "取消覆盖"
        //         });
        //       });
        //     }
        //   }
        // });
      });
    },

    sureJump() {
      this.$router.push(
        "/home/backstage/doc_info?sfh=" +
          this.currentDoc["身份号"] +
          "&danganID=" +
          this.currentDoc["档案号"] +
          "&type=" +
          this.currentDoc["来源类别"] +
          "&name=" +
          this.currentDoc["姓名"] +
          "&danwei=" +
          this.currentDoc["部别"] +
          "&jgmcm=" +
          this.currentDoc["机构名称码"] +
          "&zhiwu=" +
          this.currentDoc["职务名称"] +
          "&daily=" +
          1
      );
    },
    changeIfShowAll() {
      if (this.isAll === "2") {
        this.$api.application
          .peopleInformation({
            jgmcm: this.jgmcm ? this.jgmcm : this.userInfo["权限范围"],
            type: this.isAll,
            pageIndex: this.currpage,
            pageSize: this.pagesize
          })
          .then(data => {
            this.length = data.total;
            this.list =
              data["rows"] &&
              data["rows"].map((item, index) => {
                item["ids"] = index + 1;
                item["入伍时间"] =
                  item["入伍时间"] && item["入伍时间"].slice(0, 10);
                item["技术"] = item["技术"] ? item["技术"] : "暂无";
                return item;
              });
          });
      } else {
        this.getResult();
      }
    },
    //导出档案方法
    importfile(row) {
      if (row != undefined) {
        this.sfh = row.身份号;
      }
      var myDate = new Date();
      var Year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
      var Month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      var Date1 = myDate.getDate(); //获取当前日(1-31)
      var Hours = myDate.getHours(); //获取当前小时数(0-23)
      var Minutes = myDate.getMinutes(); //获取当前分钟数(0-59)
      var Seconds = myDate.getSeconds(); //获取当前秒数(0-59)
      var mytime =
        Year +
        "年" +
        Month +
        "月" +
        Date1 +
        "日 " +
        Hours +
        "点" +
        Minutes +
        "分" +
        Seconds +
        "秒";
      this.$api.build
        .Exportpackage({
          sfh: this.sfh
        })
        .then(data => {
          this.zhdajb = data.zhdajb;
          this.zhdazp = data.zhdazp;
          this.img = data.扫描档案;
          this.img1 = data.照片;
          let str2 = "";
          for (var i = 0; i < this.zhdazp.length; i++) {
            for (let key in this.zhdazp[i]) {
              str2 += this.zhdazp[i][key] + ",";
            }
          }
          zhdazpStr = str2;
          let str1 = "";
          for (var i = 0; i < this.zhdajb.length; i++) {
            for (let key in this.zhdajb[i][0]) {
              str1 += this.zhdajb[i][0][key] + ",";
            }
            // let num = 0
            // for (let key in this.zhdajb[i][0]) {
            //   num ++
            //   if (num !== Object.keys(this.zhdajb[i][0]).length) {
            //     str1 += this.zhdajb[i][0][key] + ",";
            //   } else {
            //     str1 += this.zhdajb[i][0][key]
            //   }
            // }
            // str1 += ";"
          }
          zhdajbStr = str1;
          let str = "";
          for (var i = 0; i < data.zhdasm.length; i++) {
            let num = 0;
            for (let key in data.zhdasm[i]) {
              num++;
              if (num !== Object.keys(data.zhdasm[i]).length) {
                str += data.zhdasm[i][key] + ",";
              } else {
                str += data.zhdasm[i][key];
              }
            }
            str += ";";
          }
          zhdasmStr = str;
          var zip = new JSZip();
          var img = zip.folder("扫描档案");
          var img1 = img.folder(this.sfh);
          var img2 = zip.folder("照片");
          var img3 = img2.folder(this.sfh);
          // var img4 = zip.folder("数据库表记录值的txt文件").file("zhdajb.txt", str1).file("zhdasm.txt", str).file("zhdazp.txt", str2);
          var img4 = zip
            .file("zhdajb.txt", str1)
            .file("zhdasm.txt", str)
            .file("zhdazp.txt", str2);
          for (var i = 0; i < this.img.length; i++) {
            var imgData = this.img[i].路径;
            // this.ff = this.img[i].名称;
            img1.file(this.img[i].名称, imgData, { base64: true });
          }
          if (row != undefined) {
            zip.generateAsync({ type: "blob" }).then(function(content) {
              saveAs(content, mytime);
            });
          }
        });
    },
    clearAll() {
      this.conditionList = {};
      // this.daima.zwdj = ''
      // this.daima.jxwj = ''
      this.daima = {};
      this.sql = "";
      this.conditionSearch();
    },
    removeCheck(item) {
      this.checked.forEach((v, i) => {
        if (item["身份号"] === v["身份号"]) {
          this.checked.splice(i, 1);
        }
      });
    },
    checkPerson(item) {
      console.log("item", item);
      this.sfh = item.身份号;
      this.importfile();
      // item.startTime = ''
      // item.endTime = ''
      // item.czr = ''
      // item.czlx = ''
      let result =
        this.checked &&
        this.checked.some(i => {
          if (i["身份号"] === item["身份号"]) {
            return true;
          }
        });
      if (!result) {
        this.checked.push(item);
        this.checked =
          this.checked &&
          this.checked.map(item => {
            // item['出生时间'] = item['出生时间'] && item['出生时间'].slice(0, 10)
            return item;
          });
        // console.log(this.checked, '选中档案')
      }
    },
    conditionSearch1() {
      this.$api.application
        .sqlQuery({
          sql: this.sql
        })
        .then(data => {
          if (data instanceof Array) {
            this.lists =
              data &&
              data.map((item, index) => {
                item["ids"] = index + 1;
                item["入伍时间"] =
                  item["入伍时间"] && item["入伍时间"].slice(0, 10);
                item["技术"] = item["技术"] ? item["技术"] : "暂无";
                return item;
              });
            console.log(data, this.sql, "sql");
          }
        });
    },
    back() {
      this.$router.back();
    },
    showSqlBox() {
      this.isShowsql = false;
    },
    showConBox() {
      this.isShowsql = true;
    },
    lookPaper(item) {
      if (item["纸质建档时间"] && item["纸质缺件情况"]) {
        // this.$router.push('/home/backstage/input_information')
        this.$router.push(
          "/home/backstage/paper_info?name=" +
            item["姓名"] +
            "&sfh=" +
            item["身份号"]
        );
      } else if (item["纸质建档时间"] && !item["纸质缺件情况"]) {
        this.$router.push(
          "/home/backstage/paper_info?name=" +
            item["姓名"] +
            "&sfh=" +
            item["身份号"]
        );
      } else if (!item["纸质档案时间"]) {
        this.$router.push(
          "/home/backstage/input_information?name=" +
            item["姓名"] +
            "&sfh=" +
            item["身份号"] +
            "&type=" +
            item["来源类别"]
        );
      }
    },
    lookDoc(item) {
      // if (item['电子建档时间'] && item['电子缺件情况']) {
      //   this.$router.push('/home/backstage/doc_info?sfh=' + item['身份号'])
      // } else if (item['电子建档时间'] && !item['电子缺件情况']) {
      //   this.$router.push('/home/backstage/doc_info?sfh=' + item['身份号'])
      // } else if (!item['电子档案时间']) {
      //   this.$router.push('/home/backstage/doc_info?sfh=' + item['身份号'])
      // }
      this.currentDoc = item;
      if (item["电子档案状态"] === "无数据") {
        this.isJump = true;
        // this.$router.push('/home/backstage/doc_info?sfh=' + item['身份号'] + '&danganID=' + item['档案号'] + '&type=' + item['来源类别'] + '&name=' + item['姓名'] + '&danwei=' + item['部别'] + '&jgmcm=' + item['机构名称码']  + "&zhiwu=" + item['职务名称'] + '&daily=' + 1)
      } else {
        this.$router.push(
          "/home/backstage/docInfo?sfh=" +
            item["身份号"] +
            "&danganID=" +
            item["档案号"] +
            "&type=" +
            item["来源类别"] +
            "&name=" +
            item["姓名"] +
            "&danwei=" +
            item["部别"] +
            "&jgmcm=" +
            item["机构名称码"] +
            "&zhiwu=" +
            item["职务名称"] +
            "&daily=" +
            1
        );
      }
    },
    changeType(type) {
      this.type = type;
    },
    handleNodeClick(data) {
      this.jgmcm = data.id;
      if (data.children.length === 0) {
        let newdata = [];
        this.$api.application
          .unitsTree({
            id: data.id
          })
          .then(newdata => {
            newdata = newdata
              ? newdata.map(item => {
                  item.id = item["机构名称码"];
                  item.children = [];
                  return item;
                })
              : [];
            if (newdata && newdata.length > 0) {
              this.$nextTick(() => {
                this.$refs.tree.updateKeyChildren(data.id, newdata);
                // this.$refs.tree.setCurrentNode(data.id)
              });
            }
          });
      }
      this.$api.application
        .peopleInformation({
          jgmcm: this.jgmcm,
          pageIndex: this.currpage,
          pageSize: this.pagesize,
          type: this.isAll
        })
        .then(data => {
          this.length = data.total;
          this.list =
            data["rows"] &&
            data["rows"].map((item, index) => {
              item["ids"] = index + 1;
              item["入伍时间"] =
                item["入伍时间"] && item["入伍时间"].slice(0, 10);
              item["技术"] = item["技术"] ? item["技术"] : "暂无";
              return item;
            });
        });
    },
    // addPerson () {f
    //   this.newModel = true
    // },
    queryCondition() {
      this.$api.application
        .queryCondition({
          daima: ""
        })
        .then(data => {
          this.condition = data;
        });
    },
    conditionSearch() {
      this.condition["职务等级"].forEach(item => {
        if (item["名称"] === this.conditionList.zwdj) {
          this.daima.zwdj = item["代码"];
        }
      });
      this.condition["军衔文级"].forEach(item => {
        if (item["名称"] === this.conditionList.jxwj) {
          this.daima.jxwj = item["代码"];
        }
      });
      this.condition["干部性质"].forEach(item => {
        if (item["名称"] === this.conditionList.gbxz) {
          this.daima.gbxz = item["代码"];
        }
      });
      this.condition["档案现状"].forEach(item => {
        if (item["名称"] === this.conditionList.daxz) {
          this.daima.daxz = item["代码"];
        }
      });
      this.condition["管理标识"].forEach(item => {
        if (item["名称"] === this.conditionList.glbs) {
          this.daima.glbs = item["代码"];
        }
      });
      this.$api.application
        .peopleInformation({
          type: this.isAll,
          name: this.conditionList.name,
          sfh: this.conditionList.sfh,
          bubie: this.conditionList.bubie,
          zwdj: this.daima.zwdj, // 职务等级
          zwmc: this.daima.zwmc, // 职务名称
          jxwj: this.daima.jxwj, // 军衔文集
          gbxz: this.daima.gbxz,
          daxz: this.daima.daxz,
          glbs: this.daima.glbs,
          jgmcm: this.jgmcm,
          pageIndex: this.currpage,
          pageSize: this.pagesize
        })
        .then(data => {
          this.length = data.total;
          this.list =
            data["rows"] &&
            data["rows"].map((item, index) => {
              item["ids"] = index + 1;
              item["入伍时间"] =
                item["入伍时间"] && item["入伍时间"].slice(0, 10);
              item["技术"] = item["技术"] ? item["技术"] : "暂无";
              return item;
            });
        });
    },
    getData() {
      this.$api.application
        .unitsTree({
          sfh: this.userInfo.身份号
        })
        .then(data => {
          this.data = data.map(item => {
            item.id = item["机构名称码"];
            item.children = item.children.map(item => {
              item.id = item["机构名称码"];
              item.children = [];
              return item;
            });
            return item;
          });
        });
    },
    showSearch() {
      if (this.showCondition) {
        this.showCondition = false;
      } else {
        this.showCondition = true;
      }
    },
    getResult() {
      this.$api.application
        .peopleInformation({
          jgmcm: this.jgmcm ? this.jgmcm : this.userInfo["权限范围"],
          type: this.isAll,
          pageIndex: this.currpage,
          pageSize: this.pagesize
        })
        .then(data => {
          this.length = data.total;
          this.list =
            data["rows"] &&
            data["rows"].map((item, index) => {
              item["ids"] = index + 1;
              item["入伍时间"] =
                item["入伍时间"] && item["入伍时间"].slice(0, 10);
              item["技术"] = item["技术"] ? item["技术"] : "暂无";
              return item;
            });
        });
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
      this.getResult();
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
      this.getResult();
    }
  }
};
</script>
<style lang="scss" scoped>
.stage6 {
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
    @include justify(space-between);
    .left {
      position: relative;
      z-index: 99;
      @include wh(160px, 640px);
      width: 160px;
      height: 754px;
      background: rgba(5, 27, 74, 0.22);
      border: 1px solid rgba(10, 67, 188, 1);
      box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
      opacity: 0.8;
      overflow: hidden;
      .tree {
        width: 100%;
        height: 714px;
        overflow: auto;
        &::-webkit-scrollbar {
          width: 5px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: #0a43bc;
        }
        &::-webkit-scrollbar-track {
          border-radius: 10px;
          background: #0381ff;
        }
      }
      .queue {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0 16px;
        background: rgba(2, 154, 254, 0.15);
        @include sizing;
        font-size: 13px;
        color: #fff;
      }
    }
    .include_bottom {
      position: absolute;
      z-index: 999;
      bottom: 0;
      height: 30px;
      background: rgba(3, 94, 255, 0.15);
      border-radius: 2px;
      width: 100%;
      line-height: 30px;
      text-align: center;
    }
    .right {
      @include flex;
      margin-left: 16px;
      .top {
        min-height: 60px;
        height: auto;
        width: 100%;
        position: relative;
        z-index: 0;
        background: rgba(5, 27, 74, 0.22);
        border: 1px solid rgba(10, 67, 188, 1);
        box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
        .top_btn {
          margin: 0 16px;
          height: 60px;
          @include box_flex;
          @include justify(space-between);
          @include align(center);
        }
        .sqlBox {
          display: flex;
          margin-bottom: 8px;
        }
        textarea {
          background: rgba(3, 94, 255, 0.15);
          border: 1px solid #0a43bc;
          margin-left: 16px;
          padding: 8px;
        }
        .custom {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(0, 255, 255, 1);
          width: 96px;
          height: 30px;
          border: 1px solid rgba(0, 255, 255, 1);
          border-radius: 2px;
          background: none;
          margin-top: 16px;
          margin-bottom: 8px;
          margin-left: 8px;
          position: relative;
          z-index: 99;
        }
      }
      .left_btn,
      .right_btn {
        position: absolute;
        left: 16px;
        top: 8px;
        z-index: 999;
        button {
          width: 80px;
          border-radius: 2px;
          height: 30px;
          border: none;
          background: none;
        }
        .add {
          background: linear-gradient(
            180deg,
            rgba(5, 141, 252, 1) 0%,
            rgba(12, 96, 200, 1) 100%
          );
          box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.53),
            0px 1px 2px 0px rgba(255, 255, 255, 0.5);
        }
        // .search {
        //     border:1px solid rgba(0,255,255,1);
        //     color: #0ff;
        //     margin-left: 8px;
        // }
        .grade {
          margin-left: 8px;
          background: linear-gradient(
            180deg,
            rgba(194, 194, 194, 1) 0%,
            rgba(91, 112, 131, 1) 100%
          );
          box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.53),
            0px 1px 1px 0px rgba(255, 255, 255, 0.5);
        }
      }
      .bottom {
        width: 100%;
        height: auto;
        margin-top: 16px;
        padding-bottom: 16px;
        position: relative;
        z-index: 0;
        background: rgba(5, 27, 74, 0.22);
        border: 1px solid rgba(10, 67, 188, 1);
        box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
        .con {
          @include sizing;
          position: relative;
          z-index: 99;
          padding: 16px;
          &.con_flex {
            @include box_flex;
            @include flexWrap(wrap);
            @include justify(space-between);
            margin: 0 16px;
            .item {
              @include box_flex;
              text-align: right;
              width: 290px;
              margin-bottom: 8px;
              font-size: 13px;
              span {
                width: 60px;
                line-height: 30px;
              }
              input,
              select {
                width: 220px;
                height: 30px;
                background: rgba(3, 94, 255, 0.15);
                border: 1px solid rgba(10, 67, 188, 1);
                border-radius: 2px;
                color: #fff;
                margin-left: 8px;
                padding: 0 8px;
                outline: none;
                box-sizing: border-box;
              }
              option {
                background: rgba(3, 94, 255, 0.15);
              }
              input {
                width: 218px;
                height: 28px;
                padding: 0 12px;
              }
            }
          }
          .list {
            @include wh(100%, 488px);
            @include box_flex;
            @include flexWrap(wrap);
            .card {
              position: relative;
              @include wh(320px, 226px);
              margin-right: 8px;
              background: rgba(3, 94, 255, 0.15);
              border: 1px solid rgba(10, 67, 188, 1);
              .dentity {
                height: 40px;
                border-bottom: 1px solid rgba(10, 67, 188, 1);
                position: relative;
                line-height: 40px;
                padding: 0 16px;
                box-sizing: border-box;
                img {
                  position: absolute;
                  top: 8px;
                  right: 16px;
                }
              }
              .detail_info {
                @include box_flex;
                img {
                  margin: 16px 6px 16px 16px;
                }
                .person_info {
                  @include box_flex;
                  margin-top: 12px;
                  .list_title {
                    font-size: 13px;
                    font-family: MicrosoftYaHei;
                    line-height: 18px;
                    width: 64px;
                    li {
                      font-weight: 400;
                      color: rgba(2, 154, 255, 1);
                      // margin-right: 8px;
                    }
                  }
                  .list_info {
                    margin-left: 4px;
                    font-size: 13px;
                    font-family: MicrosoftYaHei;
                    line-height: 18px;
                    width: 130px;
                    li {
                      font-weight: 400;
                      color: #fff;
                      // margin-right: 8px;
                    }
                  }
                }
              }
              .add_info {
                position: absolute;
                width: 100%;
                right: 10px;
                bottom: 3px;
                font-size: 14px;
                text-align: right;
                span {
                  width: 77px;
                  height: 28px;
                  display: inline-block;
                  line-height: 28px;
                  text-align: center;
                  margin-right: 8px;
                  box-shadow: 0px 4px 31px 0px rgba(0, 0, 0, 0.41);
                  border-radius: 2px;
                  font-size: 12px;
                }
                .finish {
                  background: linear-gradient(
                    0deg,
                    rgba(166, 242, 189, 1),
                    rgba(34, 162, 72, 1)
                  );
                }
                .short_item {
                  background: linear-gradient(
                    180deg,
                    rgba(242, 188, 0, 1) 0%,
                    rgba(207, 113, 20, 1) 100%
                  );
                }
                .null {
                  background: linear-gradient(
                    180deg,
                    rgba(254, 113, 112, 1) 0%,
                    rgba(254, 7, 0, 1) 100%
                  );
                }
              }
            }
          }
        }
        .con_2 {
          margin: 20px 16px;
          padding-bottom: 20px;
        }
      }
      .materialperson_list {
        position: relative;
        z-index: 0;
        background: rgba(5, 27, 74, 0.22);
        border: 1px solid rgba(10, 67, 188, 1);
        // padding-bottom: 28px;
        padding-top: 5px;
        box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
        margin-top: 16px;
        & > .con_2 {
          margin: 16px;
          box-sizing: border-box;
          button {
            border: none;
            background: none;
            color: rgba(0, 254, 255, 1);
            padding: 4px 8px;
            background: rgba(3, 129, 255, 0.26);
            border-radius: 2px;
            border: 1px solid rgba(10, 67, 188, 1);
          }
        }
      }
      .btns {
        margin: 16px 16px 0 16px;
        text-align: center;
        .submit {
          min-width: 100px;
          width: auto;
          height: 30px;
          padding: 5px 10px;
          border: none;
          background: linear-gradient(
            0deg,
            rgba(12, 96, 200, 1),
            rgba(5, 141, 252, 1)
          );
          box-shadow: 0px 4px 31px 0px rgba(0, 0, 0, 0.41);
          border-radius: 2px;
          color: #fff;
          margin-left: 8px;
        }
      }
    }
    .con {
      @include sizing;
      position: relative;
      z-index: 99;
      padding: 0 16px;
      &.con_flex {
        @include box_flex;
        @include flexWrap(wrap);
        @include justify(space-between);
        margin: 0 16px;
        .item {
          @include box_flex;
          text-align: right;
          width: 290px;
          margin-bottom: 8px;
          font-size: 13px;
          span {
            width: 60px;
            line-height: 30px;
          }
          input,
          select {
            width: 220px;
            height: 30px;
            background: rgba(3, 94, 255, 0.15);
            border: 1px solid rgba(10, 67, 188, 1);
            border-radius: 2px;
            color: #fff;
            margin-left: 8px;
            padding: 0 8px;
            outline: none;
            box-sizing: border-box;
          }
          option {
            background: rgba(3, 94, 255, 0.15);
          }
          input {
            width: 218px;
            height: 28px;
            padding: 0 12px;
          }
        }
      }
      .list {
        @include wh(100%, 488px);
        @include box_flex;
        @include flexWrap(wrap);
        .card {
          position: relative;
          @include wh(320px, 230px);
          margin-right: 8px;
          background: rgba(3, 94, 255, 0.15);
          border: 1px solid rgba(10, 67, 188, 1);
          .dentity {
            height: 40px;
            border-bottom: 1px solid rgba(10, 67, 188, 1);
            position: relative;
            line-height: 40px;
            padding: 0 16px;
            box-sizing: border-box;
            img {
              position: absolute;
              top: 8px;
              right: 16px;
            }
          }
          .detail_info {
            @include box_flex;
            img {
              margin: 16px;
            }
            .person_info {
              @include box_flex;
              margin-top: 12px;
              .list_title {
                font-size: 13px;
                font-family: MicrosoftYaHei;
                line-height: 18px;
                width: 64px;
                li {
                  font-weight: 400;
                  color: rgba(2, 154, 255, 1);
                  // margin-right: 8px;
                }
              }
              .list_info {
                margin-left: 4px;
                font-size: 13px;
                font-family: MicrosoftYaHei;
                line-height: 18px;
                width: 92px;
                li {
                  font-weight: 400;
                  color: #fff;
                  // margin-right: 8px;
                }
              }
            }
          }
          .add_info {
            position: absolute;
            bottom: 16px;
            right: 16px;
            font-size: 14px;
            .add_search {
              margin-right: 16px;
            }
          }
        }
      }
    }
    .search_btn {
      position: relative;
      z-index: 999;
      @include box_flex;
      @include justify(center);
      margin-bottom: 16px;
      margin-top: -34px;
      margin-right: -720px;
      button {
        width: 80px;
        height: 30px;
        border: none;
        color: #fff;
        margin-left: 8px;
        &.search {
          background: linear-gradient(
            0deg,
            rgba(12, 96, 200, 1),
            rgba(5, 141, 252, 1)
          );
          box-shadow: 0px 4px 31px 0px rgba(0, 0, 0, 0.41);
          border-radius: 2px;
        }
        &.clear_all {
          width: 80px;
          height: 30px;
          border: none;
          background: linear-gradient(
            0deg,
            rgba(166, 242, 189, 1),
            rgba(34, 162, 72, 1)
          );
          box-shadow: 0px 4px 31px 0px rgba(0, 0, 0, 0.41);
          border-radius: 2px;
        }
        &.custom {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(0, 255, 255, 1);
          width: 96px;
          height: 30px;
          border: 1px solid rgba(0, 255, 255, 1);
          border-radius: 2px;
          background: none;
        }
      }
    }
    .title_tab {
      position: relative;
      z-index: 999;
    }
  }
  .tab {
    position: absolute;
    z-index: 999;
    right: 16px;
    top: 8px;
    @include box_flex;
    height: 24px;
    li {
      width: 56px;
      height: 24px;
      margin-left: 8px;
      @include box_flex;
      @include align(center);
      img {
        width: 18px;
        height: 18px;
      }
      span {
        font-size: 12px;
        padding-left: 4px;
        // display: inline-block;
        // position: absolute;
        // top: -8px;
      }
    }
  }
  .title_tab {
    height: 24px;
    .tishi {
      padding-left: 16px;
      line-height: 40px;
      color: #029afe;
      span {
        margin-right: 8px;
        &::before {
          content: "";
          display: inline-block;
          width: 14px;
          height: 14px;
          background: #03c539;
          position: relative;
          top: 2px;
          margin-right: 8px;
          border-radius: 2px;
        }
      }
      span:nth-child(2) {
        &::before {
          background: #fec600;
        }
      }
      span:nth-child(3) {
        &::before {
          background: #fe0a04;
        }
      }
    }
  }
  .newPerson {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    @include box_flex;
    @include justify(center);
    @include align(center);
    & > div {
      width: 1000px;
      height: 500px;
      background: rgba(5, 27, 74, 1);
      box-shadow: 0px 0px 26px 0px rgba(0, 229, 255, 0.2) inset;
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
}
</style>
