<template>
    <el-card>
        <el-table border style="margin: 10px 0px;" :data=skuArr>
            <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
            <el-table-column label="名称" align="center" show-overflow-tooltip width="175px"
                prop="skuName"></el-table-column>
            <el-table-column label="描述" align="center" show-overflow-tooltip width="175px"
                prop="skuDesc"></el-table-column>
            <el-table-column label="默认图片" align="center" width="175px">
                <template #="{ row, $index }">
                    <img :src="row.skuDefaultImg" style="width: 100px;
                    height: 100px;" alt="加载失败">
                </template>
            </el-table-column>
            <el-table-column label="重量(g)" align="center" width="175px" prop="weight"></el-table-column>
            <el-table-column label="价格(￥)" align="center" width="175px" prop="price"></el-table-column>
            <!-- fixed将组件进行固定 -->
            <el-table-column label="操作" align="center" width="300px" fixed="right">
                <template #="{ row, $index }">
                    <el-button @click="updateSale(row)" :icon="row.isSale ? 'Bottom' : 'Top'" type="primary"
                        style="width: 25px;"></el-button>
                    <el-button @click="updateSku" icon="Edit" type="primary" style="width: 25px;"></el-button>
                    <el-button @click="findSpu(row)" icon="InfoFilled" type="primary" style="width: 25px;"></el-button>
                    <el-popconfirm @confirm="deleteSku(row)" :title="`你确定删除${row.skuName}吗？`">
                        <template #reference>
                            <el-button icon="Delete" type="primary"
                                style="width: 25px;"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" :page-sizes="[10, 20, 30, 40]" v-model:page-size="pageSize"
            @size-change="handler" @current-change="getHasSku" layout="prev, pager, next, jumper,->,sizes,total"
            :total="total" background>
        </el-pagination>
        <!-- 抽屉组件 展示商品的详情 -->
        <el-drawer v-model=drawer>
            <template #header>
                <h4>查看商品详情</h4>
            </template>
            <template #default>
                <el-row style="margin: 10px 0px;">
                    <el-col :span="6">名称：</el-col>
                    <el-col :span="18">{{ skuInfo.skuName }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0px;">
                    <el-col :span="6">描述：</el-col>
                    <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0px;">
                    <el-col :span="6">价格：</el-col>
                    <el-col :span="18">{{ skuInfo.price }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0px;">
                    <el-col :span="6">平台属性：</el-col>
                    <el-col :span="18">
                        <el-tag v-for="item in skuInfo.skuAttrValueList" :key="item.id" style="margin: 5px 5px;">{{
                            item.valueName }}</el-tag>
                    </el-col>
                </el-row>
                <el-row style="margin: 10px 0px;">
                    <el-col :span="6">销售属性：</el-col>
                    <el-col :span="18">
                        <el-tag type="danger" v-for="item in skuInfo.skuSaleAttrValueList" :key="item.id"
                            style="margin: 5px 5px;">{{ item.saleAttrValueName }}</el-tag>
                    </el-col>
                </el-row>
                <el-row style="margin: 10px 0px;">
                    <el-col :span="6">商品图片：</el-col>
                    <el-col :span="18">
                        <!-- 枚举图片的类型 -->
                        <el-carousel :interval="4000" type="card" height="200px">
                            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                                <img :src="item.imgUrl" alt="">
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                </el-row>
            </template>
        </el-drawer>
    </el-card>
</template>

<script setup lang="ts">
import { reqRemoveSku, reqSkuInfo, reqCancelSaleSku, reqSaleSku, reqSkuList } from '@/api/product/sku';
import { SkuResponseData, SkuInfoData } from '@/api/product/sku/type';
import { skuData } from '@/api/product/sku/type';
import { skuInfoData } from '@/api/product/spu/type';
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue';
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)
let skuArr = ref<skuData[]>([])
let drawer = ref<boolean>(false)
let skuInfo = ref<skuData>({})
const getHasSku = async (pager = 1) => {
    //当前的页码 默认事第一页
    pageNo.value = pager
    const res: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
    if (res.code === 200) {
        total.value = res.data.total
        skuArr.value = res.data.records
    }
}
onMounted(() => {
    getHasSku()
})
//因为上面已经双向绑定了 监听改变 所以不需要再单独的进行数值的更改 直接发送请求就行
const handler = () => {
    getHasSku()
}
const updateSale = async (row: skuData) => {
    if (row.isSale) {
        await reqCancelSaleSku(row.id as number)
        ElMessage({
            type: 'success',
            message: '下架成功'
        })
        getHasSku(pageNo.value)
    } else {
        await reqSaleSku(row.id as number)
        ElMessage({
            type: 'success',
            message: '上架成功'
        })
        getHasSku(pageNo.value)
    }
}
const updateSku = () => {
    ElMessage({
        type: 'success',
        message: '正在开发中~~~'
    })
}
const findSpu = async (row: skuData) => {
    drawer.value = true
    const res: skuInfoData = await reqSkuInfo(row.id as number)
    if (res.code === 200) {
        skuInfo.value = res.data as skuData
        console.log(skuInfo.value)
    }
}
const deleteSku = async (row:skuData) => {
    const res = await reqRemoveSku(row.id as number)
    if(res.code === 200){
        ElMessage({
            type : 'success',
            message : '删除成功'
        })
        //获取删除之后的数据  选择选中的数据
        getHasSku(skuArr.value.length>1?pageNo.value:pageNo.value-1)
    }else{
        ElMessage({
            type : 'error',
            message : '删除失败'
        })
    }
}
</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>