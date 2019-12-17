<template>
  <div class="user">
    <div class="top">
      <div class="queue">当前链接数据库</div>
      <div class="input-info">
        <el-radio v-model="radio" label="1">达梦数据库</el-radio>
        <el-radio v-model="radio" label="2">MySQL数据库</el-radio>
        <el-radio v-model="radio" label="3">Oracle数据库</el-radio>
        <button class="point">设为当前连接</button>
      </div>
      <PositionHorn />
    </div>
    <div class="bottom">
      <div class="content">
        <div class="queue">国产可控数据库</div>
        <div class="inputInfo">
          <div>连接名</div>
          <input type="text" v-model="dameng.连接名"/>
        </div>
        <div class="inputInfo">
          <div>主机IP</div>
          <input type="text" v-model="dameng.主机IP"/>
        </div>
        <div class="inputInfo">
          <div>端口</div>
          <input type="text" v-model="dameng.端口"/>
        </div>
        <div class="inputInfo">
          <div>服务名</div>
          <input type="text" v-model="dameng.服务名"/>
        </div>
        <div class="inputInfo">
          <div>验证方式</div>
          <select>
            <option>达梦数据库验证</option>
            <option>XXXXXX</option>
          </select>
        </div>
        <div class="inputInfo">
          <div>用户名</div>
          <input type="text" v-model="dameng.用户名"/>
        </div>
        <div class="inputInfo">
          <div>密码</div>
          <input type="text" v-model="dameng.密码"/>
        </div>
        <div class="btns">
          <button class="point">测试连接</button>
          <button @click="getaddDatabase2" class="point" style="border-radius: 2px;border: 1px solid rgb(0, 254, 255);color: rgb(0, 255, 255);background: none;">保存</button>
        </div>
        <PositionHorn />
      </div>
      <div class="content">
        <div class="queue">MySQL数据库</div>
        <div class="inputInfo">
          <div>连接名</div>
          <input type="text" v-model="MySQL.连接名"/>
        </div>
        <div class="inputInfo">
          <div>主机IP</div>
          <input type="text" v-model="MySQL.主机IP"/>
        </div>
        <div class="inputInfo">
          <div>端口</div>
          <input type="text" v-model="MySQL.端口"/>
        </div>
        <div class="inputInfo">
          <div>用户名</div>
          <input type="text" v-model="MySQL.用户名"/>
        </div>
        <div class="inputInfo">
          <div>密码</div>
          <input type="text" v-model="MySQL.密码"/>
        </div>
        <div class="btns">
          <button class="point">测试连接</button>
          <button @click="getaddDatabase1" class="point" style="border-radius: 2px;border: 1px solid rgb(0, 254, 255);color: rgb(0, 255, 255);background: none;">保存</button>
        </div>
        <PositionHorn />
      </div>
      <div class="content">
        <div class="queue">Oracle数据库</div>
        <div class="inputInfo">
          <div>连接名</div>
          <input type="text" v-model="Oracle.连接名"/>
        </div>
        <div class="inputInfo">
          <div>连接类型</div>
          <select v-model="Oracle.连接类型">
            <option>Basic</option>
            <option>TNS</option>
          </select>
        </div>
        <div class="inputInfo">
          <div>主机IP</div>
          <input type="text" v-model="Oracle.主机IP"/>
        </div>
        <div class="inputInfo">
          <div>端口</div>
          <input type="text" v-model="Oracle.端口"/>
        </div>
        <div class="inputInfo">
          <div>服务名</div>
          <input type="text" v-model="Oracle.服务名"/>
        </div>
        <div class="inputInfo">
          <div>用户名</div>
          <input type="text" v-model="Oracle.用户名"/>
        </div>
        <div class="inputInfo">
          <div>密码</div>
          <input type="text" v-model="Oracle.密码"/>
        </div>
        <div class="btns">
          <button class="point">测试连接</button>
          <button @click="getaddDatabase" class="point" style="border-radius: 2px;border: 1px solid rgb(0, 254, 255);color: rgb(0, 255, 255);background: none;">保存</button>
        </div>
        <PositionHorn />
      </div>
    </div>
  </div>
</template>

<script>
    import PositionHorn from '@/components/Postion_Horn'
    export default {
        name: 'database',
        data () {
            return {
                data: [],
                radio: '3',
                Oracle:{
                    密码:'',
                    用户名:'',
                    服务名:'',
                    端口:'',
                    主机IP:'',
                    连接类型:'',
                    连接名:'',
                },
                MySQL:{
                    密码:'',
                    用户名:'',
                    服务名:'',
                    端口:'',
                    主机IP:'',
                    连接名:'',
                },
                dameng:{
                    密码:'',
                    验证方式:'',
                    用户名:'',
                    服务名:'',
                    端口:'',
                    主机IP:'',
                    连接名:'',
                }
            }
        },
        components: {
            PositionHorn
        },
        created () {
            this.getshujuku()
        },
        methods: {
            getshujuku () {
                this.$api.systemSet.queryzidian().then((res) => {
                    console.log('zidian',res)
                    console.log('zidian',res.dameng)
                    // if (res.code) {
                    this.Oracle= JSON.parse(res.oracle);
                    this.MySQL= JSON.parse(res.mysql);
                    // this.dameng= JSON.parse(res.dameng);
                    console.log('this.Oracle',this.Oracle)
                    // }
                })
            },
            getaddDatabase () {
                console.log('this.Oracle',this.Oracle)
                this.Oracle1=JSON.stringify(this.Oracle)
                console.log('this.Oracle1',this.Oracle1)
                this.$api.systemSet.adddatabase({//Oracle
                    databaseType:'Oracle',
                    conn:this.Oracle1
                }).then((res) => {
                    console.log('getaddDatabase',res)
                    console.log('getaddDatabase',res.dameng)
                    if (res.code) {


                    }
                })
            },
            getaddDatabase1 () {
                this.Oracle1=JSON.stringify(this.MySQL)
                console.log('this.Oracle1',this.Oracle1)
                this.$api.systemSet.adddatabase({//Oracle
                    databaseType:'MySQL',
                    conn:this.Oracle1
                }).then((res) => {

                })
            },
            getaddDatabase2() {
                this.Oracle1=JSON.stringify(this.dameng)
                this.$api.systemSet.adddatabase({//Oracle
                    databaseType:'dameng',
                    conn:this.Oracle1
                }).then((res) => {

                })
            },
        }
    }
</script>

<style lang="scss" scoped>
  .user {
    @include wh(1200px, auto);
    @include direction(column);
    margin: 0 auto;
    position: relative;
    .top {
      width: 100%;
      position: relative;
      z-index:0;
      height: 100px;
      background:rgba(5,27,74,0.15);
      box-shadow:0px 0px 26px 0px rgba(0,229,255,0.2) inset;
      border:1px solid rgba(10,67,188,0.32);
      .input-info {
        padding: 10px 0;
        .el-radio{
          position: relative;
          width: 10%;
          float: left;
          background:none;
          color: #FFF;
        }
        button{
          position: absolute;
          width:100px;
          height:28px;
          background:linear-gradient(180deg,rgba(5, 252, 92, 0.89) 0%, rgb(12, 200, 70) 100%);
          box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 2px 0px rgba(255,255,255,0.5) inset;
          border-radius:2px;
          color: #fff;
          border: none;
          margin: 2px 10px;
        }
      }
    }
    .bottom {
      position: relative;
      margin-top:30px;
      height: 500px;
      @include box_flex;
      .content{
        @include box_flex;
        @include flex;
        @include direction(column);
        position: relative;
        margin-right: 10px;
        background:rgba(5,27,74,0.22);
        border:1px solid rgba(10,67,188,1);
        box-shadow:0px 0px 28px 0px rgba(0,229,255,0.4) inset;
        opacity:0.8;
        .inputInfo{
          width: 100%;
          height: 55px;
          line-height: 55px;
          position: relative;
          & > div{
            float: left;
            width: 90px;
            font-size: 14px;
            text-align: right;
          }
          input,select{
            margin-left: 10px;
            padding: 0 8px;
            box-sizing: border-box;
            width:240px;
            height:30px;
            background:rgba(3,94,255,0.15);
            border-radius:2px;
            border:1px solid rgba(10,67,188,0.94);
            color: #ddd;
          }
        }
        .btns{
          width: 100%;
          text-align: center;
          position: absolute;
          bottom: 10px;
          button{
            width:100px;
            height:28px;
            background: -webkit-gradient(linear, left top, left bottom, from(#058dfc), to(#0c60c8));
            background: linear-gradient(180deg, #058dfc 0%, #0c60c8 100%);
            -webkit-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.53), 0px 1px 2px 0px rgba(255, 255, 255, 0.5);
            box-shadow:0px 1px 5px 0px rgba(0,0,0,0.53),0px 1px 2px 0px rgba(255,255,255,0.5) inset;
            border-radius:2px;
            color: #fff;
            border: none;
          }
        }
      }
    }
    .queue {
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding: 0 16px;
      background:rgba(2,154,254,0.15);
      @include sizing;
      font-size: 13px;
      color: #fff;
    }
  }
</style>
