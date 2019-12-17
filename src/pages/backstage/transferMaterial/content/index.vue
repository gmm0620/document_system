<template>
  <div>
    <div class="content">
        <div class="left">
          <div class="top">
              <h4>基本信息录入</h4>
              <div class="input-info">
                  <div class="input-info-item" v-if="$route.params.typeId == 1">
                    <p>送交单位：</p>
                    <el-cascader
                      v-model="sendCompany"
                      :show-all-levels="false"
                      :options="data"
                      :props="{ checkStrictly: true, value: '机构名称码', label: '单位名称' }"
                      @change="sjdwSelect"
                      clearable>
                    </el-cascader>
                  </div>
                  <div class="input-info-item" v-if="$route.params.typeId == 2">
                    <p>接收单位：</p>
                    <el-cascader
                      v-model="receiveCompany"
                      :show-all-levels="false"
                      :options="reciveData"
                      :props="{ checkStrictly: true, value: '机构名称码', label: '单位名称' }"
                      @change="jsdwSelect"
                      clearable>
                    </el-cascader>
                  </div>
                  <div class="input-info-item" v-if="$route.params.typeId == 2">
                    <p>接收人：</p>
                    <el-select v-model="onlineReceiver">
                      <el-option v-for="item in receiverlist" :key="item.身份号" :label="item.姓名" :value="item.身份号"></el-option>
                    </el-select>
                  </div>
                  <div class="input-info-item" v-if="$route.params.typeId == 1">
                    <p>送交人：</p>
                    <el-select v-model="outlineSender" filterable allow-create>
                      <el-option v-for="item in sendlist" :key="item.身份号" :label="item.姓名" :value="item.身份号"></el-option>
                    </el-select>
                  </div>
                  <div class="input-info-item">
                    <p>材料数量：</p>
                    <el-input v-model="cailiaoNum" placeholder="请输入"></el-input>
                  </div>
                  <div class="input-info-item" v-if="$route.params.typeId == 1">
                      <p>接收人：</p>
                      <el-select v-model="outlineReceiver">
                        <el-option v-for="item in receiverlist" :key="item.身份号" :label="item.姓名" :value="item.身份号"></el-option>
                      </el-select>
                  </div>
                  <div class="input-info-item" v-if="$route.params.typeId == 2">
                      <p>送交人：</p>
                      <el-select v-model="onlineSender" filterable allow-create>
                        <el-option v-for="item in sendlist" :key="item.身份号" :label="item.姓名" :value="item.身份号"></el-option>
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
                <!-- <el-tree
                :data="data"
                :props="defaultProps"
                node-key="id"
                highlight-current
                :default-expanded-keys="[12,3]"
                current-node-key="13"
                @node-click="handleNodeClick"></el-tree> -->
<!--              <el-radio v-model="radio" label="1">显示包含下级单位</el-radio>-->
              <PositionHorn />
            </div>
            <div class="right_person">
              <div class="top_condition">
                <div class="top_btn">
                      <button class="custom point" @click="showConBox">条件查询</button>
                      <button class="custom point" @click="showSqlBox">查询sql语句</button>
                </div>
                <div class="search_btn"  v-if="isShowStuation">
                  <button class="search point" @click="conditionSearch" @keyup.enter.native="conditionSearch()">查询</button>
                  <button class="clear_all point" @click="clearAll">清空</button>
                </div>
                <div class="search_btn"  v-if="isShowsql">
                  <button class="search point" @click="conditionSearch1" @keyup.enter.native="conditionSearch1()">查询</button>
                  <button class="clear_all point" @click="clearAll">清空</button>
                </div>
                <div>
                  <div class="con con_flex" v-if="isShowStuation">
                    <div class="item">
                      <span>身份号:</span>
                      <input type="text" v-model="conditionList['sfh']">
                    </div>
                    <div class="item">
                        <span>姓名:</span>
                        <input type="text" value="李浩芮" v-model="conditionList['name']">
                    </div>
                    <div class="item">
                        <span>职务等级:</span>
                        <el-select v-model="conditionList['zwdj']">
                            <el-option v-for="(item, index) in condition['职务等级']" :key="index" :label="item.名称" :value="item.代码"></el-option>
                        </el-select>
                    </div>
                    <div class="item">
                        <span>部别:</span>
                        <input type="text" v-model="conditionList['bubie']">
                    </div>
                    <div class="item">
                      <span>职务名称:</span>
                      <input type="text" v-model="conditionList['zwmc']">
                    </div>
                    <div class="item">
                        <span>军衔文职:</span>
                        <el-select v-model="conditionList['jxwj']">
                            <el-option v-for="(item, index) in condition['军衔文级']" :key="index" :label="item.名称" :value="item.代码"></el-option>
                        </el-select>
                    </div>
                    <div class="item">
                        <span>干部性质:</span>
                        <el-select v-model="conditionList['gbxz']">
                            <el-option v-for="(item, index) in condition['干部性质']" :key="index" :label="item.名称" :value="item.代码"></el-option>
                        </el-select>
                    </div>
                    <div class="item">
                        <span>档案现状:</span>
                        <el-select v-model="conditionList['daxz']">
                            <el-option v-for="(item, index) in condition['档案现状']" :key="index" :label="item.名称" :value="item.代码"></el-option>
                        </el-select>
                    </div>
                    <div class="item">
                        <span>档案号:</span>
                        <el-select v-model="conditionList['glbs']">
                            <el-option v-for="(item, index) in condition['管理标识']" :key="index" :label="item.名称" :value="item.代码"></el-option>
                        </el-select>
                    </div>
                  </div>
                  <div class="con con_flex" v-if="isShowsql">
                    <div class="sqlBox">
                        <span>输入sql语句:</span>&nbsp;&nbsp;
                        <textarea cols="105" rows="6" v-model="sql" style="color:#FFFFFF;"></textarea>
                        <!-- <p>*提示：SELECT A.*,S.档案号,S.档案现状,S.管理标识,D.名称 as 技术,z.名称 as 职务,M.名称 as 政治,J.名称 as 军衔 FROM A_基本情况 A left join S_人员档案信息 S on A.身份号=S.身份号 left join D_职务等级 Z on A.职务等级=Z.代码 left join D_政治面貌 M on A.政治面貌=M.代码 left join D_军衔文级 J on A.军衔文级=J.代码 left join D_技术等级 D on A.技术等级=D.代码 where 1=1 and A.姓名 like '姓名' and z.名称 like '职务等级' and J.名称 like '军衔文级' and A.部别 like '部别' and A.身份号 like '身份号'</p> -->
                    </div>
                  </div>

                </div>
                <PositionHorn />
              </div>
              <div class="search_result common_style">
                <div class="title">
                    <span>查询结果</span>
                    <ul class="tab">
                        <li @click="changeType('card')" class="point"><img src="../../../../assets/images/kapian-1.png" alt=""><span>卡片</span></li>
                        <li @click="changeType('table')" class="point"><img src="../../../../assets/images/liebiao-1.png" alt=""><span>列表</span></li>
                    </ul>
                </div>
                <div class="con" v-if="type === 'card'">
                    <div class="list">
                        <div v-for="(item, index) in lists" :key="index" class="card">
                            <div class="dentity">
                                <span>{{item['姓名']}}</span>
                                <span>{{item['职务名称']}}</span>
                                <img src="../../../../assets/images/junzhang.png" alt="">
                            </div>
                            <div class="detail_info">
                                <img src="../../../../assets/images/tx.png" alt="">
                                <div class="person_info">
                                    <ul class="list_title">
                                        <li><span>籍&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;贯 :</span></li>
                                        <li><span>出生时间 :</span></li>
                                        <li><span>入伍时间 :</span></li>
                                        <li><span>职务等级 :</span></li>
                                        <li><span>技术等级 :</span></li>
                                        <li><span>军&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;衔 :</span></li>
                                        <li><span>身&nbsp;份&nbsp;号 :</span></li>
                                    </ul>
                                    <ul  class="list_info">
                                        <li><span>{{item['籍贯'] ? item['籍贯'] : '暂无'}}</span></li>
                                        <li><span>{{item['出生时间'].split('T')[0] ? item['出生时间'].split('T')[0] : '暂无'}}</span></li>
                                        <li><span>{{item['入伍时间'].split('T')[0] ? item['入伍时间'].split('T')[0] : '暂无'}}</span></li>
                                        <li style="width:120px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;"><span title="item['职务']">{{item['职务'] ? item['职务'] : '暂无'}}</span></li>
                                        <li><span>{{item['技术'] ? item['技术'] : '暂无'}}</span></li>
                                        <li><span>{{item['军衔'] ? item['军衔'] : '暂无'}}</span></li>
                                        <li><span>{{item['身份号'] ? item['身份号'] : '暂无'}}</span></li>
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
                    >
                    </el-pagination>
                </div>
                <div class="con_2" v-if="type === 'table'">
                    <el-table :data="list" stripe style="width: 100%">
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
                    <el-pagination
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    background
                    :page-size="pagesize"
                    :total="length"
                    prev-text="上一页"
                    next-text="下一页"
                    layout="prev, pager, next, jumper"
                    >
                    </el-pagination>
                </div>
                <PositionHorn />
              </div>
            </div>
          </div>
          <div class="materialperson_list common_style">
            <div class="title">
              <span>材料接收列表</span>
            </div>
            <div class="con_2">
                <el-table :data="checked" stripe style="width: 100%">
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="姓名" label="姓名" width="70"></el-table-column>
                    <el-table-column prop="部别" label="部别" width="200"></el-table-column>
                    <el-table-column prop="材料类别" label="材料类别">
                      <div slot-scope="scope">
                        <el-select v-model="scope.row.材料类别" @change="cailiaoTypeChange(scope.row)">
                          <el-option v-for="(item, index) in cailiaoTypeArr" :key="index" :label="item.材料名称" :value="item.材料代码"></el-option>
                        </el-select>
                      </div>
                    </el-table-column>
                    <el-table-column prop="材料名称" label="材料名称" width="200">>
                      <div slot-scope="scope">
                        <el-select v-model="scope.row.材料名称">
                          <el-option v-for="(item, index) in scope.row.cailiaoNameArr" :key="index" :label="item.材料名称" :value="item.材料名称"></el-option>
                        </el-select>
                      </div>
                    </el-table-column>
                    <!-- <el-table-column v-if="$route.params.typeId == 2" prop="材料数量" label="材料数量">
                      <div slot-scope="scope">
                        <el-input v-model="scope.row.材料数量" placeholder="请输入"></el-input>
                      </div>
                    </el-table-column> -->
                    <el-table-column prop="图片页数" label="图片页数" v-if="$route.params.typeId == 1" width="80"></el-table-column>
                    <el-table-column prop="option" label="操作">
                      <div>
                        <button class="scan point" @click="scan" v-if="$route.params.typeId == 1">扫描</button>
                        <button class="remove point">移除</button>
                      </div>
                    </el-table-column>
                </el-table>
              </div>
              <PositionHorn />
          </div>
        </div>
        <div class="right">
          <div class="transfer_application common_style" v-if="$route.params.typeId == 1">
             <div class="title">
                  <span>线上接收</span>
                  <span class="more point" @click="more('application')">更多</span>
              </div>
              <div class="cont">
                <div class="cont_item" v-for="(item, index) in onlineAcceptData" :key="index">
                  <div class="cont_title">{{item.转递单位 + '申请转入' + item.材料数量 + '份材料'}}</div>
                  <div class="bot">
                    <div v-if="item.名称 === '待转出纸质'" class="state1">待转出纸质</div>
                    <div v-if="item.名称 === '待接收纸质'" class="state1">待接收纸质</div>
                    <div v-if="item.名称 === '待同意'" class="state1">待同意</div>
                    <div v-if="item.名称 === '待转出'" class="state1">待转出</div>
                    <div v-if="item.名称 === '待接收'" class="state1">待接收</div>
                    <div v-if="item.名称 === '待归档'" class="state1">待归档</div>
                    <div v-if="item.名称 === '撤回'" class="state0">撤回</div>
                    <div v-if="item.名称 === '已完成'" class="state2">已完成</div>
                    <button @click="lookDetail(item.名称, '转档', item.材料转递单号)" class="point">查看</button>
                  </div>
                </div>
              </div>
              <PositionHorn/>
          </div>
          <div class="my_accept common_style" v-if="$route.params.typeId == 1">
            <div class="title">
              <span>线下接收</span>
              <span class="more" @click="more('appect')">更多</span>
            </div>
            <div class="cont">
                <div class="cont_item" v-for="(item, index) in outlineAcceptData" :key="index">
                  <div class="cont_title">{{item.送交单位 + '申请转入' + item.材料数量 + '份材料'}}</div>
                  <div class="bot">
                    <div v-if="item.名称 === '待审核'" class="state0">待审核</div>
                    <div v-if="item.名称 === '待归档'" class="state1">待归档</div>
                    <div v-if="item.名称 === '已完成'" class="state2">已完成</div>
                    <button @click="lookDetail(item.名称, '接收', item.材料接收单号)" class="point">查看</button>
                  </div>
                </div>
              </div>
            <PositionHorn/>
          </div>
          <div class="my_accept common_style" v-if="$route.params.typeId == 2">
            <div class="title">
              <span>线上转出</span>
              <span class="more" @click="more">更多</span>
            </div>
            <div class="cont">
                <div class="cont_item" v-for="(item, index) in onlinePushData" :key="index">
                  <div class="cont_title">{{'申请转出' + item.材料数量 + '份材料至' + item.接收单位}}</div>
                  <div class="bot">
                    <div v-if="item.名称 === '待同意'" class="state1">待同意</div>
                    <div v-if="item.名称 === '待转出'" class="state1">待转出</div>
                    <div v-if="item.名称 === '待接收'" class="state1">待接收</div>
                    <div v-if="item.名称 === '待归档'" class="state1">待归档</div>
                    <div v-if="item.名称 === '撤回'" class="state0">撤回</div>
                    <div v-if="item.名称 === '已完成'" class="state2">已完成</div>
                    <div v-if="item.名称 === '待转出纸质'" class="state1">待转出纸质</div>
                    <div v-if="item.名称 === '待接收纸质'" class="state1">待接收纸质</div>
                    <button @click="lookDetail(item.名称, '转出', item.材料转递单号)" class="point">查看</button>
                  </div>
                </div>
              </div>
            <PositionHorn/>
          </div>
        </div>
    </div>
    <div class="btn">
      <button class="reset" @click="reset">重置</button>
      <button class="submit" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import PositionHorn from '@/components/Postion_Horn'
export default {
  name: 'material_content',
  components: {
    PositionHorn
  },
  data () {
    return {
      // 材料数量
      cailiaoNum: '',
      // 单位列表
      receivedlist: [],
      // 人员列表
      receiverlist: [],
      pushlist: [],
      sendlist: [],
      // 送交单位：
      sendCompany: '',
      // 接收单位
      receiveCompany: '',
      // 接收人
      onlineReceiver: '',
      outlineReceiver: '',
      // 送交人
      onlineSender: '',
      outlineSender: '',
      // 审核人
      approver: '',
      // 更新人
      updater: '',
      // 材料类别下拉框
      cailiaoTypeArr: [],
      // 材料名称下拉框
      // cailiaoNameArr: [],
      data:[],
      reciveData: [],
      items: {},
      // 线上接收列表数据
      onlineAcceptData: [],
      // 线下接收列表数据
      outlineAcceptData: [],
      // 线上转出列表数据
      onlinePushData: [],
      renyuanlist: [],
      transferData: [],
      accept: [],
      length: 0,
      checked: [],
      defaultProps: {
       children: 'children',
        label: '单位名称',
        jgmcm: '机构名称码'
      },
      radio: true,
      conditionList: {
        name: '',
        bubie: '',
        zwmc: '',
        zwdj: '',
        jxwj: '',
        gbxz: '',
        daxz: '',
        glbs: '',
        sfh: ''
      },
      daima: {
        zwdj: '',
        jxwj: '',
        gbxz: '',
        daxz: '',
        glbs: ''
      },
      condition: [],
      pagesize: 4,
      currpage: 1,
      list: [],
      showCondition: false,
      type: 'card',
      lists: [],
      jgmcm: '',
      sql: '',
      isShowsql: false,
      isShowStuation: false
    }
  },
  created () {
    // 线下接收接收人默认为当前用户
    // this.outlineReceiver = JSON.parse(document.cookie.split("=")[1]).身份号;
    // 档案转出列表
    this.userInfo = JSON.parse(document.cookie.split('=')[1])
    this.forwarder = JSON.parse(document.cookie.split("=")[1]).身份号;
    this.jgmcm = JSON.parse(document.cookie.split("=")[1]).机构名称码;
    this.qxfw = JSON.parse(document.cookie.split("=")[1]).权限范围;
    this.getthee()
    // if (this.$route.params.typeId === '1') {
    //   document.title = "接收材料"
    // } else {
    //   document.title = "转出材料"
    // }
    this.userInfo = JSON.parse(document.cookie.split('=')[1])

    this.getResult()
    this.getData()
    this.queryCondition()
    this.get_xianshangjieshou()
    this.get_xianXiaJieShow()
    this.get_xianshangzhuanchu()
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
    // 选择送交单位
    sjdwSelect () {
      this.outlineSender = ''
      this.outlineReceiver = ''
      this.$api.application.get_yonghuxiala({
        jsjgmcm: this.jgmcm,
        zdjgmcm: this.sendCompany[this.sendCompany.length - 1]
      }).then( (data)=> {
        this.receiverlist = data.转递用户;
        this.sendlist = data.送交用户;
        this.outlineReceiver = JSON.parse(document.cookie.split("=")[1]).身份号;
      })
    },
    // 选择接收单位
    jsdwSelect () {
      this.onlineSender = ''
      this.onlineReceiver = ''
      this.$api.application.get_yonghuxiala({
        jsjgmcm: this.receiveCompany[this.receiveCompany.length - 1],
        zdjgmcm: this.jgmcm
      }).then( (data)=> {
        this.receiverlist = data.接收用户;
        this.pushlist = data.转递用户;
        this.sendlist = data.送交用户;
      })
    },
    cailiaoTypeChange(row) {
      this.$api.application.get_cailiaomingcheng({
        type: row.材料类别
      }).then((data)=> {
        row.材料名称 = ''
        row.cailiaoNameArr = data
      })
    },
    // 提交
    submit () {
      if (this.$route.params.typeId === '2') { // 线上转出
        if (this.receiveCompany === '' || this.onlineReceiver === '' || this.onlineSender === '' || this.cailiaoNum === '') {
          this.$message({
            showClose: true,
            message: '请完成基本信息录入',
            type: 'error'
          });
          return
        }
        this.checked.forEach((item, index) => {
          this.renyuanlist.push({"sfh": item.身份号, "cllb": item.材料类别, "clmc": item.材料名称})
        })
        this.$api.application.add_xianshangzhuandi({
          zhuandiren_sfh: JSON.parse(document.cookie.split("=")[1]).身份号,
          jieshouren_sfh: this.onlineReceiver,
          sjrsfh: this.onlineSender,
          cailiao_count: this.cailiaoNum,
          sqcl_name: '',
          renyuanlist: this.renyuanlist
        }).then( (data)=> {
          this.checked = []
          this.renyuanlist = []
          this.get_xianshangzhuanchu()
        })
      } else if (this.$route.params.typeId === '1') { // 线上接收
        if (this.sendCompany === '' || this.outlineReceiver === '' || this.outlineSender === '' || this.cailiaoNum === '') {
          this.$message({
            showClose: true,
            message: '请完成基本信息录入',
            type: 'error'
          });
          return
        }
        this.checked.forEach((item, index) => {
          this.renyuanlist.push({"sfh": item.身份号, "cllb": item.材料类别, "clmc": item.材料名称, "tpsl": item.图片页数})
        })
        this.$api.application.add_xianxiazhuandi({
          jieshouren_sfh: this.outlineReceiver,
          sjrsfh: this.outlineSender,
          cailiao_count: this.cailiaoNum,
          sqcl_name: '',
          renyuanlist: this.renyuanlist
        }).then( (data)=> {
          this.checked = []
          this.renyuanlist = []
          this.get_xianXiaJieShow()
        })
      }
    },
    // 重置
    reset () {},
    // 获取线上接收列表
    get_xianshangjieshou () {
      this.$api.application.get_xianshangjieshou({
        jgmcm: this.qxfw
      }).then( (data)=> {
        this.onlineAcceptData = data
      })
    },
    // 获取线下接收列表
    get_xianXiaJieShow () {
      this.$api.application.get_xianXiaJieShow({
        orgId: this.qxfw
      }).then( (data)=> {
        this.outlineAcceptData = data
      })
    },
    // 获取线上转出列表
    get_xianshangzhuanchu () {
      this.$api.application.get_xianshangzhuanchu({
        jgmcm: this.qxfw
      }).then( (data)=> {
        this.onlinePushData = data
      })
    },
    //获取接收单位
    getthee() {
      this.$api.application.pulldownmenu({}).then(data => {
        this.receivedlist = data.单位;
        // this.receiverlist = data.用户信息;
        this.dntype = data.档案类型;
        this.reasonlist = data.转出原因;
        this.cailiaoTypeArr = data.档案类别;
      });
    },
    //加入列表的方法
    addSearch(item) {
      this.checked = JSON.parse(JSON.stringify(this.checked))
      this.checked.push(item);
      this.checked = this.checked &&
      this.checked.map(item => {
        item["出生时间"] = item["出生时间"] && item["出生时间"].slice(0, 10);
        return item;
      })
    },
    showSqlBox () {
      if (this.isShowsql) {
        this.isShowsql = false
        this.isShowStuation = false
      } else {
        this.isShowsql = true
        this.isShowStuation = false
      }
    },
    showConBox () {
      if (this.isShowStuation) {
        this.isShowsql = false
        this.isShowStuation = false
      } else {
        this.isShowsql = false
        this.isShowStuation = true
      }
    },
    clearAll () {
      this.conditionList.sfh = ''
      this.conditionList.name = ''
      this.conditionList.zwdj = ''
      this.conditionList.bubie = ''
      this.conditionList.zwmc = ''
      this.conditionList.jxwj = ''
      this.conditionList.gbxz = ''
      this.conditionList.daxz = ''
      this.conditionList.glbs = ''
        this.sql='';
        this.getResult();
    },
    scan () {
      this.$router.push('/home/backstage/scan')
    },
    more (type) {
      if (type === "application") {
        this.$router.push('/home/backstage/transferList')
      } else if (type === 'appect') {
        this.$router.push('/home/backstage/acceptList')
      } else {
        this.$router.push('/home/backstage/rollList')
      }
    },
    conditionSearch1 () {
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
          console.log(data, this.sql, 'sql')
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
    getData () {
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
        let arr = []
        let reciveArr = []
        this.queryList(this.data, arr)
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
      // this.$api.application.unitsTree({
      //   parentCode: this.userInfo['权限范围']
      // }).then(data => {
      //   this.data = data['partUnitsList']
      //   this.reciveData = data['allUnitsList']
      //   let arr = []
      //   let reciveArr = []
      //   this.queryList(this.data, arr)
      //   this.queryList(this.reciveData, reciveArr)
      // })
    },
    lookDetail (state, type, clzddh) {
      if (type === '转档') {
        this.$router.push('/home/backstage/transfer_detail?state=' + state + '&clzddh=' + clzddh)
      } else if (type === '接收') {
        this.$router.push('/home/backstage/accept_detail?state=' + state + '&clzddh=' + clzddh)
      } else {
        this.$router.push('/home/backstage/roll_detail?state=' + state + '&clzddh=' + clzddh)
      }
    },
    changeType (type) {
      this.type = type
    },
    conditionSearch () {
      this.currpage = 1;
      this.getResult()
      // console.log(this.conditionList.zwdj, '条件查询')
      // this.condition['职务等级'].forEach(item => {
      //   if (item['名称'] === this.conditionList.zwdj) {
      //     this.daima.zwdj = item['代码']
      //   }
      // })
      // this.condition['军衔文级'].forEach(item => {
      //   if (item['名称'] === this.conditionList.jxwj) {
      //     this.daima.jxwj = item['代码']
      //   }
      // })
      // this.condition['干部性质'].forEach(item => {
      //   if (item['名称'] === this.conditionList.gbxz) {
      //     this.daima.gbxz = item['代码']
      //   }
      // })
      // this.condition['档案现状'].forEach(item => {
      //   if (item['名称'] === this.conditionList.daxz) {
      //     this.daima.daxz = item['代码']
      //   }
      // })
      // this.condition['管理标识'].forEach(item => {
      //   if (item['名称'] === this.conditionList.glbs) {
      //     this.daima.glbs = item['代码']
      //   }
      // })
      // this.$api.application.selectCondition({
      //   name: this.conditionList.name,
      //   bubie: this.conditionList.bubie,
      //   zwdj: this.daima.zwdj, // 职务等级
      //   jxwj: this.daima.jxwj, // 军衔文集
      //   sfh: this.conditionList.sfh
      // }).then(data => {
      //   // this.list = data
      //   this.length = data.total
      //   this.list = data['rows'] && data['rows'].map((item, index) => {
      //     item['ids'] = index + 1
      //     item['入伍时间'] = item['入伍时间'] && item['入伍时间'].slice(0, 10)
      //     item['技术'] = item['技术'] ? item['技术'] : '暂无'
      //     return item
      //   })
      // })
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
      this.getResult();
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
      this.getResult();
    },
    getResult () {
      this.$api.application.peopleInformation({
        name: this.conditionList.name,
        bubie: this.conditionList.bubie,
        zwdj: this.conditionList.zwdj, // 职务等级
        jxwj: this.conditionList.jxwj, // 军衔文集
        sfh: this.conditionList.sfh,
        zwmc: this.conditionList.zwmc,
        gbxz: this.conditionList.gbxz, // 干部性质
        daxz: this.conditionList.daxz, // 档案现状
        glbs: this.conditionList.glbs, // 管理标识
        jgmcm: this.jgmcm,
        pageIndex: this.currpage,
        pageSize: this.pagesize
      })
      .then(data => {
        this.length = data.total;
        this.lists =
          data["rows"] &&
          data["rows"].map((item, index) => {
            item["材料数量"] = '';
            item["处理意见"] = '';
            item["材料类别"] = '';
            item["材料名称"] = '';
            item["档案类型"] = '';
            item["转出原因"] = '';
            item["cailiaoNameArr"] = []
            item["图片页数"] = 0
            item['ids'] = index + 1
            item["入伍时间"] =
              item["入伍时间"] && item["入伍时间"].slice(0, 10);
            item["技术"] = item["技术"] ? item["技术"] : "暂无";
            return item;
          });
      });
    },
    queryCondition () {
      this.$api.application.queryCondition({
        daima: ''
      }).then((data) => {
        this.condition = data
      })
    },
    showSearch () {
      if (this.showCondition) {
        this.showCondition = false
      } else {
        this.showCondition = true
      }
    },
    handleNodeClick (data) {
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
      // this.currpage = 1;
      // this.jgmcm = data.id;
      // this.getResult()
      // this.jgmcm = data.id
      // this.$api.application.peopleInformation({
      //   jgmcm: this.jgmcm,
      //   pageIndex: this.currpage,
      //   pageSize: this.pagesize
      // }).then(data => {
      //   this.length = data.total
      //   this.lists = data['rows'] && data['rows'].map((item, index) => {
      //     item['ids'] = index + 1
      //     item['入伍时间'] = item['入伍时间'] && item['入伍时间'].slice(0, 10)
      //     item['技术'] = item['技术'] ? item['技术'] : '暂无'
      //     return item
      //   })
      // })
    }
  }
}
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
.content {
    @include box_flex;
    h3 {
        font-size: 16px;
        margin: 16px 8px;
        position: relative;
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
    .left {
        width: 980px;
        .top {
            width: 100%;
            position: relative;
            z-index:0;
            height: auto;
            background:rgba(5,27,74,0.15);
            box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2) inset;
            border:1px solid rgba(10,67,188,0.32);
            .input-info {
                @include box_flex;
                // @include justify(space-around);
                @include flexWrap(wrap);
                position: relative;
                z-index: 999;
                margin: 0 8px;
                padding-bottom: 20px;
                .input-info-item {
                  padding: 0 15px;
                }
                p {
                    line-height: 30px;
                    margin-right:16px;
                }
                input {
                    width:220px;
                    height:28px;
                    background:rgba(3,94,255,0.15);
                    border-radius:2px;
                    border:1px solid rgba(10,67,188,0.94);
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
                z-index:0;
                background:rgba(5,27,74,0.22);
                border:1px solid rgba(10,67,188,1);
                box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
                .top_btn {
                    margin: 0px 16px 16px 16px;
                    height: 40px;
                    // @include box_flex;
                    // @include justify(space-between);
                    @include align(center);
                    button {
                      width:80px;
                      border-radius:2px;
                      height:30px;
                      border: none;
                      background: none;
                      margin-left:16px;
                    }
                    .custom {
                      font-size:12px;
                      font-family:MicrosoftYaHei;
                      font-weight:400;
                      color:rgba(0,255,255,1);
                      width:72px;
                      height:28px;
                      border:1px solid rgba(0,255,255,1);
                      border-radius:2px;
                      background: none;
                      margin-top:16px;
                      margin-left:8px;
                      position: relative;
                      z-index:999;
                    }
                    button {
                        width:72px;
                        border-radius:2px;
                        height:28px;
                        border: none;
                        background: none;
                        position: relative;
                        z-index: 999;
                    }
                    .search {
                        border:1px solid rgba(0,255,255,1);
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
                background:rgba(5,27,74,0.22);
                border:1px solid rgba(10,67,188,1);
                box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
                opacity:0.8;
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
            width:160px;
            height:639px;
            background:rgba(5,27,74,0.22);
            border:1px solid rgba(10,67,188,1);
            box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
            opacity:0.8;
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
              background:rgba(2,154,254,0.15);
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
        margin-top: -38px;
        float: right;
        right: 18px;
        button {
            width:60px;
            height:28px;
            border:none;
            color: #fff;
            margin-left: 8px;
            font-size:12px;
            &.search {
                background:linear-gradient(0deg,rgba(12,96,200,1),rgba(5,141,252,1));
                box-shadow:0px 4px 31px 0px rgba(0, 0, 0, 0.41);
                border-radius:2px;
            }
            &.clear_all {
                background:linear-gradient(0deg,rgba(166,242,189,1),rgba(34,162,72,1));
                box-shadow:0px 4px 31px 0px rgba(0, 0, 0, 0.41);
                border-radius:2px;
            }
            &.custom {
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(0,255,255,1);
                width:80px;
                border:1px solid rgba(0,255,255,1);
                border-radius:2px;
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
            content: '';
            display: inline-block;
            width: 86px;
            height: 20px;
            position: relative;
            top: 8px;
            left: 10px;
            background: url('../../../../assets/images/tit-right.png') no-repeat;
        }
    }
    .materialperson_list {
      position: relative;
      z-index:0;
      background:rgba(5,27,74,0.22);
      border:1px solid rgba(10,67,188,1);
      padding-bottom: 28px;
      box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
      margin-top: 16px;
      & > .con_2 {
        margin: 16px;
        box-sizing: border-box;
      }
    }
    .con {
        @include sizing;
        position: relative;
        z-index:99;
        padding:0 16px;
        &.con_flex {
            @include box_flex;
            @include flexWrap(wrap);
            @include justify(space-between);
            margin:0 8px;
            .item {
                @include box_flex;
                text-align: right;
                width: 240px;
                margin-bottom: 8px;
                font-size: 12px;
                span {
                    width: 60px;
                    line-height: 30px;
                }
                input, select{
                    width:180px;
                    height:30px;
                    background:rgba(3,94,255,0.15);
                    border:1px solid rgba(10,67,188,1);
                    border-radius:2px;
                    color: #fff;
                    margin-left: 8px;
                    padding: 0 8px;
                    outline: none;
                    box-sizing: border-box;
                }
                option {
                    background:rgba(3,94,255,0.15);
                }
                input {
                    width:180px;
                    height:28px;
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
                background:rgba(3,94,255,0.15);
                border:1px solid rgba(10,67,188,1);
                .dentity {
                    height: 40px;
                    border-bottom: 1px solid rgba(10,67,188,1);
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
                            font-size:13px;
                            font-family:MicrosoftYaHei;
                            line-height:18px;
                            width: 64px;
                            li {
                                font-weight:400;
                                color:rgba(2,154,255,1);
                                // margin-right: 8px;
                            }
                        }
                        .list_info {
                            margin-left: 4px;
                            font-size:13px;
                            font-family:MicrosoftYaHei;
                            line-height:18px;
                            width: 92px;
                            li {
                                font-weight:400;
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
                    font-size:14px;
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
        span:first-child{
          position: relative;
          top: 8px;
          left: 16px;
          &::after {
            content: '';
            @include wh(87px, 12px);
            display: inline-block;
            margin-left:8px;
            background: url('../../../../assets/images/tit-right.png');
          }
        }
      }
    }
    &> .right {
      margin-left: 16px;
      @include flex;
      &>div {
        height: 500px;
        position: relative;
        z-index: 0;
        margin-bottom: 16px;
        background:rgba(5,27,74,0.15);
        box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2) inset;
        border:1px solid rgba(10,67,188,0.32);
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
        span:first-child{
          position: relative;
          top: 8px;
          left: 16px;
          &::after {
            content: '';
            @include wh(50px, 12px);
            display: inline-block;
            margin-left:8px;
            background: url('../../../../assets/images/tit-right.png');
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
        border-bottom: 1px dashed rgba(3,94,255,0.4);
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
          width:44px;
          height:20px;
          background:rgba(3,129,255,0.26);
          border-radius:2px;
          border:1px solid rgba(10,67,188,1);
          color: #0381ff;
          right: 10px;
        }
      }
    }
}
.btn {
  margin-bottom: 16px;
  // margin-top: 0px;
  text-align: center;
  .reset {
        width:80px;
        height:28px;
        background: none;
        border:1px solid rgba(0,255,255,1);
        border-radius:2px;
        font-size:14px;
        font-weight:400;
        color:rgba(0,255,255,1);
    }
    .submit {
        width:80px;
        height:30px;
        border: none;
        background:linear-gradient(0deg,rgba(12,96,200,1),rgba(5,141,252,1));
        box-shadow:0px 4px 31px 0px rgba(0, 0, 0, 0.41);
        border-radius:2px;
        color: #fff;
        margin-left: 8px;
    }
}
.con_2 {
  select {
      width:60px;
      height:24px;
      background:rgba(3,129,255,0.26);
      border-radius:2px;
      border:1px solid rgba(10,67,188,1);
      color: #fff;
      option {
        background:#00f;
      }
    }
}
.remove,.scan {
    width: 44px;
    height: 20px;
    background: rgba(3, 129, 255, 0.26);
    border-radius: 2px;
    border: 1px solid #0a43bc;
    color: #0381ff;
    text-align: center;
}
.sqlBox {
    display: flex;
    margin-bottom:8px;
     textarea {
          background: rgba(3, 94, 255, 0.15);
          border: 1px solid #0a43bc;
          margin-left: 8px;
          padding: 8px;
        }
  }
</style>
