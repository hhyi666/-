import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
let line = ref();
onMounted(() => {
    let mycharts = echarts.init(line.value);
    mycharts.setOption({
        title: {
            text: '游客访问量趋势图',
            left: 400,
            textStyle: {
                color: 'white'
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
            axisLine: {
                show: true
            },
            axisTick: {
                show: true
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
    });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "box5" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
    src: "../../images/dataScreen-title.png",
    alt: "",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "charts" },
    ref: "line",
});
/** @type {typeof __VLS_ctx.line} */ ;
/** @type {__VLS_StyleScopedClasses['box5']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['charts']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            line: line,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
