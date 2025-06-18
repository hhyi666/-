# day6

## 添加更新菜单的静态实现

## 菜单的添加和更新

## 删除菜单的业务的实现

使用接口进行删除

## 首页的搭建

就是样式的搭建

还有就是浮动的使用

## 暗黑模式的切换

直接使用el提供的暗色的主题

使用doucument.doucumentElement 拿到跟组件，拿到对应的样式

使用html.className 设置类名进行切换

## 数据大屏的实现

### 适配的问题

#### 解决方案1：vw vh

使用vw vh进行操作，但是文字的大小不会发生变化

而且还需要进行使用vw vh的计算出具体的位置

#### 解决方案2：scale（推荐）

使用js手动的计算缩放比例（谁小用谁）

拿到对应的实例 使用style进行操作

```ts
    //控制数据大屏的放大和缩小
    let box = document.querySelector('.box')
    // 将数据计算得到之后拽回去
    box.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
    //计算缩放的比例
    function getScale(w=1920,h=1080){
        //根据设备进行操作

        //计算这个放大缩小的比例
        const ww = window.innerWidth / w
        const hh = window.innerHeight / h
        return ww<hh?ww:hh
        // 这样不会进行拉伸操作 使用缩放较少的值 就是较小值
    } 
    // 视口进行变化的时候就会进行更新
    window.onresize = () => {
        box.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
    }
```

### 搭建

主要是体验 echarts 的使用

学会基本的echarts的使用