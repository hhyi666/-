<template>
    <svg :style="{width,height}">
      <!-- xlink：herf --> 
       <!-- 矢量图的使用 属性值是#icon+名字 -->
        <!--  fill属性可以设置颜色  -->
          <!-- 还可以设置相应的样式 -->
      <use :xlink:href="prefix+name" :fill="color"></use>
    </svg>
</template>

<script setup lang="ts">
//接收父组件传递的参数
defineProps({
    //xlink-href 属性的前缀
    prefix : {
        type : String,
        default : '#icon-'
    },
    name : String,
    //接收父组件传递的元素
    color : {
        type : String,
        default : ''
    },
    //接收父组件传递的图标的宽度和高度
    height : {
        type : String,
        default : '100px',
    },
    width : {
        type : String,
        default : '100px',
    }
})
</script>

<style>

</style>