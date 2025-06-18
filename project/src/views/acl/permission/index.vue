<template>
    <el-table :data="PermissionArr" style="width: 100%; margin-bottom: 20px" row-key="id" border>
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="code" label="权限值" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
            <template #="{ row, $index }">
                <!-- 等级4是禁用的 -->
                <el-button @click="addPermission(row)" :disabled="row.level == 4 ? true : false" type="small"
                    style="width: 70px; background-color: skyblue;">
                    {{ row.level == 3 ? '添加功能' : '添加菜单' }}
                    <!-- 设置不同的内容 -->
                </el-button>
                <!-- 对应的等级是禁用的 -->
                <el-button @click="updatePermission(row)" :disabled="row.level == 1 ? true : false" type="small"
                    style="width: 50px; background-color: skyblue;">编辑</el-button>
                <el-popconfirm @confirm="removePermission(row)" :title="`你确定删除${row.name}吗？`" width="300px">
                    <template #reference>
                        <el-button type="small" :disabled="row.level == 1 ? true : false"
                            style="width: 50px; background-color: skyblue;">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="showDialog">
        <template #header>
            <span>{{ menuData.id ? '更新菜单' : '添加菜单' }}</span>
        </template>
        <template #default>
            <el-form>
                <el-form-item label="名称">
                    <!--  数据的收集 -->
                    <el-input v-model="menuData.name" style="width: 500px;" placeholder="请输入菜单的名称"></el-input>
                </el-form-item>
                <el-form-item label="权限">
                    <el-input v-model="menuData.code" style="width: 500px;" placeholder="请你输入相应的权限值"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-button @click="cancel">取消</el-button>
            <el-button @click="save">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
//获取菜单
import { reqAddOrUpdateMenu, reqAllPermission, reqDeleteMenu } from '@/api/acl/menu';
import type { MenuParams, Permission, PermissionList, PermissionResponseData } from '@/api/acl/menu/type';
import { ElMessage } from 'element-plus';
//存储菜单的数据
let PermissionArr = ref<PermissionList>([])
//控制对话框的显示和隐藏
let showDialog = ref<boolean>(false)
//携带的参数
let menuData = reactive<MenuParams>({
    code: '',
    level: 0,
    name: '',
    pid: 0,
})
const getHasPermission = async () => {
    const res: PermissionResponseData = await reqAllPermission()
    if (res.code === 200) {
        PermissionArr.value = res.data
    }
}
const addPermission = async (row: Permission) => {
    //清空数据
    Object.assign(menuData, {
        code: '',
        level: 0,
        name: '',
        pid: 0,
        id: 0,
    })
    showDialog.value = true
    //收集新僧菜单的level
    menuData.level = row.level + 1
    //新增的子菜单
    menuData.pid = row.pid
}
const cancel = () => {
    showDialog.value = false
}
const save = async () => {
    const res = await reqAddOrUpdateMenu(menuData)
    if (res.code === 200) {
        showDialog.value = false
        ElMessage({
            type: 'success',
            message: menuData.id ? '更新成功' : '添加成功'
        })
        getHasPermission()
    } else {
        showDialog.value = false
        ElMessage({
            type: 'error',
            message: menuData.id ? '更新失败' : '添加失败'
        })
    }
}
//编辑已有的菜单
const updatePermission = (row: Permission) => {
    showDialog.value = true
    //合并操作
    Object.assign(menuData, row)

}
const removePermission = async (row: Permission) => {
    const res = await reqDeleteMenu(row.id as number)
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getHasPermission()
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}
onMounted(() => {
    getHasPermission()
})
</script>

<style scoped lang="scss"></style>