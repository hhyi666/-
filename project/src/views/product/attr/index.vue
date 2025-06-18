￥<template>
    <!-- 三级分类全局组件 -->
    <Category :scene="scene" />
    <el-card style="margin: 10px 0px;">
        <div v-show="scene === 0">
            <el-button type="primary" icon="Plus" style="width: 120px;background-color: skyblue;"
                :disabled="categoryStore.C3Id ? false : true" @click="addAttr">添加平台属性</el-button>
            <el-table border style="margin: 10px 0;" :data="AttrArr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性名称" align="center" width="120px" prop="attrName"></el-table-column>
                <el-table-column label="属性值名称" align="center">
                    <!-- 使用插槽来增加tag标签 -->
                    <template #="{ row, $index }">
                        <el-tag v-for="(item, index) in row.attrValueList" :key="item.id">{{ item.valueName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="属性值操作" align="center" width="120px">
                    <!-- row代表已经存在的属性对象 -->
                    <template #="{ row, $index }">
                        <el-button type="primary" icon="Edit" style="width: 30px;" @click="updataAttr(row)"></el-button>
                        <el-popconfirm :title="`你确定删除${row.attrName}吗?`" width="200px" @confirm="deleteAttr(row.id)">
                            <template #reference>
                                <el-button type="primary" icon="Delete" style="width: 30px;"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="scene === 1">
            <!-- 展示添加属性和修改属性 -->
            <el-form inline>
                <el-form-item label="属性名称">
                    <el-input placeholder="请你输入属性的名称" v-model="attrParams.attrName"></el-input>
                </el-form-item>
            </el-form>
            <el-button @click="addAttrValue" type="primary" icon="Plus" style="width: 130px;background-color: skyblue;"
                :disabled="attrParams.attrName ? false : true">添加属性值</el-button>
            <el-button type="primary" style="width: 130px; border: solid 1px;" @click="cancel">取消</el-button>
            <el-table :data="attrParams.attrValueList" border style="margin: 10px 0;">
                <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
                <el-table-column label="属性值名称" align="center">
                    <!-- row当前的属性值对象 -->
                    <template #="{ row, $index }">
                        <el-input :ref="(vc: any) => inputArr[$index] = vc" v-if="row.flag" @blur="toLook(row, $index)"
                            placeholder="请你输入属性值名称" v-model="row.valueName"></el-input>
                        <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
                        <!-- 查看模式 二选一 -->
                    </template>
                </el-table-column>
                <el-table-column label="属性值操作" align="center">
                    <template #="{ row, $index }">
                        <!-- 进行删除 -->
                        <el-button @click="attrParams.attrValueList.splice($index, 1)" type="primary" icon="Delete"
                            style="width: 30px;"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 进行按钮的禁用 -->
            <el-button :disabled="attrParams.attrValueList.length > 0 ? false : true" type="primary"
                style="width: 100px;background-color: skyblue;" @click="save">保存</el-button>
            <el-button type="primary" style="width: 100px;background-color: skyblue;" @click="cancel">取消</el-button>
        </div>
    </el-card>
</template>

<script setup lang="ts">
// 使用watchi进行监听
import { watch, ref, reactive, nextTick,onBeforeUnmount } from 'vue';
import useCategoryStore from '@/store/modules/category';
import { reqAddOrUpdataAttr, reqAttr, reqRemoveAttr } from '@/api/product/attr';
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type';
import { ElMessage } from 'element-plus';
let categoryStore = useCategoryStore()
//存储已有的属性与属性值
let AttrArr = ref<Attr[]>([])
//用来控制卡片的变化
let scene = ref<number>(0) // 0显示table 1显示添加
//监听仓库三级分类id的变化
watch(() => categoryStore.C3Id, () => {
    //清空原有的数据
    AttrArr.value = []
    //保证三级分类存在才能发消息
    if (!categoryStore.C3Id) return
    getAttr()
})
//获取已有的属性和方法
const getAttr = async () => {
    const { C1Id, C2Id, C3Id } = categoryStore
    const res: AttrResponseData = await reqAttr(C1Id, C2Id, C3Id)
    if (res.code === 200) {
        AttrArr.value = res.data
    }
}
const addAttr = () => {
    //添加新的属性的时候 需要机型数据的清除 原来的业务要进行清除
    Object.assign(attrParams, {
        attrName: '',
        attrValueList: [],
        categoryId: categoryStore.C3Id,
        categoryLevel: 3,
    })
    scene.value = 1
}
const updataAttr = (row: Attr) => {
    scene.value = 1

    //将已有的属性对象赋值给attrParams 这是浅拷贝（操作同一个对象）的东西
    //我们呢需要进行深拷贝 来进行操作 不会对原数据进影响 使用JSO来实现深拷贝 防止影响
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
const cancel = () => {
    scene.value = 0
}
//收集新增数据的属性
let attrParams = reactive<Attr>({
    attrName: '', //属性的名字
    attrValueList: [], //属性值数组
    categoryId: '',
    categoryLevel: 3, //给三级分类
})
const addAttrValue = () => {
    //点击添加 向数组添加属性值对象
    attrParams.attrValueList.push({
        valueName: '',
        flag: true, //控制编辑模式和查看模式的更换
    })
    //添加最后的input组件 实现聚焦操作
    nextTick(() => {
        inputArr.value[attrParams.attrValueList.length - 1].focus()
    })
}
//保存按钮的回调
const save = async () => {
    //参数收集完毕
    //发送请求
    const res = await reqAddOrUpdataAttr(attrParams)
    if (res.code === 200) {
        //切换场景
        scene.value = 0
        ElMessage({
            type: 'success',
            message: attrParams.id ? '修改成功' : '添加成功'
        })
        //获取全部的已有的属性和新增属性值

    } else {
        ElMessage({
            type: 'error',
            message: attrParams.id ? '修改失败' : '添加失败'
        })
    }
}
//失去焦点的时候进行变化
const toLook = (row: AttrValue, $index: number) => {
    //非法情况的判断
    if (row.valueName.trim() === '') {
        //删除属性值是空的东西
        attrParams.attrValueList.splice($index, 1)
        ElMessage({
            type: 'error',
            message: '属性值不能为空',
        })
        return
    }
    //非法情况二
    let repeat = attrParams.attrValueList.find((item) => {
        //判断的时候不能判断自己
        if (item != row) {
            return item.valueName === row.valueName
        }
    })
    if (repeat) {
        attrParams.attrValueList.splice($index, 1)
        ElMessage({
            type: 'error',
            message: '属性值不能重复',
        })
        return
    }
    //相应的flag标记变成false
    row.flag = false
}
//再次切换回来
const toEdit = (row: AttrValue, $index: number) => {
    row.flag = true
    //响应式数据发生变化 拿到对应的数据
    nextTick(() => {
        inputArr.value[$index].focus()
    })
}
//准备数组存储Elinput的组件实例
let inputArr = ref<any>([])
//ref 也可以拿对应的组件实例
//删除已有的属性
const deleteAttr = async (attrid: number) => {
    const res: any = await reqRemoveAttr(attrid)
    console.log(res)
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        //获取已有的属性值
        getAttr()
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}
//路由组件销毁的时候 将仓库中的数据进行清空
onBeforeUnmount(() => {
    //内置的方法 用来清空仓库中的数据 
    //注意使用组合式API的时候 reset函数需要自己进行设置
    categoryStore.$reset()
})
</script>


<style scoped></style>