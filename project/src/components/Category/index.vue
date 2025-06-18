<template>
    <div>
        <el-card>
            <el-form inline="true">
                <el-form-item label="一级分类">
                    <el-select :disabled="scene===0?false:true" style="width: 200px;" v-model="categoryStore.C1Id" @change="handler1">
                        <!-- value是下拉菜单收集的数据 -->
                        <el-option v-for="(c1, index) in categoryStore.C1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类">
                    <el-select :disabled="scene===0?false:true" style="width: 200px;" v-model="categoryStore.C2Id" @change="handler2">
                        <el-option v-for="(c2,index) in categoryStore.C2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="三级分类">
                    <el-select :disabled="scene===0?false:true" style="width: 200px;" v-model="categoryStore.C3Id">
                        <el-option v-for="(c3,index) in categoryStore.C3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
//引入组件挂载完毕的方法
import { onMounted } from 'vue';
import useCategoryStore from '@/store/modules/category';
const categoryStore = useCategoryStore()
//全局组件挂载完毕
onMounted(() => {
    categoryStore.getC1()
})
//change时间当选中值的时候会触发 保证一分类触发
const handler1 = () => {
    //将二级和三级的数据清空
    categoryStore.C2Id = '',
    categoryStore.C3Arr = [],
    categoryStore.C3Id = '',
    //获取二级分类的数据
    categoryStore.getC2()
}
const handler2 = () => {
    categoryStore.C3Id = ''
    categoryStore.getC3()
}
//接收父组件传递的值
defineProps(['scene'])
</script>


<style></style>