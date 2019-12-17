<template>
    <div class="posi_bg_horn">
        <img src="../../assets/images/bg-horn.png" class="left_top" alt="">
        <img src="../../assets/images/bg-horn.png" class="right_top" alt="">
        <img src="../../assets/images/bg-horn.png" class="right_bottom" alt="">
        <img src="../../assets/images/bg-horn.png" class="left_bottom" alt="">
    </div>
</template>

<script>
export default {
  name: 'Postion_Horn'
}
</script>

<style lang="scss" scoped>
.posi_bg_horn {
    @include wh(100%, 100%);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    img {
        position: absolute;
        z-index:3;
    }
    .left_top {
        top: 0;
        left: 0;
    }
    .right_top {
        top: 0;
        right: 0;
        transform: rotate(90deg);
    }
    .right_bottom {
        bottom: 0;
        right: 0;
        transform: rotate(180deg);
    }
    .left_bottom {
        bottom: 0;
        left: 0;
        transform: rotate(270deg);
    }
}
</style>
