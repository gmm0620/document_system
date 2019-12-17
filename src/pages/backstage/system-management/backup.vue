<template>
    <div class="backup">
        <h3>数据备份</h3>
        <div>
            <div>
                <span>初始化数据库:</span>
                <input type="text">
                <button class="point">执行</button>
            </div>
            <div>
                <span>导入原系统数据:</span>
                <input type="text">
                <button class="point">执行</button>
            </div>
            <div>
                <span>备份新系统数据:</span>
                <input type="text">
                <button class="point">执行</button>
            </div>
            <div>
                <span>导入新系统数据:</span>
                <input type="text">
                <button class="point">执行</button>
            </div>
        </div>
        <PositionHorn />
    </div>
</template>

<script>
import PositionHorn from '@/components/Postion_Horn'
export default {
    name: 'backup',
    data () {
        return {}
    },
    components: {
      PositionHorn
    }
}
</script>

<style lang="scss" scoped>
.backup {
    position: relative;
    z-index:0;
    width: 100%;
    height: 90px;
    background:rgba(5,27,74,0.22);
    box-shadow:0px 0px 26px 0px rgba(158, 241, 250, 0.2) inset;
    border:1px solid rgba(10,67,188,0.32);
    height:568px;
    h3 {
        height: 40px;
        background:rgba(2,154,254,0.15);
        position: relative;
        line-height: 40px;
        font-size: 13px;
        padding:0 16px;
    }
    &>div {
        &>div {
            margin:20px 0 0 100px;
            span {
                width: 100px;
                text-align: right;
                display: inline-block;
            }
            input {
                border:none;
                width:320px;
                height:30px;
                background:rgba(3,94,255,0.15);
                border-radius:2px;
                border:1px solid rgba(10,67,188,0.94);
                margin-left:8px;
            }
            button {
                border: none;
                margin-left:16px;
                color:#00FEFF;
                width:60px;
                height:30px;
                background:rgba(3,129,255,0.26);
                border-radius:2px;
                border:1px solid rgba(10,67,188,1);
            }
        }
    }
}
</style>
