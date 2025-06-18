<template>
    <el-card>
        <div class="box">
            <img :src="userStore.avatar" alt="">
            <div class="bottom">
                <h3 class="title">{{ getTime() }}好呀！{{ userStore.username }}</h3>
                <p class="subtitle">硅谷甄选运营平台</p>
            </div>
        </div>
    </el-card>
    <div class="bottom1">
        <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/modules/user';
import { getTime } from '@/utils/time';
const userStore = useUserStore()

</script>

<style scoped lang="scss">
.box {
    display: flex;
    // justify-content: space-around;
    align-items: center;

    img {
        border-radius: 50%;
        height: 100px;
        width: 100px;
    }

    .bottom {
        margin: 20px 10px;
        .title {
            font-size: 40px;
            font-weight: 900;
            margin-bottom: 20px;
        }
        .subtitle{
            font-style: italic;
            color: skyblue;
        }
    }

}
.bottom1{
    display: flex;
    justify-content: center;
    margin-top: 100px;
}
</style>