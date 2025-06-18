# day7

## 菜单权限和按钮设置（重要）

就是实现不同的角色具有不同的权限 管理的权限

超级管理员 ： 全部的权限

其他角色： 具有不同的权限和职责

不同人的权限是不同的能够访问到的数据权限是不一样的

```
/login
/home
/screen
/acl{
	/uesr
	/role
	/permission
}
/product{
	/trademark
	/attr
	/sku
	/spu
}
/404
/任意路由
```

### 1.拆分路由

拆分权限

拆分静态路由（都可以访问到的）

```
/login , /home, /screen , /404 ,
```

异步路由（特定的可以进行访问）

```
 /acl /product /任意路由
```

###  2.菜单权限开发的思路

目前任意用户看的都是一样的

我们可以使用异步路由进行展示

新建数组，将传的数据中的route进行过滤，将不需要的路由过滤出去

将共有的路由救和任意路由进行路由的注册 addroute（）

但是可能会存在深拷贝的问题我们看可以使用lodash插件中

Clonedeep的函数解决进行深拷贝 解决问题

当我们动态添加路由的时候可能，还没有添加成功，就访问页面了 这时候我们可以再路由守卫的地方进行设置

使用`next({...to})` 保证加载成功之后在进行访问

## 全局组件的设置和使用

### 建立全局插件组件

通常设置一个directive来存放出对应的要进行使用的自定义插件

在main.ts文件中引入这个方法进行使用将 app传进来

### mount使用可以进行相应的操作

```ts
export const isHasButtoon = (app:any) => {
    
    // 全局的自定义指令 实现自定义指令
    app.directive('has',{
        // 使用这个全局DOM或者组件挂载完毕的时候执行一次 options就是后面的数据
        mounted(el:any,options:any){ //对应的DOM元素
            if(userStore.buttons.includes(options.value)){
                el.parentNode.removeChild(el)
            }
        }
    })
}
```

### v-自定义插件的民名字

直接在标签中进行使用就行

## 项目最后进行打包上线

相应的配置进行更改

## 项目的上线操作

### 有一台自己的服务器

### 使用对应的工具进行操作

### 需要使用nginx服务