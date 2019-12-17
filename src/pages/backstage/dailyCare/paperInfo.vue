<template>
    <div class="stage">
        <div class="info">
            <dl>
                <dt>
                    <img src="../../../assets/images/tx.png" alt="">
                    <span class="name">{{name}}</span>
                </dt>
                <dd>
                    <ul>
                        <li>
                            <span class="title">档案号</span>
                            <span class="con">{{info['档案号']}}</span>
                        </li>
                        <li>
                            <span class="title">身份号</span>
                            <span class="con">{{info['身份号']}}</span>
                        </li>
                        <li>
                            <span class="title">人员来源类别</span>
                            <span class="con">{{info['来源类别']}}</span>
                        </li>
                        <li>
                            <span class="title">建档时间</span>
                            <span class="con">{{info['纸质建档时间']}}</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span class="title">存放位置</span>
                            <span class="con">{{info['档案存放位置']}}</span>
                        </li>
                        <li>
                            <span class="title">管理机构</span>
                            <span class="con">{{info['管理纸质机构名称码']}}</span>
                        </li>
                        <li>
                            <span class="title">档案状态</span>
                            <span class="con">在库</span>
                        </li>
                        <li>
                            <span class="title">缺件情况</span>
                            <span class="con">{{info['纸质缺件情况'] ? info['纸质缺件情况'] : '无缺件'}}</span>
                        </li>
                    </ul>
                </dd>
            </dl>
            <position-horn />
        </div>
    </div>
</template>

<script>
import PositionHorn from '@/components/Postion_Horn'
export default {
  name: 'paperInfo',
  data () {
    return {
      name: '',
      info: {}
    }
  },
  components: {
    PositionHorn
  },
  created () {
    this.getPersonInfo()
  },
  methods: {
    back () {
      this.$router.back()
    },
    getPersonInfo () {
      this.name = this.$route.query.name
      this.$api.build.getPersonInfo({
        sfh: this.$route.query.sfh
      }).then(data => {
        this.info = data[0]
        this.info['纸质建档时间'] = data[0]['纸质建档时间'].slice(0, 10)
        console.log(data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.stage {
  @include wh(1200px, auto);
  margin: 0 auto;
  position: relative;
  h3 {
    font-size: 16px;
    margin: 16px 8px;
    position: relative;
    &::before {
      content: '';
      display: inline-block;
      margin-left: 8px;
      width: 6px;
      height: 20px;
      background: #029AFE;
      position: relative;
      right: 8px;
      top: 4px;
    }
  }
  & > div {
    @include box_flex;
    @include wh(100%, 420px);
    position: relative;
    background:rgba(5,27,74,0.15);
    box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2) inset;
    border:1px solid rgba(10,67,188,0.32);
    dl {
        width: 100%;
        margin: 80px 170px;
        @include box_flex;
        dt {
            width: 150px;
            @include box_flex;
            @include direction(column);
            margin-right: 80px;
            img {
                width:150px;
                height:209px;
            }
            .name {
                text-align: center;
                font-size: 18px;
                margin-top: 16px;
            }
        }
        dd {
            height: 140px;
            @include box_flex;
            @include direction(column);
            @include align(center);
            ul {
                @include box_flex;
                margin: 40px 0;
                li {
                    width: 168px;
                    @include box_flex;
                    @include direction(column);
                    .title {
                        font-size: 13px;
                        color: #029AFE;
                    }
                    .con {
                        color: #fff;
                        font-size: 16px;
                        margin-top: 8px;
                    }
                }
            }
        }
    }
  }
  .back {
      position: absolute;
      right: 0;
      top: 0;
      width:60px;
      height:24px;
      background:rgba(3,129,255,0.26);
      border-radius:2px;
      border:1px solid rgba(10,67,188,1);
      color: #fff;
    }
}
</style>
