<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import waterMark from '@/utils/waterMark'
export default {
  name: 'App',
  data () {
    return {
      // transformScale: 1,
      // width: '1366px'
    }
  },
  mounted () {
    // this.autoSetScale()
    // window.addEventListener('resize', () => {
    //   this.autoSetScale()
    // }, false)
    // waterMark.set('要添加的水印内容', '#app')
  }
  // methods: {
  //   // 自动缩放屏幕比例
  //   autoSetScale () {
  //     let zoom = (window.innerHeight / 768).toFixed(3)
  //     this.transformScale = `scale(${zoom})`
  //     // this.width = `${(window.innerWidth / zoom).toFixed(2)}px`
  //   }
  // }
}
</script>

<style lang="scss">
#app {
  @include wh(100%, 100%);
}

</style>
