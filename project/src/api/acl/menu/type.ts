// 数据类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

//菜单数据和按钮数据ts类型
export interface Permission {
    id?: number,
    createTime: string,
    updateTime: string,
    pid: number,
    name: string,
    code: null,
    toCode: null,
    type: number,
    status: null,
    level: number,
    children?: PermissionList,
    select: boolean,
}

export type PermissionList = Permission[]

// 定义接口返回的数据类型
export interface PermissionResponseData extends ResponseData {
    data: PermissionList
}

//添加和修改菜单的ts类型
export interface MenuParams {
    id?: number
    code: string
    level: number
    name: string
    pid : number
}