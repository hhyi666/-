import { ref, onMounted } from 'vue';
import Top from './components/Top/index.vue';
import Sex from './components/Sex/index.vue';
import Tourtist from './components/Tourist/index.vue';
import Age from './components/Age/index.vue';
import Map from './components/Map/index.vue';
import Line from './components/Line/index.vue';
import Year from './components/Year/index.vue';
import Counter from './components/Counter/index.vue';
import Rank from './components/Rank/index.vue';
const screen = ref(null);
onMounted(() => {
    if (screen.value) {
        screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
    }
});
function getScale(w = 1920, h = 1080) {
    let ww = window.innerWidth / w;
    let hh = window.innerHeight / h;
    return ww < hh ? ww : hh;
}
window.onresize = () => {
    if (screen.value) {
        screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "screen" },
    ref: "screen",
});
/** @type {typeof __VLS_ctx.screen} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "top" },
});
/** @type {[typeof Top, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Top, new Top({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "bottom" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "left" },
});
/** @type {[typeof Tourtist, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(Tourtist, new Tourtist({
    ...{ class: "tourtist" },
}));
const __VLS_4 = __VLS_3({
    ...{ class: "tourtist" },
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
/** @type {[typeof Sex, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(Sex, new Sex({
    ...{ class: "sex" },
}));
const __VLS_7 = __VLS_6({
    ...{ class: "sex" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
/** @type {[typeof Age, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(Age, new Age({
    ...{ class: "age" },
}));
const __VLS_10 = __VLS_9({
    ...{ class: "age" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "center" },
});
/** @type {[typeof Map, typeof Map, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(Map, new Map({
    ...{ class: "map" },
}));
const __VLS_13 = __VLS_12({
    ...{ class: "map" },
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
/** @type {[typeof Line, typeof Line, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(Line, new Line({
    ...{ class: "line" },
}));
const __VLS_16 = __VLS_15({
    ...{ class: "line" },
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "right" },
});
/** @type {[typeof Rank, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(Rank, new Rank({
    ...{ class: "rank" },
}));
const __VLS_19 = __VLS_18({
    ...{ class: "rank" },
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
/** @type {[typeof Year, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(Year, new Year({
    ...{ class: "year" },
}));
const __VLS_22 = __VLS_21({
    ...{ class: "year" },
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
/** @type {[typeof Counter, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(Counter, new Counter({
    ...{ class: "counter" },
}));
const __VLS_25 = __VLS_24({
    ...{ class: "counter" },
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['screen']} */ ;
/** @type {__VLS_StyleScopedClasses['top']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom']} */ ;
/** @type {__VLS_StyleScopedClasses['left']} */ ;
/** @type {__VLS_StyleScopedClasses['tourtist']} */ ;
/** @type {__VLS_StyleScopedClasses['sex']} */ ;
/** @type {__VLS_StyleScopedClasses['age']} */ ;
/** @type {__VLS_StyleScopedClasses['center']} */ ;
/** @type {__VLS_StyleScopedClasses['map']} */ ;
/** @type {__VLS_StyleScopedClasses['line']} */ ;
/** @type {__VLS_StyleScopedClasses['right']} */ ;
/** @type {__VLS_StyleScopedClasses['rank']} */ ;
/** @type {__VLS_StyleScopedClasses['year']} */ ;
/** @type {__VLS_StyleScopedClasses['counter']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Top: Top,
            Sex: Sex,
            Tourtist: Tourtist,
            Age: Age,
            Map: Map,
            Line: Line,
            Year: Year,
            Counter: Counter,
            Rank: Rank,
            screen: screen,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
