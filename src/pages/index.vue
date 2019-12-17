<template>
    <div class="wrap">
        <!-- <img src="../assets/images/bg.png" alt=""> -->
        <Header></Header>
        <router-view></router-view>
    </div>
</template>

<script>
import Header from '../components/Header'
export default {
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  @include box_flex;
  @include direction(column);
  // img {
  //   width: 100%;
  //   height: 100%;
  //   position: fixed;
  //   top:0;
  //   left:0;
  //   bottom:0;
  //   right:0;
  // }
  overflow-y: scroll;
  overflow-x: hidden;
  background-image: url('../assets/images/bg.png');
  // background-repeat:no-repeat;
  background-attachment:fixed;
  // background-position:center;
  background-size: 100% 100%;
  // overflow: scroll;
  // background-origin:content-box;
}
</style>
