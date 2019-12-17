<template>
    <div class="breadcrumb">
      <div ref="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item, index) in routerInfo" :key="index" :to="item.path === '/home' ? '/home/home' : item.path " style="color: #fff">{{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
</template>

<script>
export default {
  name: 'My_Breadcrumb',
  data () {
    return {
      infoList: [],
      routerInfo: []
    }
  },
  mounted () {
    //  this.$nextTick(function () {
    //   let clientWidth = document.body.clientWidth
    //   let clientHeight = document.body.clientHeight
    //   let scaleNum = clientWidth / 1440
    //   if (clientWidth > 1366) {
    //     this.$refs.breadcrumb.style.cssText = `transform:scale(${scaleNum});`
    //   }
    // })
    this.routerInfo = this.$route.matched.map((item, index) => {
      return {
        title: item.meta.title,
        path: item.path
      }
    })
    // console.log(this.routerInfo)
    // console.log(this.$route)
  }
}
</script>

<style lang="scss">
.breadcrumb {
  @include box_flex;
  @include align(center);
  height: 48px;
  position: relative;
  top:16px;
  // bottom: 16px;
  z-index: 99;
  .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
    color: #ccc;
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: #ccc;
  }
}
</style>
