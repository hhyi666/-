import { onMounted, reactive, ref, nextTick } from 'vue';
import { reqHasTrademark, reqAddOrUpdateTradeMark, reqDeleteTrademark } from '@/api/product/trademark';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/modules/user';
let userStore = useUserStore();
//分页器当前的页码
let pageNow = ref(1);
//每页展示多少数据
let limit = ref(3);
//存储已有品牌的数据总数
let total = ref(0);
//存储
let trademarkArr = ref([]);
//控制对话框的显示和隐藏
let dialogTableVisible = ref(false);
//定义新增品牌的数据
let trademarkParams = reactive({
    tmName: '',
    logoUrl: ''
});
//获取el-form的组件实例 点击确定之前还不存在form这个东西 是undefined
let formRef = ref();
const validatorTmName = (rule, value, callback) => {
    //子自定义校验规则
    if (value.trim().length >= 2) { //校验通过
        callback();
    }
    else { //校验失败的信息
        callback(new Error('品牌名称大小大于等于两位'));
    }
};
const validatorLogoUrl = (rule, value, callback) => {
    if (value) {
        callback();
    }
    else {
        callback(new Error('Logo的图片务必上传'));
    }
};
//表单检验的规则对象
const rules = {
    tmName: [
        //设置校验 
        { required: true, trigger: 'blur', validator: validatorTmName }
    ],
    logoUrl: [
        { required: true, validator: validatorLogoUrl }
    ]
};
//获取已有品牌的接口 获取数据调用接口就行 
const getTrademark = async () => {
    const res = await reqHasTrademark(pageNow.value, limit.value);
    if (res.code === 200) {
        //品牌的总个数
        total.value = res.data.total;
        trademarkArr.value = res.data.records;
    }
};
//组件挂载完毕
onMounted(() => {
    getTrademark();
});
//分页器发生变化的时候会触发
//页码发生变化的时候 触发事件会回传数据(当前的页码)
const changePageNow = () => {
    getTrademark(); //拿到对应的数据
};
//下拉菜单发生变化的时候 触发函数
const sizeChange = () => {
    //每页的数据量发生变化的时候直接返回到1
    getTrademark();
};
const addTrademark = () => {
    dialogTableVisible.value = true;
    //清空收集的数据
    trademarkParams.tmName = '';
    trademarkParams.logoUrl = '';
    trademarkParams.id = 0;
    //这个函数能够拿到对应的变化的组件的实例
    nextTick(() => {
        formRef.value.clearValidate('tmName');
        formRef.value.clearValidate('logoUrl');
    });
};
//拿到当前已经有的品牌
const updataTrademark = (row) => {
    dialogTableVisible.value = true;
    Object.assign(trademarkParams, row);
    //拿到id（已有的品牌具有id）
    //展示已有的品牌的数据 拿到row的数据
    //将错误的信息清除
    nextTick(() => {
        formRef.value.clearValidate('tmName');
        formRef.value.clearValidate('logoUrl');
    });
};
const cancel = () => {
    dialogTableVisible.value = false;
};
//确定添加品牌
const confirm = async () => {
    //发送请求之前对表单进行检验
    //调用方法之前进行表单的验证 进行飙到的检验
    await formRef.value.validate();
    //参数的收集
    //修改已有的品牌的id
    const res = await reqAddOrUpdateTradeMark(trademarkParams);
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
        });
        //再次发送请求获已有的全部的品牌的数组
        dialogTableVisible.value = false;
        getTrademark();
        //收集的数据清空 不能重复展示
    }
    else {
        ElMessage({
            type: 'error',
            message: trademarkParams.id ? '修改失败' : '添加失败',
        });
        dialogTableVisible.value = false;
    }
};
//图片上传之前的触发的钩子 上传成功之前触发 可以约束文件的类型和大小
const beforeAvatarUpload = (rawFile) => {
    //上传的文件的类型 是png|gif|jpg
    if (rawFile.type === 'image/png' || rawFile.type === 'image/jpg' || rawFile.type === 'image/gif') {
        if (rawFile.size / 1024 / 1024 < 4) {
            return true;
        }
        else {
            ElMessage({
                type: 'error',
                message: '上传的文件的类型小于4M'
            });
            return false;
        }
    }
    else {
        ElMessage({
            type: 'error',
            message: '上传的文件的类型务必是jpg|png|gif'
        });
        return false;
    }
};
//图片上传成功的钩子
const handleAvatarSuccess = (response, //这次上传图片的post的路径
uploadFile) => {
    trademarkParams.logoUrl = response.data;
    //图片上传成功之后清除对应的提示信息
    formRef.value.clearValidate('logoUrl');
};
const removeTrademark = async (id) => {
    //删除已有的品牌类型
    let res = await reqDeleteTrademark(id);
    if (res.code === 200) {
        //删除成功的提示信息
        ElMessage({
            type: 'success',
            message: '删除成功'
        });
        //再次进行品牌的获取
        getTrademark();
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
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "box-card" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "box-card" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
    icon: "Plus",
}));
const __VLS_6 = __VLS_5({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
    icon: "Plus",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
let __VLS_8;
let __VLS_9;
let __VLS_10;
const __VLS_11 = {
    onClick: (__VLS_ctx.addTrademark)
};
__VLS_asFunctionalDirective(__VLS_directives.vHas)(null, { ...__VLS_directiveBindingRestFields, value: (`btn.Trademark.add`) }, null, null);
__VLS_7.slots.default;
var __VLS_7;
const __VLS_12 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    ...{ style: {} },
    border: true,
    data: (__VLS_ctx.trademarkArr),
}));
const __VLS_14 = __VLS_13({
    ...{ style: {} },
    border: true,
    data: (__VLS_ctx.trademarkArr),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
const __VLS_16 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    label: "序号",
    width: "80px",
    align: "center",
    type: "index",
}));
const __VLS_18 = __VLS_17({
    label: "序号",
    width: "80px",
    align: "center",
    type: "index",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const __VLS_20 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    label: "品牌名称",
    align: "center",
    prop: "tmName",
}));
const __VLS_22 = __VLS_21({
    label: "品牌名称",
    align: "center",
    prop: "tmName",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_24 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    label: "品牌Logo",
    align: "center",
}));
const __VLS_26 = __VLS_25({
    label: "品牌Logo",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_27.slots;
    const [{ row, $index }] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
        src: (row.logoUrl),
        alt: "图片失效",
        ...{ style: {} },
    });
    __VLS_27.slots['' /* empty slot name completion */];
}
var __VLS_27;
const __VLS_28 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    label: "品牌操作",
    align: "center",
}));
const __VLS_30 = __VLS_29({
    label: "品牌操作",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_31.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_31.slots;
    const [{ row, $index }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_32 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        ...{ 'onClick': {} },
        type: "primary",
        size: "large",
        icon: "Edit",
        ...{ style: {} },
    }));
    const __VLS_34 = __VLS_33({
        ...{ 'onClick': {} },
        type: "primary",
        size: "large",
        icon: "Edit",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    let __VLS_36;
    let __VLS_37;
    let __VLS_38;
    const __VLS_39 = {
        onClick: (...[$event]) => {
            __VLS_ctx.updataTrademark(row);
        }
    };
    var __VLS_35;
    const __VLS_40 = {}.ElPopconfirm;
    /** @type {[typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        ...{ 'onConfirm': {} },
        title: (`确定删除${row.tmName}吗`),
        width: "200px",
        icon: "Delete",
    }));
    const __VLS_42 = __VLS_41({
        ...{ 'onConfirm': {} },
        title: (`确定删除${row.tmName}吗`),
        width: "200px",
        icon: "Delete",
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    let __VLS_44;
    let __VLS_45;
    let __VLS_46;
    const __VLS_47 = {
        onConfirm: (...[$event]) => {
            __VLS_ctx.removeTrademark(row.id);
        }
    };
    __VLS_43.slots.default;
    {
        const { reference: __VLS_thisSlot } = __VLS_43.slots;
        const __VLS_48 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
            type: "primary",
            size: "large",
            icon: "Delete",
            ...{ style: {} },
        }));
        const __VLS_50 = __VLS_49({
            type: "primary",
            size: "large",
            icon: "Delete",
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    }
    var __VLS_43;
    __VLS_31.slots['' /* empty slot name completion */];
}
var __VLS_31;
var __VLS_15;
const __VLS_52 = {}.ElPagination;
/** @type {[typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    ...{ 'onSizeChange': {} },
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.pageNow),
    pageSize: (__VLS_ctx.limit),
    pageSizes: ([3, 5, 7, 9]),
    background: (true),
    layout: " prev, pager, next, jumper, -> ,sizes ,total",
    total: (__VLS_ctx.total),
}));
const __VLS_54 = __VLS_53({
    ...{ 'onSizeChange': {} },
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.pageNow),
    pageSize: (__VLS_ctx.limit),
    pageSizes: ([3, 5, 7, 9]),
    background: (true),
    layout: " prev, pager, next, jumper, -> ,sizes ,total",
    total: (__VLS_ctx.total),
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
let __VLS_56;
let __VLS_57;
let __VLS_58;
const __VLS_59 = {
    onSizeChange: (__VLS_ctx.sizeChange)
};
const __VLS_60 = {
    onCurrentChange: (__VLS_ctx.changePageNow)
};
var __VLS_55;
var __VLS_3;
const __VLS_61 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
    modelValue: (__VLS_ctx.dialogTableVisible),
    title: (__VLS_ctx.trademarkParams.id ? '修改品牌' : '添加品牌'),
    width: "800",
}));
const __VLS_63 = __VLS_62({
    modelValue: (__VLS_ctx.dialogTableVisible),
    title: (__VLS_ctx.trademarkParams.id ? '修改品牌' : '添加品牌'),
    width: "800",
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
__VLS_64.slots.default;
const __VLS_65 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
    ...{ style: {} },
    model: (__VLS_ctx.trademarkParams),
    rules: (__VLS_ctx.rules),
    ref: "formRef",
}));
const __VLS_67 = __VLS_66({
    ...{ style: {} },
    model: (__VLS_ctx.trademarkParams),
    rules: (__VLS_ctx.rules),
    ref: "formRef",
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
/** @type {typeof __VLS_ctx.formRef} */ ;
var __VLS_69 = {};
__VLS_68.slots.default;
const __VLS_71 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({
    label: "品牌名称",
    labelWidth: "100px",
    prop: "tmName",
}));
const __VLS_73 = __VLS_72({
    label: "品牌名称",
    labelWidth: "100px",
    prop: "tmName",
}, ...__VLS_functionalComponentArgsRest(__VLS_72));
__VLS_74.slots.default;
const __VLS_75 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({
    modelValue: (__VLS_ctx.trademarkParams.tmName),
    placeholder: "请输入品牌的名称",
}));
const __VLS_77 = __VLS_76({
    modelValue: (__VLS_ctx.trademarkParams.tmName),
    placeholder: "请输入品牌的名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
var __VLS_74;
const __VLS_79 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({
    label: "品牌Logo",
    labelWidth: "100px",
    prop: "logoUrl",
}));
const __VLS_81 = __VLS_80({
    label: "品牌Logo",
    labelWidth: "100px",
    prop: "logoUrl",
}, ...__VLS_functionalComponentArgsRest(__VLS_80));
__VLS_82.slots.default;
const __VLS_83 = {}.ElUpload;
/** @type {[typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, ]} */ ;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83({
    ...{ class: "avatar-uploader" },
    action: "/api/admin/product/fileUpload",
    showFileList: (false),
    beforeUpload: (__VLS_ctx.beforeAvatarUpload),
    onSuccess: (__VLS_ctx.handleAvatarSuccess),
}));
const __VLS_85 = __VLS_84({
    ...{ class: "avatar-uploader" },
    action: "/api/admin/product/fileUpload",
    showFileList: (false),
    beforeUpload: (__VLS_ctx.beforeAvatarUpload),
    onSuccess: (__VLS_ctx.handleAvatarSuccess),
}, ...__VLS_functionalComponentArgsRest(__VLS_84));
__VLS_86.slots.default;
if (__VLS_ctx.trademarkParams.logoUrl) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (__VLS_ctx.trademarkParams.logoUrl),
        ...{ class: "avatar" },
    });
}
else {
    const __VLS_87 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    const __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87({
        ...{ class: "avatar-uploader-icon" },
    }));
    const __VLS_89 = __VLS_88({
        ...{ class: "avatar-uploader-icon" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_88));
    __VLS_90.slots.default;
    const __VLS_91 = {}.Plus;
    /** @type {[typeof __VLS_components.Plus, ]} */ ;
    // @ts-ignore
    const __VLS_92 = __VLS_asFunctionalComponent(__VLS_91, new __VLS_91({}));
    const __VLS_93 = __VLS_92({}, ...__VLS_functionalComponentArgsRest(__VLS_92));
    var __VLS_90;
}
var __VLS_86;
var __VLS_82;
var __VLS_68;
{
    const { footer: __VLS_thisSlot } = __VLS_64.slots;
    const __VLS_95 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_96 = __VLS_asFunctionalComponent(__VLS_95, new __VLS_95({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ style: {} },
    }));
    const __VLS_97 = __VLS_96({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_96));
    let __VLS_99;
    let __VLS_100;
    let __VLS_101;
    const __VLS_102 = {
        onClick: (__VLS_ctx.cancel)
    };
    __VLS_98.slots.default;
    var __VLS_98;
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
        onClick: (__VLS_ctx.confirm)
    };
    __VLS_106.slots.default;
    var __VLS_106;
}
var __VLS_64;
/** @type {__VLS_StyleScopedClasses['box-card']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar-uploader']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar-uploader-icon']} */ ;
// @ts-ignore
var __VLS_70 = __VLS_69;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            pageNow: pageNow,
            limit: limit,
            total: total,
            trademarkArr: trademarkArr,
            dialogTableVisible: dialogTableVisible,
            trademarkParams: trademarkParams,
            formRef: formRef,
            rules: rules,
            changePageNow: changePageNow,
            sizeChange: sizeChange,
            addTrademark: addTrademark,
            updataTrademark: updataTrademark,
            cancel: cancel,
            confirm: confirm,
            beforeAvatarUpload: beforeAvatarUpload,
            handleAvatarSuccess: handleAvatarSuccess,
            removeTrademark: removeTrademark,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
