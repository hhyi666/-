import type { RouteRecordRaw } from "vue-router"
import type { CategoryObj } from "@/api/product/attr/type"
//路由的类型
//定义小仓库数据state的类型
export interface UserState{
    token : String|null
    menuRoutes : RouteRecordRaw[],
    username : String,
    avatar : String,
}
