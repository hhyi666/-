# day1

## svg图标的使用和封装

- 安装使用svg图标的响应的插件（AI）就行
- 拿到对应的Svg图标
- 封装组件，便于直接调用
- ![image-20250607094854322](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20250607094854322.png)

- 使用defineProps实现参数的传递

- 子组件

  ```ts
  defineProps({
      //xlink-href 属性的前缀
      prefix : {
          type : String,
          default : '#icon-'
      },
      name : String,
      //接收父组件传递的元素
      color : {
          type : String,
          default : ''
      },
      //接收父组件传递的图标的宽度和高度
      height : {
          type : String,
          default : '10px',
      },
      width : {
          type : String,
          default : '10px',
      }
  })
  ```

  

## svg组件定义全局组件

自定义插件的使用

多次使用的时候，需要多次调用，这样的话直接建立对应的全局组件，这样就不需要一次一次的单独引入

在main.ts中的文件进行全局组件的注册

在需要注册全局组件的地方设置一个统一的出口，这样就不需要单独进行设置，更加的方便

```ts
//对外暴露插件对象
//引入项目中的全部全局组件
import SvgIcon from '@/components/SvgIcon/index.vue'
import  Pagination  from  '@/components/Pagination/index.vue'
import { Component,defineAsyncComponent } from 'vue'
// console.log(SvgIcon,Pagination) //对象
// console.log(Object.keys(allGlobalComponents))

//增加类型断言防止出错
const allGlobalComponents: Record<string, Component> = {
  SvgIcon: defineAsyncComponent(() => import('@/components/SvgIcon/index.vue')),
  Pagination : defineAsyncComponent(() => import('@/components/Pagination/index.vue'))
}
export default {
    //务必叫做install方法
    install(app:any){
        //注册所有的全局组件
        Object.keys(allGlobalComponents).forEach(key => {
            //组件注册成全局组件
            app.component(key,allGlobalComponents[key] as Component)
        })
    }
}
```

## 集成sass

可以用来添加全局的样式

创建一个文件，用来存储全局的样式

然后全局进行配置之下

```ts
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/style/variable.scss" as *;` // 现代语法推荐
      }
    }
  }
```

我们可以设置一个特殊的文件来储存我们想要特殊处理的文件

使用上面的配置进行配置 就是文件的名字

![image-20250607120118783](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20250607120118783.png)

自己定义想要的名字和样式

## mock数据

安装 用来使用mock接口

```
pnpm add mockjs
pnpm add vite-plugin-mock -D
```

在vite.config.ts中进行配置

```ts
viteMockServe({
      // default
      mockPath: 'mock',
      enable: true, //保证开发的时候可以使用mock的接口
    }),
```

之后创建mock文件

放入数据和发送请求的返回值

直接就能使用假接口进行网络请求

![image-20250607122712857](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20250607122712857.png)

配置假的接口 就能发送请求和获取信息

## axios的二次封装

开发的时候通常会做二次封装

目的：

- 使用请求拦截器，可以在请求拦截器中处理一些业务（开始进度条，请求头携带的公共参数）
- 使用响应拦截器：可以在响应拦截器中处理一些业务（进度条的结束，简化服务器的返回值）
- 能够实现更多的业务

axios的二次封装 更加的方便操作请求头和响应头

```ts
//进行axios的二次封装
//目的：使用请求和响应拦截器 进行更多的操作
import axios from "axios";
import { ElMessage } from "element-plus";

//利用axios的对象的create方法进行创建实例(可以进行配置别的数据)
let request = axios.create({ //基础配置
    //基础路径
    baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径会携带 /api
    timeout: 5000, //超时时间的设置

})
//添加请求和响应拦截器
request.interceptors.request.use((config) => {
    //config配置对象 有一个headers属性请求头 经常给服务器端携带公共的参数
    //一定记得进行config返回
    return config
})

request.interceptors.response.use((response) => {
    //简化数据 成功的回调
    return response.data
}, (error) => {
    return Promise.reject(error)
})
export default request

```

直接使用request进行操作就行

## API接口的统一使用

统一的管理项目接口

将需要使用的接口放进一个文件当中

将需要的发送接口函数的东西放进一个文件当中进行操作

![image-20250608191946789](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20250608191946789.png)

![image-20250608191954998](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20250608191954998.png)

比如我将用户发送请求的api封装到了一个文件当中



## 注意：可以尝试的求使用type进行定义ts的类型

## 路由的配置

- 一级路由 login
- 一级路由用来进行展示

- 访问错误的404模板的路由

基本的步骤

- 创建router文件进行路由的配置
- 配置完成之后再main.ts中进路由的注册
- 最后测试有没有注册成功就行