<template>
    <div class="user">
        <div class="top">
            <h4>基本信息录入</h4>
            <div class="input-info">
                <div>
                    <p>姓名：</p>
                    <input type="text" v-model="name">
                </div>
                <div>
                    <p>身份号：</p>
                    <input type="text" v-model="sfh">
                </div>
            </div>
            <button class="search point" @click="search">查询</button>
            <PositionHorn />
        </div>
        <div class="bottom">
            <div class="left">
                <div class="queue">单位组织序列</div>
                <el-tree
                :data="data"
                :props="defaultProps"
                node-key="id"
                default-expand-all
                highlight-current
                @node-click="handleNodeClick"
                ref="tree"></el-tree>
                <PositionHorn />
            </div>
            <div class="right">
                <div class="content">
                    <el-table
                    :data="list.slice((currpage - 1) * pagesizeTab, currpage * pagesizeTab)"
                    stripe
                    style="width: 1000px">
                    <el-table-column
                    prop="ID"
                    label="ID"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="用户名"
                    label="用户名"
                    width="130">
                    </el-table-column>
                    <el-table-column
                    prop=姓名
                    label="真实姓名">
                    </el-table-column>
                    <el-table-column
                    prop="身份号"
                    label="身份号"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="职务名称"
                    label="职务"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    prop="角色名称"
                    label="关联角色"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="手机号"
                    label="联系方式"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="状态"
                    label="启用状态"
                    width="80">
                    <div slot-scope="scope">
                        <el-switch
                        v-model="scope.row['状态']"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="changeState(scope.row)">
                        </el-switch>
                    </div>
                    </el-table-column>
<!--                    <el-table-column-->
<!--                    prop="访问次数"-->
<!--                    label="访问次数"-->
<!--                    width="80">-->
<!--                    </el-table-column>-->
                    <el-table-column
                    prop="option"
                    label="操作"
                    width="150">
                        <div slot-scope="scope">
                            <button class="btn point" @click="edit(scope.row)">编辑</button>
<!--                            <button class="btn" @click="resetPsd(scope.row)">重置密码</button>-->
                        </div>
                    </el-table-column>
                </el-table>
                <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                background
                :page-size="pagesizeTab"
                :total="list.length"
                prev-text="上一页"
                next-text="下一页"
                layout="prev, pager, next, jumper"
                >
                </el-pagination>
                </div>
                <PositionHorn />
            </div>
        </div>
        <div class="editUserModel" v-show="editmodel">
          <div>
            <div class="model_title">
              <h3>编辑用户</h3>
              <span class="close" @click="close">×</span>
            </div>
            <div class="cont_1">
              <p><span>真实姓名</span><input type="text" v-model="userinfo.name"></p>
              <p><span>所属部别</span><input type="text" v-model="userinfo.danwei"></p>
              <p><span>职位</span><input type="text" v-model="userinfo.zw"></p>
              <p>
                <span>角色</span>
                <select v-model="userinfo.js" @change="getNewRole">
                  <option v-for="(item, index) in lists" :key="index" :value="item['代码']">{{item['角色名称']}}</option>
                </select>
              </p>
              <p><span>用户名</span><input type="text" v-model="userinfo.yhm"></p>
              <p><span>请重置密码</span><input type="text" v-model="userinfo.newPsd"></p>
              <p><span>手机号</span><input type="text" v-model="userinfo.sjh"></p>
              <p><span>座机</span><input type="text" v-model="userinfo.zj"></p>
            </div>
            <div class="btn_opt">
              <button class="save point" @click="editUser">保存</button>
              <button class="backs point" @click="back">返回</button>
            </div>
            <PositionHorn />
          </div>
        </div>
        <!-- <div class="newPerson" v-if="newModel">
            <div></div>
        </div> -->
    </div>
</template>

<script>
import PositionHorn from '@/components/Postion_Horn'
export default {
  name: 'system-management',
  data () {
    return {
      data: [
      ],
      defaultProps: {
        children: 'children',
        label: '单位名称',
        jgmcm: '机构名称码'
      },
      pagesize: 8,
      pagesizeTab: 10,
      currpage: 1,
      list: [
      ],
      name: '',
      sfh: '',
      value: true,
      editmodel: false,
      userinfo: {
        id: '',
        uuid: '',
        zt: '',
        sfh: '',
        yhm: '',
        mima: '',
        name: '',
        sjh: '',
        zj: '',
        danwei: '',
        jgmcm: '',
        zw: '',
        newPsd: '',
        js: ''
      },
      lists: [],
      items: {}
    }
  },
  components: {
    PositionHorn
  },
  created () {

    this.userInfo = JSON.parse(document.cookie.split('=')[1])
    this.test()
    this.getRole()
    this.getList()
    this.$nextTick(function () {
      this.$data.data.forEach(row => {
        if (row.show) {
          this.$refs.tree.setCurrentKey(row.id)
          this.$refs.tree.store.nodesMap[row.id].expanded = true
        }
      })
    })
    // this.queryCondition()
  },
  methods: {
    test () {
       this.$api.application.unitsTree({
         sfh: this.userInfo.身份号
      }).then((data) => {
        this.data = data.map((item) => {
          item.id = item['机构名称码']
          item.children = item.children.map((item) => {
            item.id = item['机构名称码']
            item.children = []
            return item
          })
          return item
        })
        console.log(this.data)
      })
    },
    search () {
      this.$api.systemSet.selectuser({
        sfh: this.sfh,
        name: this.name
      }).then(data => {
        this.list = data.map((item, index) => {
          item['状态'] = item['状态'] === '1' ? true : false
          return item
        })
        // this.getList()
      })
    },
    edit (info) {
      console.log(info)
      this.editmodel = true
      console.log('this.userinfo.js', info.ID)
      let zt = info['状态'] === true ? '1' : '0'
      this.userinfo.name = info['姓名']
      this.userinfo.sfh = info['身份号']
      this.userinfo.uuid = info['UUID']
      this.userinfo.danwei = info['单位']
      this.userinfo.zw = info['职务名称']
      this.userinfo.js = info['角色名称']
      this.userinfo.yhm = info['用户名']
      this.userinfo.sjh = info['手机号']
      this.userinfo.zj = info['座机']
      this.userinfo.id = info['ID']
      this.userinfo.zt = zt
      this.userinfo.jgmcm = info['权限范围']
      console.log('newInfo', this.userinfo )
    },
    back () {
      this.editmodel = false
    },
    close () {
      this.editmodel = false
    },
    handleNodeClick (data) {
        console.log(11111)
        this.currpage = 1;
        this.jgmcm = data['机构名称码'];
        if (data.children.length === 0) {
        let newdata = []
        this.$api.application.unitsTree({
            id: data.id
          }).then((newdata) => {
            newdata = newdata ? newdata.map((item) => {
              item.id = item['机构名称码']
              item.children = []
              return item
            }) : []
            if (newdata && newdata.length > 0) {
                this.$nextTick(() => {
                    this.$refs.tree.updateKeyChildren(data.id,newdata);
                    // this.$refs.tree.setCurrentNode(data.id)
                })
            }
        })
      }
        this.getList()
    },
    handleCurrentChange (cpage) {
      this.currpage = cpage
      console.log(this.list.slice((this.currpage - 1) * this.pagesize, this.currpage * this.pagesize))
    },
    handleSizeChange (psize) {
      this.pagesize = psize
      this.pagesizeTab = psize
      console.log(this.list.slice((this.currpage - 1) * this.pagesize, this.currpage * this.pagesize))
    },
    // 获取用户列表
    getList () {
      this.$api.systemSet.userList({
        jgmcm: this.jgmcm
      }).then((res) => {
        console.log(res, '用户列表')
        this.list = res.map((item, index) => {
          item['状态'] = item['状态'] === '1' ? true : false
          return item
        })
      })
    },
    // 重置密码
    resetPsd (info) {
      console.log(info)
      let zt = info['状态'] === true ? '1' : '0'
      this.$api.systemSet.resetPsd({
        UUID: info['UUID'],
        zt: zt,
        sfh: info['身份号'],
        yhm: info['用户名'],
        mima: '123456',
        name: info['姓名'],
        sjh: info['手机号'],
        zj: info['座机'],
        danwei: info['单位'],
        jgmcm: info['权限范围'],
        zhiwu: info['职称范围']
      }).then(data => {
        // console.log(data)
        this.$message('重置成功')
      })
    },
    // 编辑用户
    editUser (info) {
      
      if (this.userinfo.newPsd.length >= 6 && this.userinfo.newPsd.length <= 18){
         this.$api.systemSet.resetPsd({
          // UUID: this.userinfo.uuid,
          zt: this.userinfo.zt,
          sfh: this.userinfo.sfh,
          yhm: this.userinfo.yhm,
          mima: this.userinfo.newPsd,
          name: this.userinfo.name,
          sjh: this.userinfo.sjh,
          zj: this.userinfo.zj,
          danwei: this.userinfo.danwei,
          jgmcm: this.userinfo.jgmcm,
          zhiwu: this.userinfo.zw,
          js: this.userinfo.js,
          id: this.userinfo.id
        }).then(data => {
          console.log(data)
          this.$message('编辑成功')
          this.editmodel = false
          this.getList()
        })
      } else {
        this.$message('密码长度应在6-18位之间，请重新设置！')
        this.editmodel = true
      }
     
    },
    // 切换状态
    changeState (info) {
      console.log(info, '切换状态')
      this.$api.systemSet.resetPsd({
        id: info['ID'],
        UUID: info['UUID'],
        zt: info['状态'] === true ? '1' : '0',
        sfh: info['身份号'],
        yhm: info['用户名'],
        mima: info['密码'],
        name: info['姓名'],
        sjh: info['手机号'],
        zj: info['座机'],
        danwei: info['单位'],
        jgmcm: info['权限范围'],
        zhiwu: info['职务名称']
      }).then(data => {
        console.log(data)
        this.getList()
      })
    },
    resetPsd () {
      this.$api.systemSet.resetPsd({
        UUID: this.userinfo.uuid,
        zt: this.userinfo.zt === true ? '1' : '0',
        sfh: this.userinfo.sfh,
        yhm: this.userinfo.yhm,
        mima: this.userinfo.newPsd,
        name: this.userinfo.name,
        sjh: this.userinfo.sjh,
        zj: this.userinfo.zj,
        danwei: this.userinfo.danwei,
        jgmcm: this.userinfo.jgmcm,
        zhiwu: this.userinfo.zw
      }).then(data => {
        console.log(data)
      })
    },
    // 关联角色
    getRole () {
      this.$api.systemSet.roleList().then((res) => {
        this.lists = res.map((item, index) => {
            console.log('this.lists',this.lists)
            item['ID'] = index + 1
            return item
        })
      })
    },
    getNewRole () {
      console.log(111111,this.userinfo.js)
    },
    getData () {
      this.$api.application.unitsTree({
        jgmcm: 'DC'
      }).then(data => {
        console.log(data[0])
        this.items['id'] = 1
        this.items['jgmcm'] = data['机构名称码']
        this.items['label'] = data['单位名称']
        this.items['children'] = []
        if (data) {
          data.forEach((item, index) => {
            if (item['children']) {
              var arr = []
              item.children.forEach((v, i) => {
                if (v['children']) {
                  var arr1 = []
                  v['children'].forEach((v1, i1) => {
                    arr1.push({
                      id: v1['机构名称码'],
                      label: v1['单位名称']
                    })
                  })
                  arr.push({
                    id: v['机构名称码'],
                    label: v['单位名称'],
                    children: arr1
                  })
                } else {
                  arr.push({
                    id: v['机构名称码'],
                    label: v['单位名称']
                  })
                }
              })
              this.data.push({
                id: item['机构名称码'],
                label: item['单位名称'],
                children: arr
              })
            } else {
              this.data.push({
                id: item['机构名称码'],
                label: item['单位名称']
              })
            }
          })
        }
        // data.children.forEach((item, index) => {
        //   this.items['children'].push({
        //     id: index + 2,
        //     label: item['单位名称'],
        //     jgmcm: item['机构名称码']
        //   })
        // })
        // this.data.push(this.items)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
    @include wh(1200px, auto);
    @include direction(column);
    margin: 0 auto;
    position: relative;
    .top {
        width: 100%;
        position: relative;
         z-index: 0;
        height: 112px;
        background:rgba(5,27,74,0.15);
        box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2) inset;
        border:1px solid rgba(10,67,188,0.32);
        .input-info {
            // @include box_flex;
            // @include justify(space-around);
            position: relative;
            z-index: 999;
            div {
                margin-left:16px;
                float: left;
            }
            p {
                line-height: 30px;
            }
            input {
                width:220px;
                height:28px;
                background:rgba(3,94,255,0.15);
                border-radius:2px;
                border:1px solid rgba(10,67,188,0.94);
                padding: 0 8px;
                color: #ddd;
                box-sizing: border-box;
                // outline: 1px solid rgba(0,254,255,0.6);;
            }
        }
    }
    .bottom {
        position: relative;
        margin-top:16px;
        @include box_flex;
        .left {
            position: relative;
            z-index: 99;
            width:160px;
            height:560px;
            background:rgba(5,27,74,0.22);
            border:1px solid rgba(10,67,188,1);
            box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
            opacity:0.8;
            overflow: hidden;
            .queue {
                width: 100%;
                height: 40px;
                line-height: 40px;
                padding: 0 16px;
                background:rgba(2,154,254,0.15);
                @include sizing;
                font-size: 13px;
                color: #fff;
            }
        }
        .right {
            @include flex;
            @include box_flex;
            @include direction(column);
            margin-left: 16px;
            position: relative;
            background:rgba(5,27,74,0.22);
            border:1px solid rgba(10,67,188,1);
            box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
            opacity:0.8;
            .content {
                margin: 0 auto;
                margin-top: 36px;
            }
        }
    }
    h4 {
        height: 40px;
        margin-top: 0px;
        line-height: 40px;
        padding: 0 16px;
        font-size: 14px;
        &::after {
            content: '';
            display: inline-block;
            width: 86px;
            height: 20px;
            position: relative;
            top: 8px;
            left: 10px;
            background: url('../../../assets/images/tit-right.png') no-repeat;
        }
    }
    .search {
        position: absolute;
        z-index: 9999;
        bottom: 16px;
        margin-left: 16px;
        // left: 32px;
        width:80px;
        height:28px;
        border: none;
        background:linear-gradient(180deg,rgba(5,141,252,1) 0%,rgba(12,96,200,1) 100%);
        box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 2px 0px rgba(255,255,255,0.5);
        border-radius:2px;
        color: #fff;
    }
}
.editUserModel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.5);
  z-index: 999;
  &>div {
    margin: 0 auto;
    top: 80px;
    width: 1000px;
    height:500px;
    position: relative;
    z-index: 99990;
    background:rgba(5,27,74,1);
    box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2) inset;
    // border:1px solid rgba(10,67,188,0.65);
    .model_title {
      height: 40px;
      font-size: 14px;
      background:rgba(11,67,187,1);
      box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2);
      line-height: 40px;
      opacity:0.7;
      @include box_flex;
      @include justify(space-between);
      h3 {
        padding: 0 16px;
      }
      &>span {
        padding-right: 16px;
        font-size: 24px;
        color:#029AFE;
        position: relative;
      z-index: 99999999;
      }
    }
  }
  .cont_1 {
    width: 400px;
    margin: 0 auto;
    margin-top: 50px;
    position: relative;
    z-index: 9999;
    span {
      display: inline-block;
      width: 72px;
      text-align: right;
    }
  }
  p {
    margin-bottom: 4px;
  }
  input, select {
    margin-left: 4px;
    padding: 0 8px;
    box-sizing: border-box;
    width:320px;
    height:30px;
    background:rgba(3,94,255,0.15);
    border-radius:2px;
    border:1px solid rgba(10,67,188,0.94);
    color: #ddd;
  }
  .btn_opt {
    width: 175px;
    margin: 24px auto;
    position: relative;
    z-index: 9999;
    button {
      border: none;
      background: none;
    }
    .save {
      width:80px;
      height:28px;
      background:linear-gradient(180deg,rgba(5,141,252,1) 0%,rgba(12,96,200,1) 100%);
      box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 2px 0px rgba(255,255,255,0.5) inset;
      border-radius:2px;
      color: #fff;
    }
    .backs {
      width:80px;
      height:28px;
      box-shadow:0px 2px 10px 0px rgba(0,0,0,0.53) inset;
      border-radius:2px;
      border:1px solid rgba(0,254,255,1);
      color:#00FEFF;
      margin-left: 8px;
    }
  }
}
</style>
