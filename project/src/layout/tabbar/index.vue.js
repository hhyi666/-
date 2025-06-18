import breadcrumb from './breadcrumb/index.vue';
import setting from './setting/index.vue';
export default await (async () => {
    debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "tabbar" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "tabbar_left" },
    });
    /** @type {[typeof breadcrumb, typeof breadcrumb, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(breadcrumb, new breadcrumb({}));
    const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "tabbar_right" },
    });
    /** @type {[typeof setting, typeof setting, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(setting, new setting({}));
    const __VLS_4 = __VLS_3({}, ...__VLS_functionalComponentArgsRest(__VLS_3));
    /** @type {__VLS_StyleScopedClasses['tabbar']} */ ;
    /** @type {__VLS_StyleScopedClasses['tabbar_left']} */ ;
    /** @type {__VLS_StyleScopedClasses['tabbar_right']} */ ;
    var __VLS_dollars;
    const __VLS_self = (await import('vue')).defineComponent({
        setup() {
            return {
                breadcrumb: breadcrumb,
                setting: setting,
            };
        },
        name: 'Tabbar'
    });
    return (await import('vue')).defineComponent({
        setup() {
            return {};
        },
        name: 'Tabbar'
    });
})(); /* PartiallyEnd: #4569/main.vue */
