<template>
    <div class="stage">
        <h3>档案情况<button class="back1 point" @click="">操作提示</button>
                   <button class="back point" @click="back">返回</button>
        </h3>
        <div class="info">
            <dl>
                <dt>
                    <img src="../../../../assets/images/tx.png" alt="">
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
                            <span class="con">{{info['人员来源类别']}}</span>
                        </li>
                        <li>
                            <span class="title">建档时间</span>
                            <span class="con">{{info['纸质建档时间']}}</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span class="title">存放位置</span>
                            <span class="con">{{info['存放位置']}}</span>
                        </li>
                        <li>
                            <span class="title">管理机构</span>
                            <span class="con">{{info['现管单位名称']}}</span>
                        </li>
                        <li>
                            <span class="title">档案状态</span>
                            <span class="con">{{info['名称']}}</span>
                        </li>
                        <li>
                            <span class="title">缺件情况</span>
                            <span class="con">{{info['纸质缺件情况'] ? info['纸质缺件情况'] : '无缺件'}}</span>
                        </li>
                    </ul>
                </dd>
            </dl>
            <button class="edit point" @click="edit">编辑</button>
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
    },
    edit () {
      // console.log(this.$route.query)
      this.$router.push('/home/backstage/input_information?name=' + this.$route.query.name + '&sfh=' + this.$route.query.sfh)
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
    .edit {
      position:absolute;
      z-index:99;
      right:50px;
      bottom:32px;
      width:80px;
      height:30px;
      border:none;
      background: linear-gradient(0deg,#0c60c8,#058dfc);
      box-shadow: 0 4px 31px 0 rgba(0,0,0,.41);
      border-radius: 2px;
      color:#fff;
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
  .back1 {
      position: absolute;
      right: 70px;
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
