import { responseData } from "@/api/user/type"

//服务器返回的数据类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean,
}

export interface SpuData {
    id?: number,
    spuName: string,
    description: string,
    category3Id: string | number,
    tmId: number | string,
    spuSaleAttrList: null | SaleAttr[],
    spuImageList: null | SpuImg[],
}

// 数组包含的元素都是原有的数据类型
export type Records = SpuData[]
// 定义已有的SPU接口返回的数据ts类型
export interface HasSpuResponseData extends ResponseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number
    }
}

//所有品牌数据的类型
export interface Trademark {
    id: number,
    tmName: string,
    logoUrl: string,

}
//品牌接口i返回的数据类型的ts接口
export interface AllTrademark extends ResponseData {
    data: Trademark[]
}

//商品图片的ts类型
export interface SpuImg {
    id?: number,
    createTime?: string,
    updateTime?: string,
    spuId?: number,
    imgName?: string,
    imgUrl?: string,
    name?: string,
    url?: string,
}
//已有的照片墙的数据类型
export interface SpuHasImg extends ResponseData {
    data: SpuImg[]
}

//销售属性的数据类型
export interface SaleAttrValue {
    id?: number,
    createTime?: null,
    updateTime?: null,
    spuId?: number,
    baseSaleAttrId: number | string,
    saleAttrValueName: string,
    saleAttrName?: string,
    isChecked?: null,
}
//存储已有的销售属性值的数据类型
export type SpuSaleAttrValueList = SaleAttrValue[]
//销售属性对象的ts类型
export interface SaleAttr {
    id?: number,
    createTime?: null,
    updateTime?: null,
    spuId?: number,
    baseSaleAttrId: number | string,
    saleAttrValueName?: string,
    saleAttrName?: string,
    spuSaleAttrValueList: SpuSaleAttrValueList,
    flag?: boolean,
    saleAttrValue?: string,
}
//spu销售属性返回的ts类型
export interface SaleAttrResponseData extends ResponseData {
    data: SaleAttr[]
}

//返回的全部的数据类型
export interface HasSaleAttr {
    id: number,
    name: string,
}
export interface HasSaleAttrResponseData extends ResponseData {
    data: HasSaleAttr[]
}

export interface attr {
    attrId: number | string,
    valueId: number | string,
}
export interface saleAttr {
    saleAttrId: number | string,
    saleAttrValueId: number | string,
}
//sku的类型
export interface skuData {
    category3Id: string | number,
    spuId: string | number,
    tmId: string | number,
    skuName: string,
    price: string | number,
    weight: string,
    skuDesc: string,
    skuAttrValueList?: attr[],
    skuSaleAttrValueList?: saleAttr[],
    skuDefaultImg: string,
}

//获取SKU数据接口的类型
export interface skuInfoData extends responseData{
    data : skuData[]
}