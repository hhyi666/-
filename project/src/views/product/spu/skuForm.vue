<template>
    <el-form label-width="80px">
        <el-form-item label="SKU名称">
            <el-input placeholder="请输入SKU的名称" v-model="skuParams.skuName"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input placeholder="价格(元)" type="number" v-model="skuParams.price"></el-input>
        </el-form-item>
        <el-form-item label="重量(g)">
            <el-input placeholder="重量(g)" type="number" v-model="skuParams.weight"></el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input placeholder="SKU描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form inline>
                <el-form-item v-for="(item, index) in attrArr" :key="item.id" :label="item.attrName">
                    <el-select v-model="item.attrIdAndValueId" style="width: 100px;">
                        <!-- 暂时收集到item当中 处理的较简单 使用v-model进行收集-->
                        <el-option v-for="(attrValue, index) in item.attrValueList" :key="attrValue.id"
                            :label="attrValue.valueName" :value="`${item.id}:${item.attrValue.id}`"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form inline>
                <el-form-item v-for="(item, index) in saleArr" :key="item.id" :label="item.saleAttrName">
                    <el-select v-model="item.saleIdAndValueId" style="width: 100px;">
                        <el-option :value="`${item.id}:${item.saleAttrValue.id}`"
                            v-for="(saleAttrValue, index) in item.spuSaleAttrValueList" :key="saleAttrValue.id"
                            :label="saleAttrValue.saleAttrValueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border :data="imgArr" ref="table">
                <el-table-column type="selection" width="80px" align="center"></el-table-column>
                <el-table-column label="图片">
                    <template #="{ row, $index }">
                        <img :src="row.imgUrl" style="width: 100px;height: 100px;" alt="">
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <!-- 设置默认的图片 -->
                        <el-button @click="handler(row)" type="primary"
                            style="width: 50px;background-color: skyblue;">设置默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <!-- 使用el-form-item进行表示行的数据 -->
        <el-form-item>
            <el-button @click="save" type="primary" style="width: 80px; background-color: skyblue;">保存</el-button>
            <el-button @click="cancel" type="primary" style="width: 80px; background-color: skyblue;">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
//发送请求 图片的名称 销售属性 平台属性
import { reqAddSku, reqSpuImageList, reqSpuHasSaleAttr } from '@/api/product/spu'; //获取图片属性
import { reqAttr } from '@/api/product/attr'; //获取平平台的属性
import { reactive, ref } from 'vue';
import type { skuData } from '@/api/product/spu/type';
import { ElMessage } from 'element-plus';
const cancel = () => {
    //添加的时候不需要再次发送请求
    $emit('changeScene', { flag: 0, params: '' })
}
const attrArr = ref<any>([])
const saleArr = ref<any>([])
const imgArr = ref<any>([])
//搜集参数
let skuParams = reactive<skuData>({
    category3Id: '',
    spuId: '',
    tmId: '',
    skuName: '',
    price: '',
    weight: '',
    skuDesc: '',
    skuAttrValueList: [

    ],
    skuSaleAttrValueList: [

    ],
    skuDefaultImg: '',
})
//获取table组件的实例
let table = ref<any>()
//设置默认图片的回调
const handler = (row: any) => {
    //点击全部的不进行选中 选中的才进行勾选
    imgArr.value.forEach((item: any) => {
        table.value.toggleRowSelection(item, false)
    })
    //复选框选中
    table.value.toggleRowSelection(row, true)
    skuParams.skuDefaultImg = row.imgUrl
}
// 收集数据并进行展示
const initSkuData = async (C1Id: number | string, C2Id: number | string, spu: any) => {
    //获取平台熟悉感
    const res1 = await reqAttr(C1Id, C2Id, spu.category3Id)
    //获取销售属性的数据
    const res2 = await reqSpuHasSaleAttr(spu.id)
    //获取图墙的数据
    const res3 = await reqSpuImageList(spu.id)
    attrArr.value = res1.data
    saleArr.value = res2.data
    imgArr.value = res3.data
    //原本数据的收集
    skuParams.category3Id = spu.category3Id
    skuParams.spuId = spu.id
    skuParams.tmId = spu.tmId
}
//收集参数发送到服务器 证明增加的数据
//数据的收集
const save = async () => {
    //整理参数
    //平台属性 数组里面添加的id分别都是一对一的关系 prev是累加器 next是当前的数据 切割之后可以放到prev当中
    //[]表示初始值是空数组
    skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
        if (next.attrIdAndValueId) {
            let [attrId, valueId] = next.attrIdAndValueId.split(':')
            prev.push({
                attrId, valueId
            })
        }
        return prev
    }, [])

    //销售属性
    skuParams.skuSaleAttrValueList = saleArr.value.reduce((prev: any, next: any) => {
        if (next.saleIdAndValueId) {
            let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
            prev.push({
                saleAttrId, saleAttrValueId
            })
        }
        return prev
    })

    //发送请求进行更新
    const res = await reqAddSku(skuParams)
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '添加成功'
        })
        // 成功之后切换对象
        $emit('changeScene',{flag:0,params:''})
    } else {
        ElMessage({
            type: 'error',
            message: '添加失败'
        })
    }
}
let $emit = defineEmits(['changeScene'])
defineExpose({ initSkuData })
</script>

<style></style>