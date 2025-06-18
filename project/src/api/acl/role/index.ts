import request from "@/utils/request";
import type { RoleResponseData, RoleData, MenuResponseData } from "./type";
enum API {
    //获取全部职位的信息
    ALLROLE_URL = '/admin/acl/role/',
    //添加职位信息  更新已有的职位
    ADDROLE_URL = '/admin/acl/role/save',
    //更新已有的地址
    UPDATEROLE_URL = '/admin/acl/role/update',
    //拿到对应的职位分配的数据
    ALLPERMISSION_URL = '/admin/acl/permission/toAssign/',
    //分配权限提交的接口
    SETPERMISSON_URL = '/admin/acl/permission/doAssign/?',
    //删除角色的API
    REMOVEROLE_URL = '/admin/acl/role/remove/'
}
//获取全部的角色
export const reqAllRoleList = (page: number, limit: number, roleName: string) => request.get<any, RoleResponseData>(API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`)

export const reqAddOrUpdateRole = (data: RoleData) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEROLE_URL, data)
    } else {
        return request.post<any, any>(API.ADDROLE_URL, data)
    }
}

export const reqAllMenuList = (roleId: number) => request.get<any, MenuResponseData>(API.ALLPERMISSION_URL + roleId)

export const reqSetPermission = (roleId: number, permissionId: number[]) => request.post<any, any>(API.SETPERMISSON_URL + `roleId=${roleId}&permissionId=${permissionId}`)

export const reqRemoveRole = (roleId : number) => request.delete(API.REMOVEROLE_URL+roleId)