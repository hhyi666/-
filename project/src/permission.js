//路由鉴权
//项目当中的路由能不能访问的设置（什么条件下可以访问）
import router from "@/router";
import nprogress from 'nprogress';
//引入进度条的样式 在这个文件夹中可以调整样式 
import 'nprogress/nprogress.css';
//全局的前置守卫 访问路由之前会执行的函数
import pinia from "./store";
//获取用户仓库内部的token数据 判断是否成功
import { useUserStore } from "./store/modules/user";
import setting from "./setting";
nprogress.configure({ showSpinner: false });
//小仓库使用pinia就可以拿到大仓库中的数据
router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore(pinia);
    document.title = setting.title + '-' + to.meta.title;
    //持久化必须放在路由鉴权的里面
    nprogress.start();
    // 获取token判断登录？
    let token = userStore.token;
    //获取用户的名字
    let username = userStore.username;
    if (token) {
        //登录成功不能访问login
        if (to.path === '/login') {
            next({ path: '/' });
        }
        else {
            //登录成功之后就可以访问其他的路由
            if (username) {
                next();
            }
            else {
                //没有用户信息 发送请求 获取到了信息再放行
                try {
                    //没有信息就刷新拿到对应的信息
                    await userStore.userInfo();
                    // ？？ 刷新的是异步路由？
                    //这样就可以保证加载成功之后再放行
                    next({ ...to });
                }
                catch (error) {
                    //执行的时间 发送请求失败 token过期|手动修改本地的token
                    //将用户相关的数据退出
                    await userStore.userLogoout();
                    next({ path: '/login', query: { redirect: to.path } });
                }
            }
        }
    }
    else {
        //未登录
        if (to.path === '/login') {
            next();
        }
        else {
            next({ path: '/login', query: { redirect: to.path } });
            //存储想要出去的地方
        }
    }
});
//全局后置守卫 
router.afterEach((to, from) => {
    nprogress.done();
});
//1.任意路由的切换实现进度条的业务
//2.路由鉴权（路由组件访问权限的设置）
//全部路由 ： 登录 404 任意路由 权限管理 商品管理模块 数据大屏等等
//没有登录的一部分是不能及逆行访问的 只有login才能登录 使用的时候指向login
//登录成功之后 不能访问login 只能访问其他的 访问login 时候访问首页
