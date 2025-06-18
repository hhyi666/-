//商品分类全局组件的仓库
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { reqC1, reqC2, reqC3 } from "@/api/product/attr";
import { CategoryResponseData } from "@/api/product/attr/type";
import { CategoryObj } from "@/api/product/attr/type";
const useCategoryStore = defineStore('Category', () => {
    const C1Arr = ref<CategoryObj[]>([])
    const C1Id = ref('')
    const C2Arr = ref<CategoryObj[]>([])
    const C2Id = ref('')
    const C3Arr = ref<CategoryObj[]>([])
    const C3Id = ref('')
    const getC1 = async () => {
        //获取一级分类的方法
        const res: CategoryResponseData = await reqC1()
        if (res.code === 200) {
            C1Arr.value = res.data
        }
    }
    const getC2 = async () => {
        const res = await reqC2(C1Id.value)
        if (res.code === 200) {
            C2Arr.value = res.data
        }
    }
    const getC3 = async () => {
        const res = await reqC3(C2Id.value)
        if (res.code === 200) {
            C3Arr.value = res.data
        }
    }
    const $reset = () => {
        C1Arr.value = [];
        C1Id.value = '';
        C2Arr.value = [];
        C2Id.value = '';
        C3Arr.value = [];
        C3Id.value = '';
    }
    return {
        C1Id,
        C1Arr,
        C2Id,
        C2Arr,
        C3Arr,
        C3Id,
        getC1,
        getC2,
        getC3,
        $reset,
    }
})

export default useCategoryStore