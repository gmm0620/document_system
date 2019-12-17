 <template>
  <div class="my-appication">
    <div>
      <MyBreadcrumb />
      <button class="back" @click="back">返回</button>
        <div class="list apply_list">
          <div>
            <div class="title">
              <span>申请列表</span>
            </div>
            <div class="table">
               <el-table
                :data="application.slice((currpage - 1) * pagesize, currpage * pagesize)"
                stripe
                style="width: 100%">
                <el-table-column
                prop="ids"
                label="序号"
                width="50"
                >
                </el-table-column>
                <el-table-column
                prop="申请单号"
                label="申请单号"
                width="130"
                >
                </el-table-column>
                <!-- <el-table-column
                prop="申请人"
                label="申请人"
                >
                </el-table-column>
                <el-table-column
                prop="身份号"
                label="身份号">
                </el-table-column> -->
                <!-- <el-table-column
                prop="申请单号"
                label="档案号"
                width="180"
                > -->
               
                <el-table-column
                prop="申请名称"
                label="申请名称"
                width="280"
                >
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
                width="150"
                >
                </el-table-column>
                <el-table-column
                prop="申请时间"
                label="申请时间"
                width="150"
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
                width="180">
                    <div slot-scope="scope">
                        <button class="look" @click="lookDetail(scope.row['审批状态'],scope.row['申请单号'],scope.row['申请业务类型'])">查看</button>
                        <button class="look" @click="withdraw(scope.row)">{{scope.row['名称'] === '撤回' ? '已撤回' : '撤回'}}</button>
                        <button class="look" @click="againApplication(scope.row)">再次申请</button>
                    </div>
                </el-table-column>
              </el-table>
              <el-pagination
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  background
                  :page-size="pagesize"
                  :page-count="20"
                  :total="application.length"
                  prev-text="上一页"
                  next-text="下一页"
                  layout="prev, pager, next, jumper">
              </el-pagination>
            </div>
          </div>
           <PostionHorn />
        </div>
    </div>
  </div>
</template>
<script>
import PostionHorn from '../../components/Postion_Horn'
import MyBreadcrumb from '@/components/My_Breadcrumb'
export default {
  name: 'my-application',
  data () {
    return {
      // stepVal2: 5,
      application: [],
      currpage: 1,
      pagesize: 15,
      applicationState: '',
      userInfo: {}
    }
  },
  components: {
    PostionHorn,
    MyBreadcrumb
  },
  created () {
    this.userInfo = JSON.parse(document.cookie.split('=')[1])
    this.getApplication()
  },
  methods: {
    handleEdit () {},
    handleDelete () {},
    withdraw (item) {
      this.$api.application.withdraw({
        shenqingID: item['申请单号']
      }).then(data => {
        if (data) {
          this.$message(data.message)
          this.getApplication()
        }
      })
    },
    againApplication (item) {
      let date = new Date()
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      this.$api.application.again({
        olddanhao: item['申请单号']
      }).then((data) => {
        this.$message('申请提交成功')
        this.getApplication()
      })
    },
    getApplication () {
      this.$api.index.serviceApplication({
        identityCode: this.userInfo['身份号']
      }).then(data => {
        // this.application = data
        // console.log(data, '全部申请')
        this.application = data.map((item, index)=> {
          item['ids'] = index + 1
          item['申请时间'] = item['申请时间'].slice(0, 10)
          // if(item['申请业务类型'] === '01') {
          //   item['申请业务类型'] = '查电子'
          // } else if (item['申请业务类型'] === '02') {
          //   item['申请业务类型'] = '查纸质'
          // }  else if (item['申请业务类型'] === '03') {
          //   item['申请业务类型'] = '借纸质'
          // }  else if (item['申请业务类型'] === '04') {
          //   item['申请业务类型'] = '查日志'
          // } 
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
    back () {
      this.$router.back()
    },
    lookDetail (state, id, type) {
      console.log(state, id, type)
      if (type === '查阅电子档案') {
           type = '01'
        } else if (type === '查阅纸质档案') {
          type = '02'
        } else if (type=== '借阅纸质档案') {
          type = '03'
        } else {
          type = '04'
        }
      this.$router.push('/home/application_detail?state=' + state + '&identityCode=' + this.userInfo['身份号'] + '&shenqingID=' + id + '&type=' + type)
    },
    handleCurrentChange (cpage) {
      this.currpage = cpage
    },
    handleSizeChange (psize) {
      this.pagesize = psize
    },
  }
}
</script>

<style lang="scss" scoped>
.my-appication {
    @include box_flex;
    @include flex;
    @include justify(center);
    // @include align(center);
    & > div{
      width: 1200px;
      height: auto;
      position: relative;
    }
    // .content {
    //   position: relative;
    // }
}
.buttonclass {
  text-align: center;
}

.uldeal {
  width: 135px;
  height: 34px;
  font-size: 13px;
  font-family: MicrosoftYaHei;
  color: rgba(255, 255, 255, 1);
  float: left;
  line-height: 17px;
  margin-top: 8px;
  margin-bottom: 35px;
}
.dealtable {
  width: 520px;
  float: left;
  margin-right: 8px;
}
.list {
  @include wh(1200px, auto);
  position: relative;
  margin-top: 20px;
  // padding-bottom:50px;
  background: rgba(5, 27, 74, 0.22);
  box-shadow: 0px 0px 26px 0px rgba(0, 229, 255, 0.2);
  border: 1px solid rgba(10, 67, 188, 0.32);
  // margin-bottom: 93px;
  // margin-left: 150px;
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
    height: 24px;
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
.content > .list > div div {
  position: relative;
  z-index: 999;
}
.table {
      margin:16px 16px 48px 16px;
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
.my-application {
  position: relative;
}
.spanbutton {
  width: 66px;
  height: 24px;
  background: rgba(3, 129, 255, 0.26);
  border-radius: 2px;
  border: 1px solid rgba(10, 67, 188, 1);
}
.lispan {
  float: left;
  width: 120px;
  text-align: center;
}
// .lispan:last-child {
//   width: 150px;
// }
.lispan1 {
  float: left;
  margin-top: 37px;
  text-align: center;
}
.elemspan {
  width: 110px;
  height: 17px;
  font-size: 13px;
  font-family: MicrosoftYaHei;
  color: rgba(255, 255, 255, 1);
  line-height: 17px;
}
.look_application {
  position: relative;
  z-index: 999;
  padding: 0 4px;
  height:20px;
  background:rgba(3,129,255,0.26);
  border:1px solid rgba(10, 67, 188, 1);
  box-shadow:0px 1px 3px 0px rgba(0, 0, 0, 0.16);
  border-radius:2px;
  color: #00FFFF;
}
.look_application.active {
  background: rgba(125, 125, 125, .5);
  color: #ccc;
}
.uldealspan {
  width: 100px;
  margin-left: -22px;
}
ul li:last-child {
  width: 150px;
}
.look {
      color: #00FEFF;
      font-size: 12px;
      width:auto;
      padding: 0 4px;
      height:24px;
      background:rgba(3,129,255,0.26);
      border-radius:2px;
      border:1px solid rgba(10,67,188,1);
}
</style>
