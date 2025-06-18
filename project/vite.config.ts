import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // 需要安装 @types/node
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command,mode }) => {
  //获取各个环境下的对应的变量
  let env = loadEnv(mode,process.cwd())
  return {
    plugins: [vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
    viteMockServe({
      // default
      mockPath: 'mock',
      enable: true, //保证开发的时候可以使用mock的接口
    }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src') // 关键配置
      }
    },
    //scss全局变量的配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/style/variable.scss" as *;` // 现代语法推荐
        }
      }
    },
    //代理跨域
    server : {
      proxy :{
        [env.VITE_APP_BASE_API]:{
          //获取服务器地址的位置
          target : env.VITE_SERVE,
          //需要代理跨域
          changeOrigin : true,
          //路径重写
          rewrite : (path) => path.replace(/^\/api/,''),
        }
      }
    }
  }
})