//小仓库 关于layout组件配置的仓库
import { defineStore } from "pinia";
import { ref } from "vue";
export const useLayoutSettingStore = defineStore('SettingStore',() => {
    let fold = ref(false)
    let refsh = ref(false)
    return {
        fold, //控制收起还是展开
        refsh,
    }
})