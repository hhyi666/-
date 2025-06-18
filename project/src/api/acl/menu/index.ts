import request from "@/utils/request";
import { MenuParams,PermissionResponseData } from "./type";

enum API{
    //获取全部菜单和按钮的数据
    ALLPERMISSION_URL = '/admin/acl/permission',
    //新增菜单数据的接口
    ADDPERMISSION_URL = '/admin/acl/permission/save',
    //更新已有的菜单
    UPDATEPERMISSION_URL = '/admin/acl/permission/update',
    //删除菜单的接口
    DELETEPERMISSION_URL = '/admin/acl/permission/remove/'
}

export const reqAllPermission = () => request.get<any,PermissionResponseData>(API.ALLPERMISSION_URL)

export const reqAddOrUpdateMenu = (data:MenuParams) => {
    if(data.id){
        return request.put<any,any>(API.UPDATEPERMISSION_URL,data)
    }else{
        return request.post<any,any>(API.ADDPERMISSION_URL,data)
    }
}

export const reqDeleteMenu = (id:number) => request.delete<any,any>(API.DELETEPERMISSION_URL+id)