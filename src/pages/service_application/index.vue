<template>
    <div class="service">
      <div ref="content">
        <MyBreadcrumb />
        <div ref="service">
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>

<script>
import MyBreadcrumb from '@/components/My_Breadcrumb'
export default {
  name: 'Service',
  components: {
    MyBreadcrumb
  },
  mounted () {
    // this.$nextTick(function () {
    //   let clientWidth = document.body.clientWidth
    //   let clientHeight = document.body.clientHeight
    //   let scaleNum = clientWidth / 1366
    //   if (clientWidth > 1366) {
    //     this.$refs.breadcrumb.style.cssText = `transform:scale(${scaleNum});`
    //   }
    // })
    // this.$nextTick(function () {
    //   let clientWidth = document.body.clientWidth
    //   let clientHeight = document.body.clientHeight
    //   let scaleNum = clientWidth / 1440
    //   if (clientWidth > 1366) {
    //     this.$refs.content.style.cssText = `transform:scale(${scaleNum});margin-top: ${clientWidth/ 4 - 60}px`
    //   }
    // })
  }
}
</script>

<style lang="scss" scoped>
.service {
  flex: 1;
  width: 100%;
  // height: 100%;
  // overflow-x: hidden;
  // overflow: auto;
  @include box_flex;
  @include justify(center);
  &> div {
    @include wh(1200px, auto);
    // @include box_flex;
    // @include direction(column);
    // @include justify(center);
  }
}
</style>
