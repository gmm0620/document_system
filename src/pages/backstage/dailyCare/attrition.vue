<template>
  <div class="stage">
    <div v-show="listShow">
      <h3>减员副本库列表</h3>
      <div>
        <div class="top">
          <div class="con con_flex">
            <div class="item">
              <span>身份号:</span>
              <input type="text" v-model="sfh">
            </div>
            <div class="item">
              <span>姓名:</span>
              <input type="text" v-model="name">
            </div>
            <div class="item">
              <span>职务:</span>
              <input type="text" v-model="zw">
            </div>
            <div class="item">
              <span>减员原因:</span>
              <select v-model="reason">
                <option value="">请选择</option>
                <option v-for="(item, index) in jianyuanReason" :key="index" :value="item['名称']">{{item['名称']}}</option>
              </select>
            </div>
            <div class="search_btn">
              <button class="search point" @click="search">查询</button>
            </div>
          </div>
          <PositionHorn />
        </div>
        <div class="bottom">
          <!--<div class="search_btn">
            <button class="search"  @click="addDivShow">添加减员人员</button>
          </div>-->
          <div class="con_2">
            <el-table :data="list" stripe>
              <el-table-column prop="ids" label="序号" width="90"></el-table-column>
              <el-table-column prop="身份号" label="身份号"></el-table-column>
              <el-table-column prop="姓名" label="姓名"></el-table-column>
              <el-table-column prop="部别" label="部别" width="220"  :show-overflow-tooltip='true'></el-table-column>
              <el-table-column prop="职务名称" label="职务" width="200"  :show-overflow-tooltip='true'></el-table-column>
              <el-table-column prop="减员原因" label="减员原因"></el-table-column>
<!--              <el-table-column label="操作" width="100" >-->
<!--                <span class="point short_item" @click="searchjianyuan((scope.row))">查看</span>-->
<!--              </el-table-column>-->
              <el-table-column
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="searchjianyuan(scope.row)" size="mini" style="width: 70px;height: 30px;background: rgba(3, 94, 255, 0.15);border: 1px solid #0a43bc;color: #FFFFFF;text-align: center ">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              background
              prev-text="上一页"
              next-text="下一页"
              :page-size="pagesize"
              :total="total"
              layout="prev, pager, next, jumper"
            >
            </el-pagination>
          </div>
          <PositionHorn />
        </div>
      </div>
    </div>
    <!--<div v-show="listShow==false">
      <h3>选择干部</h3>
      <div class="choose">
        <div class="left_tree">
          <div class="queue">单位组织序列</div>
          <el-tree
            :data="data"
            :props="defaultProps"
            node-key="id"
            :default-expanded-keys="[12,3]"
            current-node-key="13"
            @node-click="handleNodeClick"></el-tree>
          <el-radio v-model="radio" label="1">显示包含下级单位</el-radio>
          <PositionHorn />
        </div>
        <div class="right_person">
          <div class="top_condition">
            <div class="top_btn">
              <div class="left_btn">
                <button class="search" @click="showSearch">条件查询</button>
              </div>
            </div>
            <div v-show="showCondition">
              <div class="con con_flex">
                <div class="item">
                  <span>姓名:</span>
                  <input type="text" value="李浩芮" v-model="conditionList['name']">
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
                  <span>职务等级:</span>
                  <select v-model="conditionList['zwdj']">
                    <option v-for="(item, index) in condition['职务等级']" :key="index">{{item['名称']}}</option>
                  </select>
                </div>
                <div class="item">
                  <span>军衔文级:</span>
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
                  <span>管理标识:</span>
                  <select v-model="conditionList['glbs']">
                    <option v-for="(item, index) in condition['管理标识']" :key="index">{{item['名称']}}</option>
                  </select>
                </div>
                <div class="item">
                  <span>身份号:</span>
                  <input type="text" v-model="conditionList['sfh']">
                </div>
              </div>
              <div class="search_btn">
                <button class="search" @click="conditionSearch">查询</button>
                <button class="clear_all">清空</button>
                <button class="custom">自定义查询</button>
              </div>
            </div>
            <PositionHorn />
          </div>
          <div class="search_result common_style">
            <div class="title">
              <span>查询结果</span>
              <ul class="tab">
                <li @click="changeType('card')"><img src="../../../assets/images/kapian-1.png" alt=""><span>卡片</span></li>
                <li @click="changeType('table')"><img src="../../../assets/images/liebiao-1.png" alt=""><span>列表</span></li>
              </ul>
            </div>
            <div class="con" v-if="type === 'card'">
              <div class="list">
                <div v-for="(item, index) in lists && lists.slice((currpage - 1) * pagesize, currpage * pagesize)" :key="index" class="card">
                  <div class="dentity">
                    <span>{{item['姓名']}}</span>
                    <span>{{item['职务名称']}}</span>
                    <img src="../../../assets/images/junzhang.png" alt="">
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
                        <li><span>{{item['籍贯']}}</span></li>
                        <li><span>{{item['出生时间'].split('T')[0]}}</span></li>
                        <li><span>{{item['入伍时间'].split('T')[0]}}</span></li>
                        <li><span>{{item['职务']}}</span></li>
                        <li><span>{{item['技术']}}</span></li>
                        <li><span>{{item['军衔']}}</span></li>
                        <li><span>{{item['身份号']}}</span></li>
                      </ul>
                    </div>
                  </div>
                  <div class="add_info">
                    <span class="add_search" @click="addSearch(item)">加入列表</span>
                  </div>
                </div>
              </div>
              <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                background
                :page-size="pagesize"
                :total="lists && lists.length"
                prev-text="上一页"
                next-text="下一页"
                layout="prev, pager, next, jumper"
              >
              </el-pagination>
            </div>
            <div class="con_2" v-if="type === 'table'">
              <el-table
                :data="lists && lists.slice((currpage - 1) * pagesizeTab, currpage * pagesizeTab)"
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
                  width="80">
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
                  width="100">
                  <div slot-scope="scope">
                    <span class="add_search" @click="addSearch(scope.row)">加入列表</span>
                  </div>
                </el-table-column>
              </el-table>
              <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                background
                :page-size="pagesizeTab"
                :total="lists && lists.length"
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
        <h3>减员列表</h3>
        <div class="con_2">
          <el-table
            :data="tableData"
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
              prop="部职别"
              label="部职别"
              width="180">
            </el-table-column>
            <el-table-column
              prop="option"
              label="档案类型"
              width="120"
            >
              <div slot-scope="scope">
                <select>
                  <option>档案正本</option>
                  <option>档案副本</option>
                </select>
              </div>
            </el-table-column>
            <el-table-column
              prop="转出原因"
              label="转出原因"
            >
              <div slot-scope="scope">
                <select>
                  <option>归档</option>
                  <option>调动</option>
                  <option>按权限上报</option>
                  <option>提升</option>
                </select>
              </div>
            </el-table-column>
            <el-table-column
              prop="材料名称"
              label="质量审查状态"
            >
            </el-table-column>
            <el-table-column
              prop="option"
              label="操作"
            >
              <div slot-scope="scope">
                <button>档案审查</button>
                <button>移除</button>
              </div>
            </el-table-column>
          </el-table>
        </div>
        <PositionHorn />
      </div>
      <div class="btn">
        <button class="submit">提交</button>
        <button class="reset">重置</button>
        <button class="reset" @click="addDivClose">取消</button>
      </div>
    </div>-->
  </div>
</template>

<script>
import PositionHorn from '@/components/Postion_Horn'
export default {
  name: 'stage',
  data () {
    return {
      data: [],
      list: [],
      pagesize: 10,
      currpage: 1,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      total: 0,
      listShow:true,//控制页面显示
      radio: true,
      conditionList: {
        name: '张',
        bubie: '',
        zwmc: '',
        zwdj: '',
        jxwj: '',
        gbxz: '',
        daxz: '',
        glbs: '',
        sfh: ''
      },
      condition: [],
      showCondition: false,
      tableData: [
        {
          ids: 1,
          '姓名': '赵河北',
          '部职别': '空军第一大队飞行中队',
          '材料名称': '未审查',
          '图片页数': 5
        },
        {
          ids: 2,
          '姓名': '王江苏',
          '部职别': '空军第一大队飞行中队',
          '材料名称': '审查中',
          '图片页数': 5
        }
      ],
      type: 'card',
      lists: [],
      userInfo: {},
      sfh: '',
      name: '',
      zw: '',
      reason: '',
      jianyuanReason: []
    }
  },
  components: {
    PositionHorn
  },
  created () {
    this.getState()
    this.userInfo = JSON.parse(document.cookie.split('=')[1])
    console.log(this.userInfo, '用户信息')
    this.getList()
  },
  methods: {
    getState () {
      this.$api.application.queryCondition().then((data) => {
        this.jianyuanReason = data['转出原因']
      })
    },
    getList () {
      this.$api.build.get_jianyuanlist({
        jgmcm: this.userInfo['权限范围'],
        pageIndex: this.currpage,
        pageSize: this.pagesize
      }).then((data) => {
        this.total = data.total
        this.list = data.rows.map((item, index) => {
          item['ids'] = index + 1
          return item
        })
      })
    },
      searchjianyuan(row){
        console.log(111,row)
          // this.$router.push('/home/document_detail')   '审批状态'],item['申请单号'],item['申请业务类型'
          this.$router.push('/home/document_detail?content=' + JSON.stringify([{"姓名":row.姓名,"身份号":row.身份号}]))
      },
    search () {
      this.$api.build.get_jianyuanlist({
        sfh: this.sfh,
        name: this.name,
        zhiwu: this.zw,
        yuanyin: this.reason,
        jgmcm: this.userInfo['权限范围'],
        pageIndex: this.currpage,
        pageSize: this.pagesize
      }).then((data) => {
        this.total = data.total
        this.list = data.rows.map((item, index) => {
          item['ids'] = index + 1
          return item
        })
      })
    },
    back () {
      this.$router.back()
    },
    addDivShow () {
      this.listShow = false
    },
    handleCurrentChange (cpage) {
      this.currpage = cpage
      this.search()
    },
    handleSizeChange (psize) {
      this.pagesize = psize
      this.search()
    },
    showSearch () {
      if (this.showCondition) {
        this.showCondition = false
      } else {
        this.showCondition = true
      }
    },
    addDivClose () {
      this.listShow = true
    },
    conditionSearch () {
      //   console.log(this.zwdj)
      this.condition['职务等级'].forEach(item => {
        if (item['名称'] === this.conditionList.zwdj) {
          this.daima.zwdj = item['代码']
        }
      })
      this.condition['军衔文级'].forEach(item => {
        if (item['名称'] === this.conditionList.jxwj) {
          this.daima.jxwj = item['代码']
        }
      })
      this.condition['干部性质'].forEach(item => {
        if (item['名称'] === this.conditionList.gbxz) {
          this.daima.gbxz = item['代码']
        }
      })
      this.condition['档案现状'].forEach(item => {
        if (item['名称'] === this.conditionList.daxz) {
          this.daima.daxz = item['代码']
        }
      })
      this.condition['管理标识'].forEach(item => {
        if (item['名称'] === this.conditionList.glbs) {
          this.daima.glbs = item['代码']
        }
      })
      this.$api.application.selectCondition({
        name: this.conditionList.name,
        bubie: this.conditionList.bubie,
        zwdj: this.daima.zwdj, // 职务等级
        jxwj: this.daima.jxwj, // 军衔文集
        sfh: this.conditionList.sfh
      }).then(data => {
        this.lists = data
        // console.log(data, '查询数据')
      })
    },
    handleNodeClick (data) {
      console.log(data)
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
    .top {
      min-height: 60px;
      height: auto;
      width: 100%;
      margin-top: 15px;
      position: relative;
       z-index: 0;
      background:rgba(5,27,74,0.22);
      border:1px solid rgba(10,67,188,1);
      box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
      .top_btn {
        margin: 0 16px;
        height: 60px;
        @include box_flex;
        @include justify(space-between);
        @include align(center);
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
      .con_2 {
        margin: 20px 16px;
        padding-bottom: 20px;
      }
    }
    .materialperson_list {
      position: relative;
      background:rgba(5,27,74,0.22);
      border:1px solid rgba(10,67,188,1);
      padding-bottom: 28px;
      padding-top: 5px;
      box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
      margin-top: 16px;
      & > .con_2 {
        margin: 16px;
        box-sizing: border-box;
        button {
          border: none;
          background: none;
          color:rgba(0,254,255,1);
          padding: 4px 8px;
          background:rgba(3,129,255,0.26);
          border-radius:2px;
          border:1px solid rgba(10,67,188,1);
        }
      }
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
          width: 250px;
          margin-bottom: 8px;
          font-size: 13px;
          span {
            width: 80px;
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
          @include wh(320px, 226px);
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
            left: 128px;
            bottom: 8px;
            font-size:14px;
            span {
              width: 70px;
              height: 28px;
              display: inline-block;
              line-height: 28px;
              text-align: center;
              margin-right: 8px;
              box-shadow:0px 4px 31px 0px rgba(0, 0, 0, 0.41);
              border-radius: 2px;
              font-size: 12px;
            }
            .finish {
              background:linear-gradient(0deg,rgba(166,242,189,1),rgba(34,162,72,1));
            }
            .short_item {
              background:linear-gradient(180deg,rgba(242,188,0,1) 0%,rgba(207,113,20,1) 100%);
            }
            .null {
              background:linear-gradient(180deg,rgba(254,113,112,1) 0%,rgba(254,7,0,1) 100%);                        }
          }
        }
      }
    }
    .search_btn {
      position: relative;
      z-index: 999;
      margin-bottom: 10px;
      height:30px;
      text-align: right;
      button {
        width:80px;
        height:30px;
        border:none;
        color: #fff;
        margin: 5px 10px;
        background:linear-gradient(0deg,rgba(12,96,200,1),rgba(5,141,252,1));
        box-shadow:0px 4px 31px 0px rgba(0, 0, 0, 0.41);
        border-radius:2px;
      }
    }
    .back {
      position: absolute;
      right: 0;
      top: 0;
      width:60px;
      height:24px;
      background:rgba(3,129,255,0.26);
      border-radius:2px;
      border:1px solid rgba(10,67,188,1);
      color: #fff;
    }
    .choose {
      margin-top: 10px;
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
          background:rgba(5,27,74,0.22);
          border:1px solid rgba(10,67,188,1);
          box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
          .top_btn {
            margin: 8px 16px;
            height: 40px;
            @include box_flex;
            @include justify(space-between);
            @include align(center);
            button {
              width:72px;
              border-radius:2px;
              height:28px;
              border: none;
              background: none;
              position: relative;
              z-index: 9999;
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
      z-index: 9999;
      @include wh(160px, 640px);
      width:160px;
      height:639px;
      background:rgba(5,27,74,0.22);
      border:1px solid rgba(10,67,188,1);
      box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
      opacity:0.8;
      overflow: hidden;
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
    .btn {
      margin: 16px;
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
  }
</style>
