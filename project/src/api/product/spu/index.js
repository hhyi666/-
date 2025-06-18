import request from "@/utils/request";
var API;
(function (API) {
    //获取SPU数据
    API["HASSPU_URL"] = "/admin/product/";
    // 获取全部品牌的数据
    API["ALLTRADEMARK_URL"] = "/admin/product/baseTrademark/getTrademarkList";
    //某一个spu照片的的数据接口
    API["IMAGE_URL"] = "/admin/product/spuImageList/";
    //获取spu销售属性的接口
    API["SPUHASSALEATTR_URL"] = "/admin/product/spuSaleAttrList/";
    //获取整个项目的全部的销售属性
    API["ALLSALEATTR_URL"] = "/admin/product/baseSaleAttrList";
    //添加新的spu
    API["ADDSPU_URL"] = "/admin/product/saveSpuInfo";
    //更新已有的SPU
    API["UPDATESPU_URL"] = "/admin/product/updateSpuInfo";
    //追加添加的Sku的数据
    API["ADDSKU_URL"] = "/admin/product/saveSkuInfo";
    //查看sku售卖的商品
    API["SKUINFO_URL"] = "/admin/product/findBySpuId/";
    //删除spu组件
    API["REMOVESPU_URL"] = "/admin/product/deleteSpu/";
})(API || (API = {}));
//获取三级分类下SPU的数据
export const reqHasSpu = (page, limit, category3Id) => request.get(API.HASSPU_URL + `${page}/${limit}/?category3Id=${category3Id}`);
//获取全部的spu品牌的数据
export const reqAllTrademark = () => request.get(API.ALLTRADEMARK_URL);
//获取照片的接口
export const reqSpuImageList = (id) => request.get(API.IMAGE_URL + id);
//获取销售属性的方法
export const reqSpuHasSaleAttr = (id) => request.get(API.SPUHASSALEATTR_URL + id);
//获取全部的销售属性
export const reqAllSaleAttr = () => request.get(API.ALLSALEATTR_URL);
//添加新的SPU接口 data就是新增的SPU对象 | 或者已有的SPU对象
export const reqAddOrUpdateSpu = (data) => {
    // 如果SPU对象拥有ID 更新已有的SPU
    if (data.id) {
        return request.post(API.UPDATESPU_URL, data);
    }
    else { //没有就是新增的SPU对象
        return request.post(API.ADDSPU_URL, data);
    }
};
//新增的Sku的组件
export const reqAddSku = (data) => request.post(API.ADDSKU_URL, data);
//查看Spu中的Sku的组件中的数据
export const reqSkuList = (spuId) => request.post(API.SKUINFO_URL + spuId);
//删除已有的Spu
export const reqRemoveSpu = (spuId) => request.delete(API.REMOVESPU_URL + spuId);
