# day2

## 登录界面静态布局的搭建

- 路由的配置
- 基本样式的搭建 使用el进行搭建

## 封装登录业务

- 使用pinia进行数据的保存 和 发送网络请求
- 建立pinia 返回 state + action
- 还有就是按钮样式的使用
  - 比如 prefix-icon 前图片 和loading 加载的样式的使用 

## 仓库数据ts类型的定义

我感觉没啥必要，可能是现在的学的东西太少

感觉有点过度了

就是新建一个文件，将类型放进去，引入设置对应的类型 记得导出

用来作为ts的限制类型

设置type的文件

## 登录时间的判断和封装

使用 new Date进行时间的判断 

并且进行封装使用

使用模板字符串进行操作

## 登录模块表单的校验

提前进行表单的校验

减少后端的麻烦

```js
 <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password"
                            showPassword></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
```

通过设置表单的model的对象和表单的rules进行设置

实例对象的vaildate( ) 是一个Promise对象

await操作 等待结果进行操作

就是前端的进行表单的校验

## 自定义表单的校验

有时复杂的表单规则就需要我们自己进行设置

对更加复杂的进行约束

代码的实现

在校验规则的地方 这么进行定义

```ts
 username: [
        { trigger: 'change', validator: vaildatorUserName }

    ],
```

vaildatorUserName是自己定义的函数

```ts
const vaildatorUserName = (rule, value, callback) => {
    //rule是表单的校验规则对象
    //value 就是表单内容的对象
    //callback 规则放行的函数 调用通过函数 不符合 调用返回错误的信息
    if (value.length >= 5) {
        callback()
    } else {
        callback(new Error('账号的长度至少是5'))
    }
}
```

自定义规则的实现

## layout组件的静态搭建

## Logo组件的封装

设置一个setting文件可以自己进行设置的

使用的地方直接import 就行

## 左侧菜单的静态搭建

学会静态菜单的搭建

折叠菜单的搭建

## 动态的搭建菜单

根据路由进行创建菜单

菜单的动态的创建

学会使用一级菜单和二级菜单的使用方式

学会使用递归的方式进行菜单的创建
递归组件没有设置成功注意需要手动的进行注册组件

```ts
<script lang="ts">
export default {
    name: 'Menu'
}
</script>
```

学会路由的地方能够设置 meta信息 来精确的控制属性

## 菜单图标的设置

使用现成的el组件进行设置

学会全局el图标的引入注册

## 项目全部路由的配置

就是注意路由搭建的位置

注意分辨路由的等级就行

注意将路由绑定的框架设置完整

## 顶部tabber组件的搭建

主要还是i组件的封装

学会flex的使用

## 菜单折叠效果的实现

学会使用动态的添加样式进行操作

```ts
:class="{ fold: layoutSettingStore.fold ? true : false }"
```

像这个就可以动态的添加样式判断是否要进行折叠

css组件写法 表示动态组件

```ts
&.fold {
            width: $base_menu_min_width;
        }
```

学会了collapse折叠效果的使用

可以在菜单组件中进行设置

## 动态展示面包屑组件

使用route拿到对应的路由

里面有个参数 matched 能够拿到对应的不同级别的路由

直接拿到想要的使用 v-for进行循环创建就行

记得添加表标识符 :key

使用 v-show 来表示是否展示 不能使用 v-if

因为v-if的优先级大于v-for

## 刷新业务的实现

通信的手段怎么解决？

考虑放到仓库当中

变化仓库中相应的值 监听从仓库中数据的变化

使用v-if + 参数 来控制销毁和重建操作

使用watch监听仓库中数据的变化

监听到变化 v-if === false 会进行销毁操作

使用nextTick获取到监听到变化的DOM

之后再次将v-if设置成true 相当于重建操作

## 全屏模式的实现

后台展示的界面基本都有全屏模式

绑定监听函数

使用内部的函数进行使用

就是利用DOM的属性和方法实现的



```ts
//全屏按钮点击的回调
const fullScreen = () => {
    //判断是不是全屏 DOM的一个属性 判断是不是全屏
    let full = document.fullscreenElement
    //切换全屏的模式
    if(!full){
        //使用内部的方法实现全屏模式
        document.documentElement.requestFullscreen()
    }else{
        //退出全屏模式
        document.exitFullscreen()
    }
}
```

