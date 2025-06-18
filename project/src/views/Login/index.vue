<template>
    <div class="login-container">
        <el-row>
            <!-- xs用来设置当屏幕的大小设置成多少的时候就会改变布局 -->
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password"
                            showPassword></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>

</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { useRouter,useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
import { getTime } from '@/utils/time';
let $route = useRoute()
//设置变量 控制加载的效果
let loading = ref(false)
const useStore = useUserStore()
//获取el-form组件
let loginForms = ref()
//获取路由器
const $router = useRouter()
//收集账号和密码数据
let loginForm = reactive({ username: 'admin', password: '111111' })
//定义表单校验需要的配置对象

//自定义校验规则的函数
const vaildatorUserName = (rule:any, value:any, callback:any) => {
    //rule是表单的校验规则对象
    //value 就是表单内容的对象
    //callback 规则放行的函数 调用通过函数 不符合 调用返回错误的信息
    if (value.length >= 5) {
        callback()
    } else {
        callback(new Error('账号的长度至少是5'))
    }
}
const vaildatorPassword = (rule:any, value:any, callback:any) => {
    if (value.length >= 6) {
        callback()
    } else {
        callback(new Error('密码的长度至少是6'))
    }
}
const rules = {
    //规则对象属性 ： required是务必进行检验的 trigger 触发表单校验的时机
    username: [
        { trigger: 'change', validator: vaildatorUserName }

    ],
    password: [
        { trigger: 'change', validator: vaildatorPassword }
    ],
}
//登录回调
const login = async () => {

    //保证表单的校验通过 保证表单元素全部通过才能继续
    await loginForms.value.validate()


    loading.value = true //开始加载效果
    //通知仓库发送登录请求
    try {
        //可以使用then 和 trycatch
        await useStore.userLogin(loginForm as any)
        //使用编程时导航跳转首页 
        //判断登录的路径是否有query参数 有的话就进行跳转
        let redirect:any = $route.query.redirect
        $router.push({path : redirect || '/'})
        //从哪退出跳转到哪里
        ElNotification({
            type: 'success',
            message: '欢迎回来',
            title: `Hi,${getTime()}好！` //此时我们想要根据时间进行变化 ？？？
        })
    } catch (error:any) {
        //登录失败 加载效果消失
        loading.value = false
        ElNotification({
            type: 'warning',
            message: error.message
        })
    }
    //请求成功 跳转首页
    //如果失败 弹出失败信息
}

//封装函数 判断时间



</script>

<style scoped lang="scss">
.login-container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;

        h1 {
            color: white;
            font-size: 40px;
        }

        h2 {
            font-size: 20px;
            color: white;
            margin: 20px 0;
        }

        .login_btn {
            width: 100%;
            background-color: skyblue;
        }
    }
}
</style>