<template>
    <div class="micro-serveice">
        <div class="top">
            <h3>
                连接主库
                <button class="connect point">连接</button>
            </h3>
            <div class="inputContent">
                <div>
                    <span>主机名/IP:</span>
                    <input type="text">
                </div>
                <div>
                    <span>用户名:</span>
                    <input type="text">
                </div>
                <div>
                    <span>密码:</span>
                    <input type="text">
                </div>
                <div>
                    <span>密钥:</span>
                    <input type="text">
                </div>
            </div>
            <PositionHorn />
        </div>
        <div class="bottom">
            <h3>通用参数设置</h3>
            <div class="parameterContent">
                <div>
                    <h4>A.请求入参</h4>
                    <div>
                        <span>BaseRequest</span>
                        <div class="btn">
                            <button class="add point"><span>+</span>添加</button>
                            <button class="delete point"><span>-</span>删除</button>
                        </div>
                        <div class="table">
                            <el-table
                                :data="data"
                                stripe
                                style="width: 100%">
                                <el-table-column
                                prop="参数对象"
                                label="参数对象"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="类型"
                                label="类型"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="是否必填"
                                label="是否必填"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="备注"
                                label="备注">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div>
                        <span>Operator</span>
                        <div class="btn">
                            <button class="add point"><span>+</span>添加</button>
                            <button class="delete point"><span>-</span>删除</button>
                        </div>
                        <div class="table">
                            <el-table
                                :data="data"
                                stripe
                                style="width: 100%">
                                <el-table-column
                                prop="参数对象"
                                label="参数对象"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="类型"
                                label="类型"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="是否必填"
                                label="是否必填"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="备注"
                                label="备注">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>B.响应返回</h4>
                    <div>
                        <span>BaseResponse</span>
                        <div class="btn">
                            <button class="add point"><span>+</span>添加</button>
                            <button class="delete point"><span>-</span>删除</button>
                        </div>
                        <div class="table">
                            <el-table
                                :data="data"
                                stripe
                                style="width: 100%">
                                <el-table-column
                                prop="参数对象"
                                label="参数对象"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="类型"
                                label="类型"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="是否必填"
                                label="是否必填"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="备注"
                                label="备注">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div>
                        <span>BaseInfoVO (extend BaseVO)</span>
                        <div class="btn">
                            <button class="add point"><span>+</span>添加</button>
                            <button class="delete point"><span>-</span>删除</button>
                        </div>
                        <div class="table">
                            <el-table
                                :data="data"
                                stripe
                                style="width: 100%">
                                <el-table-column
                                prop="参数对象"
                                label="参数对象"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="类型"
                                label="类型"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="是否必填"
                                label="是否必填"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="备注"
                                label="备注">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
            <PositionHorn/>
        </div>
    </div>
</template>

<script>
import PositionHorn from '@/components/Postion_Horn'
export default {
    name: 'microService',
    data () {
      return {
          data: [
              {
                  '参数对象': '',
                  '类型': '',
                  '是否必填': '',
                  '备注': ''
              },
              {
                  '参数对象': '',
                  '类型': '',
                  '是否必填': '',
                  '备注': ''
              }
          ]
      }
    },
    components: {
      PositionHorn
    },
    created () {

    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.micro-serveice {
    width: 100%;
    @include box_flex;
    @include direction(column);
    .top {
        position: relative;
        z-index:0; z-index:0;
        width: 100%;
        height: 90px;
        background:rgba(5,27,74,0.22);
        box-shadow:0px 0px 26px 0px rgba(158, 241, 250, 0.2) inset;
        border:1px solid rgba(10,67,188,0.32);
    }
    h3 {
        height: 40px;
        background:rgba(2,154,254,0.15);
        position: relative;
        line-height: 40px;
        font-size: 13px;
        padding:0 16px;
        button {
            position: absolute;
            border:none;
            color:#fff;
            right:20px;
            top:5px;
            width:80px;
            height:30px;
            background:linear-gradient(180deg,rgba(166,242,189,1) 0%,rgba(34,162,72,1) 100%);
            box-shadow:0px 1px 1px 0px rgba(255,255,255,0.5);
            border-radius:2px;
        }
    }
    .bottom {
        position: relative;
        z-index:0;
        width: 100%;
        height:840px;
        margin-top:16px;
        background:rgba(5,27,74,0.22);
        box-shadow:0px 0px 26px 0px rgba(158, 241, 250, 0.2) inset;
        border:1px solid rgba(10,67,188,0.32);
        .parameterContent {
            width: 940px;
            margin:0 auto;
            line-height: 30px;
            h4 {
                color:rgba(2,154,254,1);
            }
            &>div{
                margin-top:20px;
                &>div {
                    margin-top:4px;
                    position: relative;
                    .btn {
                        position: absolute;
                        right:0px;
                        top:0;
                        span {
                            margin-right:4px;
                        }
                        button {
                            border:none;
                            color:#00FEFF;
                            width:58px;
                            height:24px;
                            background:rgba(3,129,255,0.26);
                            border-radius:2px;
                            border:1px solid rgba(10,67,188,1);
                        }
                    }
                }
            }
        }
    }
    .inputContent {
        height:50px;
        @include box_flex;
        @include align(center);
        @include justify(space-around);
        &>div{
            input {
                width:220px;
                height:30px;
                background:rgba(3,94,255,0.15);
                border-radius:2px;
                border:1px solid rgba(10,67,188,0.94);
                padding:0 8px;
                color:#fff;
                box-sizing: border-box;
                margin-left:8px;
            }
        }
    }
}
.table {
    margin-bottom:16px;
}
</style>
