<template>
    <div class="project">
        <div>
            <MyBreadcrumb />
            <div class="list common_style">
                <div>
                     <div class="title">
                    <span>我的方案</span>
                </div>
                <div class="table">
                    <el-table
                    :data="list.slice((currpage - 1) * pagesize, currpage * pagesize)"
                    stripe
                    style="width: 100%">
                        <el-table-column
                        prop="ids"
                        label="序号"
                        width="80"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="方案名称"
                        label="方案名称"
                        width="200"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="方案描述"
                        label="描述"
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="方案查档对象"
                        label="查档对象"
                        width="320"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="方案来源类型"
                        label="来源类型"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="添加时间"
                        label="添加时间"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="option"
                        label="操作"
                        width="150">
                            <div slot-scope="scope">
                              <span class="use point" @click="use(scope.row)">使用</span>
                              <span class="delete point" @click="deleteProgram(scope.row)">删除</span>
                              <div class="useModel" v-if="useModel">
                                <div>
                                  <p class="title">请选择申请业务类型</p>
                                  <span class="close" @click="close">×</span>
                                  <p class="type" v-for="(item, index) in type" :key="index"><input type="radio" name="type" @change="getType(item.daima,index)"><span :class="checked === index ? 'red': ''">{{item.title}}</span></p>
                                  <button @click="sureUse">确定</button>
                                  <PostionHorn/>
                                </div>
                              </div>
                            </div>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    background
                    :page-size="pagesize"
                    :page-count="20"
                    :total="list.length"
                    prev-text="上一页"
                    next-text="下一页"
                    layout="prev, pager, next, jumper"
                    >
                    </el-pagination>
                </div>
                </div>
                <PostionHorn/>
            </div>
            <button @click="back" class="back">返回</button>
        </div>
    </div>
</template>

<script>
import MyBreadcrumb from '@/components/My_Breadcrumb'
import PostionHorn from '@/components/Postion_Horn'
export default {
  name: 'my-project',
  components: {
    MyBreadcrumb,
    PostionHorn
  },
  data () {
    return {
      list: [],
      currpage: 1,
      pagesize: 10,
      userInfo: {},
      useModel: false,
      type: [
        {
          title: '申请查阅电子档案',
          daima: '01'
        },
        {
          title: '申请查阅纸质档案',
          daima: '02'
        },
        {
          title: '申请借阅纸质档案',
          daima: '03'
        },
        {
          title: '申请查看档案日志',
          daima: '04'
        }
      ],
      daima: '',
      datas: {},
      checked:''
    }
  },
  created () {
    this.getUserInfo()
    this.getProject()
  },
  methods: {
    use (item) {
      this.useModel = true
      this.datas= item
    },
    back() {
      this.$router.back()
    },
    getUserInfo () {
      this.userInfo = JSON.parse(document.cookie.split('=')[1])
      // console.log(this.userInfo)
    },
    getType (type, index) {
      this.daima = type
      this.checked = index
    },
    close () {
      this.useModel = false;
    },
    sureUse () {
      this.useModel = false;
      if (this.daima)
      if (this.daima === '01') {
        this.$router.push({path: '/home/service/scan_files', query: this.datas})
      } else if (this.daima === '02') {
        this.$router.push({path: '/home/service/paper_archives', query: this.datas})
      } else if (this.daima === '03') {
        this.$router.push({path: '/home/service/borrow_paper_files', query: this.datas})
      } else {
        this.$router.push({path: '/home/service/log_file', query: this.datas})
      }
    },
    getProject () {
      this.$api.index.programList({
        identityCode: this.userInfo['身份号']
      }).then((data) => {
        // console.log(data, '我的方案')
        this.list = data.map((item, index) => {
          item.ids = index + 1
          item['方案查档对象'] = JSON.parse(item['方案查档对象']).map(i => {
            return i + ' '
          })
          // console.log(item['方案查档对象'])
          item['添加时间'] = item['添加时间'].slice(0, 10)
          return item
        })
      })
    },
    handleCurrentChange (cpage) {
      this.currpage = cpage
    },
    handleSizeChange (psize) {
      this.pagesize = psize
    },
    deleteProgram (item) {
      this.$api.application.deleteprogram({
        fanganUUID: item.UUID
      })
      this.getProject()
    }
  }
}
</script>

<style lang="scss" scoped>
.project {
  @include wh(100%, auto);
  @include box_flex;
  @include justify(center);
  &> div {
    @include wh(1200px, auto);
    @include box_flex;
    @include direction(column);
    @include justify(center);
    position:relative;
    .back {
      width: 60px;
      height: 24px;
      background: rgba(3, 129, 255, 0.26);
      border-radius: 2px;
      border: 1px solid #0a43bc;
      color: #fff;
      position: absolute;
      right: 0;
      top: 24px;
      z-index: 99;
    }
  }
  .list {
      @include wh(1200px, auto);
      position: relative;
      margin-top: 16px;
      background:rgba(5,27,74,0.22);
      box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2);
      border:1px solid rgba(10,67,188,0.32);
      padding-bottom: 32px;
      h3 {
          color: #fff;
          font-size: 14px;
          padding-bottom: 16px;
      }
  }
  .common_style {
      color: #fff;
      font-size: 14px;
      .title {
        height: 24px;
        margin-bottom: 8px;
        span:first-child{
          position: relative;
          top: 8px;
          left: 16px;
          &::after {
            content: '';
            @include wh(87px, 12px);
            display: inline-block;
            margin-left:8px;
            background: url('../../assets/images/tit-right.png');
          }
        }
        span:nth-child(2) {
          position: relative;
          right: 16px;
          top: 8px;
          margin-left: 176px;
        }
      }
  }
  .table {
      margin: 16px;
      position:relative;
      z-index:999;
  }
  .useModel {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top:0;
    background: rgba(0, 0, 0, .3);
    z-index:99999;
    @include box_flex;
    @include justify(center);
    @include align(center);
    &> div {
      position: relative;
      z-index:99;
      width: 350px;
      height: 250px;
      background:rgba(5,27,74,1);
      box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2) inset;
      border:1px solid rgba(10,67,188,0.65);
      p.title {
        background:rgba(11,67,187,1);
        height:35px;
        line-height: 35px;
        padding:0 16px;
        box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2);
        opacity:0.7;
        border:1px solid rgba(10,67,188,1);
      }
      span.close {
        position: absolute;
        font-size: 25px;
        right: 0px;
        top: 8px;
        cursor: pointer;
      }
      p.type {
        margin: 16px 50px;
        position: relative;
        z-index: 999;
        span.red {
          color:#ccc;
        }
      }
      button {
        border: none;
        width:80px;
        height:30px;
        background:linear-gradient(180deg,rgba(5,141,252,1) 0%,rgba(12,96,200,1) 100%);
        box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 2px 0px rgba(255,255,255,0.5);
        border-radius:2px;
        margin-left: 50px;
        color: #fff;
        position: relative;
        z-index: 999;
        left:200px;
      }
    }
  }
}
</style>
