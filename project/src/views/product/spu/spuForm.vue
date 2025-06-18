<template>
    <el-form label-width="100px">
        <el-form-item label="spu名称">
            <el-input v-model="SpuParams.spuName" placeholder="请你输入spu的名称" style="width: 500px;"></el-input>
        </el-form-item>
        <el-form-item label="spu品牌">
            <!-- 找到id定义特定的数据品牌  v-model开始进行展示的-->
            <el-select style="width: 200px;" v-model="SpuParams.tmId">
                <el-option v-for="(item, index) in AllTrademark" :key="item.id" :label="item.tmName"
                    :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="spu描述">
            <el-input type="textarea" placeholder="请你输入spu的描述" v-model="SpuParams.description"></el-input>
        </el-form-item>
        <el-form-item label="spu照片">
            <!-- 上传文件的组件 -->
            <!-- 
                v-model:fileList 就是展示默认图片 imgList 切记这个数据的形式是固定的 url+name才能进行展示
                action 上传图片的接口地址
                list-type 文件列表 展示的类型
                on-preview 预览的钩子
                on-remove 删除的钩子
             -->
            <el-upload v-model:file-list="ImgList" action="/api/admin/product/fileUpload" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handlerUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <!-- dialog图片预览的时候的组件 -->
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>
        <el-form-item label="spu销售属性">
            <el-select v-model="saleAttrIdAndValueName" style="width: 200px;"
                :placeholder="unSelectSaleAttr.length ? `还没有选择的有${unSelectSaleAttr.length}个` : `没有未选择的值`">
                <!-- 放的是属性中没有拿到的值 -->
                <!-- 使用value拿到下拉菜单的属性 和前面使用v-model的值形成呼应拿到对应的值 -->
                <el-option :value="`${item.id}:${item.name}`" v-for="(item, index) in unSelectSaleAttr" :key=item.id
                    :label="item.name"></el-option>
            </el-select>
            <!-- 按钮的禁用 -->
            <el-button type="primary" icon="Plus" :disabled="saleAttrIdAndValueName ? false : true" @click="addSaleAttr"
                style="margin-left: 10px;width: 126px;background-color: skyblue;">添加属性值</el-button>
            <el-table border style="margin: 10px 0px;" :data="SaleAttr">
                <el-table-column width="80px" label="序号" type="index" align="center"></el-table-column>
                <el-table-column label="销售属性名字" width="200px" prop="saleAttrName"></el-table-column>
                <el-table-column label="销售属性值">
                    <!-- 使用插槽插入 -->
                    <!-- row 数组里面的属性对象 -->
                    <template #="{ row, $index }">
                        <!-- 使用tag进行展示  close干掉属性值 -->
                        <el-tag @close="row.spuSaleAttrValueList.splice(index, 1)" style="margin: opx 5px;"
                            v-for="(item, index) in row.spuSaleAttrValueList" :key="item.id" class="mx-1" closable>
                            {{ item.saleAttrValueName }}
                        </el-tag>
                        <!-- 每个属性值不一样，所以每个数据里面都要添加自己的属性值 -->
                        <el-input @blur="toLook(row)" v-model="row.saleAttrValue" v-if="row.flag" placeholder="请你输入属性值"
                            style="width: 100px;"></el-input>
                        <el-button v-else @click="toEdit(row)" type="primary" icon="Plus"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200px">
                    <template #="{ row, $index }">
                        <el-button type="primary" icon="Delete" @click="SaleAttr.splice($index, 1)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <!-- 销售属性放置的地方 -->
            <el-button :disabled="SaleAttr.length > 0" @click="save" type="primary"
                style="margin-left: 10px;width: 100px;background-color: skyblue;">保存</el-button>
            <el-button @click="cancel" type="primary"
                style="margin-left: 10px;width: 100px;background-color: skyblue;">取消</el-button>
        </el-form-item>
        
        <el-form-item></el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import type { AllTrademark, SpuImg, HasSaleAttrResponseData, SaleAttrResponseData, SpuData, SpuHasImg, Trademark, SaleAttr, HasSaleAttr, SaleAttrValue } from '@/api/product/spu/type';
import { reqAddOrUpdateSpu, reqAllTrademark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSaleAttr } from '@/api/product/spu';
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
let $emit = defineEmits(['changeScene'])
//点击取消按钮 通知父组件切换组件 
const cancel = () => {
    $emit('changeScene', {flag:0,params:'update'})
}
//存储spu的数据
const AllTrademark = ref<Trademark[]>([])
const ImgList = ref<SpuImg[]>([])
const SaleAttr = ref<SaleAttr[]>([])
const AllSaleAttr = ref<HasSaleAttr[]>([])
//控制对话框的显示和隐藏
let dialogVisible = ref<boolean>(false)
//存储预览图片的地址
let dialogImageUrl = ref<string>()
//定义数组存储已有的spu字段 原来都是空
let SpuParams = ref<SpuData>({
    category3Id: '',
    description: '',
    spuName: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: [],
})
//将来收集还未选择的销售属性的id和名字
let saleAttrIdAndValueName = ref<string>('')
const initHasSpuData = async (spu: SpuData) => {
    //存储已有的spu对象 数据的收集
    SpuParams.value = spu
    //spu是父组件传递的spu对象 但是不完整
    //获取全部的品牌数据
    const res: AllTrademark = await reqAllTrademark()
    //获取图片
    const res1: SpuHasImg = await reqSpuImageList(spu.id as number)
    //获取已有的销售属性
    const res2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
    //获取整项目的全部的Spu销售属性
    const res3: HasSaleAttrResponseData = await reqAllSaleAttr()

    //存储全部的品牌的数据
    AllTrademark.value = res.data
    ImgList.value = res1.data.map(item => {
        return {
            name: item.imgName,
            url: item.imgUrl
        }
    })
    SaleAttr.value = res2.data
    AllSaleAttr.value = res3.data
}
//照片墙预览的时候触发的钩子
const handlePictureCardPreview = (file: any) => {
    //file预览图片的地址
    dialogImageUrl.value = file.url
    dialogVisible.value = true
}
//照片墙删除的钩子
const handleRemove = () => {

}
//照片约束文件的类型和大小
const handlerUpload = (file: any) => {
    if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif') {
        if (file.size / 1024 / 1024 < 3) {
            return true
        } else {
            ElMessage({
                type: 'error',
                message: '上传图片过大'
            })
            return false
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上传的文件的类型错误'
        })
        return false
    }
}
//计算当前spu没有的销售属性
let unSelectSaleAttr = computed(() => {
    //全部的销售属性
    //贾汪已经有的销售属性过滤出来 将已经存在进行过滤
    return AllSaleAttr.value.filter(item => {
        return SaleAttr.value.every(item1 => {
            return item.name !== item1.saleAttrName
        })
    })
})
//添加销售属性的方法
const addSaleAttr = () => {
    //将还没有选择的筛选出来
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
    //准备新的销售对象
    let newSaleAttr: SaleAttr = {
        baseSaleAttrId, saleAttrName, spuSaleAttrValueList: []
    }
    //添加到服务器当中 把新增的加进去
    SaleAttr.value.push(newSaleAttr)
    //清空收集的数据 使用v-model收集的
    saleAttrIdAndValueName.value = ''
}
//属性值按钮的点击事件
const toEdit = (row: SaleAttr) => {
    //出现input组件
    row.flag = true
    //收集销售属性值
    row.saleAttrValue = ''
}
const toLook = (row: SaleAttr) => {
    //收集到属性的ID和属性值的名字
    const { baseSaleAttrId, saleAttrValue } = row
    //整理成服务器需要的属性值形式
    let newSaleAttrValue: SaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: saleAttrValue as string,
    }
    if ((saleAttrValue as string).trim() === '') {
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        return
    }
    //不需要空出自己判断 还没进去呢
    let repeat = row.spuSaleAttrValueList.find(item => {
        return item.saleAttrValueName === saleAttrValue
    })
    if (repeat) {
        ElMessage({
            type: 'error',
            message: '属性值重复'
        })
        return
    }
    //追加新的属性值对象
    row.spuSaleAttrValueList.push(newSaleAttrValue)
    //切换成查看模式 button按钮出来
    row.flag = false
}
//收集的数据进行整理发送请求
const save = async () => {
    //整理数据
    //1.照片墙
    SpuParams.value.spuImageList = ImgList.value.map((item: any) => {
        return {
            imgName: item.name,
            imgUrl: (item.response && item.response.data) || (item.url)
        }
    })
    //2.整理销售属性的数据
    SpuParams.value.spuSaleAttrList = SaleAttr.value
    //发送请求添加新的spu或者进行spu的更改
    const res = await reqAddOrUpdateSpu(SpuParams.value)
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: SpuParams.value.id ? '更新成功' : '添加成功'
        })
        //通知父组件切换成0
        $emit('changeScene', {flag:0,params:SpuParams.value.id?'update':'add'})
    } else {
        ElMessage({
            type: 'error',
            message: SpuParams.value.id ? '更新失败' : '添加失败'
        })
    }
}
//添加新的SPU 初始化请求的方法
const initAddSpu = async (C3Id: number) => {
    //清空数据 原来的数据
    Object.assign(SpuParams.value, {
        category3Id: '',
        description: '',
        spuName: '',
        tmId: '',
        spuImageList: [],
        spuSaleAttrList: [],
    })
    ImgList.value = []
    SaleAttr.value = []
    saleAttrIdAndValueName.value = ''
    //获取全部的品牌的数组
    let res1: AllTrademark = await reqAllTrademark()
    let res2: HasSaleAttrResponseData = await reqAllSaleAttr()
    //存储数据
    AllTrademark.value = res1.data
    AllSaleAttr.value = res2.data
    SpuParams.value.category3Id = C3Id
}

defineExpose({ initHasSpuData, initAddSpu })
</script>


<style></style>