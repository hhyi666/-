//书写品牌管理模块的接口
import request from "@/utils/request";
//品牌接口地址
var API;
(function (API) {
    API["TRADEMARK_URL"] = "/admin/product/baseTrademark/";
    //添加品牌的接口
    API["ADDTRADE_MARK"] = "/admin/product/baseTrademark/save";
    //修改品牌的接口
    API["UPDATETRADEMARK_URL"] = "/admin/product/baseTrademark/update";
    //删除
    API["DELETE_URL"] = "/admin/product/baseTrademark/remove/";
})(API || (API = {}));
//获取已有品牌的接口方法
//page 获取第几页
//limit 获取几个已有品牌的数据
export const reqHasTrademark = (page, limit) => request.get(API.TRADEMARK_URL + `${page}/${limit}`);
//添加和修改已经有的品牌的方法
export const reqAddOrUpdateTradeMark = (data) => {
    if (data.id) {
        return request.put(API.UPDATETRADEMARK_URL, data);
    }
    else {
        //新增品牌
        return request.post(API.ADDTRADE_MARK, data);
    }
};
//删除已有的品牌
export const reqDeleteTrademark = (id) => request.delete(API.DELETE_URL + id);
