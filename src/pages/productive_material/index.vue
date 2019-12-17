<template>
    <div class="material">
        <MyBreadcrumb />
        <router-view></router-view>
    </div>
</template>

<script>
import MyBreadcrumb from '@/components/My_Breadcrumb'
export default {
  name: 'Service',
  components: {
    MyBreadcrumb
  }
}
</script>

<style lang="scss" scoped>

</style>
