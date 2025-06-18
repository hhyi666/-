<template>
    <Category :scene="scene" />
    <el-card style="margin: 15px 0;">
        <!-- v-if v-show 都可以 v-if比较耗费性能 -->
        <div v-show="scene === 0">
            <el-button type="primary" icon="Plus" style="width: 100px;background-color: skyblue;"
                :disabled="categoryStore.C3Id ? false : true" @click="addSpu">添加SPU</el-button>
            <el-table style="margin: 10px 0px;" border :data="records">
                <el-table-column label="序号" align="center" width="80px" type="index"></el-table-column>
                <el-table-column label="SPU名称" prop="spuName"></el-table-column>
                <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作">
                    <!-- 已有的spu对象 -->
                    <template #="{ row, $index }">
                        <el-button @click="addSku(row)" type="primary" icon="Plus" title="添加SKU"
                            style="width: 30px;"></el-button>
                        <el-button @click="updateSpu(row)" type="primary" icon="Edit" title="修改SKU"
                            style="width: 30px;"></el-button>
                        <el-button @click="showSku(row)" type="primary" icon="Search" title="查看SKU"
                            style="width: 30px;"></el-button>
                        <!-- <el-button icon="delete"></el-button> -->
                        <el-popconfirm @confirm="deleteSpu(row)" :title="`确定删除${row.spuName}吗？`">
                            <!-- 没有这个可能导致样式的冲突 -->
                            <template #reference>
                                <el-button type="primary" title="删除SKU" style="width: 30px;" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="pageNo" :page-sizes="[3, 5, 7, 9]" v-model:page-size="pageSize"
                layout="prev, pager, next, jumper,->,sizes,total" :total="total" :background="true"
                @current-change="getHasSpu" @size-change="changeSize">
                <!-- 信息条数发生变化的时候也会进行更新 -->
            </el-pagination>
        </div>
        <!-- 添加和修改SPU组件 -->
        <spuForm ref="SpuForm" v-show="scene === 1" @changeScene="changeScene"></spuForm>
        <!-- 添加Sku组件-->
        <skuForm ref="SkuForm" v-show="scene === 2" @changeScene="changeScene"></skuForm>
        <!-- dialog对话框 展示已有的sku -->
        <el-dialog title="SKU列表" v-model="show">
            <el-table border :data="SkuArr">
                <el-table-column label="sku名字" prop="skuName"></el-table-column>
                <el-table-column label="sku价格" prop="price"></el-table-column>
                <el-table-column label="sku重量" prop="weight"></el-table-column>
                <el-table-column label="sku图片">
                    <template #="{ row, $index }">
                        <img :src="row.skuDefaultImg" style="width: 100px;
                        height: 100px;" alt="">
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </el-card>
</template>

<script setup lang="ts">
import type { HasSpuResponseData, Records, skuData } from '@/api/product/spu/type';
import { ref, watch, onBeforeUnmount } from 'vue';
import useCategoryStore from '@/store/modules/category';
import { reqHasSpu, reqSkuList } from '@/api/product/spu/index'
import spuForm from './spuForm.vue';
import skuForm from './skuForm.vue';
import type { SpuData } from '@/api/product/spu/type';
import { reqRemoveSpu } from '@/api/product/spu/index';
import { ElMessage } from 'element-plus';
const categoryStore = useCategoryStore()
let scene = ref<number>(0) //场景0 显示已有的spu结构 
//分页器默认的页码
let pageNo = ref<number>(1)
//每页展示几条数据
let pageSize = ref<number>(3)
//存储SPU的数据
let records = ref<Records>([])
let total = ref<number>(0)
//获取子组件实例 SpuForm
let SpuForm = ref<any>()
let SkuForm = ref<any>()
let SkuArr = ref<skuData[]>([])
let show = ref<boolean>(false)

watch(() => categoryStore.C3Id, () => {
    //保证三级分类ID有了发送请求
    if (!categoryStore.C3Id) return
    getHasSpu()
})
// 此方法执行可以获取某个三级分类下的全部的SPU
const getHasSpu = async (pager = 1) => {
    pageNo.value = pager
    const res: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.C3Id)
    if (res.code === 200) {
        records.value = res.data.records
        total.value = res.data.total
    }
}
//分页器下拉菜单发生变化的时候触发
const changeSize = () => {
    getHasSpu()
}
//添加场景的变化
const addSpu = () => {
    scene.value = 1
    SpuForm.value.initAddSpu(categoryStore.C3Id)  //调用子组件的方法 
}
//子组件绑定的自定义 子组件通知父组件切换场景是0
const changeScene = (obj: any) => {
    scene.value = obj.flag
    //区分更新和添加
    if (obj.params === 'update') {
        getHasSpu(pageNo.value)
    } else {
        getHasSpu()
    }
    //再次获取全部的数据

}
const updateSpu = (row: SpuData) => {
    scene.value = 1 //是因为上面使用的是v-show才能拿到对应的实例 如果使用的是v-if就需要使用nextTick才能那带
    // console.log(SpuForm.value) //拿到子组件的实例  直接调用儿子的方法 不需要使用组件通信来传递信息
    SpuForm.value.initHasSpuData(row)
}
const addSku = (row: SpuData) => {
    //点击添加sku按钮切换成按钮2
    scene.value = 2
    //还要发送请拿到数据
    SkuForm.value.initSkuData(categoryStore.C1Id, categoryStore.C2Id, row)
}
const showSku = async (row: SpuData) => {
    const res = await reqSkuList(row.id as number)
    if (res.code === 200) {
        SkuArr.value = res.data
        show.value = true
    }
}
const deleteSpu = async (row: SpuData) => {
    const res = await reqRemoveSpu(row.id as number)
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        await getHasSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}
// 对应的数据进行清空
onBeforeUnmount(() => {
    //清空仓库中的数据
    categoryStore.$reset()
})
</script>

<style></style>