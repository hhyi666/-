<template>
    <div class="top">
        <div class="left">
            <span class="lbtn" @click="goHome">首页</span>
        </div>
        <div class="center">
            <div class="title">智慧可视化大数据平台</div>
        </div>
        <div class="right">
            <span class="rbtn">统计报告</span>
            <span class="time">当前的时间是{{ time }}</span>
        </div>
    </div>

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref,onMounted,onBeforeUnmount } from 'vue';
const router = useRouter()
// 存储当前的时间
import moment from 'moment';
let time  = ref(moment().format('YYYY-MM-DD:hh:mm:ss'))
let timer = ref(0)
// 按钮点击的回调
const goHome = () => {  
    router.push('/home')
}
onMounted(() => {
    timer.value = setInterval(() => {
        time.value = moment().format('YYYY-MM-DD:hh:mm:ss')
    },1000)
})
onBeforeUnmount(() => {
    clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.top {
    width: 100%;
    height: 40px;
    display: flex;

    .left {
        flex: 1.5;
        background: url('../../images/dataScreen-header-left-bg.png') no-repeat;
        background-size: cover;

        .lbtn {
            width: 150px;
            height: 40px;
            float: right;
            text-align: center;
            line-height: 40px;
            background: url('../../images/dataScreen-header-btn-bg-l.png') no-repeat;
            background-size: 100% 100%;
            color: #29fcff;
            font-size: 20px;
        }
    }

    .center {
        flex: 2;

        .title {
            color: #29fcff;
            width: 100%;
            height: 74px;
            background: url('../../images/dataScreen-header-center-bg.png') no-repeat;
            background-size: cover;
            line-height: 74px;
            text-align: center;
            background-size: cover;
            font-size: 40px;
        }
    }

    .right {
        flex: 1.5;
        background: url('../../images/dataScreen-header-right-bg.png') no-repeat;
        background-size: cover;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .rbtn{
            width: 150px;
            height: 40px;
            background: url('../../images/dataScreen-header-btn-bg-r.png') no-repeat;
            background-size: cover;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
            font-size: 20px;
        }
        .time{
            font-size: 20px;
            color: #29fcff;
        }
    }

}
</style>