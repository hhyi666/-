import { useRouter } from 'vue-router';
export default await (async () => {
    const $router = useRouter();
    //获取父组件传递的路由的数据
    const __VLS_props = defineProps(['menuList']);
    const goRoute = (vc) => {
        $router.push(vc.index);
    };
    debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.menuList))) {
        (item.path);
        if (!item.children) {
            if (!item.meta.hidden) {
                const __VLS_0 = {}.ElMenuItem;
                /** @type {[typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, ]} */ ;
                // @ts-ignore
                const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
                    ...{ 'onClick': {} },
                    index: (item.path),
                }));
                const __VLS_2 = __VLS_1({
                    ...{ 'onClick': {} },
                    index: (item.path),
                }, ...__VLS_functionalComponentArgsRest(__VLS_1));
                let __VLS_4;
                let __VLS_5;
                let __VLS_6;
                const __VLS_7 = {
                    onClick: (__VLS_ctx.goRoute)
                };
                __VLS_3.slots.default;
                const __VLS_8 = {}.ElIcon;
                /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
                // @ts-ignore
                const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({}));
                const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
                __VLS_11.slots.default;
                const __VLS_12 = ((item.meta.icon));
                // @ts-ignore
                const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
                const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
                var __VLS_11;
                {
                    const { title: __VLS_thisSlot } = __VLS_3.slots;
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
                    (item.meta.title);
                }
                var __VLS_3;
            }
        }
        if (item.children && item.children.length === 1) {
            if (!item.children[0].meta.hidden) {
                const __VLS_16 = {}.ElMenuItem;
                /** @type {[typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, ]} */ ;
                // @ts-ignore
                const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
                    ...{ 'onClick': {} },
                    index: (item.children[0].path),
                }));
                const __VLS_18 = __VLS_17({
                    ...{ 'onClick': {} },
                    index: (item.children[0].path),
                }, ...__VLS_functionalComponentArgsRest(__VLS_17));
                let __VLS_20;
                let __VLS_21;
                let __VLS_22;
                const __VLS_23 = {
                    onClick: (__VLS_ctx.goRoute)
                };
                __VLS_19.slots.default;
                const __VLS_24 = {}.ElIcon;
                /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
                // @ts-ignore
                const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
                const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
                __VLS_27.slots.default;
                const __VLS_28 = ((item.children[0].meta.icon));
                // @ts-ignore
                const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({}));
                const __VLS_30 = __VLS_29({}, ...__VLS_functionalComponentArgsRest(__VLS_29));
                var __VLS_27;
                {
                    const { title: __VLS_thisSlot } = __VLS_19.slots;
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
                    (item.children[0].meta.title);
                }
                var __VLS_19;
            }
        }
        if (item.children && item.children.length > 1) {
            const __VLS_32 = {}.ElSubMenu;
            /** @type {[typeof __VLS_components.ElSubMenu, typeof __VLS_components.elSubMenu, typeof __VLS_components.ElSubMenu, typeof __VLS_components.elSubMenu, ]} */ ;
            // @ts-ignore
            const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
                index: (item.path),
            }));
            const __VLS_34 = __VLS_33({
                index: (item.path),
            }, ...__VLS_functionalComponentArgsRest(__VLS_33));
            __VLS_35.slots.default;
            {
                const { title: __VLS_thisSlot } = __VLS_35.slots;
                const __VLS_36 = {}.ElIcon;
                /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
                // @ts-ignore
                const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({}));
                const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
                __VLS_39.slots.default;
                const __VLS_40 = ((item.meta.icon));
                // @ts-ignore
                const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({}));
                const __VLS_42 = __VLS_41({}, ...__VLS_functionalComponentArgsRest(__VLS_41));
                var __VLS_39;
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
                (item.meta.title);
            }
            const __VLS_44 = {}.Menu;
            /** @type {[typeof __VLS_components.Menu, typeof __VLS_components.Menu, ]} */ ;
            // @ts-ignore
            const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
                menuList: (item.children),
            }));
            const __VLS_46 = __VLS_45({
                menuList: (item.children),
            }, ...__VLS_functionalComponentArgsRest(__VLS_45));
            var __VLS_35;
        }
    }
    var __VLS_dollars;
    const __VLS_self = (await import('vue')).defineComponent({
        setup() {
            return {
                goRoute: goRoute,
            };
        },
        props: ['menuList'],
        name: 'Menu'
    });
    return (await import('vue')).defineComponent({
        setup() {
            return {};
        },
        props: ['menuList'],
        name: 'Menu'
    });
})(); /* PartiallyEnd: #4569/main.vue */
