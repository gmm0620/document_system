<template>
    <div class="stage">
        <div class="left">
            <div class="queue">单位序列</div>
            <el-tree
            :data="data"
            :props="defaultProps"
            node-key="id"
            default-expand-all
            highlight-current
            @node-click="handleNodeClick"
            ref="tree"></el-tree>
            <button class="add point" @click="addDocUnit">加入立档单位</button>
            <PositionHorn />
        </div>
        <div class="center">
          <div class="queue">立档单位</div>
            <el-tree
            :data="docUnit"
            :props="defaultProps"
            node-key="id"
            default-expand-all
            highlight-current
            @node-click="handleNodeClick1"
            ref="trees"
            ></el-tree>
            <button class="delete point" @click="deleteUnit">删除立档单位</button>
            <!-- <button class="delete1 point" @click="deleteUnit">取消立档单位</button> -->
            <PositionHorn />
        </div>
        <div class="right">
            <h3>信息同步</h3>
            <div class="right_1">
                <h4>更新单位信息 <button class="update point">手动更新</button></h4>
                <div>
                  <div>设置自动更新周期<select name="" id=""><option value="30">30</option><option value="30">60</option></select>天</div>
                </div>
                <button class="submit point">提交</button>
            </div>
             <div class="right_1">
                <h4>更新人员信息 <button class="update point">手动更新</button></h4>
                <div>
                  <div>设置自动更新周期<select name="" id=""><option value="30">30</option><option value="30">60</option></select>天</div>
                </div>
                <button class="submit point">提交</button>
            </div>
            <PositionHorn />
        </div>
    </div>
</template>

<script>
import PositionHorn from '@/components/Postion_Horn'
export default {
  name: 'system-management',
  data () {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: '单位名称',
        node: '机构名称码'
      },
      unitNameCode: '',
      buildNameCode: '',
      docUnit: [],
      radio: false,
      condition: [],
      conditionList: {
        name: '张',
        bubie: '',
        zwmc: '',
        zwdj: '',
        jxwj: '',
        gbxz: '',
        daxz: '',
        glbs: '',
        sfh: ''
      },
      pagesize: 6,
      pagesizeTab: 11,
      currpage: 1,
      list: [],
      showCondition: false,
      type: 'card',
      items: {},
      isAdd: false,
      isDel: false,
      userInfo: {}
    }
  },
  components: {
    PositionHorn
  },
  created () {
    this.userInfo = JSON.parse(document.cookie && document.cookie.split('=')[1])
    this.getData()
    this.$nextTick(function () {
      this.$data.data.forEach(row => {
        if (row.show) {
          this.$refs.tree.setCurrentKey(row.id)
          this.$refs.tree.store.nodesMap[row.id].expanded = true
        }
      })
    })
  },
  methods: {
    handleNodeClick (data) {
      if (data.children.length === 0) {
        this.isAdd = true
        this.unitNameCode = data['机构名称码']
        let newdata = []
        this.$api.application.unitsTree({
          id: data.id
        }).then((newdata) => {
          newdata = newdata ? newdata.map((item) => {
            item.id = item['机构名称码']
            item.children = []
            return item
          }) : []
          if (newdata && newdata.length > 0) {
              this.$nextTick(() => {
                  this.$refs.tree.updateKeyChildren(data.id,newdata);
                  // this.$refs.tree.setCurrentNode(data.id)
              })
          }
        })
      }
    },
    handleNodeClick1 (data) {
      if (data.children.length === 0){
        this.isDel = true
        this.buildNameCode = data['机构名称码']
        let newdata = []
        this.$api.application.lidangTree({
          id: data.id
        }).then((newdata) => {
          newdata = newdata ? newdata.map((item) => {
            item.id = item['机构名称码']
            item.children = []
            return item
          }) : []
          if (newdata && newdata.length > 0) {
              this.$nextTick(() => {
                  this.$refs.trees.updateKeyChildren(data.id,newdata);
                  // this.$refs.tree.setCurrentNode(data.id)
              })
          }
        })
      }
      console.log(data)
    },
    deleteUnit () {
      if (this.isDel) {
        this.$api.systemSet.delCodeUnit({
          deleteCode: this.buildNameCode
        }).then((data) => {
          if(data.code) {
            this.$message('删除成功')
            this.getData()
          }
        })
      } else {
        this.$message('删除失败，请选择叶子节点进行删除!')
      }
    },
    getData () {
      this.$api.application.unitsTree({
         sfh: this.userInfo.身份号
      }).then((data) => {
        this.data = data.map((item) => {
          item.id = item['机构名称码']
          item.children = item.children.map((item) => {
            item.id = item['机构名称码']
            item.children = []
            return item
          })
          return item
        })
      })
      this.$api.application.lidangTree().then((data) => {
        this.docUnit = data.map((item) => {
          item.id = item['机构名称码']
          item.children = item.children.map((item) => {
            item.id = item['机构名称码']
            item.children = []
            return item
          })
          return item
        })

        console.log(this.data)
      })
      // this.$api.build.unitTreeQuery({
      //   parentCode: 'DC'
      // }).then(data => {
      //   this.data = data['partUnitsList']
      //   this.docUnit = data['allUnitsList']
      //   console.log(data['allUnitsList'])
      // })
    },
    addDocUnit () {
      if(this.isAdd) {
         this.$api.systemSet.addDocUnit({
          addCode: this.unitNameCode
        }).then((data) => {
          console.log(data)
          this.$message('添加成功')
          this.getData()
        })
      } else {
        this.$message('添加失败，请选择叶子节点进行添加!')
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.stage {
  @include wh(1200px, auto);
  margin: 0 auto;
  position: relative;
  @include box_flex;
  .left,.center {
      position: relative;
      z-index: 999;
      @include wh(220px, 560px);
      background:rgba(5,27,74,0.22);
      border:1px solid rgba(10,67,188,1);
      box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
        margin-right: 16px;
      // opacity:0.8;
      overflow: hidden;
      .add {
        position: absolute;
        right:20px;
        bottom:16px;
        width:100px;
        border:none;
        height:24px;
        background:linear-gradient(180deg,rgba(166,242,189,1) 0%,rgba(34,162,72,1) 100%);
        box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 1px 0px rgba(255,255,255,0.5);
        border-radius:2px;
        color:#fff;
        z-index:9999;
      }
    .delete {
      position: absolute;
      right:20px;
      bottom:16px;
      width:83px;
      border:none;
      height:24px;
      background:linear-gradient(180deg,#f2a6a6 0%, #F44336 100%);
      box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 1px 0px rgba(255,255,255,0.5);
      border-radius:2px;
      color:#fff;
      z-index:9999;
    }
    .delete1 {
      position: absolute;
      right:117px;
      bottom:16px;
      width:83px;
      border:none;
      height:24px;
      background:linear-gradient(180deg,rgba(166,242,189,1) 0%,rgba(34,162,72,1) 100%);
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
