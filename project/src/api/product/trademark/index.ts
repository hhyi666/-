//书写品牌管理模块的接口
import request from "@/utils/request";
import type { TradeMarkResponseData, TradeMark } from "./type";
//品牌接口地址
enum API {
    TRADEMARK_URL = '/admin/product/baseTrademark/',
    //添加品牌的接口
    ADDTRADE_MARK = '/admin/product/baseTrademark/save',
    //修改品牌的接口
    UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
    //删除
    DELETE_URL = '/admin/product/baseTrademark/remove/'
}
//获取已有品牌的接口方法
//page 获取第几页
//limit 获取几个已有品牌的数据
export const reqHasTrademark = (page: number, limit: number) => request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)

//添加和修改已经有的品牌的方法
export const reqAddOrUpdateTradeMark = (data: TradeMark) => {
    if (data.id) {
        return request.put<any,any>(API.UPDATETRADEMARK_URL,data)
    } else {
        //新增品牌
        return request.post<any,any>(API.ADDTRADE_MARK,data)
    }
}

//删除已有的品牌
export const reqDeleteTrademark = (id:number) => request.delete<any,any>(API.DELETE_URL + id)