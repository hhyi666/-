import { ref, onMounted, reactive, nextTick } from 'vue';
import { reqSelectUser, reqRemoveUser, reqUserInfo, reqAddOrUpdateUser, reqAllRole, reqSetUserRole } from '@/api/acl/user';
import { ElMessage } from 'element-plus';
import { useLayoutSettingStore } from '@/store/modules/setting';
const settingStore = useLayoutSettingStore();
let pageNo = ref(1);
let pageSize = ref(5);
let total = ref(0);
let userAttr = ref([]);
let drawerAdd = ref(false);
let drawerAssgin = ref(false);
// 复选框是否全选
let chenkAll = ref(false);
let isIndeterminate = ref(true);
let allRoles = ref([]);
//已有的数据
let userRoles = ref([]);
let userParams = reactive({
    username: '',
    name: '',
    password: '',
});
let selectIdArr = ref([]);
//获取form的组件实例 
//！！！！！一定注意 ： 第一次组件挂载的时候formRef是undefined
let formRef = ref();
//收集搜索的内容
let keyword = ref('');
const validatorUsername = (rule, value, callback) => {
    if (value.trim().length >= 5) {
        callback();
    }
    else {
        callback(new Error('用户的名字至少5位'));
    }
};
const validatorName = (rule, value, callback) => {
    console.log(value);
    if (value.trim().length >= 5) {
        callback();
    }
    else {
        callback(new Error('用户的昵称至少5位'));
    }
};
const validatorPassword = (rule, value, callback) => {
    console.log(value);
    if (value.trim().length >= 5) {
        callback();
    }
    else {
        callback(new Error('用户的密码至少6位'));
    }
};
//表单校验的rule
const rules = {
    username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
    name: [{ required: true, trigger: 'blur', validator: validatorName }],
    password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
};
const getHasUser = async (pager = 1) => {
    pageNo.value = pager;
    const res = await reqUserInfo(pageNo.value, pageSize.value, keyword.value);
    if (res.code === 200) {
        total.value = res.data.total;
        userAttr.value = res.data.records;
    }
};
onMounted(() => {
    getHasUser();
});
const handler = () => {
    getHasUser();
};
const addUser = () => {
    drawerAdd.value = true;
    userParams.id = 0;
    //清除上一次的错误的提示信息
    nextTick(() => {
        //惊醒错误信息的清除
        formRef.value.clearValidate();
    });
    Object.assign(userParams, {
        username: '',
        name: '',
        password: '',
    });
};
const updateUser = (row) => {
    drawerAdd.value = true;
    //存储收集的已有的账号信息 将信息传递到表单元素当中
    Object.assign(userParams, row);
    //清除报错的信息
    nextTick(() => {
        formRef.value.clearValidate('username');
        formRef.value.clearValidate('name');
    });
};
const save = async () => {
    //检查表单的校验是否通过 等到所有的检查都是通过的才能发送
    await formRef.value.validate();
    //点击保存 添加或者更新
    const res = await reqAddOrUpdateUser(userParams);
    if (res.code === 200) {
        drawerAdd.value = false;
        ElMessage({
            type: 'success',
            message: userParams.id ? '更新成功' : '添加成功'
        });
        getHasUser(userParams.id ? pageNo.value : 1);
        //浏览器自动的刷新这一次 这样就可以保证修改自己的内容可以自动的内容刷新
        //目的：当自己的用户信息进行更改了就需要进行刷新操作 自动回到登录页
        window.location.reload();
    }
    else {
        drawerAdd.value = false;
        ElMessage({
            type: 'error',
            message: userParams.id ? '更新失败' : '添加失败'
        });
    }
};
const cancel = () => {
    drawerAdd.value = false;
};
const setRole = async (row) => {
    //存储已有的用户信息
    Object.assign(userParams, row);
    //拿到对应的数据
    const res = await reqAllRole(userParams.id);
    if (res.code === 200) {
        allRoles.value = res.data.allRolesList;
        userRoles.value = res.data.assignRoles;
        drawerAssgin.value = true;
    }
};
//控制全选的状态
const handlerCheckAllChange = (val) => {
    //全选时间的触发
    userRoles.value = val ? allRoles.value : [];
    isIndeterminate.value = false;
};
//返回的是当前的数据
const handlerCheckedChange = (val) => {
    const checkLength = val.length;
    chenkAll.value = checkLength === allRoles.value.length;
    isIndeterminate.value = !(checkLength === allRoles.value.length);
};
const define = async () => {
    //收集参数
    let data = {
        userId: userParams.id,
        roleIdList: userRoles.value.map(item => item.id)
    };
    //收集之后发送请求
    const res = await reqSetUserRole(data);
    console.log(res);
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '分配成功'
        });
        drawerAssgin.value = false;
        getHasUser(pageNo.value);
    }
    else {
        ElMessage({
            type: 'error',
            message: '分配失败'
        });
    }
};
const deleteUser = async (userId) => {
    //删除用户
    const res = await reqRemoveUser(userId);
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        });
        getHasUser(userAttr.value.length > 1 ? pageNo.value : pageNo.value - 1);
    }
    else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        });
    }
};
//复选框勾选时候触发
const selectChange = (value) => {
    selectIdArr.value = value;
};
//批量删除函数
const deleteSelectUser = async () => {
    //整理参数
    let idList = selectIdArr.value.map(item => {
        return item.id;
    });
    const res = await reqSelectUser(idList);
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        });
    }
    else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        });
    }
};
const search = () => {
    //根据关键字获取数据
    getHasUser();
    //清空关键字
    keyword.value = '';
};
const reset = () => {
    //刷新的设置 实现刷新的设置
    settingStore.refsh = !settingStore.refsh;
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
    ...{ style: {} },
}));
const __VLS_2 = __VLS_1({
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    inline: (true),
    ...{ class: "form" },
}));
const __VLS_6 = __VLS_5({
    inline: (true),
    ...{ class: "form" },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
const __VLS_8 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    label: "用户名：",
}));
const __VLS_10 = __VLS_9({
    label: "用户名：",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
const __VLS_12 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    modelValue: (__VLS_ctx.keyword),
    placeholder: "请输入用户名",
    ...{ style: {} },
}));
const __VLS_14 = __VLS_13({
    modelValue: (__VLS_ctx.keyword),
    placeholder: "请输入用户名",
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
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({}));
const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
const __VLS_40 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}));
const __VLS_42 = __VLS_41({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
let __VLS_44;
let __VLS_45;
let __VLS_46;
const __VLS_47 = {
    onClick: (__VLS_ctx.addUser)
};
__VLS_43.slots.default;
var __VLS_43;
const __VLS_48 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    ...{ 'onClick': {} },
    disabled: (!__VLS_ctx.selectIdArr.length),
    type: "primary",
    ...{ style: {} },
}));
const __VLS_50 = __VLS_49({
    ...{ 'onClick': {} },
    disabled: (!__VLS_ctx.selectIdArr.length),
    type: "primary",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
let __VLS_52;
let __VLS_53;
let __VLS_54;
const __VLS_55 = {
    onClick: (__VLS_ctx.deleteSelectUser)
};
__VLS_51.slots.default;
var __VLS_51;
const __VLS_56 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    ...{ 'onSelectionChange': {} },
    ...{ style: {} },
    border: true,
    data: (__VLS_ctx.userAttr),
}));
const __VLS_58 = __VLS_57({
    ...{ 'onSelectionChange': {} },
    ...{ style: {} },
    border: true,
    data: (__VLS_ctx.userAttr),
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
let __VLS_60;
let __VLS_61;
let __VLS_62;
const __VLS_63 = {
    onSelectionChange: (__VLS_ctx.selectChange)
};
__VLS_59.slots.default;
const __VLS_64 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    type: "selection",
    align: "center",
}));
const __VLS_66 = __VLS_65({
    type: "selection",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
const __VLS_68 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
    label: "#",
    align: "center",
    type: "index",
}));
const __VLS_70 = __VLS_69({
    label: "#",
    align: "center",
    type: "index",
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
const __VLS_72 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    label: "ID",
    align: "center",
    prop: "id",
}));
const __VLS_74 = __VLS_73({
    label: "ID",
    align: "center",
    prop: "id",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
const __VLS_76 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
    label: "用户名字",
    align: "center",
    width: "100px",
    prop: "username",
    showOverflowTooltip: true,
}));
const __VLS_78 = __VLS_77({
    label: "用户名字",
    align: "center",
    width: "100px",
    prop: "username",
    showOverflowTooltip: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
const __VLS_80 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
    label: "用户名称",
    align: "center",
    width: "100px",
    prop: "name",
    showOverflowTooltip: true,
}));
const __VLS_82 = __VLS_81({
    label: "用户名称",
    align: "center",
    width: "100px",
    prop: "name",
    showOverflowTooltip: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
const __VLS_84 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
    label: "用户角色",
    align: "center",
    width: "100px",
    prop: "roleName",
    showOverflowTooltip: true,
}));
const __VLS_86 = __VLS_85({
    label: "用户角色",
    align: "center",
    width: "100px",
    prop: "roleName",
    showOverflowTooltip: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
const __VLS_88 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
    label: "创建时间",
    align: "center",
    width: "100px",
    prop: "createTime",
    showOverflowTooltip: true,
}));
const __VLS_90 = __VLS_89({
    label: "创建时间",
    align: "center",
    width: "100px",
    prop: "createTime",
    showOverflowTooltip: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_89));
const __VLS_92 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
    label: "更新时间",
    align: "center",
    width: "100px",
    prop: "updateTime",
    showOverflowTooltip: true,
}));
const __VLS_94 = __VLS_93({
    label: "更新时间",
    align: "center",
    width: "100px",
    prop: "updateTime",
    showOverflowTooltip: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_93));
const __VLS_96 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({
    label: "操作",
    width: "260px",
    align: "center",
}));
const __VLS_98 = __VLS_97({
    label: "操作",
    width: "260px",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_97));
__VLS_99.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_99.slots;
    const [{ row, $index }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_100 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
        ...{ 'onClick': {} },
        icon: "User",
    }));
    const __VLS_102 = __VLS_101({
        ...{ 'onClick': {} },
        icon: "User",
    }, ...__VLS_functionalComponentArgsRest(__VLS_101));
    let __VLS_104;
    let __VLS_105;
    let __VLS_106;
    const __VLS_107 = {
        onClick: (...[$event]) => {
            __VLS_ctx.setRole(row);
        }
    };
    __VLS_103.slots.default;
    var __VLS_103;
    const __VLS_108 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_109 = __VLS_asFunctionalComponent(__VLS_108, new __VLS_108({
        ...{ 'onClick': {} },
        icon: "Edit",
    }));
    const __VLS_110 = __VLS_109({
        ...{ 'onClick': {} },
        icon: "Edit",
    }, ...__VLS_functionalComponentArgsRest(__VLS_109));
    let __VLS_112;
    let __VLS_113;
    let __VLS_114;
    const __VLS_115 = {
        onClick: (...[$event]) => {
            __VLS_ctx.updateUser(row);
        }
    };
    __VLS_111.slots.default;
    var __VLS_111;
    const __VLS_116 = {}.ElPopconfirm;
    /** @type {[typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, typeof __VLS_components.ElPopconfirm, typeof __VLS_components.elPopconfirm, ]} */ ;
    // @ts-ignore
    const __VLS_117 = __VLS_asFunctionalComponent(__VLS_116, new __VLS_116({
        ...{ 'onConfirm': {} },
        title: (`你确定删除${row.username}吗`),
        width: "260px",
    }));
    const __VLS_118 = __VLS_117({
        ...{ 'onConfirm': {} },
        title: (`你确定删除${row.username}吗`),
        width: "260px",
    }, ...__VLS_functionalComponentArgsRest(__VLS_117));
    let __VLS_120;
    let __VLS_121;
    let __VLS_122;
    const __VLS_123 = {
        onConfirm: (...[$event]) => {
            __VLS_ctx.deleteUser(row.id);
        }
    };
    __VLS_119.slots.default;
    {
        const { reference: __VLS_thisSlot } = __VLS_119.slots;
        const __VLS_124 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_125 = __VLS_asFunctionalComponent(__VLS_124, new __VLS_124({
            icon: "Delete",
        }));
        const __VLS_126 = __VLS_125({
            icon: "Delete",
        }, ...__VLS_functionalComponentArgsRest(__VLS_125));
        __VLS_127.slots.default;
        var __VLS_127;
    }
    var __VLS_119;
    __VLS_99.slots['' /* empty slot name completion */];
}
var __VLS_99;
var __VLS_59;
const __VLS_128 = {}.ElPagination;
/** @type {[typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, ]} */ ;
// @ts-ignore
const __VLS_129 = __VLS_asFunctionalComponent(__VLS_128, new __VLS_128({
    ...{ 'onCurrentChange': {} },
    ...{ 'onSizeChange': {} },
    currentPage: (__VLS_ctx.pageNo),
    pageSizes: ([5, 7, 9, 11]),
    pageSize: (__VLS_ctx.pageSize),
    layout: "prev, pager, next, jumper,->,sizes,total",
    background: true,
    total: (__VLS_ctx.total),
}));
const __VLS_130 = __VLS_129({
    ...{ 'onCurrentChange': {} },
    ...{ 'onSizeChange': {} },
    currentPage: (__VLS_ctx.pageNo),
    pageSizes: ([5, 7, 9, 11]),
    pageSize: (__VLS_ctx.pageSize),
    layout: "prev, pager, next, jumper,->,sizes,total",
    background: true,
    total: (__VLS_ctx.total),
}, ...__VLS_functionalComponentArgsRest(__VLS_129));
let __VLS_132;
let __VLS_133;
let __VLS_134;
const __VLS_135 = {
    onCurrentChange: (__VLS_ctx.getHasUser)
};
const __VLS_136 = {
    onSizeChange: (__VLS_ctx.handler)
};
var __VLS_131;
var __VLS_39;
const __VLS_137 = {}.ElDrawer;
/** @type {[typeof __VLS_components.ElDrawer, typeof __VLS_components.elDrawer, typeof __VLS_components.ElDrawer, typeof __VLS_components.elDrawer, ]} */ ;
// @ts-ignore
const __VLS_138 = __VLS_asFunctionalComponent(__VLS_137, new __VLS_137({
    modelValue: (__VLS_ctx.drawerAdd),
}));
const __VLS_139 = __VLS_138({
    modelValue: (__VLS_ctx.drawerAdd),
}, ...__VLS_functionalComponentArgsRest(__VLS_138));
__VLS_140.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_140.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.userParams.id ? '更新用户' : '添加用户');
}
{
    const { default: __VLS_thisSlot } = __VLS_140.slots;
    const __VLS_141 = {}.ElForm;
    /** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
    // @ts-ignore
    const __VLS_142 = __VLS_asFunctionalComponent(__VLS_141, new __VLS_141({
        ref: "formRef",
        model: (__VLS_ctx.userParams),
        rules: (__VLS_ctx.rules),
    }));
    const __VLS_143 = __VLS_142({
        ref: "formRef",
        model: (__VLS_ctx.userParams),
        rules: (__VLS_ctx.rules),
    }, ...__VLS_functionalComponentArgsRest(__VLS_142));
    /** @type {typeof __VLS_ctx.formRef} */ ;
    var __VLS_145 = {};
    __VLS_144.slots.default;
    const __VLS_147 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_148 = __VLS_asFunctionalComponent(__VLS_147, new __VLS_147({
        prop: "username",
        label: "用户姓名",
    }));
    const __VLS_149 = __VLS_148({
        prop: "username",
        label: "用户姓名",
    }, ...__VLS_functionalComponentArgsRest(__VLS_148));
    __VLS_150.slots.default;
    const __VLS_151 = {}.ElInput;
    /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
    // @ts-ignore
    const __VLS_152 = __VLS_asFunctionalComponent(__VLS_151, new __VLS_151({
        modelValue: (__VLS_ctx.userParams.username),
        placeholder: "请输入用户的名称",
    }));
    const __VLS_153 = __VLS_152({
        modelValue: (__VLS_ctx.userParams.username),
        placeholder: "请输入用户的名称",
    }, ...__VLS_functionalComponentArgsRest(__VLS_152));
    var __VLS_150;
    const __VLS_155 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_156 = __VLS_asFunctionalComponent(__VLS_155, new __VLS_155({
        prop: "name",
        label: "用户昵称",
    }));
    const __VLS_157 = __VLS_156({
        prop: "name",
        label: "用户昵称",
    }, ...__VLS_functionalComponentArgsRest(__VLS_156));
    __VLS_158.slots.default;
    const __VLS_159 = {}.ElInput;
    /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
    // @ts-ignore
    const __VLS_160 = __VLS_asFunctionalComponent(__VLS_159, new __VLS_159({
        modelValue: (__VLS_ctx.userParams.name),
        placeholder: "请输入用户的昵称",
    }));
    const __VLS_161 = __VLS_160({
        modelValue: (__VLS_ctx.userParams.name),
        placeholder: "请输入用户的昵称",
    }, ...__VLS_functionalComponentArgsRest(__VLS_160));
    var __VLS_158;
    if (!__VLS_ctx.userParams.id) {
        const __VLS_163 = {}.ElFormItem;
        /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
        // @ts-ignore
        const __VLS_164 = __VLS_asFunctionalComponent(__VLS_163, new __VLS_163({
            prop: "password",
            label: "用户密码",
        }));
        const __VLS_165 = __VLS_164({
            prop: "password",
            label: "用户密码",
        }, ...__VLS_functionalComponentArgsRest(__VLS_164));
        __VLS_166.slots.default;
        const __VLS_167 = {}.ElInput;
        /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
        // @ts-ignore
        const __VLS_168 = __VLS_asFunctionalComponent(__VLS_167, new __VLS_167({
            modelValue: (__VLS_ctx.userParams.password),
            placeholder: "请输入用户的密码",
            type: "password",
        }));
        const __VLS_169 = __VLS_168({
            modelValue: (__VLS_ctx.userParams.password),
            placeholder: "请输入用户的密码",
            type: "password",
        }, ...__VLS_functionalComponentArgsRest(__VLS_168));
        var __VLS_166;
    }
    var __VLS_144;
}
{
    const { footer: __VLS_thisSlot } = __VLS_140.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ style: {} },
    });
    const __VLS_171 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_172 = __VLS_asFunctionalComponent(__VLS_171, new __VLS_171({
        ...{ 'onClick': {} },
        ...{ style: {} },
    }));
    const __VLS_173 = __VLS_172({
        ...{ 'onClick': {} },
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_172));
    let __VLS_175;
    let __VLS_176;
    let __VLS_177;
    const __VLS_178 = {
        onClick: (__VLS_ctx.cancel)
    };
    __VLS_174.slots.default;
    var __VLS_174;
    const __VLS_179 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_180 = __VLS_asFunctionalComponent(__VLS_179, new __VLS_179({
        ...{ 'onClick': {} },
        ...{ style: {} },
    }));
    const __VLS_181 = __VLS_180({
        ...{ 'onClick': {} },
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_180));
    let __VLS_183;
    let __VLS_184;
    let __VLS_185;
    const __VLS_186 = {
        onClick: (__VLS_ctx.save)
    };
    __VLS_182.slots.default;
    var __VLS_182;
}
var __VLS_140;
const __VLS_187 = {}.ElDrawer;
/** @type {[typeof __VLS_components.ElDrawer, typeof __VLS_components.elDrawer, typeof __VLS_components.ElDrawer, typeof __VLS_components.elDrawer, ]} */ ;
// @ts-ignore
const __VLS_188 = __VLS_asFunctionalComponent(__VLS_187, new __VLS_187({
    modelValue: (__VLS_ctx.drawerAssgin),
}));
const __VLS_189 = __VLS_188({
    modelValue: (__VLS_ctx.drawerAssgin),
}, ...__VLS_functionalComponentArgsRest(__VLS_188));
__VLS_190.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_190.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
{
    const { default: __VLS_thisSlot } = __VLS_190.slots;
    const __VLS_191 = {}.ElForm;
    /** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
    // @ts-ignore
    const __VLS_192 = __VLS_asFunctionalComponent(__VLS_191, new __VLS_191({}));
    const __VLS_193 = __VLS_192({}, ...__VLS_functionalComponentArgsRest(__VLS_192));
    __VLS_194.slots.default;
    const __VLS_195 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_196 = __VLS_asFunctionalComponent(__VLS_195, new __VLS_195({
        label: "用户姓名",
    }));
    const __VLS_197 = __VLS_196({
        label: "用户姓名",
    }, ...__VLS_functionalComponentArgsRest(__VLS_196));
    __VLS_198.slots.default;
    const __VLS_199 = {}.ElInput;
    /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
    // @ts-ignore
    const __VLS_200 = __VLS_asFunctionalComponent(__VLS_199, new __VLS_199({
        modelValue: (__VLS_ctx.userParams.name),
        disabled: true,
    }));
    const __VLS_201 = __VLS_200({
        modelValue: (__VLS_ctx.userParams.name),
        disabled: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_200));
    var __VLS_198;
    const __VLS_203 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_204 = __VLS_asFunctionalComponent(__VLS_203, new __VLS_203({
        label: "职位列表",
    }));
    const __VLS_205 = __VLS_204({
        label: "职位列表",
    }, ...__VLS_functionalComponentArgsRest(__VLS_204));
    __VLS_206.slots.default;
    const __VLS_207 = {}.ElCheckbox;
    /** @type {[typeof __VLS_components.ElCheckbox, typeof __VLS_components.elCheckbox, typeof __VLS_components.ElCheckbox, typeof __VLS_components.elCheckbox, ]} */ ;
    // @ts-ignore
    const __VLS_208 = __VLS_asFunctionalComponent(__VLS_207, new __VLS_207({
        ...{ 'onChange': {} },
        modelValue: (__VLS_ctx.chenkAll),
        indeterminate: (__VLS_ctx.isIndeterminate),
    }));
    const __VLS_209 = __VLS_208({
        ...{ 'onChange': {} },
        modelValue: (__VLS_ctx.chenkAll),
        indeterminate: (__VLS_ctx.isIndeterminate),
    }, ...__VLS_functionalComponentArgsRest(__VLS_208));
    let __VLS_211;
    let __VLS_212;
    let __VLS_213;
    const __VLS_214 = {
        onChange: (__VLS_ctx.handlerCheckAllChange)
    };
    __VLS_210.slots.default;
    var __VLS_210;
    const __VLS_215 = {}.ElCheckboxGroup;
    /** @type {[typeof __VLS_components.ElCheckboxGroup, typeof __VLS_components.elCheckboxGroup, typeof __VLS_components.ElCheckboxGroup, typeof __VLS_components.elCheckboxGroup, ]} */ ;
    // @ts-ignore
    const __VLS_216 = __VLS_asFunctionalComponent(__VLS_215, new __VLS_215({
        ...{ 'onChange': {} },
        modelValue: (__VLS_ctx.userRoles),
    }));
    const __VLS_217 = __VLS_216({
        ...{ 'onChange': {} },
        modelValue: (__VLS_ctx.userRoles),
    }, ...__VLS_functionalComponentArgsRest(__VLS_216));
    let __VLS_219;
    let __VLS_220;
    let __VLS_221;
    const __VLS_222 = {
        onChange: (__VLS_ctx.handlerCheckedChange)
    };
    __VLS_218.slots.default;
    for (const [role, index] of __VLS_getVForSourceType((__VLS_ctx.allRoles))) {
        const __VLS_223 = {}.ElCheckbox;
        /** @type {[typeof __VLS_components.ElCheckbox, typeof __VLS_components.elCheckbox, typeof __VLS_components.ElCheckbox, typeof __VLS_components.elCheckbox, ]} */ ;
        // @ts-ignore
        const __VLS_224 = __VLS_asFunctionalComponent(__VLS_223, new __VLS_223({
            key: (index),
            label: (role),
        }));
        const __VLS_225 = __VLS_224({
            key: (index),
            label: (role),
        }, ...__VLS_functionalComponentArgsRest(__VLS_224));
        __VLS_226.slots.default;
        (role.roleName);
        var __VLS_226;
    }
    var __VLS_218;
    var __VLS_206;
    var __VLS_194;
}
{
    const { footer: __VLS_thisSlot } = __VLS_190.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    const __VLS_227 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_228 = __VLS_asFunctionalComponent(__VLS_227, new __VLS_227({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ style: {} },
    }));
    const __VLS_229 = __VLS_228({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_228));
    let __VLS_231;
    let __VLS_232;
    let __VLS_233;
    const __VLS_234 = {
        onClick: (...[$event]) => {
            __VLS_ctx.drawerAssgin = false;
        }
    };
    __VLS_230.slots.default;
    var __VLS_230;
    const __VLS_235 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_236 = __VLS_asFunctionalComponent(__VLS_235, new __VLS_235({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ style: {} },
    }));
    const __VLS_237 = __VLS_236({
        ...{ 'onClick': {} },
        type: "primary",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_236));
    let __VLS_239;
    let __VLS_240;
    let __VLS_241;
    const __VLS_242 = {
        onClick: (__VLS_ctx.define)
    };
    __VLS_238.slots.default;
    var __VLS_238;
}
var __VLS_190;
/** @type {__VLS_StyleScopedClasses['form']} */ ;
// @ts-ignore
var __VLS_146 = __VLS_145;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            pageNo: pageNo,
            pageSize: pageSize,
            total: total,
            userAttr: userAttr,
            drawerAdd: drawerAdd,
            drawerAssgin: drawerAssgin,
            chenkAll: chenkAll,
            isIndeterminate: isIndeterminate,
            allRoles: allRoles,
            userRoles: userRoles,
            userParams: userParams,
            selectIdArr: selectIdArr,
            formRef: formRef,
            keyword: keyword,
            rules: rules,
            getHasUser: getHasUser,
            handler: handler,
            addUser: addUser,
            updateUser: updateUser,
            save: save,
            cancel: cancel,
            setRole: setRole,
            handlerCheckAllChange: handlerCheckAllChange,
            handlerCheckedChange: handlerCheckedChange,
            define: define,
            deleteUser: deleteUser,
            selectChange: selectChange,
            deleteSelectUser: deleteSelectUser,
            search: search,
            reset: reset,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
