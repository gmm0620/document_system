<template>
  <div class="stage2">
    <div class="right">

      <el-card style="width: 100%;height: 100%;">
        <div class="item1" style="float: right;z-index: 1;position: absolute;right: 20px;">
          <el-date-picker
            class="point"
            v-model="value1"
            @change="changeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <div id="myCharts" :style="{width: '100%', height: '500%',position:'static' }" ref="myCharts"></div></el-card>
      <div class="materialperson_list common_style">
        <PositionHorn />
      </div>
      <PositionHorn />
    </div>
  </div>
</template>
<script>
    import PositionHorn from '@/components/Postion_Horn'
    import echarts from 'echarts'
    export default {
        name: 'system-management',
        data () {
            return {
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                value1: '',
                value2: '',
                Docusage:[],
                userInfo:{}
            }
        },
        components: {
            PositionHorn
        },
        created () {
          this.userInfo = JSON.parse(document.cookie.split("=")[1]);
        },
        methods: { //queryDocUsage
            changeRange(res){
                console.log('changeRangeres',res)
                this.getTableList();
            },

            getTableList () {
                console.log(' this.value1', this.value1)
                this.startTime=this.value1[0];
                this.endTime=this.value1[1];
                this.$api.systemSet.queryDocUsage(
                    {
                        jgmcm: this.userInfo['权限范围'],
                        startTime: this.startTime,
                        endTime: this.endTime
                    }
                ).then((res) => {
                    console.log('rdataes',res.data)
                    // if (res.code) {
                    this.Docusage = res.data
                    const  myCharts = this.$echarts.init(this.$refs.myCharts);
                    let options = {
                        color: ['#3398DB'],
                        title: {
                            text: '申请次量',
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : ['查阅电子档案', '查阅电子档案', '借阅电子档案','查看档案日志'],
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:'数量',
                                type:'bar',
                                barWidth: '15%',
                                data:this.Docusage
                            }
                        ]
                    };
                    myCharts.setOption(options);
                })
            },
        },
        mounted(){
            this.getTableList()
        }
    }
</script>
<style lang="scss" scoped>
  .stage2 {
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
    .posi_bg_horn{
      width: 100%;
      height: 100%;
      display: block;
      position: static;
      top: 0;
      left: 0;
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
