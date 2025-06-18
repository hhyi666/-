<template>
    <div class="box1">
        <div class="top">
            <div class="title">
                <p>男女比例</p>
                <img src="../../images/dataScreen-title.png" alt="">
            </div>
            <div class="sex">
                <div class="man">
                    <img src="../../images/man.png" alt="">
                </div>
                <div class="woman">
                    <img src="../../images/woman.png" alt="">
                </div>
            </div>
            <div class="rate">
                <p>男士58%</p>
                <p>女士42%</p>
            </div>
            <div class="charts" ref="charts">

            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue';
//获取图形图标的dom节点
let charts = ref()
onMounted(() => {
    let mycharts = echarts.init(charts.value)
    mycharts.setOption({
        title: {
            text: '男女比例',
            textStyle: {
                color: 'skyblue'
            },
            left: '40%',
        },
        xAxis: {
            show: false,
            min: 0,
            max: 100,
        },
        yAxis: {
            show: false,
            type: 'category',
        },
        series: [
            {
                type: 'bar',
                data: [58],
                barWidth: 20,
                z: 100,
                itemStyle: {
                    borderRadius: 20,
                    color: 'skyblue'
                }

            },
            {
                type: 'bar',
                data: [100],
                barWidth: 20,
                // 调整女士主条的位置
                barGap: '-100%',
                itemStyle: {
                    color: 'pink',
                    borderRadius: 20,
                }
            }
        ],
        grid: {
            left: 0,
            bottom: 0,
            right: 0,
            top: 0,
        }
    })
})
</script>
<style scoped lang="scss">
.box1 {
    width: 100%;
    height: 100%;
    background: url('../../images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin: 10px 0px;

    .title {
        margin-left: 20px;

        p {
            color: white;
            font-size: 20px;
        }

        img {
            margin-top: 10px;
        }
    }

    .sex {
        display: flex;
        justify-content: center;

        .man {
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url('../../images/man-bg.png');
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .woman {
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url('../../images/woman-bg.png');
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .rate {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white
    }

    .charts {
        height: 100px;
        padding: 10px;
    }
}
</style>