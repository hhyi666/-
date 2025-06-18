//定义用户相关的数据类型
export interface loginFormatData{
    username : number,
    password : number,
}
//定义全部接口共有返回数据的类型
export interface responseData{
    code : number,
    message : string,
    ok : boolean   
}

//定义登录接口返回数据类型
export interface loginResponseData extends responseData{
    data : string
}
//定义获取用户信息返回的数据类型
export interface userInfoResponseData extends responseData{
    data : {
        routes : string[],
        buttons : string[],
        roles : string[],
        name : string,
        avatar : string,
    }
}
