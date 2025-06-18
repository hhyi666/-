import { ref } from 'vue';
import { useLayoutSettingStore } from '@/store/modules/setting';
import { useUserStore } from '@/store/modules/user';
import { useRouter, useRoute } from 'vue-router';
export default await (async () => {
    const userStore = useUserStore();
    const layoutSettingStore = useLayoutSettingStore();
    const $router = useRouter();
    const $route = useRoute();
    // 收集开关的数据
    let dark = ref(false);
    //定义刷新的操作
    const changeRefsh = () => {
        layoutSettingStore.refsh = !layoutSettingStore.refsh;
    };
    //全屏按钮点击的回调
    const fullScreen = () => {
        let full = document.fullscreenElement;
        if (!full) {
            document.documentElement.requestFullscreen();
        }
        else {
            document.exitFullscreen();
        }
    };
    //退出登录的回调
    const logoout = async () => {
        await userStore.userLogoout(); //异步操作
        $router.push({ path: '/login', query: { redirect: $route.path } });
    };
    const changeDark = () => {
        //获取根节点
        let html = document.documentElement;
        console.log(html);
        dark.value ? html.className = 'dark' : html.className = '';
    };
    const color = ref('rgba(255, 69, 0, 0.68)');
    const predefineColors = ref([
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577',
    ]);
    // 主题颜色的设置
    const setColor = () => {
        // 通知根节点进行属性值的切换
        const html = document.documentElement;
        html.style.setProperty('--el-color-primary', color.value);
    };
    debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    const __VLS_0 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onClick': {} },
        type: "primary",
        size: "default",
        icon: "Refresh",
        circle: true,
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        type: "primary",
        size: "default",
        icon: "Refresh",
        circle: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_4;
    let __VLS_5;
    let __VLS_6;
    const __VLS_7 = {
        onClick: (__VLS_ctx.changeRefsh)
    };
    var __VLS_3;
    const __VLS_8 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        ...{ 'onClick': {} },
        type: "primary",
        size: "default",
        icon: "FullScreen",
        circle: true,
    }));
    const __VLS_10 = __VLS_9({
        ...{ 'onClick': {} },
        type: "primary",
        size: "default",
        icon: "FullScreen",
        circle: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_12;
    let __VLS_13;
    let __VLS_14;
    const __VLS_15 = {
        onClick: (__VLS_ctx.fullScreen)
    };
    var __VLS_11;
    const __VLS_16 = {}.ElPopover;
    /** @type {[typeof __VLS_components.ElPopover, typeof __VLS_components.elPopover, typeof __VLS_components.ElPopover, typeof __VLS_components.elPopover, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        placement: "bottom",
        title: "主题设置",
        width: (200),
        trigger: "hover",
    }));
    const __VLS_18 = __VLS_17({
        placement: "bottom",
        title: "主题设置",
        width: (200),
        trigger: "hover",
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    __VLS_19.slots.default;
    const __VLS_20 = {}.ElForm;
    /** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
    const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
    __VLS_23.slots.default;
    const __VLS_24 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        label: "主题颜色",
    }));
    const __VLS_26 = __VLS_25({
        label: "主题颜色",
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    __VLS_27.slots.default;
    const __VLS_28 = {}.ElColorPicker;
    /** @type {[typeof __VLS_components.ElColorPicker, typeof __VLS_components.elColorPicker, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        ...{ 'onChange': {} },
        teleported: (false),
        modelValue: (__VLS_ctx.color),
        showAlpha: true,
        predefine: (__VLS_ctx.predefineColors),
    }));
    const __VLS_30 = __VLS_29({
        ...{ 'onChange': {} },
        teleported: (false),
        modelValue: (__VLS_ctx.color),
        showAlpha: true,
        predefine: (__VLS_ctx.predefineColors),
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    let __VLS_32;
    let __VLS_33;
    let __VLS_34;
    const __VLS_35 = {
        onChange: (__VLS_ctx.setColor)
    };
    var __VLS_31;
    var __VLS_27;
    const __VLS_36 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        label: "暗黑模式",
    }));
    const __VLS_38 = __VLS_37({
        label: "暗黑模式",
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    __VLS_39.slots.default;
    const __VLS_40 = {}.ElSwitch;
    /** @type {[typeof __VLS_components.ElSwitch, typeof __VLS_components.elSwitch, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        ...{ 'onChange': {} },
        modelValue: (__VLS_ctx.dark),
        ...{ class: "mt-2" },
        inlinePrompt: true,
        activeIcon: "MoonNight",
        inactiveIcon: "Sunny",
    }));
    const __VLS_42 = __VLS_41({
        ...{ 'onChange': {} },
        modelValue: (__VLS_ctx.dark),
        ...{ class: "mt-2" },
        inlinePrompt: true,
        activeIcon: "MoonNight",
        inactiveIcon: "Sunny",
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    let __VLS_44;
    let __VLS_45;
    let __VLS_46;
    const __VLS_47 = {
        onChange: (__VLS_ctx.changeDark)
    };
    var __VLS_43;
    var __VLS_39;
    var __VLS_23;
    {
        const { reference: __VLS_thisSlot } = __VLS_19.slots;
        const __VLS_48 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
            type: "primary",
            size: "default",
            icon: "Setting",
            circle: true,
        }));
        const __VLS_50 = __VLS_49({
            type: "primary",
            size: "default",
            icon: "Setting",
            circle: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    }
    var __VLS_19;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
        src: (__VLS_ctx.userStore.avatar),
        alt: "",
        ...{ style: {} },
    });
    const __VLS_52 = {}.ElDropdown;
    /** @type {[typeof __VLS_components.ElDropdown, typeof __VLS_components.elDropdown, typeof __VLS_components.ElDropdown, typeof __VLS_components.elDropdown, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({}));
    const __VLS_54 = __VLS_53({}, ...__VLS_functionalComponentArgsRest(__VLS_53));
    __VLS_55.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "el-dropdown-link" },
    });
    (__VLS_ctx.userStore.username);
    const __VLS_56 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
        ...{ class: "el-icon--right" },
    }));
    const __VLS_58 = __VLS_57({
        ...{ class: "el-icon--right" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_57));
    __VLS_59.slots.default;
    const __VLS_60 = {}.ArrowDown;
    /** @type {[typeof __VLS_components.ArrowDown, typeof __VLS_components.arrowDown, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({}));
    const __VLS_62 = __VLS_61({}, ...__VLS_functionalComponentArgsRest(__VLS_61));
    var __VLS_59;
    {
        const { dropdown: __VLS_thisSlot } = __VLS_55.slots;
        const __VLS_64 = {}.ElDropdownMenu;
        /** @type {[typeof __VLS_components.ElDropdownMenu, typeof __VLS_components.elDropdownMenu, typeof __VLS_components.ElDropdownMenu, typeof __VLS_components.elDropdownMenu, ]} */ ;
        // @ts-ignore
        const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({}));
        const __VLS_66 = __VLS_65({}, ...__VLS_functionalComponentArgsRest(__VLS_65));
        __VLS_67.slots.default;
        const __VLS_68 = {}.ElDropdownItem;
        /** @type {[typeof __VLS_components.ElDropdownItem, typeof __VLS_components.elDropdownItem, typeof __VLS_components.ElDropdownItem, typeof __VLS_components.elDropdownItem, ]} */ ;
        // @ts-ignore
        const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
            ...{ 'onClick': {} },
        }));
        const __VLS_70 = __VLS_69({
            ...{ 'onClick': {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_69));
        let __VLS_72;
        let __VLS_73;
        let __VLS_74;
        const __VLS_75 = {
            onClick: (__VLS_ctx.logoout)
        };
        __VLS_71.slots.default;
        var __VLS_71;
        var __VLS_67;
    }
    var __VLS_55;
    /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['el-dropdown-link']} */ ;
    /** @type {__VLS_StyleScopedClasses['el-icon--right']} */ ;
    var __VLS_dollars;
    const __VLS_self = (await import('vue')).defineComponent({
        setup() {
            return {
                userStore: userStore,
                dark: dark,
                changeRefsh: changeRefsh,
                fullScreen: fullScreen,
                logoout: logoout,
                changeDark: changeDark,
                color: color,
                predefineColors: predefineColors,
                setColor: setColor,
            };
        },
        name: 'Setting'
    });
    return (await import('vue')).defineComponent({
        setup() {
            return {};
        },
        name: 'Setting'
    });
})(); /* PartiallyEnd: #4569/main.vue */
