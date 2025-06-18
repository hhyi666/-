<template>
    <el-card class="box-card">
        <!-- 卡片的添加卡片的按钮 -->
         <!-- 判断有没有对应的按钮的标识 -->
          <!-- 全局指令的使用 -->
        <el-button v-has="`btn.Trademark.add`" @click="addTrademark" type="primary" style="background-color:cyan; padding: 15px;"
            icon="Plus">添加品牌</el-button>
        <!-- 表格组件:用来展示已经有的组件 -->
        <!-- border设置表格纵向是否有边框  -->
        <el-table style="margin: 10px 0px;" border :data="trademarkArr">
            <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
            <el-table-column label="品牌名称" align="center" prop="tmName"></el-table-column>
            <el-table-column label="品牌Logo" align="center">
                <template #="{ row, $index }">
                    <!-- 索引值和logo的图片 -->
                    <img :src="row.logoUrl" alt="图片失效" style="width: 100px; height: 100px;">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作" align="center">
                <template #="{ row, $index }">
                    <el-button type="primary" size="large" icon="Edit" style="width: 30px;height: 30px;"
                        @click="updataTrademark(row)"></el-button>
                    <el-popconfirm :title="`确定删除${row.tmName}吗`" width="200px" icon="Delete"
                        @confirm="removeTrademark(row.id)">
                        <template #reference>
                            <!-- 使用具名插槽进行设置 -->
                            <el-button type="primary" size="large" icon="Delete"
                                style="width: 30px;height: 30px;"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>

        </el-table>
        <!-- 分页器组件 -->
        <!-- 
            v-model 
                current-page当前的页码
                page-size 展示的个数
                page-sizes 每页显示个数的展示 设置下拉菜单的数据
                small 是否使用小型分页器
                bacc 添加背景
                layout 子组件的布局（名字）调整 子组件的位置 使用->顶到最右端
         -->
        <el-pagination @size-change="sizeChange" @current-change="changePageNow" v-model:current-page="pageNow"
            v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
            layout=" prev, pager, next, jumper, -> ,sizes ,total" :total="total" />
    </el-card>

    <!--对话框组件 -->
    <!-- v-model用于控制对话框的显示和隐藏 title标题 -->
    <el-dialog v-model="dialogTableVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'" width="800">
        <el-form style="width: 80%;" :model="trademarkParams" :rules="rules" ref="formRef">
            <!-- 表单组件 -->
            <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                <el-input v-model="trademarkParams.tmName" placeholder="请输入品牌的名称"></el-input>
            </el-form-item>
            <el-form-item label="品牌Logo" label-width="100px" prop="logoUrl">
                <!-- upload组件的相应的属性：
                    action ： 上传的服务器的路径
                    show-file-list 是否显示已经显示的列表
                    before-upload 上传之前的钩子 可以限制上传文件的类型
                -->
                <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                    :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">
                    <!-- 上传之后就是展示图片 -->
                    <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                    <!-- 没有图片就是加号 -->
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <!--  具名插槽 显示确定和取消 -->
        <template #footer>
            <el-button @click="cancel" type="primary"
                style="width: 100px;margin-right: 20px; background-color: skyblue;">取消</el-button>
            <el-button @click="confirm" type="primary" style="width: 100px; background-color: skyblue;">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from 'vue';
import { reqHasTrademark, reqAddOrUpdateTradeMark, reqDeleteTrademark } from '@/api/product/trademark';
import type { Records, TradeMark, TradeMarkResponseData } from '@/api/product/trademark/type';
import { ElMessage, type UploadProps } from 'element-plus'
import { useUserStore } from '@/store/modules/user';
let userStore = useUserStore()
//分页器当前的页码
let pageNow = ref<number>(1)
//每页展示多少数据
let limit = ref<number>(3)
//存储已有品牌的数据总数
let total = ref<number>(0)
//存储
let trademarkArr = ref<Records>([])

//控制对话框的显示和隐藏
let dialogTableVisible = ref<boolean>(false)

//定义新增品牌的数据
let trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})

//获取el-form的组件实例 点击确定之前还不存在form这个东西 是undefined
let formRef = ref()

const validatorTmName = (rule: any, value: any, callback: any) => {
    //子自定义校验规则
    if (value.trim().length >= 2) { //校验通过
        callback()
    } else { //校验失败的信息
        callback(new Error('品牌名称大小大于等于两位'))
    }
}
const validatorLogoUrl = (rule: any, value: any, callback: any) => {
    if (value) {
        callback()
    } else {
        callback(new Error('Logo的图片务必上传'))
    }
}

//表单检验的规则对象
const rules = {
    tmName: [
        //设置校验 
        { required: true, trigger: 'blur', validator: validatorTmName }
    ],
    logoUrl: [
        { required: true, validator: validatorLogoUrl }
    ]
}

//获取已有品牌的接口 获取数据调用接口就行 
const getTrademark = async () => {
    const res: TradeMarkResponseData = await reqHasTrademark(pageNow.value, limit.value)
    if (res.code === 200) {
        //品牌的总个数
        total.value = res.data.total
        trademarkArr.value = res.data.records
    }
}
//组件挂载完毕
onMounted(() => {
    getTrademark()
})
//分页器发生变化的时候会触发
//页码发生变化的时候 触发事件会回传数据(当前的页码)
const changePageNow = () => { //能够返回数据的页数
    getTrademark() //拿到对应的数据
}
//下拉菜单发生变化的时候 触发函数
const sizeChange = () => {
    //每页的数据量发生变化的时候直接返回到1
    getTrademark()
}
const addTrademark = () => {
    dialogTableVisible.value = true
    //清空收集的数据
    trademarkParams.tmName = ''
    trademarkParams.logoUrl = ''
    trademarkParams.id = 0
    //这个函数能够拿到对应的变化的组件的实例
    nextTick(() => {
        formRef.value.clearValidate('tmName')
        formRef.value.clearValidate('logoUrl')
    })
}

//拿到当前已经有的品牌
const updataTrademark = (row: any) => {
    dialogTableVisible.value = true
    Object.assign(trademarkParams, row)
    //拿到id（已有的品牌具有id）
    //展示已有的品牌的数据 拿到row的数据

    //将错误的信息清除
    nextTick(() => {
        formRef.value.clearValidate('tmName')
        formRef.value.clearValidate('logoUrl')
    })
}

const cancel = () => {
    dialogTableVisible.value = false
}
//确定添加品牌
const confirm = async () => {

    //发送请求之前对表单进行检验
    //调用方法之前进行表单的验证 进行飙到的检验
    await formRef.value.validate()

    //参数的收集
    //修改已有的品牌的id
    const res = await reqAddOrUpdateTradeMark(trademarkParams)
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
        })
        //再次发送请求获已有的全部的品牌的数组
        dialogTableVisible.value = false
        getTrademark()
        //收集的数据清空 不能重复展示
    } else {
        ElMessage({
            type: 'error',
            message: trademarkParams.id ? '修改失败' : '添加失败',
        })
        dialogTableVisible.value = false
    }
}
//图片上传之前的触发的钩子 上传成功之前触发 可以约束文件的类型和大小
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    //上传的文件的类型 是png|gif|jpg
    if (rawFile.type === 'image/png' || rawFile.type === 'image/jpg' || rawFile.type === 'image/gif') {
        if (rawFile.size / 1024 / 1024 < 4) {
            return true
        } else {
            ElMessage({
                type: 'error',
                message: '上传的文件的类型小于4M'
            })
            return false
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上传的文件的类型务必是jpg|png|gif'
        })
        return false
    }
}
//图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response, //这次上传图片的post的路径
    uploadFile, //也是服务器返回的关于图片的信息
) => {
    trademarkParams.logoUrl = response.data
    //图片上传成功之后清除对应的提示信息
    formRef.value.clearValidate('logoUrl')
}
const removeTrademark = async (id: number) => {
    //删除已有的品牌类型
    let res = await reqDeleteTrademark(id)
    if(res.code === 200){
        //删除成功的提示信息
        ElMessage({
            type : 'success',
            message : '删除成功'
        })
        //再次进行品牌的获取
        getTrademark()
    }else{
        ElMessage({
            type : 'error',
            message : '删除失败'
        })
    }
}
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>