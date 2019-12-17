<template>
  <div class="content">
    <div class="left">
      <div>
        <el-tree
          :data="data"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          highlight-current
          @node-click="handleNodeClick"
          ref="tree"></el-tree>
        <el-radio v-model="radio" label="1">显示包含下级单位</el-radio>
      </div>
      <PositionHorn />
    </div>
    <div>
      <RightContent types="03" :list="list" :lengths="length" :jgmcms="jgmcm" />
    </div>
  </div>
</template>

<script>
    import PositionHorn from '../../components/Postion_Horn'
    import RightContent from './right_content'
    export default {
        name: 'ScanFiles',
        data () {
            return {
                data: [],
                defaultProps: {
                    id: '机构名称码',
                    children: 'children',
                    label: '单位名称',
                    jgmcm: '机构名称码'
                },
                radio: false,
                items: {},
                list: [],
                currpage: 1,
                pagesize:6,
                length: 0,
                jgmcm: '',
                userInfo: {}
            }
        },
        components: {
            PositionHorn,
            RightContent
        },
        // watch: {
        //   'data':{
        //       handler(n, o) {
        //         this.data = n
        //         // console.log(n)
        //       },
        //       deep: true
        //   }
        // },
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
            handleNodeClick (data, node) {
                data.children = []
                if (data.children.length === 0) {
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
                // 获取单位下的所有人员信息
                this.$api.application.peopleInformation({
                    jgmcm: data['机构名称码'],
                    pageIndex: this.currpage,
                    pageSize: this.pagesize
                }).then(data => {
                    this.length = data.total
                    this.list = data['rows'] && data['rows'].map((item, index) => {
                        item['ids'] = index + 1
                        item['入伍时间'] = item['入伍时间'] && item['入伍时间'].slice(0, 10)
                        item['技术'] = item['技术'] ? item['技术'] : '暂无'
                        return item
                    })
                })
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

                    console.log(this.data)
                })
            }
        }
    }

</script>

<style lang="scss" scoped>
  .content {
    @include box_flex;
    @include justify(space-between);
    color: #fff;
    position: relative;
    z-index:999;
    margin-top:16px;
    .left {
      position: relative;
      width:160px;
      height:778px;
      background:rgba(5,27,74,0.22);
      border:1px solid rgba(10,67,188,1);
      box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
      opacity:0.8;
      &>div {
        width: 100%;
        height: 100%;
        overflow: auto;
        &::-webkit-scrollbar {
          width: 5px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: #0a43bc;
        }
        &::-webkit-scrollbar-track {
          border-radius: 10px;
          background: #0381ff;
        }
      }
    }
    .include_bottom {
      position: absolute;
      z-index: 999;
      bottom: 0;
      height: 30px;
      background:rgba(3,94,255,0.15);
      border-radius:2px;
      width: 100%;
      line-height: 30px;
      text-align: center;
    }
  }
</style>
