import { defineAsyncComponent } from 'vue';
//引入el提供的全部的图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// console.log(SvgIcon,Pagination) //对象
// console.log(Object.keys(allGlobalComponents))
//增加类型断言防止出错
const allGlobalComponents = {
    SvgIcon: defineAsyncComponent(() => import('@/components/SvgIcon/index.vue')),
    Pagination: defineAsyncComponent(() => import('@/components/Pagination/index.vue')),
    Category: defineAsyncComponent(() => import('@/components/Category/index.vue'))
};
export default {
    //务必叫做install方法
    install(app) {
        //注册所有的全局组件
        Object.keys(allGlobalComponents).forEach(key => {
            //组件注册成全局组件
            app.component(key, allGlobalComponents[key]);
        });
        //将el提供的组件注册成全局组件
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component);
        }
    }
};
