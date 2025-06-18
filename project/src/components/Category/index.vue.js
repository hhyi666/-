import { onMounted } from 'vue';
import useCategoryStore from '@/store/modules/category';
const categoryStore = useCategoryStore();
//全局组件挂载完毕
onMounted(() => {
    categoryStore.getC1();
});
//change时间当选中值的时候会触发 保证一分类触发
const handler1 = () => {
    //将二级和三级的数据清空
    categoryStore.C2Id = '',
        categoryStore.C3Arr = [],
        categoryStore.C3Id = '',
        //获取二级分类的数据
        categoryStore.getC2();
};
const handler2 = () => {
    categoryStore.C3Id = '';
    categoryStore.getC3();
};
//接收父组件传递的值
const __VLS_props = defineProps(['scene']);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
const __VLS_0 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    inline: "true",
}));
const __VLS_6 = __VLS_5({
    inline: "true",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
const __VLS_8 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    label: "一级分类",
}));
const __VLS_10 = __VLS_9({
    label: "一级分类",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
const __VLS_12 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    ...{ 'onChange': {} },
    disabled: (__VLS_ctx.scene === 0 ? false : true),
    ...{ style: {} },
    modelValue: (__VLS_ctx.categoryStore.C1Id),
}));
const __VLS_14 = __VLS_13({
    ...{ 'onChange': {} },
    disabled: (__VLS_ctx.scene === 0 ? false : true),
    ...{ style: {} },
    modelValue: (__VLS_ctx.categoryStore.C1Id),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_16;
let __VLS_17;
let __VLS_18;
const __VLS_19 = {
    onChange: (__VLS_ctx.handler1)
};
__VLS_15.slots.default;
for (const [c1, index] of __VLS_getVForSourceType((__VLS_ctx.categoryStore.C1Arr))) {
    const __VLS_20 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        key: (c1.id),
        label: (c1.name),
        value: (c1.id),
    }));
    const __VLS_22 = __VLS_21({
        key: (c1.id),
        label: (c1.name),
        value: (c1.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
}
var __VLS_15;
var __VLS_11;
const __VLS_24 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    label: "二级分类",
}));
const __VLS_26 = __VLS_25({
    label: "二级分类",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
const __VLS_28 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    ...{ 'onChange': {} },
    disabled: (__VLS_ctx.scene === 0 ? false : true),
    ...{ style: {} },
    modelValue: (__VLS_ctx.categoryStore.C2Id),
}));
const __VLS_30 = __VLS_29({
    ...{ 'onChange': {} },
    disabled: (__VLS_ctx.scene === 0 ? false : true),
    ...{ style: {} },
    modelValue: (__VLS_ctx.categoryStore.C2Id),
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
let __VLS_32;
let __VLS_33;
let __VLS_34;
const __VLS_35 = {
    onChange: (__VLS_ctx.handler2)
};
__VLS_31.slots.default;
for (const [c2, index] of __VLS_getVForSourceType((__VLS_ctx.categoryStore.C2Arr))) {
    const __VLS_36 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        key: (c2.id),
        label: (c2.name),
        value: (c2.id),
    }));
    const __VLS_38 = __VLS_37({
        key: (c2.id),
        label: (c2.name),
        value: (c2.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
}
var __VLS_31;
var __VLS_27;
const __VLS_40 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    label: "三级分类",
}));
const __VLS_42 = __VLS_41({
    label: "三级分类",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_43.slots.default;
const __VLS_44 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    disabled: (__VLS_ctx.scene === 0 ? false : true),
    ...{ style: {} },
    modelValue: (__VLS_ctx.categoryStore.C3Id),
}));
const __VLS_46 = __VLS_45({
    disabled: (__VLS_ctx.scene === 0 ? false : true),
    ...{ style: {} },
    modelValue: (__VLS_ctx.categoryStore.C3Id),
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_47.slots.default;
for (const [c3, index] of __VLS_getVForSourceType((__VLS_ctx.categoryStore.C3Arr))) {
    const __VLS_48 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        key: (c3.id),
        label: (c3.name),
        value: (c3.id),
    }));
    const __VLS_50 = __VLS_49({
        key: (c3.id),
        label: (c3.name),
        value: (c3.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
}
var __VLS_47;
var __VLS_43;
var __VLS_7;
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            categoryStore: categoryStore,
            handler1: handler1,
            handler2: handler2,
        };
    },
    props: ['scene'],
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: ['scene'],
});
; /* PartiallyEnd: #4569/main.vue */
