<template>
  <div class="stage">
    <div>
      <div class="left">
        <div class="queue">单位组织序列</div>
        <div class="tree">
          <el-tree
          :data="data"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          highlight-current
          @node-click="handleNodeClick"
          ref="tree"
        ></el-tree>
        </div>
        
<!--        <el-radio v-model="radio" label="1">显示包含下级单位</el-radio>-->
        <PositionHorn />
      </div>
      <div class="right">
        <div class="top">
          <div>
            <button class="custom point" @click="showConBox">条件查询</button>
            <button class="custom point"  @click="showSqlBox">查询sql语句</button>
          </div>
          <div class="search_btn"  v-if="isShowsql">
            <button class="search point" @click="conditionSearch" @keyup.enter.native="conditionSearch()">查询</button>
            <button class="clear_all point" @click="clearAll">清空</button>
          </div>
          <div class="search_btn"  v-else>
            <button class="search point" @click="conditionSearch1" @keyup.enter.native="conditionSearch1()">查询</button>
            <button class="clear_all point" @click="clearAll">清空</button>
          </div>
          <div class="con con_flex" v-if="isShowsql">
            <div class="item">
              <span>身份号:</span>
              <el-input v-model="conditionList['sfh']" placeholder="请输入内容"></el-input>
            </div>
            <div class="item">
              <span>姓名:</span>
              <el-input v-model="conditionList['name']" placeholder="请输入内容"></el-input>
            </div>
            <div class="item">
              <span>职务等级:</span>
              <el-select v-model="conditionList['zwdj']" placeholder="请选择">
                <el-option v-for="(item, index) in condition['职务等级']" :key="index" :label="item['名称']" :value="item['代码']"></el-option>
              </el-select>
            </div>
            <div class="item">
              <span>部别:</span>
              <el-input v-model="conditionList['bubie']" placeholder="请输入内容"></el-input>
            </div>
            <div class="item">
              <span>职务名称:</span>
              <el-input v-model="conditionList['zwmc']" placeholder="请输入内容"></el-input>
            </div>
            <div class="item">
              <span>军衔文职:</span>
              <el-select v-model="conditionList['jxwj']" placeholder="请选择">
                <el-option v-for="(item, index) in condition['军衔文级']" :key="index" :label="item['名称']" :value="item['代码']"></el-option>
              </el-select>
            </div>
            <div class="item">
              <span>干部性质:</span>
              <el-select v-model="conditionList['gbxz']" placeholder="请选择">
                <el-option v-for="(item, index) in condition['干部性质']" :key="index" :label="item['名称']" :value="item['代码']"></el-option>
              </el-select>
            </div>
            <div class="item">
              <span>档案现状:</span>
              <el-select v-model="conditionList['daxz']" placeholder="请选择">
                <el-option v-for="(item, index) in condition['档案现状']" :key="index" :label="item['名称']" :value="item['代码']"></el-option>
              </el-select>
            </div>
            <div class="item">
              <span>档案号:</span>
              <el-select v-model="conditionList['glbs']" placeholder="请选择">
                <el-option v-for="(item, index) in condition['管理标识']" :key="index" :label="item['名称']" :value="item['代码']"></el-option>
              </el-select>
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
            <ul class="tab">
              <li @click="changeType('card')"><img src="../../../assets/images/kapian-1.png" alt=""><span>卡片</span></li>
              <li @click="changeType('table')"><img src="../../../assets/images/liebiao-1.png" alt=""><span>列表</span></li>
            </ul>
          </div>
          <div class="con" v-if="type === 'card'">
            <div class="list">
              <div v-for="(item, index) in list" :key="index" class="card">
                <div class="dentity">
                  <span>{{item['姓名']}}</span>
                  <span>{{item['职务名称']}}</span>
                  <img src="../../../assets/images/junzhang.png" alt="">
                </div>
                <div class="detail_info">
                  <img src="../../../assets/images/tx.png" alt="">
                  <div class="person_info">
                    <ul class="list_title">
                      <li><span>人员类别 :</span></li>
                      <li><span>籍&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;贯 :</span></li>
                      <li><span>出生时间 :</span></li>
                      <li><span>入伍时间 :</span></li>
                      <li><span>职务等级 :</span></li>
                      <li><span>技术等级 :</span></li>
                      <li><span>身&nbsp;份&nbsp;号 :</span></li>
                    </ul>
                    <ul  class="list_info">
                      <li><span>{{item['籍贯'] ? item['籍贯'] : '暂无'}}</span></li>
                      <li><span>{{item['出生时间'] && item['出生时间'].split('T')[0] ? item['出生时间'] && item['出生时间'].split('T')[0] : '暂无'}}</span></li>
                      <li><span>{{item['入伍时间'] && item['入伍时间'].split('T')[0] ? item['入伍时间'] && item['入伍时间'].split('T')[0] : '暂无'}}</span></li>
                      <li style="width:120px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;"><span title="item['职务']">{{item['职务'] ? item['职务'] : '暂无'}}</span></li>
                      <li><span>{{item['技术'] ? item['技术'] : '暂无'}}</span></li>
                      <li><span>{{item['军衔'] ? item['军衔'] : '暂无'}}</span></li>
                      <li><span>{{item['身份号'] ? item['身份号'] : '暂无'}}</span></li>
                    </ul>
                  </div>
                </div>
                <div class="add_info">
                  <span class="finish point" @click="lookDoc(item)">质量审查</span>
                </div>
              </div>
            </div>
<!--            <div class="bootom_btn">-->
<!--              <button class="updateAll">全部数据更新</button>-->
<!--              <button class="">导出档案</button>-->
<!--              <button class="">导入档案</button>-->
<!--              <button class="">更新数据</button>-->
<!--            </div>-->
            <el-pagination
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              background
              :page-size="pagesize"
              :total="length"
              prev-text="上一页"
              next-text="下一页"
              layout="prev, pager,next,jumper">
            </el-pagination>
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
              <el-table-column prop="option" label="操作" width="225">
                <div slot-scope="scope">
                  <span  @click="lookDoc(scope.row)" class="point">质量审查</span>
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
  </div>
</template>

<script>
    import PositionHorn from '@/components/Postion_Horn'
    export default {
        name: 'qualitybill',
        data () {
            return {
                data: [],
                defaultProps: {
                  children: 'children',
                  label: '单位名称',
                  jgmcm: '机构名称码'
                },
                radio: false,
                condition: [],
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
                pagesize: 6,
                currpage: 1,
                list: [],
                showCondition: false,
                type: 'card',
                daima: [],
                userInfo: {},
                isShowsql: true,
                sql:'',
                length: 0
            }
        },
        components: {
            PositionHorn
        },
        created () {
          this.userInfo = JSON.parse(document.cookie && document.cookie.split('=')[1])
          this.getData()
          this.getResult()
          this.$nextTick(function () {
              this.$data.data.forEach(row => {
                  if (row.show) {
                      this.$refs.tree.setCurrentKey(row.id)
                      this.$refs.tree.store.nodesMap[row.id].expanded = true
                  }
              })
          })
          this.queryCondition()
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
        methods: {
          conditionSearch1 () {
            this.$api.application.sqlQuery({
              sql: this.sql
            }).then( (data)=> {
              if(data instanceof Array ){
                this.list = data && data.map((item, index) => {
                  item['ids'] = index + 1
                  item['入伍时间'] = item['入伍时间'] && item['入伍时间'].slice(0, 10)
                  item['技术'] = item['技术'] ? item['技术'] : '暂无'
                  return item
                })
                console.log(data, this.sql, 'sql')
              }
            })
          },
          clearAll () {
            this.conditionList = {}
            // this.daima.zwdj = ''
            // this.daima.jxwj = ''
            this.daima = {}
            this.sql = ''
            this.getResult();
          },
          showSqlBox () {
            this.isShowsql = false
          },
          showConBox () {
            this.isShowsql = true
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
              })
          },
            back () {
                this.$router.back()
            },
            lookPaper (item) {
                console.log(1)
                if (item['纸质建档时间'] && item['纸质缺件情况']) {
                    // this.$router.push('/home/backstage/input_information')
                    this.$router.push('/home/backstage/paper_info?name=' + item['姓名'] + '&sfh=' + item['身份号'])
                } else if (item['纸质建档时间'] && !item['纸质缺件情况']) {
                    this.$router.push('/home/backstage/paper_info?name=' + item['姓名'] + '&sfh=' + item['身份号'])
                } else if (!item['纸质档案时间']) {
                    this.$router.push('/home/backstage/input_information?name=' + item['姓名'] + '&sfh=' + item['身份号'] + '&type=' + item['来源类别'])
                }
            },
            lookDoc (item) {
              let checked = {
                shenchaType: '质量',
                name: item.姓名,
                danwei: item.现管单位名称,
                jgmcm: item.机构名称码,
                rowsfh: item.身份号,
                zlbh: ''
              }
              console.log(checked)
              // if (item['电子建档时间'] && item['电子缺件情况']) {
              //   this.$router.push('/home/backstage/doc_info?sfh=' + item['身份号'])
              // } else if (item['电子建档时间'] && !item['电子缺件情况']) {
              //   this.$router.push('/home/backstage/doc_info?sfh=' + item['身份号'])
              // } else if (!item['电子档案时间']) {
              //   this.$router.push('/home/backstage/doc_info?sfh=' + item['身份号'])
              // }
              this.$router.push({path:"/home/backstage/quality_control/popup", query: checked});
            },
            changeType (type) {
                this.type = type
            },
            handleNodeClick (data) {
              if (data.children.length === 0) {
                let newdata = []
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
                this.$api.application.peopleInformation({
                  jgmcm:  data['机构名称码'],
                  pageIndex: this.currpage,
                  pageSize: this.pagesize
                }).then(data => {
                  this.length = data.total
                  this.list = data['rows'] && data['rows'].map((item, index) => {
                    item['ids'] = index + 1
                    item['入伍时间'] = item['入伍时间'] && item['入伍时间'].slice(0, 10)
                    item['技术'] = item['技术'] ? item['技术'] : '暂无'
                    return item
                  })
                })
            },
            // addPerson () {
            //   this.newModel = true
            // },
            queryCondition () {
                this.$api.application.queryCondition({
                    daima: ''
                }).then((data) => {
                    this.condition = data
                })
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
                zwdj: this.conditionList.zwdj, // 职务等级
                bubie: this.conditionList.bubie, // 部别
                zwmc: this.conditionList.zwmc, // 职务名称
                jxwj: this.conditionList.jxwj, // 军衔文级
                gbxz: this.conditionList.gbxz, // 干部性质
                daxz: this.conditionList.daxz, // 档案现状
                glbs: this.conditionList.glbs, // 管理标识
                jgmcm: this.userInfo['权限范围'],
                pageIndex: this.currpage,
                pageSize: this.pagesize
              }).then(data => {
                // this.lists = data
                this.length = data.total
                this.list = data['rows'] && data['rows'].map((item, index) => {
                  item['ids'] = index + 1
                  item['入伍时间'] = item['入伍时间'] && item['入伍时间'].slice(0, 10)
                  item['技术'] = item['技术'] ? item['技术'] : '暂无'
                  return item
                })
              })
            },
            showSearch () {
                if (this.showCondition) {
                    this.showCondition = false
                } else {
                    this.showCondition = true
                }
            },
            getResult () {
              this.$api.application.peopleInformation({
                jgmcm: this.userInfo['权限范围'],
                pageIndex: this.currpage,
                pageSize: this.pagesize
              }).then((data) => {
                this.length = data.total
                this.list = data['rows'] && data['rows'].map((item, index) => {
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
    & > div {
      @include box_flex;
      .left {
        position: relative;
        z-index: 9999;
        // @include wh(160px, 640px);
        width:160px;
        height:750px;
        background:rgba(5,27,74,0.22);
        border:1px solid rgba(10,67,188,1);
        box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
        opacity:0.8;
        overflow: hidden;
        .tree {
            width: 100%;
            height:710px;
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
      .include_bottom {
        position: absolute;
        z-index: 999;
        bottom: 0;
        height: 30px;
        background:rgba(3,94,255,0.15);
        border-radius:2px;
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
        .left_btn, .right_btn {
          position: absolute;
          left: 16px;
          top:8px;
          z-index: 999;
          button {
            width:80px;
            border-radius:2px;
            height:30px;
            border: none;
            background: none;
          }
          .add {
            background:linear-gradient(180deg,rgba(5,141,252,1) 0%,rgba(12,96,200,1) 100%);
            box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 2px 0px rgba(255,255,255,0.5);
          }
          // .search {
          //     border:1px solid rgba(0,255,255,1);
          //     color: #0ff;
          //     margin-left: 8px;
          // }
          .grade {
            margin-left: 8px;
            background:linear-gradient(180deg,rgba(194,194,194,1) 0%,rgba(91,112,131,1) 100%);
            box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 1px 0px rgba(255,255,255,0.5);
          }
        }
        .bottom {
          width: 100%;
          height: auto;
          margin-top: 16px;
          padding-bottom: 16px;
          position: relative;
          background:rgba(5,27,74,0.22);
          border:1px solid rgba(10,67,188,1);
          box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
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
                width: 300px;
                margin-bottom: 8px;
                font-size: 13px;
                span {
                  width: 70px;
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
                  left: 220px;
                  bottom: 8px;
                  font-size:14px;
                  span {
                    width: 77px;
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
                    background:linear-gradient(0deg,rgba(12,96,200,1),rgba(5,141,252,1));
                    box-shadow:0px 4px 31px 0px rgba(0, 0, 0, 0.41);
                    border-radius:2px;
                  }
                }
              }
            }
            .bootom_btn{
              width: 100%;
              height: 40px;
              button{
                background:linear-gradient(180deg,rgba(5,141,252,1) 0%,rgba(12,96,200,1) 100%);
                box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 2px 0px rgba(255,255,255,0.5);
                height: 30px;
                padding: 3px 5px;
                border: none;
                color: #FFF;
                margin-right: 20px;
                float: right;
              }
              .updateAll{
                float: left;
              }
            }
          }
          .con_2 {
            margin: 20px 16px;
            padding-bottom: 20px;
          }
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
            .el-input {
              width: 200px;
              margin-left: 15px;
            }
            .el-select {
              width: 200px;
              margin-left: 15px;
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
      .search_btn {
        position: relative;
        z-index: 999;
        @include box_flex;
        @include justify(center);
        margin-bottom: 16px;
        margin-top: -36px;
        margin-right: -800px;
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
          &.custom {
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(0,255,255,1);
            width:96px;
            height:30px;
            border:1px solid rgba(0,255,255,1);
            border-radius:2px;
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
            content: '';
            display: inline-block;
            width: 14px;
            height: 14px;
            background:#03C539;
            position: relative;
            top: 2px;
            margin-right: 8px;
            border-radius: 2px;
          }
        }
        span:nth-child(2) {
          &::before {
            background: #FEC600
          }
        }
        span:nth-child(3) {
          &::before {
            background: #FE0A04
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
      background: rgba(0, 0, 0, .6);
      @include box_flex;
      @include justify(center);
      @include align(center);
      &> div {
        width: 1000px;
        height: 500px;
        background:rgba(5,27,74,1);
        box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2) inset;
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
    .sqlBox {
      display: flex;
    }
    textarea {
        background: rgba(3, 94, 255, 0.15);
        border: 1px solid #0a43bc;
        margin-left: 16px;
        padding: 8px;
        margin-bottom: 8px;
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
      margin-top:8px;
      margin-left:8px;
      position: relative;
      z-index:9999;
      margin-bottom:8px;
    }
  }
</style>
