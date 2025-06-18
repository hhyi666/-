//统一管理项目用户相关的接口
import request from "@/utils/request";
//项目的用户相关的请求地址
var API;
(function (API) {
    API["LOGIN_URL"] = "/admin/acl/index/login";
    API["USERINFO_URL"] = "/admin/acl/index/info";
    API["LOGOUT_URL"] = "/admin/acl/index/logout";
})(API || (API = {}));
//登录的接口
export const reqLogin = (data) => request.post(API.LOGIN_URL, data);
//获取用户信息的接口
export const reqUserInfo = () => request.get(API.USERINFO_URL);
//退出登录
export const reqLogout = () => request.post(API.LOGOUT_URL);
