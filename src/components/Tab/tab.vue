<template>
  <div class="tabs">
    <ul>
      <li
        :class="activeIndex === index ? 'active' : ''"
        v-for="(item, index) in list"
        :key="index"
        @click="change(index)"
      >{{item.label}}</li>
    </ul>
    <div class="con">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String
    },
    list: {
      type: Array
    }
  },
  data () {
    return {
      navList: [],
      activeIndex: 0,
      fixed: false
    }
  },
  mounted () {
    this.getNavList()
  },
  methods: {
    getNavList () {
      this.$children[this.activeIndex].state = true
    },
    change (index) {
      this.$emit('getType', index)
      this.activeIndex = index
      this.$children[0].state = true
    }
  }
}
</script>

<style lang='scss' scoped>
.tabs{
    margin-top: 5px;
    width:100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    .con {
      @include wh(90%, 100px);
      @include box_flex;
      border: 1px solid #ccc;
    }
    ul{
      width: 100%;
      height: 25px;
      @include box_flex;
      @include align(center);
      @include justify(center);
      padding: 0 10px;
      box-sizing: border-box;
      li{
        width: 80px;
        height: 100%;
        text-align: center;
        line-height: 25px;
        font-size: 13px;
        color:#fff;
        padding: 0 5px;
        box-sizing: border-box;
        border: 1px solid #fff;
        margin-left: 8px;
        border: 1px solid #ccc;
        border-bottom: none;
        &.active{
          font-size: 13px;
          height: 26px;
        }
      }
  }
}

</style>
