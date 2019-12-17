<template>
    <div class="approval">
        <div style="position: relative;">
            <h3>线下接收</h3>
            <button class="back1 point" @click="">操作提示</button>
            <button class="back point" @click="back">返回</button>
            <div class="list common_style">
                <div>
                  <div class="title">
                    <span>线下接收列表</span>
                  </div>
                  <div class="table">
                    <el-table :data="list" stripe style="width: 100%">
                      <el-table-column type="index" prop="ids" label="序号" width="50"></el-table-column>
                      <el-table-column prop="材料接收单号" label="接收单号"></el-table-column>
                      <el-table-column prop="送交单位" label="送交单位"></el-table-column>
                      <el-table-column prop="送交人姓名" label="送交人"></el-table-column>
                      <el-table-column prop="材料类别" label="材料类别"></el-table-column>
                      <el-table-column prop="材料申请名称" label="材料名称"></el-table-column>
                      <el-table-column prop="材料数量" label="材料数量"></el-table-column>
                      <el-table-column prop="名称" label="接收状态"></el-table-column>
                      <el-table-column prop="审核人姓名" label="审核人"></el-table-column>
                      <el-table-column prop="更新人姓名" label="更新人"></el-table-column>
                      <el-table-column prop="option" label="操作" width="80">
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
                      :current-page="currpage"
                      :page-count="20"
                      :total="total"
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
      list: [],
      total: 0,
      currpage: 1,
      pagesize: 6,
    }
  },
  created () {
    this.jgmcm = JSON.parse(document.cookie.split("=")[1]).机构名称码;
    this.qxfw = JSON.parse(document.cookie.split("=")[1]).权限范围;
    // this.getApproval()
    this.get_xianxiajieshou_gengduo()
  },
  methods: {
    get_xianxiajieshou_gengduo () {
      this.$api.application.get_xianxiajieshou_gengduo({
        orgId: this.qxfw,
        pageIndex: this.currpage,
        pageSize: this.pagesize
      }).then( (data)=> {
        data.rows.forEach((item, index) => {
          item.申请时间 = item.材料送交时间.substring(0, 10)
        })
        this.total = data.total
        this.list = data.rows
      })
    },
    handleCurrentChange (cpage) {
      this.currpage = cpage
      this.get_xianxiajieshou_gengduo()
    },
    handleSizeChange (psize) {
      this.pagesize = psize
      this.get_xianxiajieshou_gengduo()
    },
    back () {
      this.$router.back()
    },
    lookDeatil (item) {
      console.log(item, 'item')
      this.$router.push('/home/backstage/accept_detail?state=' + item['申请状态'] + '&clzddh=' + item['材料接收单号'])
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
  .list {
      @include wh(1200px, auto);
      position: relative;
      background:rgba(5,27,74,0.22);
      box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2);
      border:1px solid rgba(10,67,188,0.32);
      padding-bottom: 8px;
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
            background: url('../../../../../assets/images/tit-right.png');
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
      margin: 16px 24px;
      padding-bottom: 16px;
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
  .back1 {
        width:60px;
        height:24px;
        background:rgba(3,129,255,0.26);
        border-radius:2px;
        border:1px solid rgba(10,67,188,1);
        color: #fff;
        position: absolute;
        right: 70px;
        top: 24px;
        z-index: 999;
  }
}
</style>
