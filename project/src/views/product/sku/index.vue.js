import { reqRemoveSku, reqSkuInfo, reqCancelSaleSku, reqSaleSku, reqSkuList } from '@/api/product/sku';
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue';
let pageNo = ref(1);
let pageSize = ref(10);
let total = ref(0);
let skuArr = ref([]);
let drawer = ref(false);
let skuInfo = ref({});
const getHasSku = async (pager = 1) => {
    //当前的页码 默认事第一页
    pageNo.value = pager;
    const res = await reqSkuList(pageNo.value, pageSize.value);
    if (res.code === 200) {
        total.value = res.data.total;
        skuArr.value = res.data.records;
    }
};
onMounted(() => {
    getHasSku();
});
//因为上面已经双向绑定了 监听改变 所以不需要再单独的进行数值的更改 直接发送请求就行
const handler = () => {
    getHasSku();
};
const updateSale = async (row) => {
    if (row.isSale) {
        await reqCancelSaleSku(row.id);
        ElMessage({
            type: 'success',
            message: '下架成功'
        });
        getHasSku(pageNo.value);
    }
    else {
        await reqSaleSku(row.id);
        ElMessage({
            type: 'success',
            message: '上架成功'
        });
        getHasSku(pageNo.value);
    }
};
const updateSku = () => {
    ElMessage({
        type: 'success',
        message: '正在开发中~~~'
    });
};
const findSpu = async (row) => {
    drawer.value = true;
    const res = await reqSkuInfo(row.id);
    if (res.code === 200) {
        skuInfo.value = res.data;
        console.log(skuInfo.value);
    }
};
const deleteSku = async (row) => {
    const res = await reqRemoveSku(row.id);
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        });
        //获取删除之后的数据  选择选中的数据
        getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
    }
    else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        });
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['el-carousel__item']} */ ;
/** @type {__VLS_StyleScopedClasses['el-carousel__item']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    border: true,
    ...{ style: {} },
    data: (__VLS_ctx.skuArr),
}));
const __VLS_7 = __VLS_6({
    border: true,
    ...{ style: {} },
    data: (__VLS_ctx.skuArr),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    label: "序号",
    type: "index",
    align: "center",
    width: "80px",
}));
const __VLS_11 = __VLS_10({
    label: "序号",
    type: "index",
    align: "center",
    width: "80px",
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
const __VLS_13 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    label: "名称",
    align: "center",
    showOverflowTooltip: true,
    width: "175px",
    prop: "skuName",
}));
const __VLS_15 = __VLS_14({
    label: "名称",
    align: "center",
    showOverflowTooltip: true,
    width: "175px",
    prop: "skuName",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
const __VLS_17 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    label: "描述",
    align: "center",
    showOverflowTooltip: true,
    width: "175px",
    prop: "skuDesc",
}));
const __VLS_19 = __VLS_18({
    label: "描述",
    align: "center",
    showOverflowTooltip: true,
    width: "175px",
    prop: "skuDesc",
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
const __VLS_21 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    label: "默认图片",
    align: "center",
    width: "175px",
}));
const __VLS_23 = __VLS_22({
    label: "默认图片",
    align: "center",
    width: "175px",
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
__VLS_24.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_24.slots;
    const [{ row, $index }] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
        src: (row.skuDefaultImg),
        ...{ style: {} },
        alt: "加载失败",
    });
    __VLS_24.slots['' /* empty slot name completion */];
}
var __VLS_24;
const __VLS_25 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    label: "重量(g)",
    align: "center",
    width: "175px",
    prop: "weight",
}));
const __VLS_27 = __VLS_26({
    label: "重量(g)",
    align: "center",
    width: "175px",
    prop: "weight",
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
const __VLS_29 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    label: "价格(￥)",
    align: "center",
    width: "175px",
    prop: "price",
}));
const __VLS_31 = __VLS_30({
    label: "价格(￥)",
    align: "center",
    width: "175px",
    prop: "price",
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
const __VLS_33 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    label: "操作",
    align: "center",
    width: "300px",
    fixed: "right",
}));
const __VLS_35 = __VLS_34({
    label: "操作",
    align: "center",
    width: "300px",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
__VLS_36.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_36.slots;
    const [{ row, $index }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_37 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
        ...{ 'onClick': {} },
        icon: (row.isSale ? 'Bottom' : 'Top'),
        type: "primary",
        ...{ style: {} },
    }));
    const __VLS_39 = __VLS_38({
        ...{ 'onClick': {} },
        icon: (row.isSale ? 'Bottom' : 'Top'),
        type: "primary",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    let __VLS_41;
    let __VLS_42;
    let __VLS_43;
    const __VLS_44 = {
        onClick: (...[$event]) => {
            __VLS_ctx.updateSale(row);
        }
    };
    var __VLS_40;
    const __VLS_45 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
        ...{ 'onClick': {} },
        icon: "Edit",
        type: "primary",
        ...{ style: {} },
    }));
    const __VLS_47 = __VLS_46({
        ...{ 'onClick': {} },
        icon: "Edit",
        type: "primary",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    let __VLS_49;
    let __VLS_50;
    let __VLS_51;
    const __VLS_52 = {
        onClick: (__VLS_ctx.updateSku)
    };
    var __VLS_48;
    const __VLS_53 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
        ...{ 'onClick': {} },
        icon: "InfoFilled",
        type: "primary",
        ...{ style: {} },
    }));
    const __VLS_55 = __VLS_54({
        ...{ 'onClick': {} },
        icon: "InfoFilled",
        type: "primary",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_54));
    let __VLS_57;
    let __VLS_58;
    let __VLS_59;
    const __VLS_60 = {
        onClick: (...[$event]) => {
            __VLS_ctx.findSpu(row);
        }
    };
    var __VLS_56;
    const __VLS_61 = {}.ElPopconfirm;
    /** @type {[typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, ]} */ ;
    // @ts-ignore
    const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
        ...{ 'onConfirm': {} },
        title: (`你确定删除${row.skuName}吗？`),
    }));
    const __VLS_63 = __VLS_62({
        ...{ 'onConfirm': {} },
        title: (`你确定删除${row.skuName}吗？`),
    }, ...__VLS_functionalComponentArgsRest(__VLS_62));
    let __VLS_65;
    let __VLS_66;
    let __VLS_67;
    const __VLS_68 = {
        onConfirm: (...[$event]) => {
            __VLS_ctx.deleteSku(row);
        }
    };
    __VLS_64.slots.default;
    {
        const { reference: __VLS_thisSlot } = __VLS_64.slots;
        const __VLS_69 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({
            icon: "Delete",
            type: "primary",
            ...{ style: {} },
        }));
        const __VLS_71 = __VLS_70({
            icon: "Delete",
            type: "primary",
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_70));
    }
    var __VLS_64;
    __VLS_36.slots['' /* empty slot name completion */];
}
var __VLS_36;
var __VLS_8;
const __VLS_73 = {}.ElPagination;
/** @type {[typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, ]} */ ;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
    ...{ 'onSizeChange': {} },
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.pageNo),
    pageSizes: ([10, 20, 30, 40]),
    pageSize: (__VLS_ctx.pageSize),
    layout: "prev, pager, next, jumper,->,sizes,total",
    total: (__VLS_ctx.total),
    background: true,
}));
const __VLS_75 = __VLS_74({
    ...{ 'onSizeChange': {} },
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.pageNo),
    pageSizes: ([10, 20, 30, 40]),
    pageSize: (__VLS_ctx.pageSize),
    layout: "prev, pager, next, jumper,->,sizes,total",
    total: (__VLS_ctx.total),
    background: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
let __VLS_77;
let __VLS_78;
let __VLS_79;
const __VLS_80 = {
    onSizeChange: (__VLS_ctx.handler)
};
const __VLS_81 = {
    onCurrentChange: (__VLS_ctx.getHasSku)
};
var __VLS_76;
const __VLS_82 = {}.ElDrawer;
/** @type {[typeof __VLS_components.ElDrawer, typeof __VLS_components.elDrawer, typeof __VLS_components.ElDrawer, typeof __VLS_components.elDrawer, ]} */ ;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({
    modelValue: (__VLS_ctx.drawer),
}));
const __VLS_84 = __VLS_83({
    modelValue: (__VLS_ctx.drawer),
}, ...__VLS_functionalComponentArgsRest(__VLS_83));
__VLS_85.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_85.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
}
{
    const { default: __VLS_thisSlot } = __VLS_85.slots;
    const __VLS_86 = {}.ElRow;
    /** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
    // @ts-ignore
    const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({
        ...{ style: {} },
    }));
    const __VLS_88 = __VLS_87({
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_87));
    __VLS_89.slots.default;
    const __VLS_90 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({
        span: (6),
    }));
    const __VLS_92 = __VLS_91({
        span: (6),
    }, ...__VLS_functionalComponentArgsRest(__VLS_91));
    __VLS_93.slots.default;
    var __VLS_93;
    const __VLS_94 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({
        span: (18),
    }));
    const __VLS_96 = __VLS_95({
        span: (18),
    }, ...__VLS_functionalComponentArgsRest(__VLS_95));
    __VLS_97.slots.default;
    (__VLS_ctx.skuInfo.skuName);
    var __VLS_97;
    var __VLS_89;
    const __VLS_98 = {}.ElRow;
    /** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
    // @ts-ignore
    const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({
        ...{ style: {} },
    }));
    const __VLS_100 = __VLS_99({
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_99));
    __VLS_101.slots.default;
    const __VLS_102 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({
        span: (6),
    }));
    const __VLS_104 = __VLS_103({
        span: (6),
    }, ...__VLS_functionalComponentArgsRest(__VLS_103));
    __VLS_105.slots.default;
    var __VLS_105;
    const __VLS_106 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({
        span: (18),
    }));
    const __VLS_108 = __VLS_107({
        span: (18),
    }, ...__VLS_functionalComponentArgsRest(__VLS_107));
    __VLS_109.slots.default;
    (__VLS_ctx.skuInfo.skuDesc);
    var __VLS_109;
    var __VLS_101;
    const __VLS_110 = {}.ElRow;
    /** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
    // @ts-ignore
    const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({
        ...{ style: {} },
    }));
    const __VLS_112 = __VLS_111({
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_111));
    __VLS_113.slots.default;
    const __VLS_114 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({
        span: (6),
    }));
    const __VLS_116 = __VLS_115({
        span: (6),
    }, ...__VLS_functionalComponentArgsRest(__VLS_115));
    __VLS_117.slots.default;
    var __VLS_117;
    const __VLS_118 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_119 = __VLS_asFunctionalComponent(__VLS_118, new __VLS_118({
        span: (18),
    }));
    const __VLS_120 = __VLS_119({
        span: (18),
    }, ...__VLS_functionalComponentArgsRest(__VLS_119));
    __VLS_121.slots.default;
    (__VLS_ctx.skuInfo.price);
    var __VLS_121;
    var __VLS_113;
    const __VLS_122 = {}.ElRow;
    /** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
    // @ts-ignore
    const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({
        ...{ style: {} },
    }));
    const __VLS_124 = __VLS_123({
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_123));
    __VLS_125.slots.default;
    const __VLS_126 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({
        span: (6),
    }));
    const __VLS_128 = __VLS_127({
        span: (6),
    }, ...__VLS_functionalComponentArgsRest(__VLS_127));
    __VLS_129.slots.default;
    var __VLS_129;
    const __VLS_130 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({
        span: (18),
    }));
    const __VLS_132 = __VLS_131({
        span: (18),
    }, ...__VLS_functionalComponentArgsRest(__VLS_131));
    __VLS_133.slots.default;
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.skuInfo.skuAttrValueList))) {
        const __VLS_134 = {}.ElTag;
        /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
        // @ts-ignore
        const __VLS_135 = __VLS_asFunctionalComponent(__VLS_134, new __VLS_134({
            key: (item.id),
            ...{ style: {} },
        }));
        const __VLS_136 = __VLS_135({
            key: (item.id),
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_135));
        __VLS_137.slots.default;
        (item.valueName);
        var __VLS_137;
    }
    var __VLS_133;
    var __VLS_125;
    const __VLS_138 = {}.ElRow;
    /** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
    // @ts-ignore
    const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({
        ...{ style: {} },
    }));
    const __VLS_140 = __VLS_139({
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_139));
    __VLS_141.slots.default;
    const __VLS_142 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_143 = __VLS_asFunctionalComponent(__VLS_142, new __VLS_142({
        span: (6),
    }));
    const __VLS_144 = __VLS_143({
        span: (6),
    }, ...__VLS_functionalComponentArgsRest(__VLS_143));
    __VLS_145.slots.default;
    var __VLS_145;
    const __VLS_146 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({
        span: (18),
    }));
    const __VLS_148 = __VLS_147({
        span: (18),
    }, ...__VLS_functionalComponentArgsRest(__VLS_147));
    __VLS_149.slots.default;
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.skuInfo.skuSaleAttrValueList))) {
        const __VLS_150 = {}.ElTag;
        /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
        // @ts-ignore
        const __VLS_151 = __VLS_asFunctionalComponent(__VLS_150, new __VLS_150({
            type: "danger",
            key: (item.id),
            ...{ style: {} },
        }));
        const __VLS_152 = __VLS_151({
            type: "danger",
            key: (item.id),
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_151));
        __VLS_153.slots.default;
        (item.saleAttrValueName);
        var __VLS_153;
    }
    var __VLS_149;
    var __VLS_141;
    const __VLS_154 = {}.ElRow;
    /** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
    // @ts-ignore
    const __VLS_155 = __VLS_asFunctionalComponent(__VLS_154, new __VLS_154({
        ...{ style: {} },
    }));
    const __VLS_156 = __VLS_155({
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_155));
    __VLS_157.slots.default;
    const __VLS_158 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_159 = __VLS_asFunctionalComponent(__VLS_158, new __VLS_158({
        span: (6),
    }));
    const __VLS_160 = __VLS_159({
        span: (6),
    }, ...__VLS_functionalComponentArgsRest(__VLS_159));
    __VLS_161.slots.default;
    var __VLS_161;
    const __VLS_162 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_163 = __VLS_asFunctionalComponent(__VLS_162, new __VLS_162({
        span: (18),
    }));
    const __VLS_164 = __VLS_163({
        span: (18),
    }, ...__VLS_functionalComponentArgsRest(__VLS_163));
    __VLS_165.slots.default;
    const __VLS_166 = {}.ElCarousel;
    /** @type {[typeof __VLS_components.ElCarousel, typeof __VLS_components.elCarousel, typeof __VLS_components.ElCarousel, typeof __VLS_components.elCarousel, ]} */ ;
    // @ts-ignore
    const __VLS_167 = __VLS_asFunctionalComponent(__VLS_166, new __VLS_166({
        interval: (4000),
        type: "card",
        height: "200px",
    }));
    const __VLS_168 = __VLS_167({
        interval: (4000),
        type: "card",
        height: "200px",
    }, ...__VLS_functionalComponentArgsRest(__VLS_167));
    __VLS_169.slots.default;
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.skuInfo.skuImageList))) {
        const __VLS_170 = {}.ElCarouselItem;
        /** @type {[typeof __VLS_components.ElCarouselItem, typeof __VLS_components.elCarouselItem, typeof __VLS_components.ElCarouselItem, typeof __VLS_components.elCarouselItem, ]} */ ;
        // @ts-ignore
        const __VLS_171 = __VLS_asFunctionalComponent(__VLS_170, new __VLS_170({
            key: (item.id),
        }));
        const __VLS_172 = __VLS_171({
            key: (item.id),
        }, ...__VLS_functionalComponentArgsRest(__VLS_171));
        __VLS_173.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
            src: (item.imgUrl),
            alt: "",
        });
        var __VLS_173;
    }
    var __VLS_169;
    var __VLS_165;
    var __VLS_157;
}
var __VLS_85;
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            pageNo: pageNo,
            pageSize: pageSize,
            total: total,
            skuArr: skuArr,
            drawer: drawer,
            skuInfo: skuInfo,
            getHasSku: getHasSku,
            handler: handler,
            updateSale: updateSale,
            updateSku: updateSku,
            findSpu: findSpu,
            deleteSku: deleteSku,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
