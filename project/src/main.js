import { createApp } from 'vue';
import App from '@/App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'virtual:svg-icons-register';
import globalComponents from '@/components/index';
import '@/style/index.scss';
import router from './router';
import pinia from './store';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import 'element-plus/theme-chalk/dark/css-vars.css';
// 引入自定义插件
import { isHasButtoon } from './directive/has';
//引入路由鉴权的文件
import './permission';
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(ElementPlus, {
    locale: zhCn,
});
//注册插件的使用
app.use(globalComponents);
//路由的注册
app.use(router);
//安装pinia
app.use(pinia);
isHasButtoon(app);
app.mount('#app');
