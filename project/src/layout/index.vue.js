import Logo from '@/layout/logo/index.vue';
import Menu from '@/layout/menu/index.vue';
//右侧内容的展示区
import Main from '@/layout/main/index.vue';
import Tabbar from '@/layout/tabbar/index.vue';
//引入用户相关的小仓库
//获取路由对象
import { useUserStore } from '@/store/modules/user';
import { useRoute } from 'vue-router';
import { useLayoutSettingStore } from '@/store/modules/setting';
export default await (async () => {
    const layoutSettingStore = useLayoutSettingStore();
    const userStore = useUserStore();
    const $router = useRoute();
    debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    /** @type {__VLS_StyleScopedClasses['fold']} */ ;
    /** @type {__VLS_StyleScopedClasses['fold']} */ ;
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "layout_container" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "layout_slider" },
        ...{ class: ({ fold: __VLS_ctx.layoutSettingStore.fold ? true : false }) },
    });
    /** @type {[typeof Logo, typeof Logo, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(Logo, new Logo({}));
    const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
    const __VLS_3 = {}.ElScrollbar;
    /** @type {[typeof __VLS_components.ElScrollbar, typeof __VLS_components.elScrollbar, typeof __VLS_components.ElScrollbar, typeof __VLS_components.elScrollbar, ]} */ ;
    // @ts-ignore
    const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({
        ...{ class: "scrollbar" },
    }));
    const __VLS_5 = __VLS_4({
        ...{ class: "scrollbar" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_4));
    __VLS_6.slots.default;
    const __VLS_7 = {}.ElMenu;
    /** @type {[typeof __VLS_components.ElMenu, typeof __VLS_components.elMenu, typeof __VLS_components.ElMenu, typeof __VLS_components.elMenu, ]} */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        collapse: (__VLS_ctx.layoutSettingStore.fold ? true : false),
        defaultActive: (__VLS_ctx.$route.path),
        backgroundColor: "#001529",
        textColor: "white",
    }));
    const __VLS_9 = __VLS_8({
        collapse: (__VLS_ctx.layoutSettingStore.fold ? true : false),
        defaultActive: (__VLS_ctx.$route.path),
        backgroundColor: "#001529",
        textColor: "white",
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    __VLS_10.slots.default;
    /** @type {[typeof Menu, typeof Menu, ]} */ ;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(Menu, new Menu({
        menuList: (__VLS_ctx.userStore.menuRoutes),
    }));
    const __VLS_12 = __VLS_11({
        menuList: (__VLS_ctx.userStore.menuRoutes),
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    var __VLS_10;
    var __VLS_6;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "layout_tablebar" },
        ...{ class: ({ fold: __VLS_ctx.layoutSettingStore.fold ? true : false }) },
    });
    /** @type {[typeof Tabbar, typeof Tabbar, ]} */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(Tabbar, new Tabbar({}));
    const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "layout_main" },
        ...{ class: ({ fold: __VLS_ctx.layoutSettingStore.fold ? true : false }) },
    });
    /** @type {[typeof Main, typeof Main, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(Main, new Main({}));
    const __VLS_18 = __VLS_17({}, ...__VLS_functionalComponentArgsRest(__VLS_17));
    /** @type {__VLS_StyleScopedClasses['layout_container']} */ ;
    /** @type {__VLS_StyleScopedClasses['layout_slider']} */ ;
    /** @type {__VLS_StyleScopedClasses['fold']} */ ;
    /** @type {__VLS_StyleScopedClasses['scrollbar']} */ ;
    /** @type {__VLS_StyleScopedClasses['layout_tablebar']} */ ;
    /** @type {__VLS_StyleScopedClasses['fold']} */ ;
    /** @type {__VLS_StyleScopedClasses['layout_main']} */ ;
    /** @type {__VLS_StyleScopedClasses['fold']} */ ;
    var __VLS_dollars;
    const __VLS_self = (await import('vue')).defineComponent({
        setup() {
            return {
                Logo: Logo,
                Menu: Menu,
                Main: Main,
                Tabbar: Tabbar,
                layoutSettingStore: layoutSettingStore,
                userStore: userStore,
            };
        },
        name: 'Layout'
    });
    return (await import('vue')).defineComponent({
        setup() {
            return {};
        },
        name: 'Layout'
    });
})(); /* PartiallyEnd: #4569/main.vue */
