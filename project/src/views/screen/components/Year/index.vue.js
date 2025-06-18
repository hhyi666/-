import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
let charts = ref();
onMounted(() => {
    let myecharts = echarts.init(charts.value);
    myecharts.setOption({
        title: {
            text: '散点图',
            left: '40%',
            textStyle: {
                color: 'white'
            },
        },
        xAxis: {
            type: 'category',
        },
        yAxis: {
            show: false,
        },
        grid: {
            left: 20,
            bottom: 20,
            top: 20,
        },
        series: {
            type: 'scatter',
            data: [22, 333, 324, 12, 433, 323, 349, 6, 53, 23, 54, 662, 342, 63, 832],
            symbol: 'circle', //图标的设置
            symbolSize: 15,
            label: {
                show: true,
                position: 'top',
                color: 'skyblue', //支持渐变
            },
            // 散点图标记的颜色
            itemStyle: {
                color: '',
            },
        }
    });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "box7" },
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
    ref: "charts",
});
/** @type {typeof __VLS_ctx.charts} */ ;
/** @type {__VLS_StyleScopedClasses['box7']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['charts']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            charts: charts,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
