 <template>
  <div class="application-detail">
    <div>
      <MyBreadcrumb />
      <button class="back" @click="back">返回</button>
      <div class="content">
        <div class="list apply_list">
          <div style="padding-bottom: 25px;">
            <div class="tab">
              <span v-for="(item, index) in cddx" :key="index" :class="active === index ? 'active' : ''" @click="changeIndex(index)">{{item.姓名}}</span>
            </div> 
            <div class="particulars">
              <ul>
                <li class="lispan">
                  <span style="color:#029AFE">档案号</span>
                </li>
                <li class="lispan">
                  <span style="color:#029AFE">姓名</span>
                </li>
                <li class="lispan">
                  <span style="color:#029AFE">时间范围</span>
                </li>
                <li class="lispan">
                  <span style="margin-left: 90px;color:#029AFE">操作类型</span>
                </li>
              </ul>
              <ul>
                <li class="lispan1">
                  <span class="elemspan">{{cdData['档案号']}}</span>
                </li>
                <li class="lispan1">
                  <span class="elemspan">{{cdData['姓名']}}</span>
                </li>
                <li class="lispan1">
                  <span class="elemspan">{{cdData['时间范围']}}</span>
                </li>
                <li class="lispan2">
                  <span class="elemspan">{{cdData['操作类型']}}</span>
                </li>
              </ul>
            </div>
            <div class="shenqing_list">
              <span class="primary_ziti">档案日志列表1</span>
            </div>
            <div
              style="width:1152px;background:rgba(3,94,255,0.15);border:1px solid rgba(11,66,187,1);margin:20px"
             >
              <el-table :data="tableData.slice(pagesize * (currentpage-1),currentpage *pagesize )" style="width: 100%">
                <el-table-column prop="ids" label="序号" width="180"></el-table-column>
                <el-table-column prop="操作时间" label="时间" width="180"></el-table-column>
                <el-table-column prop="操作人姓名" label="操作人姓名"></el-table-column>
                <el-table-column prop="操作人身份号" label="身份号" width="180"></el-table-column>
                <el-table-column prop="操作类型" label="操作类型"></el-table-column>
                <el-table-column prop="操作终端IP" label="操作终端ip" width="180"></el-table-column>
              </el-table>
              <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                background
                :page-size="pagesize"
                :total="this.tableData.length"
                prev-text="上一页"
                next-text="下一页"
                layout="prev, pager, next, jumper"
                >
              </el-pagination>
            </div>
            <PostionHorn />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PostionHorn from '../../components/Postion_Horn'
import MyBreadcrumb from '@/components/My_Breadcrumb'
export default {
  name: 'application-detail',
  data () {
    return {
      stepVal2: 5,
      pagesize: 10,
      currentpage: 1,
      tableData: [],
      tab: [
        {
          name: '李逍遥'
        },
        {
          name: '朱山东'
        }
      ],
      active: 0,
      cddx: '',
      cdData: {
        '档案号': '',
        '姓名': '',
        '时间范围': '',
        '操作类型': ''
      }
    }
  },
  components: {
    PostionHorn,
    MyBreadcrumb
  },
  created () {
    this.getLogData(0)
    // this.cdData['档案号'] = JSON.parse(this.$route.query.content)[0][0]['档案号']
    // this.cdData['姓名'] = JSON.parse(this.$route.query.content)[0][0]['姓名']
    // this.cdData['操作类型'] = JSON.parse(this.$route.query.content)[0][0]['操作类型']
    this.tableData = JSON.parse(this.$route.query.content)[0].map((item, index) => {
      item.ids = index + 1
      return item
    })
    // this.detail()
  },
  methods: {
    handleCurrentChange (cPage) {
      this.currentpage = cPage
    },
    handleSizeChange () {},
    getLogData (index) {
      this.active = index
      this.cddx = JSON.parse(this.$route.query.option).reverse()
      this.$api.application.getLogData({
        sfh: this.cddx[index].身份号,
        shenqingID: this.$route.query.shenqingID
      }).then((data) => {
        this.cdData.档案号 = data[0].档案号
        this.cdData.姓名 = this.cddx[index].姓名
        this.cdData.操作类型 = data[0].操作类型
        this.cdData.时间范围 = data[0].开始时间.slice(0, 10) + '至' + data[0].结束时间.slice(0, 10)
      })
    },
    back () {
      this.$router.push('/home/home')
    },
    detail () {
      // this.$api.detail.applicationDetails({
      //   identityCode: '1111111',
      //   shenqingID: '1000045112014',
      //   yewuType: '04'
      // }).then(data => {
      //   console.log(data)
      // })
    },
    changeIndex (index) {
      this.active = index
      this.getLogData(index)
      this.tableData = JSON.parse(this.$route.query.content)[index].map((item, index) => {
        item.ids = index + 1
        return item
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.application-detail {
    @include box_flex;
    @include flex;
    @include justify(center);
    & > div{
      width: 1200px;
      height: auto;
      position: relative;
    }
}
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  content: "";
  position: absolute;
  background-color: #0a43bc !important;
  z-index: 1;
}
.shenqing_list {
  margin-top: 10px;
  margin-left: 29px;
}
.primary_ziti {
  width: 112px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 20px;
}
.lispan1 {
  float: left;
  width: 250px;
  margin-left: 20px;
  margin-top: 20px;
}
.lispan2 {
  float: left;
    // width: 250px;
  margin-left: 110px;
  margin-top: 20px;
}
.lispan {
  float: left;
  width: 250px;
  margin-left: 20px;
  margin-top: 5px;
}
.lispan3 {
  float: left;
  width: 190px;
  margin-left: 80px;
  margin-top: 10px;
}
.lispan4 {
  float: left;
  width: 200px;
  //   margin-left: 10px;
  margin-top: 10px;
}
.particulars {
  width: 1152px;
  height: 95px;
  background: rgba(3, 94, 255, 0.15);
  border: 1px solid rgba(11, 66, 187, 1);
  margin: 20px;
}
.query {
  width: 1365px;
  height: 869;
}
.list {
  @include wh(1200px, auto);
  position: relative;
  margin-top: 15px;
  background: rgba(5, 27, 74, 0.22);
  box-shadow: 0px 0px 26px 0px rgba(0, 229, 255, 0.2);
  border: 1px solid rgba(10, 67, 188, 0.32);
  h3 {
    color: #fff;
    font-size: 14px;
    padding-bottom: 16px;
  }
}
.apply_list {
  color: #fff;
  font-size: 14px;
  margin-bottom: 20px;
  .title {
    height: 28px;
    margin-bottom: 8px;
    span:first-child {
      position: relative;
      top: 8px;
      left: 16px;
      &::after {
        content: "";
        @include wh(87px, 12px);
        display: inline-block;
        margin-left: 8px;
        background: url("../../assets/images/tit-right.png");
      }
    }
  }
}
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
  z-index: 999;
}
.tab {
  height: 35px;
  line-height: 35px;
  margin: 16px 20px;
  // border: 1px solid #ccc;
  border: 1px solid rgba(11, 66, 187, 1);
  background: rgba(3, 94, 255, 0.15);
  position: relative;
  z-index: 9999;
  span {
    padding: 0 8px;
    cursor: pointer;
  }
  span.active {
    color: #029AFE;
  }
}
</style>
