//进行axios的二次封装
//目的：使用请求和响应拦截器 进行更多的操作
import axios from "axios";
import { ElMessage } from "element-plus";
//引入用户相关的仓库
import { useUserStore } from "@/store/modules/user";

//利用axios的对象的create方法进行创建实例(可以进行配置别的数据)
let request = axios.create({ //基础配置
    //基础路径
    baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径会携带 /api
    timeout: 5000, //超时时间的设置
})
//添加请求和响应拦截器
request.interceptors.request.use((config) => {
    //config配置对象 有一个headers属性请求头 经常给服务器端携带公共的参数
    //可以携带token来证用户信息 将token携带发送请求
    const userStore = useUserStore()
    if(useUserStore().token){
        config.headers.token = userStore.token
    }

    return config
})

request.interceptors.response.use((response) => {
    //简化数据 成功的回调
    return response.data
}, (error) => {
    //失败的回调
    //处理http网络错误
    //定义一个变量 存储网络错误的信息
    let message = ''
    let status = error.response.status
    switch (status) {
        case 401:
            message = 'TOKEN过期'
            break;
        case 403:
            message = '无权访问'
            break;
        case 404:
            message = '请求地址错误'
            break;
        case 500:
            message = '服务器出现问题'
            break;
        default:
            message = '网络出现问题'
            break;
    }

    //提示错误信息
    ElMessage({
        type : 'error',
        message
    });
    return Promise.reject(error)
    //返回错误的回调
})
export default request
