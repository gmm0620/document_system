<template>
  <div class="stage">
    <h3>档案情况</h3>
    <p class="baseInfo">
      <span>姓名：{{$route.query.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
      <span>职务：{{$route.query.zhiwu}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
      <span>部别：{{$route.query.danwei}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
      <span>身份号：{{$route.query.sfh}}</span>
    </p>
    <!--    <button class="finishBuild point" @click="finishBuild" v-if="!$route.query.daily">完成建档</button>-->
    <button class="finishBuild point" @click="finishBuild" v-show="wanchengjiandang">完成建档</button>
    <button class="back point" @click="back">返回</button>
    <div>
      <div class="left">
        <div class="queue">
          档案目录
          <button class="birth" v-if="tenTree && build" @click="birthTree">生成目录</button>
          <button class="birth" v-if="!type" @click="match">匹配目录</button>
          <button class="deleteBtn point" @click="deleteNode">删除</button>
        </div>
        <div class="type">
          <div>
            <input type="radio" name="type" :checked="tenTree.length" @change="changeType(1)" class="point" />
            <span>十分法</span>
          </div>
          <div>
            <input type="radio" name="type" :checked="!tenTree.length" @change="changeType(0)" class="point" />
            <span>二分法</span>
          </div>
        </div>
        <div class="ten" v-if="type">
          <el-tree
            ref="tree"
            :data="tenTree"
            :props="defaultProps"
            node-key="id"
            highlight-current
            @node-click="handleNodeClick"
            @node-drag-start="handleDragStart"
            @node-drag-end="handleDragEnd"
            draggable
            :allow-drop="allowDrop"
          ></el-tree>
        </div>
        <div class="two" v-else>
          <div class="part">
            <div class="part_title">第一部分</div>
            <div class="hidden">
              <ul>
                <li
                  v-for="(item,index) in twoTree['一类材料']"
                  :class="activeIndex === index? 'active' : ''"
                  :key="index"
                  @click="marterLook(index, item)"
                >{{index + 1}}、{{item['材料名称']}}</li>
              </ul>
            </div>
          </div>
          <div class="part">
            <div class="part_title">第二部分</div>
            <div class="hidden">
              <ul>
                <li
                  v-for="(item,index) in twoTree['二类材料']"
                  :class="activeIndex1 === index? 'active' : ''"
                  :key="index"
                  @click="marterLook1(index, item)"
                >{{index + 1}}、{{item['材料名称']}}</li>
              </ul>
            </div>
          </div>
        </div>
        <PositionHorn />
      </div>
      <div class="right" v-show="isShow == true">
        <div class="top">
          <div class="top_btn">
            <!-- <button
              :class="treeSelectNode.fdm === '根'?'addClass':'addClass active'"
              :disabled="treeSelectNode.fdm !== '根'"
              @click="newType"
            >添加类别</button>-->
            <button @click="newBuild" class="add">添加材料</button>
            <!--treeSelectNode.id && treeSelectNode.id.length === 4 ? 'add' : 'add active'-->
            <button
              :class="treeSelectNode.大类代码 ? 'edit' : 'edit active'"
              :disabled="!treeSelectNode.大类代码"
              @click="editBuild"
            >编辑材料</button>
            <button @click="overviewDir">目录总览</button>
            <button @click="previewDir">预览目录</button>
            
            <button class="point" @click="shAdd(2)">申请添加材料名称</button>
            <button class="point" @click="shAdd(3)">申请添加专有属性</button>
            <!-- <button
              @click="scanMaterial"
              :class="currentNode['大类代码'] ? 'scan scanActive' : 'scan'"
              :disabled="!currentNode['大类代码']"
            >扫描材料</button> -->
          </div>
          <div class="top_btn1">
            <!-- <button class="point" @click="shAdd(1)">申请添加材料类别</button> -->
            <button>导出目录</button>
            <!-- <button v-show="$route.query.daily">质量管理</button> -->
            <button class="button2">质量管理</button>
          </div>
          <PositionHorn />
        </div>
        <div class="bottom-left">
          <!-- v-show="isShow == false" -->
          <div class="bottomButtons">
            <span>缩略图</span>
            <div class="iconBox">
              <i class="el-icon el-icon-s-unfold" v-show="suoluetuFlag" @click="suoluetuBigger"></i>
              <i class="el-icon el-icon-s-fold" v-show="!suoluetuFlag" @click="suoluetuSmaller"></i>
            </div>
            <el-button type="success" class="dragBtn" v-show="!editImgShow"@click="completeEditImg">完成</el-button>
            <el-button type="primary" class="dragBtn" v-show="editImgShow" @click="editImg">编辑</el-button>
            <el-button type="success" class="dragBtn" v-show="dragEnabled" @click="completeDragImg">完成</el-button>
            <el-button type="primary" class="dragBtn" v-show="!dragEnabled" @click="dragImg">排序</el-button>
            <el-button
              type="primary"
              :class="['dragBtn', !editImgShow || dragEnabled ? 'disabledPoint' : '']"
              @click="uploadmulu"
              :disabled="!editImgShow || dragEnabled"
            >上传至目录</el-button>
            <el-button type="primary" class="dragBtn disableDragBtn" disabled="disabled">图像识别</el-button>
            <el-button type="primary" class="dragBtn disableDragBtn" @click="imgOpt" disabled="disabled">图像优化</el-button>
          </div>
          <div class="left_img" ref="left_img">
            <div class="imgs">
              <!-- 拖拽 -->
              <draggable
                class="list-group"
                :disabled="!dragEnabled"
                tag="ul"
                v-model="imgCountArray"
                v-bind="dragOptions"
                @start="drag = true"
                @end="drag = false"
              >
                <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                  <div
                    :class="['imgBox', dragEnabled ? 'imgBoxMove' : '']"
                    v-for="(item, index) in imgCountArray"
                    :key="item"
                  >
                    <div
                      v-if="(!dragEnabled && editImgShow) || index !== imgCountArray.length - 1"
                      :class="['imgBoxContent', index === (imgCountArray.length -1) || !editImgShow ? 'imgBoxContentBorder': '']"
                    >
                      <i
                        class="el-icon-plus"
                        v-show="index === (imgCountArray.length -1) || !editImgShow"
                      ></i>
                      <i
                        class="deleteImg el-icon-circle-close"
                        @click="deleteImg($event)"
                        v-show="!editImgShow && index !== imgCountArray.length - 1"
                      ></i>
                      <input
                        v-show="index === (imgCountArray.length -1) || !editImgShow"
                        :class="['imgUpload', 'imgUpload' + index]"
                        type="file"
                        @change="imgUpload($event)"
                        multiple="multiple"
                        accept="image/x-png, image/jpg, image/jpeg, image/gif"
                      />
                      <img :class="['imgDom', 'imgDom' + index]" src :ref="['imgDom' + index]" />
                    </div>
                  </div>
                </transition-group>
              </draggable>
            </div>
          </div>
          <div class="right_img">
            <div class="opt">
              <!-- <div>
              <span>图像缩放</span>
              <button @click="zoom(1)" class="point">
                <i class="el-icon-zoom-in"></i>放大
              </button>
              <button @click="zoom(-1)" class="point">
                <i class="el-icon-zoom-out"></i>缩小
              </button>
              </div>-->
              <!-- <div>
              <span>图像基本处理</span>
              <button class="point">剪裁</button>
              <button @click="rotate" class="point">
                <i class="el-icon-zoom-out"></i>旋转
              </button>
              </div>-->
            </div>
          </div>
          <PositionHorn />
        </div>
        <div class="bottom">
          <div class="dialog" v-if="dialogDiv">
            <span>材料属性编辑区</span>
            <!-- <span>请在左侧的档案目录书中，选择您要编辑的材料，或者添加新材料</span> -->
            <span></span>
          </div>
          <div v-if="clIsShow && !dialogDiv">
            <div class="base">
              <h4>通用属性-添加</h4>
              <div>
                <div class="inputInfo">
                  <span>根目录:</span>
                  <el-select v-model="parentmulu" placeholder="请选择" @change="changeParent">
                    <el-option
                      v-for="(item,index) in tenTree"
                      :key="index"
                      :label="item['材料名称']"
                      :value="item['材料代码']"
                    ></el-option>
                  </el-select>
                </div>
                <div class="inputInfo">
                  <span>材料类别:</span>
                  <el-select v-model="marterial_class" placeholder="请选择" @change="changeSecond">
                    <el-option
                      v-for="(item, index) in secondTree"
                      :key="index"
                      :value="item['材料代码']"
                      :label="item['材料名称']"
                    ></el-option>
                  </el-select>
                </div>
                <div class="inputInfo">
                  <span>常见材料名称:</span>
                  <el-select
                    v-if="basePropData[0]"
                    v-model="thirdValue"
                    filterable
                    placeholder="请选择"
                    value-key="序号"
                    @change="changeThird"
                  >
                    <el-option
                      v-for="item in thirdTree"
                      :key="item['序号']"
                      :value="item"
                      :label="item['材料名称']"
                    ></el-option>
                  </el-select>
                </div>
                <div
                  class="inputInfo"
                  v-for="(item, index) in basePropData"
                  v-if="item['字段名称'].slice(0,2) !== '是否'"
                  :key="index"
                >
                  <span>{{item['字段名称']}}</span>
                  <input
                    type="text"
                    v-model="item[item['字段名称']]"
                    v-if="item['数据类型'] !== 'date'"
                    :disabled="thirdValue['序号'] !== 0 && item['字段名称'] === '材料名称' ? true : false"
                  />
                  <el-date-picker
                    v-if="item['数据类型'] === 'date'"
                    v-model="item[item['字段名称']]"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </div>
                <div
                  class="inputInfo"
                  v-if="item['字段名称'].slice(0,2) === '是否'"
                  v-for="(item, index) in basePropData"
                  :key="index"
                >
                  <input type="checkbox" name id class="checkbox" v-model="item[item['字段名称']]" />
                  <span style="width: 200px;text-align: left;">{{item['字段名称']}}</span>
                </div>
              </div>
            </div>
            <div class="zhuanyou">
              <h4>专有属性</h4>
              <div>
                <div
                  class="inputInfo"
                  v-for="(item, index) in properPropData"
                  v-if="item['字段名称'].slice(0,2) !== '是否'"
                  :key="index"
                >
                  <span>{{item['字段名称']}}</span>
                  <input
                    type="text"
                    v-model="item['默认值'] ? item['默认值'] : item[item['字段名称']]"
                    v-if="item['数据类型'] !== 'date'"
                  />
                  <el-date-picker
                    v-if="item['数据类型'] === 'date'"
                    v-model="item[item['字段名称']]"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </div>
                <div
                  class="inputInfo"
                  v-for="(item, index) in properPropData"
                  v-if="item['字段名称'].slice(0,2) === '是否'"
                  :key="index"
                >
                  <input type="checkbox" name id class="checkbox" v-model="item[item['字段名称']]" />
                  <span style="width: 200px;text-align: left;">{{item['字段名称']}}</span>
                </div>
              </div>
            </div>
            <div class="btn">
              <button class="cancel point" @click="cancel">取消</button>
              <button class="submit point" @click="submitEdit">提交</button>
            </div>
          </div>
          <div v-if="!dialogDiv && isShowInput">
            <div class="base">
              <h4>通用属性-展示</h4>
              <div style="height: 300px; overflow-y: scroll;">
                <div class="inputInfo">
                  <span>根目录:</span>
                  <el-select v-model="parentmulu" placeholder="请选择" @change="changeParent" disabled>
                    <el-option
                      v-for="item in tenTree"
                      :key="item.id"
                      :label="item['材料名称']"
                      :value="item['材料代码']"
                    ></el-option>
                  </el-select>
                </div>
                <div class="inputInfo">
                  <span>材料类别:</span>
                  <el-select
                    v-model="marterial_class"
                    placeholder="请选择"
                    @change="changeSecond"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in secondTree"
                      :key="index"
                      :value="item['材料代码']"
                      :label="item['材料名称']"
                    ></el-option>
                  </el-select>
                </div>
                <div
                  class="inputInfo"
                  v-for="(item, index) in baseData"
                  v-if="item['字段名称'].slice(0,2) !== '是否'"
                  :key="index"
                >
                  <span>{{item['字段名称']}}</span>
                  <input
                    type="text"
                    v-model="item[item['字段名称']]"
                    v-if="item['数据类型'] !== 'date'"
                    disabled
                  />
                  <el-date-picker
                    v-if="item['数据类型'] === 'date'"
                    v-model="item[item['字段名称']]"
                    type="date"
                    placeholder="选择日期"
                    disabled
                  ></el-date-picker>
                </div>
                <div
                  class="inputInfo"
                  v-if="item['字段名称'].slice(0,2) === '是否'"
                  v-for="(item, index) in baseData"
                  :key="index"
                >
                  <input type="checkbox" name id class="checkbox" v-model="item[item['字段名称']]" />
                  <span style="width: 200px;text-align: left;">{{item['字段名称']}}</span>
                </div>
              </div>
            </div>
            <div class="zhuanyou">
              <h4>专有属性</h4>
              <div style="height: 300px; overflow-y: scroll;">
                <div
                  class="inputInfo"
                  v-for="(item, index) in properData"
                  v-if="item['字段名称'].slice(0,2) !== '是否'"
                  :key="index"
                >
                  <span>{{item['字段名称']}}</span>
                  <input
                    type="text"
                    v-model="item[item['字段名称']]"
                    v-if="item['数据类型'] !== 'date'"
                    disabled
                  />
                  <el-date-picker
                    v-if="item['数据类型'] === 'date'"
                    v-model="item[item['字段名称']]"
                    type="date"
                    placeholder="选择日期"
                    disabled
                  ></el-date-picker>
                </div>
                <div
                  class="inputInfo"
                  v-for="(item, index) in properData"
                  v-if="item['字段名称'].slice(0,2) === '是否'"
                  :key="index"
                >
                  <input type="checkbox" name id class="checkbox" v-model="item[item['字段名称']]" />
                  <span style="width: 200px;text-align: left;">{{item['字段名称']}}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!dialogDiv && isShowBtn">
            <div class="base">
              <h4>通用属性-编辑</h4>
              <div>
                <div class="inputInfo">
                  <span>根目录:</span>
                  <el-select v-model="parentmulu" placeholder="请选择" @change="changeParent" disabled>
                    <el-option
                      v-for="item in tenTree"
                      :key="item.id"
                      :label="item['材料名称']"
                      :value="item['材料代码']"
                    ></el-option>
                  </el-select>
                </div>
                <div class="inputInfo">
                  <span>材料类别:</span>
                  <el-select
                    v-model="marterial_class"
                    placeholder="请选择"
                    @change="changeSecond"
                    disabled
                  >
                    <el-option
                      v-for="(item, index) in secondTree"
                      :key="index"
                      :value="item['材料代码']"
                      :label="item['材料名称']"
                    ></el-option>
                  </el-select>
                </div>
                <div class="inputInfo">
                  <span>常见材料名称:</span>
                  <el-select
                    v-model="thirdValue1"
                    filterable
                    placeholder="请选择"
                    value-key="序号"
                    @change="changeThird1"
                  >
                    <el-option
                      v-for="item in thirdTree1"
                      :key="item['序号']"
                      :value="item"
                      :label="item['材料名称']"
                    ></el-option>
                  </el-select>
                </div>
                <div
                  class="inputInfo"
                  v-for="(item, index) in baseEdit"
                  v-if="item['字段名称'].slice(0,2) !== '是否'"
                  :key="index"
                >
                  <span>{{item['字段名称']}}</span>
                  <input
                    type="text"
                    v-model="item[item['字段名称']]"
                    v-if="item['数据类型'] !== 'date'"
                    :disabled="thirdValue1['序号'] !== 0 && item['字段名称'] === '材料名称' ? true : false"
                  />
                  <el-date-picker
                    v-if="item['数据类型'] === 'date'"
                    v-model="item[item['字段名称']]"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </div>
                <div
                  class="inputInfo"
                  v-if="item['字段名称'].slice(0,2) === '是否'"
                  v-for="(item, index) in baseEdit"
                  :key="index"
                >
                  <input type="checkbox" name id class="checkbox" v-model="item[item['字段名称']]" />
                  <span style="width: 200px;text-align: left;">{{item['字段名称']}}</span>
                </div>
              </div>
            </div>
            <div class="zhuanyou">
              <h4>专有属性</h4>
              <div>
                <div
                  class="inputInfo"
                  v-for="(item, index) in properEdit"
                  v-if="item['字段名称'].slice(0,2) !== '是否'"
                  :key="index"
                >
                  <span>{{item['字段名称']}}</span>
                  <input type="text" v-model="item[item['字段名称']]" v-if="item['数据类型'] !== 'date'" />
                  <el-date-picker
                    v-if="item['数据类型'] === 'date'"
                    v-model="item[item['字段名称']]"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </div>
                <div
                  class="inputInfo"
                  v-for="(item, index) in properEdit"
                  v-if="item['字段名称'].slice(0,2) === '是否'"
                  :key="index"
                >
                  <input type="checkbox" name id class="checkbox" v-model="item[item['字段名称']]" />
                  <span style="width: 200px;text-align: left;">{{item['字段名称']}}</span>
                </div>
              </div>
            </div>
            <div class="btn">
              <button class="cancel point" @click="cancel">取消</button>
              <button class="submit point" @click="saveEdit">保存</button>
            </div>
          </div>
          <PositionHorn />
        </div>
        <!-- <div class="addWindow" v-show="winIsShow">
          <div class="queue">
            添加目录
            <span class="close" @click="closeWin">×</span>
          </div>
          <select v-model="marterial_class">
            <option
              v-for="(item, index) in secondTree"
              :key="index"
              :value="item['材料代码']"
            >{{item['材料名称']}}</option>
          </select>
          <div class="btn">
            <button class="point" @click="addNode">确定</button>
            <button class="point" @click="closeWin">取消</button>
          </div>
        </div>-->
        <div class="sq-addWindow" v-show="sqwinShow">
          <div v-show="sqwinType == 1">
            <div class="queue">
              申请添加材料类型
              <span class="close" @click="closeWin">×</span>
            </div>
            <p>选择一级节点</p>
            <select v-model="code" @change="firstChange">
              <option
                v-for="(item, index) in firstmulu"
                :key="index"
                :value="item['材料代码']"
              >{{item['材料名称']}}</option>
            </select>
            <p>材料类别名称</p>
            <input type="text" v-model="lName" />
            <p>描述</p>
            <input type="text" v-model="lDes" />
          </div>
          <div v-show="sqwinType == 2">
            <div class="queue">
              申请添加材料名称
              <span class="close" @click="closeWin">×</span>
            </div>
            <p>选择一级节点</p>
            <select v-model="code" @change="firstChange">
              <option
                v-for="(item, index) in firstmulu"
                :key="index"
                :value="item['材料代码']"
              >{{item['材料名称']}}</option>
            </select>
            <p>选择材料类别</p>
            <select v-model="sCode" @change="secondChange">
              <option
                v-for="(item, index) in secondmulu"
                :key="index"
                :value="item['材料代码']"
              >{{item['材料名称']}}</option>
            </select>
            <p>材料名称</p>
            <input type="text" v-model="mName" />
            <p>描述</p>
            <input type="text" v-model="mDes" />
          </div>
          <div v-show="sqwinType == 3">
            <div class="queue">
              申请添加专有属性
              <span class="close" @click="closeWin">×</span>
            </div>
            <p>选择一级节点</p>
            <select v-model="code" @change="firstChange">
              <option
                v-for="(item, index) in firstmulu"
                :key="index"
                :value="item['材料代码']"
              >{{item['材料名称']}}</option>
            </select>
            <p>选择材料类别</p>
            <select v-model="sCode" @change="secondChange">
              <option
                v-for="(item, index) in secondmulu"
                :key="index"
                :value="item['材料代码']"
              >{{item['材料名称']}}</option>
            </select>
            <p>专有属性名称</p>
            <input type="text" v-model="zName" />
            <p>描述</p>
            <input type="text" v-model="zDes" />
          </div>
          <div class="btn">
            <button class="point" @click="sureApp">确定</button>
            <button class="point" @click="closeWin">取消</button>
          </div>
        </div>
        <div class="overviewWin" v-show="viewIsShow">
          <div>
            <div class="queue">
              目录总览
              <button class="close" @click="closeWiewWin(0)">×</button>
            </div>
            <div class="center">
              <div class="firstMode" v-for="(item, index) in overviewList" :key="index">
                <h4 class="firseTitle">{{item['显示序号']}}、{{item['材料名称']}}</h4>
                <ul>
                  <li class="modeLi" v-for="(v,i) in item.children" :key="i">
                    <h4 class="towTitle">({{toChinese(i+1)}})、{{v['材料名称']}}</h4>
                    <ul>
                      <li v-for="(e,k) in v.children" :key="k">
                        <h5 class="threeTitle">{{k+1}}、{{e['材料名称']}}</h5>
                        <div class="attrCenter">
                          <div class="cct">
                            <h6>基本属性</h6>
                            <ul>
                              <li
                                v-for="(attr, attrIndex) in JSON.parse(e['通用属性值'])"
                                :key="attrIndex"
                              >
                                <span>{{attrIndex + 1}}</span>.&nbsp;
                                <span>{{attr['字段名称']}}</span>：
                                <span>{{attr['字段名称'].indexOf('时间') !== -1 ? attr[attr['字段名称']].slice(0,10) : attr[attr['字段名称']]}}</span>
                              </li>
                            </ul>
                          </div>
                          <div class="cct">
                            <h6>专有属性</h6>
                            <div>
                              <ul>
                                <li
                                  v-for="(attr, attrIndex) in JSON.parse(e['专有属性值'])"
                                  :key="attrIndex"
                                >
                                  <span>{{attrIndex + 1}}</span>.&nbsp;
                                  <span>{{attr['字段名称']}}</span>：
                                  <span>{{attr[attr['字段名称']]}}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <!-- <div class="attrCenter">
                            <div class="cct">
                    <h6>基本属性</h6>-->
                    <!-- <div>
                                <span v-for="() in JSON"></span>
                    </div>-->
                    <!-- </div>
                            <div class="cct">
                              <h6>自有属性</h6>
                              <div>
                                以下数据需要接口获取
                              </div>
                            </div>
                    </div>-->
                  </li>
                </ul>
              </div>
            </div>
            <PositionHorn />
          </div>
        </div>
        <div class="previewWin" v-show="pviewIsShow">
          <div>
            <div class="queue">
              预览目录
              <span class="close" @click="closeWiewWin(1)">×</span>
            </div>
            <div class="center">
              <h1 class="firseTitle">第一部分目录</h1>
              <div class="firstMode">
                <el-table :data="firstPart" style="width: 100%">
                  <el-table-column prop="材料名称" label="材料名称"></el-table-column>
                  <el-table-column label="材料时间">
                    <el-table-column prop="年" label="年" width="120"></el-table-column>
                    <el-table-column prop="月" label="月" width="120"></el-table-column>
                    <el-table-column prop="日" label="日" width="120"></el-table-column>
                  </el-table-column>
                  <el-table-column prop="页码" label="页码" width="200"></el-table-column>
                  <el-table-column prop="整理人" label="整理人" width="200"></el-table-column>
                </el-table>
              </div>
              <h1 class="firseTitle">第二部分目录</h1>
              <div class="firstMode">
                <el-table :data="secondPart" style="width: 100%">
                  <el-table-column prop="材料名称" label="材料名称"></el-table-column>
                  <el-table-column label="材料时间">
                    <el-table-column prop="年" label="年" width="120"></el-table-column>
                    <el-table-column prop="月" label="月" width="120"></el-table-column>
                    <el-table-column prop="日" label="日" width="120"></el-table-column>
                  </el-table-column>
                  <el-table-column prop="页码" label="页码" width="200"></el-table-column>
                  <el-table-column prop="整理人" label="整理人" width="200"></el-table-column>
                </el-table>
              </div>
            </div>
            <PositionHorn />
          </div>
        </div>
        <div class="finishModel" v-show="isShowFinish">
          <div>
            <h4>
              <span>处理结果</span>
              <span class="point close" @click="close">×</span>
            </h4>
            <div class="finishCon">
              <div>
                <i class="el-icon-question"></i>
              </div>
              <div>是否完成建档？</div>
              <button class="point" @click="sureBuild">确定</button>
            </div>
          </div>
        </div>
        <div class="hasDataModel" v-show="isHasData">
          <div>
            <h4>
              <span>处理结果</span>
              <span class="point close" @click="close">×</span>
            </h4>
            <div class="finishCon">
              <div style="text-align:center">
                <i class="el-icon-info"></i>
                <span style="display:block;font-size:15px;">异常情况提示</span>
              </div>
              <div style="width:400px;">
                <div>
                  <h6>缺件材料名称</h6>
                  <div>{{emptyMaterial}}</div>
                </div>
                <div>
                  <h6>空目录名称</h6>
                  <div>{{emptyCatalog}}</div>
                </div>
              </div>
              <div>
                <button class="backBuild point" @click="goBackBuild">返回建档</button>
                <button class="point" @click="sureBuild">完成建档</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="matchCatalog" v-if="matchModel">
      <div style="height:750px;width:1400px;background:rgba(5,27,74,1);margin:100px auto;position:relative;z-index:9">
        <h3>匹配目录<span class="close" @click="closeMatch">×</span></h3>
        <div style="margin:0 16px;">
          <el-table
          :data="tableData"
          border
          style="width: 100%"
          max-height="580px">
            <el-table-column
              prop="二分法目录"
              label="二分法目录"
              width="320">
            </el-table-column>
            <el-table-column
              prop="一级节点"
              label="一级节点">
              <template slot-scope="scope">
                 <el-select v-model="scope.row.matchvalue1" placeholder="请选择">
                  <el-option
                    v-for="item in matchoption1"
                    :key="item.材料代码"
                    :label="item.材料名称"
                    :value="item.材料代码">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="二级节点"
              label="二级节点">
              <template slot-scope="scope">
                 <el-select v-model="scope.row.matchvalue2" placeholder="请选择">
                  <el-option
                    v-for="item in matchoption2"
                    :key="item.材料代码"
                    :label="item.材料名称"
                    :value="item.材料代码">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="二级节点"
              label="三级节点">
              <template slot-scope="scope">
                <el-select v-model="scope.row.matchvalue3" placeholder="请选择">
                  <el-option
                    v-for="item in matchoption3"
                    :key="item.材料代码"
                    :label="item.材料名称"
                    :value="item.材料代码">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <button class="finishMatch" @click="finishMatch">完成</button>
        <PositionHorn />
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import PositionHorn from "@/components/Postion_Horn";
// import Copper from "./copper";
import Cropper from "cropperjs";
export default {
  name: "stage",
  data() {
    return {
      matchModel: false,
      tableData: [
        {
          '二分法目录': '2019履历表',
          matchvalue1: '',
          matchvalue2: '',
          matchvalue3: ''
        },
        {
          '二分法目录': '2019履历表',
          matchvalue1: '',
          matchvalue2: '',
          matchvalue3: ''
        },
        {
          '二分法目录': '2019履历表',
           matchvalue1: '',
          matchvalue2: '',
          matchvalue3: ''
        }
      ],
      matchvalue1: '',
      matchvalue2: '',
      matchvalue3: '',
      matchoption1: [],
      matchoption2: [],
      matchoption3: [],
      imgCountArrayItem: 1,
      parentmulu: "",
      dragEnabled: false,
      drag: false,
      haveNewImg: false,
      editImgShow: true,
      imgMsg: [],
      // 缩略图缩小/放大
      suoluetuFlag: false,
      imgClassNameArray: [],
      imgUploadParams: [],
      imgCountArray: [1],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      data: [],
      twoTree: [],
      fileimgs: {},
      imgarr: [],
      tenTree: [],
      userInfo: {},
      defaultProps: {
        children: "children",
        label: "材料名称",
        id: "UUID"
      },
      radio: false,
      type: true,
      clmc: "",
      did: true,
      sCode: "",
      zDes: "",
      mDes: "",
      mName: "",
      zName: "",
      lName: "",
      lDes: "",
      code: "",
      secondmulu: [],
      firstmulu: [],
      sqwinType: 1,
      firstclmc: "",
      secondclmc: "",
      sqwinShow: false, //申请添加弹窗
      materialName: "",
      build: true,
      isShow: true, //判断扫描材料和新建材料页面切换
      isReadOnlyInput: true, //控制input是否可编辑
      isShowInput: false, //判断属性是否显示
      isShowBtn: false, //判断确定和取消按钮是否显示
      imgs: {}, //扫描图片页面导入的图片对象
      imgLen: 0, //图片个数
      bigimgUrl: "", //大图图片路径
      treeSelectNode: {}, //左侧树形菜单选中节点
      winIsShow: false, //添加目录的弹窗是否显示
      clIsShow: false, //控制添加材料是否显示
      viewIsShow: false, //控制目录总览弹窗的显示
      pviewIsShow: false, //控制预览目录弹窗的显示
      imgEditShow: false,
      withCredentials: true,
      params: {
        size: 5 * 1024 * 1024
      },
      headers: {
        smail: "*_~"
      },
      zh: {
        preview: "预览"
      },
      overviewList: [],
      detailRuleForm: {
        coverImg: ""
      },
      headerImage: "",
      picValue: "",
      cropper: "",
      croppable: false,
      panel: false,
      url: "",
      color: "#d9d9d9",
      current: 0,
      shifenfa: [],
      erfenfa: {},
      secondTree: [],
      thirdTree: [],
      marterial_name: "",
      marterial_class: "",
      basePropData: [],
      properPropData: [],
      defaultPropValue: [],
      dialogDiv: true,
      baseData: [],
      properData: [],
      baseEdit: [],
      properEdit: [],
      firstPart: [],
      secondPart: [],
      isShowFinish: false,
      isHasData: false,
      emptyMaterial: "",
      emptyCatalog: "",
      materialInfo: [],
      activeIndex: "",
      activeIndex1: "",
      isSecondMaterial: false,
      xcDate: "",
      cropperImg: "",
      imgName: "",
      cropper: {},
      filesimg: [],
      cropperFlag: true,
      filename: "",

      initParam: {
        fileType: "recruit", // 其他上传参数

        uploadURL: "", // 上传地址

        scale: 1 // 相对手机屏幕放大的倍数: 4倍
      },
      thirdValue: {
        序号: 0,
        材料代码: "",
        材料名称: "",
        父代码: ""
      },
      thirdValue1: {
        序号: 0,
        材料代码: "",
        材料名称: "",
        父代码: ""
      },
      thirdTree1: [],
      thirdCode: "",
      thirdCode1: "",
      IsCropper: false,
      imageUrl: "",
      wanchengjiandang: false,
      currentNode: {},
      picDeg: 0 //裁剪旋转角度
    };
  },
  components: {
    PositionHorn,
    draggable
    // Copper
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  created() {
    // this.getResult()
    this.userInfo = JSON.parse(document.cookie.split("=")[1]);
    this.getTree();
    // this.queryCondition()
    // this.getAttrList()//10.11添加暂放专有属性的假数据
    this.imgs = {}; //10.12添加初始化上传图片的对象清空
    this.$nextTick(function() {
      this.$data.data.forEach(row => {
        if (row.show) {
          this.$refs.tree.setCurrentKey(row.id);
          this.$refs.tree.store.nodesMap[row.id].expanded = true;
        }
      });
    });

    // this.getTwo()
    // this.getTen()
    //v-if="!$route.query.daily || !$route.query.state =='已完成'"
    if (this.$route.query.daily == "1" || this.$route.query.state == "已完成") {
      this.wanchengjiandang = false;
    } else {
      this.wanchengjiandang = true;
    }
  },
  methods: {
    match () {
      this.matchModel = true
      this.$api.build
      .findMaterialTypeMenu({
        cldm: ""
      })
      .then(data => {
        this.matchoption1 = data.first;
      });
    },
    finishMatch() {
      this.matchModel = false
    },
    closeMatch () {
      this.matchModel = false
    },
    allowDrop(draggingNode, dropNode, type) {
      return type !== 'inner'
    },
    handleDragStart(node, ev) {
      // if (node.data.父代码) {
      //   this.dragNodeLevel = '一级'
      // } else {
      //   this.dragNodeLevel = '二级'
      //   this.dragNode = node.data.UUID
      // }
      // console.log('drag start', node);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      let nulu = []
      if (draggingNode.data.父代码) {
        this.dragNodeLevel = '一级'
        this.tenTree.forEach((item, index) => {
          nulu.push(item.UUID)
        })
      } else {
        let childIndex = 0
        this.dragNodeLevel = '二级'
        this.tenTree.forEach((item, index) => {
          item.children.forEach((item2, index2) => {
            if (item2.UUID === draggingNode.data.UUID) {
              childIndex = index
            }
          })
        })
        this.tenTree[childIndex].children.forEach((item, index) => {
          nulu.push(item.UUID)
        })
      }
      this.$api.build.mulupaixu({
        sfh: this.$route.query.sfh,
        type: this.dragNodeLevel,
        nulu
      }).then(data => {
        this.$message({
          message: data.message,
          type: 'success'
        });
      });
    },
    getproperProp () {
      if (this.marterial_class) {
          this.$api.build.getMaterial({
            cailiao: this.marterial_class
          }).then(data => {
          this.basePropData = data["通用字段"].sort((a, b) => {
            return a["序号"] - b["序号"];
          }).map((item, index) => {
              item[item["字段名称"]] = "";
              return item;
          });
          this.properPropData = data["专属字段"].sort((a, b) => {
            return a["序号"] - b["序号"];
          });
          // this.defaultPropValue = JSON.parse(
          //   data["通用字段默认值"][0]["基础属性默认值"]
          // );
          this.basePropData.forEach((item, index) => {
            for (var key in this.defaultPropValue) {
              item[key] = this.defaultPropValue[key];
            }
          });
        });
      } else {
        this.$api.build.getMaterial().then(data => {
          this.basePropData = data["通用字段"].sort((a, b) => {
            return a["序号"] - b["序号"];
          }).map((item, index) => {
              item[item["字段名称"]] = "";
              return item;
          });
          this.properPropData = data["专属字段"].sort((a, b) => {
            return a["序号"] - b["序号"];
          });
          // this.defaultPropValue = JSON.parse(
          //   data["通用字段默认值"][0]["基础属性默认值"]
          // );
          this.basePropData.forEach((item, index) => {
            for (var key in this.defaultPropValue) {
              item[key] = this.defaultPropValue[key];
            }
          });
        });
      }
    },
    changeThird (e) {
      this.thirdValue = e
      this.thirdCode = e['材料代码']
      this.basePropData[0]['材料名称'] = e['材料名称']
      console.log(e)
    },
    changeThird1 (e) {
      this.thirdValue1 = e
      this.thirdCode1 = e['材料代码']
      this.baseEdit[0]['材料名称'] = e['材料名称']
    },
    changeSecond () {
      this.$api.build.getTreeList({
          fudaima1: this.marterial_class
      })
      .then(data => {
        // this.secondTree = data["目录"];
        this.thirdTree = data["目录"]
        this.thirdTree.unshift({
          '材料名称': '自定义',
          '序号': 0,
          '材料代码': 0,
          '父代码': this.marterial_class 
        })
        this.getproperProp()
      });
    },
    changeParent () {
      this.$api.build
        .getTreeList({
          fudaima1: this.parentmulu
        })
        .then(data => {
          this.secondTree = data["目录"];
          // this.thirdTree = data["目录"];
        });
    },
    // 排序图片
    dragImg() {
      if (this.haveNewImg) {
        this.$message({
          message: '请先上传至目录后再进行排序！',
          type: 'warning'
        });
      } else if (!this.editImgShow) {
        this.$message({
          message: '请完成编辑后再进行排序！',
          type: 'warning'
        });
      } else {
        this.dragEnabled = !this.dragEnabled
      }
    },
    completeDragImg() {
      this.dragEnabled = !this.dragEnabled
      let dragParams = JSON.parse(JSON.stringify(this.imgCountArray))
      dragParams.length = dragParams.length - 1
      this.$api.build.tupianpaixu({
        UUID: dragParams
      }).then(data => {
        this.$message({
          message: data.message,
          type: 'success'
        });
        this.imageListquery()
      });
    },
    // 编辑图片
    editImg() {
      if (this.dragEnabled) {
        this.$message({
          message: '请完成排序后再进行编辑！',
          type: 'warning'
        });
      } else {
        this.editImgShow = !this.editImgShow
      }
    },
    completeEditImg() {
      this.editImgShow = !this.editImgShow
    },
    // 删除图片
    deleteImg(e) {
      if (this.haveNewImg) {
        this.$message({
          message: '请先上传至目录后再进行删除！',
          type: 'warning'
        });
      } else {
        let imgIndex = e.target.parentNode.lastChild.classList[1].substring(6)
        let uuid = this.imgMsg[imgIndex].UUID
        let fuuid = this.imgMsg[imgIndex].材料UUID
        let fileName = this.imgMsg[imgIndex].全名称
        this.$api.build.deleteImage({
          uuid,
          fuuid,
          fileName,
          benrensfh: this.userInfo["身份号"],
          sfh: this.sfh,
        }).then(data => {
          this.imageListquery()
        });
      }
    },
    // 放大/缩小缩略图
    suoluetuBigger() {
      this.$refs.left_img.style.width = "100%"
      this.suoluetuFlag = !this.suoluetuFlag;
    },
    suoluetuSmaller() {
      this.$refs.left_img.style.width = "200px"
      this.suoluetuFlag = !this.suoluetuFlag;
    },
    // 上传图片
    imgUpload(e) {
      console.log(e)
      let className = e.target.classList[1];
      let imgClassName = "imgDom" + className.substring(9);
      let inputFiles = document.querySelector("." + className).files;
      let imgCount = document.getElementsByClassName("imgBox").length;
      if (this.imgClassNameArray.includes(imgClassName)) {
        // 替换
        console.log('替换')
        if (inputFiles.length === 1) { // 替换时只允许上传一张图片
          let imgIndex = this.imgClassNameArray.indexOf(imgClassName);
          if (this.imgMsg[imgIndex]) { // 修改已经上传服务器的文件
            let uuid = this.imgMsg[imgIndex].UUID
            let updateFormData = new FormData();
            updateFormData.append("file", e.target.files[0])
            updateFormData.append("uuid", uuid)
            updateFormData.append("benrensfh", this.userInfo["身份号"])
            updateFormData.append("sfh",  this.sfh)
            this.$api.build.updateImage(updateFormData).then(data => {
              this.$message({
                message: data[0].message,
                type: 'success'
              });
              this.imageListquery()
            });
          } else { // 修改未上传服务器的文件
            let imgUrl = this.getImgURL(document.querySelector("." + className).files[0]);
            this.$nextTick(() => {
              document.getElementsByClassName("imgDom" + imgIndex)[0].src = imgUrl;
            });
            // 修改图片流组成的数组
            this.imgUploadParams[imgIndex] = e.target.files[0];
            this.haveNewImg = true
          }
        } else {
          this.$message({
            message: '请选择一张图片替换原图片！',
            type: 'warning'
          });
        }
      } else {
        console.log('新增')
        // 新增
        for (let i = 0; i < inputFiles.length; i++) {
          // 计数数组 渲染多个上传框 无实际意义
          this.imgCountArrayItem++
          this.imgCountArray.push(this.imgCountArrayItem);
          let imgUrl = this.getImgURL(
            document.querySelector("." + className).files[i]
          );
          this.$nextTick(() => {
            document.getElementsByClassName(
              "imgDom" + (imgCount - 1 + i)
            )[0].src = imgUrl;
          });
          this.imgClassNameArray.push("imgDom" + (imgCount - 1 + i));
        }
        this.haveNewImg = true
        // 图片流组成数组格式
        for (let i = 0; i < e.target.files.length; i++) {
          this.imgUploadParams.push(e.target.files[i]);
        }
      }
      console.log(666, this.imgCountArray)
    },
    getImgURL(file) {
      let getUrl = null;
      if (window.createObjectURL !== undefined) {
        // basic
        getUrl = window.createObjectURL(file);
      } else if (window.URL !== undefined) {
        // mozilla(firefox)
        getUrl = window.URL.createObjectURL(file);
      } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        getUrl = window.webkitURL.createObjectURL(file);
      }
      return getUrl;
    },
    deleteFilebtn(e) {},

    sureApp() {
      if (this.sqwinType == 1) {
        this.$api.build
          .addMaterialType({
            sfh: this.userInfo["身份号"],
            clmc: this.lName,
            sqms: this.lDes,
            imgUrl: "",
            cldm: this.code,
            lbmc: this.firstclmc
          })
          .then(data => {
            this.sqwinShow = false;
            this.lName = "";
            this.lDes = "";
            this.firstclmc = "";
            this.code = "";
            this.$message(data.message);
          });
      } else if (this.sqwinType == 2) {
        this.$api.build
          .addMaterialName({
            sfh: this.userInfo["身份号"],
            clmc: this.mName,
            sqms: this.mDes,
            imgUrl: "",
            cldm: this.sCode,
            lbmc: this.secondclmc
          })
          .then(data => {
            this.sqwinShow = false;
            this.mName = "";
            this.mDes = "";
            this.secondclmc = "";
            this.sCode = "";
            this.$message(data.message);
          });
      } else {
        this.$api.build
          .addMaterialAttribute({
            sfh: this.userInfo["身份号"],
            clmc: this.zName,
            sqms: this.zDes,
            imgUrl: "",
            cldm: this.sCode,
            lbmc: this.secondclmc
          })
          .then(data => {
            this.sqwinShow = false;
            this.zName = "";
            this.zDes = "";
            this.secondclmc = "";
            this.sCode = "";
            this.$message(data.message);
          });
      }
    },
    shAdd(type) {
      this.sqwinShow = true;
      if (type == 1) {
        this.sqwinType = 1;
      } else if (type == 2) {
        this.sqwinType = 2;
      } else if (type == 3) {
        this.sqwinType = 3;
      }
      this.$api.build
        .findMaterialTypeMenu({
          cldm: ""
        })
        .then(data => {
          this.firstmulu = data.first;
        });
    },
    firstChange() {
      this.$api.build
        .findMaterialTypeMenu({
          cldm: this.code
        })
        .then(data => {
          this.secondmulu = data.first;
        });
      var clmc = this.firstmulu.find((item, index) => {
        return item["材料代码"] === this.code;
      });
      this.firstclmc = clmc["材料名称"];
    },
    secondChange() {
      var clmc = this.secondmulu.find((item, index) => {
        return item["材料代码"] === this.sCode;
      });
      this.secondclmc = clmc["材料名称"];
    },
    //处理上传图片
    // handleAvatarSuccess(res, file) {
    //     console.log('111',res, file)
    //     this.imageUrl = URL.createObjectURL(file.raw);
    //     console.log(' this.imageUrl', this.imageUrl)
    //     // this.ruleAddPoolForm.icon =
    //     //     this.$store.state.baseUrl + file.response.RelativeUrl;
    // },
    // deleteImageUpload(arr){
    //     console.log('arr',arr)
    //
    // },
    //查询图片
    imageListquery() {
      this.imgCountArray = [];
      this.$api.build.imageList({
        uuid: this.uuid
      }).then(data => {
        let timestamp = new  Date().getTime()
        this.imgMsg = data
        data.forEach((item, index) => {
          this.imgClassNameArray.push("imgDom" + index);
          // 计数数组 渲染列表 无实际意义
          this.imgCountArray.push(item.UUID);
          let img = document.getElementsByClassName("imgDom" + index);
          this.$nextTick(() => {
            img[0].src ="http://develop.gangwaninfo.com:9999" + item.原始图像路径;
          })
        });
        this.imgCountArray.push(1);
      });
    },
    //上传目录的接口
    uploadmulu() {
      //把上传获取到的file文件放到formdata里面  传到后台
      if (this.imgUploadParams.length === 0) {
        this.$message({
          message: '请选择需要上传的新图片后再上传至目录！',
          type: 'warning'
        });
      } else {
        let formData = new FormData();
        for (var i = 0; i < this.imgUploadParams.length; i++) {
          formData.append("file", this.imgUploadParams[i]);
        }
        formData.append("sfh", this.sfh);
        formData.append("uuid", this.uuid);
        formData.append("type", "uploadYuan");
        formData.append("benrensfh", this.userInfo["身份号"]);
        // let obj = {"type": 'uploadYuan', "uuid": this.uuid, "sfh": this.sfh}
        this.$api.build.uploadFileToFuWuQi(formData).then(data => {
          this.imgUploadParams = []
          this.imgClassNameArray = []
          this.haveNewImg = false
          this.$message({
            message: data[0].message,
            type: 'success'
          });
          this.imageListquery()
        });
      }
    },
    init(size) {
      let cropperImg = this.$refs["cropperImg"];

      this.cropper = new Cropper(cropperImg, {
        aspectRatio: size,

        cropBoxResizable: false,

        center: false,
        highlight: true,
        guides: true,
        center: true,
        guides: false,
        autoCrop: true,
        cropBoxMovable: false,

        autoCropArea: 0.8,

        rotatable: true,

        dragMode: "move",

        viewMode: 1
      });
    },

    initCropper() {
      let cropper = new Cropper(this.$refs.img, {
        viewMode: 1,
        aspectRatio: 16 / 9
      });
      this.cropper = cropper;
    },

    //OCR图片放大缩小功能(所有图片div通用，通过jQuery的id绑定操作)
    imgToSize(imgId, event) {
      alert(1);
      //通过这个值与零的大小比较，可以知道鼠标的滚轮滚动的方向
      var deltaY = event.deltaY;
      var size = 0;
      if (deltaY > 0) {
        size = -100;
      } else if (deltaY < 0) {
        size = 100;
      }
      var img = $("#" + imgId.id);
      //取得图片的实际宽度
      var oWidth = img.width();
      //取得图片的实际高度
      var oHeight = img.height();
      //赋予改变后的值
      img.width(oWidth + size);
      img.height(oHeight + (size / oWidth) * oHeight);
    },

    handleRemove(file) {
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
    },
    marterLook(index, data) {
      data.type = data["二分法_类别"];
      data.id = data["材料代码"];
      data.uuid = data.UUID;
      this.uuid = data.uuid;
      this.imageListquery();
      this.treeSelectNode = data;
      this.activeIndex = index;
      this.activeIndex1 = "";
      if (data) {
        this.dialogDiv = false;
        this.isShowInput = true;
        this.isShowBtn = false;
        this.clIsShow = false;
        this.$api.build.getMaterialData({
          uuid: data.uuid
        }).then(data => {
          if (data.length !== 0) {
            this.baseData = JSON.parse(data[0]["通用属性值"]);
            this.properData = JSON.parse(data[0]["专有属性值"]);
            this.baseEdit = JSON.parse(data[0]["通用属性值"]);
            this.properEdit = JSON.parse(data[0]["专有属性值"]);
          }
        });
      } else {
        this.dialogDiv = true;
      }
    },
    marterLook1(index, data) {
      data.type = data["二分法_类别"];
      data.id = data["材料代码"];
      data.uuid = data.UUID;
      this.uuid = data.uuid;
      this.imageListquery();
      this.treeSelectNode = data;
      this.activeIndex1 = index;
      this.activeIndex = "";
      if (data) {
        this.dialogDiv = false;
        this.isShowInput = true;
        this.isShowBtn = false;
        this.clIsShow = false;
        this.$api.build
          .getMaterialData({
            uuid: data.uuid
          })
          .then(data => {
            this.baseData = JSON.parse(data[0]["通用属性值"]);
            this.properData = JSON.parse(data[0]["专有属性值"]);
            this.baseEdit = JSON.parse(data[0]["通用属性值"]);
            this.properEdit = JSON.parse(data[0]["专有属性值"]);
          });
      } else {
        this.dialogDiv = true;
      }
    },
    backBuild() {
      this.isHasData = false;
    },
    goBackBuild () {
      this.isHasData = false
    },
    sureBuild() {
      this.$api.build.sureBuild({
        sfh: this.$route.query.sfh,
        name: this.$route.query.name,
        danganhao: this.$route.query.danganID,
        danwei: this.$route.query.danwei,
        cailiaoxinxi: JSON.stringify(this.materialInfo),
        jgmcm: this.$route.query.jgmcm,
        scrsfh: this.userInfo["身份号"],
        scrname: this.userInfo["姓名"],
        scrjgmcm: this.userInfo["机构名称码"]
      }).then(data => {
        this.isHasData = false
        this.$message({
          message: data.message,
          type: 'success'
        });
      });
    },
    back() {
      this.$router.back();
    },
    finishBuild() {
      this.$api.build.finishBuild({
        sfh: this.$route.query.sfh
      }).then(data => {
        if (data.message) {
          this.isHasData = true;
          console.log(this.isHasData)
          this.materialInfo = data["数据"]["三级空材料"]
            ? data["数据"]["三级空材料"]
            : [];
          this.emptyMaterial = data["数据"]["三级空材料"]
            .map((item, index) => {
              return item["材料名称"];
            })
            .join("、");
          this.emptyCatalog = data["数据"]["二级空目录"]
            .map((item, index) => {
              return item["材料名称"];
            })
            .join("、");
        } else {
          this.isShowFinish = true;
        }
      });
    },
    saveEdit() {
      // let date = new Date()
      // let y = date.getFullYear()
      // let m = date.getMonth() + 1
      // let d = date.getDate()
      this.baseEdit.forEach((item, index) => {
        if (item["字段名称"] === "是否第二部分材料") {
          this.isSecondMaterial = item[item["字段名称"]];
        }
      });
      this.baseEdit.forEach((item, index) => {
        if (item["字段名称"] === "形成时间") {
          this.xcDate = item[item["字段名称"]].split("T")[0];
        }
      });
      if (this.thirdValue1.材料名称 === '自定义') {
         this.$api.build
        .saveMaterial({
          sfh: this.$route.query.sfh,
          cailiaodaima: this.currentNode.材料代码,
          uuid: this.currentNode.UUID,
          xcdate: this.xcDate,
          cailiaoname: this.baseEdit[0]["材料名称"],
          tyzdz: JSON.stringify(this.baseEdit),
          zyzdz: JSON.stringify(this.properEdit),
          dichotomyType: this.isSecondMaterial ? 2 : 1
        })
        .then(data => {
          this.$message("保存成功");
          this.isShowBtn = false;
          this.getTree();
        });
      } else {
         this.$api.build
        .saveMaterial({
          sfh: this.$route.query.sfh,
          cailiaodaima: this.thirdCode1,
          uuid: this.currentNode.UUID,
          xcdate: this.xcDate,
          cailiaoname: this.baseEdit[0]["材料名称"],
          tyzdz: JSON.stringify(this.baseEdit),
          zyzdz: JSON.stringify(this.properEdit),
          dichotomyType: this.isSecondMaterial ? 2 : 1
        })
        .then(data => {
          this.$message("保存成功");
          this.isShowBtn = false;
          this.getTree();
        });
      }
     
    },
    directoryOverview() {
      this.$api.build
        .muluzonglan({
          sfh: this.$route.query.sfh
        })
        .then(data => {
          this.overviewList = data;
          if( this.overviewList){
              this.overviewList.forEach(function (ele) {
                  if( ele.children){
                      ele.children.forEach(function (ele) {
                          // console.log(ele, "目录总览2");
                          if( ele.children){
                              ele.children.forEach(function (ele) {
                                  // console.log(JSON.parse(ele.通用属性值), "目录总览4");
                                  if(JSON.parse(ele.通用属性值)){
                                      JSON.parse(ele.通用属性值).forEach(function (ele) {
                                          if(ele.时间 !== null){
                                              var year =  ele.时间.substr(0, 4)
                                              var month =  ele.时间.substr(5, 2)
                                              var day =  ele.时间.substr(8, 2)
                                              var hour =  ele.时间.substr(11, 2)
                                              var min =  ele.时间.substr(14, 2)
                                              ele.时间 = year + "-" + month + "-" + day + " " + hour + ":" + min + ""
                                      }
                                      })
                                  }


                              })
                          }

                      })
                  }
                  },

              )
          }
            // e['通用属性值']
        });
    },
    getTree() {
      this.tenTree = [];
      this.twoTree = [];
      this.$api.build
        .tenTree({
          sfh: this.$route.query.sfh
        })
        .then(data => {
          if (data.length === 0) {
            this.type = false
          }
          this.tenTree = data.map((item) => {
            item['材料名称'] = item['显示序号'] + '、' + item['材料名称']
            return item
          })
          console.log(data, "档案目录树");
          this.build = false;
        });
      this.$api.build
        .twoTree({
          sfh: this.$route.query.sfh
        })
        .then(data => {
          console.log(data, "二分法目录树");
          this.twoTree = data;
        });
    },
    birthTree() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      this.$api.build
        .createTree({
          sfh: this.$route.query.sfh,
          dah: this.$route.query.danganID,
          date: y + "-" + m + "-" + d,
          laiyuantype: this.$route.query.type
        })
        .then(data => {
          this.getTree();
          this.build = false;
        });
    },
    // newString (ten,two) {
    //   let date = new Date()
    //   let y = date.getFullYear()
    //   let m = date.getMonth() + 1
    //   let d = date.getDate()
    //   this.$api.build.addrenyuanmulu({
    //     sfh: this.$route.query.sfh,
    //     date: y+ '-' + m + '-' + d,
    //     shifenfa: JSON.stringify(ten),
    //     erfenfa: JSON.stringify(two)
    //   }).then(()=>{
    //     this.getTree()
    //   })
    // },
    changeType(type) {
      if (type === 1) {
        this.type = true;
      } else {
        this.type = false;
      }
    },
    handleNodeClick(data) {
      // console.log(this.$refs.tree.getCheckedKeys(),'节点')
      console.log(data, '节点')
      this.currentNode = data
      this.sfh = data.身份号;
      // 通用属性-根目录-材料类别展示所需要的数据
      if (!data['大类代码']){
        this.parentmulu = data['材料代码'];
      } else {
        this.parentmulu = data['大类代码'];
        this.thirdCode = data['材料代码']
      }
      // 获取三级常见材料名称下拉数据
      // 先获取材料类别下拉数据
      this.$api.build.getTreeList({
        fudaima1: this.parentmulu
      }).then(data => {
        this.secondTree = data["目录"];
        // this.thirdTree = data["目录"];
      });
      // 判断点击的数据是否为三级材料， 如果是则获取常见材料名称的下拉数据
      if (data['大类代码']) {
        // this.marterial_class = data['材料代码']
        this.$api.build.getTreeList({
          fudaima1: this.marterial_class
        }).then(data => {
          // this.secondTree = data["目录"];
          this.thirdTree = data["目录"];
        });
      }
     
      this.uuid = data.UUID;
      this.imageListquery();
      this.treeSelectNode = data;
      if (data['大类代码']) {
        this.dialogDiv = false;
        this.isShowInput = true;
        this.isShowBtn = false;
        this.clIsShow = false;
        this.$api.build
          .getMaterialData({
            uuid: data.UUID,
            sfh: this.$route.query.sfh,
            daima: this.thirdCode
          })
          .then(data => {
            this.marterial_class = ''
            this.baseData = JSON.parse(data[0]["通用属性值"]);
            this.properData = JSON.parse(data[0]["专有属性值"]);
            this.baseEdit = JSON.parse(data[0]["通用属性值"]);
            this.properEdit = JSON.parse(data[0]["专有属性值"]);
            this.marterial_class = data[0]["类别代码"]
          });
      } else {
        this.dialogDiv = true;
      }
      // this.$refs.tree.setCurrentKey(data.id)
    },
    newBuild() {
      this.did = false;
      this.clmc = "";
      //先判断选中的是否是二级节点
      // if (data.type === 1) {
      //   this.dialogDiv = false
      // } else {
      //   this.dialogDiv = true
      // }
      this.dialogDiv = false;
      this.clIsShow = true;
      this.isShowInput = false;
      this.isShowBtn = false
      this.$api.build
        .getTreeList({
          fudaima1: this.parentmulu
        })
        .then(data => {
          this.secondTree = data["目录"];
          // this.marterial_class = ''
          // this.thirdTree = data["目录"];
        });
        if (this.currentNode['大类代码']) {
          this.$api.build
          .getTreeList({
            fudaima1: this.marterial_class
          })
          .then(data => {
            // this.secondTree = data["目录"];
            this.thirdTree = data["目录"];
            this.thirdTree.unshift({
              '材料名称': '自定义',
              '序号': 0,
              '材料代码': 0,
              '父代码': this.marterial_class 
            })
            this.thirdValue = {}
          });
        }
          this.getproperProp()
       
        

      // this.$api.build
      //   .getTreeList({
      //     fudaima1: this.parentmulu
      //   })
      //   .then(data => {
      //     this.secondTree = data["目录"];
      //     // this.thirdTree = data["目录"];
      //   });
    },
    newType() {
      this.winIsShow = true;
      this.mlIsShow = true;
      this.$api.build
        .getTreeList({
          fudaima1: this.treeSelectNode.id
        })
        .then(data => {
          this.secondTree = data["目录"];
          this.thirdTree = data["目录"];
        });
      //先判断选中的是否是一级节点
    },
    addNode() {
      //获取当前已选中的节点id
      //this.$refs.tree.getCurrentNode.id;
      var nowDate = new Date();
      var year = nowDate.getFullYear();
      var month = nowDate.getMonth() + 1;
      var day = nowDate.getDate();
      var hour = nowDate.getHours();
      var min = nowDate.getMinutes();
      this.$api.build
        .addClass({
          sfh: this.treeSelectNode.sfh,
          danganhao: this.treeSelectNode.danganID,
          daima: this.marterial_class,
          danwei: this.userInfo["部别"],
          czr: this.userInfo["身份号"],
          IP: "",
          date: year + "-" + month + "-" + day + " " + hour + ":" + min,
          jgmcm: this.userInfo["机构名称码"]
        })
        .then(data => {
          // this.newString(data['十分法'],data['二分法_类别'])
          this.$message("类别添加成功");
          this.getTree();
        });
      //获取当前添加的数据对象
      //添加目录
      // if (type == 0) {

      // }else{//添加材料
      //   //调用接口保存返回保存的id
      //   //接口执行成功后页面tree添加节点
      // }
      //暂用假数据
      // this.$refs.tree.append({id: 1, label: '一、履历类材料'},this.treeSelectNode.id)
      this.winIsShow = false;
      this.clIsShow = false;
    },
    cancel() {
      this.did = true;
      this.isReadOnlyInput = true;
      this.isShowBtn = false;

      if (this.treeSelectNode.type === 1 || this.treeSelectNode.type === 2) {
        this.isShowInput = true;
        this.dialogDiv = false;
      } else {
        this.isShowInput = false;
        this.dialogDiv = true;
      }
    },
    scanMaterial() {
      //this.$router.push('/home/backstage/scan_material')
      this.isShow = false;
    },
    close() {
      this.isShowFinish = false;
      this.isHasData = false;
    },
    toChinese(num) {
      switch (num) {
        case 1:
          return "一";
          break;
        case 2:
          return "二";
          break;
        case 3:
          return "三";
          break;
        case 4:
          return "四";
          break;
        case 5:
          return "五";
          break;
        case 6:
          return "六";
          break;
        case 7:
          return "七";
          break;
        case 8:
          return "八";
          break;
        case 9:
          return "九";
          break;
        case 10:
          return "十";
          break;
      }
    },
    upload() {
      this.uploadModel = true;
    },
    imgOpt() {
      this.$router.push("/home/backstage/image_opt");
    },
    buildpage() {
      this.isShow = true;
    },
    overviewDir() {
      this.viewIsShow = true; // 显示目录总览弹框
      this.directoryOverview();
    },
    closeWiewWin(type) {
      if (type == 0) {
        this.viewIsShow = false;
      } else {
        this.pviewIsShow = false;
      }
    },
    previewDir() {
      this.pviewIsShow = true;
      // 预览目录
      this.$api.build
        .yulanmulu({
          sfh: this.$route.query.sfh
        })
        .then(data => {
          data["固定目录"] = data["固定目录"].map((item, index) => {
            this.editData(item);
            return {
              年: item["年"],
              月: item["月"],
              日: item["日"],
              整理人: item["整理人"],
              材料名称: item["材料名称"],
              页码: item["页码"]
            };
          });
          data["目录一"] = data["目录一"].map((item, index) => {
            this.editData(item);
            return {
              年: item["年"],
              月: item["月"],
              日: item["日"],
              整理人: item["整理人"],
              材料名称: item["材料名称"],
              页码: item["页码"]
            };
          });
          data["目录二"] = data["目录二"].map((item, index) => {
            this.editData(item);
            return {
              年: item["年"],
              月: item["月"],
              日: item["日"],
              整理人: item["整理人"],
              材料名称: item["材料名称"],
              页码: item["页码"]
            };
          });
          this.firstPart = data["固定目录"].concat(data["目录一"]);
          // 页码数据
          this.firstPart = this.firstPart.map((item, index) => {
            // if(index>0){
            //   this.firstPart[index]['页码'] = Number(this.firstPart[index1]['页码']) -  Number( this.firstPart[index]['页码'])
            // }
            return item;
          });
          this.secondPart = data["目录二"];
        });
    },
    editData(item) {
      JSON.parse(item["通用属性值"]).forEach((v, i) => {
        if (v["字段名称"] === "材料名称") {
          item["材料名称"] = v[v["字段名称"]];
        }
        if (v["字段名称"] === "形成时间") {
          item["年"] = new Date(v[v["字段名称"]]).getFullYear();
          item["月"] = new Date(v[v["字段名称"]]).getMonth() + 1;
          item["日"] = new Date(v[v["字段名称"]]).getDate();
        }
        if (v["字段名称"] === "整理人") {
          item["整理人"] = v[v["字段名称"]];
        }
        if (v["字段名称"] === "页数") {
          item["页码"] = v[v["字段名称"]];
        }
      });
    },
    editBuild() {
      this.isReadOnlyInput = false;
      this.isShowInput = false;
      this.isShowBtn = true;
      this.clIsShow = false
      this.$api.build.getTreeList({
          fudaima1: this.marterial_class
      }).then(data => {
          // this.secondTree = data["目录"];
          this.thirdTree1 = data["目录"];
          this.thirdTree1.unshift({
            '材料名称': '自定义',
            '序号': 0,
            '材料代码': 0,
            '父代码': this.marterial_class 
          })
          this.thirdValue1 = {}
        });
    },
    submitEdit() {
      //将编辑的数据传入保存接口
      //保存成功后变为不可编辑（查看）状态
      // alert("保存成功");

      this.isReadOnlyInput = true;
      this.isShowInput = false;
      // this.isShowBtn = false
      this.basePropData.forEach((item, index) => {
        if (item["字段名称"] === "是否第二部分材料") {
          this.isSecondMaterial = item[item["字段名称"]];
        }
      });
      this.basePropData.forEach((item, index) => {
        if (item["字段名称"] === "形成时间") {
          let date = new Date(item[item["字段名称"]]);
          let y = date.getFullYear();
          let m = date.getMonth() + 1;
          let d = date.getDate();
          this.xcDate = y + "-" + m + "-" + d;
        }
      });
      this.$api.build
        .addMaterial({
          cailiaodaima: this.thirdCode,
          cailiaoleixing: this.marterial_class,
          cailiaoname: this.basePropData[0]["材料名称"],
          cailiaotype: this.parentmulu,
          dichotomyType: this.isSecondMaterial ? 2 : 1,
          tyzdz: JSON.stringify(this.basePropData),
          zyzdz: JSON.stringify(this.properPropData),
          sfh: this.$route.query.sfh,
          xcdate: this.xcDate
        })
        .then(data => {
          if (data.message === '添加成功') {
            this.$message("材料添加成功！");
            this.getTree();
            this.$refs.tree.setChecked = data.UUID
          } else {
            this.$message("材料添加失败！");
          }
        });
    },
    addImg(event) {
      this.fileimgs = event.target.files;
      for (var i = 0; i < this.fileimgs.length; i++) {
        this.imgarr.push(this.fileimgs[i]);
      }
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      this.fil = inputDOM.files;
      let oldLen = this.imgLen;
      // let len = this.fil.length+oldLen
      for (let i = 0; i < this.fil.length; i++) {
        this.imgLen++;
        this.$set(
          this.imgs,
          this.fil[i].name + "?" + new Date().getTime() + i,
          this.fil[i]
        );
      }
    },
    // getObjectURL (file) {
    //   var url = null
    //   if (window.createObjectURL!=undefined) { // basic
    //     url = window.createObjectURL(file)
    //   } else if (window.URL!=undefined) { // mozilla(firefox)
    //     url = window.URL.createObjectURL(file)
    //   } else if (window.webkitURL != undefined) { // webkit or chrome
    //     url = window.webkitURL.createObjectURL(file)
    //   }
    //   return url
    // },
    setBigImg(file) {
      this.panel = true;
      this.picValue = file;
      this.url = this.getObjectURL(this.picValue);
      if (this.cropper) {
        //每次替换图片要重新得到新的url
        this.cropper.replace(this.url);
      }
      var size = 16 / 10;
      // this.init(size);
      this.panel = true;
    },
    deleteNode() {
      //如果没有选择节点提示用户选择
      var nowDate = new Date();
      var year = nowDate.getFullYear();
      var month = nowDate.getMonth() + 1;
      var day = nowDate.getDate();
      var hour = nowDate.getHours();
      var min = nowDate.getMinutes();
      if (Object.keys(this.treeSelectNode).length > 0) {
        this.$api.build
          .removeTree({
            sfh: this.treeSelectNode.sfh,
            cldm: this.treeSelectNode.id,
            dah: this.treeSelectNode.danganID,
            danwei: this.userInfo["部别"],
            czr: this.userInfo["身份号"],
            IP: "",
            date: year + "-" + month + "-" + day + " " + hour + ":" + min,
            jgmcm: this.userInfo["机构名称码"],
            laiyuan: this.$route.query.type
          })
          .then(data => {
            // this.newString(data['十分法'],data['二分法_类别'])
            this.$message(data.message);
            this.getTree();
          });
      } else {
        this.$message("请选择删除的类别或材料");
        //判断时第几级节点（需要根据后台传来的数据判断）
        //调用后台接口执行删除
        //后台删除成功后将页面该节点删除
        // this.$refs.tree.remove(this.treeSelectNode)
      }
    },
    closeWin() {
      this.winIsShow = false;
      this.clIsShow = false;
      this.sqwinShow = false;
      this.lName = "";
      this.lDes = "";
      this.firstclmc = "";
      this.code = "";
      this.mName = "";
      this.mDes = "";
      this.secondclmc = "";
      this.sCode = "";
      this.zName = "";
      this.zDes = "";
    },
    toggleShow() {
      this.viewIsShow = !this.viewIsShow;
    },
    cropSuccess(coverImg, field) {
      this.detailRuleForm.coverImg = coverImg;
    },
    cropUploadSuccess(jsonData, field) {
      if (jsonData.retCode === "00000") {
        this.detailRuleForm.coverImg = jsonData.vo.uploadUri;
        //下面这个判断条件就是当上传成功后，不用用户手动再去关闭弹框，上传成功之后代码把其关闭
        if (this.$refs.uploader) {
          this.$refs.uploader.off();
        }
      }
    },
    cropUploadFail(status, field) {
    },
    addClassload() {
      this.color = "#1b95e0";
    },
    removeClassload() {
      this.color = "#d9d9d9";
    },
    //点击按钮自动执行选择文件事件
    upload() {
      (this.url = ""), (this.current = 0);
      document.getElementById("change").value = null;
      document.getElementById("change").click();
    },
    //旋转
    rotate() {
      //alert(this.cropper.image)
      this.current = (this.current + 90) % 360;
      this.cropper.rotate(this.current);
    },
    //缩放
    zoom(num) {
      num = num || 1;
      this.cropper.zoom(num);
    },

    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    crop() {
      this.panel = false;
      var croppedCanvas;
      var roundedCanvas;

      if (!this.croppable) {
        return;
      }
      // Crop
      croppedCanvas = this.cropper.getCroppedCanvas();
      // Round
      /*截取圆形
      roundedCanvas = this.getRoundedCanvas(croppedCanvas);
      this.headerImage = roundedCanvas.toDataURL();
      */
      //方形
      this.headerImage = croppedCanvas.toDataURL();

      var gettype = Object.prototype.toString;
      this.postImg();
    },
    dataURLtoFile(dataurl, filename = "file") {
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let suffix = mime.split("/")[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], `${filename}.${suffix}`, { type: mime });
    },
    /* // 截取圆形
     getRoundedCanvas (sourceCanvas) {
       var canvas = document.createElement('canvas');
       var context = canvas.getContext('2d');
       var width = sourceCanvas.width;
       var height = sourceCanvas.height;
       canvas.width = width;
       canvas.height = height;
       context.imageSmoothingEnabled = true;
       context.drawImage(sourceCanvas, 0, 0, width, height);
       context.globalCompositeOperation = 'destination-in';
       context.beginPath();
       context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
       context.fill();
       return canvas;
     },*/
    postImg() {
      //这边写图片的上传
      var formData = new FormData();
      formData.append("file", this.dataURLtoFile(this.headerImage));
    }
  }
};
</script>

<style lang="scss" scoped>
// 滚动条样式
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
#demo .cropper-container {
  font-size: 0;
  line-height: 0;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  direction: ltr;
  -ms-touch-action: none;
  touch-action: none;
}

#demo .cropper-container img {
  /* Avoid margin top issue (Occur only when margin-top <= -height) */
  display: block;
  min-width: 0 !important;
  max-width: none !important;
  min-height: 0 !important;
  max-height: none !important;
  width: 100%;
  height: 100%;
  image-orientation: 0deg;
}
#demo .cropper-wrap-box,
.cropper-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-modal {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
#demo .cropper-wrap-box {
  overflow: hidden;
}
#demo .cropper-drag-box {
  opacity: 0;
  background-color: #fff;
}
#demo .cropper-modal {
  opacity: 0.5;
  background-color: #000;
}
#demo .cropper-view-box {
  display: block;
  overflow: hidden;
  width: 100%;
  height: 100%;
  outline: 1px solid #39f;
  outline-color: rgba(51, 153, 255, 0.75);
}

#demo .cropper-dashed {
  position: absolute;
  display: block;
  opacity: 0.5;
  border: 0 dashed #eee;
}
#demo .cropper-dashed.dashed-h {
  top: 33.33333%;
  left: 0;
  width: 100%;
  height: 33.33333%;
  border-top-width: 1px;
  border-bottom-width: 1px;
}
#demo .cropper-dashed.dashed-v {
  top: 0;
  left: 33.33333%;
  width: 33.33333%;
  height: 100%;
  border-right-width: 1px;
  border-left-width: 1px;
}
#demo .cropper-center {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0;
  height: 0;
  opacity: 0.75;
}
#demo .cropper-center:before,
.cropper-center:after {
  position: absolute;
  display: block;
  content: " ";
  background-color: #eee;
}
#demo .cropper-center:before {
  top: 0;
  left: -3px;
  width: 7px;
  height: 1px;
}
#demo .cropper-center:after {
  top: -3px;
  left: 0;
  width: 1px;
  height: 7px;
}
#demo .cropper-face,
.cropper-line,
.cropper-point {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.1;
}
#demo .cropper-face {
  top: 0;
  left: 0;
  background-color: #fff;
}
#demo .cropper-line {
  background-color: #39f;
}
#demo .cropper-line.line-e {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: e-resize;
}
#demo .cropper-line.line-n {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: n-resize;
}
#demo .cropper-line.line-w {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: w-resize;
}
#demo .cropper-line.line-s {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: s-resize;
}
#demo .cropper-point {
  width: 5px;
  height: 5px;

  opacity: 0.75;
  background-color: #39f;
}
#demo .cropper-point.point-e {
  top: 50%;
  right: -3px;
  margin-top: -3px;
  cursor: e-resize;
}
#demo .cropper-point.point-n {
  top: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize;
}
#demo .cropper-point.point-w {
  top: 50%;
  left: -3px;
  margin-top: -3px;
  cursor: w-resize;
}
#demo .cropper-point.point-s {
  bottom: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: s-resize;
}
#demo .cropper-point.point-ne {
  top: -3px;
  right: -3px;
  cursor: ne-resize;
}
#demo .cropper-point.point-nw {
  top: -3px;
  left: -3px;
  cursor: nw-resize;
}
#demo .cropper-point.point-sw {
  bottom: -3px;
  left: -3px;
  cursor: sw-resize;
}
#demo .cropper-point.point-se {
  right: -3px;
  bottom: -3px;
  width: 20px;
  height: 20px;
  cursor: se-resize;
  opacity: 1;
}
@media (min-width: 768px) {
  #demo .cropper-point.point-se {
    width: 15px;
    height: 15px;
  }
}
@media (min-width: 992px) {
  #demo .cropper-point.point-se {
    width: 10px;
    height: 10px;
  }
}
@media (min-width: 1200px) {
  .cropper-point.point-se {
    width: 5px;
    height: 5px;
    opacity: 0.75;
  }
}
#demo .cropper-point.point-se:before {
  position: absolute;
  right: -50%;
  bottom: -50%;
  display: block;
  width: 200%;
  height: 200%;
  content: " ";
  opacity: 0;
  background-color: #39f;
}
#demo .cropper-invisible {
  opacity: 0;
}
#demo .cropper-bg {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
}
#demo img.cropper-hide {
  position: absolute;
  display: none !important;
  display: block;
  width: 0;
  height: 0;
}
#demo .cropper-hidden {
  display: none !important;
}
#demo .cropper-move {
  cursor: move;
}
#demo .cropper-crop {
  cursor: crosshair;
}
#demo .cropper-disabled .cropper-drag-box,
.cropper-disabled .cropper-face,
.cropper-disabled .cropper-line,
.cropper-disabled .cropper-point {
  cursor: not-allowed;
}

.stage {
  @include wh(1710px, auto);
  // width: 1710px;
  margin: 0 auto;
  position: relative;
  .matchCatalog{
    position: fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background: rgba(0,0,0,.5);
    z-index:99;
    h3 {
      width:100%;
      height:40px;
      background:rgba(11,67,187,1);
      box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2);
      opacity:0.7;
      border:1px solid rgba(10,67,188,1);
      line-height: 40px;
      font-size: 14px;
      padding-left: 16px;
      box-sizing: border-box;
      // color:#fff;
      margin-bottom:20px;
      position: relative;
      .close {
          position: absolute;
          right: 16px;
          height: 100%;
          width: 20px;
          border: navajowhite;
          color: #fff;
          font-size: 24px;
        }
    }
    &>div {
      position: relative;
    }
    button.finishMatch {
      position: absolute;
      z-index: 99;
      bottom: 16px;
      right: 16px;
      width: 60px;
      height: 26px;
      background: -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(#058dfc),
            to(#0c60c8)
          );
      border-radius: 2px;
      border: 1px solid #0a43bc;
      color: #fff;
    }
  }
  &>h3 {
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
  p {
    position: absolute;
    left: 150px;
    top: 6px;
    font-size: 14px;
  }
  & > div {
    @include box_flex;
    @include justify(space-between);
    position: relative;
    .left {
      position: relative;
      z-index: 9;
      @include wh(160px, 640px);
      width: 330px;
      height: 800px;
      background: rgba(5, 27, 74, 0.22);
      border: 1px solid rgba(10, 67, 188, 1);
      box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
      opacity: 0.8;
      overflow: hidden;
      @include box_flex;
      @include direction(column);
      .queue {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0 16px;
        background: rgba(2, 154, 254, 0.15);
        @include sizing;
        font-size: 13px;
        color: #fff;
        position: relative;
        z-index: 9;
      }
      .deleteBtn {
        position: absolute;
        right: 10px;
        top: 5px;
        width: 60px;
        height: 26px;
        color: #fff;
        font-size: 14px;
        border: none;
        background: -webkit-gradient(
          linear,
          left top,
          left bottom,
          from(#058dfc),
          to(#0c60c8)
        );
        background: linear-gradient(180deg, #058dfc 0%, #0c60c8 100%);
        -webkit-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.53),
          0px 1px 2px 0px rgba(255, 255, 255, 0.5);
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.53),
          0px 1px 2px 0px rgba(255, 255, 255, 0.5);
        border-radius: 2px;
      }
      .type {
        width: 100%;
        height: 35px;
        // padding: 0 8px;
        position: relative;
        z-index: 9;
        @include box_flex;
        @include justify(space-around);
        @include align(center);
        color: #0ff;
        background: rgba(2, 154, 254, 0.1);
        font-size: 12px;
        span {
          margin-left: 4px;
        }
        button {
          width: 60px;
          height: 24px;
          background: rgba(3, 129, 255, 0.5);
          border-radius: 2px;
          border: 1px solid rgba(10, 67, 188, 1);
          color: #fff;
        }
      }
      .ten {
        @include flex;
        overflow-y: scroll;
      }
      .two {
        @include flex;
        @include box_flex;
        @include direction(column);
        position: relative;
        z-index: 9;
        .part {
          height: 50%;
          @include box_flex;
          // @include align(center);
          border-bottom: 1px solid #ccc;
        }
        .part_title {
          @include box_flex;
          @include align(center);
          width: 14px;
          padding: 0 8px;
          border-right: 1px solid #ccc;
        }
        .hidden {
          @include flex;
        }
        ul {
          width: 220px;
          height: 100%;
          overflow-y: auto;
          li {
            width: 100%;
            height: 30px;
            line-height: 30px;
            padding: 0 8px;
            box-sizing: border-box;
            cursor: pointer;
            &:hover {
              background-color: rgba(0, 0, 255, 0.2);
            }
            &.active {
              background-color: rgba(0, 0, 255, 0.2);
            }
          }
        }
      }
    }
    .right {
      height: 800px;
      @include flex;
      margin-left: 16px;
      .top {
        height: auto;
        width: 100%;
        position: relative;
        z-index: 0;
        background: rgba(5, 27, 74, 0.22);
        border: 1px solid rgba(10, 67, 188, 1);
        box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
        .top_btn {
          // margin: 0 16px;
          // height: 60px;
          height: auto;
          @include box_flex;
          @include justify(space-around);
          // @include align(center);
          position: relative;
          padding: 8px 0;
          z-index: 9;
          button.point {
            width: 120px;
          }
          button {
            width: 80px;
            height: 30px;
            color: #fff;
            border: none;
            background: linear-gradient(
              180deg,
              rgba(5, 141, 252, 1) 0%,
              rgba(12, 96, 200, 1) 100%
            );
            box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.53),
              0px 1px 2px 0px rgba(255, 255, 255, 0.5);
            border-radius: 2px;
            &.create {
              background: linear-gradient(
                180deg,
                rgba(194, 194, 194, 1) 0%,
                rgba(91, 112, 131, 1) 100%
              );
            }
            &.scan {
              background: linear-gradient(
                0deg,
                rgba(194, 194, 194, 1) 0%,
                rgba(91, 112, 131, 1) 100%
              );
            }
            &.scanActive {
              background: linear-gradient(
                0deg,
                rgba(166, 242, 189, 1),
                rgba(34, 162, 72, 1)
              );
            }
            &.add,
            &.edit,
            &.scan {
              height: 70px;
              letter-spacing: 5px;
              padding: 0 15px;
              font-size: 18px;
            }
            &.edit.active,
            &.add.active,
            &.addClass.active {
              background: linear-gradient(
                180deg,
                rgba(194, 194, 194, 1) 0%,
                rgba(91, 112, 131, 1) 100%
              );
            }
          }
        }
        .top_btn1 {
          // height: 60px;
          position: absolute;
          width: 575px;
          bottom: 8px;
          left: 495px;
          // @include box_flex;
          // @include justify(space-between);
          // @include align(center);
          // position: relative;
          z-index: 9;
          button.button2 {
            margin-left: 130px;
          }
          button {
            width: 80px;
            height: 30px;
            color: #fff;
            border: none;
            background: linear-gradient(
              180deg,
              rgba(5, 141, 252, 1) 0%,
              rgba(12, 96, 200, 1) 100%
            );
            box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.53),
              0px 1px 2px 0px rgba(255, 255, 255, 0.5);
            border-radius: 2px;

            &.create {
              background: linear-gradient(
                180deg,
                rgba(194, 194, 194, 1) 0%,
                rgba(91, 112, 131, 1) 100%
              );
            }

            &.scan {
              background: linear-gradient(
                0deg,
                rgba(166, 242, 189, 1),
                rgba(34, 162, 72, 1)
              );
            }
          }
        }
      }
      .bottom-left {
        float: left;
        width: 930px;
        height: 680px;
        margin-top: 16px;
        padding-bottom: 16px;
        z-index: 99;
        position: relative;
        background: rgba(5, 27, 74, 0.22);
        border: 1px solid rgba(10, 67, 188, 1);
        box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
        .bottomButtons {
          height: 40px;
          line-height: 40px;
          font-size: 13px;
          padding: 0 16px;
          background: rgba(2,154,254,0.1);
          .iconBox {
            width: 30px;
            height: 30px;
            float: right;
            margin-top: 5px;
            position: relative;
            .el-icon {
              font-size: 20px;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%)
            }
          }
          .dragBtn {
            float: right;
            width: 80px;
            height: 30px;
            margin-top: 5px;
            margin-left: 10px;
          }
          .disableDragBtn {
            // float: left;
          }
        }
        .right_img {
          position: absolute;
          top: 40px;
          left: 30px;
        }
        .left_img {
          width: 100%;
          height: 660px;
          border-right: 1px solid rgba(10, 67, 188, 0.65);
          z-index: 9;
          transition: 0.2s;
          position: absolute;
          top: 40px;
          left: 0;
          @include box_flex;
          @include direction(column);
          .suoluetu {
            @include sizing;
            width: 100%;
            height: 40px;
            padding: 0 16px;
            font-size: 14px;
            line-height: 40px;
            border-bottom: 1px solid rgba(10, 67, 188, 0.65);
            position: relative;
          }
          .imgs {
            width: 100%;
            overflow-y: auto;
            .imgBoxMove {
              cursor: move;
            }
            .imgBox {
              width: 130px;
              height: 170px;
              position: relative;
              margin: 12px;
              float: left;
              .imgBoxContentBorder {
                background: rgba(251, 253, 255, 0.1);
                border: 1px dashed #c0ccda;
                border-radius: 6px;
              }
              .imgBoxContent {
                width: 100%;
                height: 100%;
                .imgUpload {
                  width: 100% !important;
                  height: 100% !important;
                  opacity: 0;
                  z-index: 10;
                }
                .imgUpload:hover {
                  cursor: pointer;
                }
                .el-icon-plus {
                  width: 12px;
                  height: 12px;
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  margin-left: -6px;
                  margin-top: -6px;
                }
                .el-icon-circle-close {
                  transition: 0.2s;
                  transform: scale(1.5);
                  position: absolute;
                  right: -6px;
                  top: -6px;
                  z-index: 100;
                  opacity: 0;
                }
                .el-icon-circle-close:hover {
                  color: #409eff;
                }
                .imgDom {
                  border-radius: 6px;
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  left: 1px;
                  top: 1px;
                  z-index: -1;
                }
                .imgDom[src=""] {
                  opacity: 0;
                }
              }
            }
            .imgBoxContentBorder:hover {
              border: 1px dashed #409eff;
              cursor: pointer;
              .el-icon-plus {
                color: #409eff;
              }
              .el-icon-circle-close {
                opacity: 1;
              }
            }
            dl {
              text-align: center;
              width: 120px;
              margin-bottom: 16px;
              dt {
                width: 180px;
                height: 90px;
                /*background:rgba(216,216,216,1);*/
                @include box_flex;
                @include justify(center);
                @include align(center);
              }
              dd {
                line-height: 24px;
              }
            }
            img {
              width: 135px;
              height: 75px;
              margin-right: auto;
            }
          }
        }
      }
      .bottom {
        float: right;
        width: 410px;
        height: 680px;
        margin-top: 16px;
        padding-bottom: 16px;
        z-index: 99;
        position: relative;
        background: rgba(5, 27, 74, 0.22);
        border: 1px solid rgba(10, 67, 188, 1);
        box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
        .dialog {
          width: 100%;
          height: 680px;
          position: relative;
          z-index: 9;
          @include box_flex;
          @include justify(center);
          @include align(center);
          @include direction(column);
          line-height: 35px;
          span:first-child {
            font-size: 25px;
            color: rgba(206, 209, 43, 0.336);
            font-weight: 600;
          }
          span:last-child {
            font-size: 16px;
            color: rgba(206, 209, 43, 0.336);
          }
        }
        .base {
          margin-bottom: 16px;
        }
        .base,
        .zhuanyou {
          // padding: 0 16px;
          & > div {
            @include box_flex;
            @include sizing;
            @include flexWrap(wrap);
            margin: 0 auto;
          }
          h4 {
            height: 40px;
            margin-top: 0px;
            line-height: 40px;
            padding: 0 16px;
            font-size: 14px;
            background: rgba(3, 94, 255, 0.15);
            &::after {
              content: "";
              display: inline-block;
              width: 86px;
              height: 20px;
              position: relative;
              top: 8px;
              left: 10px;
              background: url("../../../assets/images/tit-right.png")
                no-repeat;
            }
          }
        }
        .zhuanyou .inputInfo:last-child {
          width: 100%;
        }
        .inputInfo {
          position: relative;
          z-index: 9;
          margin-top: 16px;
          @include box_flex;
          span {
            font-size: 13px;
            display: inline-block;
            width: 100px;
            line-height: 32px;
            text-align: right;
            &.pos {
              width: 80px;
            }
            &.short {
              position: relative;
              bottom: 126px;
            }
          }
          input,
          select {
            width: 280px;
            height: 30px;
            color: #ccc;
            padding: 0 8px;
            box-sizing: border-box;
            background: rgba(3, 94, 255, 0.15);
            border-radius: 2px;
            border: 1px solid rgba(10, 67, 188, 0.94);
            margin-left: 8px;
            // margin-right:
          }
          option {
            background: rgba(3, 94, 255, 0.15);
            color: #000;
            padding: 5px;
          }
          .checkbox {
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
            background: rgba(3, 94, 255, 0.15);
            border-radius: 2px;
            border: 1px solid rgba(10, 67, 188, 0.94);
            padding: 8px;
            box-sizing: border-box;
            color: #ccc;
          }
          .getInfo {
            width: 100px;
            height: 32px;
            background: rgba(3, 129, 255, 0.26);
            border-radius: 2px;
            border: 1px solid rgba(10, 67, 188, 1);
            color: #00feff;
            margin-left: 8px;
          }
        }
        .btn {
          text-align: center;
          margin-top: 16px;
          position: relative;
          z-index: 9;
          button {
            border: none;
            background: none;
            width: 80px;
            box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.53),
              0px 1px 2px 0px rgba(255, 255, 255, 0.5);
            height: 30px;
          }
          .edit,
          .cancel {
            background: linear-gradient(
              180deg,
              rgba(5, 141, 252, 1) 0%,
              rgba(12, 96, 200, 1) 100%
            );
            margin-right: 8px;
            border-radius: 2px;
          }
          .doc,
          .submit {
            border-radius: 2px;
            border: 1px solid rgba(0, 254, 255, 1);
            color: #0ff;
          }
        }
      }
      .addCL {
        width: 100%;
        height: auto;
        margin-top: 16px;
        padding-bottom: 16px;
        position: relative;
        background: rgba(5, 27, 74, 0.22);
        border: 1px solid rgba(10, 67, 188, 1);
        box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
        .base {
          margin-bottom: 16px;
        }
        .base,
        .zhuanyou {
          // padding: 0 16px;
          & > div {
            @include box_flex;
            @include sizing;
            @include flexWrap(wrap);
            margin: 0 auto;
          }
          h4 {
            height: 40px;
            margin-top: 0px;
            line-height: 40px;
            padding: 0 16px;
            font-size: 14px;
            background: rgba(3, 94, 255, 0.15);
            &::after {
              content: "";
              display: inline-block;
              width: 86px;
              height: 20px;
              position: relative;
              top: 8px;
              left: 10px;
              background: url("../../../assets/images/tit-right.png")
                no-repeat;
            }
          }
        }
        .zhuanyou .inputInfo:last-child {
          width: 100%;
        }
        .inputInfo {
          position: relative;
          z-index: 9;
          margin-top: 16px;
          margin-left: 50px;
          @include box_flex;
          span {
            font-size: 13px;
            display: inline-block;
            width: 85px;
            line-height: 32px;
            text-align: right;
            &.pos {
              width: 80px;
            }
            &.short {
              position: relative;
              bottom: 126px;
            }
          }
          input,
          select {
            width: 320px;
            height: 30px;
            color: #ccc;
            padding: 0 8px;
            box-sizing: border-box;
            background: rgba(3, 94, 255, 0.15);
            border-radius: 2px;
            border: 1px solid rgba(10, 67, 188, 0.94);
            margin-left: 8px;
            // margin-right:
          }
          option {
            background: rgba(3, 94, 255, 0.15);
            color: #000;
            padding: 5px;
          }
          .checkbox {
            width: 86px;
            height: 18px;
            text-align: left;
            margin-top: 8px;
          }
          textarea {
            display: inline-block;
            margin-left: 8px;
            width: 320px;
            height: 110px;
            background: rgba(3, 94, 255, 0.15);
            border-radius: 2px;
            border: 1px solid rgba(10, 67, 188, 0.94);
            padding: 8px;
            box-sizing: border-box;
            color: #ccc;
          }
          .getInfo {
            width: 100px;
            height: 32px;
            background: rgba(3, 129, 255, 0.26);
            border-radius: 2px;
            border: 1px solid rgba(10, 67, 188, 1);
            color: #00feff;
            margin-left: 8px;
          }
        }
        .btn {
          text-align: center;
          margin-top: 16px;
          position: relative;
          z-index: 9;
          button {
            border: none;
            background: none;
            width: 80px;
            box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.53),
              0px 1px 2px 0px rgba(255, 255, 255, 0.5);
            height: 30px;
          }
          .edit,
          .cancel {
            background: linear-gradient(
              180deg,
              rgba(5, 141, 252, 1) 0%,
              rgba(12, 96, 200, 1) 100%
            );
            margin-right: 8px;
            border-radius: 2px;
          }
          .doc,
          .submit {
            border-radius: 2px;
            border: 1px solid rgba(0, 254, 255, 1);
            color: #0ff;
          }
        }
      }
      .addWindow {
        position: absolute;
        top: 50px;
        left: 260px;
        width: 400px;
        height: 140px;
        z-index: 99;
        background: #013980;
        border: 1px #0a43bc solid;
        .queue {
          width: 100%;
          height: 30px;
          line-height: 30px;
          padding: 0 16px;
          background: rgba(2, 154, 254, 0.15);
          @include sizing;
          font-size: 13px;
          color: #fff;
          position: relative;
          z-index: 99;
        }
        select {
          width: 320px;
          height: 30px;
          color: #ccc;
          padding: 0 8px;
          box-sizing: border-box;
          background: rgba(3, 94, 255, 0.15);
          border-radius: 2px;
          border: 1px solid rgba(10, 67, 188, 0.94);
          margin: 20px 40px;
        }
        option {
          background: rgba(3, 94, 255, 0.15);
          color: #000;
          padding: 5px;
        }
        .close {
          position: absolute;
          right: 0px;
          height: 100%;
          width: 20px;
          background: #014893;
          border: navajowhite;
          color: #fff;
          font-size: 20px;
        }
        .btn {
          width: 100%;
          height: auto;
          text-align: center;
          button {
            width: 60px;
            height: 24px;
            background: rgba(3, 129, 255, 0.5);
            border-radius: 2px;
            border: 1px solid rgba(10, 67, 188, 1);
            color: #fff;
          }
        }
      }
      .sq-addWindow {
        position: absolute;
        top: 120px;
        left: 340px;
        width: 400px;
        height: auto;
        z-index: 99;
        background: #013980;
        border: 1px #0a43bc solid;
        & > div {
          p {
            font-size: 13px;
            line-height: 30px;
            margin: 0 40px;
          }
          .queue {
            width: 100%;
            height: 30px;
            line-height: 30px;
            padding: 0 16px;
            background: rgba(2, 154, 254, 0.15);
            @include sizing;
            font-size: 13px;
            color: #fff;
            position: relative;
            z-index: 99;
          }
          select,
          input {
            width: 320px;
            height: 30px;
            color: #ccc;
            padding: 0 8px;
            box-sizing: border-box;
            background: rgba(3, 94, 255, 0.15);
            border-radius: 2px;
            border: 1px solid rgba(10, 67, 188, 0.94);
            margin: 5px 40px;
          }
          option {
            background: rgba(3, 94, 255, 0.15);
            color: #000;
            padding: 5px;
          }
          .close {
            position: absolute;
            right: 0px;
            height: 100%;
            width: 20px;
            font-size: 20px;
            background: #014893;
            border: navajowhite;
            color: #fff;
          }
        }
        .btn {
          width: 100%;
          height: auto;
          text-align: center;
          margin: 10px auto;
          button {
            width: 60px;
            height: 24px;
            background: rgba(3, 129, 255, 0.5);
            border-radius: 2px;
            border: 1px solid rgba(10, 67, 188, 1);
            color: #fff;
          }
        }
      }
      .overviewWin {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background: #02091cb5;
        z-index: 99;
        & > div {
          position: relative;
          width: 60%;
          height: auto;
          min-height: 95%;
          margin: 50px auto;
          background-color: #fff;
          .queue {
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: left;
            font-size: 18px;
            background: #093c98;
            padding: 0 20px;
            @include sizing;
            color: #fff;
            .close {
              position: absolute;
              right: 0;
              width: 40px;
              height: 40px;
              background: rgb(9, 60, 152);
              border: none;
              color: rgb(2, 153, 253);
              font-size: 20px;
              z-index: 9;
            }
          }
          .center {
            width: 100%;
            background: #051b4a;
            .firseTitle {
              margin: 0;
              padding: 0 20px;
              font-size: 18px;
              height: 35px;
              line-height: 35px;
              color: #fff;
              background-color: #042464;
            }
            .modeLi {
              padding: 10px 45px;
              .towTitle {
                width: 100%;
                height: 35px;
                line-height: 30px;
                color: #ffffff;
                font-size: 16px;
              }
              .threeTitle {
                width: 100%;
                height: 30px;
                margin-left: 16px;
                line-height: 30px;
                color: #ffffff;
                font-size: 16px;
              }
              .attrCenter {
                // width: 100%;
                height: auto;
                background-color: #042464;
                margin: 8px 40px;
                padding: 10px 16px;
                .cct {
                  padding: 5px 10px;
                  height: auto;
                  color: #fff;
                  font-size: 16px;
                  li {
                    line-height: 30px;
                  }
                  h6 {
                    height: 35px;
                    color: #0299fd;
                    font-size: 16px;
                    font-weight: 500;
                  }
                }
              }
            }
          }
        }
      }
      .previewWin {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background: #02091cb5;
        z-index: 99;
        & > div {
          position: relative;
          width: 60%;
          height: auto;
          z-index: 999;
          // min-height: 95%;
          margin: 50px auto;
          .posi_bg_horn {
            z-index: 99;
          }
          .queue {
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: left;
            font-size: 18px;
            background: #093c98;
            padding: 0 20px;
            @include sizing;
            color: #fff;
            .close {
              position: absolute;
              right: 16px;
              // width: 40px;
              cursor: pointer;
              height: 40px;
              background: rgb(9, 60, 152);
              border: none;
              color: rgb(2, 153, 253);
              font-size: 20px;
              z-index: 999;
            }
          }
          .center {
            width: 100%;
            height: 800px;
            background: #051b4a;
            .firseTitle {
              margin: 0;
              padding: 0 20px;
              font-size: 18px;
              height: 35px;
              line-height: 35px;
              color: #fff;
              background-color: #042464;
            }
            .firstMode {
              padding: 10px 20px;
              border: 2px #222 solid;
              .stage .el-table .el-table__header th {
                color: #000 !important;
              }
            }
          }
        }
      }
      .finishModel {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 99;
        @include box_flex;
        @include justify(center);
        @include align(center);
        & > div {
          width: 400px;
          height: 300px;
          background: rgba(5, 27, 74, 1);
          box-shadow: 0px 0px 26px 0px rgba(0, 229, 255, 0.2);
          border: 1px solid rgba(10, 67, 188, 0.65);
          h4 {
            position: relative;
            z-index: 999;
            height: 40px;
            background: rgba(11, 67, 187, 1);
            box-shadow: 0px 0px 26px 0px rgba(0, 229, 255, 0.2);
            opacity: 0.7;
            border: 1px solid rgba(10, 67, 188, 1);
            @include box_flex;
            @include justify(space-between);
            span {
              font-size: 15px;
              color: #fff;
              line-height: 40px;
              margin-left: 16px;
              // line-height:20px;
            }
            .close {
              font-size: 20px;
              color: #029afe;
              margin-right: 16px;
              cursor: pointer;
            }
          }
          .finishCon {
            position: relative;
            height: 210px;
            @include box_flex;
            @include align(center);
            @include justify(center);
            @include direction(column);
            i {
              font-size: 50px;
            }
            div {
              line-height: 40px;
              font-size: 16px;
            }
            button {
              position: absolute;
              z-index: 999;
              right: 16px;
              bottom: 16px;
              width: 60px;
              height: 28px;
              border: none;
              // background: -webkit-gradient(linear, left top, left bottom, from(#058dfc), to(#0c60c8));
              background: linear-gradient(180deg, #058dfc 0%, #0c60c8 100%);
              -webkit-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.53),
                0px 1px 2px 0px rgba(255, 255, 255, 0.5);
              box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.53),
                0px 1px 2px 0px rgba(255, 255, 255, 0.5);
              border-radius: 2px;
              color: #fff;
            }
          }
        }
      }
      .hasDataModel {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 99;
        @include box_flex;
        @include justify(center);
        @include align(center);
        & > div {
          width: 600px;
          min-height: 400px;
          height: auto;
          background: rgba(5, 27, 74, 1);
          box-shadow: 0px 0px 26px 0px rgba(0, 229, 255, 0.2);
          border: 1px solid rgba(10, 67, 188, 0.65);
          h4 {
            position: relative;
            z-index: 999;
            height: 40px;
            background: rgba(11, 67, 187, 1);
            box-shadow: 0px 0px 26px 0px rgba(0, 229, 255, 0.2);
            opacity: 0.7;
            border: 1px solid rgba(10, 67, 188, 1);
            @include box_flex;
            @include justify(space-between);
            span {
              font-size: 15px;
              color: #fff;
              line-height: 40px;
              margin-left: 16px;
              // line-height:20px;
            }
            .close {
              font-size: 20px;
              color: #029afe;
              margin-right: 16px;
              cursor: pointer;
            }
          }
          .finishCon {
            position: relative;
            height: 360px;
            @include box_flex;
            @include align(center);
            @include justify(center);
            @include direction(column);
            i {
              font-size: 50px;
            }
            div {
              line-height: 40px;
              font-size: 14px;
              h6 {
                font-weight: 600;
                text-align: left;
              }
            }
            button {
              width: 60px;
              height: 28px;
              border: none;
              position: relative;
              z-index: 999;
              // background: -webkit-gradient(linear, left top, left bottom, from(#058dfc), to(#0c60c8));
              background: linear-gradient(180deg, #058dfc 0%, #0c60c8 100%);
              -webkit-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.53),
                0px 1px 2px 0px rgba(255, 255, 255, 0.5);
              box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.53),
                0px 1px 2px 0px rgba(255, 255, 255, 0.5);
              border-radius: 2px;
              color: #fff;
            }
          }
        }
      }
    }

    .right-sm {
      @include flex;
      .top {
        height: 45px;
        width: 100%;
        position: relative;
        background: rgba(5, 27, 74, 0.22);
        border: 1px solid rgba(10, 67, 188, 1);
        box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
        .top_btn {
          // margin: 0 16px;
          @include box_flex;
          @include justify(space-around);
          @include align(center);
          position: relative;
          z-index: 99;
          button {
            width: 80px;
            height: 30px;
            color: #fff;
            border: none;
            background: linear-gradient(
              180deg,
              rgba(5, 141, 252, 1) 0%,
              rgba(12, 96, 200, 1) 100%
            );
            box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.53),
              0px 1px 2px 0px rgba(255, 255, 255, 0.5);
            border-radius: 2px;
            &.create {
              background: linear-gradient(
                180deg,
                rgba(194, 194, 194, 1) 0%,
                rgba(91, 112, 131, 1) 100%
              );
            }
            &.scan {
              background: linear-gradient(
                0deg,
                rgba(166, 242, 189, 1),
                rgba(34, 162, 72, 1)
              );
            }
          }
          button.disabledPoint {
            background: linear-gradient(180deg, #c2c2c2 0%, #5b7083 100%);
          }
          .fileupload {
            position: absolute;
            left: 55px;
            padding: 4px;
            width: 73px;
            opacity: 0;
          }
        }
      }
      .bottom {
        @include box_flex;
        width: 100%;
        height: 622px;
        margin-top: 16px;
        position: relative;
        background: rgba(5, 27, 74, 0.22);
        border: 1px solid rgba(10, 67, 188, 1);
        box-shadow: 0px 0px 28px 0px rgba(0, 229, 255, 0.4) inset;
        .base {
          margin-bottom: 16px;
        }
        .base,
        .zhuanyou {
          // padding: 0 16px;
          & > div {
            @include box_flex;
            @include sizing;
            @include flexWrap(wrap);
            margin: 0 auto;
          }
          h4 {
            height: 40px;
            margin-top: 0px;
            line-height: 40px;
            padding: 0 16px;
            font-size: 14px;
            background: rgba(3, 94, 255, 0.15);
            &::after {
              content: "";
              display: inline-block;
              width: 86px;
              height: 20px;
              position: relative;
              top: 8px;
              left: 10px;
              background: url("../../../assets/images/tit-right.png")
                no-repeat;
            }
          }
        }
        .zhuanyou .inputInfo:last-child {
          width: 100%;
        }
        .inputInfo {
          position: relative;
          z-index: 9;
          margin-top: 16px;
          margin-left: 56px;
          @include box_flex;
          span {
            font-size: 13px;
            display: inline-block;
            width: 56px;
            line-height: 32px;
            text-align: right;
            &.pos {
              width: 80px;
            }
            &.short {
              position: relative;
              bottom: 126px;
            }
          }
          input {
            width: 320px;
            height: 30px;
            color: #ccc;
            padding: 0 8px;
            box-sizing: border-box;
            background: rgba(3, 94, 255, 0.15);
            border-radius: 2px;
            border: 1px solid rgba(10, 67, 188, 0.94);
            margin-left: 8px;
            // margin-right:
          }
          textarea {
            display: inline-block;
            margin-left: 8px;
            width: 320px;
            height: 110px;
            background: rgba(3, 94, 255, 0.15);
            border-radius: 2px;
            border: 1px solid rgba(10, 67, 188, 0.94);
            padding: 8px;
            box-sizing: border-box;
            color: #ccc;
          }
          .getInfo {
            width: 100px;
            height: 32px;
            background: rgba(3, 129, 255, 0.26);
            border-radius: 2px;
            border: 1px solid rgba(10, 67, 188, 1);
            color: #00feff;
            margin-left: 8px;
          }
        }
        .btn {
          text-align: center;
          margin-top: 16px;
          position: relative;
          z-index: 9;
          button {
            border: none;
            background: none;
            width: 80px;
            box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.53),
              0px 1px 2px 0px rgba(255, 255, 255, 0.5);
            height: 30px;
          }
          .edit,
          .cancel {
            background: linear-gradient(
              180deg,
              rgba(5, 141, 252, 1) 0%,
              rgba(12, 96, 200, 1) 100%
            );
            margin-right: 8px;
            border-radius: 2px;
          }
          .doc,
          .submit {
            border-radius: 2px;
            border: 1px solid rgba(0, 254, 255, 1);
            color: #0ff;
          }
        }
        .right_img {
          position: relative;
          @include flex;
          @include box_flex;
          @include direction(column);
          .opt {
            height: 40px;
            border-bottom: 1px solid rgba(10, 67, 188, 1);
            @include box_flex;
            @include align(center);
            span {
              padding: 0 24px;
            }
            button {
              border: none;
              width: 75px;
              height: 30px;
              background: rgba(3, 94, 255, 0.36);
              border-radius: 2px;
              border: 1px solid rgba(10, 67, 188, 0.94);
              color: #fff;
              margin-right: 8px;
              font-size: 14px;
              i {
                padding-right: 8px;
                font-size: 16px;
              }
            }
          }
          .current-img {
            @include flex;
            @include box_flex;
            @include justify(center);
            @include align(center);
            & > div {
              width: 560px;
              height: 720px;
              background: rgba(216, 216, 216, 1);
              @include box_flex;
              @include justify(center);
              @include align(center);
              img {
                max-width: 90%;
                max-height: 100%;
              }
            }
          }
        }
      }
    }
  }
  .classModel {
    position: absolute;
    z-index: 99;
    left: 150px;
    top: 75px;
    width: 320px;
    height: 132px;
    background: rgba(5, 27, 74, 1);
    box-shadow: 0px 0px 26px 0px rgba(0, 229, 255, 0.2);
    border: 1px solid rgba(10, 67, 188, 0.65);
    .title {
      width: 320px;
      height: 24px;
      background: rgba(11, 67, 187, 1);
      box-shadow: 0px 0px 26px 0px rgba(0, 229, 255, 0.2);
      opacity: 0.7;
      border: 1px solid rgba(10, 67, 188, 1);
      line-height: 24px;
      @include box_flex;
      @include justify(space-between);
      padding: 0 8px;
      box-sizing: border-box;
      color: #fff;
    }
    .leibie {
      @include box_flex;
      margin: 24px 0 0 16px;
      line-height: 30px;
      select {
        width: 220px;
        height: 30px;
        background: rgba(3, 94, 255, 0.15);
        border-radius: 2px;
        border: 1px solid rgba(10, 67, 188, 0.94);
        margin-left: 8px;
        color: #ccc;
        option {
          background: rgba(3, 94, 255, 0.15);
        }
      }
    }
    .applcaition {
      // text-align: center;
      border: none;
      width: 105px;
      height: 30px;
      background: linear-gradient(
        180deg,
        rgba(5, 141, 252, 1) 0%,
        rgba(12, 96, 200, 1) 100%
      );
      box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.53),
        0px 1px 2px 0px rgba(255, 255, 255, 0.5);
      border-radius: 2px;
      margin-left: 16px;
      margin-top: 8px;
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
  .finishBuild {
    position: absolute;
    right: 80px;
    top: 0;
    width: 60px;
    height: 24px;
    background: linear-gradient(0deg, #a6f2bd, #22a248);
    border: none;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.53),
      0px 1px 2px 0px rgba(255, 255, 255, 0.5);
    border-radius: 2px;
    color: #fff;
  }
  .birth {
    position: absolute;
    z-index: 99;
    top: 5px;
    right: 80px;
    width: 60px;
    height: 26px;
    background: -webkit-gradient(
          linear,
          left top,
          left bottom,
          from(#058dfc),
          to(#0c60c8)
        );
    border-radius: 2px;
    border: 1px solid #0a43bc;
    color: #fff;
  }

  /*以下是图片裁切样式*/
  .father {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0px;
    top: 40px;
    width: 100%;
    height: 100%;
    z-index: 33;
  }
  .i {
    font-size: 4em;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    margin-top: 25%;
  }
  #demo .show {
    border: 1px dashed #d9d9d9;
    border-radius: 10%;
    width: 100px;
    height: 100px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: inline-block;
    text-align: center;
    outline: none;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  #demo .container {
    z-index: 99;
    height: 740px;
    max-width: 755px;
    max-height: 740px;
    left: 45%;
    top: 18%;
    overflow: auto;
  }
  #demo #image {
    max-width: 100%;
    /*height: 530px;*/
    /*width: 513px;*/
  }
}
</style>
