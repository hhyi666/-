//统一管理项目用户相关的接口
import request from "@/utils/request";
import { loginFormatData,loginResponseData,userInfoResponseData } from "./type";
//项目的用户相关的请求地址
enum API{
    LOGIN_URL = '/admin/acl/index/login',
    USERINFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = '/admin/acl/index/logout'
}

//登录的接口
export const reqLogin = (data:loginFormatData) => request.post<any,loginResponseData>(API.LOGIN_URL,data)
//获取用户信息的接口
export const reqUserInfo = () => request.get<any,userInfoResponseData>(API.USERINFO_URL)
//退出登录
export const reqLogout = () => request.post<any,any>(API.LOGOUT_URL)