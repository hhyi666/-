import request from "@/utils/request";
var API;
(function (API) {
    //获取全部职位的信息
    API["ALLROLE_URL"] = "/admin/acl/role/";
    //添加职位信息  更新已有的职位
    API["ADDROLE_URL"] = "/admin/acl/role/save";
    //更新已有的地址
    API["UPDATEROLE_URL"] = "/admin/acl/role/update";
    //拿到对应的职位分配的数据
    API["ALLPERMISSION_URL"] = "/admin/acl/permission/toAssign/";
    //分配权限提交的接口
    API["SETPERMISSON_URL"] = "/admin/acl/permission/doAssign/?";
    //删除角色的API
    API["REMOVEROLE_URL"] = "/admin/acl/role/remove/";
})(API || (API = {}));
//获取全部的角色
export const reqAllRoleList = (page, limit, roleName) => request.get(API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`);
export const reqAddOrUpdateRole = (data) => {
    if (data.id) {
        return request.put(API.UPDATEROLE_URL, data);
    }
    else {
        return request.post(API.ADDROLE_URL, data);
    }
};
export const reqAllMenuList = (roleId) => request.get(API.ALLPERMISSION_URL + roleId);
export const reqSetPermission = (roleId, permissionId) => request.post(API.SETPERMISSON_URL + `roleId=${roleId}&permissionId=${permissionId}`);
export const reqRemoveRole = (roleId) => request.delete(API.REMOVEROLE_URL + roleId);
