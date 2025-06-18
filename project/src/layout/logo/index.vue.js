import setting from '@/setting';
export default await (async () => {
    debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "logo" },
    });
    if (__VLS_ctx.setting.logoHidden) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
            src: (__VLS_ctx.setting.logo),
            alt: "",
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ style: {} },
    });
    (__VLS_ctx.setting.title);
    /** @type {__VLS_StyleScopedClasses['logo']} */ ;
    var __VLS_dollars;
    const __VLS_self = (await import('vue')).defineComponent({
        setup() {
            return {
                setting: setting,
            };
        },
        name: 'Logo'
    });
    return (await import('vue')).defineComponent({
        setup() {
            return {};
        },
        name: 'Logo'
    });
})(); /* PartiallyEnd: #4569/main.vue */
