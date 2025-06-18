import pinia from "@/store"
import { useUserStore } from "@/store/modules/user"
let userStore = useUserStore(pinia)
export const isHasButtoon = (app:any) => {
    
    // 全局的自定义指令 实现自定义指令
    app.directive('has',{
        // 使用这个全局DOM或者组件挂载完毕的时候执行一次 options就是后面的数据
        mounted(el:any,options:any){ //对应的DOM元素
            if(userStore.buttons.includes(options.value)){
                el.parentNode.removeChild(el)
            }
        }
    })
}