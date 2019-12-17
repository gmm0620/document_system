<template>
  <div class="stage">
    <div style="margin-top: 15px;width: 100%;position: absolute;"> <el-button type="primary" style="width: 80px;height: 30px">获取库房信息</el-button>
      <el-button type="primary" style="width: 80px;height: 30px">盘点库存档案</el-button>
      &#12288;&#12288; 库房管理系统地址：<input type="text"  style="height: 30px;background: rgba(3, 94, 255, 0.15);border: 1px solid rgba(10, 67, 188, 0.94);border-radius: 2px;color: #fff;width: 30%;">
      <el-button type="primary" style="width: 80px;height: 30px;margin-left: 20px">保存</el-button>
      <el-button type="primary" style="width: 80px;height: 30px">测试连接</el-button></div>
    <div class="center">
    <div class="queue">库房档案信息</div>
    <el-tree
      :data="docUnit"
      :props="defaultProps"
      node-key="id"
      highlight-current
      @node-click="handleNodeClick1">
    </el-tree>
    <PositionHorn />
  </div>
  </div>
</template>
<script>
    import PositionHorn from '@/components/Postion_Horn'
    export default {
        name: 'ement',
        data () {
            return {
                docUnit:[],
                data:[],
                defaultProps: {
                    children: 'children',
                    label: '单位名称',
                    node: '机构名称码'
                },
            }
        },
        components: {
            PositionHorn
        },
        created () {

        },
        methods: {
            handleNodeClick (data) {
                console.log(data.children)

            },
            handleNodeClick1 (data) {
                console.log(data.children)
            },
        }
    }
</script>
<style lang="scss" scoped>
  .stage {
    @include wh(1050px, auto);
    margin: 0 auto;
    position: relative;
    /*margin-left: 210px;*/
    @include box_flex;
    .left,.center {
      margin-top: 80px;
      position: relative;
      z-index: 999;
      @include wh(100%, 520px);
      background:rgba(5,27,74,0.22);
      border:1px solid rgba(10,67,188,1);
      box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
      margin-right: 100px;
      // opacity:0.8;
      overflow: hidden;
      .add {
        position: absolute;
        right:20px;
        bottom:16px;
        width:100px;
        border:none;
        height:24px;
        background:#4876FF;
        box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 1px 0px rgba(255,255,255,0.5);
        border-radius:2px;
        color:#fff;
        z-index:9999;
      }
      .delete {
        position: absolute;
        right:20px;
        bottom:16px;
        width:100px;
        border:none;
        height:24px;
        background:#4876FF;
        box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 1px 0px rgba(255,255,255,0.5);
        border-radius:2px;
        color:#fff;
        z-index:9999;
      }
      .queue {
        width: 100%;
        position: relative;
        height: 40px;
        line-height: 40px;
        padding: 0 16px;
        background:rgba(2,154,254,0.15);
        @include sizing;
        font-size: 13px;
        color: #fff;
        button {
          position: absolute;
          right: 16px;
          top:8px;
          width:50px;
          height:24px;
          background:rgba(3,129,255,0.5);
          border-radius:2px;
          border:1px solid rgba(10,67,188,1);
          color: #fff;
        }
      }
    }
    .right {
      @include flex;
      height:auto;
      @include direction(column);
      position: relative;
      background:rgba(5,27,74,0.22);
      border:1px solid rgba(10,67,188,1);
      box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
      opacity:0.8;
      h3 {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0 16px;
        box-sizing: border-box;
        //  opacity: 0.8;
        background:rgba(2,154,254,0.15);
      }
      &>div.right_1 {
        height:250px;
        position: relative;
        h4 {
          width: 100%;
          height: 40px;
          line-height: 40px;
          padding: 0 16px;
          box-sizing: border-box;
          background:rgba(3,94,255,0.15);
          border:1px solid rgba(11,66,187,1);
          position: relative;
          .update {
            position: absolute;
            right:20px;
            top:8px;
            width: 80px;
            height: 24px;
            color:#fff;
            border:none;
            background:linear-gradient(180deg,rgba(166,242,189,1) 0%,rgba(34,162,72,1) 100%);
            box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 1px 0px rgba(255,255,255,0.5);
            border-radius:2px;
          }
        }
        &>div {
          @include box_flex;
          height:200px;
          @include justify(center);
          @include align(center);
        }
        .submit {
          width:80px;
          height:30px;
          border:none;
          background:linear-gradient(180deg,rgba(5,141,252,1) 0%,rgba(12,96,200,1) 100%);
          box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 2px 0px rgba(255,255,255,0.5) inset;
          border-radius:2px;
          color:#fff;
          position: absolute;
          bottom:20px;
          right:20px;
        }
      }
    }
  }
  select {
    position: relative;
    z-index:9999;
    width: 220px;
    height:30px;
    background:rgba(3,94,255,0.15);
    border-radius:2px;
    border:1px solid rgba(10,67,188,0.94);
    color:#fff;
    margin:0 8px;
  }
</style>
