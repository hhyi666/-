<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <breadcrumb></breadcrumb>
        </div>
        <div class="tabbar_right">
            <setting></setting>
        </div>
    </div>
</template>

<script setup lang="ts">
import breadcrumb from './breadcrumb/index.vue'
import setting from './setting/index.vue';
</script>
<script lang="ts">
export default {
    name : 'Tabbar'
}
</script>
<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }

    .tabbar_right {
        display: flex;
        align-items: center;

    }
}
</style>