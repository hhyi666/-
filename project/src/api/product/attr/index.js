import request from "@/utils/request";
//属性管理地址
var API;
(function (API) {
    API["C1_URL"] = "/admin/product/getCategory1";
    API["C2_URL"] = "/admin/product/getCategory2/";
    API["C3_URL"] = "/admin/product/getCategory3/";
    API["ATTR_URL"] = "/admin/product/attrInfoList/";
    //添加或者修改已有的属性的接口
    API["ADDORUPDATEATTR_URL"] = "/admin/product/saveAttrInfo";
    //删除属性地址
    API["DELETEATTR_URL"] = "/admin/product/deleteAttr/";
})(API || (API = {}));
export const reqC1 = () => request.get(API.C1_URL);
export const reqC2 = (id) => request.get(API.C2_URL + id);
export const reqC3 = (id) => request.get(API.C3_URL + id);
export const reqAttr = (id1, id2, id3) => request.get(API.ATTR_URL + `${id1}/${id2}/${id3}`);
//新增或者修改已有的属性接口
export const reqAddOrUpdataAttr = (data) => request.post(API.ADDORUPDATEATTR_URL, data);
//删除属性业务
export const reqRemoveAttr = (id) => request.delete(API.DELETEATTR_URL + id);
