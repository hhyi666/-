import { reqAddSku, reqSpuImageList, reqSpuHasSaleAttr } from '@/api/product/spu'; //获取图片属性
import { reqAttr } from '@/api/product/attr'; //获取平平台的属性
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
const cancel = () => {
    //添加的时候不需要再次发送请求
    $emit('changeScene', { flag: 0, params: '' });
};
const attrArr = ref([]);
const saleArr = ref([]);
const imgArr = ref([]);
//搜集参数
let skuParams = reactive({
    category3Id: '',
    spuId: '',
    tmId: '',
    skuName: '',
    price: '',
    weight: '',
    skuDesc: '',
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: '',
});
//获取table组件的实例
let table = ref();
//设置默认图片的回调
const handler = (row) => {
    //点击全部的不进行选中 选中的才进行勾选
    imgArr.value.forEach((item) => {
        table.value.toggleRowSelection(item, false);
    });
    //复选框选中
    table.value.toggleRowSelection(row, true);
    skuParams.skuDefaultImg = row.imgUrl;
};
// 收集数据并进行展示
const initSkuData = async (C1Id, C2Id, spu) => {
    //获取平台熟悉感
    const res1 = await reqAttr(C1Id, C2Id, spu.category3Id);
    //获取销售属性的数据
    const res2 = await reqSpuHasSaleAttr(spu.id);
    //获取图墙的数据
    const res3 = await reqSpuImageList(spu.id);
    attrArr.value = res1.data;
    saleArr.value = res2.data;
    imgArr.value = res3.data;
    //原本数据的收集
    skuParams.category3Id = spu.category3Id;
    skuParams.spuId = spu.id;
    skuParams.tmId = spu.tmId;
};
//收集参数发送到服务器 证明增加的数据
//数据的收集
const save = async () => {
    //整理参数
    //平台属性 数组里面添加的id分别都是一对一的关系 prev是累加器 next是当前的数据 切割之后可以放到prev当中
    //[]表示初始值是空数组
    skuParams.skuAttrValueList = attrArr.value.reduce((prev, next) => {
        if (next.attrIdAndValueId) {
            let [attrId, valueId] = next.attrIdAndValueId.split(':');
            prev.push({
                attrId, valueId
            });
        }
        return prev;
    }, []);
    //销售属性
    skuParams.skuSaleAttrValueList = saleArr.value.reduce((prev, next) => {
        if (next.saleIdAndValueId) {
            let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':');
            prev.push({
                saleAttrId, saleAttrValueId
            });
        }
        return prev;
    });
    //发送请求进行更新
    const res = await reqAddSku(skuParams);
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '添加成功'
        });
        // 成功之后切换对象
        $emit('changeScene', { flag: 0, params: '' });
    }
    else {
        ElMessage({
            type: 'error',
            message: '添加失败'
        });
    }
};
let $emit = defineEmits(['changeScene']);
const __VLS_exposed = { initSkuData };
defineExpose(__VLS_exposed);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    labelWidth: "80px",
}));
const __VLS_2 = __VLS_1({
    labelWidth: "80px",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    label: "SKU名称",
}));
const __VLS_7 = __VLS_6({
    label: "SKU名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    placeholder: "请输入SKU的名称",
    modelValue: (__VLS_ctx.skuParams.skuName),
}));
const __VLS_11 = __VLS_10({
    placeholder: "请输入SKU的名称",
    modelValue: (__VLS_ctx.skuParams.skuName),
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
var __VLS_8;
const __VLS_13 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    label: "价格(元)",
}));
const __VLS_15 = __VLS_14({
    label: "价格(元)",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
const __VLS_17 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    placeholder: "价格(元)",
    type: "number",
    modelValue: (__VLS_ctx.skuParams.price),
}));
const __VLS_19 = __VLS_18({
    placeholder: "价格(元)",
    type: "number",
    modelValue: (__VLS_ctx.skuParams.price),
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
var __VLS_16;
const __VLS_21 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    label: "重量(g)",
}));
const __VLS_23 = __VLS_22({
    label: "重量(g)",
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
__VLS_24.slots.default;
const __VLS_25 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    placeholder: "重量(g)",
    type: "number",
    modelValue: (__VLS_ctx.skuParams.weight),
}));
const __VLS_27 = __VLS_26({
    placeholder: "重量(g)",
    type: "number",
    modelValue: (__VLS_ctx.skuParams.weight),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
var __VLS_24;
const __VLS_29 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    label: "SKU描述",
}));
const __VLS_31 = __VLS_30({
    label: "SKU描述",
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
__VLS_32.slots.default;
const __VLS_33 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    placeholder: "SKU描述",
    type: "textarea",
    modelValue: (__VLS_ctx.skuParams.skuDesc),
}));
const __VLS_35 = __VLS_34({
    placeholder: "SKU描述",
    type: "textarea",
    modelValue: (__VLS_ctx.skuParams.skuDesc),
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
var __VLS_32;
const __VLS_37 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
    label: "平台属性",
}));
const __VLS_39 = __VLS_38({
    label: "平台属性",
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
__VLS_40.slots.default;
const __VLS_41 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
    inline: true,
}));
const __VLS_43 = __VLS_42({
    inline: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
__VLS_44.slots.default;
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.attrArr))) {
    const __VLS_45 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
        key: (item.id),
        label: (item.attrName),
    }));
    const __VLS_47 = __VLS_46({
        key: (item.id),
        label: (item.attrName),
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    __VLS_48.slots.default;
    const __VLS_49 = {}.ElSelect;
    /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
        modelValue: (item.attrIdAndValueId),
        ...{ style: {} },
    }));
    const __VLS_51 = __VLS_50({
        modelValue: (item.attrIdAndValueId),
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    __VLS_52.slots.default;
    for (const [attrValue, index] of __VLS_getVForSourceType((item.attrValueList))) {
        const __VLS_53 = {}.ElOption;
        /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
        // @ts-ignore
        const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
            key: (attrValue.id),
            label: (attrValue.valueName),
            value: (`${item.id}:${item.attrValue.id}`),
        }));
        const __VLS_55 = __VLS_54({
            key: (attrValue.id),
            label: (attrValue.valueName),
            value: (`${item.id}:${item.attrValue.id}`),
        }, ...__VLS_functionalComponentArgsRest(__VLS_54));
    }
    var __VLS_52;
    var __VLS_48;
}
var __VLS_44;
var __VLS_40;
const __VLS_57 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
    label: "销售属性",
}));
const __VLS_59 = __VLS_58({
    label: "销售属性",
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
__VLS_60.slots.default;
const __VLS_61 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
    inline: true,
}));
const __VLS_63 = __VLS_62({
    inline: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
__VLS_64.slots.default;
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.saleArr))) {
    const __VLS_65 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
        key: (item.id),
        label: (item.saleAttrName),
    }));
    const __VLS_67 = __VLS_66({
        key: (item.id),
        label: (item.saleAttrName),
    }, ...__VLS_functionalComponentArgsRest(__VLS_66));
    __VLS_68.slots.default;
    const __VLS_69 = {}.ElSelect;
    /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
    // @ts-ignore
    const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({
        modelValue: (item.saleIdAndValueId),
        ...{ style: {} },
    }));
    const __VLS_71 = __VLS_70({
        modelValue: (item.saleIdAndValueId),
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_70));
    __VLS_72.slots.default;
    for (const [saleAttrValue, index] of __VLS_getVForSourceType((item.spuSaleAttrValueList))) {
        const __VLS_73 = {}.ElOption;
        /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
        // @ts-ignore
        const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
            value: (`${item.id}:${item.saleAttrValue.id}`),
            key: (saleAttrValue.id),
            label: (saleAttrValue.saleAttrValueName),
        }));
        const __VLS_75 = __VLS_74({
            value: (`${item.id}:${item.saleAttrValue.id}`),
            key: (saleAttrValue.id),
            label: (saleAttrValue.saleAttrValueName),
        }, ...__VLS_functionalComponentArgsRest(__VLS_74));
    }
    var __VLS_72;
    var __VLS_68;
}
var __VLS_64;
var __VLS_60;
const __VLS_77 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({
    label: "图片名称",
}));
const __VLS_79 = __VLS_78({
    label: "图片名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_78));
__VLS_80.slots.default;
const __VLS_81 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
    border: true,
    data: (__VLS_ctx.imgArr),
    ref: "table",
}));
const __VLS_83 = __VLS_82({
    border: true,
    data: (__VLS_ctx.imgArr),
    ref: "table",
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
/** @type {typeof __VLS_ctx.table} */ ;
var __VLS_85 = {};
__VLS_84.slots.default;
const __VLS_87 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87({
    type: "selection",
    width: "80px",
    align: "center",
}));
const __VLS_89 = __VLS_88({
    type: "selection",
    width: "80px",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_88));
const __VLS_91 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_92 = __VLS_asFunctionalComponent(__VLS_91, new __VLS_91({
    label: "图片",
}));
const __VLS_93 = __VLS_92({
    label: "图片",
}, ...__VLS_functionalComponentArgsRest(__VLS_92));
__VLS_94.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_94.slots;
    const [{ row, $index }] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
        src: (row.imgUrl),
        ...{ style: {} },
        alt: "",
    });
    __VLS_94.slots['' /* empty slot name completion */];
}
var __VLS_94;
const __VLS_95 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_96 = __VLS_asFunctionalComponent(__VLS_95, new __VLS_95({
    label: "名称",
    prop: "imgName",
}));
const __VLS_97 = __VLS_96({
    label: "名称",
    prop: "imgName",
}, ...__VLS_functionalComponentArgsRest(__VLS_96));
const __VLS_99 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_100 = __VLS_asFunctionalComponent(__VLS_99, new __VLS_99({
    label: "操作",
}));
const __VLS_101 = __VLS_100({
    label: "操作",
}, ...__VLS_functionalComponentArgsRest(__VLS_100));
__VLS_102.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_102.slots;
    const [{ row, $index }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_103 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_104 = __VLS_asFunctionalComponent(__VLS_103, new __VLS_103({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ style: {} },
    }));
    const __VLS_105 = __VLS_104({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_104));
    let __VLS_107;
    let __VLS_108;
    let __VLS_109;
    const __VLS_110 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handler(row);
        }
    };
    __VLS_106.slots.default;
    var __VLS_106;
    __VLS_102.slots['' /* empty slot name completion */];
}
var __VLS_102;
var __VLS_84;
var __VLS_80;
const __VLS_111 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_112 = __VLS_asFunctionalComponent(__VLS_111, new __VLS_111({}));
const __VLS_113 = __VLS_112({}, ...__VLS_functionalComponentArgsRest(__VLS_112));
__VLS_114.slots.default;
const __VLS_115 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_116 = __VLS_asFunctionalComponent(__VLS_115, new __VLS_115({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}));
const __VLS_117 = __VLS_116({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_116));
let __VLS_119;
let __VLS_120;
let __VLS_121;
const __VLS_122 = {
    onClick: (__VLS_ctx.save)
};
__VLS_118.slots.default;
var __VLS_118;
const __VLS_123 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_124 = __VLS_asFunctionalComponent(__VLS_123, new __VLS_123({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}));
const __VLS_125 = __VLS_124({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_124));
let __VLS_127;
let __VLS_128;
let __VLS_129;
const __VLS_130 = {
    onClick: (__VLS_ctx.cancel)
};
__VLS_126.slots.default;
var __VLS_126;
var __VLS_114;
var __VLS_3;
// @ts-ignore
var __VLS_86 = __VLS_85;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            cancel: cancel,
            attrArr: attrArr,
            saleArr: saleArr,
            imgArr: imgArr,
            skuParams: skuParams,
            table: table,
            handler: handler,
            save: save,
        };
    },
    emits: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    emits: {},
});
; /* PartiallyEnd: #4569/main.vue */
