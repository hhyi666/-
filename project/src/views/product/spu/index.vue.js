import { ref, watch, onBeforeUnmount } from 'vue';
import useCategoryStore from '@/store/modules/category';
import { reqHasSpu, reqSkuList } from '@/api/product/spu/index';
import spuForm from './spuForm.vue';
import skuForm from './skuForm.vue';
import { reqRemoveSpu } from '@/api/product/spu/index';
import { ElMessage } from 'element-plus';
const categoryStore = useCategoryStore();
let scene = ref(0); //场景0 显示已有的spu结构 
//分页器默认的页码
let pageNo = ref(1);
//每页展示几条数据
let pageSize = ref(3);
//存储SPU的数据
let records = ref([]);
let total = ref(0);
//获取子组件实例 SpuForm
let SpuForm = ref();
let SkuForm = ref();
let SkuArr = ref([]);
let show = ref(false);
watch(() => categoryStore.C3Id, () => {
    //保证三级分类ID有了发送请求
    if (!categoryStore.C3Id)
        return;
    getHasSpu();
});
// 此方法执行可以获取某个三级分类下的全部的SPU
const getHasSpu = async (pager = 1) => {
    pageNo.value = pager;
    const res = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.C3Id);
    if (res.code === 200) {
        records.value = res.data.records;
        total.value = res.data.total;
    }
};
//分页器下拉菜单发生变化的时候触发
const changeSize = () => {
    getHasSpu();
};
//添加场景的变化
const addSpu = () => {
    scene.value = 1;
    SpuForm.value.initAddSpu(categoryStore.C3Id); //调用子组件的方法 
};
//子组件绑定的自定义 子组件通知父组件切换场景是0
const changeScene = (obj) => {
    scene.value = obj.flag;
    //区分更新和添加
    if (obj.params === 'update') {
        getHasSpu(pageNo.value);
    }
    else {
        getHasSpu();
    }
    //再次获取全部的数据
};
const updateSpu = (row) => {
    scene.value = 1; //是因为上面使用的是v-show才能拿到对应的实例 如果使用的是v-if就需要使用nextTick才能那带
    // console.log(SpuForm.value) //拿到子组件的实例  直接调用儿子的方法 不需要使用组件通信来传递信息
    SpuForm.value.initHasSpuData(row);
};
const addSku = (row) => {
    //点击添加sku按钮切换成按钮2
    scene.value = 2;
    //还要发送请拿到数据
    SkuForm.value.initSkuData(categoryStore.C1Id, categoryStore.C2Id, row);
};
const showSku = async (row) => {
    const res = await reqSkuList(row.id);
    if (res.code === 200) {
        SkuArr.value = res.data;
        show.value = true;
    }
};
const deleteSpu = async (row) => {
    const res = await reqRemoveSpu(row.id);
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        });
        await getHasSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1);
    }
    else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        });
    }
};
// 对应的数据进行清空
onBeforeUnmount(() => {
    //清空仓库中的数据
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
    onClick: (__VLS_ctx.addSpu)
};
__VLS_11.slots.default;
var __VLS_11;
const __VLS_16 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ style: {} },
    border: true,
    data: (__VLS_ctx.records),
}));
const __VLS_18 = __VLS_17({
    ...{ style: {} },
    border: true,
    data: (__VLS_ctx.records),
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    label: "序号",
    align: "center",
    width: "80px",
    type: "index",
}));
const __VLS_22 = __VLS_21({
    label: "序号",
    align: "center",
    width: "80px",
    type: "index",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_24 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    label: "SPU名称",
    prop: "spuName",
}));
const __VLS_26 = __VLS_25({
    label: "SPU名称",
    prop: "spuName",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const __VLS_28 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    label: "SPU描述",
    prop: "description",
    showOverflowTooltip: true,
}));
const __VLS_30 = __VLS_29({
    label: "SPU描述",
    prop: "description",
    showOverflowTooltip: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
const __VLS_32 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    label: "操作",
}));
const __VLS_34 = __VLS_33({
    label: "操作",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_35.slots;
    const [{ row, $index }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_36 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        ...{ 'onClick': {} },
        type: "primary",
        icon: "Plus",
        title: "添加SKU",
        ...{ style: {} },
    }));
    const __VLS_38 = __VLS_37({
        ...{ 'onClick': {} },
        type: "primary",
        icon: "Plus",
        title: "添加SKU",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    let __VLS_40;
    let __VLS_41;
    let __VLS_42;
    const __VLS_43 = {
        onClick: (...[$event]) => {
            __VLS_ctx.addSku(row);
        }
    };
    var __VLS_39;
    const __VLS_44 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
        ...{ 'onClick': {} },
        type: "primary",
        icon: "Edit",
        title: "修改SKU",
        ...{ style: {} },
    }));
    const __VLS_46 = __VLS_45({
        ...{ 'onClick': {} },
        type: "primary",
        icon: "Edit",
        title: "修改SKU",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    let __VLS_48;
    let __VLS_49;
    let __VLS_50;
    const __VLS_51 = {
        onClick: (...[$event]) => {
            __VLS_ctx.updateSpu(row);
        }
    };
    var __VLS_47;
    const __VLS_52 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        ...{ 'onClick': {} },
        type: "primary",
        icon: "Search",
        title: "查看SKU",
        ...{ style: {} },
    }));
    const __VLS_54 = __VLS_53({
        ...{ 'onClick': {} },
        type: "primary",
        icon: "Search",
        title: "查看SKU",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    let __VLS_56;
    let __VLS_57;
    let __VLS_58;
    const __VLS_59 = {
        onClick: (...[$event]) => {
            __VLS_ctx.showSku(row);
        }
    };
    var __VLS_55;
    const __VLS_60 = {}.ElPopconfirm;
    /** @type {[typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
        ...{ 'onConfirm': {} },
        title: (`确定删除${row.spuName}吗？`),
    }));
    const __VLS_62 = __VLS_61({
        ...{ 'onConfirm': {} },
        title: (`确定删除${row.spuName}吗？`),
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    let __VLS_64;
    let __VLS_65;
    let __VLS_66;
    const __VLS_67 = {
        onConfirm: (...[$event]) => {
            __VLS_ctx.deleteSpu(row);
        }
    };
    __VLS_63.slots.default;
    {
        const { reference: __VLS_thisSlot } = __VLS_63.slots;
        const __VLS_68 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
            type: "primary",
            title: "删除SKU",
            ...{ style: {} },
            icon: "Delete",
        }));
        const __VLS_70 = __VLS_69({
            type: "primary",
            title: "删除SKU",
            ...{ style: {} },
            icon: "Delete",
        }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    }
    var __VLS_63;
    __VLS_35.slots['' /* empty slot name completion */];
}
var __VLS_35;
var __VLS_19;
const __VLS_72 = {}.ElPagination;
/** @type {[typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    ...{ 'onCurrentChange': {} },
    ...{ 'onSizeChange': {} },
    currentPage: (__VLS_ctx.pageNo),
    pageSizes: ([3, 5, 7, 9]),
    pageSize: (__VLS_ctx.pageSize),
    layout: "prev, pager, next, jumper,->,sizes,total",
    total: (__VLS_ctx.total),
    background: (true),
}));
const __VLS_74 = __VLS_73({
    ...{ 'onCurrentChange': {} },
    ...{ 'onSizeChange': {} },
    currentPage: (__VLS_ctx.pageNo),
    pageSizes: ([3, 5, 7, 9]),
    pageSize: (__VLS_ctx.pageSize),
    layout: "prev, pager, next, jumper,->,sizes,total",
    total: (__VLS_ctx.total),
    background: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
let __VLS_76;
let __VLS_77;
let __VLS_78;
const __VLS_79 = {
    onCurrentChange: (__VLS_ctx.getHasSpu)
};
const __VLS_80 = {
    onSizeChange: (__VLS_ctx.changeSize)
};
__VLS_75.slots.default;
var __VLS_75;
/** @type {[typeof spuForm, typeof spuForm, ]} */ ;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent(spuForm, new spuForm({
    ...{ 'onChangeScene': {} },
    ref: "SpuForm",
}));
const __VLS_82 = __VLS_81({
    ...{ 'onChangeScene': {} },
    ref: "SpuForm",
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
let __VLS_84;
let __VLS_85;
let __VLS_86;
const __VLS_87 = {
    onChangeScene: (__VLS_ctx.changeScene)
};
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.scene === 1) }, null, null);
/** @type {typeof __VLS_ctx.SpuForm} */ ;
var __VLS_88 = {};
var __VLS_83;
/** @type {[typeof skuForm, typeof skuForm, ]} */ ;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent(skuForm, new skuForm({
    ...{ 'onChangeScene': {} },
    ref: "SkuForm",
}));
const __VLS_91 = __VLS_90({
    ...{ 'onChangeScene': {} },
    ref: "SkuForm",
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
let __VLS_93;
let __VLS_94;
let __VLS_95;
const __VLS_96 = {
    onChangeScene: (__VLS_ctx.changeScene)
};
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.scene === 2) }, null, null);
/** @type {typeof __VLS_ctx.SkuForm} */ ;
var __VLS_97 = {};
var __VLS_92;
const __VLS_99 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_100 = __VLS_asFunctionalComponent(__VLS_99, new __VLS_99({
    title: "SKU列表",
    modelValue: (__VLS_ctx.show),
}));
const __VLS_101 = __VLS_100({
    title: "SKU列表",
    modelValue: (__VLS_ctx.show),
}, ...__VLS_functionalComponentArgsRest(__VLS_100));
__VLS_102.slots.default;
const __VLS_103 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_104 = __VLS_asFunctionalComponent(__VLS_103, new __VLS_103({
    border: true,
    data: (__VLS_ctx.SkuArr),
}));
const __VLS_105 = __VLS_104({
    border: true,
    data: (__VLS_ctx.SkuArr),
}, ...__VLS_functionalComponentArgsRest(__VLS_104));
__VLS_106.slots.default;
const __VLS_107 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_108 = __VLS_asFunctionalComponent(__VLS_107, new __VLS_107({
    label: "sku名字",
    prop: "skuName",
}));
const __VLS_109 = __VLS_108({
    label: "sku名字",
    prop: "skuName",
}, ...__VLS_functionalComponentArgsRest(__VLS_108));
const __VLS_111 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_112 = __VLS_asFunctionalComponent(__VLS_111, new __VLS_111({
    label: "sku价格",
    prop: "price",
}));
const __VLS_113 = __VLS_112({
    label: "sku价格",
    prop: "price",
}, ...__VLS_functionalComponentArgsRest(__VLS_112));
const __VLS_115 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_116 = __VLS_asFunctionalComponent(__VLS_115, new __VLS_115({
    label: "sku重量",
    prop: "weight",
}));
const __VLS_117 = __VLS_116({
    label: "sku重量",
    prop: "weight",
}, ...__VLS_functionalComponentArgsRest(__VLS_116));
const __VLS_119 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_120 = __VLS_asFunctionalComponent(__VLS_119, new __VLS_119({
    label: "sku图片",
}));
const __VLS_121 = __VLS_120({
    label: "sku图片",
}, ...__VLS_functionalComponentArgsRest(__VLS_120));
__VLS_122.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_122.slots;
    const [{ row, $index }] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
        src: (row.skuDefaultImg),
        ...{ style: {} },
        alt: "",
    });
    __VLS_122.slots['' /* empty slot name completion */];
}
var __VLS_122;
var __VLS_106;
var __VLS_102;
var __VLS_7;
// @ts-ignore
var __VLS_89 = __VLS_88, __VLS_98 = __VLS_97;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            spuForm: spuForm,
            skuForm: skuForm,
            categoryStore: categoryStore,
            scene: scene,
            pageNo: pageNo,
            pageSize: pageSize,
            records: records,
            total: total,
            SpuForm: SpuForm,
            SkuForm: SkuForm,
            SkuArr: SkuArr,
            show: show,
            getHasSpu: getHasSpu,
            changeSize: changeSize,
            addSpu: addSpu,
            changeScene: changeScene,
            updateSpu: updateSpu,
            addSku: addSku,
            showSku: showSku,
            deleteSpu: deleteSpu,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
