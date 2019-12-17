<template>
    <div class="login">
       <!-- <el-button :plain="true" @click="open2">成功</el-button> -->
        <div class="con_1">
            <h1><img src="../../assets/images/logo.png"></h1>
            <div class="login_form">
                <h3>欢迎登录</h3>
                <div>
                  <div class="username"><img src="../../assets/images/组 7.png" alt=""><input type="text" v-model="username" placeholder="请输入用户名" @input="changeUser" style="color:#fff;"></div>
                  <div class="pwd"><img src="../../assets/images/组 8.png" alt=""><input type="password" v-model="pwd" placeholder="请输入密码"  @input="changePwd" style="color:#fff;" id="gover_search_key"  @keyup.enter.native="login()"></div>
                  <!-- <button class="login_btn" @click="login">登&nbsp;&nbsp;&nbsp;录</button> -->
                  <button class="login_btn" @click="login">登&nbsp;&nbsp;&nbsp;录</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      pwd: '',
      success: false,
      userInfo: {},
      qx: []
    }
  },
    created(){
        var _self = this;
        document.onkeydown = function(e){
            if(window.event == undefined){
                var key = e.keyCode;
            }else{
                var key = window.event.keyCode;
            }
            if(key == 13){
                _self.login();
            }
        }
    },
  methods: {
    login () {
      var nowDate = new Date()
      var year = nowDate.getFullYear()
      var month = nowDate.getMonth() + 1
      var day = nowDate.getDate()
      var hour = nowDate.getHours()
      var min = nowDate.getMinutes()
      if (this.username !== '' && this.pwd !== '') {
        this.$api.login({
          username: this.username.replace(/(^\s*)|(\s*$)/g, ""),
          password: this.pwd.replace(/(^\s*)|(\s*$)/g, ""),
          date: year + '-'+ month+ '-' +day + ' ' + hour + ':' + min
        }).then(data => {
            // this.$message(data.message)
            // console.log('data',data)
         if (data.message === '登录成功'){
            document.cookie = 'userinfo=' + JSON.stringify(data['信息'][0])
            sessionStorage.setItem('qx', JSON.stringify(data['权限']))
            this.$message('登录成功！')
            this.$router.push('/home/home')
          } else {
            // this.$message('登录成功！')
            alert('用户名或密码错误')
          }
        })
      } else if (this.username === '' || this.pwd === '') {
        alert('请输入用户名和密码')
      }
    },
    // getUserInfo () {
    //   this.userInfo = JSON.parse(document.cookie.split('=')[1])
    //   this.$api.index.userinfo({
    //     identityCode: this.userInfo['身份号']
    //   }).then((data) => {
    //     this.qx = data['权限']
    //     sessionStorage.setItem('qx', JSON.stringify(this.qx))
    //     console.log(sessionStorage.getItem('qx'), '权限信息')
    //   })
    // },
    changeUser () {
      // console.log(this.username)
    },
    changePwd () {
      // console.log(this.pwd)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  @include wh(100%, 100%);
  @include box_flex;
  @include justify(center);
  @include align(center);
  background: url('../../assets/images/login-bg.png');
  position: fixed;
  z-index: 9999;
  top:0;
  left:0;
  right:0;
  bottom:0;
  .con_1 {
    h1 {
      img {
        @include wh(490px, 68px);
      }
    }
  }
  .login_form {
    @include wh(490px, 370px);
    margin-top: 8px;
    background: url('../../assets/images/背景框.png');
    background-size: 490px 370px;
    h3 {
      padding-top: 4px ;
      text-align: center;
      font-size:21px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:80px;
      background:linear-gradient(0deg,rgba(77,157,255,0.95) 0%, rgba(229,240,255,1) 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
    }
    &>div {
      margin: 0 auto;
      width: 270px;
      margin-top: 55px;
      .username, .pwd {
        @include box_flex;
        height: 30px;
        margin-bottom: 30px;
        img {
          width: 36px;
          height: 32px;
        }
        input {
          @include flex;
          height: 100%;
          outline: none;
          background:#1747A6;
          border:1px solid #4D79FF;
          padding: 0 8px;
          &::placeholder {
            color: #80AAFF;
          }
        }
      }
    }
  }
  .login_btn {
    border: none;
    width:270px;
    height:32px;
    background:linear-gradient(0deg,rgba(207,113,20,1) 0%,rgba(242,188,0,1) 100%);
    box-shadow:0px 3px 7px 0px rgba(255,216,0,0.55);
    border-radius:4px;
    font-size:14px;
    font-family:MicrosoftYaHei;
    color:#fff;
  }
}
</style>
