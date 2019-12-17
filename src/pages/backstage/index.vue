<template>
    <div class="backstage">
        <div class="head" ref="head">
            <ul>
                <router-link v-for="(item, index) in headData" :key="index" :to="item.path">{{item.label}}</router-link>
                <!-- <li v-for="(item, index) in headData" :key="index" :class="item.path === $route.fullPath ? 'active' : ''" @click="go(item)">{{item.label}}</li> -->
            </ul>
        </div>
        <div ref="content">
          <router-view></router-view>
        </div>
        
    </div>
</template>

<script>
export default {
  name: 'backstage',
  data () {
    return {
      headData: [],
      // headData: [
      //   {
      //     path: '/home/home',
      //     label: '利用档案'
      //   },
      //   {
      //     path: '/home/backstage/stage',
      //     label: '建立档案'
      //   },
      //   {
      //     path: '/home/backstage/dailyCare/archives',
      //     label: '日常维护'
      //   },
      //   {
      //     path: '/home/backstage/transfer_doc',
      //     label: '转接档案'
      //   },
      //   {
      //     path: '/home/backstage/transfer_material/type/1',
      //     label: '转接材料'
      //   },
      //   {
      //     path: '/home/backstage/quality_control/qualitybill',
      //     label: '质量管理'
      //   },
      //   {
      //     path: '/home/backstage/analysisfolder/statusfile',
      //     label: '统计分析'
      //   },
      //   {
      //     path: '/home/backstage/ement',
      //     label: '库房管理'
      //   },
      //   {
      //     path: '/home/backstage/poolinfo',
      //     label: '系统消息'
      //   },
      //   {
      //     path: '/home/backstage/system-management/unit',
      //     label: '系统管理'
      //   }
      // ],
      current: '/home/backstage/stage'
    }
  },
  created () {
    let qx = JSON.parse(sessionStorage.getItem('qx'))
    console.log(qx)
    qx.forEach((item, index) => {
      switch (item.权限名称) {
        case '利用模块':
          this.headData.push({
            path: '/home/home',
            label: '利用档案'
          })
          break
        case '建立档案':
          this.headData.push({
            path: '/home/backstage/stage',
            label: '建立档案'
          })
          break
        case '日常维护':
          this.headData.push({
            path: '/home/backstage/dailyCare',
            label: '日常维护'
          })
          break
        case '转递档案':
          this.headData.push({
            path: '/home/backstage/transfer_doc',
            label: '转接档案'
          })
          break
        case '转递材料':
          this.headData.push({
            path: '/home/backstage/transfer_material',
            label: '转接材料'
          })
          break
        case '质量审查':
          this.headData.push({
            path: '/home/backstage/quality_control',
            label: '质量管理'
          })
          break
        case '统计分析':
          this.headData.push({
            path: '/home/backstage/analysisfolder',
            label: '统计分析'
          })
          break
        case '库房管理':
          this.headData.push({
            path: '/home/backstage/ement',
            label: '库房管理'
          })
          break
        case '系统消息':
          this.headData.push({
            path: '/home/backstage/poolinfo',
            label: '系统消息'
          })
          break
        case '系统管理':
          this.headData.push({
            path: '/home/backstage/system-management',
            label: '系统管理'
          })
          break
      }
    })
    console.log(this.headData)
  },
  mounted () {
    // this.$nextTick(function () {
    //   let clientWidth = document.body.clientWidth
    //   let clientHeight = document.body.clientHeight
    //   let scaleNum = clientWidth / 1440
    //   if (clientWidth > 1600) {
    //     this.$refs.head.style.cssText = `transform:scale(${scaleNum});margin-top: 80px;`
    //     this.$refs.content.style.cssText = `transform:scale(${scaleNum});margin-top: ${clientHeight/ 3 + 120}px`
    //   }
    // })
  },
  methods: {
    go (item) {
      // console.log(this.$route)
      this.$router.push(item.path)
    }
  }
}
</script>

<style lang="scss" scoped>
.backstage {
  width: 100%;
  height: 100%;
  color: #fff;
  .head {
    @include wh(100%, 40px);
    margin-top: 8px;
    background:rgba(5,27,74,1);
    box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2);
    border-top:1px solid rgba(10,67,188,0.65);
    border-bottom:1px solid rgba(10,67,188,0.65);
    ul {
      @include wh(1200px, 100%);
      @include box_flex;
      @include justify(space-between);
      margin: 0 auto;
      a {
        line-height: 40px;
        font-size: 14px;
        padding: 0 30px;
        color: #fff;
        &.active {
            background:rgba(3,94,255,0.4);
            color: #00FEFF;
        }
      }
      li {
        line-height: 40px;
        font-size: 14px;
        padding: 0 30px;
        color: #fff;
        &.active {
            background:rgba(3,94,255,0.4);
            color: #00FEFF;
        }
      }
    }
  }
}
</style>
