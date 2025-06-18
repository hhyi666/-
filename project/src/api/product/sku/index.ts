import request from "@/utils/request";
import type { SkuResponseData,SkuInfoData } from "./type";
import { skuInfoData } from "../spu/type";
enum API{
    // 获取已有的商品的数据
    SKU_URL = '/admin/product/list/',
    //商品下架的请求
    SALE_URL = '/admin/product/onSale/',
    //商品上架的请求    
    CANCELSALE_URL = '/admin/product/cancelSale/',
    //获取商品的信息的接口
    SKUINFO_URL = '/admin/product/getSkuInfo/',
    // sku删除操作
    DELETESKU_URL = '/admin/product/deleteSku/'
    //
}

//获取商品sku的接口
export const reqSkuList = (page:number,limit:number) => request.get<any,SkuResponseData>(API.SKU_URL+`${page}/${limit}`)
//商品上架的请求
export const reqSaleSku = (skuId:number) => request.get<any,any>(API.SALE_URL+skuId)
//商品下架的请求
export const reqCancelSaleSku = (skuId:number) => request.get<any,any>(API.CANCELSALE_URL+skuId)
//获取商品的详细信息
export const reqSkuInfo = (spuId:number) => request.get<any,skuInfoData>(API.SKUINFO_URL+spuId)
//删除已有的商品
export const reqRemoveSku = (skuId:number) => request.delete<any,any>(API.DELETESKU_URL+skuId)