<template>
  <div class="stage">
    <div class="title">
      <span v-for="(item, index) in titleData" :key="index" :class="item.path === $route.fullPath ? 'active' : ''" @click="goMaterial(item.path, index)">{{item.label}}</span>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'daily-care',
    data () {
        return {
          titleData: []
            // titleData: [
            //     {
            //         label: '档案状态分析',
            //         path: '/home/backstage/analysisfolder/statusfile'
            //     },
            //     {
            //         label: '档案利用分析',
            //         path: '/home/backstage/analysisfolder/archives'
            //     },
            //     {
            //         label: '职务等级分析',
            //         path: '/home/backstage/analysisfolder/databill'
            //     }, {
            //         label: '档案日志审计分析',
            //         path: '/home/backstage/analysisfolder/reviewquality'
            // }, {
            //         label: '用户行为审计分析',
            //         path: '/home/backstage/analysisfolder/userauditanalysis'
            // }
            // ]
        }
    },
    created () {
      let qx = JSON.parse(sessionStorage.getItem('qx'))
      qx.forEach((item, index) => {
        if (item.权限名称 === '统计分析') {
          item.children.forEach((item2, index2) => {
            switch (item2.权限名称) {
              case '档案状态分析':
                this.titleData.push({label: '档案状态分析',path: '/home/backstage/analysisfolder/statusfile'})
                break
              case '档案利用分析':
                this.titleData.push({label: '档案利用分析',path: '/home/backstage/analysisfolder/archives'})
                break
              case '职务等级分析':
                this.titleData.push({label: '职务等级分析',path: '/home/backstage/analysisfolder/databill'})
                break
              case '档案日志审计分析':
                this.titleData.push({label: '档案日志审计分析',path: '/home/backstage/analysisfolder/reviewquality'})
                break
              case '用户行为审计分析':
                this.titleData.push({label: '用户行为审计分析',path: '/home/backstage/analysisfolder/userauditanalysis'})
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
        goMaterial (path, index) {
            this.$router.push({
                path: path
            })
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
        width: 150px;
        text-align: center;
        background:rgba(3,94,255,0.15);
        &.active {
          background: rgba(3,94,255,0.6);
        }
      }
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
    .back {
      position: absolute;
      right: 0;
      top: 0;
      width:60px;
      height:24px;
      background:rgba(3,129,255,0.26);
      border-radius:2px;
      border:1px solid rgba(10,67,188,1);
      color: #fff;
    }
  }
</style>
