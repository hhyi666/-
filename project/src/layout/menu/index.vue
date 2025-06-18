<template>
    <template v-for="(item, index) in menuList" :key="item.path">
        <template v-if="!item.children">
            <el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="goRoute">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 记得一定加上index作为标识 -->
        <template v-if="item.children && item.children.length === 1">
            <el-menu-item @click="goRoute" :index="item.children[0].path" v-if="!item.children[0].meta.hidden">
                <el-icon>
                    <!-- 自己提供的全局组件 -->
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
            <!-- 这里使用的比较巧 可以使用递归的方式进行展示 -->
        </el-sub-menu>
    </template>

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const $router = useRouter()
//获取父组件传递的路由的数据
defineProps(['menuList'])
const goRoute = (vc: any) => {
    $router.push(vc.index)
}
</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>


<style></style>