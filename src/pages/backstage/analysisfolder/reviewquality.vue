<template>
  <div class="stage">
    <div class="right" style="padding: 15px">
      <div class="con con_flex" >
        <div class="item">
          <el-date-picker
            class="point"
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="item">
          <span>操作类型:</span>
          <el-select v-model="type" placeholder="请选择">
            <el-option v-for="(item, index) in optionType" :key="index" :value="item.名称">{{item.名称}}</el-option>
          </el-select>
        </div>
        <div class="item">
          <span>身份号:</span>
          <input type="text" v-model="sfh">
        </div>
        <el-button type="primary" style="width: 75px;height: 30px" @click="search">查询</el-button>
        <el-button type="primary" style="width: 75px;height: 30px" @click="clear">清空</el-button>
      </div>
      <div class="materialperson_list common_style">
        <div class="con_2" style="margin-bottom: 50px">
          <el-table
            :data="tableData" >
            <el-table-column
              prop="id"
              label="序号"
              >
            </el-table-column>
            <el-table-column
              prop="姓名"
              label="姓名"
              >
            </el-table-column>
            <el-table-column
              prop="身份号"
              label="身份号"
              >
            </el-table-column>
            <el-table-column
              prop="部职别"
              label="单位"
              >
            </el-table-column>
            <el-table-column
              prop="操作时间"
              label="操作时间"
              >
            </el-table-column>
            <el-table-column
              prop="操作人姓名"
              label="操作人"
              >
            </el-table-column>
            <el-table-column
              prop="操作人身份号"
              label="操作人身份号">
            </el-table-column>
            <el-table-column
              prop="操作类型"
              label="操作类型"
              >
            </el-table-column>
            <el-table-column
              prop="zip"
              label="操作终端IP"
              width="120">
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="length"
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
      name: 'system-management',
      data () {
          return {
              data: [],
              value1: '',
              value2: '',
              tableData: [],
              pagesize: 10,
              currpage: 1,
              showCondition: false,
              type: '',
              items: {},
              userInfo: {},
              length: 0,
              sfh: '',
              startTime: '',
              endTime: '',
              optionType: []
          }
      },
      components: {
          PositionHorn
      },
      created () {
        this.userInfo = JSON.parse(document.cookie && document.cookie.split('=')[1])
        this.getType()
        this.getList()
      },
      methods: {
        clear () {
          this.sfh=""
          this.value1=""
          this.type=""
          this.search()
        },
        search () {
          this.startTime =this.value1 ? this.value1[0].getFullYear() + '-' + (this.value1[0].getMonth() + 1) + '-' +this.value1[0].getDate() : ''
            this.endTime =this.value1 ? this.value1[1].getFullYear() + '-' + (this.value1[1].getMonth() + 1) + '-' +this.value1[1].getDate(): ''
          this.$api.analysisfolder.queryLog({
            jgmcm: this.userInfo['权限范围'],
            sfh: this.sfh,
            leixing: this.type,
            beginTime:this.startTime,
            endTime: this.endTime,
            pageSize: this.pagesize,
            pageIndex: this.currpage
          }).then((data) => {
            this.length = data.total
            this.tableData = data.rows.map((item, index) => {
              item.id = index + 1
              item['操作时间'] = item['操作时间'].slice(0,10)
              return item
            })
          })
        },
        getType () {
          this.$api.application.queryCondition().then((data) => {
            this.optionType = data['档案操作类型']
          })
        },
        getList () {
          this.$api.analysisfolder.queryLog({
            jgmcm: this.userInfo['权限范围'],
            pageSize: this.pagesize,
            pageIndex: this.currpage
          }).then((data) => {
            this.length = data.total
            this.tableData = data.rows.map((item,index) => {
              item.id = index+1
              item.操作时间 = item.操作时间.slice(0, 10)
              return item
            })
          })
        },
        changeRange () {},
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

 .el-input__inner{
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    /*border: 1px solid #DCDFE6;*/
   background: rgba(3, 94, 255, 0.15);
   border: 1px solid #0a43bc;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 32px;
    line-height: 32px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 85%;
  }

 .posi_bg_horn{
   width: 100%;
   height: 100%;
   display: block;
   position: static;
   top: 0;
   left: 0;
 }
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
        /*width: 1050px;*/
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        margin: 0 16px;
        margin-top: 30px;
      }

      .item{
        /*display: -webkit-box;*/
        /*display: -ms-flexbox;*/
        /*display: flex;*/
        /*display: -webkit-flex;*/
        /*text-align: right;*/
        width: 300px;
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
    select {
      height:30px;
      background: rgba(3, 94, 255, 0.15);
      border: 1px solid rgba(10, 67, 188, 0.94);
      border-radius: 2px;
      color: #fff;
      width:220px;
    }
  }

</style>
