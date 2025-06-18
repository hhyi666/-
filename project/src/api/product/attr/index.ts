import request from "@/utils/request";
import type { CategoryResponseData, AttrResponseData, Attr } from "./type";
//属性管理地址
enum API {
    C1_URL = '/admin/product/getCategory1',
    C2_URL = '/admin/product/getCategory2/',
    C3_URL = '/admin/product/getCategory3/',
    ATTR_URL = '/admin/product/attrInfoList/',
    //添加或者修改已有的属性的接口
    ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
    //删除属性地址
    DELETEATTR_URL = '/admin/product/deleteAttr/'
}
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
export const reqC2 = (id: number | string) => request.get<any, CategoryResponseData>(API.C2_URL + id)
export const reqC3 = (id: number | string) => request.get<any, CategoryResponseData>(API.C3_URL + id)
export const reqAttr = (id1: number | string, id2: number | string, id3: number | string) => request.get<any, AttrResponseData>(API.ATTR_URL + `${id1}/${id2}/${id3}`)

//新增或者修改已有的属性接口
export const reqAddOrUpdataAttr = (data: Attr) => request.post<any, any>(API.ADDORUPDATEATTR_URL, data)

//删除属性业务
export const reqRemoveAttr = (id: number) => request.delete<any, any>(API.DELETEATTR_URL + id)