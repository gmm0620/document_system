<template>
  <div class="stage">
    <div class="right">
      <p style="font-size: 14px;
          margin-left: 18px;
          margin-top: 13px;">数据账单列表</p>
      <div class="con con_flex">
        <div class="item">
          <el-radio v-model="radio" label="欠账">只看欠账</el-radio>
        </div>
        <div style="margin-left: -140px">
          <el-radio v-model="radio" label="销账">只看销账</el-radio>
        </div>
        <div class="item marginLeft">
          <span>姓名:</span>
          <input type="text" v-model="name">
        </div>
        <div class="item">
          <span>部别:</span>
          <input type="text" v-model="danwei">
        </div>
        <el-button type="primary" style="width: 75px;height: 30px" @click="search" @keyup.enter.native="search()">查询</el-button>
        <el-button type="primary" style="width: 75px;height: 30px" @click="clear">清空</el-button>
      </div>
      <div class="materialperson_list common_style">
        <div class="con_2" style="margin-bottom: 50px;padding: 20px">
          <el-table style="width: 100%"
            :data="tableData">
            <el-table-column
              prop="id"
              label="序号">
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
              label="单位">
            </el-table-column>
            <el-table-column
              prop="材料类别"
              label="材料类别">
            </el-table-column>
            <el-table-column
              prop="欠销账状态"
              label="欠销账状态">
            </el-table-column>
            <el-table-column
              prop="材料添加人姓名"
              label="材料添加人">
            </el-table-column>
            <el-table-column
              prop="数据销账人姓名"
              label="数据销账人">
            </el-table-column>
            <el-table-column
              prop="添加时间"
              label="添加时间">
            </el-table-column>
            <el-table-column
              prop="销账时间"
              label="销账时间">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button v-show="scope.row['销账时间']" type="text" size="small">已销账</el-button>
                <el-button v-show="!scope.row['销账时间']" @click="handleClick(scope.row)" type="text" size="small">手动销账</el-button>
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
      <PositionHorn />
    </div>
  </div>
</template>
<script>
    import PositionHorn from '@/components/Postion_Horn'
    export default {
        name: 'databill',
        data () {
            return {
                tableData: [],
                radio: '',
                pagesize:10,
                currpage: 1,
                name: '',
                danwei: '',
                total: 0,
                userInfo: {}
            }
        },
        components: {
            PositionHorn
        },
         watch: {
          'radio': function() {
            this.search()
          }
        },
        created () {
          this.userInfo = JSON.parse(document.cookie && document.cookie.split('=')[1])
          this.getList()
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
           clear () {
            this.name=""
            this.danwei=""
            this.radio=""
            this.search()
          },
          search () {
            this.$api.qualitySet.shujulist({
              jgmcm: this.userInfo['权限范围'],
              name: this.name,
              danwei: this.danwei,
              state: this.radio,
              pageSize: this.pagesize,
              pageIndex: this.currpage,
            }).then((data) => {
              this.total = data.total
              this.tableData = data.rows.map((item, index) => {
                item.id = index + 1
                item['添加时间'] = item['添加时间'].slice(0,10)
                item['销账时间'] = item['销账时间'].slice(0,10)
                return item
              })
            })
          },
          getList () {
            this.$api.qualitySet.shujulist({
              jgmcm: this.userInfo['权限范围'],
               pageSize: this.pagesize,
              pageIndex: this.currpage,
            }).then((data) => {
              this.total = data.total
              this.tableData = data.rows.map((item, index) => {
                item.id = index + 1
                item['添加时间'] = item['添加时间'].slice(0,10)
                item['销账时间'] = item['销账时间'].slice(0,10)
                return item
              })
            })
          },
          goMaterial (path, index) {
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
          },
          handleClick (data) {
            this.$api.qualitySet.updateShuJuState({
              sfh: this.userInfo['身份号'],
              uuid: data.UUID
            }).then(data => {
              console.log(data)
            })
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
    .content .el-radio, .stage .el-radio{
      position: static;
      bottom: 0;
      z-index: 9999;
      height: 30px;
      line-height: 30px;
      width: 0%;
      text-align: center;
      background: rgba(3, 94, 255, 0.15);
      border-radius: 2px;
      color: #FFF;
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
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        margin: 0 16px;
        margin-top: 30px;
      }
      .item{
        /*display: -webkit-box;*/
        /*display: -ms-flexbox;*/
        /*display: flex;*/
        /*display: -webkit-flex;*/
        /*text-align: right;*/
        width: 222px;
        margin-bottom: 8px;
        font-size: 13px;
        &.marginLeft {
          margin-left: 100px;
        }
      }
      .item input{
        width: 155px;
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
