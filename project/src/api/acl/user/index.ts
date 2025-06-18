import request from "@/utils/request";
import { SetRoleData, User, UserResponseData, AllRoleResponseData } from "./type";
enum API {
    //获取用户数据
    ALLUSER_URL = '/admin/acl/user/',
    //添加用户
    ADDUSER_URL = '/admin/acl/user/save',
    //修改用户
    UPDATEUSER_URL = '/admin/acl/user/update',
    //获取全部职位的获取
    ALLROLE_URL = '/admin/acl/user/toAssign/',
    //修改职位的请求
    SETROLE_URL = '/admin/acl/user/doAssignRole',
    //删除操作 一个一个删除的接口
    DELETEUSER_URL = '/admin/acl/user/remove/',
    //批量删除的接口
    DELETEALLUSER_URL = '/admin/acl/user/batchRemove',
    //搜索的接口实现
    SEARCHUSER_URL = '/admin/acl/user/'
}

export const reqUserInfo = (page: number, limit: number, username: string) => request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}/?username=${username}`)

export const reqAddOrUpdateUser = (data: User) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEUSER_URL, data)
    } else {
        return request.post<any, any>(API.ADDUSER_URL, data)
    }
}

export const reqAllRole = (userid: number) => request.get<any, AllRoleResponseData>(API.ALLROLE_URL + userid)

export const reqSetUserRole = (data: SetRoleData) => request.post<any, any>(API.SETROLE_URL, data)

export const reqRemoveUser = (userid: number) => request.delete<any, any>(API.DELETEUSER_URL + userid)

export const reqSelectUser = (idList: number[]) => request.delete<any, any>(API.DELETEALLUSER_URL, { data: idList })