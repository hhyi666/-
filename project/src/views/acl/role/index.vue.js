import { nextTick, onMounted, reactive, ref } from 'vue';
import { reqAddOrUpdateRole, reqAllMenuList, reqAllRoleList, reqRemoveRole, reqSetPermission } from '@/api/acl/role';
import { useLayoutSettingStore } from '@/store/modules/setting';
import { ElMessage } from 'element-plus';
const settingStore = useLayoutSettingStore();
let pageNo = ref(1);
let pageSize = ref(10);
//搜索的关键字
let keyword = ref('');
let total = ref(0);
let allRole = ref([]);
let dialogShow = ref(false);
let RoleParams = reactive({
    roleName: '',
});
let formRef = ref();
let drawer = ref(false);
let MenuArr = ref([]);
// 储存true的按钮
let selectedArr = ref([]);
//获取tree的组件实例
const tree = ref();
const getHasRole = async (pager = 1) => {
    pageNo.value = pager;
    const res = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value);
    if (res.code === 200) {
        total.value = res.data.total;
        allRole.value = res.data.records;
    }
};
const handler = () => {
    getHasRole();
};
onMounted(() => {
    getHasRole();
});
const search = () => {
    //发送搜索请求
    getHasRole();
    keyword.value = '';
};
//重置操作 就是销毁重建的操作
const reset = () => {
    settingStore.refsh = !settingStore.refsh;
};
const addRole = () => {
    RoleParams.roleName = '';
    RoleParams.id = 0; //记得清除id
    dialogShow.value = true;
    nextTick(() => {
        formRef.value.clearValidate();
    });
};
const updateRole = (row) => {
    Object.assign(RoleParams, row);
    dialogShow.value = true;
    nextTick(() => {
        formRef.value.validate();
    });
};
const cancel = () => {
    dialogShow.value = false;
};
const validateRoleName = (rule, value, callback) => {
    if (value.trim().length >= 2) {
        callback();
    }
    else {
        callback(new Error('职位名称长度至少两位'));
    }
};
const rules = {
    roleName: [{ required: true, trigger: 'blur', validator: validateRoleName }]
};
const save = async () => {
    //进行表单的校验
    await formRef.value.validate();
    const res = await reqAddOrUpdateRole(RoleParams);
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: RoleParams.id ? '更新成功' : '添加成功'
        });
        dialogShow.value = false;
        getHasRole(RoleParams.id ? pageNo.value : 1); //设置返回的位置
    }
    else {
        ElMessage({
            type: 'error',
            message: '添加失败'
        });
        dialogShow.value = false;
    }
};
const assgin = async (row) => {
    drawer.value = true;
    Object.assign(RoleParams, row);
    const res = await reqAllMenuList(RoleParams.id);
    if (res.code === 200) {
        //数据的展示
        MenuArr.value = res.data;
        selectedArr = filterArr(MenuArr.value, []);
    }
};
//属性控件测试的东西
const defaultProps = {
    children: 'children',
    label: 'name',
};
// 选项勾选的判断
// 看select的bool类型
// 只需要过滤最后一级的东西 因为上一级勾选了 那么全部的都会进行勾选
// 拿到对应的数据 准备一个数组 存储勾选的id
const filterArr = (allData, initArr) => {
    //进行递归的判断数组
    allData.forEach((item) => {
        if (item.select && item.level === 4) {
            initArr.push(item.id);
        }
        if (item.children && item.children.length > 0) {
            filterArr(item.children, initArr);
            //递归的找到对用的选中的id
        }
    });
    return initArr;
};
const submit = async () => {
    //职位的id
    const roleId = RoleParams.id;
    //选中节点的id
    const arr = tree.value.getCheckedKeys(); //勾中的id
    //半选的id
    const arr1 = tree.value.getHalfCheckedKeys();
    const permissionId = arr.concat(arr1);
    const res = await reqSetPermission(roleId, permissionId);
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '分配权限成功'
        });
        //管理自己的东西的时候要刷新
        window.location.reload();
    }
    else {
        ElMessage({
            type: 'error',
            message: '分配权限失败'
        });
    }
};
const removeRole = async (id) => {
    const res = await reqRemoveRole(id);
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        });
        getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1);
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
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ class: "form" },
    inline: true,
}));
const __VLS_6 = __VLS_5({
    ...{ class: "form" },
    inline: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
const __VLS_8 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    label: "角色名称",
}));
const __VLS_10 = __VLS_9({
    label: "角色名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
const __VLS_12 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    modelValue: (__VLS_ctx.keyword),
    placeholder: "请输入角色名称",
    ...{ style: {} },
}));
const __VLS_14 = __VLS_13({
    modelValue: (__VLS_ctx.keyword),
    placeholder: "请输入角色名称",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
var __VLS_11;
const __VLS_16 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({}));
const __VLS_18 = __VLS_17({}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.keyword ? false : true),
    type: "primary",
    ...{ style: {} },
}));
const __VLS_22 = __VLS_21({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.keyword ? false : true),
    type: "primary",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
let __VLS_24;
let __VLS_25;
let __VLS_26;
const __VLS_27 = {
    onClick: (__VLS_ctx.search)
};
__VLS_23.slots.default;
var __VLS_23;
const __VLS_28 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}));
const __VLS_30 = __VLS_29({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
let __VLS_32;
let __VLS_33;
let __VLS_34;
const __VLS_35 = {
    onClick: (__VLS_ctx.reset)
};
__VLS_31.slots.default;
var __VLS_31;
var __VLS_19;
var __VLS_7;
var __VLS_3;
const __VLS_36 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    ...{ style: {} },
}));
const __VLS_38 = __VLS_37({
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
const __VLS_40 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    ...{ 'onClick': {} },
    icon: "Plus",
    ...{ style: {} },
}));
const __VLS_42 = __VLS_41({
    ...{ 'onClick': {} },
    icon: "Plus",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
let __VLS_44;
let __VLS_45;
let __VLS_46;
const __VLS_47 = {
    onClick: (__VLS_ctx.addRole)
};
__VLS_43.slots.default;
var __VLS_43;
const __VLS_48 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    border: true,
    ...{ style: {} },
    data: (__VLS_ctx.allRole),
}));
const __VLS_50 = __VLS_49({
    border: true,
    ...{ style: {} },
    data: (__VLS_ctx.allRole),
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_51.slots.default;
const __VLS_52 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    label: "#",
    type: "index",
    align: "center",
}));
const __VLS_54 = __VLS_53({
    label: "#",
    type: "index",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
const __VLS_56 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    prop: "id",
    label: "id",
    align: "center",
}));
const __VLS_58 = __VLS_57({
    prop: "id",
    label: "id",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
const __VLS_60 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
    prop: "roleName",
    label: "职位名称",
    align: "center",
    showOverflowTooltip: true,
}));
const __VLS_62 = __VLS_61({
    prop: "roleName",
    label: "职位名称",
    align: "center",
    showOverflowTooltip: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
const __VLS_64 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    prop: "createTime",
    label: "创建时间",
    align: "center",
    showOverflowTooltip: true,
}));
const __VLS_66 = __VLS_65({
    prop: "createTime",
    label: "创建时间",
    align: "center",
    showOverflowTooltip: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
const __VLS_68 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
    prop: "updateTime",
    label: "更新时间",
    align: "center",
    showOverflowTooltip: true,
}));
const __VLS_70 = __VLS_69({
    prop: "updateTime",
    label: "更新时间",
    align: "center",
    showOverflowTooltip: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
const __VLS_72 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    label: "操作",
    width: "300px",
    align: "center",
}));
const __VLS_74 = __VLS_73({
    label: "操作",
    width: "300px",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
__VLS_75.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_75.slots;
    const [{ row, $index }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_76 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
        ...{ 'onClick': {} },
        icon: "User",
    }));
    const __VLS_78 = __VLS_77({
        ...{ 'onClick': {} },
        icon: "User",
    }, ...__VLS_functionalComponentArgsRest(__VLS_77));
    let __VLS_80;
    let __VLS_81;
    let __VLS_82;
    const __VLS_83 = {
        onClick: (...[$event]) => {
            __VLS_ctx.assgin(row);
        }
    };
    __VLS_79.slots.default;
    var __VLS_79;
    const __VLS_84 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
        ...{ 'onClick': {} },
        icon: "Edit",
    }));
    const __VLS_86 = __VLS_85({
        ...{ 'onClick': {} },
        icon: "Edit",
    }, ...__VLS_functionalComponentArgsRest(__VLS_85));
    let __VLS_88;
    let __VLS_89;
    let __VLS_90;
    const __VLS_91 = {
        onClick: (...[$event]) => {
            __VLS_ctx.updateRole(row);
        }
    };
    __VLS_87.slots.default;
    var __VLS_87;
    const __VLS_92 = {}.ElPopconfirm;
    /** @type {[typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, ]} */ ;
    // @ts-ignore
    const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
        ...{ 'onConfirm': {} },
        title: (`你确定删除${row.roleName}吗`),
        width: "260px",
    }));
    const __VLS_94 = __VLS_93({
        ...{ 'onConfirm': {} },
        title: (`你确定删除${row.roleName}吗`),
        width: "260px",
    }, ...__VLS_functionalComponentArgsRest(__VLS_93));
    let __VLS_96;
    let __VLS_97;
    let __VLS_98;
    const __VLS_99 = {
        onConfirm: (...[$event]) => {
            __VLS_ctx.removeRole(row.id);
        }
    };
    __VLS_95.slots.default;
    {
        const { reference: __VLS_thisSlot } = __VLS_95.slots;
        const __VLS_100 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
            icon: "Delete",
        }));
        const __VLS_102 = __VLS_101({
            icon: "Delete",
        }, ...__VLS_functionalComponentArgsRest(__VLS_101));
        __VLS_103.slots.default;
        var __VLS_103;
    }
    var __VLS_95;
    __VLS_75.slots['' /* empty slot name completion */];
}
var __VLS_75;
var __VLS_51;
const __VLS_104 = {}.ElPagination;
/** @type {[typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, ]} */ ;
// @ts-ignore
const __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({
    ...{ 'onSizeChange': {} },
    ...{ 'onCurrentPage': {} },
    currentPage: (__VLS_ctx.pageNo),
    pageSize: (__VLS_ctx.pageSize),
    pageSizes: ([10, 20, 30, 40]),
    background: true,
    layout: "prev, pager, next, jumper,->,sizes,total",
    total: (__VLS_ctx.total),
}));
const __VLS_106 = __VLS_105({
    ...{ 'onSizeChange': {} },
    ...{ 'onCurrentPage': {} },
    currentPage: (__VLS_ctx.pageNo),
    pageSize: (__VLS_ctx.pageSize),
    pageSizes: ([10, 20, 30, 40]),
    background: true,
    layout: "prev, pager, next, jumper,->,sizes,total",
    total: (__VLS_ctx.total),
}, ...__VLS_functionalComponentArgsRest(__VLS_105));
let __VLS_108;
let __VLS_109;
let __VLS_110;
const __VLS_111 = {
    onSizeChange: (__VLS_ctx.handler)
};
const __VLS_112 = {
    onCurrentPage: (__VLS_ctx.getHasRole)
};
var __VLS_107;
var __VLS_39;
const __VLS_113 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({
    modelValue: (__VLS_ctx.dialogShow),
    title: (__VLS_ctx.RoleParams.id ? '更新职位' : '添加职位'),
}));
const __VLS_115 = __VLS_114({
    modelValue: (__VLS_ctx.dialogShow),
    title: (__VLS_ctx.RoleParams.id ? '更新职位' : '添加职位'),
}, ...__VLS_functionalComponentArgsRest(__VLS_114));
__VLS_116.slots.default;
const __VLS_117 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_118 = __VLS_asFunctionalComponent(__VLS_117, new __VLS_117({
    model: (__VLS_ctx.RoleParams),
    rules: (__VLS_ctx.rules),
    ref: "formRef",
}));
const __VLS_119 = __VLS_118({
    model: (__VLS_ctx.RoleParams),
    rules: (__VLS_ctx.rules),
    ref: "formRef",
}, ...__VLS_functionalComponentArgsRest(__VLS_118));
/** @type {typeof __VLS_ctx.formRef} */ ;
var __VLS_121 = {};
__VLS_120.slots.default;
const __VLS_123 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_124 = __VLS_asFunctionalComponent(__VLS_123, new __VLS_123({
    label: "职位名称",
    prop: "roleName",
}));
const __VLS_125 = __VLS_124({
    label: "职位名称",
    prop: "roleName",
}, ...__VLS_functionalComponentArgsRest(__VLS_124));
__VLS_126.slots.default;
const __VLS_127 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_128 = __VLS_asFunctionalComponent(__VLS_127, new __VLS_127({
    modelValue: (__VLS_ctx.RoleParams.roleName),
    placeholder: "请你输入职位的名称",
}));
const __VLS_129 = __VLS_128({
    modelValue: (__VLS_ctx.RoleParams.roleName),
    placeholder: "请你输入职位的名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_128));
var __VLS_126;
var __VLS_120;
{
    const { footer: __VLS_thisSlot } = __VLS_116.slots;
    const __VLS_131 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_132 = __VLS_asFunctionalComponent(__VLS_131, new __VLS_131({
        ...{ 'onClick': {} },
        ...{ style: {} },
    }));
    const __VLS_133 = __VLS_132({
        ...{ 'onClick': {} },
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_132));
    let __VLS_135;
    let __VLS_136;
    let __VLS_137;
    const __VLS_138 = {
        onClick: (__VLS_ctx.cancel)
    };
    __VLS_134.slots.default;
    var __VLS_134;
    const __VLS_139 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_140 = __VLS_asFunctionalComponent(__VLS_139, new __VLS_139({
        ...{ 'onClick': {} },
        ...{ style: {} },
    }));
    const __VLS_141 = __VLS_140({
        ...{ 'onClick': {} },
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_140));
    let __VLS_143;
    let __VLS_144;
    let __VLS_145;
    const __VLS_146 = {
        onClick: (__VLS_ctx.save)
    };
    __VLS_142.slots.default;
    var __VLS_142;
}
var __VLS_116;
const __VLS_147 = {}.ElDrawer;
/** @type {[typeof __VLS_components.ElDrawer, typeof __VLS_components.elDrawer, typeof __VLS_components.ElDrawer, typeof __VLS_components.elDrawer, ]} */ ;
// @ts-ignore
const __VLS_148 = __VLS_asFunctionalComponent(__VLS_147, new __VLS_147({
    modelValue: (__VLS_ctx.drawer),
}));
const __VLS_149 = __VLS_148({
    modelValue: (__VLS_ctx.drawer),
}, ...__VLS_functionalComponentArgsRest(__VLS_148));
__VLS_150.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_150.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
{
    const { default: __VLS_thisSlot } = __VLS_150.slots;
    const __VLS_151 = {}.ElTree;
    /** @type {[typeof __VLS_components.ElTree, typeof __VLS_components.elTree, ]} */ ;
    // @ts-ignore
    const __VLS_152 = __VLS_asFunctionalComponent(__VLS_151, new __VLS_151({
        ...{ style: {} },
        data: (__VLS_ctx.MenuArr),
        showCheckbox: true,
        nodeKey: "id",
        defaultExpandAll: true,
        ref: "tree",
        defaultCheckedKeys: (__VLS_ctx.selectedArr),
        props: (__VLS_ctx.defaultProps),
    }));
    const __VLS_153 = __VLS_152({
        ...{ style: {} },
        data: (__VLS_ctx.MenuArr),
        showCheckbox: true,
        nodeKey: "id",
        defaultExpandAll: true,
        ref: "tree",
        defaultCheckedKeys: (__VLS_ctx.selectedArr),
        props: (__VLS_ctx.defaultProps),
    }, ...__VLS_functionalComponentArgsRest(__VLS_152));
    /** @type {typeof __VLS_ctx.tree} */ ;
    var __VLS_155 = {};
    var __VLS_154;
}
{
    const { footer: __VLS_thisSlot } = __VLS_150.slots;
    const __VLS_157 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_158 = __VLS_asFunctionalComponent(__VLS_157, new __VLS_157({
        ...{ 'onClick': {} },
        ...{ style: {} },
    }));
    const __VLS_159 = __VLS_158({
        ...{ 'onClick': {} },
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_158));
    let __VLS_161;
    let __VLS_162;
    let __VLS_163;
    const __VLS_164 = {
        onClick: (...[$event]) => {
            __VLS_ctx.drawer = false;
        }
    };
    __VLS_160.slots.default;
    var __VLS_160;
    const __VLS_165 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_166 = __VLS_asFunctionalComponent(__VLS_165, new __VLS_165({
        ...{ 'onClick': {} },
        ...{ style: {} },
    }));
    const __VLS_167 = __VLS_166({
        ...{ 'onClick': {} },
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_166));
    let __VLS_169;
    let __VLS_170;
    let __VLS_171;
    const __VLS_172 = {
        onClick: (__VLS_ctx.submit)
    };
    __VLS_168.slots.default;
    var __VLS_168;
}
var __VLS_150;
/** @type {__VLS_StyleScopedClasses['form']} */ ;
// @ts-ignore
var __VLS_122 = __VLS_121, __VLS_156 = __VLS_155;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            pageNo: pageNo,
            pageSize: pageSize,
            keyword: keyword,
            total: total,
            allRole: allRole,
            dialogShow: dialogShow,
            RoleParams: RoleParams,
            formRef: formRef,
            drawer: drawer,
            MenuArr: MenuArr,
            selectedArr: selectedArr,
            tree: tree,
            getHasRole: getHasRole,
            handler: handler,
            search: search,
            reset: reset,
            addRole: addRole,
            updateRole: updateRole,
            cancel: cancel,
            rules: rules,
            save: save,
            assgin: assgin,
            defaultProps: defaultProps,
            submit: submit,
            removeRole: removeRole,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
