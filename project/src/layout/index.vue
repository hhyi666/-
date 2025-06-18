<template>
    <div class="layout_container">
        <!-- 设置动态的样式进行操作 -->
        <div class="layout_slider" :class="{ fold: layoutSettingStore.fold ? true : false }">
            <Logo></Logo>
            <!-- 展示组件 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 滚动条 -->
                <!-- 设置激活的状态 collapse折叠效果的实现 -->
                <el-menu :collapse="layoutSettingStore.fold?true:false" :default-active="$route.path" background-color="#001529" text-color="white">
                    <!-- 根绝路由动态的生成菜单 -->
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout_tablebar" :class="{ fold: layoutSettingStore.fold ? true : false }">
            <!-- layout顶部导航tabbar -->
            <Tabbar></Tabbar>
        </div>
        <div class="layout_main" :class="{ fold: layoutSettingStore.fold ? true : false }">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
//引入左侧菜单的子组件
import Logo from '@/layout/logo/index.vue'
import Menu from '@/layout/menu/index.vue';
//右侧内容的展示区
import Main from '@/layout/main/index.vue'
import Tabbar from '@/layout/tabbar/index.vue'
//引入用户相关的小仓库
//获取路由对象
import { useUserStore } from '@/store/modules/user';
import { useRoute } from 'vue-router';
import { useLayoutSettingStore } from '@/store/modules/setting';
const layoutSettingStore = useLayoutSettingStore()
const userStore = useUserStore()
const $router = useRoute()

</script>

<script lang="ts">
export default {
    name: 'Layout'
}
</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        width: $base_menu_width;
        height: 100vh;
        background-color: $base_menu_background;
        color: white;
        transition: all 0.3s;

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base_menu_logo_height);

            // 编译之后会带上类名
            .el-menu {
                border-right: none;
            }
        }

        // 动态的类名
        &.fold {
            width: $base_menu_min_width;
        }
    }

    .layout_tablebar {
        position: fixed;
        width: calc(100% - $base_menu_width);
        height: $base_tablebar_height;
        top: 0px;
        left: $base_menu_width;
        transition: 0.3s all;

        &.fold {
            width: calc(100vw - $base_menu_min_width);
            left: $base_menu_min_width ;
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base_menu_width);
        height: calc(100vh - $base_tablebar_height);
        left: $base_menu_width;
        top: $base_tablebar_height;
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - $base_menu_min_width);
            left: $base_menu_min_width ;
        }
    }
}
</style>