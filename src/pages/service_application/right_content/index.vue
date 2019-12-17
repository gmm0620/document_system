<template>
     <div class="right_2">
<!--      <button class="back1 point" @click="">操作提示</button>-->
       <button class="back point" @click="back">返回</button>
        <div class="my_project common_style">
            <!-- <div class="title">
                <span>查询条件</span>
            </div> -->
            <div>
              <button class="custom point" @click="showConBox">条件查询</button>
              <button class="custom point" @click="showSqlBox">查询sql语句</button>
            </div>
             <div class="search_btn"  v-if="isShowsql">
                <button class="search point" @click="conditionSearch" @keyup.enter.native="conditionSearch()">查询</button>
                <button class="clear_all point" @click="clearAll">清空</button>
            </div>
            <div class="search_btn"  v-else>
                <button class="search point" @click="conditionSearch1" @keyup.enter.native="conditionSearch1()">查询</button>
                <button class="clear_all point" @click="clearAll">清空</button>
            </div>
            <div class="con con_flex" v-if="isShowsql" style="padding:0 16px 16px 16px;">
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
                  <select v-model="conditionList['zwdj']">
                      <option v-for="(item, index) in condition['职务等级']" :key="index">{{item['名称']}}</option>
                  </select>
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
                  <select  v-model="conditionList['jxwj']">
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
            <div class="con con_flex" v-else style="padding:0 16px 16px 16px;">
              <div class="sqlBox">
                  <span>输入sql语句:</span>&nbsp;&nbsp;
                  <textarea cols="130" rows="6" v-model="sql"></textarea>
                  <!-- <p>*提示：SELECT A.*,S.档案号,S.档案现状,S.管理标识,D.名称 as 技术,z.名称 as 职务,M.名称 as 政治,J.名称 as 军衔 FROM A_基本情况 A left join S_人员档案信息 S on A.身份号=S.身份号 left join D_职务等级 Z on A.职务等级=Z.代码 left join D_政治面貌 M on A.政治面貌=M.代码 left join D_军衔文级 J on A.军衔文级=J.代码 left join D_技术等级 D on A.技术等级=D.代码 where 1=1 and A.姓名 like '姓名' and z.名称 like '职务等级' and J.名称 like '军衔文级' and A.部别 like '部别' and A.身份号 like '身份号'</p> -->
              </div>
            </div>
            <PositionHorn />
        </div>
        <div class="search_result common_style">
            <div class="title">
                <span>查询结果</span>
                <ul class="tab">
                    <li @click="changeType('card')"><img src="../../../assets/images/kapian-1.png" alt="" class="point"><span>卡片</span></li>
                    <li @click="changeType('table')"><img src="../../../assets/images/liebiao-1.png" alt="" class="point"><span>列表</span></li>
                </ul>
            </div>
            <div class="con" v-if="type === 'card'">
                <div class="list">
                    <div v-for="(item, index) in lists" :key="index" class="card">
                        <div class="dentity">
                            <span>{{item['姓名']}}</span>
                            <span>{{item['职务名称']}}</span>
                            <img src="../../../assets/images/junzhang.png" alt="" v-watermark="{text:'水印名称',textColor:'rgba(180, 180, 180, 0.3)'}">
                        </div>
                        <div class="detail_info">
                            <img src="../../../assets/images/tx.png" alt="">
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
                                    <li><span>{{item['出生时间'] && item['出生时间'].split('T')[0] ? item['出生时间'] && item['出生时间'].split('T')[0] : '暂无'}}</span></li>
                                    <li><span>{{item['入伍时间'] && item['入伍时间'].split('T')[0] ? item['入伍时间'] && item['入伍时间'].split('T')[0] : '暂无'}}</span></li>
<!--                                    <li style="width:120px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;"><span title="的的订单的的东城大道的的的的的">{{'的的订单的的东城大道的的的的的'}}</span></li>-->
                                    <li style="width:120px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;"><span title="item['职务']">{{item['职务'] ? item['职务'] : '暂无'}}</span></li>
                                    <li><span>{{item['技术'] ? item['技术'] : '暂无'}}</span></li>
                                    <li><span>{{item['军衔'] ? item['军衔'] : '暂无'}}</span></li>
                                    <li><span>{{item['身份号'] ? item['身份号'] : '暂无'}}</span></li>
                                </ul>
                            </div>
                        </div>
                        <div class="add_info">
                            <span class="add_search point"  v-if="types !== '04'" @click="addSearch(item)">加入查档人</span>
                            <span class="add_check point"  @click="addCheck(item)">加入待查表</span>
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
                >
                </el-pagination>
            </div>
            <div class="con_2" v-if="type === 'table'">
                <el-table
                :data="lists"
                stripe
                style="width: 100%">
                    <el-table-column
                    prop="ids"
                    label="序号"
                    width="70"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="姓名"
                    label="姓名"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="职务"
                    label="职务名称">
                    </el-table-column>
                    <el-table-column
                    prop="入伍时间"
                    label="入伍时间"
                    width="120"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="职务等级"
                    label="职务等级"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="技术"
                    label="技术等级"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="军衔"
                    label="军衔">
                    </el-table-column>
                    <el-table-column
                    prop="技术职务"
                    label="技术职务">
                    </el-table-column>
                    <el-table-column
                    prop="option"
                    label="操作"
                    width="210">
                        <div slot-scope="scope">
                            <span class="add_search point" v-if="types !== '04'" @click="addSearch(scope.row)">加入查档人</span>
                            <span class="add_check point" @click="addCheck(scope.row)">加入待查表</span>
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
        <div class="select_file common_style">
            <div class="title">
                <span>待查档案</span>
            </div>
            <div class="con">
                <el-table
                    :data="checked"
                    style="width: 100%">
                    <el-table-column
                        prop="姓名"
                        label="姓名"
                    >
                    </el-table-column>
                     <el-table-column
                        :prop="'部别'"
                        label="单位"
                      >
                    </el-table-column>
                    <el-table-column
                        prop="身份号"
                        label="身份号">
                    </el-table-column>
                    <el-table-column
                        :prop="'政治'"
                        label="政治面貌">
                    </el-table-column>
                    <el-table-column
                        prop="现管单位名称"
                        label="现管部门"
                    >
                    </el-table-column>
                    <!-- <el-table-column
                        prop="职务名称"
                        label="职务"
                        width="80"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="籍贯"
                        label="籍贯"
                        width="80"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="出生时间"
                        label="出生日期"
                        width="100"
                    >
                    </el-table-column> -->
                    <el-table-column
                        prop="option"
                        width="180"
                        label="操作">
                        <div slot-scope="scope">
                            <span class="add_search point" @click="removeCheck(scope.row)">移除</span>
                            <span v-if="types === '04'" @click="select_range(scope)" class="point">选择查询范围</span>
                        </div>
                    </el-table-column>
                </el-table>
                <div class="leftBtn">
                  <button class="selfAdd point" @click="selfAdd">手动添加</button>
                </div>
                <div class="rightBtn">
                    <button class="clear point">清空</button>
                    <button class="save point" @click="saveProject">保存方案</button>
                    <button class="import point" @click="importProject">导入方案</button>
                </div>
            </div>
            <PositionHorn />
        </div>
        <div class="consult_person common_style" v-if="$route.name !== 'FileLog'">
            <div class="title">
                <span>查档人员</span>
            </div>
            <div class="con">
                <el-table
                    :data="cdr"
                    style="width: 100%;"
                    :header-cell-style="{background: 'rgba(3,94,255,0.25)'}">
                    <el-table-column
                        prop="姓名"
                        label="姓名"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="部别"
                        label="单位">
                    </el-table-column>
                    <el-table-column
                        prop="身份号"
                        label="身份号">
                    </el-table-column>
                    <el-table-column
                        prop="政治"
                        label="政治面貌">
                    </el-table-column>
                    <el-table-column
                        prop="option"
                        label="操作">
                         <div slot-scope="scope">
                            <span class="add_search point" @click="removeSearch(scope.row)">移除</span>
                        </div>
                    </el-table-column>
                </el-table>
            </div>
            <PositionHorn />
        </div>
        <div class="options common_style">
            <div class="title">
                <span>查档事由</span>
            </div>
            <div class="con">
                <div class="whthin_reason">
                  <el-checkbox-group v-model="reason" @change="handleCheckedReasonChange">
                    <el-checkbox v-for="(item, index) in condition['查档事由']" :label="item['名称']" name="type" :key="index"></el-checkbox>
                  </el-checkbox-group>
                  <input type="text" class="else">
                </div>
                <div class="whthin_form">
                    <h5>查档形式</h5>
                    <div>
                        <el-checkbox checked disabled :label="typeContent" ></el-checkbox>
                        <el-checkbox-group  v-model="form" @change="handleCheckedFormChange">
                          <el-checkbox v-for="(item, index) in condition['申请服务类型']" :label="item['名称']" name="type" :key="index"></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="whthin_content" v-if="types !== '04'">
                    <h5>查档内容</h5>
                    <div>
                      <el-checkbox-group v-model="con" @change="handleCheckedConChange">
                        <el-checkbox v-for="(item, index) in condition['查档内容']" :label="item['名称']" name="type" :key="index"></el-checkbox>
                      </el-checkbox-group>
                      <!-- <input type="text" class="else"> -->
                    </div>
                </div>
            </div>
            <PositionHorn />
        </div>
        <div class="submit_btn_2">
            <button class="reset point" @click="resetAll">重置</button>
            <button class="submit point" @click="submit">提交申请</button>
            <button class="download point" @click="downloadfrom">下载申请单</button>
            <button class="back point" @click="back">返回</button>
        </div>
        <div v-if="saveModel" class="save_model">
            <div class="con con_3">
                <h3><span>方案信息</span><span class="close" @click="close">×</span></h3>
                <div class="project_name">
                    <h5><span class="must">*</span>方案名称</h5>
                    <input type="text" placeholder="请输入方案名称" v-model="project_name">
                </div>
                <div class="project_desc">
                    <h5><span class="must">*</span>方案描述</h5>
                    <textarea name="" id="" cols="30" rows="10" placeholder="请输入方案描述" v-model="project_desc"></textarea>
                </div>
                <div class="project_btn">
                    <button class="cancel point" @click="cancel">取消</button>
                    <button class="submit point" @click="submit_project_save">提交</button>
                </div>
                <PositionHorn />
            </div>
        </div>
        <div v-if="sub_successModel" class="save_model">
            <div class="con con_4">
                <span class="close_info" @click="closeInfo">×</span>
                <div class="success_hint">
                    <i class="el-icon-circle-check"></i>
                </div>
                <div class="hint">
                    <h3>申请提交成功</h3>
                    <p>您可以在我的申请中查看跟踪办理进度</p>
                </div>
                <div class="application_info">
                    <h4>申请信息</h4>
                    <p>查档人: <span v-if="cdr.length" v-for="(item, index) in cdr" :key="index">{{item['姓名'] + " "}}</span><span v-else>{{userInfo['姓名']}}</span></p>
                    <p>查档对象: <span v-for="(item, index) in bcdrxm" :key="index">{{item+ " "}}</span></p>
                    <p>申请编号: {{sqbh}}</p>
                    <p>提交时间: {{appdata}}</p>
                </div>
                <div class="project_btn">
                    <button class="goback point" @click="goIndex">返回首页</button>
                    <button class="my_application point" @click="myApplication">我的申请</button>
                </div>
                <PositionHorn />
            </div>
        </div>
        <div v-if="importModel" class="save_model import">
            <div class="con con_3">
                <h3><span>请选择您要导入的方案</span><span class="close" @click="close">×</span></h3>
                <div class="project_name">
                    <span class="must">方案名称:</span>
                    <el-select @change='changeProject' v-model="fanganmc" style="margin-left:8px;width:300px;height:30px">
                        <el-option v-for="(item, key) in fangan" :key="key" :value="item['方案名称']"></el-option>
                    </el-select>
                </div>
                <div class="project_desc">
                    <div class="application_info">
                        <p>方案名称: <span>{{currentProject['方案名称']}}</span></p>
                        <p>查档对象: <span v-for="(i, key) in currentProject['方案查档对象']" :key="key">{{i+' '}}</span></p>
                        <!-- <p>查询条件: {{currentProject['查询条件']}}</p> -->
                    </div>
                </div>
                <div class="project_btn">
                    <button class="cancel point" @click="cancel">取消</button>
                    <button class="submit point" @click="submit_project_import">提交</button>
                </div>
                <PositionHorn />
            </div>
        </div>
        <div v-if="selectModel" class="save_model select">
            <div class="con con_3">
                <h3><span>请选择查询范围</span><span class="close" @click="close">×</span></h3>
                <div class="select_1">
                    <div class="project_name">
                        <span class="demonstration">时间范围：</span>
                        <el-date-picker
                        v-model="value1"
                        @change="changeRange(checkedIndex)"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <!--<div class="project_desc">
                        <span class="demonstration">操作人</span>
                        <el-select name="" id="" v-model="checked[checkedIndex].czlx">
                            <el-option v-for="(item, index) in czType" :value="item['名称']" :label="item['名称']"></el-option>
                        </el-select>
                    </div>-->
                    <div class="project_desc">
                        <span class="demonstration">操作类型</span>
                        <el-select v-model="checked[checkedIndex].czlx" placeholder="请选择" multiple @change="changecztype(checkedIndex)">
                          <el-option
                            v-for="item in czType"
                            :key="item['名称']"
                            :value="item['名称']">
                          </el-option>
                        </el-select>
                       <!-- <el-select multiple  name="" id="" v-model="czlx">
                          <option v-for="(item, index) in czType" :value="item['名称']">{{item['名称']}}</option>
                          <el-option
                            v-for="(item, index) in czType"
                            :key="item['名称']" :label="item['名称']" :value="item['名称']">
                          </el-option>
                        </el-select>-->
                    </div>
                </div>
                <div class="project_btn">
                    <button class="cancel point" @click="cancel">清空</button>
                    <button class="submit point" @click="rangeTrue">确认</button>
                </div>
                <PositionHorn />
            </div>
        </div>
        <div v-if="selfAddModel" class="save_model add">
          <div class="con con_3">
             <h3><span>人员信息</span><span class="close" @click="close">×</span></h3>
             <div>
               <p><span>*</span>姓名</p>
               <p><input type="text" v-model="addInfo.name"></p>
             </div>
              <div>
               <p><span>*</span>身份号</p>
               <p><input type="text" v-model="addInfo.sfh"></p>
             </div>
             <div>
               <p><span>*</span>单位</p>
               <p><input type="text" v-model="addInfo.danwei"></p>
             </div>
             <div>
               <p><span>*</span>档案现管单位</p>
               <p><input type="text" v-model="addInfo.xgdanwei"></p>
             </div>
             <div>
               <p><span>*</span>政治面貌</p>
               <p><input type="text" v-model="addInfo.zm"></p>
             </div>
             <div class="addbtn">
               <button class="cancel point" @click="cancel">取消</button>
               <button class="submit point" @click="addCheck1">确定</button>
             </div>
          </div>
        </div>
<!--       title="查（借）阅干部档案审批表" style="font-size: 25px"-->
       <el-dialog
         :visible.sync="dialogVisible"
         width="50%"
         center  :modal-append-to-body='false'>
         <div id='iframe'>
         <h1 style="text-align: center;font-size: 24px;margin-bottom: 20px;margin-top: 30px">查（借）阅干部档案审批表</h1>
         <table style="margin: 0 auto;width: 80%;"  border="1">

           <tr class="trcaption" style="width: 100%;height: 50px" >
             <td class="linetd" style="width: 20%;text-align: center">
               项 目
             </td>
             <td class="linetd" style="width: 20%;text-align: center">
               姓 名
             </td>
             <td style="width: 30%;text-align: center;">
               部  职  别
             </td>
             <td style="width: 200px;text-align: center;">
               政治面貌
             </td>
           </tr>
           <tr class="trcaption" v-for="(item, index) in tableMsg">
             <td class="linetd" v-if="index === 0" :rowspan="tableMsg.length" style="text-align: center">
               查 借 阅<br/>
               人    员
             </td>
             <td class="linetd" style="text-align: center;height: 60px;">{{item.姓名}}
<!--               <ul>-->
<!--                 <li v-if="cdr.length" v-for="(item, index) in fileval" :key="index">{{item['姓名'] + " "}}</li>-->
<!--               </ul>-->
<!--               <span v-if="cdr.length" v-for="(item, index) in cdr" :key="index">{{item['姓名'] + " "}}</span>-->
             </td>
             <td style="width: 40%;text-align: center;height: 60px;">{{item.部别}}{{item.职务名称}}

             </td>
             <td style="width: 40%;text-align: center;height: 60px;">{{item.政治}}

             </td>
           </tr>
           <tr class="trcaption" v-for="(item, index) in checked1">
             <td class="linetd" style="text-align: center" v-if="index === 0" :rowspan="checked1.length">
               被 查 借 阅<br/>
               人       员
             </td>
             <td class="linetd" style="text-align: center;height: 60px;">{{item.姓名}}

             </td>
             <td style="width: 40%;text-align: center;height: 60px;" colspan="2" >{{item.部别}}{{item.职务名称}}

             </td>
           </tr>

           <tr class="trcaption"  style="height: 150px">
             <td class="linetd" style="text-align: center">
               查 借 阅<br/>
               理   由
             </td>
             <td class="linetd" colspan="3" >
               <ul style="text-align: center">

                 <li v-for="(item, index) in fileval" style="display: inline-block;width: 60px;text-align: center">{{item}},</li>
               </ul>
             </td>
           </tr>
           <tr class="trcaption"  style="height: 230px">
             <td class="linetd" style="text-align: center">
               查 借 阅<br/>
               单位意见
             </td>
             <td class="linetd" colspan="3">
               <div style="margin-top: 80px;margin-left: 42px;float: left;"><span>负责人签字</span></div>
               <div style="float: right;margin-right: 113px;margin-top: 20px;"><span style="">（公 章）</span></div>
               <div style="float: right;margin-right: -98px;margin-top: 70px;"><span style="width: 100px">年</span><span style="margin-left: 40px">月</span><span style="margin-left: 40px">日</span></div>
             </td>
           </tr>

           <tr class="trcaption" style="height: 150px">
             <td class="linetd" style="text-align: center">
               档 案 管 理<br/>
               部 门 意 见
             </td>
             <td class="linetd" colspan="3">

             </td>
           </tr>

         </table>
         </div>
         <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="print">下 载</el-button>
         </span>
       </el-dialog>
    </div>
</template>

<script>
import PositionHorn from '@/components/Postion_Horn'
// import fileLog from "../fileLog.vue";
export default {
  name: 'Right_content',
  props: {
    types: {
      type: String,
      require: () => {
        return true
      }
    },
    list: {
      type: Array
    },
    lengths: {
      type: Number
    },
    jgmcms: {
      type: String
    }
  },
  data () {
    return {
      input: '',
      options: [],
      lists: [],
      addInfo: {
        name: '',
        sfh: '',
        zm: '',
        xgdanwei: '',
        danwei: ''
      },
      sql: '',
      value1: [],
      value: '',
      prevText: '上一页',
      nextText: '下一页',
      type: 'card',
      saveModel: false,
      sub_successModel: false,
      importModel: false,
      project_name: '',
      project_desc: '',
      pagesize: 6,
      currpage: 1,
      condition: [],
      cdr: [],
      tableMsg: [],
      checked: [],
      reason: [],
      form: [],
      con: [],
      selectModel: false,
      sqbh: '',
      typeContent: '',
      yewutype: '',
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
      bcdrxm: [],
      daima: {
        zwdj: '',
        jxwj: '',
        gbxz: '',
        daxz: '',
        glbs: ''
      },
      userInfo: {},
      fangan: [],
      checked1:[],
      fileval:[],
      fanganmc: '',
      currentProject: {},
      appdata: '',
      birthDate: '',
      showCon: false,
      moreBtn: true,
      isShowsql: true,
      selfAddModel: false,
      xgbm: '',
      start: [],
      end: [],
      czr: [],
      czlx:[],
      czrArr: [],
      czType: [],
      checkedIndex: 0,
      rangeArr: [],
      jgmcm: '',
      length: 0,
      xzjgmcm: '',
      rangePerson: {},
      czlx1:[],
      dialogVisible:false
    }
  },
  components: {
    PositionHorn
  },
  created () {

    if (this.$route.query['方案查询条件']) {
      this.checked = JSON.parse(this.$route.query['方案查询条件'])
    }
    this.userInfo = JSON.parse(document.cookie && document.cookie.split('=')[1])
    this.cdr[0] = {
      '姓名': this.userInfo.姓名,
      '部别': this.userInfo.部别,
      '身份号': this.userInfo.身份号,
      '政治': this.userInfo.政治
    }
    this.getResult()
    this.queryCondition()
    this.typeCon()
    this.getProject()
      //查询
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
  watch: {
    'list':function (n, o) {
      this.lists = this.list
      this.length = this.lengths
      this.jgmcm = this.jgmcms
    }
  },
  methods: {
    consoleData () {

      console.log(this.start, this.end, this.czlx,'查询范围')
      this.start = []
      this.end = []
    },
    print(){
        if(this.tableMsg==''){
            this.$message({
                message: '警告哦，查借阅人员不能为空',
                type: 'warning'
            });
            return
        }
        if(this.checked1==''){
            this.$message({
                message: '警告哦，被查借阅人员不能为空',
                type: 'warning'
            });
            return
        }
        if(this.fileval==''){
            this.$message({
                message: '警告哦，查借阅理由不能为空',
                type: 'warning'
            });
            return
        }
        console.log('tableMsg',this.tableMsg=='')
        //根据div标签ID拿到div中的局部内容
        this.bdhtml=document.body.innerHTML;
        var jubuData = document.getElementById("iframe").innerHTML;
        //把获取的 局部div内容赋给body标签, 相当于重置了 body里的内容
        document.body.innerHTML= jubuData;
        //调用打印功能
        window.print();
        window.location.reload();

        document.body.innerHTML=this.bdhtml;//重新给页面内容赋值；
        // jubuData.contentDocument.close();
        // window.location.reload() close
        // return 0;
        // this.dialogVisible=false;
    },
    //打印弹框打开
    downloadfrom(){
        this.dialogVisible=true;
    },
    changecztype (i) {
      // this.checked[i].czlx = this.checked[i].czlx.join(',')
    },
    changeRange (i) {
      // console.log(this.value1)
      this.checked[i].startTime =this.value1[0].getFullYear() + '-' + (this.value1[0].getMonth() + 1) + '-' +this.value1[0].getDate()
      this.checked[i].endTime =this.value1[1].getFullYear() + '-' + (this.value1[1].getMonth() + 1) + '-' +this.value1[1].getDate()
    },
    changeType (type) {
      this.type = type
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
        }
      })
    },
    changeName () {

    },
    // 手动添加待查档案人员
    addCheck1 () {
      if(this.addInfo.name==''){
          this.$message({
              message: '警告哦，请您输入姓名！',
              type: 'warning'
          });
          return;
      }else if(this.addInfo.sfh==''){
          this.$message({
              message: '警告哦，请您输入身份号！',
              type: 'warning'
          });
          return;
      }
      this.$api.application.addCheck({
        name: this.addInfo.name,
        sfh: this.addInfo.sfh,
        sfh1: this.checked.length > 0 ? this.checked[0]['身份号'] : ''
      }).then((data)=>{
        if(data.message === '添加成功') {
          // console.log(data['信息'][0], '校对数据')
          // data['信息'][0] = data['信息'][0]
          this.checked.push(data['信息'][0])
        } else if (data.message === '查无此人') {
          this.$message('查无此人，请重新填写')
        } else if (data.message === '现管部门不同') {
          this.$message('现管部门不同')
        }
        this.selfAddModel = false
        this.addInfo = {
          name: '',
          sfh: '',
          zm: '',
          xgdanwei: '',
          danwei: ''
        }
      })
    },
    handleCheckedReasonChange (val) {
      // console.log('val',val)
        this.fileval=val;
      // console.log('condition[\'查档事由\']',this.condition['查档事由'])
    },
    handleCheckedFormChange () {},
    handleCheckedConChange () {},
    clearAll () {
      this.conditionList = {}
      // this.daima.zwdj = ''
      // this.daima.jxwj = ''
      this.daima = {}
      this.sql = ''
      this.conditionSearch()
    },
    changeProject () {
      this.fangan.forEach(item => {
        // console.log(item['方案名称'], this.fanganmc)
        if (item['方案名称'].split(' ').join('') === this.fanganmc.split(' ').join('')) {
          // console.log('进来')
          this.currentProject = item
        }
      })
      // console.log(this.currentProject, '当前选项')
      this.currentProject['方案查档对象'] = JSON.parse(this.currentProject['方案查档对象'])
      this.currentProject['方案查询条件'] = JSON.parse(this.currentProject['方案查询条件'])
    },
    back () {
      this.$router.back()
    },
    typeCon () {
      if (this.types === '01') {
        this.typeContent = '查阅扫描档案'
        this.yewutype = '01'
      } else if (this.types === '02') {
        this.typeContent = '查阅纸质档案'
        this.yewutype = '02'
      } else if (this.types === '03') {
        this.typeContent = '借阅纸质档案'
        this.yewutype = '03'
      } else {
        this.typeContent = '查看档案日志'
        this.yewutype = '04'
      }
    },
    showSqlBox () {
      this.isShowsql = false
    },
    showConBox () {
      this.isShowsql = true
    },
    selfAdd () {
      this.selfAddModel = true
    },
    saveProject () {
      this.saveModel = true
    },
    cancel () {
      this.saveModel = false
      this.importModel = false
      this.fanganmc = ''
      this.currentProject['方案名称'] = ''
      this.currentProject['方案查档对象'] = []
      this.project_name = ''
      this.project_desc = ''
      this.selfAddModel = false
      this.checked[this.checkedIndex].czlx = []
      // this.czlx = []
      this.value1 = []
    },
    close () {
      this.saveModel = false
      this.importModel = false
      this.selectModel = false
      this.selfAddModel = false
    },
    getProject () {
      this.$api.index.programList({
        identityCode: this.userInfo['身份号']
      }).then((data) => {
        this.fangan = data
      })
    },
    submit () {
      let date = new Date()
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      let mc = ''
      let cyr = this.cdr[1]
      let ptr = this.cdr[2]
      this.checked.forEach((item, index) => {
        // this.czr.push(item.czr)
        this.start.push(item.startTime)
        this.end.push(item.endTime)
        this.czlx ? this.czlx.push(item.czlx) : ''
        this.xzjgmcm = item['现管单位机构名称码']
      })
      this.bcdr = this.checked && this.checked.map(item => {
        return item['身份号']
      })
      this.bcdrxm = this.checked && this.checked.map(item => {
        return item['姓名']
      })
      this.bcdrjgmcm = this.checked && this.checked.map(item => {
        return item['机构名称码']
      })
      // 申请名称
      if (this.checked.length <= 2) {
        if (this.yewutype === '01') {
          mc = this.checked && '申请查阅' + this.checked.map(item => {
            return item['姓名']
          }).join('、') + '电子档案'
        } else if (this.yewutype === '02') {
          mc = this.checked && '申请查阅' + this.checked.map(item => {
            return item['姓名']
          }).join('、') + '纸质档案'
        } else if (this.yewutype === '03') {
          mc = this.checked && '申请借阅' + this.checked.map(item => {
            return item['姓名']
          }).join('、') + '纸质档案'
        } else {
          mc = this.checked && '申请查看' + this.checked.map(item => {
            return item['姓名']
          }).join('、') + '档案日志'
        }
      } else {
        if (this.yewutype === '01') {
          mc = this.checked && '申请查阅' + this.checked.map(item => {
            return item['姓名']
          }).slice(0, 2).join('、') + '等电子档案'
        } else if (this.yewutype === '02') {
          mc = this.checked && '申请查阅' + this.checked.map(item => {
            return item['姓名']
          }).slice(0, 2).join('、') + '等纸质档案'
        } else if (this.yewutype === '03') {
          mc = this.checked && '申请借阅' + this.checked.map(item => {
            return item['姓名']
          }).slice(0, 2).join('、') + '等纸质档案'
        } else {
          mc = this.checked && '申请查看' + this.checked.map(item => {
            return item['姓名']
          }).slice(0, 2).join('、') + '等档案日志'
        }
      }

      this.appdata = y + '-' + m + '-' + d
      // 修改原因: 人员基本信息里没有这两个字段了
      // if (this.$route.name === 'FileLog' || this.$route.name === 'ScanFiles') {
      //   this.xgbm = this.checked[0]['管理电子机构名称码']
      // } else {
      //   this.xgbm = this.checked[0]['管理纸质机构名称码']
      // }
      if (this.$route.name !== 'FileLog') {
        if(this.cdr.length >=2 && this.bcdr.length > 0 && this.reason.length > 0 && this.form.length > 0 && this.con.length > 0) {
          this.$api.application.submitApplication({
            danwei: this.userInfo['部别'],
            sfh: this.userInfo['身份号'],
            sqrname: this.cdr[0]['姓名'],
            cyrname: this.cdr[1]['姓名'],
            ptrname: this.cdr[2] ? this.cdr[2]['姓名'] : '',
            chayueren: this.cdr[1]['身份号'],
            peitongren: this.cdr[2] ? this.cdr[2]['身份号'] : '',
            yewutype: this.yewutype,
            chadangneirong: this.con.join(' '),
            shiyou: this.reason.join(' '),
            xingshi: this.form.join(' '),
            bcdr: this.bcdr,
            bcdrxm: this.bcdrxm,
            bcdrjgmcm: this.bcdrjgmcm,
            cdfw: '',
            shenqingdate: this.appdata,
            phone: '',
            jgmcm: this.userInfo['机构名称码'],
            length: this.checked.length,
            sqmc: mc,
            xgbm: this.checked[0]['现管单位机构名称码'],
            // kaishi: this.start,
            // jieshu: this.end,
            // czr: this.czr,
            // czlx: this.czlx1,
            xgjgmcm: this.xzjgmcm
          }).then(data => {
            this.sqbh = data['申请编号']
            this.sub_successModel = true
          })
        }
        if (this.cdr.length < 2) {
            this.$message({
                message: '警告哦，查档人至少两人',
                type: 'warning'
            });
            return
        }
        if (this.bcdr.length === 0) {
            this.$message({
                message: '警告哦，请选择待查档案',
                type: 'warning'
            });
            return
        }
        if (this.reason.length === 0) {
            this.$message({
                message: '警告哦，请选择查档事由',
                type: 'warning'
            });
            return
        }
        if (this.con.length === 0) {
            this.$message({
                message: '警告哦，请选择查档内容',
                type: 'warning'
            });
            return
        }
          if (this.form.length === 0) {
              this.$message({
                  message: '警告哦，请选择查档形式',
                  type: 'warning'
              });
              return
          }
      } else {
        this.checked.forEach((item, index) => {
          // this.czr.push(item.czr)
          this.xzjgmcm = item['现管单位机构名称码']
        })
        if(this.bcdr.length > 0 && this.reason.length > 0 && this.form.length > 0) {
          if (this.start.length === this.checked.length && this.end.length === this.checked.length){
             this.$api.application.submitApplication({
              danwei: this.userInfo['部别'],
              sfh: this.userInfo['身份号'],
              sqrname: this.cdr[0]['姓名'],
              // cyrname: this.cdr[1]['姓名'],
              // ptrname: this.cdr[2] ? this.cdr[2]['姓名'] : '',
              // chayueren: this.cdr[1]['身份号'],
              // peitongren: this.cdr[2] ? this.cdr[2]['身份号'] : '',
              yewutype: this.yewutype,
              // chadangneirong: this.con.join(' '),
              shiyou: this.reason.join(' '),
              xingshi: this.form.join(' '),
              bcdr: this.bcdr,
              bcdrxm: this.bcdrxm,
              bcdrjgmcm: this.bcdrjgmcm,
              cdfw: '',
              shenqingdate: this.appdata,
              phone: '',
              jgmcm: this.userInfo['机构名称码'],
              length: this.checked.length,
              sqmc: mc,
              xgbm: this.xgbm,
              kaishi: this.start,
              jieshu: this.end,
              czr: this.czr,
              czlx: this.czlx,
              xgjgmcm: this.xzjgmcm
            }).then(data => {
              this.sqbh = data['申请编号']
              this.sub_successModel = true
            })
          } else {
            this.$message('请选择查档范围')
          }
        }
        if (this.bcdr.length === 0) {
          this.$message('请选择待查档案')
        }
        if (this.reason.length === 0) {
          this.$message('请选择查档事由')
        }
          if (this.form.length === 0) {
              this.$message('请选择查档形式')
          }
      }

    },
    conditionSearch () {
      //   console.log(this.zwdj)
      this.condition['职务等级'] && this.condition['职务等级'].forEach(item => {
        if (item['名称'] === this.conditionList.zwdj) {
          this.daima.zwdj = item['代码']
        }
      })
      this.condition['军衔文级'] && this.condition['军衔文级'].forEach(item => {
        if (item['名称'] === this.conditionList.jxwj) {
          this.daima.jxwj = item['代码']
        }
      })
      this.condition['干部性质'] && this.condition['干部性质'].forEach(item => {
        if (item['名称'] === this.conditionList.gbxz) {
          this.daima.gbxz = item['代码']
        }
      })
      this.condition['档案现状'] && this.condition['档案现状'].forEach(item => {
        if (item['名称'] === this.conditionList.daxz) {
          this.daima.daxz = item['代码']
        }
      })
      this.condition['管理标识'] && this.condition['管理标识'].forEach(item => {
        if (item['名称'] === this.conditionList.glbs) {
          this.daima.glbs = item['代码']
        }
      })
      this.$api.application.peopleInformation({
        sfh: this.conditionList.sfh, // 身份号
        name: this.conditionList.name, // 姓名
        zwdj: this.daima.zwdj, // 职务等级
        bubie: this.conditionList.bubie, // 部别
        zwmc: this.conditionList.zwmc, // 职务名称
        jxwj: this.daima.jxwj, // 军衔文级
        gbxz: this.daima.gbxz, // 干部性质
        daxz: this.daima.daxz, // 档案现状
        glbs: this.daima.glbs, // 管理标识
        jgmcm: this.jgmcms ? this.jgmcms : this.userInfo['权限范围'],
        pageIndex: this.currpage,
        pageSize: this.pagesize
      }).then(data => {
        // this.lists = data
        this.length = data.total
        this.lists = data['rows'] && data['rows'].map((item, index) => {
          item['ids'] = index + 1
          item['入伍时间'] = item['入伍时间'] && item['入伍时间'].slice(0, 10)
          item['技术'] = item['技术'] ? item['技术'] : '暂无'
          return item
        })
      })
    },
    goIndex () {
      this.$router.push('/home/home')
    },
    myApplication () {
      this.$router.push('/home/application')
    },
    closeInfo () {
      this.sub_successModel = false
    },
    submit_project_save () {
      this.saveModel = false
      let person = this.checked && this.checked.map((item, index) => {
        return {
          '姓名': item['姓名'],
          '部别': item['部别'],
          '政治': item['政治'],
          '身份号': item['身份号']
        }
      })
      let personName = this.checked && this.checked.map((item, index) => {
        return item['姓名']
      })
      // console.log(personName)
      let date = new Date()
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      // console.log(y, m, d)
      this.$api.application.addprogram({
        fanganName: this.project_name,
        fanganType: this.types,
        identity: this.userInfo['身份号'],
        fanganQueryCondition: person,
        fanganDescription: this.project_desc,
        fanganDate: y + '-' + m + '-' + d,
        fanganQueryObject: personName,
        jgmcm: ''
      }).then((data) => {
        console.log(data)
      })
    },
    submit_project_import () {
      this.checked = this.currentProject['方案查询条件']
      console.log(this.checked)
      this.importModel = false
    },
    getResult () {
      this.$api.application.peopleInformation({
        jgmcm: this.userInfo['权限范围'],
        pageIndex: this.currpage,
        pageSize: this.pagesize
      }).then((data) => {
        this.length = data.total
        this.lists = data['rows'] && data['rows'].map((item, index) => {
          item['ids'] = index + 1
          item['入伍时间'] = item['入伍时间'] && item['入伍时间'].slice(0, 10)
          item['技术'] = item['技术'] ? item['技术'] : '暂无'
          return item
        })
      })
    },
    handleCurrentChange (cpage) {
      this.currpage = cpage
      this.conditionSearch()
    },
    handleSizeChange (psize) {
      this.pagesize = psize
      this.conditionSearch()
    },
    importProject () {
      this.importModel = true
    },
    addSearch (item) {
      let result1 = this.checked && this.checked.some(i => {
        if (item.身份号 === i.身份号) {
          this.$message('不允许查档人查自己的档案,请重新操作')
          return true
        }
      })
      let result2 = this.cdr && this.cdr.some(i => {
        if (i['身份号'] === item['身份号']) {
          this.$message('不可重复添加查档人,请重新操作')
          return true
        }
      })
      if (!result1 && !result2) {
        if (this.cdr.length < 3) {
          this.tableMsg.push(item)
          this.cdr.push(item)
        } else {
          this.$message('查档人不能多于三人')
        }
      }
    },
    addCheck (item) {
      // item.startTime = ''
      // item.endTime = ''
      // item.czr = ''
      // item.czlx = ''
      let result1 = this.cdr && this.cdr.some(i => {
        if (item.身份号 === i.身份号) {
          this.$message('不允许查档人查自己的档案,请重新操作')
          return true
        }
      })
      let result2 = this.checked && this.checked.some(i => {
        if (i['身份号'] === item['身份号']) {
           this.$message('不可重复添加待查档案,请重新操作')
          return true
        }
      })
      let result3 = this.checked && this.checked.some(i => {
        if (i['现管单位名称'] !== item['现管单位名称']) {
          this.$message('现管单位与所在列表的现管单位必须一致,请重新操作')
          return true
        }
      })
      if (!result1 && !result2 && !result3) {
        this.checked.push(item)
        this.checked1.push(item)
        //   console.log('this.checked1',this.checked1)
        // this.checked = this.checked && this.checked.map(item => {
        //   item['出生时间'] = item['出生时间'] && item['出生时间'].slice(0, 10)
        //   return item
        // })
        // console.log(this.checked, '选中档案')
      }
    },
    queryCondition () {
      this.$api.application.queryCondition({
        daima: this.types
      }).then((data) => {
        this.condition = data
      })
    },
    removeSearch (item) {
      this.cdr.forEach((v,i) => {
        if (item['身份号'] === v['身份号']) {
          this.cdr.splice(i,1)
        }
      })
    },
    removeCheck (item) {
      this.checked.forEach((v,i) => {
        if (item['身份号'] === v['身份号']) {
          this.checked.splice(i,1)
        }
      })
      console.log(this.checked)
    },
    changeReason (item) {
      // this.reason.push(item['名称'])
    },
    changeForm (item) {
      // this.form.push(item['名称'])
    },
    changeCon (item) {
      // this.con.push(item['名称'])
    },
    resetAll () {
      this.cdr = []
      this.reason = []
      this.form = []
      this.con = []
      this.checked = []
      this.conditionList = []
    },
    select_range (mes) {
      this.checkedIndex = mes.$index
      this.rangePerson = mes.row
      this.selectModel = true
      this.$api.application.xaunzefanwei({
        sfh: mes.row['身份号']
      }).then(data => {
        this.czrArr = data['操作人']
        this.czType = data['操作类型']
      })
    },
    rangeTrue () {
      if(this.rangePerson.startTime == '' && this.rangePerson.endTime == ''){
          this.$message({
              message: '警告哦，请选择时间范围！',
              type: 'warning'
          });
      }
      // console.log(this.checked, this.rangePerson)
      this.$api.application.yanzhengfanwei({
        sfh : this.rangePerson['身份号'], //身份号
        czlx : this.rangePerson.czlx.join(','), //操作类型
        kssj : this.rangePerson.startTime, //开始时间
        jssj : this.rangePerson.endTime, //结束时间
      }).then((data) => {
        if (!data['访问']) {
          this.$message('您的访问无数据，请重新操作')
        } else {
          this.selectModel = false
          if (this.rangePerson.startTime && this.rangePerson.endTime) {
            this.start.push(this.rangePerson.startTime)
            this.end.push(this.rangePerson.endTime)
          } else {
            this.$message('请选择查询范围时间')
          }
          this.czlx ? this.czlx.push(item.czlx.join(',')) : ''
          this.value1 = []
          this.czlx = []
        }
      })


    },
    changezwdj (cord) {
      this.conditionList.zwdj = cord
    },
    changejxwj (cord) {
      this.conditionList.jxwj = cord
    },
    changegbxz (cord) {
      this.conditionList.gbxz = cord
    },
    changedaxz (cord) {
      this.conditionList.daxz = cord
    },
    changeglbs (cord) {
      this.conditionList.glbs = cord
    }
  }
}
</script>

<style lang="scss">
.right_2 {
    margin-left: 16px;
    .back {
        width: 60px;
        height: 24px;
        background: rgba(3, 129, 255, 0.26);
        border-radius: 2px;
        border: 1px solid #0a43bc;
        color: #fff;
    }
  /*111111111*/
  .linetd{
    text-align: center;
    height: 50px;
  }
  .trcaption{
    height: 50px;
    text-align: center;
  }
  /*111111111*/
  .back1 {
    width: 60px;
    height: 24px;
    background: rgba(3, 129, 255, 0.26);
    border-radius: 2px;
    border: 1px solid #0a43bc;
    color: #fff;
  }
    &>.back {
       position: absolute;
      right: 0;
      top: -36px;
      z-index: 999;
    }
    & > div {
        &.common_style {
            width: 1024px;
            background:rgba(5,27,74,0.22);
            border:1px solid rgba(10,67,188,1);
            box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
            opacity:0.8;
            position: relative;
            margin-bottom:16px;
        }
        .con {
            @include sizing;
            position: relative;
            z-index:99;
            padding:16px;
            &.con_flex {
                @include box_flex;
                @include flexWrap(wrap);
                @include justify(space-between);
                margin:0 16px;
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
                    input, select{
                        width:220px;
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
                        width:218px;
                        height:28px;
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
            margin: 20px 16px;
        }
    }
    .my_project {
        height: auto;
    }
    .search_result {
        height: auto;
        padding-bottom: 24px;
    }
    .select_file {
        min-height: 134px;
        padding-bottom: 40px;
    }
    .consult_person {
        min-height: 134px;
    }
    .options {
        height: auto;
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
            background: url('../../../assets/images/tit-right.png');
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
        margin-top: -30px;
        margin-right: -770px;
        button {
            width:80px;
            height:30px;
            border:none;
            color: #fff;
            margin-left: 8px;
            &.search {
                background:linear-gradient(0deg,rgba(12,96,200,1),rgba(5,141,252,1));
                box-shadow:0px 4px 31px 0px rgba(0, 0, 0, 0.41);
                border-radius:2px;
            }
            &.clear_all {
                width:80px;
                height:30px;
                border:none;
                background:linear-gradient(0deg,rgba(166,242,189,1),rgba(34,162,72,1));
                box-shadow:0px 4px 31px 0px rgba(0, 0, 0, 0.41);
                border-radius:2px;
            }
            // &.custom {
            //     font-size:14px;
            //     font-family:MicrosoftYaHei;
            //     font-weight:400;
            //     color:rgba(0,255,255,1);
            //     width:96px;
            //     height:30px;
            //     border:1px solid rgba(0,255,255,1);
            //     border-radius:2px;
            //     background: none;
            // }
        }
    }
    // .more_card {
    //     width:48px;
    //     height:26px;
    //     background:rgba(3,129,255,1);
    //     border:1px solid rgba(10, 67, 188, 1);
    //     box-shadow:0px 2px 4px 0px rgba(0, 0, 0, 0.16);
    //     border-radius:2px;
    //     color: #fff;
    //     position: absolute;
    //     right: 16px;
    //     margin-top: 10px;
    //     color: #00FFFF;
    // }
    .rightBtn {
        position: absolute;
        right: 16px;
        bottom: -24px;
        .clear {
            width:80px;
            height:30px;
            border:1px solid rgba(0,255,255,1);
            border-radius:2px;
            background: none;
            color: rgba(0,255,255,1)
        }
        .save {
            border: none;
            width:80px;
            height:30px;
            background:linear-gradient(0deg,rgba(12,96,200,1),rgba(5,141,252,1));
            box-shadow:0px 4px 31px 0px rgba(0, 0, 0, 0.41);
            border-radius:2px;
            color: #fff;
        }
        .import {
            border: none;
            width:80px;
            height:30px;
            background:linear-gradient(0deg,rgba(166,242,189,1),rgba(34,162,72,1));
            box-shadow:0px 4px 31px 0px rgba(0, 0, 0, 0.41);
            border-radius:2px;
        }
    }
    .else {
        width:160px;
        height:28px;
        background:rgba(3,94,255,0.15);
        border:1px solid rgba(10,67,188,1);
        border-radius:2px;
    }
    .whthin_reason {
        border-top: 1px solid #029AFF;
        padding-top: 8px;
    }
    .whthin_form,.whthin_content {
        margin-top: 16px;
        position: relative;
        h5 {
            padding: 8px 0;
            margin-bottom: 16px;
            border-bottom: 1px solid #029AFF;
        }
        input {
          position: absolute;
          left: 650px;
          bottom: 0px;
        }
    }
    .submit_btn_2 {
        margin-bottom: 32px;
        margin-top: 24px;
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
            height:28px;
            border: none;
            background:linear-gradient(0deg,rgba(12,96,200,1),rgba(5,141,252,1));
            box-shadow:0px 4px 31px 0px rgba(0, 0, 0, 0.41);
            border-radius:2px;
            color: #fff;
            margin-left: 8px;
        }
        .download {
          position: absolute;
          // z-index: 99999;
          // color: #0000;
          width:80px;
          height:28px;
          right: 68px;
          background: none;
          border-radius: 2px;
          border:none;
          background:linear-gradient(0deg,rgba(12,96,200,1),rgba(5,141,252,1));
          box-shadow:0px 4px 31px 0px rgba(0, 0, 0, 0.41);
          color: #fff;
        }
        .back {
          position: absolute;
          right: 0;
          // bottom: 4px;
          z-index: 999;
        }
      /*.back1 {*/
      /*  width:60px;*/
      /*  height:24px;*/
      /*  background:rgba(3,129,255,0.26);*/
      /*  border-radius:2px;*/
      /*  border:1px solid rgba(10,67,188,1);*/
      /*  color: #fff;*/
      /*  position: absolute;*/
      /*  right: 70px;*/
      /*  top: 24px;*/
      /*  z-index: 999;*/
      /*  }*/
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
    .add_search {
        color:rgba(255,198,0,1);
        padding-right: 8px;
    }
    .add_check {
        color:rgba(0,255,255,1);
    }
    .save_model {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .5);
        @include box_flex;
        @include justify(center);
        @include align(center);
        .con_3 {
            padding: 0;
            @include wh(500px, 368px);
            background:rgba(5,27,74,1);
            box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2);
            border:1px solid rgba(10,67,188,0.65);
            h3 {
                position: relative;
                z-index: 999;
                height: 40px;
                background:rgba(11,67,187,1);
                box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2);
                opacity:0.7;
                border:1px solid rgba(10,67,188,1);
                @include box_flex;
                @include justify(space-between);
                span {
                    font-size:15px;
                    color:#fff;
                    line-height: 40px;
                    margin-left: 16px;
                    // line-height:20px;
                }
                .close {
                    font-size: 20px;
                    color:#029AFE;
                    margin-right: 16px;
                    cursor: pointer;
                }
            }
            .project_name,.project_desc {
                position: relative;
                z-index:999;
                margin: 24px 24px 0 24px;
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
                    background:rgba(3,94,255,0.15);
                    border-radius:2px;
                    border:1px solid rgba(10,67,188,0.94);
                    padding:0 16px;
                    box-sizing: border-box;
                }
                textarea {
                    width: 100%;
                    height: 120px;
                    background:rgba(3,94,255,0.15);
                    border-radius:2px;
                    border:1px solid rgba(10,67,188,0.94);
                    padding:0 16px;
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
                    width:80px;
                    height:30px;
                    box-shadow:0px 2px 10px 0px rgba(0,0,0,0.53);
                    border-radius:2px;
                    border:1px solid rgba(0,254,255,1);
                }
                .submit {
                    border: none;
                    width:80px;
                    height:30px;
                    background:linear-gradient(180deg,rgba(5,141,252,1) 0%,rgba(12,96,200,1) 100%);
                    box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 2px 0px rgba(255,255,255,0.5);
                    border-radius:2px;
                }
            }
        }
        .con_4 {
            width:1000px;
            height:505px;
            background:rgba(5,27,74,1);
            box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2);
            border:1px solid rgba(10,67,188,0.65);
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
                    color: #20FE3C;
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
                    color:#029AFE;
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
                z-index:999;
                right: 8px;
                font-size: 24px;
                color: #029AFE;
                top: 8px;
            }
        }
        .project_btn {
            position: absolute;
            right: 24px;
            bottom: 16px;
            z-index: 999;
            .cancel,.goback {
                border: none;
                background: none;
                color: aqua;
                width:80px;
                height:30px;
                box-shadow:0px 2px 10px 0px rgba(0,0,0,0.53);
                border-radius:2px;
                border:1px solid rgba(0,254,255,1);
                margin-right: 8px;
            }
            .submit,.my_application {
                border: none;
                width:80px;
                height:30px;
                background:linear-gradient(180deg,rgba(5,141,252,1) 0%,rgba(12,96,200,1) 100%);
                box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 2px 0px rgba(255,255,255,0.5);
                border-radius:2px;
            }
        }
    }
    .import {
        .con_3 {
            height: 300px;
        }
        .project_name {
            @include box_flex;
            span {
                line-height: 30px;
            }
            select {
                @include flex;
                margin-left: 16px;
                background:rgba(3,94,255,0.15);
                border-radius:2px;
                border:1px solid rgba(10,67,188,0.94);
                color: #666;
            }
        }
        .project_desc {
            margin: 0 24px;
            background:rgba(3,94,255,0.15);
            height: auto;
            border-radius:2px;
            border:1px solid rgba(10,67,188,0.94);
        }
        .application_info {
            margin: 16px 24px;
        }
        p {
            line-height: 30px;
            font-size: 13px;
        }
    }
    .select .con_3 {
        width: 800px;
        height: 200px;
    }
    .select_1 {
        @include box_flex;
        @include flexWrap(wrap);
        position: relative;
        z-index: 999;
        .project_desc {
            span {
                line-height: 40px;
            }
            select {
                background:rgba(3,94,255,0.15);
                border:1px solid rgba(10,67,188,1);
                border-radius:2px;
            }
        }
    }
    .add {
      .con_3 {
        height:auto;
        position: relative;
        padding-bottom: 20px;
        div {
          width: 300px;
          margin:0 auto;
          p {
            span {
              color: #f00;
              font-size: 16px;
              line-height: 30px;
            }
            input {
              width: 100%;
              box-sizing: border-box;
              height:30px;
              border-radius: 2px;
              border:none;
              background: rgba(3, 94, 255, 0.15);
              border: 1px solid #0a43bc;
              padding:0 8px;
            }
          }

        }
        .addbtn {
          // position: absolute;
          // right: 0;
          // bottom: 16px;
          // z-index: 999;
          margin-top: 20px;
          @include box_flex;
          @include justify(center);
          .cancel {
              border: none;
              background: none;
              color: aqua;
              width:80px;
              height:30px;
              box-shadow:0px 2px 10px 0px rgba(0,0,0,0.53);
              border-radius:2px;
              border:1px solid rgba(0,254,255,1);
              margin-right:8px;
          }
          .submit {
              border: none;
              width:80px;
              height:30px;
              background:linear-gradient(180deg,rgba(5,141,252,1) 0%,rgba(12,96,200,1) 100%);
              box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 2px 0px rgba(255,255,255,0.5);
              border-radius:2px;
          }
        }
      }
    }
    input, select, textarea {
        color:rgba(221,221,221,1);
        &::placeholder {
            color:rgba(221,221,221,1);
        }
    }
    .leftBtn {
      position: absolute;
      left:16px;
      bottom:-24px;
      .selfAdd {
        border: none;
          width:80px;
          height:30px;
          background:linear-gradient(0deg,rgba(12,96,200,1),rgba(5,141,252,1));
          box-shadow:0px 4px 31px 0px rgba(0, 0, 0, 0.41);
          border-radius:2px;
          color: #fff;
      }
    }
    .sqlBox {
      display: flex;
    }
    textarea {
        background: rgba(3, 94, 255, 0.15);
        border: 1px solid #0a43bc;
        margin-left: 16px;
        padding: 8px;
    }
    button.custom {
      font-size:14px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(0,255,255,1);
      width:96px;
      height:30px;
      border:1px solid rgba(0,255,255,1);
      border-radius:2px;
      background: none;
      margin-top:16px;
      margin-left:8px;
      position: relative;
      z-index:9999;
    }
}
</style>

