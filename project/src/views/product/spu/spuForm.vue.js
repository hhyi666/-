import { reqAddOrUpdateSpu, reqAllTrademark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSaleAttr } from '@/api/product/spu';
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
let $emit = defineEmits(['changeScene']);
//点击取消按钮 通知父组件切换组件 
const cancel = () => {
    $emit('changeScene', { flag: 0, params: 'update' });
};
//存储spu的数据
const AllTrademark = ref([]);
const ImgList = ref([]);
const SaleAttr = ref([]);
const AllSaleAttr = ref([]);
//控制对话框的显示和隐藏
let dialogVisible = ref(false);
//存储预览图片的地址
let dialogImageUrl = ref();
//定义数组存储已有的spu字段 原来都是空
let SpuParams = ref({
    category3Id: '',
    description: '',
    spuName: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: [],
});
//将来收集还未选择的销售属性的id和名字
let saleAttrIdAndValueName = ref('');
const initHasSpuData = async (spu) => {
    //存储已有的spu对象 数据的收集
    SpuParams.value = spu;
    //spu是父组件传递的spu对象 但是不完整
    //获取全部的品牌数据
    const res = await reqAllTrademark();
    //获取图片
    const res1 = await reqSpuImageList(spu.id);
    //获取已有的销售属性
    const res2 = await reqSpuHasSaleAttr(spu.id);
    //获取整项目的全部的Spu销售属性
    const res3 = await reqAllSaleAttr();
    //存储全部的品牌的数据
    AllTrademark.value = res.data;
    ImgList.value = res1.data.map(item => {
        return {
            name: item.imgName,
            url: item.imgUrl
        };
    });
    SaleAttr.value = res2.data;
    AllSaleAttr.value = res3.data;
};
//照片墙预览的时候触发的钩子
const handlePictureCardPreview = (file) => {
    //file预览图片的地址
    dialogImageUrl.value = file.url;
    dialogVisible.value = true;
};
//照片墙删除的钩子
const handleRemove = () => {
};
//照片约束文件的类型和大小
const handlerUpload = (file) => {
    if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif') {
        if (file.size / 1024 / 1024 < 3) {
            return true;
        }
        else {
            ElMessage({
                type: 'error',
                message: '上传图片过大'
            });
            return false;
        }
    }
    else {
        ElMessage({
            type: 'error',
            message: '上传的文件的类型错误'
        });
        return false;
    }
};
//计算当前spu没有的销售属性
let unSelectSaleAttr = computed(() => {
    //全部的销售属性
    //贾汪已经有的销售属性过滤出来 将已经存在进行过滤
    return AllSaleAttr.value.filter(item => {
        return SaleAttr.value.every(item1 => {
            return item.name !== item1.saleAttrName;
        });
    });
});
//添加销售属性的方法
const addSaleAttr = () => {
    //将还没有选择的筛选出来
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':');
    //准备新的销售对象
    let newSaleAttr = {
        baseSaleAttrId, saleAttrName, spuSaleAttrValueList: []
    };
    //添加到服务器当中 把新增的加进去
    SaleAttr.value.push(newSaleAttr);
    //清空收集的数据 使用v-model收集的
    saleAttrIdAndValueName.value = '';
};
//属性值按钮的点击事件
const toEdit = (row) => {
    //出现input组件
    row.flag = true;
    //收集销售属性值
    row.saleAttrValue = '';
};
const toLook = (row) => {
    //收集到属性的ID和属性值的名字
    const { baseSaleAttrId, saleAttrValue } = row;
    //整理成服务器需要的属性值形式
    let newSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: saleAttrValue,
    };
    if (saleAttrValue.trim() === '') {
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        });
        return;
    }
    //不需要空出自己判断 还没进去呢
    let repeat = row.spuSaleAttrValueList.find(item => {
        return item.saleAttrValueName === saleAttrValue;
    });
    if (repeat) {
        ElMessage({
            type: 'error',
            message: '属性值重复'
        });
        return;
    }
    //追加新的属性值对象
    row.spuSaleAttrValueList.push(newSaleAttrValue);
    //切换成查看模式 button按钮出来
    row.flag = false;
};
//收集的数据进行整理发送请求
const save = async () => {
    //整理数据
    //1.照片墙
    SpuParams.value.spuImageList = ImgList.value.map((item) => {
        return {
            imgName: item.name,
            imgUrl: (item.response && item.response.data) || (item.url)
        };
    });
    //2.整理销售属性的数据
    SpuParams.value.spuSaleAttrList = SaleAttr.value;
    //发送请求添加新的spu或者进行spu的更改
    const res = await reqAddOrUpdateSpu(SpuParams.value);
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: SpuParams.value.id ? '更新成功' : '添加成功'
        });
        //通知父组件切换成0
        $emit('changeScene', { flag: 0, params: SpuParams.value.id ? 'update' : 'add' });
    }
    else {
        ElMessage({
            type: 'error',
            message: SpuParams.value.id ? '更新失败' : '添加失败'
        });
    }
};
//添加新的SPU 初始化请求的方法
const initAddSpu = async (C3Id) => {
    //清空数据 原来的数据
    Object.assign(SpuParams.value, {
        category3Id: '',
        description: '',
        spuName: '',
        tmId: '',
        spuImageList: [],
        spuSaleAttrList: [],
    });
    ImgList.value = [];
    SaleAttr.value = [];
    saleAttrIdAndValueName.value = '';
    //获取全部的品牌的数组
    let res1 = await reqAllTrademark();
    let res2 = await reqAllSaleAttr();
    //存储数据
    AllTrademark.value = res1.data;
    AllSaleAttr.value = res2.data;
    SpuParams.value.category3Id = C3Id;
};
const __VLS_exposed = { initHasSpuData, initAddSpu };
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
    labelWidth: "100px",
}));
const __VLS_2 = __VLS_1({
    labelWidth: "100px",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    label: "spu名称",
}));
const __VLS_7 = __VLS_6({
    label: "spu名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    modelValue: (__VLS_ctx.SpuParams.spuName),
    placeholder: "请你输入spu的名称",
    ...{ style: {} },
}));
const __VLS_11 = __VLS_10({
    modelValue: (__VLS_ctx.SpuParams.spuName),
    placeholder: "请你输入spu的名称",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
var __VLS_8;
const __VLS_13 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    label: "spu品牌",
}));
const __VLS_15 = __VLS_14({
    label: "spu品牌",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
const __VLS_17 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    ...{ style: {} },
    modelValue: (__VLS_ctx.SpuParams.tmId),
}));
const __VLS_19 = __VLS_18({
    ...{ style: {} },
    modelValue: (__VLS_ctx.SpuParams.tmId),
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
__VLS_20.slots.default;
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.AllTrademark))) {
    const __VLS_21 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        key: (item.id),
        label: (item.tmName),
        value: (item.id),
    }));
    const __VLS_23 = __VLS_22({
        key: (item.id),
        label: (item.tmName),
        value: (item.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
}
var __VLS_20;
var __VLS_16;
const __VLS_25 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    label: "spu描述",
}));
const __VLS_27 = __VLS_26({
    label: "spu描述",
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
__VLS_28.slots.default;
const __VLS_29 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    type: "textarea",
    placeholder: "请你输入spu的描述",
    modelValue: (__VLS_ctx.SpuParams.description),
}));
const __VLS_31 = __VLS_30({
    type: "textarea",
    placeholder: "请你输入spu的描述",
    modelValue: (__VLS_ctx.SpuParams.description),
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
var __VLS_28;
const __VLS_33 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    label: "spu照片",
}));
const __VLS_35 = __VLS_34({
    label: "spu照片",
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
__VLS_36.slots.default;
const __VLS_37 = {}.ElUpload;
/** @type {[typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, ]} */ ;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
    fileList: (__VLS_ctx.ImgList),
    action: "/api/admin/product/fileUpload",
    listType: "picture-card",
    onPreview: (__VLS_ctx.handlePictureCardPreview),
    onRemove: (__VLS_ctx.handleRemove),
    beforeUpload: (__VLS_ctx.handlerUpload),
}));
const __VLS_39 = __VLS_38({
    fileList: (__VLS_ctx.ImgList),
    action: "/api/admin/product/fileUpload",
    listType: "picture-card",
    onPreview: (__VLS_ctx.handlePictureCardPreview),
    onRemove: (__VLS_ctx.handleRemove),
    beforeUpload: (__VLS_ctx.handlerUpload),
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
__VLS_40.slots.default;
const __VLS_41 = {}.ElIcon;
/** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({}));
const __VLS_43 = __VLS_42({}, ...__VLS_functionalComponentArgsRest(__VLS_42));
__VLS_44.slots.default;
const __VLS_45 = {}.Plus;
/** @type {[typeof __VLS_components.Plus, ]} */ ;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({}));
const __VLS_47 = __VLS_46({}, ...__VLS_functionalComponentArgsRest(__VLS_46));
var __VLS_44;
var __VLS_40;
const __VLS_49 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    visible: (__VLS_ctx.dialogVisible),
}));
const __VLS_51 = __VLS_50({
    visible: (__VLS_ctx.dialogVisible),
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
__VLS_52.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
    width: "100%",
    src: (__VLS_ctx.dialogImageUrl),
    alt: "",
});
var __VLS_52;
var __VLS_36;
const __VLS_53 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
    label: "spu销售属性",
}));
const __VLS_55 = __VLS_54({
    label: "spu销售属性",
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
__VLS_56.slots.default;
const __VLS_57 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
    modelValue: (__VLS_ctx.saleAttrIdAndValueName),
    ...{ style: {} },
    placeholder: (__VLS_ctx.unSelectSaleAttr.length ? `还没有选择的有${__VLS_ctx.unSelectSaleAttr.length}个` : `没有未选择的值`),
}));
const __VLS_59 = __VLS_58({
    modelValue: (__VLS_ctx.saleAttrIdAndValueName),
    ...{ style: {} },
    placeholder: (__VLS_ctx.unSelectSaleAttr.length ? `还没有选择的有${__VLS_ctx.unSelectSaleAttr.length}个` : `没有未选择的值`),
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
__VLS_60.slots.default;
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.unSelectSaleAttr))) {
    const __VLS_61 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
        value: (`${item.id}:${item.name}`),
        key: (item.id),
        label: (item.name),
    }));
    const __VLS_63 = __VLS_62({
        value: (`${item.id}:${item.name}`),
        key: (item.id),
        label: (item.name),
    }, ...__VLS_functionalComponentArgsRest(__VLS_62));
}
var __VLS_60;
const __VLS_65 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "Plus",
    disabled: (__VLS_ctx.saleAttrIdAndValueName ? false : true),
    ...{ style: {} },
}));
const __VLS_67 = __VLS_66({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "Plus",
    disabled: (__VLS_ctx.saleAttrIdAndValueName ? false : true),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
let __VLS_69;
let __VLS_70;
let __VLS_71;
const __VLS_72 = {
    onClick: (__VLS_ctx.addSaleAttr)
};
__VLS_68.slots.default;
var __VLS_68;
const __VLS_73 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
    border: true,
    ...{ style: {} },
    data: (__VLS_ctx.SaleAttr),
}));
const __VLS_75 = __VLS_74({
    border: true,
    ...{ style: {} },
    data: (__VLS_ctx.SaleAttr),
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
__VLS_76.slots.default;
const __VLS_77 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({
    width: "80px",
    label: "序号",
    type: "index",
    align: "center",
}));
const __VLS_79 = __VLS_78({
    width: "80px",
    label: "序号",
    type: "index",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_78));
const __VLS_81 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
    label: "销售属性名字",
    width: "200px",
    prop: "saleAttrName",
}));
const __VLS_83 = __VLS_82({
    label: "销售属性名字",
    width: "200px",
    prop: "saleAttrName",
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
const __VLS_85 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({
    label: "销售属性值",
}));
const __VLS_87 = __VLS_86({
    label: "销售属性值",
}, ...__VLS_functionalComponentArgsRest(__VLS_86));
__VLS_88.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_88.slots;
    const [{ row, $index }] = __VLS_getSlotParams(__VLS_thisSlot);
    for (const [item, index] of __VLS_getVForSourceType((row.spuSaleAttrValueList))) {
        const __VLS_89 = {}.ElTag;
        /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
        // @ts-ignore
        const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({
            ...{ 'onClose': {} },
            ...{ style: {} },
            key: (item.id),
            ...{ class: "mx-1" },
            closable: true,
        }));
        const __VLS_91 = __VLS_90({
            ...{ 'onClose': {} },
            ...{ style: {} },
            key: (item.id),
            ...{ class: "mx-1" },
            closable: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_90));
        let __VLS_93;
        let __VLS_94;
        let __VLS_95;
        const __VLS_96 = {
            onClose: (...[$event]) => {
                row.spuSaleAttrValueList.splice(index, 1);
            }
        };
        __VLS_92.slots.default;
        (item.saleAttrValueName);
        var __VLS_92;
    }
    if (row.flag) {
        const __VLS_97 = {}.ElInput;
        /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
        // @ts-ignore
        const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({
            ...{ 'onBlur': {} },
            modelValue: (row.saleAttrValue),
            placeholder: "请你输入属性值",
            ...{ style: {} },
        }));
        const __VLS_99 = __VLS_98({
            ...{ 'onBlur': {} },
            modelValue: (row.saleAttrValue),
            placeholder: "请你输入属性值",
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_98));
        let __VLS_101;
        let __VLS_102;
        let __VLS_103;
        const __VLS_104 = {
            onBlur: (...[$event]) => {
                if (!(row.flag))
                    return;
                __VLS_ctx.toLook(row);
            }
        };
        var __VLS_100;
    }
    else {
        const __VLS_105 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
            ...{ 'onClick': {} },
            type: "primary",
            icon: "Plus",
        }));
        const __VLS_107 = __VLS_106({
            ...{ 'onClick': {} },
            type: "primary",
            icon: "Plus",
        }, ...__VLS_functionalComponentArgsRest(__VLS_106));
        let __VLS_109;
        let __VLS_110;
        let __VLS_111;
        const __VLS_112 = {
            onClick: (...[$event]) => {
                if (!!(row.flag))
                    return;
                __VLS_ctx.toEdit(row);
            }
        };
        var __VLS_108;
    }
    __VLS_88.slots['' /* empty slot name completion */];
}
var __VLS_88;
const __VLS_113 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({
    label: "操作",
    width: "200px",
}));
const __VLS_115 = __VLS_114({
    label: "操作",
    width: "200px",
}, ...__VLS_functionalComponentArgsRest(__VLS_114));
__VLS_116.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_116.slots;
    const [{ row, $index }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_117 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_118 = __VLS_asFunctionalComponent(__VLS_117, new __VLS_117({
        ...{ 'onClick': {} },
        type: "primary",
        icon: "Delete",
    }));
    const __VLS_119 = __VLS_118({
        ...{ 'onClick': {} },
        type: "primary",
        icon: "Delete",
    }, ...__VLS_functionalComponentArgsRest(__VLS_118));
    let __VLS_121;
    let __VLS_122;
    let __VLS_123;
    const __VLS_124 = {
        onClick: (...[$event]) => {
            __VLS_ctx.SaleAttr.splice($index, 1);
        }
    };
    var __VLS_120;
    __VLS_116.slots['' /* empty slot name completion */];
}
var __VLS_116;
var __VLS_76;
var __VLS_56;
const __VLS_125 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_126 = __VLS_asFunctionalComponent(__VLS_125, new __VLS_125({}));
const __VLS_127 = __VLS_126({}, ...__VLS_functionalComponentArgsRest(__VLS_126));
__VLS_128.slots.default;
const __VLS_129 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_130 = __VLS_asFunctionalComponent(__VLS_129, new __VLS_129({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.SaleAttr.length > 0),
    type: "primary",
    ...{ style: {} },
}));
const __VLS_131 = __VLS_130({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.SaleAttr.length > 0),
    type: "primary",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_130));
let __VLS_133;
let __VLS_134;
let __VLS_135;
const __VLS_136 = {
    onClick: (__VLS_ctx.save)
};
__VLS_132.slots.default;
var __VLS_132;
const __VLS_137 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_138 = __VLS_asFunctionalComponent(__VLS_137, new __VLS_137({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}));
const __VLS_139 = __VLS_138({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_138));
let __VLS_141;
let __VLS_142;
let __VLS_143;
const __VLS_144 = {
    onClick: (__VLS_ctx.cancel)
};
__VLS_140.slots.default;
var __VLS_140;
var __VLS_128;
const __VLS_145 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_146 = __VLS_asFunctionalComponent(__VLS_145, new __VLS_145({}));
const __VLS_147 = __VLS_146({}, ...__VLS_functionalComponentArgsRest(__VLS_146));
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['mx-1']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            cancel: cancel,
            AllTrademark: AllTrademark,
            ImgList: ImgList,
            SaleAttr: SaleAttr,
            dialogVisible: dialogVisible,
            dialogImageUrl: dialogImageUrl,
            SpuParams: SpuParams,
            saleAttrIdAndValueName: saleAttrIdAndValueName,
            handlePictureCardPreview: handlePictureCardPreview,
            handleRemove: handleRemove,
            handlerUpload: handlerUpload,
            unSelectSaleAttr: unSelectSaleAttr,
            addSaleAttr: addSaleAttr,
            toEdit: toEdit,
            toLook: toLook,
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
