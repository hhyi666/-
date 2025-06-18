<template>
    <div class="box2">
        <div class="title">
            <p>年龄比例</p>
            <img src="../../images//dataScreen-title.png" alt="">
        </div>
        <div class="echarts" ref="charts"></div>
    </div>
</template>
<script setup lang="ts">
import { Grid } from '@element-plus/icons-vue/dist/types';
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue';
let charts = ref()
onMounted(() => {
    let mycharts = echarts.init(charts.value)
    mycharts.setOption({
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: 40,
            right: 90,
            orient : 'vertical', //图例组件的方向的设置
            textStyle : {
                color : 'white',
                fontSize : 16
            }
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['35%', '60%'], //调整pie的位置
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2,
                },
                label: {
                    show: false,
                    position: 'inside' ,
                    color : 'white',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 20,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: '军事' },
                    { value: 735, name: '新闻' },
                    { value: 580, name: '直播' },
                    { value: 484, name: '娱乐' },
                    { value: 300, name: '财经' }
                ],
            },
        ],
        grid : {
            left : 0,
            top : 0,
            bittom : 0,
            right : 0,
        }
    })
})
</script>
<style scoped lang="scss">
.box2 {
    width: 100%;
    height: 100%;
    background: url('../../images/dataScreen-main-cb.png');
    background-size: 100% 100%;

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

    .echarts {
        height: 260px;
    }
}
</style>