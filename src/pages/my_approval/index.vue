<template>
    <div class="approval">
        <div style="position: relative;">
            <MyBreadcrumb />
            <button class="back" @click="back">返回</button>
            <div class="list common_style">
                <div>
                    <div class="title">
                        <span>我的审批</span>
                    </div>
                  <!--  <div class="opt_btn">
                        <button class="agree">同意</button>
                        <button class="submit">提交上级</button>
                        <button class="stop">暂缓办理</button>
                    </div> -->
                    <div class="table">
                        <el-table
                            :data="approval"
                            stripe
                            style="width: 100%">
                            <!-- <el-table-column
                            type="selection"
                            label="选中"
                            width="58">
                            </el-table-column> -->
                            <el-table-column
                            prop="ids"
                            label="序号"
                            width="50"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="申请单号"
                            label="审批单号"
                            width="130"
                            >
                            </el-table-column>
                            <!-- <el-table-column
                            prop="申请人姓名"
                            label="申请人"
                            >
                            </el-table-column> -->
                            <el-table-column
                            width="320"
                            prop="申请名称"
                            label="申请名称">
                            </el-table-column>
                            <!-- <el-table-column
                            prop="申请人"
                            label="身份号">
                            </el-table-column> -->
                            <!-- <el-table-column
                            prop="申请单号"
                            label="档案号"
                            width="180"
                            > -->
                            </el-table-column>
                            <el-table-column
                            prop="申请业务类型"
                            label="申请类型"
                            width="120"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="申请单位"
                            label="单位"
                            width="180"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="申请时间"
                            label="申请时间"
                            width="100"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="审批时间"
                            label="截止时间"
                            width="100"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="名称"
                            label="审批状态"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="option"
                            label="操作"
                            width="80">
                                <div slot-scope="scope">
                                    <button class="look" @click="lookDeatil(scope.row)">查看</button>
                                </div>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                            @current-change="handleCurrentChange"
                            @size-change="handleSizeChange"
                            background
                            :page-size="pagesize"
                            :page-count="20"
                            :total="length"
                            prev-text="上一页"
                            next-text="下一页"
                            layout="prev, pager, next, jumper">
                        </el-pagination>
                    </div>
                </div>
                <PostionHorn/>
            </div>
        </div>
    </div>
</template>

<script>
import MyBreadcrumb from '@/components/My_Breadcrumb'
import PostionHorn from '@/components/Postion_Horn'
export default {
  name: 'my-approval',
  components: {
    MyBreadcrumb,
    PostionHorn
  },
  data () {
    return {
      approval: [],
      currpage: 1,
      pagesize: 10,
      userInfo: {},
      length: 0
    }
  },
  created () {
    this.userInfo = JSON.parse(document.cookie.split('=')[1])
    this.getApproval()
  },
  methods: {
    getApproval () {
      this.$api.index.approvalList({
        pageIndex: this.currpage,
        pageSize: this.pagesize,
        identityCode: this.userInfo['身份号']
      }).then(data => {
        console.log(data, '我的审批')
        this.length = data.total
        this.approval = data['rows'].map((item, index) => {
          item['ids'] = index + 1
          item['审批时间'] = item['审批时间']&&item['审批时间'].slice(0, 10)
          item['申请时间'] = item['申请时间']&&item['申请时间'].slice(0, 10)
          if (item['申请业务类型'] === '01') {
            item['申请业务类型'] = '查阅电子档案'
          } else if (item['申请服务类型'] === '02') {
            item['申请业务类型'] = '查阅纸质档案'
          } else if (item['申请服务类型'] === '03') {
            item['申请业务类型'] = '借阅纸质档案'
          } else {
            item['申请业务类型'] = '查看档案日志'
          }
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
    back () {
      this.$router.back()
    },
    lookDeatil (item) {
      console.log(item, 'item')
      this.$router.push('/home/approval_detail?state=' + item['审批状态'] + '&identityCode=' + this.userInfo['身份号'] + '&shenqingID=' + item['申请单号'] + '&type=' + item['申请业务类型'])
    }
  }
}
</script>

<style lang="scss" scoped>
.approval {
  @include wh(100%, auto);
  @include box_flex;
  @include justify(center);
  &> div {
    @include wh(1200px, auto);
    @include box_flex;
    @include direction(column);
    @include justify(center);
  }
  .list {
      @include wh(1200px, auto);
      position: relative;
      margin-top: 16px;
      background:rgba(5,27,74,0.22);
      box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2);
      border:1px solid rgba(10,67,188,0.32);
      // padding-bottom: 8px;
      h3 {
          color: #fff;
          font-size: 14px;
          padding-bottom: 16px;
      }
  }
  .common_style {
    //   @include box_flex;
    //   @include align(center);
      color: #fff;
      font-size: 14px;
      padding-bottom:24px;
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
  .opt_btn {
      position: absolute;
      z-index: 999;
      right: 16px;
        button {
        width:96px;
        height:30px;
        border:none;
        color: #fff;
        margin-left: 8px;
    }
    .agree {
        background:linear-gradient(0deg,rgba(12,96,200,1),rgba(5,141,252,1));
        box-shadow:0px 4px 31px 0px rgba(0, 0, 0, 0.41);
        border-radius:2px;
    }
    .submit {
        background:linear-gradient(0deg,rgba(166,242,189,1),rgba(34,162,72,1));
        box-shadow:0px 4px 31px 0px rgba(0, 0, 0, 0.41);
        border-radius:2px;
    }
    .stop {
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(0,255,255,1);
        border:1px solid rgba(0,255,255,1);
        border-radius:2px;
        background: none;
    }
  }
  .table {
      margin: 24px 16px;
  }
  .look {
        color: #00FEFF;
        font-size: 12px;
        width:48px;
        height:24px;
        background:rgba(3,129,255,0.26);
        border-radius:2px;
        border:1px solid rgba(10,67,188,1);
  }
  .back {
        width:60px;
        height:24px;
        background:rgba(3,129,255,0.26);
        border-radius:2px;
        border:1px solid rgba(10,67,188,1);
        color: #fff;
        position: absolute;
        right: 0;
        top: 24px;
        z-index: 999;
  }
}
</style>
