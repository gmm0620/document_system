<template>
    <div v-show ="state" class="slot">
        <slot></slot>
    </div>
</template>

<script>
export default {
  data () {
    return {
      state: false,
      defaultIndex: 0
    }
  }
}
</script>

<style lang="scss" scoped>
  .slot{
    width: 100%;
    height: 100%;
    padding: 16px;
  }
</style>
