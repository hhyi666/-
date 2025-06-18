<template>
    <div class="box">
        <div class="top">
            <p class="title">实时游客统计</p>
            <p class="bg"></p>
            <p class="right">可预约总量<span>999999</span>人</p>
        </div>
        <div class="number">
            <span v-for="(item, index) in people" :key="index">{{ item }}</span>
        </div>
        <div class="charts" ref="charts">

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts'
// 水球图的插件
import 'echarts-liquidfill'
let people = ref('216908人')
let charts = ref()
onMounted(() => {
    // 设置实例方法
    let mycharts = echarts.init(charts.value)
    mycharts.setOption({
        // 标题的设置
        title: {
            text: '水球图'
        },
        //x y轴的组件
        xAxis: {},
        yAxis: {},
        //  序列 ： 决定展示的什么样的图标
        series: {
            type: 'liquidFill',
            data: [0.6, 0.4, 0.2], //展示的数据
            waveAnimation: true, //动画
            animationDuration: 3, //时间
            animationDurationUpdate: 0,
            radius : '80%',
            outline : {
                show : true,
                borderDistance : 8,
                itemStyle : {
                    color : 'skyblue'
                }
            }
        },
        //布局组件
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        }
    })
})
</script>

<style scoped lang=scss>
.box {
    background: url('../../images/dataScreen-main-lb.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;

    .top {
        margin-left: 20px;

        .title {
            color: white;
            font-size: 20px;

        }

        .bg {
            width: 68px;
            height: 7px;
            background: url('../../images/dataScreen-title.png');
            margin-top: 10px;
        }

        .right {
            float: right;
            color: white;
            font-size: 20px;

            span {
                color: yellowgreen;
            }
        }
    }

    .number {
        margin-top: 30px;
        display: flex;
        padding: 10px;

        span {
            flex: 1;
            height: 60px;
            text-align: center;
            line-height: 60px;
            background: url('../../images//total.png');
            background-size: 100% 100%;
            font-size: 30px;
            color: aqua;
        }
    }

    .charts {
        width: 100%;
        height: 240px;
    }
}
</style>