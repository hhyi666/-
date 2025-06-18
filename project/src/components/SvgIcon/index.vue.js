const __VLS_props = defineProps({
    //xlink-href 属性的前缀
    prefix: {
        type: String,
        default: '#icon-'
    },
    name: String,
    //接收父组件传递的元素
    color: {
        type: String,
        default: ''
    },
    //接收父组件传递的图标的宽度和高度
    height: {
        type: String,
        default: '100px',
    },
    width: {
        type: String,
        default: '100px',
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    ...{ style: ({ width: __VLS_ctx.width, height: __VLS_ctx.height }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.use, __VLS_intrinsicElements.use)({
    'xlink:href': (__VLS_ctx.prefix + __VLS_ctx.name),
    fill: (__VLS_ctx.color),
});
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        //xlink-href 属性的前缀
        prefix: {
            type: String,
            default: '#icon-'
        },
        name: String,
        //接收父组件传递的元素
        color: {
            type: String,
            default: ''
        },
        //接收父组件传递的图标的宽度和高度
        height: {
            type: String,
            default: '100px',
        },
        width: {
            type: String,
            default: '100px',
        }
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        //xlink-href 属性的前缀
        prefix: {
            type: String,
            default: '#icon-'
        },
        name: String,
        //接收父组件传递的元素
        color: {
            type: String,
            default: ''
        },
        //接收父组件传递的图标的宽度和高度
        height: {
            type: String,
            default: '100px',
        },
        width: {
            type: String,
            default: '100px',
        }
    },
});
; /* PartiallyEnd: #4569/main.vue */
