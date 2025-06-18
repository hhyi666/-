import { ref, onMounted, reactive } from 'vue';
//获取菜单
import { reqAddOrUpdateMenu, reqAllPermission, reqDeleteMenu } from '@/api/acl/menu';
import { ElMessage } from 'element-plus';
//存储菜单的数据
let PermissionArr = ref([]);
//控制对话框的显示和隐藏
let showDialog = ref(false);
//携带的参数
let menuData = reactive({
    code: '',
    level: 0,
    name: '',
    pid: 0,
});
const getHasPermission = async () => {
    const res = await reqAllPermission();
    if (res.code === 200) {
        PermissionArr.value = res.data;
    }
};
const addPermission = async (row) => {
    //清空数据
    Object.assign(menuData, {
        code: '',
        level: 0,
        name: '',
        pid: 0,
        id: 0,
    });
    showDialog.value = true;
    //收集新僧菜单的level
    menuData.level = row.level + 1;
    //新增的子菜单
    menuData.pid = row.pid;
};
const cancel = () => {
    showDialog.value = false;
};
const save = async () => {
    const res = await reqAddOrUpdateMenu(menuData);
    if (res.code === 200) {
        showDialog.value = false;
        ElMessage({
            type: 'success',
            message: menuData.id ? '更新成功' : '添加成功'
        });
        getHasPermission();
    }
    else {
        showDialog.value = false;
        ElMessage({
            type: 'error',
            message: menuData.id ? '更新失败' : '添加失败'
        });
    }
};
//编辑已有的菜单
const updatePermission = (row) => {
    showDialog.value = true;
    //合并操作
    Object.assign(menuData, row);
};
const removePermission = async (row) => {
    const res = await reqDeleteMenu(row.id);
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        });
        getHasPermission();
    }
    else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        });
    }
};
onMounted(() => {
    getHasPermission();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    data: (__VLS_ctx.PermissionArr),
    ...{ style: {} },
    rowKey: "id",
    border: true,
}));
const __VLS_2 = __VLS_1({
    data: (__VLS_ctx.PermissionArr),
    ...{ style: {} },
    rowKey: "id",
    border: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    prop: "name",
    label: "名称",
    align: "center",
}));
const __VLS_6 = __VLS_5({
    prop: "name",
    label: "名称",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
const __VLS_8 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    prop: "code",
    label: "权限值",
    align: "center",
}));
const __VLS_10 = __VLS_9({
    prop: "code",
    label: "权限值",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
const __VLS_12 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    prop: "updateTime",
    label: "修改时间",
    align: "center",
}));
const __VLS_14 = __VLS_13({
    prop: "updateTime",
    label: "修改时间",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
const __VLS_16 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    label: "操作",
    align: "center",
}));
const __VLS_18 = __VLS_17({
    label: "操作",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_19.slots;
    const [{ row, $index }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_20 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        ...{ 'onClick': {} },
        disabled: (row.level == 4 ? true : false),
        type: "small",
        ...{ style: {} },
    }));
    const __VLS_22 = __VLS_21({
        ...{ 'onClick': {} },
        disabled: (row.level == 4 ? true : false),
        type: "small",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    let __VLS_24;
    let __VLS_25;
    let __VLS_26;
    const __VLS_27 = {
        onClick: (...[$event]) => {
            __VLS_ctx.addPermission(row);
        }
    };
    __VLS_23.slots.default;
    (row.level == 3 ? '添加功能' : '添加菜单');
    var __VLS_23;
    const __VLS_28 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        ...{ 'onClick': {} },
        disabled: (row.level == 1 ? true : false),
        type: "small",
        ...{ style: {} },
    }));
    const __VLS_30 = __VLS_29({
        ...{ 'onClick': {} },
        disabled: (row.level == 1 ? true : false),
        type: "small",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    let __VLS_32;
    let __VLS_33;
    let __VLS_34;
    const __VLS_35 = {
        onClick: (...[$event]) => {
            __VLS_ctx.updatePermission(row);
        }
    };
    __VLS_31.slots.default;
    var __VLS_31;
    const __VLS_36 = {}.ElPopconfirm;
    /** @type {[typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        ...{ 'onConfirm': {} },
        title: (`你确定删除${row.name}吗？`),
        width: "300px",
    }));
    const __VLS_38 = __VLS_37({
        ...{ 'onConfirm': {} },
        title: (`你确定删除${row.name}吗？`),
        width: "300px",
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    let __VLS_40;
    let __VLS_41;
    let __VLS_42;
    const __VLS_43 = {
        onConfirm: (...[$event]) => {
            __VLS_ctx.removePermission(row);
        }
    };
    __VLS_39.slots.default;
    {
        const { reference: __VLS_thisSlot } = __VLS_39.slots;
        const __VLS_44 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
            type: "small",
            disabled: (row.level == 1 ? true : false),
            ...{ style: {} },
        }));
        const __VLS_46 = __VLS_45({
            type: "small",
            disabled: (row.level == 1 ? true : false),
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_45));
        __VLS_47.slots.default;
        var __VLS_47;
    }
    var __VLS_39;
    __VLS_19.slots['' /* empty slot name completion */];
}
var __VLS_19;
var __VLS_3;
const __VLS_48 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    modelValue: (__VLS_ctx.showDialog),
}));
const __VLS_50 = __VLS_49({
    modelValue: (__VLS_ctx.showDialog),
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_51.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_51.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.menuData.id ? '更新菜单' : '添加菜单');
}
{
    const { default: __VLS_thisSlot } = __VLS_51.slots;
    const __VLS_52 = {}.ElForm;
    /** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({}));
    const __VLS_54 = __VLS_53({}, ...__VLS_functionalComponentArgsRest(__VLS_53));
    __VLS_55.slots.default;
    const __VLS_56 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
        label: "名称",
    }));
    const __VLS_58 = __VLS_57({
        label: "名称",
    }, ...__VLS_functionalComponentArgsRest(__VLS_57));
    __VLS_59.slots.default;
    const __VLS_60 = {}.ElInput;
    /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
        modelValue: (__VLS_ctx.menuData.name),
        ...{ style: {} },
        placeholder: "请输入菜单的名称",
    }));
    const __VLS_62 = __VLS_61({
        modelValue: (__VLS_ctx.menuData.name),
        ...{ style: {} },
        placeholder: "请输入菜单的名称",
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    var __VLS_59;
    const __VLS_64 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
        label: "权限",
    }));
    const __VLS_66 = __VLS_65({
        label: "权限",
    }, ...__VLS_functionalComponentArgsRest(__VLS_65));
    __VLS_67.slots.default;
    const __VLS_68 = {}.ElInput;
    /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
    // @ts-ignore
    const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
        modelValue: (__VLS_ctx.menuData.code),
        ...{ style: {} },
        placeholder: "请你输入相应的权限值",
    }));
    const __VLS_70 = __VLS_69({
        modelValue: (__VLS_ctx.menuData.code),
        ...{ style: {} },
        placeholder: "请你输入相应的权限值",
    }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    var __VLS_67;
    var __VLS_55;
}
{
    const { footer: __VLS_thisSlot } = __VLS_51.slots;
    const __VLS_72 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
        ...{ 'onClick': {} },
    }));
    const __VLS_74 = __VLS_73({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_73));
    let __VLS_76;
    let __VLS_77;
    let __VLS_78;
    const __VLS_79 = {
        onClick: (__VLS_ctx.cancel)
    };
    __VLS_75.slots.default;
    var __VLS_75;
    const __VLS_80 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
        ...{ 'onClick': {} },
    }));
    const __VLS_82 = __VLS_81({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_81));
    let __VLS_84;
    let __VLS_85;
    let __VLS_86;
    const __VLS_87 = {
        onClick: (__VLS_ctx.save)
    };
    __VLS_83.slots.default;
    var __VLS_83;
}
var __VLS_51;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            PermissionArr: PermissionArr,
            showDialog: showDialog,
            menuData: menuData,
            addPermission: addPermission,
            cancel: cancel,
            save: save,
            updatePermission: updatePermission,
            removePermission: removePermission,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
