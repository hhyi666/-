<template>
    <div class="box7">
        <div class="title">
            <p>年度游客量对比</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref,onMounted } from 'vue';
let charts = ref()
onMounted(() => {
    let myecharts = echarts.init(charts.value)
    myecharts.setOption({
        title : {
            text : '散点图',
            left : '40%',
            textStyle : {
                color : 'white'
                
            },
        },
        xAxis : {
            type : 'category',
        },
        yAxis : {
            show : false,
        },
        grid : {
            left : 20,
            bottom : 20,
            top : 20,
        },
        series : {
            type : 'scatter',
            data : [22,333,324,12,433,323,349,6,53,23,54,662,342,63,832],
            symbol : 'circle',  //图标的设置
            symbolSize : 15, 
            label : {
                show : true,
                position : 'top',
                color : 'skyblue', //支持渐变
            },
            // 散点图标记的颜色
            itemStyle : {
                color : '',
            },
        }
    })
})
</script>

<style scoped lang="scss">
.box7 {
    width: 100%;
    height: 100%;
    background: url('../../images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin: 10px 0px;

    .title {
        margin-top: 10px;
        p {
            color: white;
            font-size: 15px;
        }

        img {
            margin-top: 10px;
        }
    }
    .charts{
        height: calc(100% - 50px);
    }
}
</style>