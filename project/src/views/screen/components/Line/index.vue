<template>
    <div class="box5">
        <div class="title">
            <p>未来七天游客数量趋势图</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref="line"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue';
let line = ref()
onMounted(() => {
    let mycharts = echarts.init(line.value)
    mycharts.setOption({
        title: {
            text: '游客访问量趋势图',
            left : 400,
            textStyle : {
                color : 'white'
            }
            
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {
                show: false,
            },
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            splitLine: {
                show: false
            },
            // 轴线的设置
            axisLine : {
                show : true
            },
            axisTick : {
                show : true
            }
        },
        grid: {
            left: 40,
            top: 0,
            right: 10,
            bottom: 25,
        },
        // 系列
        series: [
            {
                type: 'line',
                data: [120, 22, 240, 443, 66, 99, 921, 1022],
                // 平滑曲线的i设置
                smooth: true,
                // 区域填充的样式
                areaStyle: {
                    // 渐变颜色的设置
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'red',
                        },
                        {
                            offset: 1, color: 'blue'
                        }],
                        global: false,
                    }
                }
            },

        ]
    })
})
</script>

<style scoped lang="scss">
.box5 {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin: 0 20px;

    .title {
        margin-left: 10px;

        p {
            color: white;
            font-size: 20px;
        }

        img {
            margin-top: 10px;
        }
    }

    .charts {
        height: calc(100% - 40px);
    }

}
</style>