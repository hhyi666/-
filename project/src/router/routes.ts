//对外暴露配置的路由 常量路由

// 常量路由
export const constantRoute = [
    {
        //登录
        path: '/login',
        component: () => import('@/views/Login/index.vue'),
        name: 'login', //命名理由 权限需要使用到
        meta: {
            title: '登录',
            hidden: true, //路由的标题是否在菜单中隐藏
            icon: 'Promotion', //菜单左侧图标的信息 支持el的全部图标
        }
    },
    {
        //登录成功之后展示数据的路由 根组件
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        meta: {
            title: '',
            hidden: false,
            icon: '',
        },
        //直接重定向
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/Home/index.vue'),
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'HomeFilled',
                }
            },

        ]
    },
    {
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        name: 'Screen',
        meta: {
            hidden: false,
            title: '数据大屏',
            icon: 'Platform',
        }
    },

    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true,
            icon: 'CircleCloseFilled',
        }
    },

]

//异步路由
export const asyncRoute = [
    {
        path: '/acl',
        component: () => import('@/layout/index.vue'),
        name: 'Acl',
        meta: {
            hidden: false,
            title: '权限管理',
            icon: 'Lock',
        },
        redirect: '/acl/user',
        children: [
            {
                path: '/acl/user',
                //主要这里设置的是骨架 别设置错了
                component: () => import('@/views/acl/user/index.vue'),
                name: 'User',
                meta: {
                    title: '用户管理',
                    hidden: false,
                    icon: 'User'
                }

            },
            {
                path: '/acl/role',
                component: () => import('@/views/acl/role/index.vue'),
                name: 'Role',
                meta: {
                    title: '角色管理',
                    hidden: false,
                    icon: 'UserFilled'
                }
            },
            {
                path: '/acl/permission',
                component: () => import('@/views/acl/permission/index.vue'),
                name: 'Permission',
                meta: {
                    title: '菜单管理',
                    hidden: false,
                    icon: 'Monitor',
                }
            }
        ]
    },
    {
        path: '/product',
        component: () => import('@/layout/index.vue'),
        name: 'Product',
        meta: {
            hidden: false,
            title: '商品管理',
            icon: 'Goods'
        },
        redirect: '/product/trademark',
        children: [
            {
                path: '/product/trademark',
                component: () => import('@/views/product/trademark/index.vue'),
                name: 'Trademark',
                meta: {
                    title: '品牌管理',
                    hidden: false,
                    icon: 'ShoppingCartFull',
                }
            },
            {
                path: '/product/attr',
                component: () => import('@/views/product/attr/index.vue'),
                name: 'Attr',
                meta: {
                    title: '属性管理',
                    hidden: false,
                    icon: 'ChromeFilled',
                }
            },
            {
                path: '/product/sku',
                component: () => import('@/views/product/sku/index.vue'),
                name: 'Sku',
                meta: {
                    title: 'SKU管理',
                    hidden: false,
                    icon: 'Box',
                }
            },
            {
                path: '/product/spu',
                component: () => import('@/views/product/spu/index.vue'),
                name: 'Spu',
                meta: {
                    title: 'SPU管理',
                    hidden: false,
                    icon: 'Calendar',
                }
            },



        ]
    },
]

// 任意路由
export const anyRoute = {
    //任意路由 上面没有匹配到 重定向到404网页
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta: {
        title: '任意路由',
        hidden: true,
        icon: 'WarningFilled',
    }
}