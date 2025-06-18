import request from "@/utils/request";
var API;
(function (API) {
    //获取用户数据
    API["ALLUSER_URL"] = "/admin/acl/user/";
    //添加用户
    API["ADDUSER_URL"] = "/admin/acl/user/save";
    //修改用户
    API["UPDATEUSER_URL"] = "/admin/acl/user/update";
    //获取全部职位的获取
    API["ALLROLE_URL"] = "/admin/acl/user/toAssign/";
    //修改职位的请求
    API["SETROLE_URL"] = "/admin/acl/user/doAssignRole";
    //删除操作 一个一个删除的接口
    API["DELETEUSER_URL"] = "/admin/acl/user/remove/";
    //批量删除的接口
    API["DELETEALLUSER_URL"] = "/admin/acl/user/batchRemove";
    //搜索的接口实现
    API["SEARCHUSER_URL"] = "/admin/acl/user/";
})(API || (API = {}));
export const reqUserInfo = (page, limit, username) => request.get(API.ALLUSER_URL + `${page}/${limit}/?username=${username}`);
export const reqAddOrUpdateUser = (data) => {
    if (data.id) {
        return request.put(API.UPDATEUSER_URL, data);
    }
    else {
        return request.post(API.ADDUSER_URL, data);
    }
};
export const reqAllRole = (userid) => request.get(API.ALLROLE_URL + userid);
export const reqSetUserRole = (data) => request.post(API.SETROLE_URL, data);
export const reqRemoveUser = (userid) => request.delete(API.DELETEUSER_URL + userid);
export const reqSelectUser = (idList) => request.delete(API.DELETEALLUSER_URL, { data: idList });
