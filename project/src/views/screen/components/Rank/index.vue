<template>
    <div class="box6">
        <div class="title">
            <div class="title">
                <p>热门景区排行</p>
                <img src="../../images/dataScreen-title.png" alt="">
            </div>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue';
let charts = ref()
onMounted(() => {
    // 一个容易可以展示多种类型的图标
    let mycharts = echarts.init(charts.value)
    mycharts.setOption({
        title: {
            text: '景区排行',
            link: 'http://www.baidu.com',
            left: '40%',
            textStyle: {
                color: 'yellow',
                fontSize: 20,
            },
            subtext: '各大景区排行',
            subtextStyle: {
                color: 'yellowgreen',
                fontSize: 16,

            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {

        },
        grid: {
            left: 20,
            bottom: 20,
            right: 20,
        },
        series: [
            {
                type: 'bar',
                data: [10, 20, 30, 90, 50, 40, 50],
                // 展示具体的数据
                label: {
                    show: true,
                    position: 'top',
                    color: 'yellow',
                },
                //是否显示背景颜色
                showBackground: true,
                backgroundStyle: {
                    // 也可以是渐变的颜色
                    color: '#ccc',
                },
                itemStyle: {
                    borderRadius: [10, 10, 0, 0],
                    //可以使用函数的形式 进行设置
                    color: function (data: any) {
                        let arr = ['red', 'blue', 'pink', 'skyblue','black','yellow','green']
                        //每个设置不一样的颜色
                        return arr[data.dataIndex]
                    }
                }
            },
            {
                // 可以放置多个图表
                type: 'line',
                data: [10, 20, 30, 90, 50, 40, 50],
                smooth : true,
                tooltip : {
                    backgroundColor : 'rgba(50,50,50,0.7)'
                }
            }
        ],
    })
})

</script>

<style scoped lang="scss">
.box6 {
    width: 100%;
    height: 100%;
    background: url('../../images/dataScreen-main-cb.png');
    background-size: 100% 100%;

    .title {
        margin-left: 0px;
        margin-top: 20px;

        p {
            color: white;
            font-size: 17px;
        }

        img {
            margin-top: 10px;
        }
    }

    .charts {
        height: calc(100% - 30px);

    }
}
</style>