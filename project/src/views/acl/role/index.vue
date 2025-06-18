<template>
    <el-card>
        <el-form class="form" inline>
            <el-form-item label="角色名称">
                <el-input v-model="keyword" placeholder="请输入角色名称" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="keyword ? false : true" @click="search" type="primary"
                    style="width: 100px;background-color: skyblue;">搜索</el-button>
                <el-button @click="reset" type="primary" style="width: 100px;background-color: skyblue;">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px;">
        <el-button @click="addRole" icon="Plus" style="background-color: skyblue;width: 100px;">添加职位</el-button>
        <el-table border style="margin: 10px 0px;" :data="allRole">
            <el-table-column label="#" type="index" align="center"></el-table-column>
            <el-table-column prop="id" label="id" align="center"></el-table-column>
            <el-table-column prop="roleName" label="职位名称" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="300px" align="center">
                <template #="{ row, $index }">
                    <el-button @click="assgin(row)" icon="User">分配权限</el-button>
                    <el-button @click="updateRole(row)" icon="Edit">编辑</el-button>
                    <el-popconfirm @confirm="removeRole(row.id)" :title="`你确定删除${row.roleName}吗`" width="260px">
                        <template #reference>
                            <el-button icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change=handler @current-page="getHasRole" v-model:current-page="pageNo"
            v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]" background
            layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
    </el-card>
    <!-- 添加|更新已有职位 -->
    <el-dialog v-model="dialogShow" :title="RoleParams.id ? '更新职位' : '添加职位'">
        <el-form :model="RoleParams" :rules="rules" ref="formRef">
            <el-form-item label="职位名称" prop="roleName">
                <el-input v-model="RoleParams.roleName" placeholder="请你输入职位的名称"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="cancel" style="width: 80px;">取消</el-button>
            <el-button @click="save" style="width: 80px; background-color: skyblue;">确定</el-button>
        </template>
    </el-dialog>
    <!-- 权限的设置 -->
    <el-drawer v-model="drawer">
        <template #header>
            <span>分配用户职位</span>
        </template>
        <template #default>
            <!-- default-expanded默认展开的东西 -->
            <!-- default-checked 默认勾选的id -->
            <!-- props 设置对应的数据样式判断 展示字段的设置 展示的方式 -->
            <el-tree style="max-width: 600px" :data="MenuArr" show-checkbox node-key="id" default-expand-all ref="tree"
                :default-checked-keys="selectedArr" :props="defaultProps" />
        </template>
        <template #footer>
            <el-button @click="drawer = false" style="width: 80px;">取消</el-button>
            <el-button @click="submit" style="width: 80px;background-color: skyblue;">确定</el-button>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue';
import { reqAddOrUpdateRole, reqAllMenuList, reqAllRoleList, reqRemoveRole, reqSetPermission } from '@/api/acl/role';
import type { RoleResponseData, Records, RoleData, MenuList } from '@/api/acl/role/type';
import { useLayoutSettingStore } from '@/store/modules/setting';
import { ElMessage } from 'element-plus';
import { remove } from 'nprogress';
const settingStore = useLayoutSettingStore()
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
//搜索的关键字
let keyword = ref<string>('')
let total = ref<number>(0)
let allRole = ref<Records>([])
let dialogShow = ref<boolean>(false)
let RoleParams = reactive<RoleData>({
    roleName: '',
})
let formRef = ref<any>()
let drawer = ref<boolean>(false)
let MenuArr = ref<MenuList>([])
// 储存true的按钮
let selectedArr = ref<any>([])
//获取tree的组件实例
const tree = ref<any>()
const getHasRole = async (pager = 1) => {
    pageNo.value = pager
    const res: RoleResponseData = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value)
    if (res.code === 200) {
        total.value = res.data.total
        allRole.value = res.data.records
    }
}
const handler = () => {
    getHasRole()
}
onMounted(() => {
    getHasRole()
})
const search = () => {
    //发送搜索请求
    getHasRole()
    keyword.value = ''
}
//重置操作 就是销毁重建的操作
const reset = () => {
    settingStore.refsh = !settingStore.refsh
}
const addRole = () => {
    RoleParams.roleName = ''
    RoleParams.id = 0 //记得清除id
    dialogShow.value = true
    nextTick(() => { //拿到数据进行清空操作
        formRef.value.clearValidate()
    })
}
const updateRole = (row: RoleData) => {
    Object.assign(RoleParams, row)
    dialogShow.value = true
    nextTick(() => {
        formRef.value.validate()
    })
}
const cancel = () => {
    dialogShow.value = false
}
const validateRoleName = (rule: any, value: any, callback: any) => {
    if (value.trim().length >= 2) {
        callback()
    } else {
        callback(new Error('职位名称长度至少两位'))
    }
}
const rules = {
    roleName: [{ required: true, trigger: 'blur', validator: validateRoleName }]
}
const save = async () => {
    //进行表单的校验
    await formRef.value.validate()

    const res = await reqAddOrUpdateRole(RoleParams)
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: RoleParams.id ? '更新成功' : '添加成功'
        })
        dialogShow.value = false
        getHasRole(RoleParams.id ? pageNo.value : 1) //设置返回的位置
    } else {
        ElMessage({
            type: 'error',
            message: '添加失败'
        })
        dialogShow.value = false
    }
}
const assgin = async (row: RoleData) => {
    drawer.value = true
    Object.assign(RoleParams, row)
    const res = await reqAllMenuList(RoleParams.id as number)
    if (res.code === 200) {
        //数据的展示
        MenuArr.value = res.data
        selectedArr = filterArr(MenuArr.value, [])
    }
}
//属性控件测试的东西
const defaultProps = {
    children: 'children',
    label: 'name',
}
// 选项勾选的判断
// 看select的bool类型
// 只需要过滤最后一级的东西 因为上一级勾选了 那么全部的都会进行勾选
// 拿到对应的数据 准备一个数组 存储勾选的id
const filterArr = (allData: any, initArr: any) => {
    //进行递归的判断数组
    allData.forEach((item: any) => {
        if (item.select && item.level === 4) {
            initArr.push(item.id)
        }
        if (item.children && item.children.length > 0) {
            filterArr(item.children, initArr)
            //递归的找到对用的选中的id
        }
    })
    return initArr
}
const submit = async () => {
    //职位的id
    const roleId = RoleParams.id
    //选中节点的id
    const arr = tree.value.getCheckedKeys() //勾中的id
    //半选的id
    const arr1 = tree.value.getHalfCheckedKeys()
    const permissionId = arr.concat(arr1)
    const res = await reqSetPermission(roleId as number, permissionId)
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '分配权限成功'
        })
        //管理自己的东西的时候要刷新
        window.location.reload()
    } else {
        ElMessage({
            type: 'error',
            message: '分配权限失败'
        })
    }
}
const removeRole = async (id: number) => {
    const res:any = await reqRemoveRole(id)
    if(res.code === 200){
        ElMessage({
            type : 'success',
            message : '删除成功'
        })
        getHasRole(allRole.value.length>1?pageNo.value:pageNo.value-1)
    }else{
        ElMessage({
            type : 'error',
            message : '删除失败'
        })
    }
}
</script>

<style scoped lang="scss">
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>