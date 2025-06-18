<template>
    <div class="container">
        <!-- 数据大屏展示内容的区域 -->
        <div class="screen" ref="screen">
            <div class="top">
                <Top />
            </div>
            <div class="bottom">
                <div class="left">
                    <Tourtist class="tourtist"/>
                    <Sex class="sex"/>
                    <Age class="age"/>
                </div>
                <div class="center">
                    <Map class="map"></Map>
                    <Line class="line"></Line>
                </div>
                <div class="right">
                    <Rank class="rank"/>
                    <Year class="year"/>
                    <Counter class="counter"/>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Top from './components/Top/index.vue'
import Sex from './components/Sex/index.vue'
import Tourtist from './components/Tourist/index.vue'
import Age from './components/Age/index.vue'
import Map from './components/Map/index.vue'
import Line from './components/Line/index.vue'
import Year from './components/Year/index.vue'
import Counter from './components/Counter/index.vue'
import Rank from './components/Rank/index.vue'
const screen = ref<HTMLElement | null>(null)
onMounted(() => {
    if (screen.value) {
        screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
    }
})
function getScale(w = 1920, h = 1080) {
    let ww = window.innerWidth / w
    let hh = window.innerHeight / h
    return ww < hh ? ww : hh
}
window.onresize = () => {
    if (screen.value) {
        screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
    }
}
</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    background: url('./images/bg.png') no-repeat;
    background-size: cover;

    .screen {
        position: fixed;
        left: 50%;
        top: 50%;
        transform-origin: left top;
        width: 1920px;
        height: 1080px;

        .top {
            width: 100%;
            height: 40px;
        }

        .bottom {
            display: flex;

            .left {
                height: 1040px;
                flex: 1;
                display: flex;
                flex-direction: column;
                .tourtist{
                    flex: 1.2;
                }
                .sex{
                    flex: 1;
                }
                .age{
                    flex: 1;
                }
            }

            .center {
                flex: 2;
                display: flex;
                flex-direction: column;
                .map{
                    flex : 4;
                }
                .line{
                    flex : 1;
                }
            }

            .right {
                flex: 1;
                display: flex;
                flex-direction: column;
                margin-left: 30px;
                .rank{
                    flex: 1.2;
                }   
                .year{
                    flex : 1,
                }
                .counter{
                    flex : 1,
                }
            }
        }
    }
}
</style>