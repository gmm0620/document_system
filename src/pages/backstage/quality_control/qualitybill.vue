<template>

  <div class="stage">
    <div class="right">
            <p style="font-size: 14px;
          margin-left: 18px;
          margin-top: 13px;">质量账单列表</p>
      <div class="con con_flex">
        <div class="item">
          <span>姓名:</span>
          <input type="text" v-model="name">
        </div>
        <div class="item">
          <span>部别:</span>
          <input type="text" v-model="danwei">
        </div>
        <el-button type="primary" style="width: 75px;height: 30px" @click="search"  @keyup.enter.native="search()">查询</el-button>
        <el-button type="primary" style="width: 75px;height: 30px" @click="clear">清空</el-button>
      </div>
      <div class="materialperson_list common_style">
        <div class="con_2" style="margin-bottom: 50px;padding: 20px">
          <el-table style="width: 100%"
            :data="tableData">
            <el-table-column
              prop="id"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="身份号"
              label="身份号">
            </el-table-column>
            <el-table-column
              prop="姓名"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="单位"
              label="单位"
              width="180"
              >
            </el-table-column>
            <el-table-column
              prop="审查原因"
              label="审查原因">
            </el-table-column>
            <el-table-column
              prop="审查时间"
              label="审查时间"
             >
            </el-table-column>
            <el-table-column
              prop="手工审查结果"
              label="手工审查结果"
              width="150">
            </el-table-column>
            <el-table-column
              prop="自动审查结果"
              label="自动审查结果"
              >
            </el-table-column>
            <el-table-column
              prop="审查人姓名"
              label="审查人姓名"
              >
            </el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange">
          </el-pagination>
        </div>
        <PositionHorn />
      </div>
<!--      <PositionHorn />-->
    </div>
  </div>
</template>
<script>
    import PositionHorn from '@/components/Postion_Horn'
    export default {
        name: 'system-management',
        data () {
            return {
                data: [],
                tableData:[],
                pagesize: 10,
                currpage: 1,
                list: [],
                showCondition: false,
                type: 'card',
                items: {},
                name: '',
                danwei: '',
                total: 0,
                userInfo: {}
            }
        },
        components: {
            PositionHorn
        },
        created () {
           this.userInfo = JSON.parse(document.cookie && document.cookie.split('=')[1])
           this.getList()
           console.log(this.userInfo)
            //查询
            var _self = this;
            document.onkeydown = function(e){
                if(window.event == undefined){
                    var key = e.keyCode;
                }else{
                    var key = window.event.keyCode;
                }
                if(key == 13){
                    _self.search();

                }
            }
        },
        methods: {
            handleClick(row){
                console.log('handleClick',row)
                this.zlbh=row.质量审查编号;
                this.sfh=row.身份号;
                this.$router.push({path:"/home/backstage/quality_control/popup",query: {"zlbh": this.zlbh, "sfh": this.sfh,"xianshi": 'xianshi'}});
                // this.$router.push({path:"/home/backstage/quality_control/popup", query: {"shenchaType": shenchaType, "name": row.姓名, "danwei": row.部别, "jgmcm": row.机构名称码, "rowsfh": row.身份号, "zlbh": row.zlbh}});
            },
          clear () {
            this.name=""
            this.danwei=""
            this.search()
          },
          search () {
            this.$api.qualitySet.qualityList({
              jgmcm: this.userInfo['权限范围'],
              pageSize: this.pagesize,
              pageIndex: this.currpage,
              name: this.name,
              danwei: this.danwei
            }).then((data) => {
              this.total = data.total
              this.tableData = data.rows.map((item, index) => {
                item.id = index + 1
                item['审查时间'] = item['审查时间'].slice(0,10)
                return item
              })
            })
          },
          getList () {
            this.$api.qualitySet.qualityList({
              jgmcm: this.userInfo['权限范围'],
              pageSize: this.pagesize,
              pageIndex: this.currpage
            }).then((data) => {
              this.total = data.total
              this.tableData = data.rows.map((item, index) => {
                item.id = index + 1
                item['审查时间'] = item['审查时间'].slice(0,10)
                return item
              })
            })
          },
          goMaterial (path, index) {
            console.log(11)
            this.$router.push({
                path: path
            })
          },
          handleCurrentChange (cpage) {
            this.currpage = cpage
            this.search()
          },
          handleSizeChange (){
            this.pagesize = psize
            this.search()
          }
        }
    }
</script>
<style lang="scss" scoped>
  /*.posi_bg_horn{*/
  /*  width: 100%;*/
  /*  height: 100%;*/
  /*  display: block;*/
  /*  position: inherit;*/
  /*  top: 0;*/
  /*  left: 0;*/
  /*}*/
  .stage {
    @include wh(1200px, auto);
    margin: 0 auto;
    position: relative;
    @include box_flex;
    .title {
      width: 100%;
      font-size: 15px;
      height: 40px;
      margin: 16px 0;
      border-bottom: 1px solid #0A43BC;
      @include box_flex;
      span {
        line-height: 40px;
        width: 120px;
        text-align: center;
        background:rgba(3,94,255,0.15);
        &.active {
          background: rgba(3,94,255,0.6);
        }
      }
    }

    .right {
      @include flex;
      @include direction(column);
      position: relative;
      /*margin-left: 16px;*/
      background:rgba(5,27,74,0.22);
      border:1px solid rgba(10,67,188,1);
      box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
      opacity:0.8;
      h3 {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0 16px;
        box-sizing: border-box;
        //  opacity: 0.8;
        background:rgba(2,154,254,0.15);
      }
      .title{
        width: 100%;
        font-size: 15px;
        height: 40px;
        margin: 16px 0;
        border-bottom: 1px solid #0A43BC;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
      }
      .con_flex{
        width: 1050px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        margin: 0 16px;
        margin-top: 30px;
      }
      .item{
        /*display: -webkit-box;*/
        /*display: -ms-flexbox;*/
        /*display: flex;*/
        /*display: -webkit-flex;*/
        /*text-align: right;*/
        width: 290px;
        margin-bottom: 8px;
        font-size: 13px;
      }
      .item input{
        width: 220px;
        height: 30px;
        background: rgba(3, 94, 255, 0.15);
        border: 1px solid #0a43bc;
        border-radius: 2px;
        color: #fff;
        margin-left: 8px;
        padding: 0 8px;
        outline: none;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
    }
  }
</style>
