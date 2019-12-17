<template>
    <div class="header" ref="header">
        <div class="person_info" ref="info">
            <div class="head_sculpture">
                <img src="../../assets/images/touxiang.png" alt="">
            </div>
            <div class="user_name">
                {{userInfo['用户名']}}
            </div>
            <div class="mes">
              <i class="el-icon-message-solid message"></i>
              <span>1</span>
            </div>
        </div>
        <div class="title">
            <span ref="title">{{title}}</span>
        </div>
        <div class="opt_btn" ref="optBtn">
            <button @click="goStage"><span>进入后台</span></button>
            <router-link to="/home/home" class="home"><img src="../../assets/images/home.png"/><span>首页</span></router-link>
            <button class="edit" @click="edit"><img src="../../assets/images/sign out.png"/><span>退出</span></button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: 'KJ电子档案管理系统'
    }
  },
  data () {
    return {
      userInfo: {},
      qx: [],
      state: false
    }
  },
  created() {
    this.getUserInfo()
    this.qx = JSON.parse(sessionStorage.getItem('qx'))
    this.qx.forEach((item, index) => {
        if (item['权限'] === "02") {
          console.log(item['权限'],'权限')
          this.state = true
          return;
        }
        // this.$router.push('/home/home')
    });
  },
  mounted () {
    //  this.$nextTick(function () {
    //   let clientWidth = document.body.clientWidth
    //   let clientHeight = document.body.clientHeight
    //   let scaleH = clientWidth / 768
    //   let scaleW = clientWidth / 1366
    //   if (clientWidth > 1366) {
    //     this.$refs.header.style.cssText = `height: ${60 * scaleH / 2}px`
    //     this.$refs.title.style.cssText = `font-size: ${23 * scaleH / 2}px`
    //     this.$refs.info.style.cssText = `transform:scale(${scaleW});left:${32 * scaleW}px`
    //     this.$refs.optBtn.style.cssText = `transform:scale(${scaleW});right:${32 * scaleW}px`
    //   }
    //   if(clientWidth > 1920) {
    //     this.$refs.info.style.cssText = `transform:scale(${scaleW});left:${32 * scaleH * 2}px`
    //     this.$refs.optBtn.style.cssText = `transform:scale(${scaleW});right:${32 * scaleH * 2}px;` 
    //   }
    // })
  },
  methods: {
    goStage () {
      this.$router.push('/home/backstage/stage')
    },
    edit () {
      var nowDate = new Date()
      var year = nowDate.getFullYear()
      var month = nowDate.getMonth() + 1
      var day = nowDate.getDate()
      var hour = nowDate.getHours()
      var min = nowDate.getMinutes()
      this.$api.exit({
        sfh: this.userInfo['身份号'],
        name: this.userInfo['姓名'],
        zhiwu:this.userInfo['职务名称'],
        jgmcm: this.userInfo['机构名称码'],
        date: year + '-'+ month+ '-' +day + ' ' + hour + ':' + min
      }).then((data) => {
        if(data.message === '退出成功') {
          this.$message('退出成功')
          this.$router.push('/login')
          document.cookie = "userinfo=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
      })
    },
    getUserInfo () {
      // console.log(document.cookie.split('='))
      this.userInfo = JSON.parse(document.cookie.split('=')[1])
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    height: 60px;
    @include box_flex;
    @include justify(center);
    @include align(center);
    flex-shrink:0;
    position: sticky;
    z-index: 99;
    background: url('../../assets/images/top-bg.png') no-repeat;
    background-size: 100% 100%;
    .person_info {
        @include box_flex;
        @include align(center);
        position: absolute;
        bottom: 5px;
        left: 32px;
        .head_sculpture{
            @include wh(32px, 32px);
            @include box_flex;
            @include align(center);
            background: url('../../assets/images/touxiang-bg.png');
            background-size: 34px 34px;
            overflow: hidden;
            border-radius: 50%;
            img {
                @include wh(42px, 42px)
            }
        }
        .user_name {
            width:auto;
            font-size:12px;
            font-weight:400;
            color:rgba(255,255,255,1);
            margin-left: 16px;
        }
        .mes {
          position: relative;
          padding: 0 20px;
          .el-icon-message-solid.message {
            color:#fff;
            font-size: 20px;
          }
          &>span {
            position: absolute;
            top:-4px;
            right:4px;
            // display: inline-block;
            width:20px;
            height:20px;
            color:#fff;
            border-radius: 50%;
            line-height: 20px;
            text-align: center;
            background: #f00;
          }
        }
        
    }
    .title {
        // @include wh(230px,auto);
        font-size:23px;
        font-family:BigruixianBoldkGBV10;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
    }
    .opt_btn {
        position: absolute;
        right: 32px;
        bottom: 8px;
        @include box_flex;
        button, a {
            width: 75px;
            height: 26px;
            @include box_flex;
            @include justify(center);
            @include align(center);
            border:1px solid rgba(4,178,255,1);
            box-shadow:0px 0px 28px 0px rgba(0,229,255,0.3);
            border-radius: 2px;
            background: none;
            font-size: 12px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(229,255,255,1);
            line-height:21px;
            margin-left: 15px;
            img {
                @include wh(12px, 12px)
            }
            span{
                margin-left: 5px;
            }
        }
    }
}
</style>
