import request from "@/utils/request";
var API;
(function (API) {
    // 获取已有的商品的数据
    API["SKU_URL"] = "/admin/product/list/";
    //商品下架的请求
    API["SALE_URL"] = "/admin/product/onSale/";
    //商品上架的请求    
    API["CANCELSALE_URL"] = "/admin/product/cancelSale/";
    //获取商品的信息的接口
    API["SKUINFO_URL"] = "/admin/product/getSkuInfo/";
    // sku删除操作
    API["DELETESKU_URL"] = "/admin/product/deleteSku/";
    //
})(API || (API = {}));
//获取商品sku的接口
export const reqSkuList = (page, limit) => request.get(API.SKU_URL + `${page}/${limit}`);
//商品上架的请求
export const reqSaleSku = (skuId) => request.get(API.SALE_URL + skuId);
//商品下架的请求
export const reqCancelSaleSku = (skuId) => request.get(API.CANCELSALE_URL + skuId);
//获取商品的详细信息
export const reqSkuInfo = (spuId) => request.get(API.SKUINFO_URL + spuId);
//删除已有的商品
export const reqRemoveSku = (skuId) => request.delete(API.DELETESKU_URL + skuId);
