<template>
    <!-- 路由组件的出口的位置 -->
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <!-- 用来增加动画特效 -->
            <!-- 渲染layout一级路由组件的子路由 -->
            <component :is="Component" v-if="flag"/>
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import { useLayoutSettingStore } from '@/store/modules/setting';
import { watch,ref,nextTick } from 'vue';
//nextTick 当响应式发生变化的时候 获取发生更新的DOM
const layoutSettingStore = useLayoutSettingStore()

//控制组件是否销毁重建
let flag = ref(true)

//监听仓库内部的数据是否发生变化 说明用户刷新了页面 监听操作
watch(() => layoutSettingStore.refsh,() => {
    flag.value = false  //销毁的操作
    nextTick(() => { //再次创建的操作
        flag.value = true
    })
})
</script>
<script lang="ts">
export default {
    name : 'Main'
}
</script>
<style scoped>
/* 设置开头和结束的样式 */
.fade-enter-from {
    opacity: 0;
    transform: scale(0);
}

.fade-enter-active {
    transition: all 0.3s;
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}
</style>
