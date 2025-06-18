<template>
    <div class="logo">
        <img :src="setting.logo" alt="" v-if="setting.logoHidden">
        <p style="white-space: nowrap;">{{ setting.title }}</p>
    </div>
</template>

<script setup lang="ts">
//引入logo的配置文件
import setting from '@/setting';

</script>
<script lang="ts">
export default {
    name: 'Logo'
}
</script>

<style scoped lang="scss">
.logo{
    height: $base_menu_logo_height;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    img{
        height: 40px;
        width: 40px;
    }
    p{
        color: white;
        font-size: $base_logo_title_fontsize;
        margin-left: 10px;
    }
}
</style>