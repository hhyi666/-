import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
let charts = ref();
onMounted(() => {
    // 一个容易可以展示多种类型的图标
    let mycharts = echarts.init(charts.value);
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
        yAxis: {},
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
                    color: function (data) {
                        let arr = ['red', 'blue', 'pink', 'skyblue', 'black', 'yellow', 'green'];
                        //每个设置不一样的颜色
                        return arr[data.dataIndex];
                    }
                }
            },
            {
                // 可以放置多个图表
                type: 'line',
                data: [10, 20, 30, 90, 50, 40, 50],
                smooth: true,
                tooltip: {
                    backgroundColor: 'rgba(50,50,50,0.7)'
                }
            }
        ],
    });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "box6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "title" },
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
/** @type {__VLS_StyleScopedClasses['box6']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
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
