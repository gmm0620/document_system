<template>
    <div class="stage add">
        <div class="title">
          <span v-for="(item, index) in titleData" :key="index" :class="item.path === $route.fullPath ? 'active' : ''" @click="goMaterial(item.path)">{{item.label}}</span>
        </div>
        <button v-if="$route.path === '/home/backstage/system-management/unit'" class="refresh"></button>
        <button v-if="$route.path === '/home/backstage/system-management/user'" class="addUser" @click="addUser"></button>
        <router-view></router-view>
    </div>
</template>

<script>
import PositionHorn from '@/components/Postion_Horn'
export default {
  name: 'system-manager',
  components: {
    PositionHorn
  },
  data () {
    return {
      titleData: [],
      // titleData: [
      //   {
      //     label: '单位',
      //     path: '/home/backstage/system-management/unit'
      //   },
      //   {
      //     label: '用户',
      //     path: '/home/backstage/system-management/user'
      //   },
      //   {
      //     label: '角色',
      //     path: '/home/backstage/system-management/role'
      //   },
      //   {
      //     label: '目录模板',
      //     path: '/home/backstage/system-management/dirTemplate'
      //   },
      //   {
      //     label: '材料类别',
      //     path: '/home/backstage/system-management/materialType'
      //   },
      //   {
      //     label: '数据字典',
      //     path: '/home/backstage/system-management/dictionary'
      //   },
		  //   {
      //     label: '查看表结构',
      //     path: '/home/backstage/system-management/customTable'
      //   },
      //   {
      //     label: '数据库接口',
      //     path: '/home/backstage/system-management/database'
      //   },
      //   {
      //     label: '微服务接口',
      //     path: '/home/backstage/system-management/micro_service'
      //   },
      //   {
      //     label: '数据备份',
      //     path: '/home/backstage/system-management/backup'
      //   }
      // ],
      addUserModel: true,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      ruleForm: {
        bumen: '',
        username: '',
        realname: '',
        password: '',
        repeatpass: '',
        position: '',
        group: '',
        email: '',
        zhanghao: '',
        date: '',
        sex: true,
        passRepeat: ''
      }
    }
  },
  created () {
    let qx = JSON.parse(sessionStorage.getItem('qx'))
    qx.forEach((item, index) => {
      if (item.权限名称 === '系统管理') {
        item.children.forEach((item2, index2) => {
          switch (item2.权限名称) {
            case '单位':
              this.titleData.push({label: '单位',path: '/home/backstage/system-management/unit'})
              break
            case '用户':
              this.titleData.push({label: '用户',path: '/home/backstage/system-management/user'})
              break
            case '角色':
              this.titleData.push({label: '角色',path: '/home/backstage/system-management/role'})
              break
            case '目录模板':
              this.titleData.push({label: '目录模板',path: '/home/backstage/system-management/dirTemplate'})
              break
            case '材料类别库':
              this.titleData.push({label: '材料类别',path: '/home/backstage/system-management/materialType'})
              break
            case '数据字典':
              this.titleData.push({label: '数据字典',path: '/home/backstage/system-management/dictionary'})
              break
            case '自定义表':
              this.titleData.push({label: '查看表结构',path: '/home/backstage/system-management/customTable'})
              break
            case '数据库接口':
              this.titleData.push({label: '数据库接口',path: '/home/backstage/system-management/database'})
              break
            case '微服务接口':
              this.titleData.push({label: '微服务接口',path: '/home/backstage/system-management/micro_service'})
              break
            case '数据备份':
              this.titleData.push({label: '数据备份',path: '/home/backstage/system-management/backup'})
              break
          }
        })
      }
    })
  },
  methods: {
    back () {
      this.$router.back()
    },
    goMaterial (path) {
      this.$router.push(path)
      console.log(path, '系统管理')
    },
    addUser () {
      this.$router.push('/home/backstage/addUser')
    }
  }
}
</script>

<style lang="scss" scoped>
.stage {
  @include wh(1200px, auto);
  margin: 0 auto;
  position: relative;
  .title {
    width: 100%;
    font-size: 15px;
    height: 40px;
    margin: 16px 0;
    border-bottom: 1px solid #0A43BC;
    @include box_flex;
    span {
      line-height: 40px;
      width: 100px;
      text-align: center;
      background:rgba(3,94,255,0.15);
      margin-right:2px;
      &.active {
        background: rgba(3,94,255,0.6);
      }
    }
  }
  .refresh {
    position: absolute;
    right: 0;
    top: 0;
    width:90px;
    height:40px;
    border: none;
    background:url('../../../assets/images/refresh.png') no-repeat;
    outline: none;
    // border-radius:2px;
    // border:1px solid rgba(10,67,188,1);
    // color: #fff;
  }
  .addUser {
     position: absolute;
    right: 0;
    top: 0;
    width:114px;
    height:40px;
    border: none;
    background:url('../../../assets/images/addUser.png') no-repeat;
    outline: none;
  }
}
</style>
