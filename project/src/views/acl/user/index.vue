<template>
    <el-card style="margin: 10px 0px;">
        <el-form :inline="true" class="form">
            <!-- 行内form表单 -->
            <el-form-item label="用户名：">
                <el-input v-model="keyword" placeholder="请输入用户名" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="keyword?false:true" @click="search" type="primary" style="width: 50px;background-color: skyblue;">搜索</el-button>
                <el-button @click="reset" type="primary" style="width: 50px;background-color: skyblue;">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card>
        <el-button @click="addUser" type="primary" style="width: 100px;background-color: skyblue;">添加用户</el-button>
        <el-button @click="deleteSelectUser" :disabled="!selectIdArr.length" type="primary" style="width: 100px;background-color: skyblue;">批量删除</el-button>
        <el-table @selection-change="selectChange" style="margin: 10px 0px;" border :data="userAttr">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="ID" align="center" prop="id"></el-table-column>
            <el-table-column label="用户名字" align="center" width="100px" prop="username"
                show-overflow-tooltip></el-table-column>
            <el-table-column label="用户名称" align="center" width="100px" prop="name"
                show-overflow-tooltip></el-table-column>
            <el-table-column label="用户角色" align="center" width="100px" prop="roleName"
                show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" width="100px" prop="createTime"
                show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" align="center" width="100px" prop="updateTime"
                show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="260px" align="center">
                <template #="{ row, $index }">
                    <el-button @click="setRole(row)" icon="User">分配角色</el-button>
                    <el-button @click="updateUser(row)" icon="Edit">编辑</el-button>
                    <el-popconfirm @confirm="deleteUser(row.id)" :title="`你确定删除${row.username}吗`" width="260px">
                        <template #reference>
                            <el-button icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" :page-sizes="[5, 7, 9, 11]" v-model:page-size="pageSize"
            @current-change="getHasUser" @size-change="handler" layout="prev, pager, next, jumper,->,sizes,total"
            background :total="total">
        </el-pagination>
    </el-card>
    <!-- 新增用户 抽屉的使用-->
    <el-drawer v-model="drawerAdd">
        <template #header>
            <span>{{ userParams.id ? '更新用户' : '添加用户' }}</span>
        </template>
        <template #default>
            <el-form ref="formRef" :model="userParams" :rules="rules">
                <el-form-item prop="username" label="用户姓名">
                    <el-input v-model="userParams.username" placeholder="请输入用户的名称"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="用户昵称">
                    <el-input v-model="userParams.name" placeholder="请输入用户的昵称"></el-input>
                </el-form-item>
                <el-form-item v-if="!userParams.id" prop="password" label="用户密码">
                    <el-input v-model="userParams.password" placeholder="请输入用户的密码" type="password"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto;">
                <el-button @click="cancel" style="width: 100px;">取消</el-button>
                <el-button @click="save" style="background-color: skyblue; width: 100px;">确定</el-button>
            </div>
        </template>
    </el-drawer>
    <!-- 分配角色抽屉 -->
    <el-drawer v-model="drawerAssgin">
        <template #header>
            <span>分配角色(职位)</span>
        </template>
        <template #default>
            <el-form>
                <el-form-item label="用户姓名">
                    <el-input v-model="userParams.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="职位列表">
                    <!-- inder设置不确定的样式 -->
                    <el-checkbox v-model="chenkAll" :indeterminate="isIndeterminate" @change="handlerCheckAllChange">
                        全选
                    </el-checkbox>
                    <!-- 显示职位的复选框 -->
                    <el-checkbox-group @change="handlerCheckedChange" v-model="userRoles">
                        <!-- 选择的复选框 -->
                        <el-checkbox v-for="(role, index) in allRoles" :key="index" :label="role">
                            {{ role.roleName }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div>
                <el-button @click="drawerAssgin = false" type="primary" style="width: 80px;">取消</el-button>
                <el-button @click="define" type="primary" style="width: 80px;background-color: skyblue;">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue';
import { reqSelectUser, reqRemoveUser, reqUserInfo, reqAddOrUpdateUser, reqAllRole, reqSetUserRole } from '@/api/acl/user';
import { SetRoleData, UserResponseData, Records, User, AllRoleResponseData, AllRole } from '@/api/acl/user/type';
import { ElMessage } from 'element-plus';
import { useLayoutSettingStore } from '@/store/modules/setting';
const settingStore = useLayoutSettingStore()
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let userAttr = ref<Records>([])
let drawerAdd = ref<boolean>(false)
let drawerAssgin = ref<boolean>(false)
// 复选框是否全选
let chenkAll = ref<boolean>(false)
let isIndeterminate = ref<boolean>(true)
let allRoles = ref<AllRole>([])
//已有的数据
let userRoles = ref<AllRole>([])
let userParams = reactive<User>({
    username: '',
    name: '',
    password: '',
})
let selectIdArr = ref<User[]>([])
//获取form的组件实例 
//！！！！！一定注意 ： 第一次组件挂载的时候formRef是undefined
let formRef = ref<any>()
//收集搜索的内容
let keyword = ref<string>('')
const validatorUsername = (rule: any, value: any, callback: any) => {
    if (value.trim().length >= 5) {
        callback()
    } else {
        callback(new Error('用户的名字至少5位'))
    }
}
const validatorName = (rule: any, value: any, callback: any) => {
    console.log(value)
    if (value.trim().length >= 5) {
        callback()
    } else {
        callback(new Error('用户的昵称至少5位'))
    }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
    console.log(value)
    if (value.trim().length >= 5) {
        callback()
    } else {
        callback(new Error('用户的密码至少6位'))
    }
}
//表单校验的rule
const rules: any = {
    username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
    name: [{ required: true, trigger: 'blur', validator: validatorName }],
    password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}
const getHasUser = async (pager = 1) => {
    pageNo.value = pager
    const res: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value,keyword.value)
    if (res.code === 200) {
        total.value = res.data.total
        userAttr.value = res.data.records
    }
}
onMounted(() => {
    getHasUser()
})
const handler = () => {
    getHasUser()
}
const addUser = () => {
    drawerAdd.value = true
    userParams.id = 0
    //清除上一次的错误的提示信息
    nextTick(() => { //使用change就会存在不能正确拿到的问题
        //惊醒错误信息的清除
        formRef.value.clearValidate()
    })
    Object.assign(userParams, {
        username: '',
        name: '',
        password: '',
    })
}
const updateUser = (row: User) => {
    drawerAdd.value = true
    //存储收集的已有的账号信息 将信息传递到表单元素当中
    Object.assign(userParams, row)
    //清除报错的信息
    nextTick(() => {
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('name')
    })
}
const save = async () => {
    //检查表单的校验是否通过 等到所有的检查都是通过的才能发送
    await formRef.value.validate()
    //点击保存 添加或者更新
    const res = await reqAddOrUpdateUser(userParams)
    if (res.code === 200) {
        drawerAdd.value = false
        ElMessage({
            type: 'success',
            message: userParams.id ? '更新成功' : '添加成功'
        })
        getHasUser(userParams.id ? pageNo.value : 1)
        //浏览器自动的刷新这一次 这样就可以保证修改自己的内容可以自动的内容刷新
        //目的：当自己的用户信息进行更改了就需要进行刷新操作 自动回到登录页
        window.location.reload()
    } else {
        drawerAdd.value = false
        ElMessage({
            type: 'error',
            message: userParams.id ? '更新失败' : '添加失败'
        })
    }
}
const cancel = () => {
    drawerAdd.value = false
}
const setRole = async (row: User) => {
    //存储已有的用户信息
    Object.assign(userParams, row)
    //拿到对应的数据
    const res: AllRoleResponseData = await reqAllRole(userParams.id as number)
    if (res.code === 200) {
        allRoles.value = res.data.allRolesList
        userRoles.value = res.data.assignRoles
        drawerAssgin.value = true
    }
}
//控制全选的状态
const handlerCheckAllChange = (val: boolean) => {
    //全选时间的触发
    userRoles.value = val ? allRoles.value : []
    isIndeterminate.value = false
}
//返回的是当前的数据
const handlerCheckedChange = (val: string[]) => {
    const checkLength = val.length
    chenkAll.value = checkLength === allRoles.value.length
    isIndeterminate.value = !(checkLength === allRoles.value.length)
}
const define = async () => {
    //收集参数
    let data: SetRoleData = {
        userId: userParams.id as number,
        roleIdList: userRoles.value.map(item => item.id) as number[]
    }
    //收集之后发送请求
    const res = await reqSetUserRole(data)
    console.log(res)
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '分配成功'
        })
        drawerAssgin.value = false
        getHasUser(pageNo.value)
    } else {
        ElMessage({
            type: 'error',
            message: '分配失败'
        })
    }

}
const deleteUser = async (userId: number) => {
    //删除用户
    const res = await reqRemoveUser(userId)
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getHasUser(userAttr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}
//复选框勾选时候触发
const selectChange = (value:any) => {
    selectIdArr.value = value
}
//批量删除函数
const deleteSelectUser = async () => {
    //整理参数
    let idList:any = selectIdArr.value.map(item => {
        return item.id
    })
    const res:any = await reqSelectUser(idList)
    if(res.code === 200){
        ElMessage({
            type : 'success',
            message : '删除成功'
        })
    }else{
        ElMessage({
            type : 'error',
            message : '删除失败'
        })
    }
}
const search = () => {
    //根据关键字获取数据
    getHasUser()
    //清空关键字
    keyword.value = ''
}
const reset = () => {
    //刷新的设置 实现刷新的设置
    settingStore.refsh = !settingStore.refsh
}
</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>