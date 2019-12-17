<template>
  <div class="stage">
    <div class="right" style="padding: 15px">
      <div class="con con_flex" >
        <div class="item">
          <el-date-picker
            style="background: rgba(3, 94, 255, 0.15);border: 1px solid #0a43bc;"
            class="point"
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="item">
          <span>用户行为:</span>
          <input type="text" v-model="type">
        </div>
        <div class="item">
          <span>身份号:</span>
          <input type="text" v-model="sfh">
        </div>
        <!--        <div class="item">-->
        <!--          <span>职务名称:</span>-->
        <!--          <input type="text">-->
        <!--        </div>-->
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
              prop="操作业务"
              label="用户行为"
            >
            </el-table-column>
            <el-table-column
              prop="时间"
              label="时间"
            >
            </el-table-column>
            <el-table-column
              prop="IP"
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
                value1: '',
                value2: '',
                data: [],
                tableData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                pagesize: 10,
                currpage: 1,
                list: [],
                items: {},
                length: 0,
                sfh: '',
                type: '',
                startTime: '',
                endTime: ''
            }
        },
        components: {
            PositionHorn
        },
        created () {
          this.userInfo = JSON.parse(document.cookie && document.cookie.split('=')[1])
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
            this.$api.analysisfolder.systemLog({
              jgmcm: this.userInfo['权限范围'],
              sfh: this.sfh,
              xingwei: this.type,
              beginTime:this.startTime,
              endTime: this.endTime,
              pageSize: this.pagesize,
              pageIndex: this.currpage
            }).then((data) => {
              this.length = data.total
              this.tableData = data.rows.map((item, index) => {
                item.id = index + 1
                item['时间'] = item['时间'].slice(0,10)
                return item
              })
            })
          },
          getList () {
            this.$api.analysisfolder.systemLog({
              jgmcm: this.userInfo['权限范围'],
              pageSize: this.pagesize,
              pageIndex: this.currpage
            }).then((data) => {
              this.length = data.total
              this.tableData = data.rows.map((item,index) => {
                item.id = index+1
                item.时间 = item.时间.slice(0, 10)
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
    .el-date-editor .el-range-input{
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: none;
      outline: 0;
      padding: 0;
      width: 39%;
       color: #606266;
      background: none;
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


  }

</style>
