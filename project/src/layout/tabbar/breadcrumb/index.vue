<template>
    <!-- 顶部左侧的静态 -->
    <el-icon style="margin-right: 10px;margin-top: 2px;" @click="changeIcon"> 
        <component><Expand/></component>
    </el-icon>
    <el-breadcrumb separator=">">
        <!-- 动态的展示面包屑 -->
         <!-- 注意不能使用v-if v-if的优先级大于v-for -->
        <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
            <!-- 面包屑展示匹配路由的标题 -->
            <el-icon style="margin: 0px 5px;">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import {useLayoutSettingStore} from '@/store/modules/setting'
import { useRoute } from 'vue-router';
const layoutSettingStore = useLayoutSettingStore()
const $route = useRoute()
//定义响应式数据来控制图标的切换
const changeIcon = () => {
    layoutSettingStore.fold = !layoutSettingStore.fold
}
</script>
<script lang="ts">
export default {
    name : 'BreadCrumb'
}
</script>

<style scoped></style>