# day5

## SKU静态的添加

还是使用到了emit进行父子组件之间的通信

调用函数实现通信

## SKU数据的获取

就是在父组件的地方使用子组件的方法来获取数据并进行展示

el-tabel-column的方式可以使用插槽的方式进行展示

```ts
<el-table-column label="操作">
                    <template #="{row,$index}">
                        <el-button type="primary" style="width: 50px;background-color: skyblue;">设置默认</el-button>
                    </template>
                </el-table-column>
```

## 收集新增的Sku的数据

考验的的是数据整理的能力

整理数据发送请求

## 展示SKU组件

使用dialog进行展示

data是要展示数组对象

el-table-column  展示的数据的列数 prop展示的具体的数据

可以放置template插槽进行展示

## sku静态模块的搭建

el组件的使用

## 上架和下架的操作

## 商品详情的静态展示

## 发送请求拿到商品的详细信息

发送删除的请求

直接删除 最后重新拿到数据就行

## 用户管理的静态搭建

就是学会复习使用flex的使用 实现两边分配

form中使用flex 使用justify-content 和align-items 

## 添加用户管理模块的静态搭建

## 添加新账号的业务

## 用户表单校验

复习表单检验的功能的使用 

在表单的地方使用 

```ts
:model="userParams" :rules="rules"
```

对校验的东西和检验的规则进行绑定

在表单项中使用prop使用 来对表单中的信息（检查信息）进行绑定

rules的使用

尽量使用blur change在一些情况中回出现问题

```ts
const rules: any = {
    username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
    name: [{ required: true, trigger: 'blur', validator: validatorName }],
    password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}
```

在发送验证的地方使用ref拿到的表单的实例

使用 来证明表单检查是否通过 

```
 await formRef.value.vilidate()
```

## 更新账号业务的添加

当我们对自己的账号进行修改的时候，我们可以使用

window.location.reload() 进行浏览器的刷新 跳到登录页

## 添加用户和修改用户的注意事项

触发浏览器刷新回到第一页

## 分配角色的静态搭建

学会复选框的使用

## 分配角色的业务

就是发送请求进行数据的更改

## 删除业务的实现

发送请求完成就行

## 搜索重置业务的实现

就是在仓库中设置刷新的东西

监听到刷新就会刷新

## 角色管理的静态的搭建

## 添加角色的静态搭建

## 分配权限的静态搭建

## 分配权限的动态的数据的获取

使用query的时候是在url的后面加上 ？+key value进行展示

以及学会使用递归的形式来获取东西

学会使用树形组件的使用

## 菜单管理模块的实现

可以折叠的table

菜单管理的东西

这里能够拿到对应的权限的设置 实现对应的内容

## 已有菜单的进行展示

还是树形组件的使用 

数据放到正确的位置



