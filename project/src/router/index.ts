//=通过vue-router进行路由的配置
import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoute } from "./routes";
//创建一个路由器
let router = createRouter({
    //路由的模式
    history: createWebHashHistory(),
    routes: constantRoute,
    //滚动行为的加载
    scrollBehavior() {
        return {
            left: 0,
            top: 0,
        }
    }

})
export default router
