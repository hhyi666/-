import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue';
import useCategoryStore from '@/store/modules/category';
import { reqAddOrUpdataAttr, reqAttr, reqRemoveAttr } from '@/api/product/attr';
import { ElMessage } from 'element-plus';
let categoryStore = useCategoryStore();
//存储已有的属性与属性值
let AttrArr = ref([]);
//用来控制卡片的变化
let scene = ref(0); // 0显示table 1显示添加
//监听仓库三级分类id的变化
watch(() => categoryStore.C3Id, () => {
    //清空原有的数据
    AttrArr.value = [];
    //保证三级分类存在才能发消息
    if (!categoryStore.C3Id)
        return;
    getAttr();
});
//获取已有的属性和方法
const getAttr = async () => {
    const { C1Id, C2Id, C3Id } = categoryStore;
    const res = await reqAttr(C1Id, C2Id, C3Id);
    if (res.code === 200) {
        AttrArr.value = res.data;
    }
};
const addAttr = () => {
    //添加新的属性的时候 需要机型数据的清除 原来的业务要进行清除
    Object.assign(attrParams, {
        attrName: '',
        attrValueList: [],
        categoryId: categoryStore.C3Id,
        categoryLevel: 3,
    });
    scene.value = 1;
};
const updataAttr = (row) => {
    scene.value = 1;
    //将已有的属性对象赋值给attrParams 这是浅拷贝（操作同一个对象）的东西
    //我们呢需要进行深拷贝 来进行操作 不会对原数据进影响 使用JSO来实现深拷贝 防止影响
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
};
const cancel = () => {
    scene.value = 0;
};
//收集新增数据的属性
let attrParams = reactive({
    attrName: '', //属性的名字
    attrValueList: [], //属性值数组
    categoryId: '',
    categoryLevel: 3, //给三级分类
});
const addAttrValue = () => {
    //点击添加 向数组添加属性值对象
    attrParams.attrValueList.push({
        valueName: '',
        flag: true, //控制编辑模式和查看模式的更换
    });
    //添加最后的input组件 实现聚焦操作
    nextTick(() => {
        inputArr.value[attrParams.attrValueList.length - 1].focus();
    });
};
//保存按钮的回调
const save = async () => {
    //参数收集完毕
    //发送请求
    const res = await reqAddOrUpdataAttr(attrParams);
    if (res.code === 200) {
        //切换场景
        scene.value = 0;
        ElMessage({
            type: 'success',
            message: attrParams.id ? '修改成功' : '添加成功'
        });
        //获取全部的已有的属性和新增属性值
    }
    else {
        ElMessage({
            type: 'error',
            message: attrParams.id ? '修改失败' : '添加失败'
        });
    }
};
//失去焦点的时候进行变化
const toLook = (row, $index) => {
    //非法情况的判断
    if (row.valueName.trim() === '') {
        //删除属性值是空的东西
        attrParams.attrValueList.splice($index, 1);
        ElMessage({
            type: 'error',
            message: '属性值不能为空',
        });
        return;
    }
    //非法情况二
    let repeat = attrParams.attrValueList.find((item) => {
        //判断的时候不能判断自己
        if (item != row) {
            return item.valueName === row.valueName;
        }
    });
    if (repeat) {
        attrParams.attrValueList.splice($index, 1);
        ElMessage({
            type: 'error',
            message: '属性值不能重复',
        });
        return;
    }
    //相应的flag标记变成false
    row.flag = false;
};
//再次切换回来
const toEdit = (row, $index) => {
    row.flag = true;
    //响应式数据发生变化 拿到对应的数据
    nextTick(() => {
        inputArr.value[$index].focus();
    });
};
//准备数组存储Elinput的组件实例
let inputArr = ref([]);
//ref 也可以拿对应的组件实例
//删除已有的属性
const deleteAttr = async (attrid) => {
    const res = await reqRemoveAttr(attrid);
    console.log(res);
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        });
        //获取已有的属性值
        getAttr();
    }
    else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        });
    }
};
//路由组件销毁的时候 将仓库中的数据进行清空
onBeforeUnmount(() => {
    //内置的方法 用来清空仓库中的数据 
    //注意使用组合式API的时候 reset函数需要自己进行设置
    categoryStore.$reset();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.Category;
/** @type {[typeof __VLS_components.Category, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    scene: (__VLS_ctx.scene),
}));
const __VLS_2 = __VLS_1({
    scene: (__VLS_ctx.scene),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const __VLS_4 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ style: {} },
}));
const __VLS_6 = __VLS_5({
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.scene === 0) }, null, null);
const __VLS_8 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "Plus",
    ...{ style: {} },
    disabled: (__VLS_ctx.categoryStore.C3Id ? false : true),
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "Plus",
    ...{ style: {} },
    disabled: (__VLS_ctx.categoryStore.C3Id ? false : true),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onClick: (__VLS_ctx.addAttr)
};
__VLS_11.slots.default;
var __VLS_11;
const __VLS_16 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    border: true,
    ...{ style: {} },
    data: (__VLS_ctx.AttrArr),
}));
const __VLS_18 = __VLS_17({
    border: true,
    ...{ style: {} },
    data: (__VLS_ctx.AttrArr),
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    label: "序号",
    type: "index",
    align: "center",
    width: "80px",
}));
const __VLS_22 = __VLS_21({
    label: "序号",
    type: "index",
    align: "center",
    width: "80px",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_24 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    label: "属性名称",
    align: "center",
    width: "120px",
    prop: "attrName",
}));
const __VLS_26 = __VLS_25({
    label: "属性名称",
    align: "center",
    width: "120px",
    prop: "attrName",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const __VLS_28 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    label: "属性值名称",
    align: "center",
}));
const __VLS_30 = __VLS_29({
    label: "属性值名称",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_31.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_31.slots;
    const [{ row, $index }] = __VLS_getSlotParams(__VLS_thisSlot);
    for (const [item, index] of __VLS_getVForSourceType((row.attrValueList))) {
        const __VLS_32 = {}.ElTag;
        /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
        // @ts-ignore
        const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
            key: (item.id),
        }));
        const __VLS_34 = __VLS_33({
            key: (item.id),
        }, ...__VLS_functionalComponentArgsRest(__VLS_33));
        __VLS_35.slots.default;
        (item.valueName);
        var __VLS_35;
    }
    __VLS_31.slots['' /* empty slot name completion */];
}
var __VLS_31;
const __VLS_36 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    label: "属性值操作",
    align: "center",
    width: "120px",
}));
const __VLS_38 = __VLS_37({
    label: "属性值操作",
    align: "center",
    width: "120px",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_39.slots;
    const [{ row, $index }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_40 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        ...{ 'onClick': {} },
        type: "primary",
        icon: "Edit",
        ...{ style: {} },
    }));
    const __VLS_42 = __VLS_41({
        ...{ 'onClick': {} },
        type: "primary",
        icon: "Edit",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    let __VLS_44;
    let __VLS_45;
    let __VLS_46;
    const __VLS_47 = {
        onClick: (...[$event]) => {
            __VLS_ctx.updataAttr(row);
        }
    };
    var __VLS_43;
    const __VLS_48 = {}.ElPopconfirm;
    /** @type {[typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, ]} */ ;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        ...{ 'onConfirm': {} },
        title: (`你确定删除${row.attrName}吗?`),
        width: "200px",
    }));
    const __VLS_50 = __VLS_49({
        ...{ 'onConfirm': {} },
        title: (`你确定删除${row.attrName}吗?`),
        width: "200px",
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    let __VLS_52;
    let __VLS_53;
    let __VLS_54;
    const __VLS_55 = {
        onConfirm: (...[$event]) => {
            __VLS_ctx.deleteAttr(row.id);
        }
    };
    __VLS_51.slots.default;
    {
        const { reference: __VLS_thisSlot } = __VLS_51.slots;
        const __VLS_56 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
            type: "primary",
            icon: "Delete",
            ...{ style: {} },
        }));
        const __VLS_58 = __VLS_57({
            type: "primary",
            icon: "Delete",
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_57));
    }
    var __VLS_51;
    __VLS_39.slots['' /* empty slot name completion */];
}
var __VLS_39;
var __VLS_19;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.scene === 1) }, null, null);
const __VLS_60 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
    inline: true,
}));
const __VLS_62 = __VLS_61({
    inline: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
__VLS_63.slots.default;
const __VLS_64 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    label: "属性名称",
}));
const __VLS_66 = __VLS_65({
    label: "属性名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
__VLS_67.slots.default;
const __VLS_68 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
    placeholder: "请你输入属性的名称",
    modelValue: (__VLS_ctx.attrParams.attrName),
}));
const __VLS_70 = __VLS_69({
    placeholder: "请你输入属性的名称",
    modelValue: (__VLS_ctx.attrParams.attrName),
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
var __VLS_67;
var __VLS_63;
const __VLS_72 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "Plus",
    ...{ style: {} },
    disabled: (__VLS_ctx.attrParams.attrName ? false : true),
}));
const __VLS_74 = __VLS_73({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "Plus",
    ...{ style: {} },
    disabled: (__VLS_ctx.attrParams.attrName ? false : true),
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
let __VLS_76;
let __VLS_77;
let __VLS_78;
const __VLS_79 = {
    onClick: (__VLS_ctx.addAttrValue)
};
__VLS_75.slots.default;
var __VLS_75;
const __VLS_80 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}));
const __VLS_82 = __VLS_81({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
let __VLS_84;
let __VLS_85;
let __VLS_86;
const __VLS_87 = {
    onClick: (__VLS_ctx.cancel)
};
__VLS_83.slots.default;
var __VLS_83;
const __VLS_88 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
    data: (__VLS_ctx.attrParams.attrValueList),
    border: true,
    ...{ style: {} },
}));
const __VLS_90 = __VLS_89({
    data: (__VLS_ctx.attrParams.attrValueList),
    border: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_89));
__VLS_91.slots.default;
const __VLS_92 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
    label: "序号",
    width: "80px",
    type: "index",
    align: "center",
}));
const __VLS_94 = __VLS_93({
    label: "序号",
    width: "80px",
    type: "index",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_93));
const __VLS_96 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({
    label: "属性值名称",
    align: "center",
}));
const __VLS_98 = __VLS_97({
    label: "属性值名称",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_97));
__VLS_99.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_99.slots;
    const [{ row, $index }] = __VLS_getSlotParams(__VLS_thisSlot);
    if (row.flag) {
        const __VLS_100 = {}.ElInput;
        /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
        // @ts-ignore
        const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
            ...{ 'onBlur': {} },
            ref: ((vc) => __VLS_ctx.inputArr[$index] = vc),
            placeholder: "请你输入属性值名称",
            modelValue: (row.valueName),
        }));
        const __VLS_102 = __VLS_101({
            ...{ 'onBlur': {} },
            ref: ((vc) => __VLS_ctx.inputArr[$index] = vc),
            placeholder: "请你输入属性值名称",
            modelValue: (row.valueName),
        }, ...__VLS_functionalComponentArgsRest(__VLS_101));
        let __VLS_104;
        let __VLS_105;
        let __VLS_106;
        const __VLS_107 = {
            onBlur: (...[$event]) => {
                if (!(row.flag))
                    return;
                __VLS_ctx.toLook(row, $index);
            }
        };
        var __VLS_103;
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: (...[$event]) => {
                    if (!!(row.flag))
                        return;
                    __VLS_ctx.toEdit(row, $index);
                } },
        });
        (row.valueName);
    }
    __VLS_99.slots['' /* empty slot name completion */];
}
var __VLS_99;
const __VLS_108 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_109 = __VLS_asFunctionalComponent(__VLS_108, new __VLS_108({
    label: "属性值操作",
    align: "center",
}));
const __VLS_110 = __VLS_109({
    label: "属性值操作",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_109));
__VLS_111.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_111.slots;
    const [{ row, $index }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_112 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_113 = __VLS_asFunctionalComponent(__VLS_112, new __VLS_112({
        ...{ 'onClick': {} },
        type: "primary",
        icon: "Delete",
        ...{ style: {} },
    }));
    const __VLS_114 = __VLS_113({
        ...{ 'onClick': {} },
        type: "primary",
        icon: "Delete",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_113));
    let __VLS_116;
    let __VLS_117;
    let __VLS_118;
    const __VLS_119 = {
        onClick: (...[$event]) => {
            __VLS_ctx.attrParams.attrValueList.splice($index, 1);
        }
    };
    var __VLS_115;
    __VLS_111.slots['' /* empty slot name completion */];
}
var __VLS_111;
var __VLS_91;
const __VLS_120 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.attrParams.attrValueList.length > 0 ? false : true),
    type: "primary",
    ...{ style: {} },
}));
const __VLS_122 = __VLS_121({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.attrParams.attrValueList.length > 0 ? false : true),
    type: "primary",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_121));
let __VLS_124;
let __VLS_125;
let __VLS_126;
const __VLS_127 = {
    onClick: (__VLS_ctx.save)
};
__VLS_123.slots.default;
var __VLS_123;
const __VLS_128 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_129 = __VLS_asFunctionalComponent(__VLS_128, new __VLS_128({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}));
const __VLS_130 = __VLS_129({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_129));
let __VLS_132;
let __VLS_133;
let __VLS_134;
const __VLS_135 = {
    onClick: (__VLS_ctx.cancel)
};
__VLS_131.slots.default;
var __VLS_131;
var __VLS_7;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            categoryStore: categoryStore,
            AttrArr: AttrArr,
            scene: scene,
            addAttr: addAttr,
            updataAttr: updataAttr,
            cancel: cancel,
            attrParams: attrParams,
            addAttrValue: addAttrValue,
            save: save,
            toLook: toLook,
            toEdit: toEdit,
            inputArr: inputArr,
            deleteAttr: deleteAttr,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
