import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
// 水球图的插件
import 'echarts-liquidfill';
let people = ref('216908人');
let charts = ref();
onMounted(() => {
    // 设置实例方法
    let mycharts = echarts.init(charts.value);
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
            radius: '80%',
            outline: {
                show: true,
                borderDistance: 8,
                itemStyle: {
                    color: 'skyblue'
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
    });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "box" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "top" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "bg" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "right" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "number" },
});
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.people))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        key: (index),
    });
    (item);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "charts" },
    ref: "charts",
});
/** @type {typeof __VLS_ctx.charts} */ ;
/** @type {__VLS_StyleScopedClasses['box']} */ ;
/** @type {__VLS_StyleScopedClasses['top']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['bg']} */ ;
/** @type {__VLS_StyleScopedClasses['right']} */ ;
/** @type {__VLS_StyleScopedClasses['number']} */ ;
/** @type {__VLS_StyleScopedClasses['charts']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            people: people,
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
