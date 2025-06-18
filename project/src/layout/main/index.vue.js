import { useLayoutSettingStore } from '@/store/modules/setting';
import { watch, ref, nextTick } from 'vue';
export default await (async () => {
    //nextTick 当响应式发生变化的时候 获取发生更新的DOM
    const layoutSettingStore = useLayoutSettingStore();
    //控制组件是否销毁重建
    let flag = ref(true);
    //监听仓库内部的数据是否发生变化 说明用户刷新了页面 监听操作
    watch(() => layoutSettingStore.refsh, () => {
        flag.value = false; //销毁的操作
        nextTick(() => {
            flag.value = true;
        });
    });
    debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    const __VLS_0 = {}.RouterView;
    /** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    {
        const { default: __VLS_thisSlot } = __VLS_3.slots;
        const [{ Component }] = __VLS_getSlotParams(__VLS_thisSlot);
        const __VLS_4 = {}.transition;
        /** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
        // @ts-ignore
        const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
            name: "fade",
        }));
        const __VLS_6 = __VLS_5({
            name: "fade",
        }, ...__VLS_functionalComponentArgsRest(__VLS_5));
        __VLS_7.slots.default;
        if (__VLS_ctx.flag) {
            const __VLS_8 = ((Component));
            // @ts-ignore
            const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({}));
            const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
        }
        var __VLS_7;
        __VLS_3.slots['' /* empty slot name completion */];
    }
    var __VLS_3;
    var __VLS_dollars;
    const __VLS_self = (await import('vue')).defineComponent({
        setup() {
            return {
                flag: flag,
            };
        },
        name: 'Main'
    });
    return (await import('vue')).defineComponent({
        setup() {
            return {};
        },
        name: 'Main'
    });
})(); /* PartiallyEnd: #4569/main.vue */
