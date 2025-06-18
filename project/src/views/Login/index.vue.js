import { User, Lock } from '@element-plus/icons-vue';
import { ref, reactive } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { useRouter, useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
import { getTime } from '@/utils/time';
let $route = useRoute();
//设置变量 控制加载的效果
let loading = ref(false);
const useStore = useUserStore();
//获取el-form组件
let loginForms = ref();
//获取路由器
const $router = useRouter();
//收集账号和密码数据
let loginForm = reactive({ username: 'admin', password: '111111' });
//定义表单校验需要的配置对象
//自定义校验规则的函数
const vaildatorUserName = (rule, value, callback) => {
    //rule是表单的校验规则对象
    //value 就是表单内容的对象
    //callback 规则放行的函数 调用通过函数 不符合 调用返回错误的信息
    if (value.length >= 5) {
        callback();
    }
    else {
        callback(new Error('账号的长度至少是5'));
    }
};
const vaildatorPassword = (rule, value, callback) => {
    if (value.length >= 6) {
        callback();
    }
    else {
        callback(new Error('密码的长度至少是6'));
    }
};
const rules = {
    //规则对象属性 ： required是务必进行检验的 trigger 触发表单校验的时机
    username: [
        { trigger: 'change', validator: vaildatorUserName }
    ],
    password: [
        { trigger: 'change', validator: vaildatorPassword }
    ],
};
//登录回调
const login = async () => {
    //保证表单的校验通过 保证表单元素全部通过才能继续
    await loginForms.value.validate();
    loading.value = true; //开始加载效果
    //通知仓库发送登录请求
    try {
        //可以使用then 和 trycatch
        await useStore.userLogin(loginForm);
        //使用编程时导航跳转首页 
        //判断登录的路径是否有query参数 有的话就进行跳转
        let redirect = $route.query.redirect;
        $router.push({ path: redirect || '/' });
        //从哪退出跳转到哪里
        ElNotification({
            type: 'success',
            message: '欢迎回来',
            title: `Hi,${getTime()}好！` //此时我们想要根据时间进行变化 ？？？
        });
    }
    catch (error) {
        //登录失败 加载效果消失
        loading.value = false;
        ElNotification({
            type: 'warning',
            message: error.message
        });
    }
    //请求成功 跳转首页
    //如果失败 弹出失败信息
};
//封装函数 判断时间
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-container" },
});
const __VLS_0 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    span: (12),
    xs: (0),
}));
const __VLS_6 = __VLS_5({
    span: (12),
    xs: (0),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
const __VLS_8 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    span: (12),
    xs: (24),
}));
const __VLS_10 = __VLS_9({
    span: (12),
    xs: (24),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
const __VLS_12 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    ...{ class: "login_form" },
    model: (__VLS_ctx.loginForm),
    rules: (__VLS_ctx.rules),
    ref: "loginForms",
}));
const __VLS_14 = __VLS_13({
    ...{ class: "login_form" },
    model: (__VLS_ctx.loginForm),
    rules: (__VLS_ctx.rules),
    ref: "loginForms",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
/** @type {typeof __VLS_ctx.loginForms} */ ;
var __VLS_16 = {};
__VLS_15.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
const __VLS_18 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    prop: "username",
}));
const __VLS_20 = __VLS_19({
    prop: "username",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_21.slots.default;
const __VLS_22 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    prefixIcon: (__VLS_ctx.User),
    modelValue: (__VLS_ctx.loginForm.username),
}));
const __VLS_24 = __VLS_23({
    prefixIcon: (__VLS_ctx.User),
    modelValue: (__VLS_ctx.loginForm.username),
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
var __VLS_21;
const __VLS_26 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    prop: "password",
}));
const __VLS_28 = __VLS_27({
    prop: "password",
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
__VLS_29.slots.default;
const __VLS_30 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    type: "password",
    prefixIcon: (__VLS_ctx.Lock),
    modelValue: (__VLS_ctx.loginForm.password),
    showPassword: true,
}));
const __VLS_32 = __VLS_31({
    type: "password",
    prefixIcon: (__VLS_ctx.Lock),
    modelValue: (__VLS_ctx.loginForm.password),
    showPassword: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
var __VLS_29;
const __VLS_34 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({}));
const __VLS_36 = __VLS_35({}, ...__VLS_functionalComponentArgsRest(__VLS_35));
__VLS_37.slots.default;
const __VLS_38 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    ...{ 'onClick': {} },
    loading: (__VLS_ctx.loading),
    ...{ class: "login_btn" },
    type: "primary",
}));
const __VLS_40 = __VLS_39({
    ...{ 'onClick': {} },
    loading: (__VLS_ctx.loading),
    ...{ class: "login_btn" },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
let __VLS_42;
let __VLS_43;
let __VLS_44;
const __VLS_45 = {
    onClick: (__VLS_ctx.login)
};
__VLS_41.slots.default;
var __VLS_41;
var __VLS_37;
var __VLS_15;
var __VLS_11;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['login-container']} */ ;
/** @type {__VLS_StyleScopedClasses['login_form']} */ ;
/** @type {__VLS_StyleScopedClasses['login_btn']} */ ;
// @ts-ignore
var __VLS_17 = __VLS_16;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            User: User,
            Lock: Lock,
            loading: loading,
            loginForms: loginForms,
            loginForm: loginForm,
            rules: rules,
            login: login,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
