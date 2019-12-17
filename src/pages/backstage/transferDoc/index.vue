<template>
  <div class="stage">
    <h3>档案情况</h3>
    <button class="back1 point">操作提示</button>
    <button class="back point" @click="back">返回</button>
    <div class="content">
      <div class="left">
        <div class="top">
          <h4>基本信息录入</h4>
          <div class="input-info">
            <div>
              <p>接收单位：</p>
              <el-cascader
                v-model="receiver"
                :show-all-levels="false"
                :options="reciveData"
                :props="{ checkStrictly: true, value: '机构名称码', label: '单位名称' }"
                @change="jsdwSelect"
                clearable>
              </el-cascader>
            </div>
            <div>
              <p>接收人：</p>
              <el-select v-model="received">
                <el-option v-for="(item, index) in receiverlist" :key="index" :label="item.姓名" :value="item.身份号"></el-option>
              </el-select>
            </div>
            <div>
              <p>送交人：</p>
              <el-select v-model="sender" filterable allow-create>
                <el-option v-for="item in sendlist" :key="item.身份号" :label="item.姓名" :value="item.身份号"></el-option>
              </el-select>
            </div>
            <div>
              <p>转递人(默认为当前用户)：</p>
              <el-select v-model="forwarder">
                <el-option v-for="item in pushlist" :key="item.身份号" :label="item.姓名" :value="item.身份号"></el-option>
              </el-select>
            </div>
          </div>
          <PositionHorn />
        </div>
        <h3>选择干部</h3>
        <div class="choose">
          <div class="left_tree">
            <div class="queue">单位组织序列</div>
            <div class="tree">
              <el-tree
            :data="data"
            :props="defaultProps"
            node-key="id"
            default-expand-all
            highlight-current
            @node-click="handleNodeClick"
            ref="tree"></el-tree>
            </div>
           
<!--            <el-radio v-model="radio" label="1">显示包含下级单位</el-radio>-->
            <PositionHorn />
          </div>
          <div class="right_person">
            <div class="top_condition">
              <div class="top_btn">
                <div class="left_btn">
                  <button class="search point" @click="showSearch">条件查询</button>
                  <button class="search point" @click="showSqlBox">sql语句查询</button>
                </div>
                <div class="search_btn" v-show="isShowCondition">
                  <button class="search point" @click="conditionSearch" @keyup.enter.native="conditionSearch()">查询</button>
                  <button class="clear_all point" @click="clearbox">清空</button>
                </div>
                <div class="search_btn" v-show="isShowsql">
                  <button class="search point" @click="conditionSearch2" @keyup.enter.native="conditionSearch2()">查询</button>
                  <button class="clear_all point" @click="clearbox2">清空</button>
                </div>
              </div>
              <div v-show="isShowCondition">
                <div class="con con_flex">
                  <div class="item">
                    <span>姓名:</span>
                    <input type="text" value="李浩芮" v-model="conditionList['name']" />
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
                    <span>职务等级:</span>
                    <el-select v-model="conditionList['zwdj']">
                      <el-option v-for="(item, index) in condition['职务等级']" :key="index" :label="item.名称" :value="item.代码"></el-option>
                    </el-select>
                  </div>
                  <div class="item">
                    <span>军衔文级:</span>
                    <el-select v-model="conditionList['jxwj']">
                      <el-option v-for="(item, index) in condition['军衔文级']" :key="index" :value="item.代码" :label="item.名称"></el-option>
                    </el-select>
                  </div>
                  <div class="item">
                    <span>干部性质:</span>
                    <el-select v-model="conditionList['gbxz']">
                      <el-option v-for="(item, index) in condition['干部性质']" :key="index" :value="item.代码" :label="item.名称"></el-option>
                    </el-select>
                  </div>
                  <div class="item">
                    <span>档案现状:</span>
                    <el-select v-model="conditionList['daxz']">
                      <el-option v-for="(item, index) in condition['档案现状']" :key="index" :value="item.代码" :label="item.名称"></el-option>
                    </el-select>
                  </div>
                  <div class="item">
                    <span>档案号:</span>
                    <el-select v-model="conditionList['glbs']">
                      <el-option v-for="(item, index) in condition['管理标识']" :key="index" :value="item.代码" :label="item.名称"></el-option>
                    </el-select>
                  </div>
                  <div class="item">
                    <span>身份号:</span>
                    <input type="text" v-model="conditionList['sfh']" />
                  </div>
                </div>
              </div>
              <div v-show="isShowsql">
                <div class="sqlBox">
                  <span>输入sql语句:</span>&nbsp;&nbsp;
                  <textarea cols="130" rows="6" v-model="sql"></textarea>
                </div>

              </div>
              <PositionHorn />
            </div>
            <div class="search_result common_style">
              <div class="title">
                <span>查询结果</span>
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
                  <div v-for="(item, index) in lists" :key="index" class="card">
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
                            <span>籍&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;贯 :</span>
                          </li>
                          <li>
                            <span>出生时间 :</span>
                          </li>
                          <li>
                            <span>入伍时间 :</span>
                          </li>
                          <li>
                            <span>职务等级 :</span>
                          </li>
                          <li>
                            <span>技术等级 :</span>
                          </li>
                          <li>
                            <span>军&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;衔 :</span>
                          </li>
                          <li>
                            <span>身&nbsp;份&nbsp;号 :</span>
                          </li>
                        </ul>
                        <ul class="list_info">
                          <li>
                            <span>{{item['籍贯'] ? item['籍贯'] : '暂无'}}</span>
                          </li>
                          <li>
                            <span>{{item['出生时间'].split('T')[0] ? item['出生时间'].split('T')[0] :'暂无'}}</span>
                          </li>
                          <li>
                            <span>{{item['入伍时间'].split('T')[0] ? item['入伍时间'].split('T')[0] :'暂无'}}</span>
                          </li>
                          <li style="width:120px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">
                            <span title="item['职务']">{{item['职务'] ? item['职务'] : '暂无'}}</span>
                          </li>
                          <li>
                            <span>{{item['技术'] ? item['技术'] : '暂无'}}</span>
                          </li>
                          <li>
                            <span>{{item['军衔'] ? item['军衔'] : '暂无'}}</span>
                          </li>
                          <li>
                            <span>{{item['身份号'] ? item['身份号'] : '暂无'}}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="add_info">
                      <span class="add_search point" @click="addSearch(item)">加入列表</span>
                    </div>
                  </div>
                </div>
                <el-pagination
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  background
                  :page-size="pagesize"
                  :current-page="currpage"
                  :total="length"
                  prev-text="上一页"
                  next-text="下一页"
                  layout="prev, pager, next, jumper"
                ></el-pagination>
              </div>
              <div class="con_2" v-if="type === 'table'">
                <el-table :data="lists" stripe style="width: 100%">
                  <el-table-column prop="ids" label="序号" width="70"></el-table-column>
                  <el-table-column prop="姓名" label="姓名"></el-table-column>
                  <el-table-column prop="职务" label="职务名称"></el-table-column>
                  <el-table-column prop="入伍时间" label="入伍时间" width="120"></el-table-column>
                  <el-table-column prop="职务等级" label="职务等级"></el-table-column>
                  <el-table-column prop="技术" label="技术等级" width="80"></el-table-column>
                  <el-table-column prop="军衔" label="军衔"></el-table-column>
                  <el-table-column prop="技术职务" label="技术职务"></el-table-column>
                  <el-table-column prop="option" label="操作" width="100">
                    <div slot-scope="scope">
                      <span class="add_search point" @click="addSearch(scope.row)">加入列表</span>
                    </div>
                  </el-table-column>
                </el-table>
                <!-- <el-pagination
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  background
                  :page-size="pagesize"
                  :total="length"
                  prev-text="上一页"
                  next-text="下一页"
                  layout="prev, pager, next, jumper"
                ></el-pagination> -->
              </div>
              <PositionHorn />
            </div>
          </div>
        </div>

        <div class="materialperson_list common_style">
          <div class="title">
            <span>档案转出列表</span>
          </div>
          <div class="con_2">
            <el-table :data="checked" stripe style="width: 100%">
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="姓名" label="姓名" width="70"></el-table-column>
              <el-table-column prop="部别" label="部别" width="200"></el-table-column>
              <el-table-column prop="档案类型" label="档案类型" width="130">
                <div slot-scope="scope">
                  <el-select v-model="scope.row.档案类型">
                    <el-option v-for="(item, index) in dntype" :key="index" :value="item.代码" :label="item.名称"></el-option>
                  </el-select>
                </div>
              </el-table-column>
              <el-table-column prop="转出原因" label="转出原因" width="110">
                <div slot-scope="scope">
                  <el-select v-model="scope.row.转出原因">
                    <el-option v-for="(item, index) in  reasonlist" :key="index" :value="item.代码" :label="item.名称"></el-option>
                  </el-select>
                </div>
              </el-table-column>
              <el-table-column prop="转递人审查纸质状态" label="纸质审查状态"></el-table-column>
              <el-table-column prop="转递人审查电子状态" label="电子审查状态"></el-table-column>
              <el-table-column prop="option" width="140" label="操作">
                <div slot-scope="scope">
                  <button @click="danganshencha(scope.row, '转出')" class="point">档案审查</button>
                  <button @click="removeCheck(scope.row)" class="point">移除</button>
                </div>
              </el-table-column>
            </el-table>
          </div>
          <PositionHorn />
        </div>
      </div>
      <div class="right">
        <div class="my_accept common_style">
          <div class="title">
            <span>我的接收</span>
            <span class="more point" @click="more('接收')">更多</span>
          </div>
          <div class="cont">
            <div class="cont_item" v-for="(item, index) in jieshoulist" :key="index">
              <div class="cont_title">{{item.转递人单位 + '申请转入' + item.档案数量 + '份档案'}}</div>
              <div class="bot">
                <div v-if="item.名称 === '待同意'" class="state1">待同意</div>
                <div v-if="item.名称 === '待转出'" class="state1">待转出</div>
                <div v-if="item.名称 === '待接收'" class="state1">待接收</div>
                <div v-if="item.名称 === '撤回'" class="state0">撤回</div>
                <div v-if="item.名称 === '已完成'" class="state2">已完成</div>
                <button @click="lookDetail(item.名称, '接收', item.档案转递单号)" class="point">查看</button>
              </div>
            </div>
          </div>
          <PositionHorn />
        </div>
        <div class="my_accept common_style">
          <div class="title">
            <span>我的转出</span>
            <span class="more point" @click="more('转出')">更多</span>
          </div>
          <div class="cont">
            <div class="cont_item" v-for="(item, index) in zhuanchulist" :key="index">
              <div class="cont_title">{{'申请转出' + item.档案数量 + '份档案至' + item.接收单位}}</div>
              <div class="bot">
                <div v-if="item.名称 === '待同意'" class="state1">待同意</div>
                <div v-if="item.名称 === '待转出'" class="state1">待转出</div>
                <div v-if="item.名称 === '待接收'" class="state1">待接收</div>
                <div v-if="item.名称 === '撤回'" class="state0">撤回</div>
                <div v-if="item.名称 === '已完成'" class="state2">已完成</div>
                <button @click="lookDetail(item.名称, '转出', item.档案转递单号)" class="point">查看</button>
              </div>
            </div>
          </div>
          <PositionHorn />
        </div>
      </div>
    </div>
    <div class="btn">
      <button class="submit point" @click="saveDraft">保存草稿</button>
      <button class="reset point" @click="resetbox">重置</button>
      <button class="submit point" @click="submitbox">提交</button>
    </div>
  </div>
</template>
<script>
import PositionHorn from "@/components/Postion_Horn";
export default {
  name: "material_content",
  components: {
    PositionHorn
  },
  data() {
    return {
      forwarder: '',
      reciveData: [],
      //草稿
      draftDetial: {},
      data: [],
      receiver: "",
      received: "",
      sender: '',
      receiverlist: [],
      pushlist: [],
      sendlist: [],
      receivedlist: [],
      dntype: [],
      reason: "",
      dangantype: "",
      reasonlist: [],
      props: {
        label: "name",
        children: "zones"
      },
      count: 1,
      defaultProps: {
       children: 'children',
        label: '单位名称',
        jgmcm: '机构名称码'
      },
      radio: false,
      items: {},
      lists: [],
      jieshoulist: [],
      zhuanchulist: [],
      accept: [],
      checked: [],
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
      row: {},
      condition: [],
      pagesize: 4,
      pagesizeTab: 10,
      currpage: 1,
      type: "card",
      length: 0,
      // checked1:{}
      // 条件查询和sql语句查询显示隐藏
      sql: "",
      isShowsql: false,
      isShowCondition: false,
      checkedParam: [],
      userInfo:{}
    };
  },
  created() {
    // 档案转出列表
    this.userInfo = JSON.parse(document.cookie.split('=')[1])
    this.jgmcm = JSON.parse(document.cookie.split("=")[1]).机构名称码;
    this.getthee();
    this.getData();
    this.$nextTick(function() {
      this.$data.data.forEach(row => {
        if (row.show) {
          this.$refs.tree.setCurrentKey(row.id);
          this.$refs.tree.store.nodesMap[row.id].expanded = true;
        }
      });
    });
    this.getResult();
    this.queryCondition();
    this.jieshourecordlist();
    this.zhuandirecordlist();
    // this.jsdwSelect()
      var _self = this;
      document.onkeydown = function(e){
          if(window.event == undefined){
              var key = e.keyCode;
          }else{
              var key = window.event.keyCode;
          }
          if(key == 13){
              _self.conditionSearch();
              _self.conditionSearch1();

          }
      }
  },
  methods: {
    // 选择接收单位
    jsdwSelect (param = '') {
      this.received = ''
      this.sender = ''
      this.forwarder = ''
      if (param === 'showDraftMsg') {
        this.$api.application.get_yonghuxiala({
          jsjgmcm: this.receiver,
          zdjgmcm: this.jgmcm
        }).then( (data)=> {
          this.receiverlist = data.接收用户;
          this.pushlist = data.转递用户;
          this.sendlist = data.送交用户;
          this.forwarder = JSON.parse(document.cookie.split("=")[1]).身份号;
        })
      } else {
        this.$api.application.get_yonghuxiala({
          jsjgmcm: this.receiver[this.receiver.length - 1],
          zdjgmcm: this.jgmcm
        }).then( (data)=> {
          this.receiverlist = data.接收用户;
          this.pushlist = data.转递用户;
          this.sendlist = data.送交用户;
          this.forwarder = JSON.parse(document.cookie.split("=")[1]).身份号;
        })
      }
      // console.log(param)
      // this.received = ''
      // this.sender = ''
      // this.forwarder = ''
      // if (param === 'showDraftMsg') {
      //   this.$api.application.get_yonghuxiala({
      //     jsjgmcm: this.receiver,
      //     zdjgmcm: this.jgmcm
      //   }).then( (data)=> {
      //     this.receiverlist = data.接收用户;
      //     this.pushlist = data.转递用户;
      //     this.sendlist = data.送交用户;
      //     this.forwarder = JSON.parse(document.cookie.split("=")[1]).身份号;
      //   })
      // } else {

      //   this.$api.application.lidangTree({
      //     id: this.receiver[this.receiver.length - 1]
      //   }).then((data) => {

      //   })
      //   this.$api.application.get_yonghuxiala({
      //     jsjgmcm: this.receiver[this.receiver.length - 1],
      //     zdjgmcm: this.jgmcm
      //   }).then( (data)=> {
      //     this.receiverlist = data.接收用户;
      //     this.pushlist = data.转递用户;
      //     this.sendlist = data.送交用户;
      //     this.forwarder = JSON.parse(document.cookie.split("=")[1]).身份号;
      //   })
      // }
    },
    //档案审查方法
    danganshencha(row, shenchaType) {
      let params = {}
      this.submitboxParams(params)
      this.$api.application.add_zhaundicaogao(params).then((data)=> {})
      this.row = JSON.stringify(row);
      // this.$router.push("/home/backstage/quality_control/popup?row=" + this.row
      this.$router.push({path:"/home/backstage/quality_control/popup", query: {"shenchaType": shenchaType, "name": row.姓名, "danwei": row.部别, "jgmcm": row.机构名称码, "rowsfh": row.身份号, "zlbh": row.zlbh}});
    },
    //档案转出列表的移除方法
    removeCheck(item) {
      this.checked.forEach((v, i) => {
        if (item["身份号"] === v["身份号"]) {
          this.checked.splice(i, 1);
        }
      });
      // if (sessionStorage.scSituation) {
      //   let newSession = sessionStorage.scSituation.filter(v => {
      //     return item.身份号 !== v.rowsfh
      //   })
      //   sessionStorage.setItem('scSituation', newSession)
      // }
    },
    //加入列表的方法
    addSearch(item) {
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
            item["出生时间"] = item["出生时间"] && item["出生时间"].slice(0, 10);
            return item;
          })
      }
    },
    dalxChange (row) {},
    zcyyChange (row) {},
    //重置接口
    resetbox() {
      if (this.receiver === '' || this.received === '' || this.sender === '' || this.forwarder === '') {
        this.$message({
          showClose: true,
          message: '请完成基本信息录入',
          type: 'error'
        });
        return
      }
      this.checked.forEach((v, i) => {
        this.checked.splice(i);
      });
      let params = {}
      this.submitboxParams(params)
      // this.$api.application.add_zhaundicaogao(params).then((data)=> {
      //   if (sessionStorage.scSituation) {
      //     let newSession = sessionStorage.scSituation.filter(item => {
      //       return item.shenchaType !== '接收'
      //     })
      //     sessionStorage.setItem('scSituation', newSession)
      //   }
      // })
    },
    // 保存草稿
    saveDraft(operation = '') {
      if (operation !== '审查') {
        if (this.receiver === '' || this.received === '' || this.sender === '' || this.forwarder === '') {
          this.$message({
            showClose: true,
            message: '请完成基本信息录入',
            type: 'error'
          });
          return
        }
      }
      let params = {}
      this.submitboxParams(params)
      this.$api.application.add_zhaundicaogao(params).then((data)=> {
        if(operation !== '审查') {
          if (sessionStorage.scSituation) {
            let newSession = JSON.parse(sessionStorage.scSituation).filter(item => {
              return item.shenchaType !== '转出'
            })
            sessionStorage.setItem('scSituation', newSession)
          }
          this.$message({
            message: data.message,
            type: 'success'
          });
        }
      })
    },
    // 提交方法
    submitbox() {
      if (this.receiver === '' || this.received === '' || this.sender === '' || this.forwarder === '') {
        this.$message({
          showClose: true,
          message: '请完成基本信息录入',
          type: 'error'
        });
        return
      }
      let params = {}
      this.submitboxParams(params)
      this.$api.application.Addzhuanjiedangan(params).then( (data)=> {
        this.checked.forEach((v, i) => {
          this.checked.splice(i);
        });
        if (sessionStorage.scSituation) {
          let newSession = JSON.parse(sessionStorage.scSituation).filter(item => {
            return item.shenchaType !== '接收'
          })
          sessionStorage.setItem('scSituation', newSession)
        }
        this.checkedParam = []
        this.zhuandirecordlist()
      })
    },
    // 保存草稿/提交入参处理
    submitboxParams (params) {
      this.checkedParam = []
      if(this.checked.length !== 0) {
        this.checked.forEach((item,index) => {
          this.checkedParam.push({"sfh": item.身份号, "zlbh": item.zlbh || '', "zzState": item.转递人审查纸质状态 || '', 'dzState': item.转递人审查电子状态 || '', "dalx": item.档案类型, "zcyy": item.转出原因})
        })
      }
      // 入参对象
      if (this.draftDetial.档案转递单号 === '0') {
        params.zdbh = ''
      } else {
        params.zdbh = this.draftDetial.档案转递单号
      }
      params.zdrsfh = this.forwarder
      params.jieshouren_sfh = this.received
      if (isNaN(this.sender)) {
        params.sjrsfh = ''
        params.sjrname = this.sender
      } else {
        params.sjrsfh = this.sender
        params.sjrname = ''
      }
      params.renyuanlist = JSON.stringify(this.checkedParam)
      params.dangan_count = this.checkedParam.length
    },
    // 清空方法
    clearbox() {
      this.conditionList.name = "";
      this.conditionList.bubie = "";
      this.conditionList.zwmc = "";
      this.conditionList.zwdj = "";
      this.conditionList.jxwj = "";
      this.conditionList.gbxz = "";
      this.conditionList.daxz = "";
      this.conditionList.glbs = "";
      this.conditionList.sfh = "";
      this.getResult();
    },
    clearbox2() {
      this.sql = "";
        this.getResult();
    },

    //获取接收单位
    getthee() {
      this.$api.application.pulldownmenu({}).then(data => {
        this.receivedlist = data.单位;
        this.dntype = data.档案类型;
        this.reasonlist = data.转出原因;
      });
    },
    //人员信息的方法。
    handleNodeClick(data) {
      // 获取单位下的所有人员信息
      this.currpage = 1;
      this.jgmcm = data['机构名称码'];
      let newdata = []
      if (data.children.length === 0) {
          this.$api.application.unitsTree({
              id: data.id
          }).then((newdata) => {
              newdata = newdata ? newdata.map((item) => {
                  item.id = item['机构名称码']
                  item.children = []
                  return item
              }) : []
              if (newdata && newdata.length > 0) {
                  this.$nextTick(() => {
                      this.$refs.tree.updateKeyChildren(data.id,newdata);
                      // this.$refs.tree.setCurrentNode(data.id)
                  })
              }
          })
        }
      this.getResult()
    },
    //我的接收列表
    jieshourecordlist () {
      this.$api.application.jieshourecordlist({
        jgmcm: this.jgmcm
      }).then( (data)=> {
        this.jieshoulist = data
      })
    },
    //我的转出列表
    zhuandirecordlist () {
      this.$api.application.zhuandirecordlist({
        jgmcm: this.jgmcm,
        sfh: JSON.parse(document.cookie.split("=")[1]).身份号
      }).then( (data)=> {
        this.checked = data.详情
        if(this.checked.length !== 0 && sessionStorage.scSituation) {
          this.checked.forEach((item, index) => {
            JSON.parse(sessionStorage.scSituation).forEach((item2, index2) => {
              if (item2.shenchaType === '转出') {
                if(item.身份号 === item2.rowsfh) {
                  item.zlbh = item2.zlbh
                  item.转递人审查纸质状态 = item2.zzState
                  item.转递人审查电子状态 = item2.dzState
                  item.zzState = ''
                  item.dzState = ''
                }
              }
            })
          })
        }
        this.zhuanchulist = data.转出
        if (data.草稿.length !== 0) {
          this.draftDetial = data.草稿[0]
          this.receiver = data.草稿[0].接收单位机构名称码
          this.jsdwSelect('showDraftMsg') // 触发接收单位select的change事件，加载接收人和送交人的下拉数据
          this.received = data.草稿[0].接收人身份号
          this.sender = data.草稿[0].送交人身份号
          this.forwarder = data.草稿[0].转递人身份号
        } else {
          this.draftDetial = {"档案转递单号": '0'}
        }
      })
    },
    // 递归删除单位树中的空children数组
    queryList (data, arr) {
      for (var i = 0; i < data.length; i++) {
        var children = data[i].children;
        if (children.length == 0) {
          delete data[i].children
        } else {
          this.queryList(children, arr);
        }
      }
      return arr;
    },
    //单位树接口
    getData() {
       this.$api.application.unitsTree({
         sfh: this.userInfo.身份号
      }).then((data) => {
        this.data = data.map((item) => {
          item.id = item['机构名称码']
          item.children = item.children.map((item) => {
            item.id = item['机构名称码']
            item.children = []
            return item
          })
          return item
        })
        console.log(this.data)
      })
      this.$api.application.lidangTree().then((data) => {
        this.reciveData =  data.map((item) => {
          item.children = item.children.map((item, index) => {
            item.id = index + 1
            item.children = []
            return item
          })
          return item
        })
        console.log(this.reciveData)
        let reciveArr = []
        this.queryList(this.reciveData, reciveArr)
          // item.id = item['机构名称码']
          // item.children = item.children.map((item) => {
          //   item.id = item['机构名称码']
          //   item.children = []
          //   return item
          // })
          // return item
        console.log(this.data)
      })
      // this.$api.build.unitTreeQuery({
      //   parentCode: this.userInfo['权限范围']
      // }).then((data) => {
      //   // this.data = data['partUnitsList']
      //   this.reciveData = data['allUnitsList']
      //   let reciveArr = []
      //   this.queryList(this.reciveData, reciveArr)
      // })
    },
    back() {
      this.$router.back();
    },
    scan() {
      this.$router.push("/home/backstage/scan");
    },
    more(type) {
      if (type === "转出") {
        this.$router.push("/home/backstage/rollOut_list");
      } else if (type === "接收") {
        this.$router.push("/home/backstage/rollIn_list");
      }
    },
    lookDetail(state, type, orderId) {
      if (type === "转出") {
        this.$router.push("/home/backstage/rollOut_detail?state=" + state + '&orderId=' + orderId);
      } else if (type === "接收") {
        this.$router.push("/home/backstage/rollIn_detail?state=" + state + '&orderId=' + orderId);
      }
    },
    changeType(type) {
      this.type = type;
    },
    conditionSearch() {
      this.currpage = 1;
      this.getResult()
      // this.$api.application.selectCondition({
      //   name: this.conditionList.name,
      //   bubie: this.conditionList.bubie,
      //   zwdj: this.conditionList.zwdj, // 职务等级
      //   jxwj: this.conditionList.jxwj, // 军衔文集
      //   sfh: this.conditionList.sfh
      // }).then(data => {
      //   this.length = data.total
      //   this.lists = data['rows'] && data['rows'].map((item, index) => {
      //     item['ids'] = index + 1
      //     item['入伍时间'] = item['入伍时间'] && item['入伍时间'].slice(0, 10)
      //     item['技术'] = item['技术'] ? item['技术'] : '暂无'
      //     return item
      //   })
      // })
    },
    conditionSearch2 () {
      this.$api.application.sqlQuery({
        sql: this.sql
      }).then( (data)=> {
        if(data instanceof Array ){
          this.lists = data && data.map((item, index) => {
            item['ids'] = index + 1
            item['入伍时间'] = item['入伍时间'] && item['入伍时间'].slice(0, 10)
            item['技术'] = item['技术'] ? item['技术'] : '暂无'
            return item
          })
        }
      })
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
      this.getResult();
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
      this.getResult();
    },
    //查询列表接口
    getResult() {
      this.$api.application.peopleInformation({
        name: this.conditionList.name,
        bubie: this.conditionList.bubie,
        zwdj: this.conditionList.zwdj, // 职务等级
        jxwj: this.conditionList.jxwj, // 军衔文集
        sfh: this.conditionList.sfh,
        jgmcm: this.jgmcm ? this.jgmcm: this.userInfo['权限范围'],
        gbxz: this.conditionList.gbxz, // 干部性质
        daxz: this.conditionList.daxz, // 档案现状
        glbs: this.conditionList.glbs, // 管理标识
        pageIndex: this.currpage,
        pageSize: this.pagesize
      })
      .then(data => {
        this.length = data.total;
        this.lists =
          data["rows"] &&
          data["rows"].map((item, index) => {
            item["档案类型"] = '';
            item["转出原因"] = '';
            item['ids'] = index + 1
            item["入伍时间"] =
              item["入伍时间"] && item["入伍时间"].slice(0, 10);
            item["技术"] = item["技术"] ? item["技术"] : "暂无";
            return item;
          });
      });
    },
    queryCondition() {
      this.$api.application
        .queryCondition({
          daima: ""
        })
        .then(data => {
          this.condition = data;
        });
    },
    showSearch() {
      if (this.isShowCondition) {
        this.isShowsql = false
        this.isShowCondition = false
      } else {
        this.isShowsql = false
        this.isShowCondition = true
      }
    },
    showSqlBox () {
      if (this.isShowsql) {
        this.isShowsql = false
        this.isShowCondition = false
      } else {
        this.isShowsql = true
        this.isShowCondition = false
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.el-cascader {
  line-height: normal;
}
.el-select-dropdown__item {
  padding: 0 20px;
}
.con.con_flex .item .el-select {
  padding-left: 14px;
}
.stage {
  margin: 0 auto;
  width: 1200px;
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
  .content .con.con_flex .item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    text-align: right;
    width: 240px;
    margin-bottom: 8px;
    font-size: 12px;
  }
}

.content {
  @include box_flex;
  .left {
    width: 980px;
    .top {
      width: 100%;
      position: relative;
      z-index: 0;
      height: 120px;
      background: rgba(5, 27, 74, 0.15);
      box-shadow: 0px 0px 26px 0px rgba(0, 229, 255, 0.2) inset;
      border: 1px solid rgba(10, 67, 188, 0.32);
      .input-info {
        @include box_flex;
        @include justify(space-around);
        position: relative;
        z-index: 999;
        margin: 0 8px;
        p {
          line-height: 30px;
        }
        input {
          width: 220px;
          height: 28px;
          background: rgba(3, 94, 255, 0.15);
          border-radius: 2px;
          border: 1px solid rgba(10, 67, 188, 0.94);
          padding: 0 8px;
          color: #ddd;
          box-sizing: border-box;
          // outline: 1px solid rgba(0,254,255,0.6);;
        }
      }
    }
    .choose {
      @include box_flex;
      .right_person {
        @include flex;
        @include box_flex;
        @include direction(column);
        margin-left: 16px;
        .top_condition {
          min-height: 40px;
          height: auto;
          width: 100%;
          position: relative;
           z-index: 0;
          background: rgba(5, 27, 74, 0.22);
          border: 1px solid rgba(10, 67, 188, 1);
          box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
          .top_btn {
            margin: 8px 16px;
            height: 40px;
            @include box_flex;
            @include justify(space-between);
            @include align(center);
            button {
              width: 72px;
              border-radius: 2px;
              height: 28px;
              border: none;
              background: none;
              position: relative;
              z-index: 9999;
            }
            .search {
              border: 1px solid rgba(0, 255, 255, 1);
              color: #0ff;
              margin-left: 8px;
            }
          }
        }
        .search_result {
          height: auto;
          padding-bottom: 32px;
          // @include flex;
          position: relative;
          margin-top: 16px;
          background: rgba(5, 27, 74, 0.22);
          border: 1px solid rgba(10, 67, 188, 1);
          box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
          opacity: 0.8;
          position: relative;
          // margin-bottom:16px;
          .con {
            padding: 0 100px;
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
        }
      }
    }
    .left_tree {
      position: relative;
      z-index: 999;
      @include wh(160px, 640px);
      width: 160px;
      height: 639px;
      background: rgba(5, 27, 74, 0.22);
      border: 1px solid rgba(10, 67, 188, 1);
      box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
      opacity: 0.8;
      overflow: hidden;
      .tree {
          width: 100%;
          height:600px;
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
    .search_btn {
      position: relative;
      z-index: 999;
      @include box_flex;
      @include justify(center);
      margin-bottom: 10px;
      button {
        width: 60px;
        height: 28px;
        border: none;
        color: #fff;
        margin-left: 8px;
        font-size: 12px;
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
          background: linear-gradient(
            0deg,
            rgba(166, 242, 189, 1),
            rgba(34, 162, 72, 1)
          );
          box-shadow: 0px 4px 31px 0px rgba(0, 0, 0, 0.41);
          border-radius: 2px;
        }
        &.custom {
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(0, 255, 255, 1);
          width: 80px;
          border: 1px solid rgba(0, 255, 255, 1);
          border-radius: 2px;
          background: none;
        }
      }
    }
  }
  h4 {
    height: 40px;
    margin-top: 0px;
    line-height: 40px;
    padding: 0 16px;
    font-size: 14px;
    &::after {
      content: "";
      display: inline-block;
      width: 86px;
      height: 20px;
      position: relative;
      top: 8px;
      left: 10px;
      background: url("../../../assets/images/tit-right.png") no-repeat;
    }
  }
  .materialperson_list {
    position: relative;
     z-index: 0;
    background: rgba(5, 27, 74, 0.22);
    border: 1px solid rgba(10, 67, 188, 1);
    padding-bottom: 28px;
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
  .con {
    @include sizing;
    position: relative;
    z-index: 99;
    padding: 0 16px;
    &.con_flex {
      @include box_flex;
      @include flexWrap(wrap);
      @include justify(space-between);
      margin: 0 8px;
      .item {
        @include box_flex;
        text-align: right;
        width: 220px;
        margin-bottom: 8px;
        font-size: 12px;
        span {
          width: 60px;
          line-height: 30px;
        }
        input,
        select {
          width: 180px;
          height: 30px;
          background: rgba(3, 94, 255, 0.15);
          border: 1px solid rgba(10, 67, 188, 1);
          border-radius: 2px;
          color: #ddd;
          margin-left: 8px;
          padding: 0 8px;
          outline: none;
          box-sizing: border-box;
        }
        option {
          background: rgba(3, 94, 255, 0.15);
        }
        input {
          width: 180px;
          height: 28px;
          padding: 0 12px;
        }
      }
    }
    .list {
      @include wh(100%, 488px);
      @include box_flex;
      @include flexWrap(wrap);
      @include justify(space-around);
      margin-top: 20px;
      // margin-left: 30px;
      // margin-right: 30px;
      .card {
        position: relative;
        @include wh(280px, 220px);
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
  .con_2 {
    box-sizing: border-box;
    margin: 20px 8px;
  }
  .common_style {
    color: #fff;
    font-size: 14px;
    .title {
      height: 24px;
      span:first-child {
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
    }
  }
  & > .right {
    margin-left: 16px;
    @include flex;
    & > div {
      height: 500px;
      position: relative;
      z-index:0;
      margin-bottom: 16px;
      background: rgba(5, 27, 74, 0.15);
      box-shadow: 0px 0px 26px 0px rgba(0, 229, 255, 0.2) inset;
      border: 1px solid rgba(10, 67, 188, 0.32);
    }
    .more {
      position: absolute;
      z-index: 999;
      cursor: pointer;
      right: 16px;
      top: 8px;
      font-size: 12px;
    }
    .common_style {
      font-size: 13px;
      span:first-child {
        position: relative;
        top: 8px;
        left: 16px;
        &::after {
          content: "";
          @include wh(50px, 12px);
          display: inline-block;
          margin-left: 8px;
          background: url("../../../assets/images/tit-right.png");
        }
      }
    }
  }
  .cont::-webkit-scrollbar {
    width: 5px;
  }
  .cont::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #0a43bc;
  }
  .cont::-webkit-scrollbar-track {
    border-radius: 10px;
    background: #0381ff;
  }
  .cont {
    margin: 0 16px;
    height: 93%;
    overflow-y: scroll;
    .cont_item {
      line-height: 20px;
      border-bottom: 1px dashed rgba(3, 94, 255, 0.4);
      padding: 8px 0;
      font-size: 12px;
      .state0 {
        color: #fe0700;
      }
      .state1 {
        color: #fec600;
      }
      .state2 {
        color: #03c539;
      }
    }

    .cont_item:last-child {
      border: none;
    }
    .bot {
      @include box_flex;
      @include justify(space-between);
      button {
        position: relative;
        z-index: 999;
        border: none;
        background: none;
        width: 44px;
        height: 20px;
        background: rgba(3, 129, 255, 0.26);
        border-radius: 2px;
        border: 1px solid rgba(10, 67, 188, 1);
        color: #0381ff;
        right: 10px;
      }
    }
  }
}
.btn {
  margin-bottom: 16px;
  margin-top: 16px;
  text-align: center;
  .reset {
    width: 80px;
    height: 28px;
    background: none;
    border: 1px solid rgba(0, 255, 255, 1);
    border-radius: 2px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 255, 255, 1);
    margin-left: 8px;
  }
  .submit {
    width: 80px;
    height: 30px;
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
.con_2 {
  select {
    height: 24px;
    background: rgba(3, 129, 255, 0.26);
    border-radius: 2px;
    border: 1px solid rgba(10, 67, 188, 1);
    color: #fff;
    option {
      background: #00f;
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
.back1 {
  position: absolute;
  right: 70px;
  top: 0;
  width: 60px;
  height: 24px;
  background: rgba(3, 129, 255, 0.26);
  border-radius: 2px;
  border: 1px solid rgba(10, 67, 188, 1);
  color: #fff;
}

.sqlBox {
  display: flex;
  padding-bottom: 10px;
  span {
    text-indent: 25px;
    line-height: 35px;
  }
  textarea {
    width: 80%;
    background: rgba(3,94,255,0.15);
    border: 1px solid #0a43bc;
    color: #ddd;
    margin-left: 10px;
    padding: 8px;
  }
}

</style>
