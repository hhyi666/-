<template>
    <div class="box4" ref="map">
        地图组件
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts'
import ChinaJSON from './China.json'
let map = ref()
// 注册中国地图
echarts.registerMap('China', ChinaJSON as any)
// 使用echarts进行使用
onMounted(() => {
    let myecharts = echarts.init(map.value)
    myecharts.setOption({
        // 设置配置项
        geo: {
            map: 'China',
            roam: true,
            // 位置的调试
            top: 130,
            width: '90%',
            // 覅图文字的配置想项
            label: {
                show: true,
                color: 'white',
            },
            // 每一个多边形的样式
            itemStyle: { //渐变效果的展示
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#4A90E2'
                    },
                    {
                        offset: 1, color: '#1E2D61'
                    }],
                    global: false
                },
                opacity: 0.8,
            },
            // 高亮效果的展示
            emphasis: {
                itemStyle: {
                    color: 'skyblue',
                    fontSize: 40,

                }
            },
        },
        series: [{
            type: 'lines',
            data: [{  // 每个数据对象包含 coords 和 lineStyle
                coords: [
                    [116.405285, 39.904989], // 起点（北京）
                    [112.549248, 37.857014]  // 终点（太原）
                ],
                lineStyle: {  // 正确作为 data 元素的属性
                    color: 'white',
                    width: 3,
                    opacity: 0.8,
                    curveness : 0.2,
                }
            },
            {
                coords : [
                    [114.502461, 38.045474],
                    [114.298572, 30.584355],
                ],
                lineStyle:{
                    color : 'white',
                    width : 3,
                    opacity : 0.8,
                    curveness : 0.2,
                }
            }],
            // 开启动画的特效
            effect: {
                show: true,
                symbol: 'arrow',
                color: 'red',
                symbolSize: 13,
            }
        }]
    })
})
</script>

<style scoped lang="scss"></style>