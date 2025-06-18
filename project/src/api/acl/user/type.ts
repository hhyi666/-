export interface ResponseDate {
    code: number,
    message: string,
    ok: boolean
}

//一个用户的ts类型
export interface User {
    id?: number,
    createTime?: string,
    updateTime?: string,
    username: string,
    password: string,
    name: string,
    phone?: null,
    roleName?: string,
}

//数组包含所有的数据
export type Records = User[]
//获取全部的用户信息返回数据ts类型 
export interface UserResponseData extends ResponseDate {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        page: number,
    }
}

//职位返回的数据类型
export interface RoleData {
    id?: number,
    createTime?: string,
    updateTime?: string,
    roleName: string,
    remark: null,
}

export type AllRole = RoleData[]

export interface AllRoleResponseData extends ResponseDate{
    data:{
        assignRoles : AllRole,
        allRolesList : AllRole,
    }
}

//用户分配职位参数的类型
export interface SetRoleData{
    roleIdList : number[],
    userId : number,
}