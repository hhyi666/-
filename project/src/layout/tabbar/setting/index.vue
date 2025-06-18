<template>
    <el-button type="primary" size="default" icon="Refresh" circle @click="changeRefsh"></el-button>
    <el-button type="primary" size="default" icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-popover placement="bottom" title="主题设置" :width="200" trigger="hover">
        <!-- 表单组件 -->
        <el-form>
            <el-form-item label="主题颜色">
                <el-color-picker @change="setColor" :teleported="false" v-model="color" show-alpha :predefine="predefineColors" />
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch @change="changeDark" v-model="dark" class="mt-2" inline-prompt active-icon="MoonNight"
                    inactive-icon="Sunny" />
            </el-form-item>
        </el-form>
        <template #reference>
            <el-button type="primary" size="default" icon="Setting" circle></el-button>
        </template>
    </el-popover>
    <img :src="userStore.avatar" alt="" style="width: 24px;height: 24px; margin: 0px 10px;border-radius: 24px;">
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <!-- 插槽 -->
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logoout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLayoutSettingStore } from '@/store/modules/setting';
import { useUserStore } from '@/store/modules/user';
import { useRouter, useRoute } from 'vue-router';
const userStore = useUserStore()
const layoutSettingStore = useLayoutSettingStore()
const $router = useRouter()
const $route = useRoute()
// 收集开关的数据
let dark = ref<boolean>(false)
//定义刷新的操作
const changeRefsh = () => {
    layoutSettingStore.refsh = !layoutSettingStore.refsh
}
//全屏按钮点击的回调
const fullScreen = () => {
    let full = document.fullscreenElement
    if (!full) {
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}
//退出登录的回调
const logoout = async () => {
    await userStore.userLogoout() //异步操作
    $router.push({ path: '/login', query: { redirect: $route.path } })
}
const changeDark = () => {
    //获取根节点
    let html = document.documentElement
    console.log(html)
    dark.value ? html.className = 'dark' : html.className = ''

}
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])
// 主题颜色的设置
const setColor = () => {
    // 通知根节点进行属性值的切换
    const html = document.documentElement
    html.style.setProperty('--el-color-primary',color.value)
}
</script>
<script lang="ts">
export default {
    name: 'Setting'
}
</script>
<style scoped></style>