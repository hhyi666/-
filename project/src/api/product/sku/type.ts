export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

//Sku对象的ts类型
export interface attr {
    id ?: string|number,
    attrId: number | string,
    valueId: number | string,
    valueName : string,
    imgUrl?:string
}
export interface saleAttr {
    id ?: string|number,
    saleAttrValueName : string,
    saleAttrId: number | string,
    saleAttrValueId: number | string,
}
//sku的类型
export interface skuData {
    category3Id?: string | number,
    spuId?: string | number,
    tmId?: string | number,
    skuName?: string,
    price?: string | number,
    weight?: string,
    skuDesc?: string,
    skuAttrValueList?: attr[],
    skuSaleAttrValueList?: saleAttr[],
    skuDefaultImg?: string,
    isSale ?: number,
    id ?: string|number,
    skuImageList?:attr[],
}

//接口返回数据的类型
export interface SkuResponseData extends ResponseData {
    data: {
        records: skuData[],
        total: number,
        size: number,
        current: number,
        orders: [],
        optimizeCountSql: boolean,
        hitCount: boolean,
        countId: null,
        maxLimit: null,
        searchCount: boolean,
        pages: number
    }
}

//详细信息的接口返回的类型
export interface SkuInfoData extends ResponseData{
    data : skuData
}