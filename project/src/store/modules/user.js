//创建用户相关的小仓库
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
//引入路由（常量路由）
import { constantRoute, asyncRoute, anyRoute } from "@/router/routes";
//引入数据的类型
import { ref } from "vue";
// @ts-ignore
import { cloneDeep } from 'lodash';
import router from "@/router";
const filterAsyncRoute = (asyncRoute, routes) => {
    return asyncRoute.filter((item) => {
        if (routes.includes(item)) {
            if (item.children && item.children.length > 0) {
                // 这样存在弊端 会对数据的本身进行更改
                item.children = filterAsyncRoute(item.children, routes);
            }
            return true;
        }
    });
};
export const useUserStore = defineStore('User', () => {
    const token = ref('');
    const menuRoutes = ref(constantRoute); //仓库存储生成的数组
    const username = ref('');
    const avatar = ref('');
    // 存储是否包含某个按钮
    const buttons = ref([]);
    async function userLogin(data) {
        let res = await reqLogin(data);
        if (res.code === 200) {
            token.value = res.data; //放到pinia当中
            return 'ok';
        }
        else {
            return Promise.reject(new Error(res.data));
        }
    }
    //getter属性能够使用computed计算属性进行操作
    //获取用户信息的方法
    const userInfo = async () => {
        //获取用户信息存储仓库当中 我们发送登录请求的时候 我们需要携带token拿到用户信息
        let res = await reqUserInfo(); //请求的时候记得携带token
        if (res.code === 200) {
            username.value = res.data.name;
            avatar.value = res.data.avatar;
            // 计算用户需要展示的路由 s使用深拷贝解决原来数据消失的问题
            let userAsyncRoutes = filterAsyncRoute(cloneDeep(asyncRoute), res.data.routes);
            // 更新菜单的数据
            menuRoutes.value = [...constantRoute, ...userAsyncRoutes, anyRoute];
            // 倒着路由器管理的只有const路由
            // 这里需要进行路由的注册
            const newRoute = [...userAsyncRoutes, anyRoute];
            // 注册新的路由 异步路由时动态进行追加的
            newRoute.forEach((route) => {
                router.addRoute(route);
            });
            buttons.value = res.data.buttons;
            return 'ok';
        }
        else {
            return Promise.reject(new Error(res.message));
        }
    };
    //退出登录的函数
    const userLogoout = async () => {
        const res = await reqLogout();
        if (res.code === 200) {
            username.value = '';
            avatar.value = '';
            token.value = '';
            localStorage.removeItem('User');
            return 'ok';
        }
        else {
            return Promise.reject(new Error(res.message));
        }
    };
    return {
        //返回的是对象 使用.进行操作
        username, //s使用的数据记得return
        avatar,
        token,
        menuRoutes,
        userLogin,
        userInfo,
        userLogoout,
        buttons,
    };
}, {
    persist: true
});
