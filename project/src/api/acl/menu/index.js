import request from "@/utils/request";
var API;
(function (API) {
    //获取全部菜单和按钮的数据
    API["ALLPERMISSION_URL"] = "/admin/acl/permission";
    //新增菜单数据的接口
    API["ADDPERMISSION_URL"] = "/admin/acl/permission/save";
    //更新已有的菜单
    API["UPDATEPERMISSION_URL"] = "/admin/acl/permission/update";
    //删除菜单的接口
    API["DELETEPERMISSION_URL"] = "/admin/acl/permission/remove/";
})(API || (API = {}));
export const reqAllPermission = () => request.get(API.ALLPERMISSION_URL);
export const reqAddOrUpdateMenu = (data) => {
    if (data.id) {
        return request.put(API.UPDATEPERMISSION_URL, data);
    }
    else {
        return request.post(API.ADDPERMISSION_URL, data);
    }
};
export const reqDeleteMenu = (id) => request.delete(API.DELETEPERMISSION_URL + id);
